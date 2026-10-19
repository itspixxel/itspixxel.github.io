import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site, url } from "../lib";
import type { APIContext } from "astro";
export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", (p) => !p.data.draft)).sort(
    (a, b) => +b.data.date - +a.data.date,
  );
  return rss({
    title: `${site.name} · ${site.labels.writing}`,
    description: site.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: url(`/blog/${p.id}/`),
    })),
  });
}
