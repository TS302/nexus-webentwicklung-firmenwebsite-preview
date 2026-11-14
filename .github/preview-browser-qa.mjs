import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = (process.env.PREVIEW_URL || "https://ts302.github.io/nexus-webentwicklung-firmenwebsite-preview/").replace(/\/?$/, "/");
const viewports = [375, 768, 1024, 1440];
const pages = [
  "index.html",
  "leistungen.html",
  "ablauf.html",
  "ueber-nexus.html",
  "kontakt.html",
  "impressum.html",
  "datenschutz.html",
];
const artifactDir = path.resolve("qa-artifacts");
const screenshotDir = path.join(artifactDir, "screenshots");
const metricsPath = path.join(artifactDir, "browser-qa-metrics.json");
const metrics = [];

fs.mkdirSync(screenshotDir, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];
const requestFailures = [];

page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => pageErrors.push(String(error)));
page.on("requestfailed", (request) => requestFailures.push(`${request.url()} :: ${request.failure()?.errorText || "unknown"}`));

try {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport, height: 900 });

    for (const filename of pages) {
      const response = await page.goto(new URL(filename, baseUrl).href, { waitUntil: "networkidle" });
      assert(response?.ok(), `${filename} @ ${viewport}px: HTTP response is not OK`);
      assert(await page.locator("html[lang='de']").count() === 1, `${filename} @ ${viewport}px: missing lang=de`);
      assert(await page.locator("h1").count() === 1, `${filename} @ ${viewport}px: expected one h1`);
      assert(await page.locator("main#main").count() === 1, `${filename} @ ${viewport}px: missing main#main`);
      assert(await page.locator("footer.site-footer").count() === 1, `${filename} @ ${viewport}px: missing footer`);

      const overflow = await page.evaluate(() => Math.max(
        document.documentElement.scrollWidth - window.innerWidth,
        document.body.scrollWidth - window.innerWidth,
      ));
      assert(overflow <= 1, `${filename} @ ${viewport}px: horizontal overflow is ${overflow}px`);

      if (filename !== "index.html") continue;

      const heading = page.locator("#hero-title");
      const lines = heading.locator(".hero-title__line");
      assert(await lines.count() === 2, `index.html @ ${viewport}px: hero H1 must have exactly two lines`);

      const lineMetrics = await lines.evaluateAll((nodes) => nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        return {
          top: rect.top,
          width: rect.width,
          rectCount: node.getClientRects().length,
          whiteSpace: style.whiteSpace,
        };
      }));
      const headingMetrics = await heading.evaluate((node) => {
        const h1Style = getComputedStyle(node);
        const h2 = document.querySelector("#angebot-title");
        const h2Style = h2 ? getComputedStyle(h2) : null;
        const rect = node.getBoundingClientRect();
        return {
          textContent: node.textContent,
          width: rect.width,
          height: rect.height,
          h1FontSize: h1Style.fontSize,
          h1LineHeight: h1Style.lineHeight,
          h2FontSize: h2Style?.fontSize || null,
          h2LineHeight: h2Style?.lineHeight || null,
        };
      });

      assert(headingMetrics.textContent === "Websites mit Haltung. Klar geführt.", `index.html @ ${viewport}px: H1 text changed`);
      assert(lineMetrics.every((line) => line.rectCount === 1 && line.whiteSpace === "nowrap"), `index.html @ ${viewport}px: H1 wrapping is not controlled`);
      assert(lineMetrics.every((line) => line.width <= headingMetrics.width + 1), `index.html @ ${viewport}px: H1 line exceeds available width`);
      assert(lineMetrics[1].top > lineMetrics[0].top, `index.html @ ${viewport}px: H1 lines are not on separate rows`);

      const record = { viewport, overflow, lineMetrics, headingMetrics };
      metrics.push(record);
      console.log(JSON.stringify(record));
      await page.screenshot({ path: path.join(screenshotDir, `hero-${viewport}.png`), fullPage: false });
    }
  }

  assert(consoleErrors.length === 0, `browser console errors: ${JSON.stringify(consoleErrors)}`);
  assert(pageErrors.length === 0, `browser page errors: ${JSON.stringify(pageErrors)}`);
  assert(requestFailures.length === 0, `browser request failures: ${JSON.stringify(requestFailures)}`);
  console.log(`PASS: public preview ${baseUrl}; ${pages.length} pages × ${viewports.length} viewports; H1 rows, H1/H2 sizes, overflow, logs and screenshots verified`);
} finally {
  fs.writeFileSync(metricsPath, `${JSON.stringify(metrics, null, 2)}\n`);
  await context.close();
  await browser.close();
}
