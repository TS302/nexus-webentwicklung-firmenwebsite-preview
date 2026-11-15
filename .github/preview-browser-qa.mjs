import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = (process.env.PREVIEW_URL || "https://ts302.github.io/nexus-webentwicklung-firmenwebsite-preview/").replace(/\/?$/, "/");
const viewports = [375, 480, 600, 768, 900, 1024, 1440];
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
const expectedHeroTitle = "Ihre Website sollte mehr können, als nur gut aussehen.";
const expectedHeroCards = [
  { label: "Anfragen gesteigert", value: "+ 800 %", previewOnly: "true" },
  { label: "Klarer nächster Schritt", value: "Von der Idee zur Website", previewOnly: null },
];
const expectedAnchors = ["start", "leistungen", "ablauf", "pakete", "referenzen", "faq", "ueber-nexus", "kontakt"];

fs.mkdirSync(screenshotDir, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkHeroVisual(page, viewport) {
  const visual = page.locator(".hero-visual");
  assert(await visual.count() === 1, `index.html @ ${viewport}px: hero visual is missing`);
  assert(await visual.locator(".hero-visual__browser").count() === 1, `index.html @ ${viewport}px: decorative website mockup is missing`);
  assert(await visual.locator(".hero-visual__browser[aria-hidden='true']").count() === 1, `index.html @ ${viewport}px: website mockup must be decorative`);

  const cards = visual.locator(".hero-visual__card");
  assert(await cards.count() === expectedHeroCards.length, `index.html @ ${viewport}px: hero card count is incorrect`);
  assert(await cards.locator("a, button, [tabindex]").count() === 0, `index.html @ ${viewport}px: hero cards must remain non-interactive`);

  const cardContent = await cards.evaluateAll((nodes) => nodes.map((node) => ({
    label: node.querySelector(".hero-visual__card-label")?.textContent.trim() || "",
    value: node.querySelector(".hero-visual__card-value")?.textContent.trim() || "",
    previewOnly: node.getAttribute("data-preview-only"),
  })));
  assert(JSON.stringify(cardContent) === JSON.stringify(expectedHeroCards), `index.html @ ${viewport}px: hero card copy or order is incorrect`);
  assert(await visual.locator("[data-preview-only='true'][aria-describedby='hero-preview-note']").count() === 1, `index.html @ ${viewport}px: preview-only card marker or description is missing`);
  assert(await visual.locator("#hero-preview-note").textContent() === "Interne Preview – der Wert plus 800 Prozent ist ein Konzeptplatzhalter und kein belegtes Nexus-Ergebnis.", `index.html @ ${viewport}px: preview-only note is incorrect`);

  const heroMetrics = await visual.evaluate((node) => {
    const website = node.querySelector(".hero-visual__browser");
    const cardNodes = [...node.querySelectorAll(".hero-visual__card")];
    const toRotation = (transform) => {
      if (!transform || transform === "none") return 0;
      const values = transform.startsWith("matrix3d(")
        ? transform.slice(9, -1).split(",").map(Number)
        : transform.startsWith("matrix(")
          ? transform.slice(7, -1).split(",").map(Number)
          : [];
      return values.length >= 2 ? Math.atan2(values[1], values[0]) * 180 / Math.PI : null;
    };
    const cardRects = cardNodes.map((card) => {
      const rect = card.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    });
    const websiteStyle = getComputedStyle(website);
    return {
      websiteRotation: toRotation(websiteStyle.transform),
      cardRotations: cardNodes.map((card) => toRotation(getComputedStyle(card).transform)),
      cardRects,
      websiteAriaHidden: website?.getAttribute("aria-hidden"),
    };
  });

  assert(typeof heroMetrics.websiteRotation === "number" && Math.abs(heroMetrics.websiteRotation) >= 1, `index.html @ ${viewport}px: website mockup is not visibly rotated`);
  assert(heroMetrics.cardRotations.every((rotation) => typeof rotation === "number" && Math.abs(rotation) < 0.1), `index.html @ ${viewport}px: front cards must remain horizontal`);
  assert(heroMetrics.cardRects.every((rect) => rect.left >= -1 && rect.right <= viewport + 1), `index.html @ ${viewport}px: hero card leaves the viewport horizontally`);

  if (viewport <= 767) {
    assert(heroMetrics.cardRects[1].top >= heroMetrics.cardRects[0].bottom - 1, `index.html @ ${viewport}px: hero cards did not stack at this breakpoint`);
  } else {
    assert(heroMetrics.cardRects[0].top < heroMetrics.cardRects[1].top && heroMetrics.cardRects[0].left < heroMetrics.cardRects[1].left, `index.html @ ${viewport}px: hero cards lost their diagonal order`);
  }

  return heroMetrics;
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
  assert(railMetrics.links.length === expectedAnchors.length, `index.html @ ${viewport}px: section rail is incomplete`);
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
      heroAnimationNames: [
        getComputedStyle(document.querySelector(".hero-visual__browser")).animationName,
        ...[...document.querySelectorAll(".hero-visual__card")].map((card) => getComputedStyle(card).animationName),
      ],
    };
  });
  assert(motion.scrollBehavior === "auto", `index.html @ ${viewport}px: reduced motion did not disable smooth scrolling`);
  assert(parseFloat(motion.transitionDuration) <= 0.02 && parseFloat(motion.animationDuration) <= 0.02, `index.html @ ${viewport}px: reduced motion did not collapse transitions/animations`);
  assert(motion.heroAnimationNames.length === 3 && motion.heroAnimationNames.every((name) => name === "none"), `index.html @ ${viewport}px: reduced motion did not stop hero visual motion`);
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
      assert(await page.locator('.hero__actions a[href="#leistungen"]').count() === 1, `index.html @ ${viewport}px: hero services CTA is missing`);
      assert(await page.locator('.hero__actions a[href="#kontakt"]').count() === 1, `index.html @ ${viewport}px: hero contact CTA is missing`);
      assert(await page.locator('#kontakt-status').count() === 1, `index.html @ ${viewport}px: contact status target is missing`);
      assert(await page.locator('#kontakt-status').innerText().then((text) => text.includes("Tom Salli") && text.includes("0155 62171510") && text.includes("info@nexus-webagentur.de")), `index.html @ ${viewport}px: confirmed contact details are missing`);
      for (const price of ["ab 790 €", "ab 1.490 €", "ab 2.490 €"]) {
        assert(await page.getByText(price, { exact: true }).count() >= 1, `index.html @ ${viewport}px: package price ${price} is missing`);
      }
      assert(await page.locator('meta[name="robots"]').getAttribute("content") === "noindex,nofollow,noarchive", `index.html @ ${viewport}px: preview robots gate is missing`);
      assert(await page.locator("main > section").evaluateAll((sections, anchors) => sections.map((section) => section.id).join(",") === anchors.join(","), expectedAnchors), `index.html @ ${viewport}px: canonical section order is incomplete`);
      assert(await page.locator(".primary-nav a").evaluateAll((links, anchors) => links.length === anchors.length, expectedAnchors), `index.html @ ${viewport}px: primary navigation is incomplete`);
      assert(await page.locator('.primary-nav a[href="#start"]').getAttribute("aria-current") === "location", `index.html @ ${viewport}px: initial route is not represented as a location target`);
      assert(await page.locator('[data-section-rail] a[href="#proof"]').count() === 0, `index.html @ ${viewport}px: proof must remain outside the primary rail`);
      assert(await page.locator('a[href*="leistungen.html"], a[href*="ablauf.html"], a[href*="ueber-nexus.html"], a[href*="kontakt.html"]').count() === 0, `index.html @ ${viewport}px: canonical page still links to a legacy marketing page`);

      const record = { viewport, overflow, headingMetrics, heroTitle };
      record.heroVisual = await checkHeroVisual(page, viewport);
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
