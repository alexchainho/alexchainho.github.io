# Lições — padrões de erro e como evitá-los

Rever no início de cada sessão.

---

## 2026-09-08 — Scripts de teste/verificação dentro da árvore do projecto

**Erro:** durante o desenvolvimento do `tools/export-pdf.mjs`, criei
`tools/_shot.mjs` (screenshot de verificação) e `tools/run.log` dentro da pasta
do projecto. O utilizador reparou: *"porque temp? deve estar a trabalhar na
pasta do projeto"* — no sentido inverso: ficheiros de apoio à verificação não
pertencem ao repo.

**Regra para mim:**
- Ficheiros efémeros (screenshots de verificação, scripts de teste rápido,
  outputs intermédios) → sempre no **scratchpad** da sessão, nunca em `src/`,
  `tools/` ou outra pasta versionada.
- O único artefacto que vai para o repo é o **entregável** (aqui: os PDF em
  `pdf/` e o `tools/export-pdf.mjs`).
- Se um script de verificação precisa de resolver `import` de um pacote
  instalado em `tools/node_modules`, corre-o a partir de `tools/` com um nome
  `_tmp*.mjs` e apaga-o no mesmo comando — não o deixes ficar.

---

## 2026-09-08 — `Promise.all` de eventos `load` de imagens pendura headless

**Erro:** para garantir que as imagens estavam carregadas antes do
`page.pdf()`, usei dentro de `page.evaluate` um
`Promise.all(imgs.map(img => new Promise(res => img.addEventListener('load', res))))`.
Imagens com `loading="lazy"` fora do viewport nunca disparam `load` em headless,
e o `Promise.all` nunca resolvia — script pendurado sem qualquer output.

**Regra para mim:**
- Nunca esperar indefinidamente por eventos do browser. Toda a espera leva
  limite de tempo (`waitForFunction(..., { timeout })`) e um caminho de
  desistência.
- Para imagens lazy: marcar `img.loading = 'eager'`, **rolar a página de cima a
  baixo** para as trazer ao viewport, e só depois esperar por
  `Array.from(document.images).every(i => i.complete)` com timeout.
- Se a espera falhar, seguir em frente com aviso — um PDF com uma imagem em
  falta é melhor que um script pendurado.

---

## 2026-09-09 — Contradizer o utilizador com base em dados públicos incompletos

**Erro:** o utilizador disse ter gigs na Fiverr, "mas desactualizados". Extraí o
JSON da página pública do perfil, vi `approvedGigsCount: 0` e
`seller.gigs.nodes: []`, e escrevi que ele estava enganado — que "o perfil nunca
teve gigs publicados" e que, a existir algo, "está em rascunho ou foi recusado".
Enumerei os estados possíveis e **faltou-me o estado real: pausado**. O
utilizador mostrou o painel de vendedor: 4 gigs pausados desde a criação da
conta. Gigs pausados não aparecem na API pública nem contam para
`approvedGigsCount` — exactamente o mesmo output que "nenhum gig".

**Causa raiz:** confundi *ausência de evidência* com *evidência de ausência*. Um
endpoint público só mostra o que é público; a inexistência de um registo aí não
prova a inexistência do registo no sistema.

**Regra para mim:**
- Antes de contradizer o utilizador com dados obtidos de uma fonte *parcial*
  (API pública, página não autenticada, cache), perguntar primeiro: **que
  estados é que esta fonte, por desenho, não consegue ver?** Rascunho, pausado,
  privado, apagado, restrito por região — todos dão o mesmo vazio.
- A regra global manda ser objectivo e corrigir o utilizador quando ele está
  errado. Isso continua válido — mas exige a mesma vara de medir para mim: só
  contradizer quando a fonte é **capaz** de observar o que estou a negar.
- Formulação correcta neste caso teria sido: *"a vista pública não mostra
  nenhum gig — o que é compatível com estarem pausados, em rascunho ou
  recusados. Confirma no painel qual é o caso, porque a estratégia muda."*
  Em vez disso afirmei o mais forte dos três.
