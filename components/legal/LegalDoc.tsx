import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";

type LegalSection = { h: string; p: string[] };

// Renders one legal document from the "legal" message namespace. All four
// locales share this layout; only the copy in messages/*.json changes, so it
// stays translatable and reviewable without touching code. Boxless: space and
// type hierarchy only, muted body on cream (AA).
export default async function LegalDoc({
  doc,
}: {
  doc: "privacy" | "terms" | "cookies";
}) {
  const t = await getTranslations("legal");
  const sections = t.raw(`${doc}.sections`) as LegalSection[];

  return (
    <Section className="pt-12 sm:pt-20">
      <div className="max-w-[70ch]">
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          {t("backHome")}
        </Link>

        <h1 className="mt-6 font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
          {t(`${doc}.title`)}
        </h1>
        <p className="mt-3 text-sm text-muted">{t("updated")}</p>
        <p className="mt-6 text-lg text-muted">{t(`${doc}.intro`)}</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-xl text-ink">{s.h}</h2>
              {s.p.map((para, j) => (
                <p key={j} className="mt-3 leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
