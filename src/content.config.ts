import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const common = {
  title: z.string(),
  description: z.string(),
  image: z.string().optional().default(""),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  sample: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
};
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    ...common,
    imageAlt: z.string().default(""),
    category: z.enum(["Games", "Tools", "VFX"]).default("Games"),
    order: z.number().default(100),
    status: z.string().default(""),
    engine: z.string().default(""),
    role: z.string().default(""),
    duration: z.string().default(""),
    team: z.string().default(""),
    year: z.string().default(""),
    note: z.string().default(""),
    video: z.string().default(""),
    showCarousel: z.boolean().default(true),
    sections: z.array(z.object({
      title: z.string(),
      text: z.string(),
      image: z.string().default(""),
      imageAlt: z.string().default(""),
      caption: z.string().default(""),
    })).default([]),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .default([]),
  }),
});
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    ...common,
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
});
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    profileName: z.string().optional(),
    profileDetail: z.string().optional(),
    profileBio: z.string().optional(),
    originStory: z.string().optional(),
    updated: z.coerce.date().optional(),
    currentWork: z
      .object({
        label: z.string(),
        title: z.string(),
        platform: z.string(),
        studio: z.string(),
        description: z.string(),
        url: z.url(),
        linkLabel: z.string(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        trailer: z.string().optional(),
        playLabel: z.string().default("Play trailer"),
        pauseLabel: z.string().default("Pause trailer"),
      })
      .optional(),
  }),
});
export const collections = { projects, blog, pages };
