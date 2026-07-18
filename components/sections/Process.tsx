import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";

type Step = { step: string; name: string; body: string };

// "how we work" — four numbered steps. The forest step numbers do the visual
// work; no icons, no illustration. Two columns on tablet, four across on wide.
export default async function Process() {
  const t = await getTranslations("process");
  const items = t.raw("items") as Step[];

  return (
    <Section id="process">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-end lg:gap-12">
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-intro lg:mb-1">{t("intro")}</p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.step}>
            <div className="text-[0.82rem] font-bold tracking-[0.14em] text-forest">
              {item.step}
            </div>
            <h3 className="mt-5 font-display text-2xl leading-[1.08] tracking-[-0.03em] text-ink">
              {item.name}
            </h3>
            <p className="mt-4 text-lg text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
