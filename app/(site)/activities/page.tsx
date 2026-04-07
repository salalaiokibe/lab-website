import Link from "next/link";
import { safeFetch } from "@/sanity/lib/safeFetch";
import { DOMAINS_QUERY, ACTIVITIES_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "領域・活動 | 清水亮研究会" };

type Domain = {
  _id: string;
  title: string;
  description: string;
  icon: string;
};

type Activity = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  tags: string[];
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const fallbackDomains = [
  { _id: "1", title: "生成AI × クリエイティブ", desc: "テキスト・音楽・映像の生成AIを活用した新しい表現手法・制作ツールの研究・開発。", icon: "✦" },
  { _id: "2", title: "LLM × 社会実装", desc: "大規模言語モデルを教育・医療・行政など社会課題の現場に接続するプロジェクト。", icon: "◎" },
  { _id: "3", title: "HCI × 身体・感覚拡張", desc: "ウェアラブルデバイスやAR/VRを用いて人間の知覚・認知を拡張するインタフェース研究。", icon: "◈" },
  { _id: "4", title: "機械学習 × ヘルスケア", desc: "医療・健康データへの機械学習適用と、予防医学における行動変容モデリング。", icon: "⬡" },
];

export default async function ActivitiesPage() {
  const [domains, activities] = await Promise.all([
    safeFetch<Domain[]>(DOMAINS_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<Activity[]>(ACTIVITIES_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const displayDomains =
    domains && domains.length > 0
      ? domains.map((d) => ({ _id: d._id, title: d.title, desc: d.description, icon: d.icon }))
      : fallbackDomains;

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      {/* Research domains */}
      <section className="mb-20">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Research Domains</p>
        <h1 className="text-3xl font-bold mb-8">研究会でやっていること</h1>
        <div className="grid md:grid-cols-2 gap-5">
          {displayDomains.map((d) => (
            <div
              key={d._id}
              className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors"
            >
              <div className="text-xl text-gray-400 mb-3 font-mono">{d.icon}</div>
              <h3 className="font-bold text-base mb-2">{d.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-6 leading-relaxed max-w-2xl">
          清水亮研究会では特定の専門分野に閉じず、AIとテクノロジーが社会・文化・人間と交差するあらゆる領域に取り組んでいます。
          既存の枠組みにとらわれず、自分の問いを持って研究・制作・実装に挑戦できる環境があります。
        </p>
      </section>

      {/* Activity reports */}
      <section>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Activity Reports</p>
        <h2 className="text-3xl font-bold mb-8">これまでの活動</h2>
        {activities && activities.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <Link
                key={activity._id}
                href={`/activities/${activity.slug}`}
                className="flex gap-6 py-6 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors group"
              >
                <div className="w-24 shrink-0">
                  <p className="text-sm text-gray-400">{formatDate(activity.date)}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                    {activity.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {activity.tags?.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {activity.author && (
                    <p className="text-xs text-gray-400 mt-1">by {activity.author}</p>
                  )}
                </div>
                <div className="text-gray-400 self-center">→</div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">活動レポートはまもなく公開予定です。</p>
        )}
      </section>
    </div>
  );
}
