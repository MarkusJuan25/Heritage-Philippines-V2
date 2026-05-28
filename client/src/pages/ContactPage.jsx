export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* HERO */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src="/images/fundacion-pacita.jpg"
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
            A region, a season, a memory you want to chase — share it with
            us and our team will write back with a proposal.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-warm-cream py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage opacity-80"
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-white via-cream-50 to-cream-100 p-6 shadow-premium md:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-400/12 blur-3xl"
          />
          <div className="relative mb-8 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coffee-700/85">
              Inquiry · It takes a minute
            </span>
          </div>

          <div className="relative grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="field-label">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Maria Clara"
                className="field-input"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="field-input"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="field-label">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+63"
                className="field-input"
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="pax" className="field-label">
                Group Size
              </label>
              <input
                id="pax"
                name="pax"
                type="number"
                min="1"
                placeholder="2"
                className="field-input"
              />
            </div>
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
            <div className="md:col-span-2">
              <label htmlFor="interest" className="field-label">
                Interested Journey
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
            <div className="md:col-span-2">
              <label htmlFor="message" className="field-label">
                Tell us about your trip
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="The journey you're imagining…"
                className="field-input"
              />
            </div>
          </div>
          <div className="relative mt-8 flex flex-col gap-3 border-t border-cream-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-coffee-700/75">
              We typically reply within two business days.
            </p>
            <button type="submit" className="btn-primary">
              Send Inquiry
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="card-warm">
            <span
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-400/12 blur-2xl"
            />
            <span className="eyebrow relative">Studio</span>
            <h3 className="relative mt-3 font-serif text-xl text-coffee-900">
              Heritage Philippines
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-coffee-800/85">
              By appointment only — our team is most often on the road with
              guests across the archipelago.
            </p>
          </div>
          <div className="card-warm">
            <span className="eyebrow">Reach us</span>
            <ul className="mt-3 space-y-3 text-sm text-coffee-800/90">
              <li>
                <span className="block text-xs uppercase tracking-widest text-coffee-700/70">
                  Email
                </span>
                hello@heritage.ph
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest text-coffee-700/70">
                  Phone
                </span>
                +63 (0) 000 000 0000
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest text-coffee-700/70">
                  Hours
                </span>
                Mon – Fri · 9:00 – 18:00 PHT
              </li>
            </ul>
          </div>
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
                  className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/20 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-400/40"
                >
                  ✓
                </span>
                Designed by the same team who guides on the road.
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/20 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-400/40"
                >
                  ✓
                </span>
                A direct line to your trip lead — no agency layer.
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/20 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-400/40"
                >
                  ✓
                </span>
                Flexible re-planning if your dates or plans shift.
              </li>
            </ul>
          </div>
        </aside>
        </div>
      </section>
    </>
  );
}
