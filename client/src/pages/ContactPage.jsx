import HeritageSection from "../components/HeritageSection";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Wire to backend API when ready.
    // POST /api/contact with the serialized FormData.
    // On success → show a confirmation message to the user.
    // On error   → surface a friendly inline error state.
  };

  return (
    <>
      {/* HERO */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src="/images/heritage-home.jpg"
            alt=""
            className="page-header__image"
            loading="eager"
          />
          <div className="page-header__shade" />
        </div>
        <div className="container-page relative pb-16 pt-36 sm:pt-40 md:pb-20 md:pt-44">
          <p className="eyebrow-light">Start the conversation</p>
          <h1 className="mt-4 font-serif text-4xl text-balance text-cream-50 sm:text-5xl lg:text-6xl">
            Tell us about the trip{" "}
            <span className="italic text-accent-gold">
              you&apos;re imagining.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/85">
            A region, a season, a memory you want to chase — share it with us
            and our team will write back with a tailored proposal.
          </p>
        </div>
      </section>

      <HeritageSection variant="primary" grow className="py-16">
        <div className="container-page relative grid gap-10 lg:grid-cols-[1.5fr_1fr]">

          {/* ── Inquiry form ────────────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-white via-cream-50 to-cream-100 p-6 shadow-premium md:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-400/[0.12] blur-3xl"
            />

            <div className="relative mb-8 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coffee-700/85">
                Inquiry · takes about a minute
              </span>
            </div>

            <div className="relative grid gap-5 md:grid-cols-2">
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
                  placeholder="Maria Clara"
                  className="field-input"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="field-label">
                  Email{" "}
                  <span aria-hidden="true" className="text-gold-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="field-input"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="phone" className="field-label">
                  Contact Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+63 9XX XXX XXXX"
                  className="field-input"
                  autoComplete="tel"
                />
              </div>

              {/* Number of Travelers */}
              <div>
                <label htmlFor="pax" className="field-label">
                  Number of Travelers
                </label>
                <input
                  id="pax"
                  name="pax"
                  type="number"
                  min="1"
                  max="99"
                  placeholder="2"
                  className="field-input"
                />
              </div>

              {/* Travel Start */}
              <div>
                <label htmlFor="travelStart" className="field-label">
                  Travel Window — Start
                </label>
                <input
                  id="travelStart"
                  name="travelStart"
                  type="date"
                  className="field-input"
                />
              </div>

              {/* Travel End */}
              <div>
                <label htmlFor="travelEnd" className="field-label">
                  Travel Window — End
                </label>
                <input
                  id="travelEnd"
                  name="travelEnd"
                  type="date"
                  className="field-input"
                />
              </div>

              {/* Destination or Interest */}
              <div className="md:col-span-2">
                <label htmlFor="interest" className="field-label">
                  Destination or Interest
                </label>
                <select id="interest" name="interest" className="field-input">
                  <option value="">Choose one (optional)</option>
                  <option>Ilocos Heritage Trail</option>
                  <option>Vis-Min Spice Route</option>
                  <option>Cordillera Highland Loop</option>
                  <option>Manila Old Town Immersion</option>
                  <option>Bespoke / Custom Itinerary</option>
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="field-label">
                  Tell us about your trip{" "}
                  <span aria-hidden="true" className="text-gold-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="The journey you're imagining — region, pace, memories you'd like to carry home…"
                  className="field-input resize-none"
                  required
                />
              </div>
            </div>

            <div className="relative mt-8 flex flex-col gap-3 border-t border-cream-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-coffee-700/75">
                Fields marked{" "}
                <span className="text-gold-500">*</span> are required. We
                typically reply within two business days.
              </p>
              <button type="submit" className="btn-primary shrink-0">
                Send Inquiry
              </button>
            </div>
          </form>

          {/* ── Contact details sidebar ──────────────────────────────────── */}
          <aside className="space-y-6">

            {/* Office Address */}
            <div className="card-warm p-6">
              <span
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-400/[0.12] blur-2xl"
              />
              <span className="eyebrow relative">Office Address</span>
              <h3 className="relative mt-2 font-serif text-xl text-coffee-900">
                Heritage Philippines
              </h3>
              <address className="relative mt-3 not-italic text-sm leading-relaxed text-coffee-800/85">
                Unit 603, 6th Floor
                <br />
                West Insula Condominium
                <br />
                135 West Avenue, Quezon City 1105
                <br />
                Metro Manila, Philippines
              </address>
              <p className="relative mt-3 text-xs text-coffee-700/65">
                By appointment — our team is often on the road with guests
                across the archipelago.
              </p>
            </div>

            {/* Contact details */}
            <div className="card-warm p-6">
              <span className="eyebrow">Get in Touch</span>
              <ul className="mt-3 space-y-3.5 text-sm text-coffee-800/90">
                <li>
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-widest text-coffee-700/60">
                    Email
                  </span>
                  <a
                    href="mailto:info@heritagephilippines.com"
                    className="transition-colors hover:text-forest-700"
                  >
                    info@heritagephilippines.com
                  </a>
                </li>
                <li>
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-widest text-coffee-700/60">
                    Phone
                  </span>
                  +63 (0) 917 XXX XXXX
                </li>
                <li>
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-widest text-coffee-700/60">
                    Office Hours
                  </span>
                  Monday – Friday · 9:00 AM – 6:00 PM PHT
                </li>
              </ul>
            </div>

            {/* Why book direct */}
            <div className="relative overflow-hidden rounded-2xl border border-cream-50/10 bg-gradient-to-br from-forest-800 via-forest-900 to-coffee-950 p-6 text-cream-50 shadow-soft">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-400/20 blur-2xl"
              />
              <span className="eyebrow-light">Why book direct</span>
              <ul className="relative mt-4 space-y-3 text-sm text-cream-100/85">
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/20 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-400/40"
                  >
                    ✓
                  </span>
                  Designed by the same team who guides on the road.
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/20 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-400/40"
                  >
                    ✓
                  </span>
                  A direct line to your trip lead — no agency layer.
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/20 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-400/40"
                  >
                    ✓
                  </span>
                  Flexible re-planning if your dates or plans shift.
                </li>
              </ul>
            </div>

          </aside>
        </div>
      </HeritageSection>
    </>
  );
}
