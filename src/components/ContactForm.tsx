"use client";

import { useState } from "react";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

interface ContactState {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}

const initial: ContactState = {
  name: "",
  mobile: "",
  email: "",
  subject: "",
  message: "",
};

function isValidIndianMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91"))
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
}

function isValidEmail(value: string) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [form, setForm] = useState<ContactState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = <K extends keyof ContactState>(k: K, v: ContactState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.mobile.trim()) next.mobile = "Please enter your mobile number.";
    else if (!isValidIndianMobile(form.mobile))
      next.mobile = "Please enter a valid 10-digit Indian mobile number.";
    if (!isValidEmail(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      // Placeholder — hook up to an email/API when backend is provisioned.
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-console
        console.info("[ContactForm] payload:", form);
      }
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold text-emerald-900">
          Message received
        </h3>
        <p className="mt-1 text-sm text-emerald-800">
          Thank you for reaching out. We will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-4"
        >
          Send another message
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">
            Your Name <span className="text-gold">*</span>
          </label>
          <input
            id="c-name"
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="field-input"
            required
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-mobile" className="field-label">
            Mobile Number <span className="text-gold">*</span>
          </label>
          <input
            id="c-mobile"
            type="tel"
            inputMode="numeric"
            value={form.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            className="field-input"
            required
            aria-invalid={!!errors.mobile}
            placeholder="10-digit mobile"
          />
          {errors.mobile && <p className="field-error">{errors.mobile}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="c-email" className="field-label">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="field-input"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="c-subject" className="field-label">
            Subject
          </label>
          <input
            id="c-subject"
            type="text"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            className="field-input"
            placeholder="e.g. Enquiry about Ashok Nagar plot"
          />
        </div>
      </div>

      <div>
        <label htmlFor="c-message" className="field-label">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="c-message"
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="field-input"
          aria-invalid={!!errors.message}
          placeholder="How can we help?"
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
          Something went wrong. Please try again or reach us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
