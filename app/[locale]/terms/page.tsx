import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OG_LOCALE, SITE_URL, localeAlternates } from "@/lib/site";
import LegalDoc from "@/components/legal/LegalDoc";

const PATH = "/terms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("terms.meta.title"),
    description: t("terms.meta.description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}${PATH}`,
      languages: localeAlternates(PATH),
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/${locale}${PATH}`,
      title: t("terms.meta.title"),
      description: t("terms.meta.description"),
      locale: OG_LOCALE[locale] ?? "en_US",
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDoc doc="terms" />;
}
