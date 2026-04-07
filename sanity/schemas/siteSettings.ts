import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "サイト設定（Home）",
  type: "document",
  fields: [
    defineField({
      name: "catchphrase",
      title: "キャッチコピー",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "catchphraseSub",
      title: "キャッチコピー（サブ）",
      type: "string",
    }),
    defineField({
      name: "professorImage",
      title: "清水先生の写真",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "greeting",
      title: "先生からの挨拶文",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "greetingQuote",
      title: "挨拶の引用文（太字で表示）",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contactAddress",
      title: "所在地",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "contactEmail",
      title: "メールアドレス",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "サイト設定（Home）" }) },
});
