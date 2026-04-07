import { safeFetch } from "@/sanity/lib/safeFetch";
import { JOIN_PAGE_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "参加募集 | 清水亮研究会" };

type JoinPageData = {
  intro: string | null;
  qualities: { title: string; description: string }[] | null;
  springClosed: boolean | null;
  springStatusText: string | null;
  fallTitle: string | null;
  fallIntro: string | null;
  fallSchedule: { date: string; event: string; note: string }[] | null;
  contactEmail: string | null;
  faq: { question: string; answer: string }[] | null;
};

const fallbackQualities = [
  { title: "問いを持っている人", description: "「なぜ？」「どうすれば？」という問いを持ち、答えを出すまで考え続けられる人。テーマの大小は関係ありません。" },
  { title: "実装・行動できる人", description: "アイデアをコードやプロトタイプに落とし込む意欲がある人。現時点での技術力より「やり切る力」を重視します。" },
  { title: "多様性を尊重できる人", description: "エンジニア・デザイナー・社会科学者など多様なバックグラウンドを持つメンバーと協働できる人。" },
  { title: "社会に向き合える人", description: "技術を社会課題に接続することに関心があり、フィールドに出ることを厭わない人。" },
];

const fallbackSchedule = [
  { date: "2026年8月上旬", event: "説明会・研究室見学", note: "詳細はメールでご連絡します" },
  { date: "2026年8月下旬", event: "書類選考", note: "志望動機・自己PR・過去の取り組み" },
  { date: "2026年9月中旬", event: "面接選考", note: "清水先生との個別面談" },
  { date: "2026年9月下旬", event: "合否通知", note: "" },
  { date: "2026年10月", event: "入会・オリエンテーション", note: "" },
];

const fallbackFaq = [
  { question: "プログラミング経験がなくても参加できますか？", answer: "はい、参加できます。技術力よりも「問い」と「意欲」を重視しています。入会後の研究活動の中でスキルを身につけることも可能です。" },
  { question: "他の研究会や部活動との掛け持ちはできますか？", answer: "はい、可能です。ただし、研究会の活動（ゼミ・プロジェクト）への参加を優先していただくことをお願いしています。" },
  { question: "学部・学年の制限はありますか？", answer: "慶應義塾大学の学部生・大学院生であれば学部・学年は問いません。SFC以外の学部からの参加者もいます。" },
];

export default async function JoinPage() {
  const data = await safeFetch<JoinPageData>(JOIN_PAGE_QUERY, {}, { next: { revalidate: 60 } });

  const qualities = data?.qualities?.length ? data.qualities : fallbackQualities;
  const springClosed = data?.springClosed ?? true;
  const springStatusText = data?.springStatusText ?? "2026年春の入会選考は募集を締め切りました。ご応募いただいた皆様、ありがとうございました。";
  const fallTitle = data?.fallTitle ?? "2026年秋 入会選考";
  const fallIntro = data?.fallIntro ?? "2026年秋の入会選考スケジュールが決定しました。詳細は順次更新します。ご質問はお気軽にメールでお問い合わせください。";
  const fallSchedule = data?.fallSchedule?.length ? data.fallSchedule : fallbackSchedule;
  const contactEmail = data?.contactEmail ?? "recruit@shimizu-lab.example.ac.jp";
  const faq = data?.faq?.length ? data.faq : fallbackFaq;

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 space-y-20">
      {/* Hero */}
      <section>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Join Us</p>
        <h1 className="text-3xl font-bold mb-4">参加募集</h1>
        <p className="text-gray-600 leading-relaxed max-w-2xl">
          {data?.intro ?? "清水亮研究会では、AIとテクノロジーの可能性を追求する仲間を求めています。専門分野や学年を問わず、「やりたいこと」を持った学生を歓迎します。"}
        </p>
      </section>

      {/* Qualities */}
      <section>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          What We Look For
        </p>
        <h2 className="text-2xl font-bold mb-8">求める人物像</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {qualities.map((q) => (
            <div key={q.title} className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold mb-2">{q.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{q.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment status */}
      <section>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Recruitment
        </p>

        {/* Spring – closed */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
              CLOSED
            </span>
            <h3 className="font-bold">2026年春 入会選考</h3>
          </div>
          <p className="text-sm text-gray-500">{springStatusText}</p>
        </div>

        {/* Fall – upcoming */}
        <div className="border border-gray-900 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold bg-gray-900 text-white px-2 py-0.5 rounded">
              UPCOMING
            </span>
            <h3 className="font-bold">{fallTitle}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-8 whitespace-pre-line">{fallIntro}</p>

          {/* Schedule timeline */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 ml-3" />
            <ul className="space-y-6">
              {fallSchedule.map((item, i) => (
                <li key={i} className="flex gap-6 relative pl-9">
                  <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{item.date}</p>
                    <p className="font-medium text-sm">{item.event}</p>
                    {item.note && <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-2">説明会への参加・詳細のお問い合わせ</p>
            <p className="font-medium text-sm">{contactEmail}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">FAQ</p>
          <dl className="divide-y divide-gray-100">
            {faq.map(({ question, answer }) => (
              <div key={question} className="py-5">
                <dt className="font-medium text-sm mb-2">Q. {question}</dt>
                <dd className="text-sm text-gray-500 leading-relaxed">A. {answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
