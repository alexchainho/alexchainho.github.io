# Tarefas — Portfolio

Projecto iniciado: 2026-09-04

## Resumo

| Estado | Quantidade |
|---|---|
| Concluídas | 4 |
| Em progresso | 0 |
| Por fazer | 0 |

## Tarefas

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

## Histórico

- 2026-09-04 20:00 — Projecto criado a partir de `D:\0_Codigos\portfolio.html`. Estrutura `docs/` mínima (sem SDD completo, por ser página estática de 1 ficheiro).
- 2026-09-04 20:32 — Ajustes de layout (idioma/tema no cabeçalho, remoção dos botões de extensão do texto) e commit inicial local.
- 2026-09-04 20:40 — Push para GitHub, Pages activo. Site confirmado no ar em https://alexchainho.github.io/.
- 2026-09-04 20:45 — Tema escuro por defeito.
- 2026-09-04 21:00 — Melhorias SEO/AEO: Open Graph, Twitter Card, JSON-LD, favicon, robots.txt, sitemap.xml, llms.txt, meta author.
- 2026-09-04 21:30 — `/en/` e `/fr/` estáticos gerados por pré-renderização (Node + jsdom), corrige indexação multi-idioma para crawlers sem JavaScript.
- 2026-09-04 21:40 — Corrigido bug de mistura de idiomas entre páginas do mesmo domínio (localStorage deixou de decidir o idioma inicial).
