import { defineField, defineType } from "sanity";

export const activity = defineType({
  name: "activity",
  title: "活動レポート",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
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
      name: "date",
      title: "日付",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "著者",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "サムネイル画像",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "タグ",
      type: "array",
      of: [{ type: "string" }],
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
            defineField({ name: "caption", title: "キャプション", type: "string" }),
          ],
        },
      ],
    }),
  ],
  orderings: [{ title: "日付（新しい順）", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
