import { defineField, defineType } from "sanity";

export const newsItem = defineType({
  name: "newsItem",
  title: "ニュース",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "日付",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [{ title: "日付（新しい順）", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
