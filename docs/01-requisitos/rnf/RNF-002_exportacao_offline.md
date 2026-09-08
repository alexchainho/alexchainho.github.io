---
id: RNF-002
titulo: Exportação offline, sem download de browser
tipo: rnf
categoria: Portabilidade
modulo:
status: Implementada
criado: 2026-09-08
actualizado: 2026-09-08
aplica_a: [REQ-001]
decisoes: []
---

# RNF-002 — Exportação offline, sem download de browser

## Objectivo (o PORQUÊ)

O Playwright, por defeito, descarrega os seus próprios binários de Chromium
(centenas de MB) ao instalar. Num repositório de portefólio — estático, leve,
sem `package.json` na raiz — isso é peso e uma dependência de rede que não se
justifica: a máquina do dono já tem o Chrome instalado.

Além disso, a geração do PDF não deve precisar de internet. Se precisar, deixa
de se poder gerar o PDF num sítio sem rede, e passa a depender de serviços de
terceiros estarem no ar (o site carrega o beacon do Cloudflare Web Analytics).

## Requisito (QUÃO BEM)

1. A instalação das dependências em `tools/` **não** descarrega nenhum
   browser: instala-se o pacote `playwright` (a biblioteca), não os binários.
   Consegue-se com a variável `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` no
   `.npmrc`/ambiente, ou usando `playwright-core`.
2. O script abre o Chrome já instalado na máquina, via
   `chromium.launch({ channel: 'chrome' })`.
3. Depois de a página carregar, o script corta o acesso à rede do contexto
   (`page.route('**', route => route.abort())` ou `context.setOffline(true)`)
   antes de gerar o PDF, para que pedidos pendentes — beacon do Cloudflare,
   fontes remotas — não bloqueiem nem alterem o resultado.

## Âmbito

Aplica-se ao REQ-001 (`tools/export-pdf.mjs`) e à configuração de dependências
em `tools/`.

## Critérios de Aceitação

### CA-1

```
DADO   uma máquina com o Chrome instalado mas sem ligação à internet
QUANDO se corre `node tools/export-pdf.mjs`
ENTÃO  os três PDF são gerados na mesma, sem erro de rede
```

### CA-2

```
DADO   uma pasta tools/ sem node_modules
QUANDO se corre a instalação de dependências documentada no README de tools/
ENTÃO  o download não inclui nenhum browser Chromium
       (o output não mostra "Downloading Chromium"), só o pacote da biblioteca
```

## Rastreabilidade

| Elemento | Implementação |
|----------|---------------|
| Requisito | `tools/export-pdf.mjs`, `tools/package.json`, `tools/.npmrc` |
| CA-1, CA-2 | verificação manual na instalação e execução |
