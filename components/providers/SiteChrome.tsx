"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import SmoothScroll from "./SmoothScroll";

/* Cursor renders nothing on the server and bails on coarse pointers, so it is
   safe to load it after hydration instead of shipping it in the layout chunk. */
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

/** Routes that opt out of the portfolio chrome entirely (standalone pages). */
const BARE_ROUTES = ["/d2c"];

/**
 * Wraps the site in smooth scroll + custom cursor, except on standalone landing
 * pages where every kilobyte counts — those get no animation runtime at all.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`),
  );

  if (bare) return <>{children}</>;

  return (
    <SmoothScroll>
      {children}
      <CustomCursor />
    </SmoothScroll>
  );
}
