import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";

type WorkItem = {
  name: string;
  body: string;
  cta: string;
  href: string;
  tag?: string; // optional badge — marks the live AI-assistant demo
};

// "see it for real" — the standout is the first item: a demo clinic with a live
// AI intake assistant, rendered as a wide soft-raised surface (card colour +
// soft shadow, no border) so the AI capability leads. The remaining deployed
// sites follow as two plain link blocks. External links open in a new tab with
// rel="noopener" so a demo can't script back to this window.
export default async function Work() {
  const t = await getTranslations("work");
  const items = t.raw("items") as WorkItem[];
  const [featured, ...rest] = items;

  return (
    <Section id="work">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-end lg:gap-12">
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-intro lg:mb-1">{t("intro")}</p>
      </div>

      {featured && (
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-14 flex flex-col rounded-3xl bg-card p-7 text-ink shadow-[0_2px_30px_rgba(25,27,23,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_44px_rgba(25,27,23,0.12)] sm:mt-20 sm:p-11"
        >
          {featured.tag && (
            <span className="inline-flex w-fit items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-forest">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              {featured.tag}
            </span>
          )}
          <h3 className="mt-5 max-w-[17ch] font-display text-3xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-5xl">
            {featured.name}
          </h3>
          <p className="mt-5 max-w-[55ch] text-muted">{featured.body}</p>
          <span className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-forest">
            {featured.cta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </a>
      )}

      <div className="mt-6 grid grid-cols-1 gap-10 sm:mt-8 md:grid-cols-2 md:gap-8">
        {rest.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col py-2 text-ink"
          >
            <h3 className="font-display text-3xl leading-none tracking-[-0.04em] text-ink transition-colors group-hover:text-forest">
              {item.name}
            </h3>
            <p className="mt-4 flex-1 text-lg text-muted">{item.body}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-base font-bold text-forest">
              {item.cta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        ))}
      </div>

      <p className="mt-12 max-w-[60ch] text-base italic text-muted">{t("note")}</p>
    </Section>
  );
}
