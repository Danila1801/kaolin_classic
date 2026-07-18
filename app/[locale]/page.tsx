import { getTranslations, setRequestLocale } from "next-intl/server";

// Task 1 shell: a single editorial hero so the chrome, palette, and both fonts
// are visible and verifiable in every locale. The full set of sections
// (services, work, process, team, pricing, contact) lands in Task 2.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-12">
      <div className="flex min-h-[74vh] flex-col justify-center py-20 sm:py-28">
        <p className="hero-kicker">
          <span className="hero-kicker-dot" aria-hidden />
          {t("meta.title")}
        </p>
        <h1 className="hero-title mt-6">{t("hero.title")}</h1>
        <p className="hero-copy">{t("hero.subtitle")}</p>
        <div className="mt-10">
          <a href={`mailto:${t("contact.email")}`} className="button-primary">
            {t("nav.contact")}
          </a>
        </div>
      </div>
    </section>
  );
}
