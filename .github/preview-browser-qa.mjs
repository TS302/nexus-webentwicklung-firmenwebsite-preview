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
const expectedHeroTitle = "Websites und Landingpages, die lokale Angebote klar zeigen.";

fs.mkdirSync(screenshotDir, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkMenuAndKeyboard(page, indexUrl, viewport) {
  await page.goto(indexUrl, { waitUntil: "networkidle" });
  const toggle = page.locator("[data-menu-toggle]");
  const menu = page.locator("#primary-menu");
  assert(await toggle.count() === 1, `index.html @ ${viewport}px: menu toggle is missing`);
  assert(await menu.count() === 1, `index.html @ ${viewport}px: primary menu is missing`);
  assert(await toggle.getAttribute("aria-expanded") === "false", `index.html @ ${viewport}px: menu must start closed`);

  const record = { viewport, mobile: viewport <= 900 };
  if (viewport <= 900) {
    await toggle.click();
    assert(await toggle.getAttribute("aria-expanded") === "true", `index.html @ ${viewport}px: menu did not open`);
    assert(await menu.isVisible(), `index.html @ ${viewport}px: open menu is not visible`);
    const firstLink = menu.locator("a").first();
    assert(await firstLink.count() === 1, `index.html @ ${viewport}px: open menu has no link`);
    assert(await firstLink.evaluate((node) => document.activeElement === node), `index.html @ ${viewport}px: opening menu did not move focus to its first link`);
    await page.screenshot({ path: path.join(screenshotDir, `menu-open-${viewport}.png`), fullPage: false });

    await page.keyboard.press("Escape");
    assert(await toggle.getAttribute("aria-expanded") === "false", `index.html @ ${viewport}px: Escape did not close menu`);
    assert(await toggle.evaluate((node) => document.activeElement === node), `index.html @ ${viewport}px: Escape did not return focus to menu toggle`);

    await toggle.click();
    await menu.locator("a").first().click();
    assert(await toggle.getAttribute("aria-expanded") === "false", `index.html @ ${viewport}px: selecting a menu link did not close menu`);
    record.opened = true;
    record.escapeFocusReturned = true;
    record.linkClose = true;
  } else {
    assert(!(await toggle.isVisible()), `index.html @ ${viewport}px: mobile menu toggle is visible on desktop`);
    record.opened = false;
  }

  await page.goto(indexUrl, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  assert(await page.locator(".skip-link").evaluate((node) => document.activeElement === node), `index.html @ ${viewport}px: first keyboard stop is not the skip link`);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(50);
  assert(await page.locator("main#main").evaluate((node) => document.activeElement === node), `index.html @ ${viewport}px: skip link did not focus main content`);
  record.skipLinkFocus = true;
  return record;
}

async function checkRailAndScroll(page, indexUrl, viewport) {
  if (viewport < 1440) return { viewport, checked: false };

  await page.goto(indexUrl, { waitUntil: "networkidle" });
  const rail = page.locator("[data-section-rail]");
  assert(await rail.count() === 1 && await rail.isVisible(), `index.html @ ${viewport}px: desktop section rail is not visible`);
  const railMetrics = await rail.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    const links = [...node.querySelectorAll("a")].map((link) => {
      const linkRect = link.getBoundingClientRect();
      const label = link.querySelector(".section-rail__name");
      return {
        href: link.getAttribute("href"),
        width: linkRect.width,
        height: linkRect.height,
        right: linkRect.right,
        label: label?.textContent.trim() || "",
        labelWidth: label?.clientWidth || 0,
        labelScrollWidth: label?.scrollWidth || 0,
      };
    });
    return { left: rect.left, right: rect.right, width: rect.width, links };
  });
  assert(railMetrics.left >= 0 && railMetrics.right <= viewport, `index.html @ ${viewport}px: section rail leaves the viewport`);
  assert(railMetrics.links.length >= 5, `index.html @ ${viewport}px: section rail is incomplete`);
  assert(railMetrics.links.every((link) => link.height >= 44 && link.right <= viewport && link.labelWidth >= link.labelScrollWidth), `index.html @ ${viewport}px: section rail focus/touch target or label is clipped`);

  for (const link of await rail.locator("a").all()) {
    await link.focus();
    assert(await link.evaluate((node) => document.activeElement === node), `index.html @ ${viewport}px: section rail link cannot receive focus`);
  }

  await rail.locator('a[href="#ablauf"]').click();
  await page.waitForTimeout(100);
  assert(await rail.locator('a[aria-current="location"]').getAttribute("href") === "#ablauf", `index.html @ ${viewport}px: rail aria-current did not follow clicked section`);

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const target = document.querySelector("#ablauf");
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 120);
  });
  await page.waitForTimeout(150);
  assert(await rail.locator('a[aria-current="location"]').getAttribute("href") === "#ablauf", `index.html @ ${viewport}px: rail aria-current did not follow scroll position`);

  await page.evaluate(() => {
    const target = document.querySelector("#ueber-nexus");
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 120);
  });
  await page.waitForTimeout(150);
  assert(await rail.locator('a[aria-current="location"]').getAttribute("href") === "#ueber-nexus", `index.html @ ${viewport}px: rail aria-current did not update for the next section`);
  await page.screenshot({ path: path.join(screenshotDir, `rail-${viewport}.png`), fullPage: false });

  return { viewport, checked: true, railMetrics, scrollCurrent: "#ueber-nexus" };
}

async function checkReducedMotion(page, indexUrl, viewport) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(indexUrl, { waitUntil: "networkidle" });
  const motion = await page.evaluate(() => {
    const row = document.querySelector(".capability-row");
    const rootStyle = getComputedStyle(document.documentElement);
    const rowStyle = row ? getComputedStyle(row) : null;
    return {
      scrollBehavior: rootStyle.scrollBehavior,
      transitionDuration: rowStyle?.transitionDuration || "",
      animationDuration: rowStyle?.animationDuration || "",
    };
  });
  assert(motion.scrollBehavior === "auto", `index.html @ ${viewport}px: reduced motion did not disable smooth scrolling`);
  assert(parseFloat(motion.transitionDuration) <= 0.02 && parseFloat(motion.animationDuration) <= 0.02, `index.html @ ${viewport}px: reduced motion did not collapse transitions/animations`);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(indexUrl, { waitUntil: "networkidle" });
  return { viewport, checked: true, motion };
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
      const headingMetrics = await heading.evaluate((node) => {
        const h1Style = getComputedStyle(node);
        const h2 = document.querySelector("#angebot-title");
        const h2Style = h2 ? getComputedStyle(h2) : null;
        const rect = node.getBoundingClientRect();
        const actions = document.querySelector(".hero__actions")?.getBoundingClientRect();
        const nextSection = document.querySelector("#leistungen")?.getBoundingClientRect();
        const nextHeading = document.querySelector("#leistungen-title")?.getBoundingClientRect();
        return {
          textContent: node.textContent,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          bottom: rect.bottom,
          lineCount: Math.round(rect.height / parseFloat(h1Style.lineHeight)),
          ctaBottom: actions?.bottom || null,
          nextSectionTop: nextSection?.top || null,
          nextHeadingTop: nextHeading?.top || null,
          viewportHeight: window.innerHeight,
          h1FontSize: h1Style.fontSize,
          h1LineHeight: h1Style.lineHeight,
          h2FontSize: h2Style?.fontSize || null,
          h2LineHeight: h2Style?.lineHeight || null,
        };
      });

      const heroTitle = headingMetrics.textContent.replace(/\s+/g, " ").trim();
      assert(heroTitle === expectedHeroTitle, `index.html @ ${viewport}px: unexpected H1 text`);
      assert(headingMetrics.width > 0 && headingMetrics.height > 0, `index.html @ ${viewport}px: H1 has no visible box`);
      if (viewport >= 1024) {
        assert(headingMetrics.height <= 360, `index.html @ ${viewport}px: desktop H1 reading path is too tall (${headingMetrics.height}px)`);
        assert(headingMetrics.ctaBottom <= headingMetrics.viewportHeight, `index.html @ ${viewport}px: hero CTA is below the first viewport`);
        assert(headingMetrics.nextHeadingTop <= headingMetrics.viewportHeight, `index.html @ ${viewport}px: next section teaser is below the first viewport`);
      }
      assert(await page.locator('.hero__actions a[href="#kontakt-status"]').count() === 1, `index.html @ ${viewport}px: hero status CTA is missing`);
      assert(await page.locator('#kontakt-status').count() === 1, `index.html @ ${viewport}px: contact status target is missing`);
      assert(await page.locator('[data-section-rail] a[href="#proof"]').count() === 0, `index.html @ ${viewport}px: proof must remain outside the primary rail`);

      const record = { viewport, overflow, headingMetrics, heroTitle };
      metrics.push(record);
      console.log(JSON.stringify(record));
      await page.screenshot({ path: path.join(screenshotDir, `hero-${viewport}.png`), fullPage: false });
      record.interactions = {
        menuAndKeyboard: await checkMenuAndKeyboard(page, new URL("index.html", baseUrl).href, viewport),
        railAndScroll: await checkRailAndScroll(page, new URL("index.html", baseUrl).href, viewport),
        reducedMotion: await checkReducedMotion(page, new URL("index.html", baseUrl).href, viewport),
      };
    }
  }

  assert(consoleErrors.length === 0, `browser console errors: ${JSON.stringify(consoleErrors)}`);
  assert(pageErrors.length === 0, `browser page errors: ${JSON.stringify(pageErrors)}`);
  assert(requestFailures.length === 0, `browser request failures: ${JSON.stringify(requestFailures)}`);
  console.log(`PASS: public preview ${baseUrl}; ${pages.length} pages × ${viewports.length} viewports; H1, overflow, menu/focus flow, rail scroll state, reduced motion, logs and screenshots verified`);
} finally {
  fs.writeFileSync(metricsPath, `${JSON.stringify(metrics, null, 2)}\n`);
  await context.close();
  await browser.close();
}
