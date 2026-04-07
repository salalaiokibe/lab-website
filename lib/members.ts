import { readMarkdownDir, parseMarkdown } from "./content";

export type Member = {
  slug: string;
  name: string;
  role: string;
  image: string;
  field: string;
  interests: string[];
  order: number;
  isFaculty: boolean;
  bioHtml: string;
};

export async function getAllMembers(): Promise<Member[]> {
  const items = readMarkdownDir("members");
  const members = await Promise.all(
    items.map(async ({ slug, data, content }) => ({
      slug,
      name: data.name as string,
      role: data.role as string,
      image: (data.image as string) ?? "",
      field: (data.field as string) ?? "",
      interests: (data.interests as string[]) ?? [],
      order: (data.order as number) ?? 99,
      isFaculty: (data.isFaculty as boolean) ?? false,
      bioHtml: await parseMarkdown(content),
    }))
  );
  return members.sort((a, b) => a.order - b.order);
}
