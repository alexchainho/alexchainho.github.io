/**
 * export-pdf.mjs — Gera as versoes PDF do portefolio nos tres idiomas.
 *
 * O que faz, em resumo:
 *   1. Levanta um servidor HTTP local que serve a raiz do repositorio
 *      (o site usa caminhos absolutos como "/assets/..." e "/en/", que so
 *       resolvem servidos por HTTP; abrir com "file://" parte as imagens).
 *   2. Abre cada pagina (/, /en/, /fr/) num Chrome headless controlado pelo
 *      Playwright, usando o Chrome ja instalado na maquina (channel: 'chrome').
 *   3. Antes de exportar: expande todos os <details> (os "Marcos"),
 *      forca o carregamento das imagens lazy e espera que o JavaScript da
 *      pagina tenha preenchido o texto de detalhe dos Marcos.
 *   4. Grava pdf/portfolio-<lang>.pdf, mantendo o tema escuro do site.
 *
 * Requisitos cobertos: REQ-001, RNF-002.
 * Como correr:  cd tools && npm install && npm run export-pdf
 * Depende de:  Google Chrome instalado; Node 18+.
 * Escreve em:  <raiz-do-repo>/pdf/portfolio-{pt,en,fr}.pdf
 */

import { createServer } from 'node:http';
import { readFile, mkdir, rename } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { join, extname, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// O Playwright e carregado por import dinamico para se poder dar uma mensagem
// util quando as dependencias ainda nao foram instaladas (pasta sem node_modules).
let chromium;
try {
  ({ chromium } = await import('playwright-core'));
} catch {
  console.error('Dependencias em falta. Corre primeiro:  cd tools && npm install');
  process.exit(1);
}

/** Extensao de ficheiro -> cabecalho Content-Type que o servidor local devolve. */
const TIPOS_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

/** Paginas a exportar: idioma, caminho no site e nome do PDF de saida. */
const ALVOS = [
  { lang: 'pt', path: '/', ficheiro: 'portfolio-pt.pdf' },
  { lang: 'en', path: '/en/', ficheiro: 'portfolio-en.pdf' },
  { lang: 'fr', path: '/fr/', ficheiro: 'portfolio-fr.pdf' },
];

/**
 * Traduz o caminho de um pedido HTTP no ficheiro do disco a servir.
 * Entrada: caminho do URL ja sem query (ex: "/en/"), e a raiz do repositorio.
 * Devolve: caminho absoluto de um ficheiro existente, ou null se nao houver
 *          nada valido a servir.
 * Le do exterior: o sistema de ficheiros (existencia e tipo do alvo).
 */
function resolverCaminhoPedido(urlPath, raizDoRepo) {
  // Pedido a um directorio ("/", "/en/") serve o index.html desse directorio.
  let relativo = urlPath;
  if (relativo.endsWith('/')) relativo += 'index.html';

  const absoluto = resolve(raizDoRepo, '.' + relativo);

  // Barreira contra path traversal: nunca servir fora da raiz do repositorio,
  // mesmo que o pedido traga "../" a tentar subir.
  if (absoluto !== raizDoRepo && !absoluto.startsWith(raizDoRepo + sep)) return null;
  if (!existsSync(absoluto) || !statSync(absoluto).isFile()) return null;
  return absoluto;
}

/**
 * Levanta um servidor HTTP estatico que serve a raiz do repositorio.
 * Entrada: caminho absoluto da raiz do repositorio.
 * Devolve: promessa que resolve com { servidor, porta } quando ja esta a ouvir.
 * Efeito externo: abre uma porta TCP em 127.0.0.1 (porta escolhida pelo SO).
 */
function criarServidorEstatico(raizDoRepo) {
  const servidor = createServer(async (req, res) => {
    try {
      // Descartar a query string e descodificar %20 etc. antes de resolver.
      const semQuery = decodeURIComponent(req.url.split('?')[0]);
      const caminho = resolverCaminhoPedido(semQuery, raizDoRepo);
      if (!caminho) {
        res.writeHead(404);
        res.end('404');
        return;
      }
      const dados = await readFile(caminho);
      const tipo = TIPOS_MIME[extname(caminho).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, { 'content-type': tipo });
      res.end(dados);
    } catch {
      res.writeHead(404);
      res.end('404');
    }
  });

  return new Promise((resolvePromessa) => {
    // Porta 0 = o SO atribui uma porta livre. Evita colisoes com os servicos
    // ja a correr na maquina (Docker, LLM local, etc.).
    servidor.listen(0, '127.0.0.1', () => {
      resolvePromessa({ servidor, porta: servidor.address().port });
    });
  });
}

/**
 * Prepara o DOM da pagina para a exportacao: expande os Marcos, garante que as
 * imagens carregaram e espera que o JavaScript ja tenha traduzido o conteudo.
 * Entrada: objecto Page do Playwright, ja com a pagina carregada.
 * Devolve: nada (resolve quando a pagina esta pronta a exportar).
 * Efeito externo: altera o DOM da pagina (atributo open, loading das imagens,
 *                 injecta uma folha de estilo so para o PDF).
 */
async function prepararPagina(page) {
  // 1) Esperar que o IIFE da pagina tenha preenchido o detalhe dos Marcos.
  //    Enquanto o texto estiver vazio, o JavaScript ainda nao correu e um PDF
  //    tirado agora sairia com os Marcos por traduzir.
  await page.waitForFunction(
    () => {
      const el = document.querySelector('[data-milestone-detail]');
      return el && el.textContent.trim().length > 0;
    },
    null,
    { timeout: 30000 },
  );

  // 2) Expandir todos os <details> e marcar as imagens lazy como eager, para
  //    que o Chromium as carregue mesmo estando fora do ecra inicial.
  await page.evaluate(() => {
    document.querySelectorAll('details').forEach((d) => {
      d.open = true;
    });
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    });
  });

  // 3) Rolar a pagina de cima a baixo. Algumas imagens so comecam a carregar
  //    quando entram no viewport; sem isto sairiam em branco no PDF.
  await page.evaluate(async () => {
    const passo = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });

  // 4) Esperar que todas as imagens fiquem completas, com limite de tempo.
  //    Se alguma nao carregar a tempo, seguimos em frente: mais vale um PDF
  //    com uma imagem em falta do que o script pendurado para sempre.
  try {
    await page.waitForFunction(
      () => Array.from(document.images).every((img) => img.complete),
      null,
      { timeout: 20000 },
    );
  } catch {
    console.warn('  aviso: nem todas as imagens carregaram dentro do limite');
  }

  // 5) Folha de estilo so para a exportacao: evita cortes a meio de cartoes,
  //    figuras e itens de lista entre paginas do PDF. Nao mexe no site.
  await page.addStyleTag({
    content: 'article.rec,figure.diagram,.milestones li,.career li{break-inside:avoid}',
  });
}

/**
 * Exporta uma pagina do site para um ficheiro PDF.
 * Entrada: browser do Playwright, URL base do servidor local, um item de ALVOS
 *          e a pasta de saida dos PDF.
 * Devolve: caminho absoluto do PDF gravado.
 * Efeito externo: cria/substitui <pastaPdf>/<alvo.ficheiro> no disco.
 */
async function exportarIdioma(browser, baseUrl, alvo, pastaPdf) {
  const contexto = await browser.newContext({
    colorScheme: 'dark',
    viewport: { width: 1240, height: 1754 },
  });

  // Nao deixar o beacon de analytics (nem outros terceiros) atrasar ou alterar
  // a exportacao: o PDF tem de sair igual mesmo sem ligacao a internet (RNF-002).
  await contexto.route(
    /cloudflareinsights\.com|google-analytics\.com|googletagmanager\.com/,
    (rota) => rota.abort(),
  );

  const page = await contexto.newPage();
  try {
    await page.goto(baseUrl + alvo.path, { waitUntil: 'load', timeout: 45000 });
    await prepararPagina(page);

    // O site e desenhado para ecra. Sem forcar media 'screen', o Chromium
    // aplicaria o CSS de impressao e o resultado sairia com cores alteradas.
    await page.emulateMedia({ media: 'screen', colorScheme: 'dark' });

    const destino = join(pastaPdf, alvo.ficheiro);
    const temporario = destino + '.tmp';

    // Escrever primeiro para .tmp e so depois renomear. Se algo falhar a meio,
    // nao fica um PDF truncado no lugar do bom (REQ-001 CA-5).
    await page.pdf({
      path: temporario,
      width: '1240px',
      height: '1754px',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    await rename(temporario, destino);
    return destino;
  } finally {
    await contexto.close();
  }
}

/**
 * Ponto de entrada. Levanta o servidor, arranca o Chrome, exporta os tres
 * idiomas em sequencia e fecha tudo.
 * Nao recebe nada. Le do exterior: a arvore de ficheiros do repositorio e o
 * Google Chrome instalado. Escreve: <raiz>/pdf/portfolio-{pt,en,fr}.pdf.
 */
async function main() {
  const aqui = dirname(fileURLToPath(import.meta.url));
  const raizDoRepo = resolve(aqui, '..');
  const pastaPdf = join(raizDoRepo, 'pdf');

  await mkdir(pastaPdf, { recursive: true });

  const { servidor, porta } = await criarServidorEstatico(raizDoRepo);
  const baseUrl = `http://127.0.0.1:${porta}`;

  // Arrancar o Chrome instalado. Se falhar (Chrome ausente), abortar com uma
  // mensagem que nomeia a causa e sem deixar PDF parciais (REQ-001 CA-5).
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome' });
  } catch (erro) {
    servidor.close();
    console.error('Erro: nao foi possivel arrancar o Google Chrome.');
    console.error('Confirma que o Chrome esta instalado. Detalhe:', erro.message);
    process.exit(1);
  }

  try {
    console.log('A exportar o portefolio para PDF:');
    for (const alvo of ALVOS) {
      const caminho = await exportarIdioma(browser, baseUrl, alvo, pastaPdf);
      console.log(`  ${alvo.lang}  ->  ${caminho}`);
    }
    console.log(`\nConcluido. 3 PDF em ${pastaPdf}`);
  } finally {
    await browser.close();
    servidor.close();
  }
}

main().catch((erro) => {
  console.error('Falha na exportacao:', erro);
  process.exit(1);
});
