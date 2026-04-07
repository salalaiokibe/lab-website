import { readMarkdownDir, parseMarkdown } from "./content";

export type Activity = {
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  bodyHtml: string;
};

export async function getAllActivities(): Promise<Activity[]> {
  const items = readMarkdownDir("activities");
  const activities = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      title: data.title as string,
      date: String(data.date),
      author: (data.author as string) ?? "",
      image: (data.image as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      bodyHtml: await parseMarkdown(content),
    }))
  );
  return activities.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const all = await getAllActivities();
  return all.find((a) => a.slug === slug) ?? null;
}
