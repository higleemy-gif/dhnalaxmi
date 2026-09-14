"use client";

import { useState } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";
import { siteConfig, hasWhatsApp } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/format";

type ContactPreference = "Phone" | "WhatsApp" | "Email";

interface FormState {
  // Personal
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  // Property
  propertyType: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  // Size
  area: string;
  unit: "Sq Ft" | "Sq Yards" | "Decimal" | "Acre" | "Other";
  // Financial
  expectedPrice: string;
  // Additional
  description: string;
  // Contact preference
  preference: ContactPreference;
}

const initialState: FormState = {
  fullName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  propertyType: "",
  address: "",
  city: "",
  district: "",
  state: "Odisha",
  pincode: "",
  area: "",
  unit: "Sq Ft",
  expectedPrice: "",
  description: "",
  preference: "WhatsApp",
};

const propertyTypeOptions = [
  "Residential Plot",
  "Commercial Plot",
  "House",
  "Apartment",
  "Villa",
  "Commercial Property",
  "Agricultural Land",
  "Land",
  "Other",
];

type Errors = Partial<Record<keyof FormState, string>>;

/** Indian mobile validation: 10 digits, starts 6-9. Country code optional. */
function validateIndianMobile(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }
  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }
  return false;
}

function validateEmail(value: string): boolean {
  if (!value) return true; // email is optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SellPropertyForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [docs, setDocs] = useState<File[]>([]);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.mobile.trim()) next.mobile = "Please enter your mobile number.";
    else if (!validateIndianMobile(form.mobile))
      next.mobile = "Please enter a valid 10-digit Indian mobile number.";
    if (form.whatsapp && !validateIndianMobile(form.whatsapp))
      next.whatsapp = "Please enter a valid Indian WhatsApp number.";
    if (!validateEmail(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.propertyType) next.propertyType = "Please select a property type.";
    if (!form.city.trim() && !form.district.trim() && !form.address.trim())
      next.city = "Please provide the property location.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildSummary = (): string => {
    return [
      `New property listing enquiry for ${siteConfig.name}`,
      "",
      `Name: ${form.fullName}`,
      `Mobile: ${form.mobile}`,
      form.whatsapp ? `WhatsApp: ${form.whatsapp}` : null,
      form.email ? `Email: ${form.email}` : null,
      "",
      `Property Type: ${form.propertyType}`,
      `Location: ${[form.address, form.city, form.district, form.state, form.pincode]
        .filter(Boolean)
        .join(", ")}`,
      form.area ? `Area: ${form.area} ${form.unit}` : null,
      form.expectedPrice ? `Expected Price: ₹${form.expectedPrice}` : null,
      "",
      form.description ? `Details: ${form.description}` : null,
      "",
      `Preferred Contact: ${form.preference}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    // No backend has been provisioned yet. Rather than fake a submission,
    // we prepare the payload here so the site owner can wire it up to any
    // backend (Formspree, Google Sheets, Supabase, Firebase, custom API,
    // etc.) with a single API call.
    const payload = {
      ...form,
      files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      documents: docs.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      submittedAt: new Date().toISOString(),
    };

    try {
      // Placeholder integration hook — replace endpoint when backend is set up.
      // await fetch("/api/sell", { method: "POST", body: JSON.stringify(payload) });
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-console
        console.info("[SellPropertyForm] payload prepared:", payload);
      }
      setStatus("success");
      setForm(initialState);
      setFiles([]);
      setDocs([]);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    const whatsappMsg = `Hello ${siteConfig.name}, I have just submitted my property details on your website. Please contact me at your earliest convenience.`;
    const whatsappLink = buildWhatsAppLink(whatsappMsg);
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-serif text-2xl font-bold text-emerald-900">
          Thank you!
        </h3>
        <p className="mt-2 text-emerald-800">
          Your property details have been submitted successfully. Our team will
          contact you soon.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {hasWhatsApp() && whatsappLink && (
            <WhatsAppButton
              message={whatsappMsg}
              label="Follow up on WhatsApp"
            />
          )}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn-outline"
          >
            Submit another property
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-10 rounded-3xl border border-line bg-white p-6 shadow-card md:p-10"
    >
      <FormSection
        number={1}
        title="Personal information"
        description="How can we reach you?"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            id="fullName"
            label="Full Name"
            required
            error={errors.fullName}
          >
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className="field-input"
              required
              aria-invalid={!!errors.fullName}
            />
          </Field>
          <Field
            id="mobile"
            label="Mobile Number"
            required
            error={errors.mobile}
            hint="10-digit Indian mobile number"
          >
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              value={form.mobile}
              onChange={(e) => update("mobile", e.target.value)}
              className="field-input"
              required
              aria-invalid={!!errors.mobile}
              placeholder="e.g. 98123 45678"
            />
          </Field>
          <Field id="whatsapp" label="WhatsApp Number" error={errors.whatsapp}>
            <input
              id="whatsapp"
              type="tel"
              inputMode="numeric"
              value={form.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              className="field-input"
              placeholder="If different from mobile"
              aria-invalid={!!errors.whatsapp}
            />
          </Field>
          <Field id="email" label="Email Address" error={errors.email}>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="field-input"
              aria-invalid={!!errors.email}
              placeholder="you@example.com"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        number={2}
        title="Property information"
        description="Tell us what you would like to sell."
      >
        <div className="grid gap-4">
          <Field
            id="propertyType"
            label="Property Type"
            required
            error={errors.propertyType}
          >
            <select
              id="propertyType"
              value={form.propertyType}
              onChange={(e) => update("propertyType", e.target.value)}
              className="field-input"
              required
              aria-invalid={!!errors.propertyType}
            >
              <option value="">Select property type…</option>
              {propertyTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>

          <Field id="address" label="Property Address" error={errors.address}>
            <input
              id="address"
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="field-input"
              placeholder="House / plot number, street, locality"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Field id="city" label="City" required error={errors.city}>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="field-input"
              />
            </Field>
            <Field id="district" label="District">
              <input
                id="district"
                type="text"
                value={form.district}
                onChange={(e) => update("district", e.target.value)}
                className="field-input"
              />
            </Field>
            <Field id="state" label="State">
              <input
                id="state"
                type="text"
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                className="field-input"
              />
            </Field>
            <Field id="pincode" label="PIN Code">
              <input
                id="pincode"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value)}
                className="field-input"
                placeholder="e.g. 765001"
              />
            </Field>
          </div>
        </div>
      </FormSection>

      <FormSection
        number={3}
        title="Property size"
        description="Approximate area of the property."
      >
        <div className="grid gap-4 md:grid-cols-[1fr,180px]">
          <Field id="area" label="Property Area">
            <input
              id="area"
              type="number"
              inputMode="decimal"
              min="0"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              className="field-input"
              placeholder="e.g. 1200"
            />
          </Field>
          <Field id="unit" label="Unit">
            <select
              id="unit"
              value={form.unit}
              onChange={(e) => update("unit", e.target.value as FormState["unit"])}
              className="field-input"
            >
              <option value="Sq Ft">Sq Ft</option>
              <option value="Sq Yards">Sq Yards</option>
              <option value="Decimal">Decimal</option>
              <option value="Acre">Acre</option>
              <option value="Other">Other</option>
            </select>
          </Field>
        </div>
      </FormSection>

      <FormSection
        number={4}
        title="Financial information"
        description="Optional — leave blank if you would like us to advise."
      >
        <Field id="expectedPrice" label="Expected Selling Price (INR)">
          <input
            id="expectedPrice"
            type="number"
            inputMode="numeric"
            min="0"
            value={form.expectedPrice}
            onChange={(e) => update("expectedPrice", e.target.value)}
            className="field-input"
            placeholder="e.g. 5000000"
          />
        </Field>
      </FormSection>

      <FormSection
        number={5}
        title="Additional details"
        description="Anything else buyers should know."
      >
        <Field id="description" label="Property Description">
          <textarea
            id="description"
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="field-input"
            placeholder="Describe your property, key features, road access, current status…"
          />
        </Field>
      </FormSection>

      <FormSection
        number={6}
        title="Media"
        description="Photos and documents help us match your property with buyers faster."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field id="photos" label="Upload Property Images">
            <input
              id="photos"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="field-input file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-navy-600"
            />
            {files.length > 0 && (
              <p className="mt-1.5 text-xs text-muted">
                {files.length} image{files.length === 1 ? "" : "s"} selected
              </p>
            )}
          </Field>
          <Field id="docs" label="Upload Documents (optional)">
            <input
              id="docs"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => setDocs(Array.from(e.target.files ?? []))}
              className="field-input file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-navy-600"
            />
            {docs.length > 0 && (
              <p className="mt-1.5 text-xs text-muted">
                {docs.length} document{docs.length === 1 ? "" : "s"} selected
              </p>
            )}
          </Field>
        </div>
      </FormSection>

      <FormSection
        number={7}
        title="Contact preference"
        description="How would you like our team to reach you?"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {(["Phone", "WhatsApp", "Email"] as ContactPreference[]).map(
            (option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-medium transition-colors ${
                  form.preference === option
                    ? "border-gold bg-gold/5 text-navy"
                    : "border-line text-ink hover:border-navy-300"
                }`}
              >
                <input
                  type="radio"
                  name="preference"
                  value={option}
                  checked={form.preference === option}
                  onChange={() => update("preference", option)}
                  className="h-4 w-4 accent-navy"
                />
                {option}
              </label>
            )
          )}
        </div>
      </FormSection>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          Something went wrong. Please try again or reach us on WhatsApp.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <button
          type="submit"
          className="btn-primary min-w-[220px]"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting…" : "Submit Property"}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
        <WhatsAppButton
          message={`Hello ${siteConfig.name}, I would like to sell my property. Please guide me on the next steps.`}
          label="Or WhatsApp us directly"
        />
      </div>
    </form>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 md:grid-cols-[220px,1fr] md:gap-10">
      <header>
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">
          Step {number}
        </span>
        <h3 className="mt-1 font-serif text-xl font-bold text-navy">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </header>
      <div>{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden="true" className="ml-0.5 text-gold">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
