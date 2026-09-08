---
id: RNF-001
titulo: Código explicado
tipo: rnf
categoria: Manutibilidade
modulo:
status: Aprovada
criado: 2026-09-08
actualizado: 2026-09-08
aplica_a: []
decisoes: []
---

# RNF-001 — Código explicado

## Objectivo (o PORQUÊ)

O autor do projecto consegue dizer o que o sistema faz, mas não o que cada
função faz por dentro, passo a passo. Isso torna-o dependente de assistência
para manter código que é dele.

A explicação vive no código porque é aí que não se desactualiza. Documentação
noutro sítio diverge; um comentário ao lado da linha que explica não.

## Requisito (QUÃO BEM)

Todo o código **novo** cumpre as cinco regras:

1. Toda a função leva descrição (*docstring*): o que faz, o que recebe, o que
   devolve, e o que lê de fora (globais, ficheiros, ambiente).
2. Blocos com mais de ~5 linhas levam comentário a dizer que passo é aquele.
3. Quando a decisão não for óbvia, comentar o **PORQUÊ**, não o quê.
4. Proibidas descrições vazias: `"""Main function"""`, `"""Processa dados"""`,
   `"""Helper"""`. Se a descrição não acrescenta nada ao nome da função, está
   errada.
5. Em português.

Comentário útil vs ruído:

    i += 1    # incrementa i                          ← inútil: o código já diz
    i += 1    # a API conta a partir de 1, não de 0   ← útil: explica o porquê

## Âmbito

Todo o código novo do projecto. **Não** se aplica a código antigo que já
funciona — não refactorizar nem re-comentar só para cumprir esta regra.

## Critérios de Aceitação

### CA-1

```
DADO   um ficheiro de código novo criado neste projecto
QUANDO se abre esse ficheiro e se percorrem todas as funções
ENTÃO  todas têm descrição não-vazia que diz o que faz, recebe, devolve e lê
       de fora
```

### CA-2

```
DADO   uma função nova com um bloco de mais de 5 linhas
QUANDO se lê o bloco
ENTÃO  existe um comentário que identifica o passo
```

### CA-3

```
DADO   uma pessoa que não escreveu o código
QUANDO lê o ficheiro sem o executar
ENTÃO  consegue seguir o que ele faz, passo a passo
```

### CA-4

```
DADO   o código novo do projecto
QUANDO se procuram descrições genéricas ("Main function", "Helper",
       "Processa dados")
ENTÃO  não se encontra nenhuma
```

## Rastreabilidade

| Elemento | Implementação |
|----------|---------------|
| Requisito | todo o `src/` novo |
| CA-1..CA-4 | revisão de código |
