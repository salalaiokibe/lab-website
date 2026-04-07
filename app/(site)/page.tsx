import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/safeFetch";
import { SITE_SETTINGS_QUERY, NEWS_QUERY } from "@/sanity/lib/queries";
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

type NewsItem = {
  _id: string;
  title: string;
  date: string;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function HomePage() {
  const [settings, news] = await Promise.all([
    safeFetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<NewsItem[]>(NEWS_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const latestNews = (news ?? []).slice(0, 4);

  return (
    <div>
      {/* Hero ── 左テキスト / 右画像 2カラム */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-0 items-stretch min-h-[480px]">
          {/* Left: text */}
          <div className="flex flex-col justify-center pr-0 md:pr-12">
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
              <Link
                href="/activities"
                className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                研究内容を見る
              </Link>
              <Link
                href="/join"
                className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                参加募集
              </Link>
            </div>
          </div>

          {/* Right: professor photo – full-height, edge-to-edge on the right */}
          <div className="relative mt-10 md:mt-0 rounded-2xl md:rounded-l-none md:rounded-r-2xl overflow-hidden bg-gray-200 min-h-[360px] md:min-h-0">
            {settings?.professorImage ? (
              <Image
                src={urlFor(settings.professorImage).width(800).height(900).fit("crop").url()}
                alt="清水 亮"
                fill
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-gray-400/40">
                <span className="text-white text-sm font-medium">清水 亮</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Biography ── 略歴・実績 + 画像 */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-[1fr_280px] gap-12 items-start">
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
              Profile
            </h2>
            <div className="mb-3">
              <p className="font-bold text-lg">清水 亮</p>
              <p className="text-sm text-gray-500">慶應義塾大学 環境情報学部 専任講師</p>
            </div>
            {settings?.biography ? (
              <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                <PortableText value={settings.biography} />
              </div>
            ) : (
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                略歴・実績はSanity Studioの「サイト設定」→「略歴・実績」から入力してください。
              </p>
            )}
          </div>

          {/* Profile image */}
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
            {settings?.professorImage ? (
              <Image
                src={urlFor(settings.professorImage).width(560).height(740).fit("crop").url()}
                alt="清水 亮"
                fill
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
                写真
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Message */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Message</h2>
        <div className="max-w-2xl">
          {settings?.greetingQuote && (
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800 mb-6">
              {settings.greetingQuote}
            </blockquote>
          )}
          <div className="text-sm text-gray-500 mb-6">
            <p className="font-medium text-gray-700">清水 亮</p>
            <p>慶應義塾大学 環境情報学部 専任講師</p>
          </div>
          {settings?.greeting ? (
            <div className="text-sm md:text-base text-gray-600">
              <PortableText value={settings.greeting} />
            </div>
          ) : (
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              清水亮研究会では、人工知能・機械学習・メディアアートをキーワードに、テクノロジーと社会の接点を探求しています。
            </p>
          )}
        </div>
      </section>

      {/* News */}
      {latestNews.length > 0 && (
        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">News</h2>
            <ul className="divide-y divide-gray-100">
              {latestNews.map((item) => (
                <li key={item._id} className="py-4 flex gap-6 items-start">
                  <span className="text-sm text-gray-400 whitespace-nowrap pt-0.5 w-24 shrink-0">
                    {formatDate(item.date)}
                  </span>
                  <p className="text-sm text-gray-800">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Contact</h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-xl">
            <div>
              <p className="text-xs text-gray-400 mb-1">所在地</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {settings?.contactAddress ??
                  "〒252-0882\n神奈川県藤沢市遠藤5322\n慶應義塾大学 湘南藤沢キャンパス\nΙ棟（イオタ棟）"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">お問い合わせ</p>
              <p className="text-sm text-gray-700">
                研究会に関するお問い合わせは、下記メールアドレスまでご連絡ください。
              </p>
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
