"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ServiceGraphic from "@/components/sections/ServiceGraphic";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { SERVICES_SECTION } from "@/lib/data";

type Card = (typeof SERVICES_SECTION.cards)[number];

/**
 * A service card dressed as a macOS window, with working window controls:
 *
 *   red     closes the window, leaving a dashed outline with a Reopen button
 *   yellow  minimises it to the title bar (click again to restore)
 *   green   zooms it into a large window over the page with more detail
 *
 * The body of the card is the link to the service, kept separate from the
 * buttons so no control sits inside a link.
 */
export default function ServiceWindow({ card, index }: { card: Card; index: number }) {
  const [state, setState] = useState<"open" | "min" | "closed">("open");
  const [zoomed, setZoomed] = useState(false);
  /* Stable, so the zoomed window's setup effect runs once per opening. */
  const closeZoom = useCallback(() => setZoomed(false), []);
  const label = `${String(index).padStart(2, "0")} · ${card.tag}`;

  if (state === "closed") {
    return (
      <div className="grid h-full min-h-[360px] place-items-center rounded-[26px] border border-dashed border-white/15">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-ui text-[13px] text-muted">{label} closed</span>
          <button
            type="button"
            onClick={() => setState("open")}
            data-cursor="grow"
            className="pill pill-ghost h-10 rounded-full px-5 text-[14px]"
          >
            Reopen
          </button>
        </div>
      </div>
    );
  }

  const minimised = state === "min";

  return (
    <>
      <div
        className={`group/card flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-[#17171d] to-[#111116] transition-colors duration-300 hover:border-white/20 ${
          minimised ? "" : "h-full"
        }`}
      >
        <TitleBar
          label={label}
          title={card.title}
          href={card.href}
          minimised={minimised}
          onClose={() => setState("closed")}
          onMinimise={() => setState(minimised ? "open" : "min")}
          onZoom={() => {
            setState("open");
            setZoomed(true);
          }}
        />

        {/* Body: collapses to nothing when minimised */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            minimised ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          } ${minimised ? "" : "flex-1"}`}
          inert={minimised}
        >
          <Link href={card.href} data-cursor="grow" className="group flex min-h-0 flex-col overflow-hidden">
            <Stage kind={card.graphic} />
            <span className="flex flex-1 flex-col px-6 pb-7 pt-6">
              <h3 className="text-[24px] leading-[1.12] tracking-[-0.02em] text-fg lg:text-[26px]">
                {card.title}
              </h3>
              <p className="mt-2.5 font-ui text-[15px] leading-[1.55] text-muted">{card.text}</p>
            </span>
          </Link>
        </div>
      </div>

      {zoomed && <ZoomedWindow card={card} label={label} onClose={closeZoom} />}
    </>
  );
}

function Stage({ kind, large = false }: { kind: Card["graphic"]; large?: boolean }) {
  return (
    <span
      className={`relative block overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(238,33,36,0.22),rgba(238,33,36,0.05)_45%,transparent_70%)] ${
        large ? "aspect-[16/10]" : "aspect-[16/11]"
      }`}
    >
      <span className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
        <ServiceGraphic kind={kind} />
      </span>
    </span>
  );
}

/** macOS traffic lights. Glyphs appear when the pointer is over the group. */
function TitleBar({
  label,
  title,
  href,
  minimised,
  onClose,
  onMinimise,
  onZoom,
  zoomed = false,
}: {
  label: string;
  title: string;
  href?: string;
  minimised?: boolean;
  onClose: () => void;
  onMinimise: () => void;
  onZoom: () => void;
  zoomed?: boolean;
}) {
  const lights = [
    { color: "#ff5f57", name: zoomed ? `Close ${title}` : `Close ${title} window`, onClick: onClose, glyph: "M4 4l6 6M10 4l-6 6" },
    {
      color: "#febc2e",
      name: minimised ? `Restore ${title} window` : `Minimise ${title} window`,
      onClick: onMinimise,
      glyph: "M3.5 7h7",
    },
    {
      color: "#28c840",
      name: zoomed ? `Exit full view of ${title}` : `Open ${title} in full view`,
      onClick: onZoom,
      glyph: "M4 10V5.5L8.5 10zM10 4v4.5L5.5 4z",
    },
  ];
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-3.5">
      <div className="group/lights flex gap-[7px]">
        {lights.map((l) => (
          <button
            key={l.color}
            type="button"
            aria-label={l.name}
            title={l.name}
            onClick={l.onClick}
            className="grid size-[12px] place-items-center rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] outline-offset-2 transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fg"
            style={{ background: l.color }}
          >
            <svg
              viewBox="0 0 14 14"
              aria-hidden
              className="size-[8px] opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100 group-focus-within/lights:opacity-100"
            >
              <path
                d={l.glyph}
                fill={l.color === "#28c840" ? "rgba(0,0,0,0.55)" : "none"}
                stroke="rgba(0,0,0,0.55)"
                strokeWidth={l.color === "#28c840" ? 0 : 1.6}
                strokeLinecap="round"
              />
            </svg>
          </button>
        ))}
      </div>
      <span className="font-ui text-[13px] font-semibold text-fg">{label}</span>
      {href ? (
        <Link
          href={href}
          aria-label={title}
          data-cursor="grow"
          className="ml-auto text-muted transition-colors duration-300 hover:text-accent group-hover/card:text-accent"
        >
          <ArrowIcon />
        </Link>
      ) : (
        <span className="ml-auto" />
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/**
 * The zoomed window: a dialog over the page with the drawing large, the
 * service's details and a link onward. Esc, the backdrop, and the red and
 * green buttons all close it. Rendered into <body> so no animated ancestor's
 * transform can trap its fixed positioning.
 */
function ZoomedWindow({ card, label, onClose }: { card: Card; label: string; onClose: () => void }) {
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setShown(true));
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      /* Keep Tab inside the dialog */
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
      opener?.focus();
    };
  }, [lenis, onClose]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[80] grid place-items-center overflow-y-auto p-4 transition-opacity duration-300 md:p-8 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      data-lenis-prevent
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-black/70 backdrop-blur-md"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={card.title}
        className={`relative w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-b from-[#17171d] to-[#0f0f13] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          shown ? "scale-100" : "scale-[0.92]"
        }`}
      >
        <TitleBar
          label={label}
          title={card.title}
          zoomed
          onClose={onClose}
          onMinimise={onClose}
          onZoom={onClose}
        />
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="group">
            <Stage kind={card.graphic} large />
          </div>
          <div className="flex flex-col p-7 md:p-9">
            <h3 className="text-[32px] leading-[1.08] tracking-[-0.02em] text-fg md:text-[40px]">{card.title}</h3>
            <p className="mt-4 font-ui text-[16px] leading-[1.6] text-muted">{card.text}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {card.details.map((d) => (
                <li key={d} className="flex items-start gap-3 font-ui text-[15px] leading-[1.5] text-fg">
                  <span aria-hidden className="mt-[7px] size-[7px] shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
            <Link
              href={card.href}
              data-cursor="grow"
              className="pill mt-8 h-12 self-start rounded-full px-7 text-[15px] tracking-[-0.01em]"
            >
              {card.linkLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
