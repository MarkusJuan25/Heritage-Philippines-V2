export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-100">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">Start the conversation</span>
          <h1 className="section-heading mt-3">Contact Us</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-coffee-800/90">
            Tell us a little about the journey you have in mind — a region, a
            season, a memory you want to chase — and our team will write back
            with a proposal.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-cream-200 bg-white p-6 shadow-soft md:p-10"
        >
          <div className="mb-8 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block h-1 w-10 rounded-full bg-gold-500"
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-coffee-700/80">
              Inquiry · It takes a minute
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-coffee-700/70">
              We typically reply within two business days.
            </p>
            <button type="submit" className="btn-primary">
              Send Inquiry
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="card">
            <span className="eyebrow">Studio</span>
            <h3 className="mt-3 font-serif text-xl text-coffee-900">
              Heritage Philippines
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-coffee-800/80">
              By appointment only — our team is most often on the road with
              guests across the archipelago.
            </p>
          </div>
          <div className="card">
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
          <div className="rounded-2xl border border-forest-700/20 bg-forest-900 p-6 text-cream-50 shadow-soft">
            <span className="eyebrow text-gold-300">Why book direct</span>
            <ul className="mt-4 space-y-3 text-sm text-cream-100/85">
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                />
                Designed by the same team who guides on the road.
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                />
                A direct line to your trip lead — no agency layer.
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                />
                Flexible re-planning if your dates or plans shift.
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
