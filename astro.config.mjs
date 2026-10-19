import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://itspixxel.github.io",
  base: "/",
  trailingSlash: "always",
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: "github-dark" } },
  devToolbar: { enabled: false },
});
