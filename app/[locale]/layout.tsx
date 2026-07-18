import type { Metadata } from "next";
import { Bricolage_Grotesque, Montserrat, PT_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, SITE_URL, localeAlternates } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

// Montserrat is the body face (owner's pick). It ships Cyrillic, so /ru body
// text never needs a fallback.
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

// Cyrillic fallback for /ru display type — Bricolage Grotesque has no
// Cyrillic. preload: false keeps it off the critical path for Latin locales.
const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["cyrillic"],
  variable: "--font-pt-sans",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Per-locale metadata: localized title/description, canonical for this locale,
// and hreflang alternates covering all four languages + x-default.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s · kaolin" },
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: localeAlternates(),
    },
    openGraph: {
      type: "website",
      siteName: "kaolin",
      url: `${SITE_URL}/${locale}`,
      title: t("title"),
      description: t("description"),
      locale: OG_LOCALE[locale] ?? "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${montserrat.variable} ${ptSans.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Skip link: first focusable element, visually hidden until focused.
            Lets keyboard users jump past the sticky header straight to the
            page content (WCAG 2.4.1). */}
        <a
          href="#main-content"
          className="sr-only rounded-full bg-forest px-5 py-2.5 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          {nav("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
