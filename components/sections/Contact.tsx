import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import ContactForm from "@/components/sections/ContactForm";

// The closing call to action, on a deep forest surface that leads into the pine
// footer. Left: the ask. Right: a simple working form plus a direct email
// fallback. data-dark switches the focus ring to sand (a forest ring would be
// invisible here).
export default async function Contact() {
  const t = await getTranslations("contact");
  const email = t("email");

  return (
    <div data-dark className="bg-forest text-cream">
      <Section id="contact" className="pb-12 sm:pb-16 lg:pb-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="max-w-[34rem]">
            <h2 className="font-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.95] tracking-[-0.04em] text-cream">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80">{t("body")}</p>
          </div>

          <div>
            <ContactForm />
            <p className="mt-6 text-sm text-cream/70">
              {t("or")}{" "}
              <a
                href={`mailto:${email}`}
                className="text-cream underline decoration-sand/60 underline-offset-4 transition-colors hover:decoration-cream"
              >
                {email}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
