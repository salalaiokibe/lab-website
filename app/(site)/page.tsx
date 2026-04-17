import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/safeFetch";
import { SITE_SETTINGS_QUERY, DOMAINS_QUERY, HOME_ACTIVITIES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@/components/PortableText";
import type { TypedObject } from "@portabletext/types";

type SiteSettings = {
  catchphrase: string | null;
  catchphraseSub: string | null;
  professorImage: { asset: { _ref: string } } | null;
  biography: TypedObject[] | null;
  greeting: TypedObject[] | null;
  greetingQuote: string | null;
  contactAddress: string | null;
  contactEmail: string | null;
};

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
  image: { asset: { _ref: string } } | null;
  category: string | null;
};

const CATEGORY_LABELS: Record<string, string> = {
  project: "卒業・制作プロジェクト",
  report: "活動レポート",
  camp: "合宿",
};

const fallbackDomains: Domain[] = [
  { _id: "1", title: "生成AI × クリエイティブ", description: "テキスト・音楽・映像の生成AIを活用した新しい表現手法・制作ツールの研究・開発。", icon: "✦" },
  { _id: "2", title: "LLM × 社会実装", description: "大規模言語モデルを教育・医療・行政など社会課題の現場に接続するプロジェクト。", icon: "◎" },
  { _id: "3", title: "HCI × 身体・感覚拡張", description: "ウェアラブルデバイスやAR/VRを用いて人間の知覚・認知を拡張するインタフェース研究。", icon: "◈" },
  { _id: "4", title: "機械学習 × ヘルスケア", description: "医療・健康データへの機械学習適用と、予防医学における行動変容モデリング。", icon: "⬡" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function HomePage() {
  const [settings, domains, activities] = await Promise.all([
    safeFetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<Domain[]>(DOMAINS_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<Activity[]>(HOME_ACTIVITIES_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const displayDomains = domains && domains.length > 0 ? domains : fallbackDomains;
  const recentActivities = activities ?? [];

  return (
    <div>
      {/* 1. Hero ── 左テキスト / 右写真 */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 items-stretch min-h-[520px]">
          <div className="flex flex-col justify-center py-16 md:py-24 md:pr-12">
            <p className="text-xs font-medium text-gray-400 mb-4 tracking-widest uppercase">
              Keio University SFC
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
              清水亮<br />研究会
            </h1>
            <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line mb-2">
              {settings?.catchphrase ?? "テクノロジーで社会を変える。\nAIの可能性を探求し、実装し、問い続ける場所。"}
            </p>
            {settings?.catchphraseSub && (
              <p className="text-sm text-gray-400 mt-1">{settings.catchphraseSub}</p>
            )}
            <div className="flex gap-3 mt-8">
              <Link href="/activities" className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                活動・実績を見る
              </Link>
              <Link href="/join" className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                参加募集
              </Link>
            </div>
          </div>
          {/* Photo */}
          <div className="relative mt-10 md:mt-0 rounded-2xl md:rounded-none overflow-hidden bg-gray-200 min-h-[320px]">
            {settings?.professorImage ? (
              <Image
                src={urlFor(settings.professorImage).width(800).height(900).fit("crop").url()}
                alt="清水 亮"
                fill
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-end p-6">
                <span className="text-gray-400 text-sm">清水 亮</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. 研究領域カード */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Research Domains</p>
          <h2 className="text-2xl font-bold mb-8">研究領域</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {displayDomains.map((d) => (
              <div key={d._id} className="border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors">
                <div className="text-xl text-gray-400 mb-3 font-mono">{d.icon}</div>
                <h3 className="font-bold text-sm mb-2 leading-snug">{d.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. プロフィール・メッセージ */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-[200px_1fr] gap-10 items-start">
          {/* Left: photo + name */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="relative w-40 h-48 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
              {settings?.professorImage ? (
                <Image
                  src={urlFor(settings.professorImage).width(320).height(384).fit("crop").url()}
                  alt="清水 亮"
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">写真</div>
              )}
            </div>
            <div>
              <p className="font-bold text-base">清水 亮</p>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                慶應義塾大学<br />環境情報学部 専任講師
              </p>
            </div>
          </div>

          {/* Right: bio + message */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Profile & Message</p>

            {settings?.biography && (
              <div className="text-sm text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100">
                <PortableText value={settings.biography} />
              </div>
            )}

            {settings?.greetingQuote && (
              <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-gray-800 mb-6 border-l-4 border-gray-300 pl-4">
                {settings.greetingQuote}
              </blockquote>
            )}

            {settings?.greeting ? (
              <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                <PortableText value={settings.greeting} />
              </div>
            ) : (
              <p className="text-sm text-gray-500 leading-relaxed">
                清水亮研究会では、人工知能・機械学習・メディアアートをキーワードに、テクノロジーと社会の接点を探求しています。
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 4. 最新の活動・実績 3件 */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Latest Activities</p>
              <h2 className="text-2xl font-bold">活動・実績</h2>
            </div>
            <Link href="/activities" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              すべて見る →
            </Link>
          </div>

          {recentActivities.length > 0 ? (
            <div className="grid sm:grid-cols-3 gap-5">
              {recentActivities.map((a) => (
                <Link
                  key={a._id}
                  href={`/activities/${a.slug}`}
                  className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors"
                >
                  <div className="relative w-full aspect-video bg-gray-100">
                    {a.image ? (
                      <Image
                        src={urlFor(a.image).width(480).height(270).fit("crop").url()}
                        alt={a.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-100" />
                    )}
                  </div>
                  <div className="p-4">
                    {a.category && (
                      <span className="text-xs text-gray-400 mb-1 block">
                        {CATEGORY_LABELS[a.category] ?? a.category}
                      </span>
                    )}
                    <h3 className="font-medium text-sm leading-snug group-hover:text-gray-500 transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2">{formatDate(a.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">活動レポートはまもなく公開予定です。</p>
          )}
        </div>
      </section>

      {/* 5. Contact */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Contact</h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-xl">
            <div>
              <p className="text-xs text-gray-400 mb-1">所在地</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {settings?.contactAddress ?? "〒252-0882\n神奈川県藤沢市遠藤5322\n慶應義塾大学 湘南藤沢キャンパス\nΙ棟（イオタ棟）"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">お問い合わせ</p>
              <p className="text-sm text-gray-700">研究会に関するお問い合わせは、下記メールアドレスまでご連絡ください。</p>
              <p className="text-sm font-medium text-gray-900 mt-2">
                {settings?.contactEmail ?? "contact@shimizu-lab.example.ac.jp"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
