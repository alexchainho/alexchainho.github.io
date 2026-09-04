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

## Histórico

- 2026-09-04 20:00 — Projecto criado a partir de `D:\0_Codigos\portfolio.html`. Estrutura `docs/` mínima (sem SDD completo, por ser página estática de 1 ficheiro).
- 2026-09-04 20:32 — Ajustes de layout (idioma/tema no cabeçalho, remoção dos botões de extensão do texto) e commit inicial local.
- 2026-09-04 20:40 — Push para GitHub, Pages activo. Site confirmado no ar em https://alexchainho.github.io/.
- 2026-09-04 20:45 — Tema escuro por defeito.
- 2026-09-04 21:00 — Melhorias SEO/AEO: Open Graph, Twitter Card, JSON-LD, favicon, robots.txt, sitemap.xml, llms.txt, meta author.
- 2026-09-04 21:30 — `/en/` e `/fr/` estáticos gerados por pré-renderização (Node + jsdom), corrige indexação multi-idioma para crawlers sem JavaScript.
