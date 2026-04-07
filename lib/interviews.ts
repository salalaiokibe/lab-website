import { readMarkdownDir, parseMarkdown } from "./content";

export type Interview = {
  slug: string;
  title: string;
  memberName: string;
  memberRole: string;
  date: string;
  image: string;
  bodyHtml: string;
};

export async function getAllInterviews(): Promise<Interview[]> {
  const items = readMarkdownDir("interviews");
  const interviews = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      title: data.title as string,
      memberName: (data.memberName as string) ?? "",
      memberRole: (data.memberRole as string) ?? "",
      date: String(data.date),
      image: (data.image as string) ?? "",
      bodyHtml: await parseMarkdown(content),
    }))
  );
  return interviews.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getInterviewBySlug(slug: string): Promise<Interview | null> {
  const all = await getAllInterviews();
  return all.find((i) => i.slug === slug) ?? null;
}
