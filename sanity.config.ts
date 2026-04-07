import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./sanity/schemas";
const singletons = new Set(["siteSettings", "joinPage"]);

export default defineConfig({
  name: "shimizu-lab",
  title: "清水亮研究会 CMS",

  projectId: "2etacmfc",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id("root")
          .title("コンテンツ管理")
          .items([
            // Singletons
            S.listItem()
              .title("サイト設定（Home）")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("参加募集ページ設定")
              .id("joinPage")
              .child(S.document().schemaType("joinPage").documentId("joinPage")),

            S.divider(),

            // Collections
            S.documentTypeListItem("newsItem").title("ニュース"),
            S.documentTypeListItem("member").title("メンバー"),
            S.documentTypeListItem("alumniYear").title("卒業生"),

            S.divider(),

            S.documentTypeListItem("activity").title("活動レポート"),
            S.documentTypeListItem("interview").title("インタビュー"),

            S.divider(),

            S.documentTypeListItem("researchDomain").title("研究領域"),
            S.documentTypeListItem("paper").title("論文"),
            S.documentTypeListItem("award").title("受賞"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemas,
    // シングルトンドキュメントは「新規作成」を非表示にする
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
});
