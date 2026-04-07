import { readMarkdownDir, parseMarkdown } from "./content";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  bodyHtml: string;
};

export async function getAllNews(): Promise<NewsItem[]> {
  const items = readMarkdownDir("news");
  const news = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      title: data.title as string,
      date: String(data.date),
      bodyHtml: await parseMarkdown(content),
    }))
  );
  return news.sort((a, b) => (a.date < b.date ? 1 : -1));
}
