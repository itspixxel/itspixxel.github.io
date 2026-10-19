import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import YAML from "yaml";
let errors = [];
let pages = 0;
const walk = (d) =>
  fs
    .readdirSync(d, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
    );
for (const file of walk("dist").filter((f) => f.endsWith(".html"))) {
  pages++;
  const $ = cheerio.load(fs.readFileSync(file, "utf8"));
  if ($("h1").length !== 1) errors.push(`${file}: expected one h1`);
  for (const el of $("a[href],img[src],script[src],link[href]").toArray()) {
    const value = $(el).attr("href") || $(el).attr("src");
    if (!value || !value.startsWith("/") || value.startsWith("//")) continue;
    const target = decodeURIComponent(value.split(/[?#]/)[0]);
    const p = path.join("dist", target);
    if (!fs.existsSync(p) && !fs.existsSync(path.join(p, "index.html")))
      errors.push(`${file}: missing ${target}`);
  }
  for (const img of $("img").toArray())
    if ($(img).attr("alt") == null ||
        (!$(img).attr("alt") && $(img).attr("role") !== "presentation"))
      errors.push(`${file}: missing image alt`);
}
const cms = YAML.parse(fs.readFileSync(".pages.yml", "utf8"));
for (const entry of cms.content) {
  const files = entry.type === "collection" ? walk(entry.path) : [entry.path];
  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const data = file.endsWith(".json")
      ? JSON.parse(raw)
      : YAML.parse(raw.split("---")[1]);
    const fields = new Set(entry.fields.map((f) => f.name));
    for (const key of Object.keys(data))
      if (!fields.has(key)) errors.push(`${file}: ${key} missing CMS field`);
    for (const f of entry.fields.filter((f) => f.required))
      if (data[f.name] == null)
        errors.push(`${file}: missing required ${f.name}`);
  }
}
for (const f of [
  "rss.xml",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "robots.txt",
  "404.html",
])
  if (!fs.existsSync(`dist/${f}`)) errors.push(`Missing ${f}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Verified ${pages} pages, internal links, image paths and alt text, feeds, sitemap, and CMS field coverage.`,
);
