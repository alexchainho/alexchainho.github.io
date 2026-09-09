# Tarefas — Portfolio

Projecto iniciado: 2026-09-04

## Resumo

| Estado | Quantidade |
|---|---|
| Concluídas | 6 |
| Em progresso | 0 |
| Por fazer | 0 |

## Tarefas

- [x] Reposicionamento do perfil Fiverr a partir do portefólio
  - Início: 2026-09-09 19:45
  - Fim: 2026-09-09 20:21
  - Resultado em `docs/50_Fiverr/Perfil_e_Gigs.md`
  - Diagnóstico: perfil `alexchainho` tem 0 reviews, 0 portfolio, 0 work experience e `isActivationCompleted: false` desde Fev/2023
  - **4 gigs pausados** desde o arranque da conta (excel sheets, transcriptions, geographical contours, python code review) — invisíveis na API pública, daí `approvedGigsCount: 0`. Decisão: mantê-los pausados e criar gigs novos, por não haver equidade a preservar
  - Análise de mercado Fiverr: categoria GIS tem 1.300–1.600 gigs contra 21.000 em Software Development; a intersecção GIS + automação Python é o nicho escolhido (8 reviews bastam para "Fiverr's Choice" nesse nicho)
  - Produzidos: About me (EN, ~590 car.), 3 gigs completos (título/tags/3 pacotes/descrição/FAQ), correcção de skills, 6 entradas de Portfolio e 2 de Work Experience
  - Pendente do utilizador: confirmar rascunhos no painel de vendedor e decidir se pode nomear GNR/UEPS em contexto comercial

- [x] Exportação do portefólio para PDF (script offline)
  - Início: 2026-09-08 16:03
  - Fim: 2026-09-08 16:40
  - Spec: REQ-001, RNF-001, RNF-002 (todos Implementada)
  - `tools/export-pdf.mjs` — Node + `playwright-core` (`channel:'chrome'`, usa o Chrome instalado, sem download de browser)
  - Servidor HTTP local serve a raiz do repo (o site usa caminhos absolutos `/assets/...` que não resolvem com `file://`)
  - Antes de exportar: espera o JS traduzir os Marcos, expande todos os `<details>`, força imagens `loading="lazy"` a eager + scroll, bloqueia o beacon do Cloudflare
  - Saída: `pdf/portfolio-{pt,en,fr}.pdf` (~2.8 MB cada, 18 páginas), commitados no repo. `tools/node_modules/` e `pdf/*.tmp` no `.gitignore`
  - Verificado: 3 PDF gerados (exit 0); PT com texto de detalhe dos Marcos presente; EN todo em inglês sem resíduos PT; tema escuro confirmado visualmente (screenshot pág. 1 e 8)
  - Correr de novo sempre que o site mudar: `cd tools && npm run export-pdf`

- [x] Preparar `portfolio.html` para publicação em GitHub Pages
  - Início: 2026-09-04 20:00
  - Extraídas 6 imagens base64 embutidas (~2.5MB) para `assets/*.png`
  - HTML movido para `index.html` (2.8MB → ~380KB)
  - Selector PT/EN/FR e botão de tema movidos para o topo do cabeçalho
  - Removidos os controlos de extensão do texto "Sobre mim" (mantém sempre versão completa)
  - Testado localmente (servidor HTTP): diagramas, lightbox, idiomas e tema funcionam
  - Commit local `9d37539` criado
- [x] Criar repositório `alexchainho.github.io` no GitHub e publicar (Pages)
  - Início: 2026-09-04 20:35
  - Repo criado manualmente pelo utilizador (sem gh CLI instalado nesta máquina)
  - `git remote add origin` + `git push -u origin main`
  - GitHub Pages activo (Settings → Pages), confirmado em https://alexchainho.github.io/
- [x] Tema escuro por defeito
  - Início: 2026-09-04 20:40
  - `data-theme="dark"` no `<html>`; preferência guardada em localStorage continua a prevalecer
- [x] Melhorias SEO/AEO
  - Início: 2026-09-04 20:45
  - Open Graph + Twitter Card (imagem dedicada gerada em `assets/og-image.png`)
  - JSON-LD (schema.org Person), favicon SVG, canonical, `robots.txt`, `sitemap.xml`, `llms.txt`, meta author
- [x] Páginas estáticas EN/FR indexáveis (`/en/`, `/fr/`)
  - Início: 2026-09-04 21:10
  - Causa: PT/EN/FR trocavam só via JavaScript no cliente — crawlers sem JS (GPTBot, ClaudeBot, PerplexityBot) só viam PT
  - Corrigido bug de arquitectura: bootstrap do JS forçava sempre `'pt'` como idioma inicial (ignorava a página); passou a usar `data-page-lang` do `<html>`
  - Gerados `/en/index.html` e `/fr/index.html` por pré-renderização determinística (Node + jsdom): o próprio JS do site traduz o corpo no build, o resultado fica gravado como HTML já traduzido — sem depender de JS a correr no browser do visitante
  - Caminhos de `assets/` convertidos para `/assets/` (raiz-relativos) para funcionar em qualquer profundidade
  - `hreflang` cruzado (pt-PT/en/fr/x-default) no `<head>` das 3 páginas e no `sitemap.xml`
  - Descoberto e corrigido também um bug pré-existente: o Browser pane local mostrou estado inconsistente entre idiomas por cache/hot-reload — não era bug do site; validado por leitura directa dos ficheiros e `curl`
  - Testado localmente: PT, EN e FR carregam já no idioma certo antes de qualquer clique
- [x] Corrigir mistura de idiomas entre `/`, `/en/` e `/fr/`
  - Início: 2026-09-04 21:35
  - Bug encontrado em produção: `/`, `/en/` e `/fr/` partilham o mesmo domínio, logo o mesmo `localStorage`. O bootstrap lia `portfolio-language` do localStorage e sobrepunha-se ao idioma da própria página — visitar a raiz e depois `/en/` misturava PT e EN na mesma página
  - Corrigido: o URL passa a ser sempre a fonte da verdade do idioma inicial (`data-page-lang`); localStorage deixou de ser lido no arranque. Removida também a escrita em localStorage (só o botão continua a trocar idioma dentro da página, sem persistir)
  - `/en/` e `/fr/` regenerados a partir do fonte corrigido
  - Testado: clicar EN na raiz e depois navegar para `/fr/` já não mistura idiomas
- [x] Rever auditoria SEO de terceiros (ferramenta externa, PDF)
  - Início: 2026-09-04 21:40
  - Score 89/100 (A). Maior parte das sugestões "AEO/GEO" são genéricas de content-marketing (topic clusters, H1 como pergunta, FAQ forçado) — não aplicadas, destruiriam a identidade de um portefólio pessoal
  - Corrigido o único ponto real: `<img id="diagram-image">` (placeholder da lightbox) sem `alt` antes de qualquer clique → adicionado `alt="Diagrama seleccionado"` como fallback
  - Falso alarme confirmado: "compressão GZIP não activa" — medição directa (`curl -D-`) confirma `Content-Encoding: gzip` já activo (127KB reais vs 395KB brutos que a ferramenta reportou)
  - Headers de segurança em falta (X-Frame-Options, CSP, Referrer-Policy, etc.) são reais mas **não configuráveis em GitHub Pages** (sem suporte a headers HTTP customizados) — só resolvível migrando para Cloudflare Pages/Netlify/Vercel
- [x] Corrigir llms.txt (Lighthouse "Agentic Browsing", categoria nova) e rever auditoria tinycto.tv
  - Início: 2026-09-04 21:50
  - Lighthouse (oficial, PageSpeed Insights): 100/100/100/100 desktop, 99/100/100/100 mobile. Categoria nova "Agentic Browsing" acusava `llms.txt` sem links — spec exige `[texto](url)`; corrigido, passou a 3/3
  - Auditoria tinycto.tv/audit (score bruto 11/100): maioria dos itens ("API, Auth, MCP & Skill Discovery", "Commerce") mede prontidão para agentes **executarem acções** (MCP servers, OAuth, API catalog) — não aplicável a portefólio estático de leitura. Sub-scores relevantes já bons: AEO 88/100, SEO Crawl 100/100, Citation Score 100/100
  - Aplicado o que era real e barato: `robots.txt` com User-agent explícito para GPTBot/ClaudeBot/PerplexityBot/Google-Extended + `Content-Signal: ai-train=no, search=yes, ai-input=yes` (decisão do utilizador: não permitir treino de modelos com o conteúdo)
  - Não perseguido (exige servidor dinâmico, incompatível com GitHub Pages estático): Markdown content negotiation, Link headers/API catalog, OAuth discovery, DNS-AID, Web Bot Auth, MCP server
- [x] Remover rodapé "Como este portefólio foi montado"
  - Início: 2026-09-05
  - Removido `<footer class="foot">` e CSS associado (`.foot`, `.foot h2/p/.meta`); expunha caminho local `D:\0_Codigos` sem necessidade
  - `/en/` e `/fr/` regenerados; testado sem footer, sem erros de consola
- [x] Adicionar contactos (Email, LinkedIn, GitHub)
  - Início: 2026-09-05
  - Links no cabeçalho, logo abaixo do sub-título: `mailto:alexchainho@gmail.com`, `linkedin.com/in/alexchainho`, `github.com/alexchainho`
  - Adicionado `sameAs` ao JSON-LD (schema.org Person) com os mesmos 2 perfis — reforça a entidade para motores de pesquisa e IA
  - `/en/` e `/fr/` regenerados; testado visualmente, links correctos
- [x] Adicionar Cloudflare Web Analytics
  - Início: 2026-09-05
  - GitHub Insights → Traffic não mede visitas ao site publicado, só ao repositório (esclarecido ao utilizador). Analytics externo era a única forma real de medir tráfego
  - Escolhido Cloudflare Web Analytics: grátis, sem cookies, não exige apontar DNS para a Cloudflare (modo "beacon" via `<script>`, domínio continua no GitHub Pages)
  - Snippet com token adicionado ao `<head>` das 3 páginas (`/`, `/en/`, `/fr/`)
  - Testado localmente: sem erros de consola, sem impacto visual

## Histórico

- 2026-09-04 20:00 — Projecto criado a partir de `D:\0_Codigos\portfolio.html`. Estrutura `docs/` mínima (sem SDD completo, por ser página estática de 1 ficheiro).
- 2026-09-04 20:32 — Ajustes de layout (idioma/tema no cabeçalho, remoção dos botões de extensão do texto) e commit inicial local.
- 2026-09-04 20:40 — Push para GitHub, Pages activo. Site confirmado no ar em https://alexchainho.github.io/.
- 2026-09-04 20:45 — Tema escuro por defeito.
- 2026-09-04 21:00 — Melhorias SEO/AEO: Open Graph, Twitter Card, JSON-LD, favicon, robots.txt, sitemap.xml, llms.txt, meta author.
- 2026-09-04 21:30 — `/en/` e `/fr/` estáticos gerados por pré-renderização (Node + jsdom), corrige indexação multi-idioma para crawlers sem JavaScript.
- 2026-09-04 21:40 — Corrigido bug de mistura de idiomas entre páginas do mesmo domínio (localStorage deixou de decidir o idioma inicial).
- 2026-09-08 16:03 — SDD adoptado no projecto: criada `docs/01-requisitos/` com REQ-001 (Exportar portefólio para PDF), RNF-001 (Código explicado) e RNF-002 (Exportação offline). Todos aprovados. Tarefa "Exportação do portefólio para PDF (script offline)" iniciada.
- 2026-09-08 16:40 — `tools/export-pdf.mjs` concluído e verificado. Gera `pdf/portfolio-{pt,en,fr}.pdf` a partir do site (Chrome headless via `playwright-core`, Marcos expandidos, tema escuro). REQ-001 e RNF-002 passam a Implementada. Bug resolvido durante o desenvolvimento: `Promise.all` de eventos `load` de imagens pendurava o script — substituído por scroll + `waitForFunction` com limite de tempo.
- 2026-09-09 20:21 - Reposicionamento do perfil Fiverr. Extraidos os dados publicos do perfil (perseus-initial-props): 0 gigs aprovados, 0 reviews, activacao de vendedor incompleta desde Fev/2023. Analise de concorrencia na Fiverr identificou a interseccao GIS + automacao Python como nicho de baixa saturacao (categoria GIS com 1.300-1.600 gigs vs 21.000 em Software Development). Escrito `docs/50_Fiverr/Perfil_e_Gigs.md` com About me, 3 gigs, skills, portfolio e work experience prontos a publicar.
- 2026-09-09 20:40 - Correccao ao diagnostico: os 4 gigs estao PAUSADOS, nao inexistentes. Gigs pausados nao sao visiveis na API publica da Fiverr, o que produz o mesmo output que `nenhum gig`. Seccao 1 do documento reescrita; erro de metodo registado em `docs/lessons.md`. Decisao: manter os 4 pausados e criar gigs novos.
