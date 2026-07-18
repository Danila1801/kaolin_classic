"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";

// Localized error boundary for anything that throws while rendering a page. It's
// a client component (required for error boundaries) and sits inside the locale
// layout, so translations and the design system are available. `reset` re-tries.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("[page] render error:", error);
  }, [error]);

  return (
    <Section className="flex min-h-[60vh] flex-col items-start justify-center">
      <h1 className="font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
        {t("generic.title")}
      </h1>
      <p className="mt-4 max-w-[50ch] text-xl text-muted">{t("generic.body")}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <button onClick={reset} className="button-primary">
          {t("generic.retry")}
        </button>
        <Link href="/" className="button-secondary">
          {t("generic.home")}
        </Link>
      </div>
    </Section>
  );
}
