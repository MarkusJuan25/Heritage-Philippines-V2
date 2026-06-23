import { useState, useRef } from "react";
import HeritageSection from "../components/HeritageSection";
import { createContactInquiry } from "../services/contactService";

// TODO: Confirm official public contact details before deployment.
const CONTACT = {
  phone: "+63 (2) 8373-3212 | +63 (2) 8373-3305",
  viber: "+63 931 007 6374",
  email: "cs@heritagephilippines.com",
  address: [
    "Unit 603, 6th Floor",
    "West Insula Condominium",
    "135 West Avenue, Quezon City 1105",
    "Metro Manila, Philippines",
  ],
  hours: ["9:00 a.m – 6:00 p.m", "Monday–Friday except holidays"],
};

const COUNTRY_CODES = [
  { code: "PH",    label: "🇵🇭 Philippines (+63)",          dial: "+63"  },
  { code: "US",    label: "🇺🇸 United States (+1)",          dial: "+1"   },
  { code: "CA",    label: "🇨🇦 Canada (+1)",                 dial: "+1"   },
  { code: "GB",    label: "🇬🇧 United Kingdom (+44)",        dial: "+44"  },
  { code: "AU",    label: "🇦🇺 Australia (+61)",             dial: "+61"  },
  { code: "JP",    label: "🇯🇵 Japan (+81)",                 dial: "+81"  },
  { code: "KR",    label: "🇰🇷 South Korea (+82)",           dial: "+82"  },
  { code: "SG",    label: "🇸🇬 Singapore (+65)",             dial: "+65"  },
  { code: "HK",    label: "🇭🇰 Hong Kong (+852)",            dial: "+852" },
  { code: "TW",    label: "🇹🇼 Taiwan (+886)",               dial: "+886" },
  { code: "AE",    label: "🇦🇪 United Arab Emirates (+971)", dial: "+971" },
  { code: "SA",    label: "🇸🇦 Saudi Arabia (+966)",         dial: "+966" },
  { code: "QA",    label: "🇶🇦 Qatar (+974)",                dial: "+974" },
  { code: "KW",    label: "🇰🇼 Kuwait (+965)",               dial: "+965" },
  { code: "IT",    label: "🇮🇹 Italy (+39)",                 dial: "+39"  },
  { code: "FR",    label: "🇫🇷 France (+33)",                dial: "+33"  },
  { code: "DE",    label: "🇩🇪 Germany (+49)",               dial: "+49"  },
  { code: "ES",    label: "🇪🇸 Spain (+34)",                 dial: "+34"  },
  { code: "NL",    label: "🇳🇱 Netherlands (+31)",           dial: "+31"  },
  { code: "CH",    label: "🇨🇭 Switzerland (+41)",           dial: "+41"  },
  { code: "GR",    label: "🇬🇷 Greece (+30)",                dial: "+30"  },
  { code: "IL",    label: "🇮🇱 Israel (+972)",               dial: "+972" },
  { code: "NZ",    label: "🇳🇿 New Zealand (+64)",           dial: "+64"  },
  { code: "OTHER", label: "Other / Custom code",              dial: ""     },
];

const INQUIRY_TYPES = [
  "Tour Inquiry",
  "Package Quote",
  "Hotel & Transfers",
  "Visa and Insurance Assistance",
  "Custom Family Route",
  "Regional Tour Planning",
  "General Inquiry",
];

const FAQ_ITEMS = [
  {
    q: "How do I start a heritage tour inquiry?",
    a: "Fill out the inquiry form on this page with your travel dates, group size, and preferred destinations. Our team will review your details and reply within two business days.",
  },
  {
    q: "Can I request a custom family route?",
    a: 'Yes. Select "Custom Family Route" in the Inquiry Type field and describe your preferred destinations and travel pace in the message field.',
  },
  {
    q: "Can I request hotel and transfer assistance?",
    a: 'Yes. We can arrange hotel bookings and airport or inter-city transfers as part of your package. Select "Hotel & Transfers" in the Inquiry Type field.',
  },
  {
    q: "Do you assist with visa and travel insurance?",
    a: 'We can provide guidance and coordination for visa requirements and travel insurance recommendations. Select "Visa and Insurance Assistance" when filling out your inquiry.',
  },
  {
    q: "How soon will the team respond?",
    a: "We typically reply within two business days. For urgent inquiries, you may reach us directly via Viber or WhatsApp.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted]     = useState(false);
  const [openFaq, setOpenFaq]         = useState(null);
  const [countryCode, setCountryCode] = useState("PH");
  const [customCode, setCustomCode]   = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const contactNumberRaw = data.get("contactNumber") || "";
    const dial =
      countryCode === "OTHER"
        ? customCode
        : (COUNTRY_CODES.find((c) => c.code === countryCode)?.dial ?? "");
    const phone = dial
      ? `${dial} ${contactNumberRaw}`.trim()
      : contactNumberRaw.trim();

    const payload = {
      name: (data.get("fullName") || "").trim(),
      email: (data.get("email") || "").trim(),
      phone,
      countryCode,
      inquiryType: data.get("inquiryType") || "",
      destination: data.get("destination") || "",
      startDate: data.get("travelStart") || "",
      endDate: data.get("travelEnd") || "",
      message: (data.get("message") || "").trim(),
      consent: true,
      source: "contact-page",
    };

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await createContactInquiry(payload);
      formRef.current?.reset();
      setCountryCode("PH");
      setCustomCode("");
      setSubmitted(true);
    } catch (err) {
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        null;
      setSubmitError(
        serverMessage ||
          "Something went wrong. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <HeritageSection variant="primary" grow className="pb-20 pt-28 sm:pt-32 md:pt-36">
      <div className="container-page space-y-14">

        {/* ── Two-column: contact info left · form right ─────────────── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">

          {/* Left: page heading + intro + contact cards */}
          <aside>
            <div className="mb-8">
              <p className="eyebrow">Contact</p>
              <h1 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
                Let&apos;s plan your journey.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-coffee-800/75">
                Reach out through any of the channels below, or fill out the
                inquiry form and our team will respond within two business days.
              </p>
            </div>

            <div className="space-y-4">

              <div className="card-warm p-5">
                <span className="eyebrow">Phone</span>
                <p className="relative mt-2 text-sm leading-relaxed text-coffee-800/90">
                  {CONTACT.phone}
                </p>
              </div>

              <div className="card-warm p-5">
                <span className="eyebrow">Viber / WhatsApp</span>
                <p className="relative mt-2 text-sm text-coffee-800/90">
                  {CONTACT.viber}
                </p>
              </div>

              <div className="card-warm p-5">
                <span className="eyebrow">Email</span>
                <p className="relative mt-2 text-sm">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-coffee-800/90 transition-colors hover:text-coffee-950"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </div>

              <div className="card-warm p-5">
                <span className="eyebrow">Office Address</span>
                <address className="relative mt-2 not-italic text-sm leading-relaxed text-coffee-800/85">
                  {CONTACT.address.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < CONTACT.address.length - 1 && <br />}
                    </span>
                  ))}
                </address>
                <p className="relative mt-2 text-xs text-coffee-700/60">
                  By appointment — our team is often on the road with guests.
                </p>
              </div>

              <div className="card-warm p-5">
                <span className="eyebrow">Office Hours</span>
                <p className="relative mt-2 text-sm leading-relaxed text-coffee-800/90">
                  {CONTACT.hours[0]}
                  <br />
                  {CONTACT.hours[1]}
                </p>
              </div>

            </div>
          </aside>

          {/* Right: inquiry form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-white via-cream-50 to-cream-100 p-6 shadow-premium md:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-400/[0.12] blur-3xl"
            />

            <div className="relative mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coffee-700/85">
                Inquiry · takes about a minute
              </span>
            </div>

            {submitted ? (
              <div className="relative flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-full bg-gold-400/15 text-xl text-gold-600"
                >
                  ✓
                </span>
                <p className="max-w-sm font-serif text-lg text-coffee-900">
                  Thank you. Your inquiry has been prepared. Our team will
                  review your details shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-coffee-700/60 underline underline-offset-2 hover:text-coffee-900"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="relative grid gap-4 md:grid-cols-2">

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="field-label">
                      Full Name{" "}
                      <span aria-hidden="true" className="text-gold-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Input your full name"
                      className="field-input"
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="field-label">
                      Email Address{" "}
                      <span aria-hidden="true" className="text-gold-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Input your email address"
                      className="field-input"
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Phone / Viber / WhatsApp — country code + number row */}
                  <div className="md:col-span-2">
                    <label htmlFor="contactNumber" className="field-label">
                      Phone / Viber / WhatsApp{" "}
                      <span aria-hidden="true" className="text-gold-500">*</span>
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <select
                        name="countryCode"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="rounded-lg border border-cream-200 bg-cream-50 px-3 py-3 text-sm text-coffee-900 transition focus:border-gold-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 sm:w-[230px] sm:shrink-0"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        placeholder="Input your phone number"
                        className="field-input flex-1"
                        autoComplete="tel"
                        required
                      />
                    </div>
                    {countryCode === "OTHER" && (
                      <input
                        name="customCountryCode"
                        type="text"
                        value={customCode}
                        onChange={(e) => setCustomCode(e.target.value)}
                        placeholder="+ country code"
                        className="field-input mt-2"
                      />
                    )}
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label htmlFor="inquiryType" className="field-label">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      className="field-input"
                    >
                      <option value="">Select type (optional)</option>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Destination */}
                  <div>
                    <label htmlFor="destination" className="field-label">
                      Preferred Destination
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      className="field-input"
                    >
                      <option value="">Choose one (optional)</option>
                      <option>Ilocos Heritage Trail</option>
                      <option>Vis-Min Spice Route</option>
                      <option>Cordillera Highland Loop</option>
                      <option>Manila Old Town Immersion</option>
                      <option>Bespoke / Custom Itinerary</option>
                    </select>
                  </div>

                  {/* Travel Start Date */}
                  <div>
                    <label htmlFor="travelStart" className="field-label">
                      Travel Start Date
                    </label>
                    <input
                      id="travelStart"
                      name="travelStart"
                      type="date"
                      className="field-input"
                    />
                  </div>

                  {/* Travel End Date */}
                  <div>
                    <label htmlFor="travelEnd" className="field-label">
                      Travel End Date
                    </label>
                    <input
                      id="travelEnd"
                      name="travelEnd"
                      type="date"
                      className="field-input"
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="field-label">
                      Message{" "}
                      <span aria-hidden="true" className="text-gold-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="The journey you're imagining — region, pace, memories you'd like to carry home…"
                      className="field-input resize-none"
                      required
                    />
                  </div>

                </div>

                <div className="relative mt-6 flex flex-col gap-3 border-t border-cream-200 pt-5">
                  {submitError && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {submitError}
                    </p>
                  )}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-coffee-700/75">
                      Fields marked{" "}
                      <span className="text-gold-500">*</span> are required. We
                      typically reply within two business days.
                    </p>
                    <button
                      type="submit"
                      className="btn-primary shrink-0 disabled:opacity-60"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending Inquiry…" : "Send Inquiry"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>

        </div>

        {/* ── Quick Answers FAQ ─────────────────────────────────────────── */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block h-1 w-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee-700/80">
              Quick Answers
            </span>
          </div>
          <dl className="divide-y divide-cream-200 rounded-2xl border border-cream-200 bg-white/60">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={openFaq === i}
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-coffee-900 transition-colors hover:text-coffee-700"
                  >
                    {item.q}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-lg text-gold-500 transition-transform duration-200 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>
                {openFaq === i && (
                  <dd className="px-6 pb-5 text-sm leading-relaxed text-coffee-800/80">
                    {item.a}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>

      </div>
    </HeritageSection>
  );
}
