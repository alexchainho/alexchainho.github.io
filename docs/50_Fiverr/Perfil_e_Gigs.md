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

> **Limite do campo na Fiverr: 600 caracteres.** A versão abaixo tem **588**
> (contagem exacta, com margem de 12 caracteres — a estimativa "~590" da
> primeira versão estava errada: o texto original tinha 635, acima do limite).

```
I turn manual geospatial workflows into automated pipelines that run on their own.

Over a decade building GIS and Python systems for emergency operations: reports
from hours to minutes, hundreds of PDF maps in a single run, scheduled jobs
publishing live data every 10 minutes.

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

**Categoria e configuração confirmadas no formulário Fiverr:**
```
Programming & Tech → Software Development
Service Type: Scripting
Programming language: Python
```

**Expertise** (seleccionar)
```
Algorithms & Data structures
Databases
Debugging
Performance
Testing procedures
```

> Não seleccionar `Localization`: na Fiverr significa adaptação de software a
> idioma/região, não geolocalização ou GIS. Não seleccionar frameworks de
> frontend/backend: este Gig entrega scripts e pipelines Python, não uma
> aplicação web.

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

|                          | Basic — Script                                        | Standard — Pipeline                                             | Premium — Production                                                 |
| ------------------------ | ----------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Preço**                | $40                                                   | $130                                                            | $290                                                                 |
| **Prazo**                | 3 dias                                                | 7 dias                                                          | 14 dias                                                              |
| **Descrição**            | One automation script for a single, well-defined task | Multi-step pipeline: read, process, export, with error handling | Scheduled production system with logging, retries and failure alerts |
| Pages mined/scraped      | 0 / Not applicable                                    | 0 / Not applicable                                              | 0 / Not applicable                                                   |
| Sources mined/scraped    | 0 / Not applicable                                    | 0 / Not applicable                                              | 0 / Not applicable                                                   |
| Install script           | —                                                     | —                                                               | —                                                                    |
| Test script              | ✔                                                     | ✔                                                               | ✔                                                                    |
| Task automation          | ✔                                                     | ✔                                                               | ✔                                                                    |
| Revisions                | 1                                                     | 2                                                               | 3                                                                    |

> **Racional do preço:** o mercado do nicho foi observado a €73–€109 para vendedores com
> badge; o formulário de criação da Fiverr fixa o preço-base do Gig em USD,
> mesmo com a conta configurada para apresentação em EUR. Como New Seller sem
> reviews, o Basic a $40 é entrada; o Standard e o Premium é que reflectem o
> valor real. Não descer o Basic abaixo de $35 — a $10 atrai o tipo de comprador
> que dá mais trabalho e pior review.

**Extras:** deixar todos desmarcados nesta primeira versão. `Pages` e `Sources`
não se aplicam a automação GIS; `Test script` e `Task automation` já pertencem
ao serviço base; e não convém prometer instalação remota, entrega acelerada ou
revisões adicionais antes de conhecer os pedidos iniciais.

**Galeria** (carregar por esta ordem; máximo Fiverr: 3 imagens)

| # | Ficheiro | Papel | Aviso incluído |
|---|---|---|---|
| 1 | `assets/fiverr-gig-gis-automation-cover.png` | Capa: promessa do Gig e tecnologias principais | `Illustrative workflow — tailored to your data and requirements.` |
| 2 | `assets/fiverr-gig-gis-automation-workflow.png` | Explica o fluxo dados espaciais → pipeline Python → resultados | `Illustrative workflow — tailored to your data and requirements.` |
| 3 | `assets/fiverr-gig-gis-automation-architecture.png` | Prova técnica: arquitectura pública Floresta Segura | `Example architecture based on real-world GIS automation work.` |

As três imagens são PNG a 1280×769. As duas primeiras são infografias
originais; a terceira adapta `assets/diagrama-floresta.png`, já público no
portefólio. Não declarar que foram geradas por IA: os avisos distinguem
explicitamente fluxo ilustrativo de arquitectura baseada em trabalho real.

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

Fonte: os **6 diagramas de arquitectura** da secção "Marcos do trabalho
técnico" do site (`index.html`, já em `assets/diagrama-*.png`), agrupados em
**4 entradas** (uma por marco com diagrama — dois marcos têm 2 diagramas
cada).

> **Decisão confirmada (2026-09-10):** as entradas nomeiam GNR, UEPS, SEPNA e
> CIPO abertamente, tal como o portefólio público já faz.
>
> **Campos reais do formulário** (confirmados por captura do painel,
> 2026-09-10): Project name (máx. **50** caracteres), Industry (dropdown
> fechado, máx. 6, dezenas de opções), Project duration (dropdown),
> **Project cost** (campo obrigatório, $), Project started on (mês + ano),
> Project description (máx. **1400** caracteres). Corrige a versão anterior
> desta secção, que assumia — incorrectamente — títulos longos e descrição
> sem limite confirmado.
>
> **Project cost:** não é uma factura real (os projectos foram feitos como
> funcionário da GNR, não como freelancer). É uma **estimativa de valor de
> mercado** — quanto custaria contratar um freelancer/agência sénior para
> construir isto de raiz, à taxa de ~€45–60/h para GIS+Python sénior,
> ajustada à complexidade e duração de cada projecto.
>
> **Project started on:** os Marcos do site só têm o ano, não o mês exacto.
> Assumido Janeiro por defeito (Fevereiro para o CIPO, cuja tempestade
> desencadeadora foi "início de 2026") — **corrigir se souberes o mês real.**
>
> **Industry:** a lista é fechada com dezenas de opções; não é possível
> adivinhar todas. Abaixo estão sugestões a procurar no filtro de texto do
> dropdown — confirmar quais existem antes de publicar.

---

### Entrada 1 — Operação Floresta Segura

| Campo | Valor |
|---|---|
| **Project name** (47/50) | `National-scale GIS platform wildfire prevention` |
| **Industry** | `Public Sector`, `Forestry` *(já confirmadas no painel)* |
| **Project duration** | `6+ months` |
| **Project cost** | `$28,000` — plataforma nacional completa (app de campo + dashboard + relatórios automáticos), em uso desde 2014 |
| **Project started on** | Janeiro 2014 *(assumido)* |
| **Imagem** | `assets/diagrama-floresta.png` |

**Descrição** (1215 caracteres)
```
Client: Guarda Nacional Republicana (GNR), Portugal's national police force, within its SEPNA environmental protection unit.

Goal: replace paper-based rural-land inspection reports with a nationwide, structured GIS workflow usable by both field officers and command staff.

My role: designed and built the full GIS architecture end to end, from field data collection to the command dashboard to recurring reporting.

What I built:
- A Field Maps form for officers: captures GPS location, auto-calculates parish/municipality/district, cross-checks the DGT and BUPi land registries to identify the rural property, flags potential infringements, records the officer's post, and attaches 1-4 photos.
- A real-time ArcGIS Experience Builder dashboard for command staff, with a permission-limited editing view, CSV export, charts and a planning area.
- A weekly Python + ArcGIS Pro job that backs up the data and produces PDF, Excel and shapefile reports broken down by parish, municipality or district, distributed automatically via SharePoint.

Result: the platform evolved from manual georeferencing methods (2011-2017) into the national system still in daily operational use today, covering all of mainland Portugal.
```

---

### Entrada 2 — PIGE

| Campo                    | Valor                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| **Project name** (40/50) | `Real-time emergency operations dashboard`                                                       |
| **Industry**             | `Public Sector`, `Government`, `Emergency Services` *(procurar se existir)*                      |
| **Project duration**     | `6+ months`                                                                                      |
| **Project cost**         | `$45,000` — o mais complexo dos 4 (app móvel + dashboard + evolução React + integração WhatsApp) |
| **Project started on**   | Janeiro 2020 *(assumido)*                                                                        |
| **Imagens**              | `assets/diagrama-pige-arcgis.png` + `assets/diagrama-pige-react.png`                             |

**Descrição** (1295 caracteres)
```
Client: Guarda Nacional Republicana (GNR), within its UEPS Emergency Protection and Rescue Unit.

Goal: give command staff a live, unified picture of ground and helicopter teams during wildfire and emergency operations, instead of fragmented radio reports.

My role: designed and built the Integrated Emergency Management Platform (PIGE) end to end, then led its evolution into a faster React-based version.

What I built:
- Mobile data collection with Esri QuickCapture and Field Maps: patrol start/arrival/departure, approach photos (critical for helicopter decisions), short videos, position pings at intervals adjusted to ground or air speed, and one-tap resource requests.
- A real-time ArcGIS Experience Builder dashboard: separate ground/helicopter timelines, a 12-hour activity map, equipment locations from the last 3 minutes, a resource-request page with nearest-unit calculation, and multi-year historical analysis.
- PIGE Next-Gen: a React application that mirrors the dashboard with a dedicated local-data server, for faster browsing and in-page video playback.
- A Docker service that routes QuickCapture data into predetermined WhatsApp groups for field alerts.

Result: command staff now see field activity with a 1-2 minute delay, used daily to coordinate operations nationwide.
```

---

### Entrada 3 — SEPNA (EMEIF + DIVDIR)

| Campo                    | Valor                                                                 |
| ------------------------ | --------------------------------------------------------------------- |
| **Project name** (45/50) | `Wildfire command and monitoring GIS platforms`                       |
| **Industry**             | `Public Sector`, `Environmental Services`/`Environment`, `Government` |
| **Project duration**     | `6+ months`                                                           |
| **Project cost**         | `$22,000` — duas plataformas, complexidade média                      |
| **Project started on**   | Janeiro 2022 *(assumido)*                                             |
| **Imagens**              | `assets/diagrama-emeif.png` + `assets/diagrama-divdir.png`            |

**Descrição** (1356 caracteres)
```
Client: Guarda Nacional Republicana (GNR), within its SEPNA environmental and forest protection unit.

Goal: unify incoming forest-fire-related reports from many different sources into one structured, auditable record, and give command staff a single live view for decision-making.

My role: designed and built two complementary platforms end to end.

What I built:
- EMEIF Alerts: a reporting system covering four report sources - fixed surveillance (watchtowers, forest video), mobile patrols (GNR, UEPS, fire service, municipal, ICNF, Army), public 112 calls, and aerial surveillance (drones, helicopters). Includes a dashboard by surveillance type, a filtered map, a full record list with CSV export, automatic calculation-error checks, and a guided editing form.
- DIVDIR: the main command-support platform, with a live timeline of active ANEPC incidents, a daily-alert indicator, UEPS helicopter-team records with photos/video, Air Force drone planning, watchtower visibility mapping, and links to national weather and civil-protection data.
- A local bot that automatically converts incoming Excel-based field reports into published feature layers, keeping source records and command view in sync.

Result: two platforms in daily operational use, reducing manual data conversion and improving consistency between field reports and command decisions.
```

---

### Entrada 4 — CIPO

| Campo                    | Valor                                               |
| ------------------------ | --------------------------------------------------- |
| **Project name** (44/50) | `Multi-agency work-monitoring platform (CIPO)`      |
| **Industry**             | `Public Sector`, `Government`, `Forestry`           |
| **Project duration**     | `6+ months`                                         |
| **Project cost**         | `$15,000` — o mais pequeno, resposta rápida a crise |
| **Project started on**   | Fevereiro 2026 *(tempestade em "início de 2026")*   |
| **Imagem**               | `assets/diagrama-cipo.png`                          |

**Descrição** (1217 caracteres)
```
Client: Guarda Nacional Republicana (GNR), as part of CIPO - Integrated Command for Prevention and Operations, a multi-agency response to severe storm damage in central Portugal.

Goal: after Storm Kristin, coordinate forest-road clearance and prevention work across several agencies and give command staff a single reliable view of planning versus execution.

My role: designed and built the work-monitoring platform, from field data collection to the daily situation report.

What I built:
- A Field Maps layer for field teams to record and validate completed areas and road segments directly, without a separate reporting step.
- A script that converts shared multi-agency planning (Google Sheets from GNR, FEPS, UEPS, ICNF, Armed Forces and municipalities) into ArcGIS Online feature layers.
- A daily process that cross-checks planning against field-validated execution, fills in missing administrative data (parish, municipality, district, NUTS), generates the daily SITREP, republishes the feature layer, shares it with AGIF GeoSiFOR, and creates a local backup via Google Drive.

Result: a platform that keeps multiple agencies working from the same up-to-date picture of prevention work, still in active use.
```

---

### Descartado desta versão

As 4 entradas antigas baseadas noutras secções do site (Activação GTO, ArcGIS
Reports, CAPVI, PoF) saíram do Portfolio da Fiverr — não são "Marcos" e
misturavam a fonte das imagens. Continuam disponíveis como material dos Gigs
2 e 3 (secção 6) se fizer sentido usá-las aí mais tarde.

---

## 8. Work Experience (secção vazia — 0 entradas)

> **Decisão confirmada (2026-09-11):** usar três entradas para representar a
> cronologia completa: Exército Português (2001--2005), serviço contínuo na
> GNR (desde 14 de Novembro de 2005) e a especialização técnica em GIS dentro
> da GNR (desde 2011). Nas duas entradas GNR, Company = `Guarda Nacional
> Republicana (GNR)`, nome que abrange GIPS, SEPNA, UEPS e o programa
> multi-agência CIPO.

| Campo           | Valor                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| **Title**       | Military Service Member                                                                                    |
| **Company**     | Portuguese Army                                                                                            |
| **Period**      | Sep 2001 – Nov 2005                                                                                        |
| **Description** | Served in the Portuguese Army from 2001 to 2005, beginning at the Escola Prática de Infantaria in Mafra and including an international NATO/SFOR mission in Bosnia and Herzegovina from 2002 to 2003. Alongside military and operational training, developed practical office and information-management skills with Microsoft Excel and Word: creating small structured tables, organising operational information, and preparing clear documents. This was the foundation for the data analysis and structured reporting work developed later in emergency operations. |

| Campo           | Valor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title**       | GNR Operational Officer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Company**     | Guarda Nacional Republicana (GNR)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Period**      | Nov 2005 – Present                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Description** | Continuous operational service in Portugal's National Republican Guard since November 2005. Joined the GIPS Emergency Protection and Rescue Group in May 2006, serving in helicopter-transported wildfire-fighting teams before moving to the situation room to monitor and follow GIPS operational activity. Before 2011, I developed the reporting and data-handling capabilities needed in that environment: Excel reports with coordinate fields, consolidation of reports into other Excel data files, and VBA macros that converted records into KML files. Those processes created the first georeferenced GIPS data and connected field activity to a common operational picture. I continued in GIPS's successor, the UEPS, from 2018. This practical experience of field teams, command needs and real reporting constraints remains the basis for my technical work. |

| Campo           | Valor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title**       | GIS Analyst & Automation Developer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Company**     | Guarda Nacional Republicana (GNR)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Period**      | 2011 – Present                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Description** | Since 2011, I have turned operational information needs into GIS systems and automation. I started with incident statistics and georeferencing from Excel reports containing coordinate fields, using VBA to consolidate data and create KML files. From 2014, the first operational platforms combined Excel and Google Earth; the workflows then moved to QGIS in 2017-2018, ArcMap from 2019, and later ArcGIS Online and ArcGIS Pro. I began learning Python through short courses in 2022. From 2023, AI-assisted development enabled me to turn operational needs into my own tools more quickly. I now design and maintain national-scale GIS platforms for GNR units, including field data collection, automatic administrative and cadastral enrichment, real-time dashboards, map and report production, controlled data-sharing workflows, and Python pipelines. Current work includes authenticated REST API integrations, ArcGIS Online publishing, PDF, Excel and geographic exports, scheduled processes from every 10 minutes to weekly, risk and weather data pipelines, and the multi-agency CIPO work-monitoring programme. The focus is to replace repeatable manual work with reliable, documented systems that operators can use and maintain. |

### Education

Incluir apenas a formação actual. As matrículas anteriores não concluídas não
devem constar no perfil público.

| Campo | Valor |
|---|---|
| **Institution** | Universidade Aberta |
| **Degree** | Bachelor's Degree in Computer Engineering |
| **Field of study** | Computer Engineering |
| **Start date** | September 2026 |
| **Status** | Enrolled — classes begin on 14 September 2026 |

> Não declarar unidades curriculares concluídas ou uma data de fim enquanto o
> curso não tiver começado. A experiência demonstrada no Portfolio continua a
> ser a principal prova técnica do perfil.

---

## 9. Checklist de execução

- [x] Confirmar o estado dos gigs no painel — **4 pausados**, a manter pausados
- [ ] Verificar se falta algum passo de activação de vendedor
      (`isActivationCompleted: false` na raiz do payload)
- [x] Decidir se pode nomear GNR/UEPS no perfil comercial — **sim**, decidido 2026-09-10
- [ ] Corrigir idioma: Inglês → `Fluent` (ou remover a afirmação do About)
- [ ] Colar o texto "About me" no painel (texto final pronto, 588 car. — secção 4)
- [ ] Corrigir skills: remover 5, adicionar 4, corrigir Python para `PRO` (secção 5)
- [ ] Publicar **apenas o Gig 1** (secção 6)
- [ ] Criar as 4 entradas de Portfolio no painel: nome, indústria (confirmar
      no dropdown), duração, **custo estimado**, data de início e descrição —
      tudo pronto na secção 7, imagens já existem em `assets/`
- [ ] Criar as 3 entradas de Work Experience (texto pronto, cronologia completa — secção 8)
- [ ] Criar a entrada de Education: Universidade Aberta, Engenharia Informática, início em Setembro de 2026 (secção 8)
- [ ] Após o 1.º review → publicar Gig 2
- [ ] Após o 2.º review → publicar Gig 3
- [ ] Após 3–5 reviews → avaliar abertura do nicho secundário (IA local / RAG)

---

## Histórico

| Data | Alteração |
|---|---|
| 2026-09-09 | Criação do documento. Diagnóstico do perfil, análise de mercado, posicionamento, About me, skills, 3 gigs, portfolio e work experience. |
| 2026-09-09 | **Correcção da secção 1.** A conclusão "nunca teve gigs publicados" estava errada: existem 4 gigs **pausados**, invisíveis à API pública. Acrescentada a tabela dos 4, a decisão de criar novos em vez de editar, e o aviso de que as métricas a `0` no painel são tautológicas (filtro de 30 dias sobre gigs pausados). Erro registado em `docs/lessons.md`. |
| 2026-09-10 | **About me corrigido:** a contagem "~590" estava errada (real: 635, acima do limite de 600). Texto reduzido para 588 caracteres. **Portfolio (secção 7) reescrito:** as 4 entradas passam a espelhar directamente os "Marcos do trabalho técnico" do site (Floresta Segura, PIGE, SEPNA, CIPO), com as 6 imagens já existentes em `assets/diagrama-*.png` e texto adaptado da versão inglesa do site (`en/index.html`). Saem as 4 entradas antigas de outras secções do site (GTO, ArcGIS Reports, CAPVI, PoF). **Decisão tomada:** nomear GNR/UEPS/SEPNA/CIPO abertamente no perfil comercial — aplicado também à secção 8 (Work Experience), que deixa de ter duas versões (A/B) e passa a nomear "Guarda Nacional Republicana (GNR)" directamente. |
| 2026-09-10 | **Correcção dos campos do Portfolio**, a partir de captura de ecrã do formulário real da Fiverr: Project name tem limite de **50** caracteres (não os títulos longos assumidos antes), Project description tem limite de **1400** (não ~400-460 como se assumira sem confirmação), e existem 3 campos novos não previstos — Industry (dropdown fechado), Project duration e **Project cost** (obrigatório, em $). Descrições das 4 entradas reescritas para usar o espaço até 1400 caracteres, no formato client/goal/role/what-I-built/result. Custo de cada projecto definido por estimativa de valor de mercado (não é factura real — os projectos foram feitos como funcionário da GNR), explicitado no documento para não ser lido como facto. Datas de início assumidas a partir do ano dos Marcos (mês não disponível na fonte), marcadas para confirmação. |
| 2026-09-11 | **Work Experience corrigida:** a GNR não começa em 2011; o vínculo é contínuo desde 14-11-2005. A secção passa de 2 para 3 entradas: Exército Português (Set/2001--Nov/2005, incluindo NATO/SFOR), GNR operacional (Nov/2005--presente) e especialização GIS/automação dentro da GNR (2011--presente). |
| 2026-09-11 | **Descrições de Work Experience expandidas:** adaptadas ao limite confirmado de 2.000 caracteres por entrada. A experiência no Exército passa a incluir a aprendizagem prática de Excel e Word (tabelas pequenas e documentos); as entradas GNR operacional e GIS detalham contexto, responsabilidades e resultados sem alterar a cronologia. |
| 2026-09-11 | **Cronologia técnica e Education corrigidas:** Exército começa na Escola Prática de Infantaria, Mafra. Antes de 2011, a experiência GNR inclui equipas helitransportadas, sala de situação e os primeiros dados georreferenciados GIPS por Excel/VBA/KML. A progressão técnica passa a explicitar Excel/Google Earth (2014), QGIS (2017--2018), ArcMap/ArcGIS (desde 2019), Python (desde 2022) e ferramentas próprias aceleradas por IA (desde 2023). Education deixa de ficar vazia: matrícula actual na Universidade Aberta, Engenharia Informática, início em Set/2026. |
| 2026-09-11 | **Gig 1 alinhado com o formulário Fiverr:** categoria confirmada como Programming & Tech → Software Development, Service Type Scripting e Python. Documentadas as cinco opções de Expertise adequadas; `Localization` excluída por significar localização linguística/regional, não GIS. A tabela dos pacotes passa a usar os campos reais do formulário (pages/sources mined, instalação, teste e automação), e os preços passam de EUR para o USD exigido no criador de Gigs. |
| 2026-09-11 | **Galeria do Gig 1 criada:** três PNG 1280×769 em `assets/`, por ordem de promessa comercial, fluxo ilustrativo e arquitectura técnica real. Os avisos declaram o carácter ilustrativo das duas primeiras e a origem real da terceira, sem alegar geração por IA. |
