import Link from "next/link";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/lib/safeFetch";
import { INTERVIEW_SLUGS_QUERY, INTERVIEW_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "@/components/PortableText";
import type { TypedObject } from "@portabletext/types";

type InterviewDetail = {
  title: string;
  memberName: string;
  memberRole: string;
  date: string;
  image: { asset: { _ref: string } } | null;
  body: TypedObject[];
};

export async function generateStaticParams() {
  const slugs = await safeFetch<{ slug: string }[]>(INTERVIEW_SLUGS_QUERY);
  return (slugs ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const interview = await safeFetch<InterviewDetail>(INTERVIEW_BY_SLUG_QUERY, { slug });
  return { title: interview ? `${interview.title} | 清水亮研究会` : "Not Found" };
}

export default async function InterviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const interview = await safeFetch<InterviewDetail>(
    INTERVIEW_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );
  if (!interview) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <Link
        href="/members"
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8 inline-block"
      >
        ← メンバーページに戻る
      </Link>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Interview</p>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">{interview.title}</h1>
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
          {interview.memberName?.charAt(0) ?? "?"}
        </div>
        <div>
          <p className="font-medium text-sm">{interview.memberName}</p>
          <p className="text-xs text-gray-400">{interview.memberRole}</p>
        </div>
      </div>
      {interview.body && (
        <article className="text-gray-700 text-sm md:text-base">
          <PortableText value={interview.body} />
        </article>
      )}
    </div>
  );
}
