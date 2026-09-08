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
