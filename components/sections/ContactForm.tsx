"use client";

import { useState, type FormEvent } from "react";
import { INQUIRY } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[10px] border border-line bg-bg px-4 py-3 font-ui text-[15px] text-fg outline-none transition-colors placeholder:text-fg/35 focus:border-fg";
const label = "font-ui text-[13px] font-semibold text-fg";

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
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-name" className={label}>Name *</label>
        <input id="cf-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="cf-email" className={label}>Email *</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="cf-site" className={label}>Brand or website</label>
        <input
          id="cf-site"
          name="website"
          placeholder="yourbrand.com"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-service" className={label}>What do you need? *</label>
        <select id="cf-service" name="service" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {INQUIRY.services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="cf-budget" className={label}>Budget</label>
        <select id="cf-budget" name="budget" defaultValue="" className={field}>
          <option value="">Not sure yet</option>
          {INQUIRY.budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="cf-message" className={label}>Project details *</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          placeholder="What are you building, and when do you need it live?"
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-col items-start gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="grow"
          className="pill pill-lg disabled:opacity-60"
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
