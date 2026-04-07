import { defineField, defineType } from "sanity";

export const joinPage = defineType({
  name: "joinPage",
  title: "参加募集ページ設定",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "ページ紹介文",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "qualities",
      title: "求める人物像",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "見出し", type: "string" }),
            defineField({ name: "description", title: "説明", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "springClosed",
      title: "春学期募集：締め切り済みにする",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "springStatusText",
      title: "春学期 状態テキスト",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "fallTitle",
      title: "秋学期 セクションタイトル",
      type: "string",
      initialValue: "2026年秋 入会選考",
    }),
    defineField({
      name: "fallIntro",
      title: "秋学期 説明文",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fallSchedule",
      title: "秋学期 選考スケジュール",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "date", title: "日程", type: "string" }),
            defineField({ name: "event", title: "イベント名", type: "string" }),
            defineField({ name: "note", title: "補足", type: "string" }),
          ],
          preview: { select: { title: "date", subtitle: "event" } },
        },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "募集専用メールアドレス",
      type: "string",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "質問", type: "string" }),
            defineField({ name: "answer", title: "回答", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "参加募集ページ設定" }) },
});
