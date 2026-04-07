import { defineField, defineType } from "sanity";

export const alumniYear = defineType({
  name: "alumniYear",
  title: "卒業生",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "年度",
      type: "number",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: "members",
      title: "卒業生リスト",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "氏名", type: "string" }),
            defineField({ name: "field", title: "研究フィールド", type: "string" }),
            defineField({ name: "destination", title: "卒業後の進路", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "destination" } },
        },
      ],
    }),
  ],
  orderings: [{ title: "年度（新しい順）", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: {
    select: { title: "year" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ title }: any) => ({ title: `${title}年度 卒業生` }),
  },
});
