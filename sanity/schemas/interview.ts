import { defineField, defineType } from "sanity";

export const interview = defineType({
  name: "interview",
  title: "インタビュー",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "見出し（引用文など）",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "スラッグ（URL）",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "memberName",
      title: "メンバー名",
      type: "string",
    }),
    defineField({
      name: "memberRole",
      title: "役職・学年",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "公開日",
      type: "date",
    }),
    defineField({
      name: "image",
      title: "写真",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "代替テキスト", type: "string" }),
          ],
        },
      ],
    }),
  ],
  orderings: [{ title: "日付（新しい順）", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "memberName", subtitle: "title", media: "image" },
  },
});
