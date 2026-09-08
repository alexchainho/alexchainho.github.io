---
id: REQ-001
titulo: Exportar portefólio para PDF
tipo: rf
modulo:
status: Implementada
criado: 2026-09-08
actualizado: 2026-09-08
depende_de: [RNF-001, RNF-002]
decisoes: []
---

# REQ-001 — Exportar portefólio para PDF

## Objectivo (o PORQUÊ)

O portefólio existe como site (`index.html`, `en/`, `fr/`) e é a forma
principal de o partilhar. Falta uma versão que se envie por email, se anexe a
uma candidatura ou se imprima — casos em que um link não serve.

`Ctrl+P` no browser não resolve: não há `@media print`, o tema escuro sai
desconfigurado, e a secção "Marcos do trabalho técnico" usa `<details>`
fechados com texto injectado por JavaScript — a impressão apanha-os vazios e
colapsados.

Sem este requisito, cada PDF é feito à mão, fica diferente de vez para vez e
nunca reflecte o estado actual do site.

## User Story (o QUEM)

Como dono do portefólio, quero gerar as versões PDF dos três idiomas com um
comando, para as partilhar sem depender do site e sem montar cada uma à mão.

## Requisito (o QUE faz)

O script `tools/export-pdf.mjs` renderiza cada uma das três páginas do site
(`index.html` → pt, `en/index.html` → en, `fr/index.html` → fr) num Chrome
headless controlado por Playwright, e grava um PDF por idioma em
`pdf/portfolio-<lang>.pdf`, commitado no repositório.

Antes de exportar cada página, o script, no contexto do documento:

1. chama `setLanguage(<lang>)` para fixar o idioma;
2. põe `open = true` em todos os elementos `<details>` (expande os Marcos);
3. aguarda que o texto de detalhe dos Marcos esteja renderizado no DOM.

O PDF é gerado com `printBackground: true` (mantém o tema escuro do site),
formato A4, e inclui todo o conteúdo visível do site — os cartões de projecto
todos e os sete diagramas — sem esconder secções.

## Restrições

- C-1: o site é servido pelo GitHub Pages (estático). Não há backend onde
  correr a geração — o script corre na máquina local do dono.
- C-2: os três HTML dependem de JavaScript para traduzir texto e preencher o
  detalhe dos Marcos. A renderização tem de executar esse JavaScript (um
  conversor HTML→PDF que não corra JS não serve).
- C-3: o Playwright usa o Chrome já instalado na máquina
  (`channel: 'chrome'`); ver RNF-002.

## Fora de Âmbito

- Botão de exportação no próprio site. A geração é offline, por comando.
- Versão condensada ou reformatada do portefólio. O PDF é o site tal como
  está, não um layout novo.
- CSS `@media print` dedicado ou tema claro para impressão. O tema escuro
  mantém-se.
- Automação em CI (GitHub Action). O script corre à mão quando o dono quiser
  actualizar os PDF.

## Critérios de Aceitação

### CA-1

```
DADO   o Chrome instalado e as dependências instaladas em tools/
QUANDO se corre `node tools/export-pdf.mjs`
ENTÃO  são criados ou actualizados três ficheiros em pdf/
       (portfolio-pt.pdf, portfolio-en.pdf, portfolio-fr.pdf) e o script
       termina com código de saída 0
```

### CA-2

```
DADO   o ficheiro pdf/portfolio-pt.pdf gerado
QUANDO se abre e se procura a secção "Marcos do trabalho técnico"
ENTÃO  cada marco mostra o respectivo texto de detalhe visível, e não o
       resumo "Ver detalhes" colapsado
```

### CA-3

```
DADO   o ficheiro pdf/portfolio-en.pdf gerado
QUANDO se abre e se lê o conteúdo
ENTÃO  o texto traduzível está em inglês — título da página, secção de
       perfil, detalhe dos Marcos e contagem de projectos
```

### CA-4

```
DADO   qualquer um dos três PDF gerados
QUANDO se compara com a página equivalente do site
ENTÃO  o fundo escuro do tema está impresso (não branco) e os sete diagramas
       aparecem como imagens
```

### CA-5

```
DADO   uma máquina sem Chrome instalado (channel:'chrome' falha ao arrancar)
QUANDO se corre o script
ENTÃO  termina com código de saída diferente de 0 e uma mensagem que nomeia a
       causa (Chrome não encontrado), sem deixar PDF parciais ou corrompidos
       em pdf/
```

## Rastreabilidade

| Elemento | Implementação |
|----------|---------------|
| Requisito | `tools/export-pdf.mjs` |
| CA-1..CA-5 | verificação manual pós-execução (ver `docs/40_Problemas_Solucoes/` se surgir) |
