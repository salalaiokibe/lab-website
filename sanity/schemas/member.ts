import { defineField, defineType } from "sanity";

export const member = defineType({
  name: "member",
  title: "メンバー",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "氏名",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "役職・学年",
      type: "string",
      options: {
        list: ["教授", "准教授", "修士2年", "修士1年", "学部4年", "学部3年", "学部2年", "学部1年"],
      },
    }),
    defineField({
      name: "image",
      title: "写真",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "field",
      title: "研究フィールド",
      type: "string",
    }),
    defineField({
      name: "interests",
      title: "関心分野",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bio",
      title: "自己紹介",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "isFaculty",
      title: "教員",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "表示順（小さいほど先）",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [{ title: "表示順", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
