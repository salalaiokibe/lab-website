import { defineField, defineType } from "sanity";

export const researchDomain = defineType({
  name: "researchDomain",
  title: "研究領域",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "領域名",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "説明",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "アイコン（1文字の記号）",
      type: "string",
      description: "例: ✦ ◎ ◈ ⬡",
    }),
    defineField({
      name: "order",
      title: "表示順",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [{ title: "表示順", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title" },
  },
});
