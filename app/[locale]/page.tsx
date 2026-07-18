import { getTranslations, setRequestLocale } from "next-intl/server";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

// The full one-page site: hero, trust strip, then every section top to bottom.
// All copy is reused verbatim from messages/*.json, so it reads correctly in
// en, nl, ro, and ru. Clean and non-3D: space, type hierarchy, and one soft
// raised surface (the featured demo), no boxes or borders.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <section id="top" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-[1320px] px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-28 lg:px-12 lg:pt-28 lg:pb-32">
          <p className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden />
            {t("meta.title")}
          </p>
          <h1 className="hero-title mt-6">{t("hero.title")}</h1>
          <p className="hero-copy">{t("hero.subtitle")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-11">
            <a href="#work" className="button-primary">
              {t("nav.work")} <span aria-hidden>↘</span>
            </a>
            <a href="#contact" className="button-secondary">
              {t("nav.contact")} <span aria-hidden>↘</span>
            </a>
          </div>
        </div>
      </section>

      <TrustStrip />
      <Services />
      <Work />
      <Process />
      <Team />
      <Pricing />
      <Contact />
    </>
  );
}
