"use client";

import { useState, type FormEvent } from "react";
import { INQUIRY } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[6px] border border-line bg-surface px-4 py-[11px] font-ui text-[15px] text-fg outline-none transition-colors placeholder:text-fg/40 focus:border-fg focus:bg-bg";
/* Selects draw their own chevron so it sits clear of the edge. */
const select = `${field} cursor-pointer appearance-none pr-12`;

function Chevron() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-fg/50">
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Labels stay for screen readers; the placeholder is the visible prompt. */
const label = "sr-only";

/**
 * Project inquiry form. The site is a static export, so submissions go to a
 * form relay (FormSubmit) that emails them to Meet; no server of our own.
 * A hidden honeypot field catches most bots.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // bot
    setStatus("sending");
    try {
      const res = await fetch(INQUIRY.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New project inquiry from ${data.name || "the website"}`,
          _template: "table",
          _replyto: data.email,
          page: window.location.href,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(json.success) === "false") throw new Error("send failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-[14px] border border-line bg-surface p-8 text-center lg:p-10"
      >
        <p className="font-sans text-[26px] font-semibold tracking-[-0.02em] text-fg">
          {INQUIRY.successTitle}
        </p>
        <p className="mx-auto mt-3 max-w-[46ch] font-ui text-[15px] leading-[1.6] text-fg/70">
          {INQUIRY.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 gap-y-3 text-left sm:grid-cols-2">
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="flex flex-col">
        <label htmlFor="cf-name" className={label}>Name *</label>
        <input id="cf-name" name="name" required autoComplete="name" placeholder="Name *" className={field} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cf-email" className={label}>Email *</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email *"
          className={field}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="cf-service" className={label}>What do you need? *</label>
        <div className="relative">
          <select id="cf-service" name="service" required defaultValue="" className={`${select} invalid:text-fg/45`}>
            <option value="" disabled>What do you need? *</option>
            {INQUIRY.services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="cf-budget" className={label}>Budget</label>
        <div className="relative">
          <select id="cf-budget" name="budget" defaultValue="" className={`${select} has-[option[value='']:checked]:text-fg/45`}>
            <option value="">Budget: not sure yet</option>
            {INQUIRY.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>

      <div className="flex flex-col sm:col-span-2">
        <label htmlFor="cf-site" className={label}>Brand or website</label>
        <input
          id="cf-site"
          name="website"
          placeholder="Brand or website (yourbrand.com)"
          className={field}
        />
      </div>

      <div className="flex flex-col sm:col-span-2">
        <label htmlFor="cf-message" className={label}>Project details *</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={3}
          placeholder="Project details: what are you building, and when do you need it live? *"
          className={`${field} resize-y`}
        />
      </div>

      <div className="mt-2 flex flex-col items-stretch gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="grow"
          className="pill h-[54px] w-full justify-center rounded-[6px] text-[17px] font-semibold disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : INQUIRY.submit}
        </button>
        {status === "error" && (
          <p role="alert" className="font-ui text-[14px] text-[#b42318]">
            {INQUIRY.errorText}
          </p>
        )}
      </div>
    </form>
  );
}
