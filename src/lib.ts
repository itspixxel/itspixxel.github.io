import site from "./content/settings/site.json";
export { site };
export const url = (path: string) =>
  path.startsWith("/")
    ? `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
    : path;
export const date = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
export const reading = (body: string = "") =>
  `${Math.max(1, Math.ceil(body.split(/\s+/).length / 220))} min read`;
