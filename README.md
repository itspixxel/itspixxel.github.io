# Pixxel / The Midnight Workshop

A static Astro + TypeScript portfolio, with a charcoal/ivory/purple visual system, real project imagery, and a Markdown publishing workflow. No backend, database, external font service, or frontend credentials.

## One-time account setup

1. The replacement and CMS configuration are committed to **itspixxel/itspixxel.github.io**, branch **amethyst** (the repository's existing default branch).
2. In GitHub **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. Ensure Actions are enabled and the `github-pages` environment allows deployments from `amethyst`.
3. Push the changes or run **Deploy workshop to GitHub Pages** under Actions. The workflow checks types, builds, verifies internal links/content, uploads `dist`, and deploys with GitHub's official Pages actions.
4. Open [Pages CMS](https://app.pagescms.org/), sign in with GitHub, and install/authorize its GitHub App for this repository. Select **itspixxel/itspixxel.github.io → amethyst**. The root `.pages.yml` defines the complete editor.
5. Make a small content edit and save it. Confirm its GitHub commit triggers the deployment workflow, then check the live site. The initial connection and a homepage edit through Pages CMS were verified on 19 October 2026.

Expected URL: **https://itspixxel.github.io/**. No CNAME/custom domain was present in the original repository. This is a user Pages repository, so Astro uses `site: https://itspixxel.github.io` and `base: /`, with trailing-slash routes. If you move it to a project repository or custom domain, update `astro.config.mjs`, robots, and CMS media output as appropriate. Arbitrary subpath hosting is not configured.

## Routine editing (no source code needed)

Visit `/edit/` for the editor link and sign-in guidance. Editing is hosted by Pages CMS; visitors cannot commit from the public site.

The footer editor link is absent from the rendered page by default. Bookmark `https://itspixxel.github.io/#owner-mode-on` to enable it in your current browser. Visit `https://itspixxel.github.io/#owner-mode-off` to hide it again. The preference stays on that browser and origin; it does not sign you in or grant editing permission. This is a convenience setting, not identity authentication. The `/edit/` route remains directly accessible.

- **Homepage:** change the introduction, heading, invitation, interest list, and section visibility in Homepage.
- **Settings:** change SEO description, social preview image, name, footer, workshop status, contact invitation, email visibility, and all shared section labels in Site settings. The SEO description is the homepage fallback; individual pages/posts/projects have their own title and description.
- **Navigation:** edit, reorder, or hide items within Site settings → Navigation. Use existing routes (`/`, `/projects/`, `/blog/`, `/about/`, `/now/`, `/contact/`) or valid external links. Adding an item doesn't create a page. Keep at most five short primary labels for the designed mobile layout.
- **Projects:** create a project, add its title and summary, optional cover and alt text, tags, engine, role, year, status, field note, links, and gallery. Write the case study in Body. Lower Order values appear first. Enable Featured for the homepage (the first three featured projects are displayed). Draft hides the project everywhere. No image, public source, or download is required.
- **Blog:** add a title, description, date, tags, optional cover, and rich-text body. New entries default to Draft. Turn Draft off to publish; use Featured to prioritize the index. The homepage shows the three most recent published posts. Search and topic selection combine; eight results are shown at a time, with a Show more button for larger archives. Without JavaScript all posts remain visible.
- **Images:** upload through any image field or the rich-text editor. Files live in `public/media`; references are `/media/filename`. Supply gallery alt descriptions and cover alt text. For future uploads, prefer reasonably compressed WebP/JPEG and images around 1600px wide. Existing images were resized and converted to WebP; CMS uploads are served directly, not automatically transcoded.
- **About / Now:** edit titles, descriptions and the entire body. Now has an editable update date. Biographical gaps are explicitly marked in the About/Now bodies; replace them before launch if desired.
- **Contact / social links:** edit the existing verified email and GitHub/itch.io/LinkedIn entries, add optional platforms, and control visibility. No contact form service is required.
- **Archive categories:** each project has a Games, Tools, or VFX category. Change it in Projects → Archive category. Featured projects appear as larger case-study cards above the compact, grouped directory; the directory includes every published project. Order controls the sequence within each category. Tags are separate editable lists; adding a new blog tag automatically adds a blog filter option.

Saving in Pages CMS commits content to GitHub. A commit to `amethyst` triggers the same deployment workflow as a developer push. Builds typically take a few minutes; watch Actions for the actual result.

## Writing technical posts

Pages CMS uses a supported `rich-text` field with Markdown output and the Editor/Source switch enabled. Use the visual editor for ordinary prose, links and images. Source mode is available for fenced code blocks with language identifiers (`cpp`, `csharp`, `typescript`, etc.), tables, blockquotes/callouts, or captions when the visual editor does not expose the formatting you need. Content uses ordinary Markdown, not MDX: no component imports or arbitrary JavaScript.

Articles render with syntax highlighting, language labels, code-copy buttons, heading permalinks, a generated table of contents, reading time, dates, email sharing, related notes, and RSS. Long code blocks and tables scroll within the article. A blockquote is the accessible callout alternative. For video, use a descriptive external link in Markdown; projects additionally support an optional YouTube embed URL that renders as a video link. Third-party embeds do not load automatically.

**Drafts work:** draft entries are excluded from pages, listings, related links, and RSS. **Scheduled publishing is not implemented:** dates are publication metadata; future-dated entries publish immediately when Draft is off and a build runs. Pages CMS changes are not a live preview of the rendered site.

## Local development

Use Node **22.22 or newer** (Node 22 is configured in CI).

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
npm run preview
```

Astro uses custom CSS, system-licensed local font stacks, and a small TypeScript script. No animation library or client framework is needed. `npm run build` includes Astro's TypeScript check. `npm run verify` checks every generated HTML page's internal references, image alt text, CMS frontmatter field coverage, and the existence of feeds/sitemap/404.

Optional browser regression check:

```sh
npx playwright install chromium
node scripts/browser-qa.mjs
```

This checks representative routes at 1440, 768, and 390px, horizontal overflow, search, tag selection, and article code buttons. Screenshots go into ignored `qa/`.

## Structure

```text
.pages.yml                     Pages CMS editor configuration
.github/workflows/deploy.yml   build, verify, GitHub Pages deployment
src/content/settings/          site and homepage JSON
src/content/projects/          project Markdown + frontmatter
src/content/blog/              article Markdown + frontmatter
src/content/pages/             About and Now Markdown
src/content.config.ts          runtime content validation and defaults
src/components/                project and note presentation
src/layouts/                   shared metadata, navigation and footer
src/pages/                     routes, RSS, 404 and editor guidance
src/styles/global.css          responsive visual system
src/scripts/client.ts          optional interactions
public/media/                  uploaded and migrated imagery
public/docs/                   preserved technical documents
scripts/                       verification and browser checks
```

The old HTML/CSS/JS was removed after a successful replacement build. All 11 project detail pages and the two blog articles from the old site were migrated, including galleries and original technical prose. Broken placeholder GitHub links were excluded. There are no invented sample accomplishments. Original source material remains recoverable in Git history. All migrated project status fields say “Portfolio project” because release status was not reliably specified; fill in role/year/status where appropriate. Existing article dates are retained as legacy publication metadata.

## Troubleshooting

- **CMS cannot find the repo:** confirm the GitHub App is installed for this repository, your account has write access, and the selected branch is `amethyst`.
- **Missing editor fields:** `.pages.yml` is read per branch. Confirm the same branch has both configuration and content. Do not rename frontmatter keys casually.
- **Failed build after saving:** open the Actions log. Required titles/descriptions and dates must be valid. Invalid structured content should fail a build instead of publishing a broken site.
- **Images missing:** confirm the committed file exists under `public/media` and the saved URL starts `/media/` with matching filename capitalization.
- **Changes not appearing:** confirm Draft is off, the commit is on `amethyst`, and its deployment completed. GitHub Pages must use Actions, not legacy branch publishing.
- **Deployment forbidden:** check workflow permissions, Pages source, repository Pages eligibility, and environment branch rules. No custom secrets are required by this workflow.
- **Copy blocked:** browsers may restrict clipboard access on non-HTTPS origins. The button selects code as a manual-copy fallback.
- **New URL/domain:** update Astro site/base configuration, robots sitemap location and media paths, then run build + verify before deploying.

Configuration references: [Pages CMS configuration](https://pagescms.org/docs/configuration/), [rich-text fields](https://pagescms.org/docs/configuration/fields/rich-text/), [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

## Playful features and kill switches

Open **Pages CMS → Playful features (on/off)**. `Enabled` is the master switch. Separate switches control the About-page IK sketch, project inspection panels, developer commentary, secret room, and playable 404. Turn off any switch and save; the next deployment removes that feature. Disabling the secret room also removes `/play/` from generated routes and its footer link. Disabling the 404 toy preserves the ordinary home link.

This settings group also edits the feature headings, descriptions, control labels and commentary notes. Commentary notes match a page's route, including its trailing slash. Visitors can show/hide commentary in the footer; that preference is stored only in their browser. Project inspection uses each project's existing engine, role, tags, description and field note. Edit those in Projects.

The secret-room spring follower runs only after Start and pauses offscreen or in background tabs. Arrow keys move its target when the stage has focus. Reduced-motion mode moves directly to the target. The rig supports a range slider as well as dragging. The 404 jump supports a keyboard-accessible button, offers a home link on success, and leaves the standard home link available throughout. No third-party game or animation dependencies were added.
