import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";

type ServiceItem = { name: string; body: string };

// "what we do" — an editorial list, not a grid of icon-cards. Each service is a
// row (quiet number, large name, plain description) set apart by space alone, no
// rules or boxes. The big lowercase names do the visual work.
export default async function Services() {
  const t = await getTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <Section id="services">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-end lg:gap-12">
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-intro lg:mb-1">{t("intro")}</p>
      </div>

      <div className="mt-14 flex flex-col sm:mt-20">
        {items.map((item, i) => (
          <div
            key={item.name}
            className="group grid grid-cols-1 gap-2 py-8 sm:py-10 md:grid-cols-[3.5rem_minmax(12rem,0.85fr)_minmax(0,1.25fr)] md:gap-8"
          >
            <span className="pt-1 text-[0.72rem] font-bold tracking-[0.13em] text-forest">
              0{i + 1}
            </span>
            <h3 className="font-display text-2xl leading-[1.05] tracking-[-0.03em] text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-[1.95rem]">
              {item.name}
            </h3>
            <p className="max-w-[40rem] text-muted md:pt-1">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
