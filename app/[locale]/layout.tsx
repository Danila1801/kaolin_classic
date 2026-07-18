import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Montserrat, PT_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
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
// text never needs a fallback. preload: false keeps its three subset files off
// the critical path so the display font (the LCP heading) loads first; the
// metric-matched fallback makes the brief body swap unnoticeable.
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
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

// Browser UI tint: cream in light, pine in dark, so the mobile address bar
// matches the page ground instead of flashing white.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f3d34" },
  ],
};

// Organization schema for rich results. Deliberately conservative: it publishes
// only what's true today (the two people, what we do, where we work).
// [PENDING — confirm before launch] No KVK number, registered address, or VAT ID
// is published yet — the studio isn't registered. Add them once confirmed; do
// not invent a number.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kaolin",
  url: SITE_URL,
  description:
    "A father and son AI implementation studio building websites, chatbots, document assistants, and automation.",
  email: "hello@kaolin.studio",
  founder: [
    { "@type": "Person", name: "Leonid" },
    { "@type": "Person", name: "Danila" },
  ],
  areaServed: ["NL", "MD", "EU"],
  knowsAbout: [
    "Web development",
    "Large language models",
    "Retrieval-augmented generation",
    "Machine learning",
    "Business automation",
  ],
};

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
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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

  // Ship only the namespaces client components read to the browser: the language
  // switcher and mobile menu use `nav`, the contact form uses `contact`, and the
  // error boundary uses `error`. Everything else is server-rendered, so the large
  // copy blocks never bloat the client bundle.
  const messages = await getMessages();
  const clientMessages = {
    nav: messages.nav,
    contact: messages.contact,
    error: messages.error,
  };

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${montserrat.variable} ${ptSans.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Skip link: first focusable element, visually hidden until focused.
            Lets keyboard users jump past the sticky header straight to the
            page content (WCAG 2.4.1). */}
        <a
          href="#main-content"
          className="sr-only rounded-full bg-forest px-5 py-2.5 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          {nav("skipToContent")}
        </a>
        <NextIntlClientProvider messages={clientMessages}>
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
