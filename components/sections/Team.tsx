import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";

type Person = { name: string; role: string; body: string };

// "who we are" — the two humans. This is the trust asset, so it's deliberately
// plain: name, role, a few honest sentences. No stock headshots, no boxes.
//
// [PENDING DAD REVIEW] Leonid's bio (proof.items[0] in every messages/*.json) is
// written around "decades of hands-on software development" only — no company,
// client, or government claims. Leonid must confirm it before launch. The
// wording lives in the message files, not here.
export default async function Team() {
  const t = await getTranslations("proof");
  const items = t.raw("items") as Person[];

  return (
    <Section id="team">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-end lg:gap-12">
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-intro lg:mb-1">{t("intro")}</p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
        {items.map((person, i) => (
          <article key={person.name} className="h-full">
            <span className="text-[0.72rem] font-bold tracking-[0.15em] text-forest">
              0{i + 1}
            </span>
            <h3 className="mt-6 font-display text-4xl leading-none tracking-[-0.03em] text-ink sm:text-5xl">
              {person.name}
            </h3>
            <div className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-moss">
              {person.role}
            </div>
            <p className="mt-7 max-w-[42ch] text-muted">{person.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
