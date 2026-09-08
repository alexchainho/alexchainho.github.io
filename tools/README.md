# tools/ — ferramentas locais do portefólio

Correm **offline**, na máquina do dono. Não fazem parte do site publicado.

## export-pdf.mjs — gerar os PDF do portefólio

Gera `pdf/portfolio-pt.pdf`, `pdf/portfolio-en.pdf` e `pdf/portfolio-fr.pdf` a
partir das páginas do site (`index.html`, `en/`, `fr/`), com os "Marcos"
expandidos e o tema escuro mantido.

### Requisitos

- **Node 18+**
- **Google Chrome** instalado (o script usa o Chrome do sistema, não descarrega
  nenhum browser — a dependência é `playwright-core`)

### Instalar

```
cd tools
npm install
```

Não descarrega Chromium. Se o output mostrar "Downloading Chromium", algo está
errado — a dependência deve ser só `playwright-core`.

### Correr

```
cd tools
npm run export-pdf
```

Os três PDF são escritos (e substituídos) em `../pdf/`. Correr de novo sempre
que o conteúdo do site mudar — os PDF não se actualizam sozinhos.

### Como funciona

1. Levanta um servidor HTTP local a servir a raiz do repositório (o site usa
   caminhos absolutos como `/assets/...`, que não resolvem com `file://`).
2. Abre cada página num Chrome headless via Playwright.
3. Antes de exportar: espera o JavaScript traduzir o conteúdo, expande todos os
   `<details>`, força o carregamento das imagens `loading="lazy"`.
4. Bloqueia o beacon do Cloudflare para não depender de rede.
5. `page.pdf()` com `printBackground: true` e media `screen` — sai igual ao site.

Ver `docs/01-requisitos/rf/REQ-001_exportar_portfolio_pdf.md`.
