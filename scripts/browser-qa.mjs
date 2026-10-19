import { chromium } from "@playwright/test";
import fs from "node:fs";
fs.mkdirSync("qa", { recursive: true });
const browser = await chromium.launch({ headless: true });
let failures = [];
for (const width of [1440, 768, 390]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
  });
  page.on("pageerror", (e) => failures.push(e.message));
  for (const route of [
    "/",
    "/projects/",
    "/projects/neptune/",
    "/blog/",
    "/blog/hellshot/",
    "/about/",
    "/now/",
    "/contact/",
    "/edit/",
    "/404",
  ]) {
    const response = await page.goto("http://localhost:4321" + route);
    await page.waitForTimeout(100);
    if (!response || response.status() >= 500)
      failures.push(`${width} ${route}: HTTP ${response?.status()}`);
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      )
    )
      failures.push(`${width} ${route}: horizontal overflow`);
    if (route === "/")
      await page.screenshot({ path: `qa/home-${width}.png`, fullPage: true });
  }
  if (width === 1440) {
    await page.goto("http://localhost:4321/blog/");
    await page.locator("#search").fill("nonexistent-word");
    if (!(await page.locator("#empty").isVisible()))
      failures.push("Search empty state");
    await page.locator("#search").fill("Weapon");
    if ((await page.locator("[data-entry]:visible").count()) !== 1)
      failures.push("Search matching");
    await page.locator("#search").fill("");
    await page.locator("#tag").selectOption({ index: 1 });
    if ((await page.locator("[data-entry]:visible").count()) < 1)
      failures.push("Tag filter");
    await page.goto("http://localhost:4321/blog/hellshot/");
    if (!(await page.locator(".copy-code").count()))
      failures.push("Code copy buttons absent");
    await page.screenshot({ path: "qa/article.png", fullPage: true });
  }
  await page.close();
}
await browser.close();
if (failures.length) {
  console.error(failures);
  process.exit(1);
}
console.log(
  "Desktop, tablet, mobile: routes, overflow, search, tag filtering, and code buttons passed.",
);
