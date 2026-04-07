import { defineField, defineType } from "sanity";

export const paper = defineType({
  name: "paper",
  title: "論文",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "論文タイトル",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authors",
      title: "著者",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "year",
      title: "発表年",
      type: "number",
      validation: (r) => r.required().integer(),
    }),
    defineField({
      name: "venue",
      title: "発表先（フルネーム）",
      type: "string",
    }),
    defineField({
      name: "venueShort",
      title: "発表先（略称）",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "論文リンク",
      type: "url",
    }),
  ],
  orderings: [{ title: "年度（新しい順）", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "venueShort" },
  },
});
