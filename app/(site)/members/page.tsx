import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/safeFetch";
import {
  MEMBERS_QUERY,
  ALUMNI_QUERY,
  INTERVIEWS_QUERY,
  PAPERS_QUERY,
  AWARDS_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@/components/PortableText";
import type { TypedObject } from "@portabletext/types";

export const metadata = { title: "メンバー | 清水亮研究会" };

type Member = {
  _id: string;
  name: string;
  role: string;
  image: { asset: { _ref: string } } | null;
  field: string;
  interests: string[];
  isFaculty: boolean;
  bio: TypedObject[] | null;
};

type AlumniYear = {
  _id: string;
  year: number;
  members: { name: string; field: string; destination: string }[];
};

type Interview = {
  _id: string;
  title: string;
  slug: string;
  memberName: string;
  memberRole: string;
};

type Paper = {
  _id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  venueShort: string;
  link: string;
};

type Award = {
  _id: string;
  title: string;
  recipient: string;
  year: number;
};

function MemberAvatar({ member }: { member: Member }) {
  if (member.image?.asset) {
    return (
      <div className="relative rounded-full overflow-hidden bg-gray-200 shrink-0">
        <Image
          src={urlFor(member.image).width(128).height(128).fit("crop").url()}
          alt={member.name}
          width={64}
          height={64}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-lg font-bold shrink-0">
      {member.name.charAt(0)}
    </div>
  );
}

export default async function MembersPage() {
  const [members, alumni, interviews, papers, awards] = await Promise.all([
    safeFetch<Member[]>(MEMBERS_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<AlumniYear[]>(ALUMNI_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<Interview[]>(INTERVIEWS_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<Paper[]>(PAPERS_QUERY, {}, { next: { revalidate: 60 } }),
    safeFetch<Award[]>(AWARDS_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const faculty = (members ?? []).filter((m) => m.isFaculty);
  const students = (members ?? []).filter((m) => !m.isFaculty);

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 space-y-20">
      {/* Faculty */}
      {faculty.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Faculty</p>
          <h1 className="text-3xl font-bold mb-8">メンバー</h1>
          {faculty.map((m) => (
            <div key={m._id} className="flex gap-6 items-start max-w-2xl">
              <MemberAvatar member={m} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-bold text-lg">{m.name}</h2>
                  <span className="text-xs text-gray-400">{m.role}</span>
                </div>
                <p className="text-sm text-blue-600 mb-2">{m.field}</p>
                {m.bio && (
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <PortableText value={m.bio} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Students */}
      {students.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Current Members
          </p>
          {faculty.length === 0 && <h1 className="text-3xl font-bold mb-8">メンバー</h1>}
          <div className="grid sm:grid-cols-2 gap-5">
            {students.map((m) => (
              <div
                key={m._id}
                className="border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {m.image?.asset ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                      <Image
                        src={urlFor(m.image).width(80).height(80).fit("crop").url()}
                        alt={m.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm shrink-0">
                      {m.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.role}</p>
                  </div>
                </div>
                <p className="text-xs font-medium text-blue-600 mb-2">{m.field}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {m.interests?.map((i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {i}
                    </span>
                  ))}
                </div>
                {m.bio && (
                  <div className="text-xs text-gray-500 leading-relaxed">
                    <PortableText value={m.bio} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interviews */}
      {interviews && interviews.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Interviews</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {interviews.map((iv) => (
              <Link
                key={iv._id}
                href={`/interviews/${iv.slug}`}
                className="border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors group"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {iv.memberName} · {iv.memberRole}
                </p>
                <h3 className="font-medium text-sm leading-snug group-hover:text-gray-500 transition-colors">
                  {iv.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2">読む →</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Papers */}
      {papers && papers.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Publications</p>
          <ul className="divide-y divide-gray-100">
            {papers.map((p) => (
              <li key={p._id} className="py-4">
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sm mb-1 hover:text-blue-600 transition-colors block"
                  >
                    {p.title}
                  </a>
                ) : (
                  <p className="font-medium text-sm mb-1">{p.title}</p>
                )}
                <p className="text-xs text-gray-500">{p.authors?.join(", ")}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {p.venue} ({p.year})
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Awards</p>
          <ul className="divide-y divide-gray-100">
            {awards.map((a) => (
              <li key={a._id} className="py-3 flex gap-6 items-baseline">
                <span className="text-sm text-gray-400 w-12 shrink-0">{a.year}</span>
                <div>
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-gray-400">{a.recipient}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Alumni */}
      {alumni && alumni.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Alumni</p>
          {alumni.map((group) => (
            <div key={group._id} className="mb-8">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">{group.year}年度 卒業・修了</h3>
              <ul className="divide-y divide-gray-100">
                {group.members?.map((m) => (
                  <li key={m.name} className="py-3 flex gap-6 items-baseline">
                    <span className="font-medium text-sm w-28 shrink-0">{m.name}</span>
                    <span className="text-xs text-gray-500 flex-1">{m.field}</span>
                    <span className="text-xs text-gray-400">{m.destination}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
