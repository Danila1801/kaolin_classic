import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";

type Tier = { name: string; from: string; body: string; features: string[] };

// "pricing" — no fixed prices. Every project is scoped on a free call, so the
// section shows what each kind of work includes (name, plain line, a few
// points), never a figure. No boxes or borders: the three columns are set apart
// by space alone. The `from` field in the messages is intentionally not rendered.
export default async function Pricing() {
  const t = await getTranslations("pricing");
  const tiers = t.raw("tiers") as Tier[];

  return (
    <Section id="pricing">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-end lg:gap-12">
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-intro lg:mb-1">{t("intro")}</p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 md:mt-20 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex flex-col">
            <h3 className="font-display text-2xl leading-none tracking-[-0.03em] text-ink">
              {tier.name}
            </h3>
            <p className="mt-5 text-lg text-muted">{tier.body}</p>
            <ul className="mt-7 flex flex-col gap-3 text-base">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-0.5 leading-none text-forest">
                    ✓
                  </span>
                  <span className="text-ink/85">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-14 max-w-[46rem] text-lg text-muted">{t("footnote")}</p>
    </Section>
  );
}
