import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";

// Localized 404. Rendered inside the [locale] layout, so it keeps the header,
// footer, and language switcher: a dead end that still feels like the site.
export default async function NotFound() {
  const t = await getTranslations("error");

  return (
    <Section className="flex min-h-[60vh] flex-col items-start justify-center">
      <div className="font-display text-5xl text-forest">{t("notFound.code")}</div>
      <h1 className="mt-4 font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-4 max-w-[50ch] text-xl text-muted">{t("notFound.body")}</p>
      <Link href="/" className="button-primary mt-8">
        {t("notFound.home")}
      </Link>
    </Section>
  );
}
