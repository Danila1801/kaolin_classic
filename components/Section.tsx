import type { ReactNode } from "react";

// Layout primitive every page section uses. It owns the max content width
// (1320px, centered), the horizontal gutters, and the generous vertical rhythm.
// scroll-mt keeps anchored sections clear of the sticky header.
export default function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1320px] scroll-mt-24 px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
