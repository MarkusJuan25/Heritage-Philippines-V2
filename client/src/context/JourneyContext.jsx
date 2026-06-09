import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const JourneyContext = createContext(null);

export function JourneyProvider({ children }) {
  const [programs, setPrograms] = useState([]);
  const [modal, setModal] = useState({ open: false, data: null });

  const addProgram = useCallback((program) => {
    setPrograms((prev) =>
      prev.some((p) => p.id === program.id) ? prev : [...prev, program]
    );
  }, []);

  const removeProgram = useCallback((id) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isProgramSelected = useCallback(
    (id) => programs.some((p) => p.id === id),
    [programs]
  );

  const openQuoteModal = useCallback(
    (data) => setModal({ open: true, data }),
    []
  );
  const closeQuoteModal = useCallback(
    () => setModal({ open: false, data: null }),
    []
  );

  return (
    <JourneyContext.Provider
      value={{
        programs,
        addProgram,
        removeProgram,
        isProgramSelected,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
      <MyJourneyWidget
        programs={programs}
        onOpenQuoteModal={() =>
          openQuoteModal({ programs, fromWidget: true })
        }
      />
      {modal.open && <QuoteModal data={modal.data} onClose={closeQuoteModal} />}
    </JourneyContext.Provider>
  );
}

// ─── My Journey floating dock ────────────────────────────────────────────────

const DOCK_BTN = 52;        // button diameter px (3.25rem @ 16px)
const EDGE_PAD = 24;        // snap edge gap px
const COLLAPSE_MS = 5000;   // drawer auto-close after inactivity
const FOCUS_RETRY_MS = 2000;
const DRAG_MIN_PX = 768;
const PEEK_MIN_MS = 2800;   // min idle time before dock auto-hides to edge
const PEEK_MAX_MS = 3500;

function MyJourneyWidget({ programs, onOpenQuoteModal }) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState("right");
  const [topPx, setTopPx] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isAutoHidden, setIsAutoHidden] = useState(false); // peek/slide-off-edge mode

  const dockRef = useRef(null);
  const openRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDragged = useRef(false);
  const liveDrag = useRef({ x: 0, y: 0 });
  const collapseTimer = useRef(null); // drawer close timer
  const peekTimerRef = useRef(null);  // auto-hide peek timer
  const prevProgCountRef = useRef(programs.length);

  const { pathname } = useLocation();

  // Sync refs
  useEffect(() => { openRef.current = open; }, [open]);
  useEffect(() => { isDraggingRef.current = isDragging; }, [isDragging]);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on scroll while open
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [open]);

  // Escape key closes drawer
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // ── Drawer close timer ──────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearTimeout(collapseTimer.current);
    function tryCollapse() {
      if (dockRef.current && dockRef.current.contains(document.activeElement)) {
        collapseTimer.current = setTimeout(tryCollapse, FOCUS_RETRY_MS);
        return;
      }
      setOpen(false);
    }
    collapseTimer.current = setTimeout(tryCollapse, COLLAPSE_MS);
  }, []);

  const resetTimer = useCallback(() => {
    if (!openRef.current) return;
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (open) startTimer();
    else clearTimeout(collapseTimer.current);
    return () => clearTimeout(collapseTimer.current);
  }, [open, startTimer]);

  // ── Auto-hide / peek timer ──────────────────────────────────────────────────
  // Schedules the dock to peek off the edge; skips if drawer is open or dragging.
  const startPeekTimer = useCallback(() => {
    clearTimeout(peekTimerRef.current);
    if (openRef.current || isDraggingRef.current) return;
    const delay = PEEK_MIN_MS + Math.floor(Math.random() * (PEEK_MAX_MS - PEEK_MIN_MS));
    peekTimerRef.current = setTimeout(() => setIsAutoHidden(true), delay);
  }, []); // uses only refs — fully stable

  // Start initial peek timer on mount
  useEffect(() => {
    startPeekTimer();
    return () => clearTimeout(peekTimerRef.current);
  }, [startPeekTimer]);

  // Drawer open → reveal dock, cancel peek; drawer close → restart peek
  useEffect(() => {
    if (open) {
      setIsAutoHidden(false);
      clearTimeout(peekTimerRef.current);
    } else {
      startPeekTimer();
    }
  }, [open, startPeekTimer]);

  // Programs count change → briefly reveal dock so user sees the count update
  useEffect(() => {
    if (programs.length !== prevProgCountRef.current) {
      prevProgCountRef.current = programs.length;
      setIsAutoHidden(false);
      startPeekTimer();
    }
  }, [programs, startPeekTimer]);

  // ── XY drag ─────────────────────────────────────────────────────────────────
  const handlePointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (window.innerWidth < DRAG_MIN_PX) return;

    // Reveal dock for drag session
    setIsAutoHidden(false);
    clearTimeout(peekTimerRef.current);
    isDraggingRef.current = true;

    const rect = dockRef.current.getBoundingClientRect();
    const startPtrX = e.clientX;
    const startPtrY = e.clientY;
    const startDocX = rect.left;
    const startDocY = rect.top;

    hasDragged.current = false;
    liveDrag.current = { x: startDocX, y: startDocY };
    setDragPos({ x: startDocX, y: startDocY });
    setIsDragging(true);

    function onMove(me) {
      const dx = me.clientX - startPtrX;
      const dy = me.clientY - startPtrY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged.current = true;
      const newX = Math.max(0, Math.min(window.innerWidth - DOCK_BTN, startDocX + dx));
      const newY = Math.max(60, Math.min(window.innerHeight - DOCK_BTN - 8, startDocY + dy));
      liveDrag.current = { x: newX, y: newY };
      setDragPos({ x: newX, y: newY });
    }

    function onUp() {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      isDraggingRef.current = false;
      setIsDragging(false);

      if (hasDragged.current) {
        const { x: fx, y: fy } = liveDrag.current;
        const newSide = (fx + DOCK_BTN / 2) < window.innerWidth / 2 ? "left" : "right";
        const clampedTop = Math.max(60, Math.min(window.innerHeight - DOCK_BTN - 8, fy));
        setSide(newSide);
        setTopPx(clampedTop);
      }

      // Restart both timers after drag ends
      startPeekTimer();
      if (openRef.current) startTimer();
    }

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, [startPeekTimer, startTimer]);

  // If dock is peeking, first interaction reveals it (no drawer toggle yet)
  const handleClick = () => {
    if (hasDragged.current) return;
    if (isAutoHidden) {
      setIsAutoHidden(false);
      startPeekTimer();
      return;
    }
    setOpen((o) => !o);
  };

  // Position styles — mobile overrides via @media (max-width: 767px) CSS
  let posStyle;
  if (isDragging) {
    posStyle = { left: dragPos.x, top: dragPos.y, right: "auto", bottom: "auto" };
  } else if (topPx !== null) {
    posStyle = side === "left"
      ? { left: EDGE_PAD, top: topPx, right: "auto", bottom: "auto" }
      : { right: EDGE_PAD, top: topPx, left: "auto", bottom: "auto" };
  } else {
    posStyle = side === "left" ? { left: EDGE_PAD, right: "auto" } : {};
  }

  const dockClass = [
    "my-journey-floating-dock",
    side === "left" ? "my-journey-floating-dock--left" : "",
    isDragging ? "is-dragging" : "",
    isAutoHidden ? "is-auto-hidden" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={dockRef}
      className={dockClass}
      style={posStyle}
      aria-live="polite"
      onPointerEnter={() => { setIsAutoHidden(false); clearTimeout(peekTimerRef.current); }}
      onPointerLeave={startPeekTimer}
      onFocus={() => { setIsAutoHidden(false); clearTimeout(peekTimerRef.current); }}
    >
      {open && (
        <>
          {/* Full-screen backdrop catches outside clicks */}
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer — all inactivity-reset events live here */}
          <div
            className="my-journey-drawer"
            role="dialog"
            aria-label="My Journey"
            onPointerEnter={resetTimer}
            onPointerMove={resetTimer}
            onClick={resetTimer}
            onFocus={resetTimer}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow">My Journey</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-coffee-800/50 transition hover:bg-cream-100 hover:text-coffee-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
                aria-label="Close journey panel"
              >
                ✕
              </button>
            </div>
            {programs.length === 0 ? (
              <p className="text-sm italic text-coffee-800/60">
                Add programs from the Packages page to build your journey.
              </p>
            ) : (
              <ul className="space-y-2">
                {programs.map((p) => (
                  <li key={p.id} className="flex items-start gap-2 text-sm text-coffee-900">
                    <span className="mt-0.5 shrink-0 text-gold-500" aria-hidden="true">✓</span>
                    <span className="flex-1">{p.title}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex flex-col gap-2 border-t border-cream-200 pt-4">
              <button
                type="button"
                onClick={() => { setOpen(false); onOpenQuoteModal(); }}
                className="btn-primary text-sm"
              >
                Review Quote
              </button>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-semibold text-coffee-800/70 transition hover:text-coffee-900"
              >
                Plan with Us →
              </Link>
            </div>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        className="my-journey-floating-dock__button"
        aria-label={`Open My Journey${
          programs.length > 0
            ? ` — ${programs.length} item${programs.length === 1 ? "" : "s"} selected`
            : ""
        }`}
        aria-expanded={open}
        style={{ cursor: isDragging ? "grabbing" : undefined }}
      >
        <svg
          width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        {programs.length > 0 && (
          <span className="my-journey-floating-dock__count" aria-hidden="true">
            {programs.length}
          </span>
        )}
        <span className="my-journey-floating-dock__label" aria-hidden="true">
          My Journey
        </span>
      </button>
    </div>
  );
}

// ─── Quote / Group Booking Enquiry Modal ──────────────────────────────────────

function fmtDate(dateStr) {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function QuoteModal({ data, onClose }) {
  const [form, setForm] = useState({
    groupName: "",
    primaryContact: "",
    email: "",
    country: "",
    numberOfPeople: "",
    isTravelAgent: null,
    sharedBathrooms: null,
    roomsFor4Plus: null,
    childrenUnder12: null,
    pricePerPerson: "",
    otherRequirements: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const upd = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const dest =
    data.isCustomDest || !data.province
      ? data.destinationArea || "—"
      : `${data.province}, ${data.destinationArea}`;

  if (submitted) {
    return (
      <ModalShell onClose={onClose}>
        <div className="flex flex-col items-center py-10 text-center">
          <span className="mb-4 text-5xl text-gold-500" aria-hidden="true">
            ✓
          </span>
          <span className="eyebrow">Enquiry Prepared</span>
          <h2 className="mt-2 font-serif text-2xl text-coffee-900">
            Your journey is noted.
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-coffee-800/70">
            Our team will review your selections and reach out to shape the
            final route, pricing, and support around your dates.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <Link
              to="/contact"
              onClick={onClose}
              className="btn-primary text-center text-sm"
            >
              Continue to Contact →
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-coffee-800/60 transition hover:text-coffee-900"
            >
              Close
            </button>
          </div>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose}>
      <span className="eyebrow">Group Booking Enquiry</span>
      <h2 className="mt-2 font-serif text-2xl text-coffee-900">
        Tell us about your journey
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-coffee-800/70">
        Share the basics — our team shapes the route, pricing, and support
        around your group and dates.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="mt-6 space-y-5"
        noValidate
      >
        {/* ── Section 1: About Your Group ── */}
        <EnquirySection title="About Your Group">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <EnquiryField label="Group / Trip Name" htmlFor="enq-group-name">
              <input
                id="enq-group-name"
                type="text"
                value={form.groupName}
                onChange={(e) => upd("groupName", e.target.value)}
                placeholder="e.g. Santos Family Homecoming"
                className="field-input"
              />
            </EnquiryField>
            <EnquiryField
              label="Primary Contact Name"
              htmlFor="enq-contact"
            >
              <input
                id="enq-contact"
                type="text"
                value={form.primaryContact}
                onChange={(e) => upd("primaryContact", e.target.value)}
                placeholder="Your full name"
                className="field-input"
              />
            </EnquiryField>
            <EnquiryField label="Email Address" htmlFor="enq-email">
              <input
                id="enq-email"
                type="email"
                value={form.email}
                onChange={(e) => upd("email", e.target.value)}
                placeholder="you@email.com"
                className="field-input"
              />
            </EnquiryField>
            <EnquiryField label="Country / Base" htmlFor="enq-country">
              <input
                id="enq-country"
                type="text"
                value={form.country}
                onChange={(e) => upd("country", e.target.value)}
                placeholder="e.g. United States, Australia"
                className="field-input"
              />
            </EnquiryField>
            <EnquiryField
              label="Number of People"
              htmlFor="enq-num-people"
              wide
            >
              <select
                id="enq-num-people"
                value={form.numberOfPeople}
                onChange={(e) => upd("numberOfPeople", e.target.value)}
                className="field-input"
              >
                <option value="">Select…</option>
                <option value="1">1 — Solo</option>
                <option value="2">2 — Couple</option>
                <option value="3">3 people</option>
                <option value="4-6">4–6 people</option>
                <option value="7-10">7–10 people</option>
                <option value="11-20">11–20 people</option>
                <option value="20+">20+ people</option>
              </select>
            </EnquiryField>
          </div>
        </EnquirySection>

        {/* ── Section 2: Trip Preferences ── */}
        <EnquirySection title="Trip Preferences">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <YesNoField
              label="Booking as a travel agent?"
              value={form.isTravelAgent}
              onChange={(v) => upd("isTravelAgent", v)}
            />
            <YesNoField
              label="Comfortable with shared bathrooms?"
              value={form.sharedBathrooms}
              onChange={(v) => upd("sharedBathrooms", v)}
            />
            <YesNoField
              label="Need rooms that sleep 4 or more?"
              value={form.roomsFor4Plus}
              onChange={(v) => upd("roomsFor4Plus", v)}
            />
            <YesNoField
              label="Traveling with children 12 & under?"
              value={form.childrenUnder12}
              onChange={(v) => upd("childrenUnder12", v)}
            />
          </div>
        </EnquirySection>

        {/* ── Section 3: Journey Selections (read-only) ── */}
        <EnquirySection title="Your Journey Selections" muted>
          <dl className="space-y-2.5">
            <QuoteRow label="Package Style" value={data.packageType || "—"} />
            <QuoteRow label="Destination" value={dest} />
            {data.startDate && (
              <QuoteRow
                label="Travel Dates"
                value={`${fmtDate(data.startDate)} – ${fmtDate(
                  data.endDate
                )}`}
              />
            )}
            {data.source && (
              <QuoteRow label="Package" value={data.source} />
            )}
          </dl>
          {data.programs?.length > 0 && (
            <div className="mt-3 border-t border-cream-200 pt-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-coffee-800/50">
                Added Programs
              </p>
              <ul className="space-y-1">
                {data.programs.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-start gap-1.5 text-sm text-coffee-900"
                  >
                    <span className="text-gold-500" aria-hidden="true">
                      ✓
                    </span>
                    {p.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </EnquirySection>

        {/* ── Section 4: Additional Details ── */}
        <EnquirySection title="Additional Details">
          <div className="space-y-4">
            <EnquiryField
              label="Estimated Price per Person (optional)"
              htmlFor="enq-price"
            >
              <input
                id="enq-price"
                type="text"
                value={form.pricePerPerson}
                onChange={(e) => upd("pricePerPerson", e.target.value)}
                placeholder="e.g. PHP 15,000 / USD 300"
                className="field-input"
              />
            </EnquiryField>
            <EnquiryField
              label="Special Requirements or Notes"
              htmlFor="enq-requirements"
            >
              <textarea
                id="enq-requirements"
                rows={3}
                value={form.otherRequirements}
                onChange={(e) => upd("otherRequirements", e.target.value)}
                placeholder="Dietary needs, accessibility, cultural interests, anniversary, or family-specific notes…"
                className="field-input resize-none"
              />
            </EnquiryField>
          </div>
        </EnquirySection>

        {/* ── CTA ── */}
        <div className="flex flex-col gap-3 border-t border-cream-200 pt-5 sm:flex-row">
          <button type="submit" className="btn-primary flex-1 text-sm">
            Prepare Enquiry →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-coffee-900/20 px-6 py-3 text-sm font-semibold text-coffee-900 transition hover:bg-cream-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

// ─── Shared modal shell ───────────────────────────────────────────────────────

function ModalShell({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9000] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-coffee-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 my-4 w-full max-w-2xl rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-premium sm:my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-coffee-800/60 transition hover:bg-cream-100 hover:text-coffee-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

// ─── Enquiry section wrapper ──────────────────────────────────────────────────

function EnquirySection({ title, children, muted }) {
  return (
    <div>
      <h3
        className={`mb-2.5 text-xs font-bold uppercase tracking-widest ${
          muted ? "text-coffee-800/50" : "text-coffee-900"
        }`}
      >
        {title}
      </h3>
      <div
        className={`rounded-xl border p-4 ${
          muted
            ? "border-cream-200 bg-cream-50/60"
            : "border-cream-200/80 bg-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Enquiry field wrapper ────────────────────────────────────────────────────

function EnquiryField({ label, htmlFor, children, wide }) {
  return (
    <label
      className={`block${wide ? " sm:col-span-2" : ""}`}
      htmlFor={htmlFor}
    >
      <span className="field-label">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

// ─── Yes/No toggle pair ───────────────────────────────────────────────────────

function YesNoField({ label, value, onChange }) {
  return (
    <div>
      <span className="field-label block">{label}</span>
      <div className="mt-1.5 flex gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 ${
            value === true
              ? "border-gold-400 bg-gold-50 text-gold-700"
              : "border-cream-200 text-coffee-800/60 hover:border-gold-300"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 ${
            value === false
              ? "border-coffee-800/50 bg-coffee-50 text-coffee-900"
              : "border-cream-200 text-coffee-800/60 hover:border-coffee-300"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}

// ─── Quote summary row ────────────────────────────────────────────────────────

function QuoteRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <dt className="shrink-0 font-semibold text-coffee-900">{label}</dt>
      <dd className="text-right text-coffee-800/80">{value}</dd>
    </div>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within JourneyProvider");
  return ctx;
}
