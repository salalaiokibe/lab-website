import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type AlumniEntry = { name: string; field: string; destination: string };
export type AlumniYear = { year: number; members: AlumniEntry[] };

export function getAllAlumni(): AlumniYear[] {
  const dir = path.join(process.cwd(), "content", "alumni");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const { data } = matter(raw);
      return {
        year: data.year as number,
        members: (data.members as AlumniEntry[]) ?? [],
      };
    })
    .sort((a, b) => b.year - a.year);
}
