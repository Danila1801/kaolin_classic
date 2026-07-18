// [PENDING — confirm before launch]
// This page names the studio as data controller but intentionally does NOT
// publish a KVK number, a registered address, or a verified contact domain — the
// studio isn't registered and kaolin.studio isn't owned yet. Those placeholders
// live in messages/*.json -> legal and must be filled in before this is the
// studio's public site. Do NOT invent a KVK number or address.

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OG_LOCALE, SITE_URL, localeAlternates } from "@/lib/site";
import LegalDoc from "@/components/legal/LegalDoc";

const PATH = "/privacy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("privacy.meta.title"),
    description: t("privacy.meta.description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}${PATH}`,
      languages: localeAlternates(PATH),
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/${locale}${PATH}`,
      title: t("privacy.meta.title"),
      description: t("privacy.meta.description"),
      locale: OG_LOCALE[locale] ?? "en_US",
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDoc doc="privacy" />;
}
