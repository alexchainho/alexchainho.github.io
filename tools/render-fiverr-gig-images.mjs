import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const outputDirectory = new URL('../assets/', import.meta.url);
const architectureDiagram = await readFile(new URL('../assets/diagrama-floresta.png', import.meta.url));
const architectureDataUrl = `data:image/png;base64,${architectureDiagram.toString('base64')}`;

const baseStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; width: 1280px; height: 769px; color: #f1f5f9; background: #101820; font-family: Arial, sans-serif; }
  .canvas { position: relative; width: 1280px; height: 769px; overflow: hidden; background: radial-gradient(circle at 88% 4%, #1e4e5a 0, transparent 30%), #101820; }
  .grid { position: absolute; inset: 0; opacity: .14; background-image: linear-gradient(#5c8c9c 1px, transparent 1px), linear-gradient(90deg, #5c8c9c 1px, transparent 1px); background-size: 56px 56px; }
  .header { position: absolute; top: 48px; left: 68px; right: 68px; display: flex; justify-content: space-between; align-items: center; }
  .label { color: #8ce0c3; font-size: 16px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; }
  .brand { color: #9fb0be; font-size: 16px; letter-spacing: 1px; }
  h1 { position: absolute; left: 68px; margin: 0; font-size: 64px; letter-spacing: -2.5px; line-height: 1.02; max-width: 780px; }
  .lead { position: absolute; left: 72px; margin: 0; color: #b9c9d3; font-size: 26px; line-height: 1.45; max-width: 650px; }
  .note { position: absolute; left: 72px; bottom: 46px; color: #82949f; font-size: 15px; letter-spacing: .5px; }
  .line { position: absolute; height: 3px; background: #73d6a8; }
  .pill { display: inline-block; padding: 12px 16px; margin-right: 10px; color: #d9fff0; border: 1px solid #35656a; border-radius: 999px; background: #17313a; font-size: 18px; }
  .number { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: #101820; background: #8ce0c3; font-size: 20px; font-weight: 700; }
`;

const images = [
  {
    name: 'fiverr-gig-gis-automation-cover.png',
    html: `
      <div class="canvas"><div class="grid"></div>
        <div class="header"><span class="label">GIS + Python automation</span><span class="brand">ALEX CHAINHO</span></div>
        <h1 style="top:170px">Automate your<br>GIS workflow.</h1>
        <p class="lead" style="top:335px">Turn repetitive geospatial work into reliable scripts that run on their own.</p>
        <div style="position:absolute;left:72px;top:500px"><span class="pill">Python</span><span class="pill">ArcGIS</span><span class="pill">GeoPandas</span></div>
        <div style="position:absolute;right:105px;top:190px;width:315px;height:315px;border:2px solid #5ac4a0;border-radius:50%;opacity:.85"></div>
        <div style="position:absolute;right:148px;top:233px;width:230px;height:230px;border:2px solid #376d78;border-radius:50%"></div>
        <div style="position:absolute;right:230px;top:315px;width:66px;height:66px;border-radius:50%;background:#8ce0c3;box-shadow:0 0 0 18px #1b4149,0 0 0 36px #173039"></div>
        <div class="line" style="right:0;top:348px;width:200px"></div>
        <p class="note">Illustrative workflow — tailored to your data and requirements.</p>
      </div>`,
  },
  {
    name: 'fiverr-gig-gis-automation-workflow.png',
    html: `
      <div class="canvas"><div class="grid"></div>
        <div class="header"><span class="label">How automation helps</span><span class="brand">ALEX CHAINHO</span></div>
        <h1 style="top:130px;font-size:54px">From manual steps to a repeatable pipeline.</h1>
        <div style="position:absolute;left:72px;right:72px;top:290px;display:flex;align-items:center;justify-content:space-between">
          <div style="width:275px"><div class="number">1</div><h2 style="font-size:29px;margin:17px 0 9px">Your spatial data</h2><p style="color:#b9c9d3;font-size:19px;line-height:1.45">Rasters, vectors, spreadsheets, field records and APIs.</p></div>
          <div style="width:100px;height:3px;background:#73d6a8"></div>
          <div style="width:275px"><div class="number">2</div><h2 style="font-size:29px;margin:17px 0 9px">Python pipeline</h2><p style="color:#b9c9d3;font-size:19px;line-height:1.45">Process, validate, transform and publish automatically.</p></div>
          <div style="width:100px;height:3px;background:#73d6a8"></div>
          <div style="width:275px"><div class="number">3</div><h2 style="font-size:29px;margin:17px 0 9px">Ready outputs</h2><p style="color:#b9c9d3;font-size:19px;line-height:1.45">Maps, reports, updated layers and scheduled jobs.</p></div>
        </div>
        <p class="note">Illustrative workflow — tailored to your data and requirements.</p>
      </div>`,
  },
  {
    name: 'fiverr-gig-gis-automation-architecture.png',
    html: `
      <div class="canvas"><div class="grid"></div>
        <div class="header"><span class="label">Technical proof</span><span class="brand">ALEX CHAINHO</span></div>
        <h1 style="top:104px;font-size:48px">A real-world GIS automation architecture.</h1>
        <div style="position:absolute;left:70px;right:70px;top:205px;bottom:86px;padding:13px;border:1px solid #35656a;background:#0d151c;box-shadow:0 16px 42px #0008"><img src="${architectureDataUrl}" style="width:100%;height:100%;object-fit:contain"></div>
        <p class="note">Example architecture based on real-world GIS automation work.</p>
      </div>`,
  },
  {
    name: 'fiverr-gig-map-reports-cover.png',
    html: `
      <div class="canvas"><div class="grid"></div>
        <div class="header"><span class="label">Map & report automation</span><span class="brand">ALEX CHAINHO</span></div>
        <h1 style="top:170px">Automate map<br>production.</h1>
        <p class="lead" style="top:335px">Generate consistent maps and PDF reports from your approved layout.</p>
        <div style="position:absolute;left:72px;top:505px"><span class="pill">Python</span><span class="pill">ArcGIS Pro</span><span class="pill">PDF exports</span></div>
        <div style="position:absolute;right:115px;top:190px;width:310px;height:250px;padding:20px;border:2px solid #5ac4a0;background:#17313a;transform:rotate(5deg)"><div style="height:45px;border-bottom:2px solid #73d6a8"></div><div style="position:absolute;left:40px;bottom:34px;width:95px;height:95px;border-radius:50%;border:2px solid #8ce0c3"></div><div style="position:absolute;right:40px;bottom:38px;width:115px;height:65px;border-left:2px solid #8ce0c3;border-bottom:2px solid #8ce0c3"></div></div>
        <p class="note">Illustrative workflow — tailored to your data and requirements.</p>
      </div>`,
  },
  {
    name: 'fiverr-gig-map-reports-workflow.png',
    html: `
      <div class="canvas"><div class="grid"></div>
        <div class="header"><span class="label">How it works</span><span class="brand">ALEX CHAINHO</span></div>
        <h1 style="top:130px;font-size:54px">One approved template. Every output ready.</h1>
        <div style="position:absolute;left:72px;right:72px;top:290px;display:flex;align-items:center;justify-content:space-between">
          <div style="width:275px"><div class="number">1</div><h2 style="font-size:29px;margin:17px 0 9px">Your data</h2><p style="color:#b9c9d3;font-size:19px;line-height:1.45">Boundaries, attributes, photos, tables and charts.</p></div>
          <div style="width:100px;height:3px;background:#73d6a8"></div>
          <div style="width:275px"><div class="number">2</div><h2 style="font-size:29px;margin:17px 0 9px">Your template</h2><p style="color:#b9c9d3;font-size:19px;line-height:1.45">An approved map or report layout, preserved exactly.</p></div>
          <div style="width:100px;height:3px;background:#73d6a8"></div>
          <div style="width:275px"><div class="number">3</div><h2 style="font-size:29px;margin:17px 0 9px">Batch outputs</h2><p style="color:#b9c9d3;font-size:19px;line-height:1.45">PDF maps and reports generated in one repeatable run.</p></div>
        </div>
        <p class="note">Illustrative workflow — tailored to your data and requirements.</p>
      </div>`,
  },
  {
    name: 'fiverr-gig-map-reports-recurring.png',
    html: `
      <div class="canvas"><div class="grid"></div>
        <div class="header"><span class="label">Built to run again</span><span class="brand">ALEX CHAINHO</span></div>
        <h1 style="top:120px;font-size:52px">New data in.<br>Reports out.</h1>
        <div style="position:absolute;left:72px;top:360px;display:flex;align-items:center;gap:26px"><div style="width:178px;padding:22px;border:1px solid #35656a;background:#17313a;font-size:22px">Updated data</div><div style="font-size:42px;color:#8ce0c3">&rarr;</div><div style="width:178px;padding:22px;border:1px solid #35656a;background:#17313a;font-size:22px">Run script</div><div style="font-size:42px;color:#8ce0c3">&rarr;</div><div style="width:178px;padding:22px;border:1px solid #35656a;background:#17313a;font-size:22px">Ready PDFs</div></div>
        <p class="lead" style="top:555px;max-width:820px">A documented automation you can re-run whenever your data changes.</p>
        <p class="note">Illustrative workflow — tailored to your data and requirements.</p>
      </div>`,
  },
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 769 }, deviceScaleFactor: 1 });

for (const image of images) {
  await page.setContent(`<!doctype html><html><head><style>${baseStyles}</style></head><body>${image.html}</body></html>`);
  await page.screenshot({ path: fileURLToPath(new URL(image.name, outputDirectory)), type: 'png' });
}

await browser.close();
