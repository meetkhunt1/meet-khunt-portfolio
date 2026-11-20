import Link from "next/link";
import { CONTACT } from "@/lib/data";

/** Fixed pill badge, bottom-right of the viewport: opens the inquiry form. */
export default function FixedBadge() {
  return (
    <Link
      href={CONTACT.href}
      className="pill fixed bottom-16 right-5 z-[9] w-[142px] rounded-[10px]"
      data-cursor="grow"
    >
      Get in touch
    </Link>
  );
}
