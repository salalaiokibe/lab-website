import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { safeFetch } from "@/sanity/lib/safeFetch";
import { ACTIVITY_SLUGS_QUERY, ACTIVITY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@/components/PortableText";
import type { TypedObject } from "@portabletext/types";

type ActivityDetail = {
  title: string;
  slug: string;
  date: string;
  author: string;
  image: { asset: { _ref: string } } | null;
  tags: string[];
  body: TypedObject[];
};

export async function generateStaticParams() {
  const slugs = await safeFetch<{ slug: string }[]>(ACTIVITY_SLUGS_QUERY);
  return (slugs ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = await safeFetch<ActivityDetail>(ACTIVITY_BY_SLUG_QUERY, { slug });
  return { title: activity ? `${activity.title} | 清水亮研究会` : "Not Found" };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = await safeFetch<ActivityDetail>(
    ACTIVITY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );
  if (!activity) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <Link
        href="/activities"
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8 inline-block"
      >
        ← 活動一覧に戻る
      </Link>

      {activity.image && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 mb-8">
          <Image
            src={urlFor(activity.image).width(960).height(540).fit("crop").url()}
            alt={activity.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-4">
        {activity.tags?.map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">{activity.title}</h1>
      <div className="flex gap-4 text-sm text-gray-400 mb-10">
        <span>{formatDate(activity.date)}</span>
        {activity.author && <span>by {activity.author}</span>}
      </div>

      {activity.body && (
        <article className="text-gray-700 text-sm md:text-base">
          <PortableText value={activity.body} />
        </article>
      )}
    </div>
  );
}
