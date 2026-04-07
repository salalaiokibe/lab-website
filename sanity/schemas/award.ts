import { defineField, defineType } from "sanity";

export const award = defineType({
  name: "award",
  title: "受賞",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "賞名",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "recipient",
      title: "受賞者",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "受賞年",
      type: "number",
      validation: (r) => r.required().integer(),
    }),
  ],
  orderings: [{ title: "年度（新しい順）", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "recipient" },
  },
});
