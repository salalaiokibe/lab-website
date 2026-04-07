import { groq } from "next-sanity";

// ── Site Settings (singleton) ──────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    catchphrase,
    catchphraseSub,
    professorImage,
    biography,
    greeting,
    greetingQuote,
    contactAddress,
    contactEmail
  }
`;

// ── News ───────────────────────────────────────────────────────────────────
export const NEWS_QUERY = groq`
  *[_type == "newsItem"] | order(date desc) {
    _id,
    title,
    date,
    body
  }
`;

// ── Members ────────────────────────────────────────────────────────────────
export const MEMBERS_QUERY = groq`
  *[_type == "member"] | order(order asc) {
    _id,
    name,
    role,
    image,
    field,
    interests,
    isFaculty,
    bio
  }
`;

// ── Alumni ─────────────────────────────────────────────────────────────────
export const ALUMNI_QUERY = groq`
  *[_type == "alumniYear"] | order(year desc) {
    _id,
    year,
    members[] { name, field, destination }
  }
`;

// ── Activities ─────────────────────────────────────────────────────────────
export const ACTIVITIES_QUERY = groq`
  *[_type == "activity"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    author,
    image,
    tags
  }
`;

export const ACTIVITY_SLUGS_QUERY = groq`
  *[_type == "activity"] { "slug": slug.current }
`;

export const ACTIVITY_BY_SLUG_QUERY = groq`
  *[_type == "activity" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    date,
    author,
    image,
    tags,
    body
  }
`;

// ── Interviews ─────────────────────────────────────────────────────────────
export const INTERVIEWS_QUERY = groq`
  *[_type == "interview"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    memberName,
    memberRole,
    date,
    image
  }
`;

export const INTERVIEW_SLUGS_QUERY = groq`
  *[_type == "interview"] { "slug": slug.current }
`;

export const INTERVIEW_BY_SLUG_QUERY = groq`
  *[_type == "interview" && slug.current == $slug][0] {
    title,
    memberName,
    memberRole,
    date,
    image,
    body
  }
`;

// ── Papers & Awards ────────────────────────────────────────────────────────
export const PAPERS_QUERY = groq`
  *[_type == "paper"] | order(year desc) {
    _id,
    title,
    authors,
    year,
    venue,
    venueShort,
    link
  }
`;

export const AWARDS_QUERY = groq`
  *[_type == "award"] | order(year desc) {
    _id,
    title,
    recipient,
    year
  }
`;

// ── Research Domains ───────────────────────────────────────────────────────
export const DOMAINS_QUERY = groq`
  *[_type == "researchDomain"] | order(order asc) {
    _id,
    title,
    description,
    icon
  }
`;

// ── Join Page (singleton) ──────────────────────────────────────────────────
export const JOIN_PAGE_QUERY = groq`
  *[_type == "joinPage"][0] {
    intro,
    qualities[] { title, description },
    springClosed,
    springStatusText,
    fallTitle,
    fallIntro,
    fallSchedule[] { date, event, note },
    contactEmail,
    faq[] { question, answer }
  }
`;
