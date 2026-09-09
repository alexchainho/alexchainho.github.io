# AGENTS.md — Portfolio

> Regras específicas deste projecto. As regras globais (`~/.config/opencode/AGENTS.md`)
> aplicam-se sempre; este ficheiro só acrescenta ou concretiza o que é próprio
> daqui.

## O que é este projecto

Site estático (`index.html`, `en/`, `fr/`) publicado no GitHub Pages
(`https://alexchainho.github.io/`). Sem backend, sem build step para o site
em si — o HTML de cada idioma é gerado uma vez por pré-renderização e depois
fica estático no repositório.

## Estrutura

- `index.html`, `en/index.html`, `fr/index.html` — as três páginas publicadas.
- `assets/` — imagens, favicon, imagem Open Graph.
- `tools/` — scripts Node **offline**, correm à mão na máquina do dono, não
  fazem parte do site publicado (ver `tools/README.md`).
- `pdf/` — PDF gerados por `tools/export-pdf.mjs`, commitados no repo.
- `docs/` — SDD (`01-requisitos/`), tarefas, lições, diário de bordo.

## Decisões que não repetir/reverter sem discutir primeiro

- **`playwright-core` + `channel:'chrome'`** em `tools/`, nunca `playwright`
  normal — não pode descarregar Chromium (RNF-002).
- **Localização inicial pelo URL** (`data-page-lang`), nunca por
  `localStorage` — as três páginas partilham domínio e localStorage; ler o
  idioma daí no arranque mistura idiomas entre `/`, `/en/`, `/fr/` (bug já
  corrigido uma vez, ver `docs/tasks.md` 2026-09-04 21:35).
- **Sem CSS `@media print` nem tema claro para impressão** — o PDF usa o tema
  escuro do site tal como está (decisão em REQ-001, "Fora de Âmbito").
- **Sem automação em CI** para os PDF — corre-se à mão quando o site mudar.

## Antes de mexer no HTML dos 3 idiomas

`en/index.html` e `fr/index.html` são gerados por pré-renderização a partir
do mesmo motor de tradução do `index.html` (ver histórico em
`docs/tasks.md`, entrada 2026-09-04 21:10). Uma alteração de conteúdo em
`index.html` tem de se reflectir nos outros dois — não editar `en/` ou `fr/`
directamente sem regenerar.

## Documentação

Ver `docs/00_INDICE_Portfolio.md` para o mapa completo. SDD em
`docs/01-requisitos/` — ver regra global antes de adicionar funcionalidade
nova sem requisito aprovado.
