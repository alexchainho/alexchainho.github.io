# Fiverr — Perfil e Gigs

> Documento de trabalho para reposicionar o perfil Fiverr `alexchainho`.
> Não é documentação do site do portefólio — é material comercial derivado dele.
> **Data:** 2026-09-09

---

## 1. Diagnóstico do estado actual

Dados extraídos do bloco `perseus-initial-props` da página pública
(`https://www.fiverr.com/alexchainho`), em 2026-09-09.

| Campo | Valor |
|---|---|
| Conta criada | **2023-02-27** (há ~3,5 anos) |
| `sellerLevel` | `NEW_SELLER` |
| `approvedGigsCount` | **0** |
| `seller.gigs.nodes` | `[]` |
| `portfolios.totalCount` | **0** |
| `workExperiences.nodes` | `[]` |
| `activeEducations` / `certifications` | `[]` / `[]` |
| `rating` | `null` |
| Encomendas concluídas | nenhuma |
| `isActivationCompleted` (raiz) | **`false`** |
| `oneLinerTitle` | `null` |

### Conclusão

Os campos acima descrevem apenas a **vista pública**. Confirmado com o
utilizador em 2026-09-09 (captura do painel de vendedor): existem **4 gigs
pausados**, criados no arranque da conta.

> Gigs pausados não aparecem na página pública nem contam para
> `approvedGigsCount` — produzem exactamente o mesmo output que "nenhum gig".
> Ver `docs/lessons.md` (2026-09-09) sobre este erro de diagnóstico.

### Os 4 gigs pausados

| Gig | Alinha com o nicho escolhido? | Destino |
|---|---|---|
| `create excel sheets for your needs` | Não — é precisamente a âncora de preço a remover | Manter pausado |
| `deliver high quality transcriptions` | Não — outra categoria, dilui o perfil | Manter pausado |
| `create geographical contours and elevations` | Adjacente, mas vende um *output* commodity (€10–20), não automação de processo | Manter pausado |
| `review your python code` | Adjacente, mas serviço de baixo valor unitário | Manter pausado |

**Decisão: criar gigs novos, não editar os existentes.** No Gig 1 mudariam o
título, a categoria, as 5 tags, os 3 pacotes e a descrição inteira — 100% do
conteúdo. O único activo preservado seria o ID e a data de criação, e com 0
encomendas e 0 reviews isso não vale nada.

> Ressalva: a ideia de que "a Fiverr penaliza edições grandes" é folclore de
> vendedores, não documentação oficial — não é esse o argumento. O argumento é
> simplesmente que não há equidade acumulada para preservar.

**Não apagar os 4.** Pausados são invisíveis ao comprador, logo inofensivos, e
apagar é irreversível.

### Sobre as métricas do painel

As colunas de impressões/cliques/encomendas mostram `0`, mas o filtro está em
**"LAST 30 DAYS"** e os gigs estão pausados. Zero impressões num gig pausado é
tautológico — **não é sinal de que os gigs falharam**. Não há dados sobre como
correram quando estiveram activos.

### Estado por resolver

`isActivationCompleted: false` na raiz do payload, apesar de
`seller.user.isActivationCompleted: true`. Verificar no painel se falta algum
passo de verificação de identidade ou de método de pagamento — pode bloquear a
publicação.

### Incoerências detectadas

| Problema | Detalhe |
|---|---|
| **Inglês** | Campo estruturado diz `CONVERSATIONAL`; o texto "About me" diz *"I'm fluent in English"*. Escala Fiverr: Basic → Conversational → **Fluent** → Native/Bilingual. Corrigir o campo para `Fluent`, ou remover a afirmação do texto. |
| **Python subvalorizado** | Declarado como `INTERMEDIATE`, enquanto `Transcripts` e `Writing` estão como `PRO`. Face a ~304k linhas de Python no portefólio, isto é factualmente errado e prejudica o matching. |
| **Tom do About** | *"could bring value to your company"* é linguagem de candidatura a emprego, não de fornecedor de serviços. |
| **Lidera com a competência mais barata** | "15+ years of experience in Excel" ancora o preço no fundo do mercado. |

---

## 2. Análise de mercado (Fiverr, 2026-09-09)

Contagens obtidas das páginas de pesquisa da Fiverr.

| Pesquisa | Resultados | Categoria dominante | Preços observados |
|---|---|---|---|
| `python automation` | 69.000+ | Software Development (21.000) · Automations & Agents (12.000) | €10 – €271 |
| `gis mapping` | 23.000+ | **Geographic Information Systems (1.600)** | €10 – €452 |
| `arcgis` | 2.300+ | **Geographic Information Systems (1.300)** | €10 – €109 |
| `geospatial python automation` | 73.000 (alargado) | Software Development (21.000) | €14 – €136 |

### Leitura

1. **Automação Python genérica está saturada.** 33.000 gigs nas duas
   categorias principais. Agravante: os 4 primeiros resultados de `python
   automation` são vendedores marcados *"I speak Portuguese"*, a €10–28 —
   concorrência directa e mais barata, sem vantagem de idioma.

2. **GIS é uma categoria 13x mais pequena** (1.300–1.600 gigs contra 21.000 em
   Software Development) e com tecto de preço mais alto (€452 num Vetted Pro).

3. **Mas GIS *puro* também tem corrida ao fundo:** `Ayesha S`, Level 2 com
   **294 reviews**, vende "gis qgis arcgis mapping and spatial analysis" a
   partir de **€10**. Fazer mapas à mão em QGIS não é defensável.

4. **A intersecção é onde há espaço.** Evidência directa:

   | Vendedor | Badge | Reviews | Preço base | Gig |
   |---|---|---|---|---|
   | Chalitha Prabha | **Fiverr's Choice** | 8 | €73 | *custom GIS apps, automation scripts and web mapping tools* |
   | Prabhashini | Vetted Pro | 12 | €109 | *arcgis storymap, web gis, dashboard, interactive maps* |
   | Ciocirlie I. | Vetted Pro | 80 | €452 | *expert gis mapping, geospatial and satellite analysis* |

   **8 reviews chegam para o badge "Fiverr's Choice" neste nicho.** Em
   `python automation`, um Level 2 precisa de 30–50. É a medida directa de
   quão pouca gente compete em **GIS + automação Python**.

---

## 3. Posicionamento escolhido

> **Automação e pipelines geoespaciais em Python.**
> Não "faço mapas" — "automatizo o teu fluxo geoespacial".

**Porquê:** é a intersecção de duas competências onde poucos vendedores estão,
e é literalmente o que está no portefólio (`rasterio`, `geopandas`, `arcpy`,
ArcGIS REST API, jobs agendados, ETL, publicação automática de feature layers).

**Nicho secundário, a activar depois dos primeiros 3–5 reviews:**
IA local / RAG privado — *"nenhum documento sai da tua máquina"*. Argumento
RGPD que poucos conseguem sustentar tecnicamente. Não abrir já: um perfil de
New Seller com gigs dispersos por domínios diferentes converte pior.

### Expectativa realista

New Seller, zero reviews, conta de 2023 sem histórico. Os primeiros 2–3
trabalhos serão provavelmente abaixo do valor real, para gerar prova social.
Isso é custo de entrada, não sinal de mau posicionamento.

---

## 4. "About me" reescrito

> **Limite do campo na Fiverr: 600 caracteres.** A versão abaixo tem **~590**.

```
I turn manual geospatial workflows into automated pipelines that run on their own.

For over a decade I've built GIS and Python systems used daily in large-scale
emergency operations: reports that went from hours to minutes, hundreds of PDF
maps produced in a single run, scheduled jobs publishing live data every 10
minutes.

What I do for you:
- Python automation for spatial data (rasterio, geopandas, GDAL, arcpy)
- ArcGIS Online / Pro automation through the REST API
- ETL pipelines, scheduled jobs, automated reporting
- Interactive dashboards and web maps

Tell me the manual steps you repeat. I'll tell you what can be removed.
```

### Notas sobre este texto

| Decisão | Razão |
|---|---|
| Abre com o resultado, não com o currículo | O comprador procura resolução de problema, não biografia |
| "over a decade" em vez de "15+ years" | Conservador e verificável (plataformas GIS desde 2014, estatística operacional desde 2011) |
| Não nomeia a GNR | Ver secção 7 — decisão a confirmar |
| Termina com convite à conversa | Aumenta a taxa de mensagens, que é o que gera a primeira encomenda |
| **Sem link para o portefólio** | Ver aviso abaixo |

> ⚠️ **Links externos:** os Termos de Serviço da Fiverr restringem partilha de
> contactos e links que possam levar negócio para fora da plataforma. Um link
> para `alexchainho.github.io` na descrição do perfil é uma zona cinzenta e
> pode ser sinalizado. **Recomendação:** não pôr o link na descrição. Usar as
> imagens do Portfolio (secção 6) para mostrar o trabalho dentro da Fiverr.

---

## 5. Skills — correcções

### Estado actual (8 declaradas, nenhuma verificada)

| # | Skill | Nível | Acção |
|---|---|---|---|
| 1 | Excel | `PRO` | **Despromover** para o fundo da lista |
| 2 | Python | `INTERMEDIATE` | **Corrigir para `PRO`** e passar a 1.º |
| 3 | Geographic information systems (GIS) | `PRO` | Manter, passar a 2.º |
| 4 | Transcripts | `PRO` | **Remover** — dilui o perfil |
| 5 | Writing | `PRO` | **Remover** — dilui o perfil |
| 6 | Computer hardware | `PRO` | **Remover** — irrelevante para o nicho |
| 7 | English to Portuguese translation | `PRO` | **Remover** (ver nota) |
| 8 | Portuguese to English translation | `PRO` | **Remover** (ver nota) |

> Nota sobre tradução: são competências reais, mas estão noutra categoria da
> Fiverr. Manter tradução no mesmo perfil que automação geoespacial confunde o
> algoritmo de matching e o comprador. Se quiseres vender tradução, isso pede
> um segundo perfil ou uma decisão consciente de perfil generalista — que não
> é o que estamos a construir aqui.

### Ordem final proposta

```
1. Python                                    PRO
2. Geographic information systems (GIS)      PRO
3. ArcGIS                                    PRO
4. Data analysis                             PRO
5. Automation                                PRO
6. QGIS                                      INTERMEDIATE
7. SQL                                       INTERMEDIATE
8. Excel                                     PRO
```

Excel fica em último: continua a ser verdade, e apanha pesquisas laterais, mas
deixa de ser o que define o perfil.

---

## 6. Gigs

Regras de formato da Fiverr a respeitar:
- **Título:** máx. 80 caracteres, começa obrigatoriamente por "I will"
- **Tags:** 5 no máximo, minúsculas, máx. 20 caracteres cada
- **Descrição:** máx. 1200 caracteres
- **Comissão:** a Fiverr retém **20%** — um pacote de €120 rende €96

Ordem de publicação sugerida: **Gig 1 primeiro, sozinho.** Publicar os três de
uma vez, sem reviews, dispersa as impressões. Adicionar o 2 e o 3 depois do
primeiro review.

---

### GIG 1 — principal

**Título** (66 caracteres)
```
I will automate your GIS workflow with python, arcgis and geopandas
```

**Categoria:** Programming & Tech → Data → Geographic Information Systems
*(alternativa: Software Development → Script Development — testar qual traz mais impressões)*

**Tags**
```
gis automation
python script
arcgis
geospatial
geopandas
```

**Descrição** (~1.080 caracteres)
```
Do you repeat the same geospatial task by hand every week? I turn it into a
script that runs on its own.

For over a decade I've built GIS automation for large-scale emergency
operations: pipelines processing rasters that cover an entire country,
layers published live every 10 minutes, and reports that used to take days
now produced in one run.

WHAT I CAN AUTOMATE
- Batch processing of rasters and vectors: clip, reproject, mosaic, map algebra
- ArcGIS Online / Portal tasks through the REST API: publish, update, export
- Field data workflows: Field Maps, Survey123, QuickCapture
- Format conversion: Shapefile, GeoPackage, GeoJSON, KML, GPX, Parquet
- Scheduled jobs with logging, retries and failure alerts

TECH
Python, geopandas, rasterio, GDAL, shapely, pyproj, arcpy, ArcGIS REST API, QGIS

WHAT YOU GET
Commented code you can run and maintain yourself, a short setup guide, and a
walkthrough of how it works. No black boxes.

Not sure your task can be automated? Send me the manual steps you follow today
and I'll tell you honestly whether it is worth it.
```

**Pacotes**

| | Basic — Script | Standard — Pipeline | Premium — Production |
|---|---|---|---|
| **Preço** | €40 | €130 | €290 |
| **Prazo** | 3 dias | 7 dias | 14 dias |
| **Descrição** | One automation script for a single, well-defined task | Multi-step pipeline: read, process, export, with error handling | Scheduled production system with logging, retries and failure alerts |
| Input formats supported | 1 | 3 | Unlimited |
| Commented source code | ✔ | ✔ | ✔ |
| Setup guide | ✔ | ✔ | ✔ |
| Error handling & logging | — | ✔ | ✔ |
| Scheduled execution | — | — | ✔ |
| Revisions | 1 | 2 | 3 |

> **Racional do preço:** o mercado do nicho está a €73–€109 para vendedores com
> badge. Como New Seller sem reviews, o Basic a €40 é entrada; o Standard e o
> Premium é que reflectem o valor real. Não descer o Basic abaixo de €35 — a
> €10 atrai o tipo de comprador que dá mais trabalho e pior review.

**FAQ**
```
Q: I don't know if my task can be automated. Can you tell me first?
A: Yes, and for free. Describe the steps you do manually today. If automation
   isn't worth it in your case, I'll say so.

Q: Do I need an ArcGIS licence?
A: Not necessarily. Many workflows can run through the ArcGIS REST API or with
   open-source tools (GDAL, geopandas, QGIS) without a desktop licence. I'll
   tell you which applies to your case before you order.

Q: Will I be able to maintain the code myself?
A: That's the point. Code comes commented in plain English, with a setup guide
   and a walkthrough of how each step works.

Q: Can you work with my confidential data?
A: Yes. I can build and test on sample or anonymised data, and everything can
   run locally on your machine with no cloud service involved.
```

**Requisitos ao comprador** (formulário de encomenda)
```
1. Describe the task you currently do by hand, step by step.
2. What software do you use today? (ArcGIS Pro, ArcGIS Online, QGIS, Excel...)
3. Sample data, or a description of the format (Shapefile, GeoPackage, CSV,
   raster...) and rough size.
4. What should the final output be? (file, map, report, published layer)
5. How often does this need to run? (once, daily, weekly, on demand)
```

---

### GIG 2 — a publicar depois do 1.º review

**Título** (63 caracteres)
```
I will automate map production and bulk PDF map report generation
```

**Tags**
```
map automation
pdf report
cartography
arcgis
batch mapping
```

**Descrição** (~940 caracteres)
```
Producing the same map layout over and over, one area at a time? I automate it.

I've built systems that generate hundreds of PDF map reports in a single run
— work that previously took days and had to restart from zero on any network
failure.

WHAT THIS COVERS
- Batch map production from a template layout: one map per municipality,
  parcel, site or any boundary you define
- Automated PDF reports combining maps, tables, charts and photos
- Recurring reports: same layout, new data, no manual steps
- Export to PDF, PNG, Excel or PowerPoint

TECH
Python, arcpy, ArcGIS Pro layouts, matplotlib, contextily, reportlab, openpyxl,
python-pptx

WHAT YOU GET
The automation, your template preserved exactly as approved, and a guide so you
can re-run it yourself whenever the data changes.

Send me one example of the map or report you produce manually and how many you
need. I'll tell you what the automated version looks like.
```

**Pacotes**

| | Basic | Standard | Premium |
|---|---|---|---|
| **Preço** | €45 | €140 | €320 |
| **Prazo** | 4 dias | 8 dias | 15 dias |
| **Descrição** | Batch map export from one existing template | Automated PDF report: maps + tables + charts | Full recurring report system, scheduled and re-runnable |
| Map templates | 1 | 2 | Unlimited |
| Output formats | PDF | PDF + PNG | PDF, PNG, Excel, PPTX |
| Commented source code | ✔ | ✔ | ✔ |
| Scheduled execution | — | — | ✔ |
| Revisions | 1 | 2 | 3 |

---

### GIG 3 — a publicar depois do 2.º review

**Título** (61 caracteres)
```
I will build an interactive web map or geospatial dashboard
```

**Tags**
```
web map
gis dashboard
interactive map
arcgis online
data dashboard
```

**Descrição** (~900 caracteres)
```
Your spatial data is sitting in files nobody opens. I turn it into something
people actually use to decide.

I've designed and maintained operational dashboards used daily to coordinate
field teams: live positions, filterable maps, navigable timelines, and
multimedia from the field — with a 1 to 2 minute delay from collection to
screen.

WHAT I BUILD
- Interactive web maps with filters, search and pop-ups
- Real-time operational dashboards
- ArcGIS Online / Experience Builder apps
- Custom React dashboards when the off-the-shelf tools aren't enough
- Mobile data collection connected to the dashboard (Field Maps, Survey123)

TECH
ArcGIS Online, Experience Builder, Field Maps, Next.js, React, TypeScript,
Leaflet, Plotly, folium

WHAT YOU GET
A working dashboard, the source or app configuration, and a short guide on how
to update it as your data grows.
```

**Pacotes**

| | Basic | Standard | Premium |
|---|---|---|---|
| **Preço** | €60 | €190 | €450 |
| **Prazo** | 5 dias | 10 dias | 20 dias |
| **Descrição** | Single interactive web map with filters and pop-ups | Multi-page dashboard with charts and map | Custom dashboard with live data feed and mobile collection |
| Data layers | Up to 3 | Up to 8 | Unlimited |
| Charts / indicators | — | ✔ | ✔ |
| Live data updates | — | — | ✔ |
| Mobile data collection | — | — | ✔ |
| Revisions | 1 | 2 | 3 |

---

## 7. Portfolio (secção vazia — 0 entradas)

A Fiverr permite entradas com **imagem obrigatória**. Já tens material: o site
tem **6 diagramas de arquitectura descarregáveis**.

> ⚠️ **Decisão pendente antes de publicar:** as entradas abaixo estão escritas
> **sem nomear a GNR/UEPS** e sem identificar sistemas internos. O portefólio
> público já nomeia tudo isso, mas um perfil comercial que vende serviços com
> base em trabalho de uma força de segurança é um contexto diferente de um
> portefólio pessoal. Confirma o que podes nomear antes de publicar.

| # | Título | Imagem sugerida | Descrição |
|---|---|---|---|
| 1 | National-scale GIS platform for wildfire prevention | Diagrama Floresta Segura | Field data collection, automatic administrative and cadastral enrichment, live dashboard, and weekly automated reports in PDF, Excel and shapefile. Running in operational use since 2014. |
| 2 | Real-time emergency operations dashboard | Diagrama PIGE | Live view of ground and air teams with 1–2 minute delay, navigable timeline, nearest-unit calculation, and multi-year historical analysis. |
| 3 | Automated territorial analysis report | Screenshot Activação GTO | Single pipeline turning one incident number into a full territorial dossier — 39+ thematic maps, weather analysis, and susceptibility modelling — in 5 to 10 minutes instead of hours. |
| 4 | Bulk PDF map report generation | Screenshot ArcGIS Reports | Hundreds of PDF reports produced in one parallel run, with network-failure recovery. Previously days of manual work. |
| 5 | Automated weekly cartography workflow | Screenshot CAPVI | A weekly GIS process of dozens of manual steps reduced to two guided runs, with identical output regardless of who runs it. In production since 2025. |
| 6 | Daily wildfire risk raster (machine learning) | Mapa PoF | Per-pixel ignition probability for a whole country, combining ERA5-Land reanalysis, Canadian FWI indices, fuel, slope and fire history, trained with gradient boosting. |

---

## 8. Work Experience (secção vazia — 0 entradas)

Mesma ressalva da secção 7 quanto a nomear entidades.

### Versão A — sem nomear a entidade (mais segura)

| Campo | Valor |
|---|---|
| **Title** | GIS Analyst & Automation Developer |
| **Company** | Emergency & Civil Protection Sector — Portugal |
| **Period** | 2014 – Present |
| **Description** | Design and maintenance of national-scale GIS platforms and Python automation for emergency and wildfire-prevention operations. Field data collection systems, real-time dashboards, risk modelling, and scheduled production pipelines running from 10-minute to weekly cadence. |

| Campo | Valor |
|---|---|
| **Title** | Operational Data Analyst |
| **Company** | Emergency & Civil Protection Sector — Portugal |
| **Period** | 2011 – 2014 |
| **Description** | Built the first structured methods for operational statistics and georeferencing of incidents, including a pilot programme for preventive land inspection. |

### Versão B — nomeando (só se autorizado)

Substituir `Company` por `Guarda Nacional Republicana — Emergency Protection
and Rescue Unit (UEPS)`. Tem mais peso de credibilidade, mas expõe a entidade
num contexto comercial.

### Education

Não tens formação académica formal na área — e isso está assumido no
portefólio (*"a minha formação técnica é autodidacta"*). **Deixar a secção
vazia é melhor do que preencher com formação irrelevante.** A prova aqui é o
Portfolio (secção 7), com números, não credenciais.

---

## 9. Checklist de execução

- [x] Confirmar o estado dos gigs no painel — **4 pausados**, a manter pausados
- [ ] Verificar se falta algum passo de activação de vendedor
      (`isActivationCompleted: false` na raiz do payload)
- [ ] Decidir se pode nomear GNR/UEPS no perfil comercial
- [ ] Corrigir idioma: Inglês → `Fluent` (ou remover a afirmação do About)
- [ ] Substituir o texto "About me" (secção 4)
- [ ] Corrigir skills: remover 5, adicionar 4, corrigir Python para `PRO` (secção 5)
- [ ] Publicar **apenas o Gig 1** (secção 6)
- [ ] Preparar as 6 imagens do Portfolio e criar as entradas (secção 7)
- [ ] Criar as 2 entradas de Work Experience (secção 8)
- [ ] Após o 1.º review → publicar Gig 2
- [ ] Após o 2.º review → publicar Gig 3
- [ ] Após 3–5 reviews → avaliar abertura do nicho secundário (IA local / RAG)

---

## Histórico

| Data | Alteração |
|---|---|
| 2026-09-09 | Criação do documento. Diagnóstico do perfil, análise de mercado, posicionamento, About me, skills, 3 gigs, portfolio e work experience. |
| 2026-09-09 | **Correcção da secção 1.** A conclusão "nunca teve gigs publicados" estava errada: existem 4 gigs **pausados**, invisíveis à API pública. Acrescentada a tabela dos 4, a decisão de criar novos em vez de editar, e o aviso de que as métricas a `0` no painel são tautológicas (filtro de 30 dias sobre gigs pausados). Erro registado em `docs/lessons.md`. |
