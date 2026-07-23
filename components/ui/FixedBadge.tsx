"use client";

/** Fixed pill badge, bottom-right of the viewport on every page. */
export default function FixedBadge() {
  return (
    <a
      href="#contact"
      className="pill fixed bottom-16 right-5 z-[9] w-[142px] rounded-[10px]"
      data-cursor="grow"
    >
      Get in touch
    </a>
  );
}
