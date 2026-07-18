import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";

// A quiet full-bleed band on the mist tint, right under the hero. It carries the
// studio's one-line credibility claim: who we are, and that you deal with the
// people who build it. Full-bleed background, so it wraps Section.
export default async function TrustStrip() {
  const t = await getTranslations("trust");

  return (
    <div className="bg-mist">
      <Section className="py-10 sm:py-12 lg:py-14">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
          <span aria-hidden="true" className="flex items-center gap-2 text-moss">
            <i className="block h-2 w-2 rounded-full bg-current" />
            <i className="block h-2 w-8 rounded-full bg-current" />
          </span>
          <p className="max-w-[52ch] font-display text-2xl leading-[1.12] tracking-[-0.03em] text-ink sm:text-[1.9rem]">
            {t("line")}
          </p>
        </div>
      </Section>
    </div>
  );
}
