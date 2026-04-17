import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/safeFetch";
import { ACTIVITIES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata = { title: "活動・実績 | 清水亮研究会" };

type Activity = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  image: { asset: { _ref: string } } | null;
  category: string | null;
};

const CATEGORIES = [
  { value: "", label: "すべて" },
  { value: "project", label: "卒業・制作プロジェクト" },
  { value: "report", label: "活動レポート" },
  { value: "camp", label: "合宿" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory = "" } = await searchParams;

  const activities = await safeFetch<Activity[]>(ACTIVITIES_QUERY, {}, { next: { revalidate: 60 } });
  const allActivities = activities ?? [];

  const filtered = activeCategory
    ? allActivities.filter((a) => a.category === activeCategory)
    : allActivities;

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Activities</p>
      <h1 className="text-3xl font-bold mb-8">活動・実績</h1>

      {/* Category filter tabs */}
      <div className="flex gap-2 flex-wrap mb-10">
        {CATEGORIES.map(({ value, label }) => {
          const isActive = activeCategory === value;
          const href = value ? `/activities?category=${value}` : "/activities";
          return (
            <Link
              key={value}
              href={href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Cards */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((a) => (
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
                    {CATEGORIES.find((c) => c.value === a.category)?.label ?? a.category}
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
        <p className="text-sm text-gray-400">該当する活動はまだありません。</p>
      )}
    </div>
  );
}
