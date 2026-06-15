import { createQuoteRequest } from "../services/quotesService";
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";

const JourneyContext = createContext(null);

export function JourneyProvider({ children }) {
  const location = useLocation();

  const [programs, setPrograms] = useState([]);
  const [modal, setModal] = useState({ open: false, data: null });
  const [personalDraft, setPersonalDraft] = useState({
    clientName: "",
    email: "",
    phone: "",
    groupType: "",
    numberOfTravelers: "",
    message: "",
    consent: false,
  });

  const showJourneyDock =
    location.pathname.startsWith("/packages") ||
    location.pathname.startsWith("/tour");

  const addProgram = useCallback((program) => {
    setPrograms((prev) =>
      prev.some((p) => p.id === program.id) ? prev : [...prev, program]
    );
  }, []);

  const removeProgram = useCallback((id) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearPrograms = useCallback(() => setPrograms([]), []);

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

  const savePersonalDraft = useCallback(
    (fields) => setPersonalDraft((prev) => ({ ...prev, ...fields })),
    []
  );

  const clearPersonalDraft = useCallback(
    () =>
      setPersonalDraft({
        clientName: "",
        email: "",
        phone: "",
        groupType: "",
        numberOfTravelers: "",
        message: "",
        consent: false,
      }),
    []
  );

  return (
    <JourneyContext.Provider
      value={{
        programs,
        addProgram,
        removeProgram,
        clearPrograms,
        isProgramSelected,
        openQuoteModal,
        closeQuoteModal,
        personalDraft,
        savePersonalDraft,
        clearPersonalDraft,
      }}
    >
      {children}
      {showJourneyDock && (
        <MyJourneyWidget programs={programs} onOpenQuoteModal={() => openQuoteModal({ programs, fromWidget: true })}
        />
      )}

      {modal.open && (
        <QuoteModal
          data={modal.data}
          programs={programs}
          onClose={closeQuoteModal}
          personalDraft={personalDraft}
          onSaveDraft={savePersonalDraft}
          onClearDraft={clearPersonalDraft}
          onClearPrograms={clearPrograms}
        />
      )}
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

// ─── Request Quote / Group Booking Modal ─────────────────────────────────────

function fmtDate(dateStr) {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

// ─── DateField: dd/mm/yyyy text input + smart calendar popover ───────────────

const DF_CAL_W = 284;
const DF_CAL_H = 300;

function DateField({ id, value, onChange, min, label }) {
  const toDisplay = (iso) => {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const [displayVal, setDisplayVal] = useState(() => toDisplay(value));
  const [inputErr, setInputErr] = useState("");
  const [calOpen, setCalOpen] = useState(false);
  const [calStyle, setCalStyle] = useState({});
  const [isSheet, setIsSheet] = useState(false);
  const [viewYear, setViewYear] = useState(() =>
    value ? parseInt(value.split("-")[0], 10) : new Date().getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(() =>
    value ? parseInt(value.split("-")[1], 10) - 1 : new Date().getMonth()
  );
  const containerRef = useRef(null);

  useEffect(() => {
    setDisplayVal(toDisplay(value));
    setInputErr("");
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setViewYear(parseInt(value.split("-")[0], 10));
      setViewMonth(parseInt(value.split("-")[1], 10) - 1);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!calOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setCalOpen(false); };
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setCalOpen(false);
    };
    const onScroll = () => setCalOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [calOpen]);

  const isValidISO = (iso) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
  };

  const handleTextChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let fmt = digits;
    if (digits.length > 2) fmt = digits.slice(0, 2) + "/" + digits.slice(2);
    if (digits.length > 4)
      fmt = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
    setDisplayVal(fmt);
    if (digits.length === 0) { setInputErr(""); onChange(""); return; }
    if (digits.length === 8) {
      const iso = `${digits.slice(4)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
      if (!isValidISO(iso)) { setInputErr("Invalid date."); return; }
      if (min && iso < min) { setInputErr("Date is before the minimum."); return; }
      setInputErr("");
      onChange(iso);
      setViewYear(parseInt(iso.split("-")[0], 10));
      setViewMonth(parseInt(iso.split("-")[1], 10) - 1);
    }
  };

  const openCal = () => {
    if (!containerRef.current) return;
    const mobile = window.innerWidth < 640;
    setIsSheet(mobile);
    if (!mobile) {
      const r = containerRef.current.getBoundingClientRect();
      const below = window.innerHeight - r.bottom - 8;
      const above = r.top - 8;
      const alignRight = r.left + DF_CAL_W > window.innerWidth;
      setCalStyle({
        position: "fixed",
        zIndex: 9980,
        width: DF_CAL_W,
        top: below >= DF_CAL_H ? r.bottom + 8 : above >= DF_CAL_H ? "auto" : r.bottom + 8,
        bottom:
          below < DF_CAL_H && above >= DF_CAL_H
            ? window.innerHeight - r.top + 8
            : "auto",
        left: alignRight ? "auto" : r.left,
        right: alignRight ? window.innerWidth - r.right : "auto",
      });
    }
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setViewYear(parseInt(value.split("-")[0], 10));
      setViewMonth(parseInt(value.split("-")[1], 10) - 1);
    } else {
      const now = new Date();
      setViewYear(now.getFullYear());
      setViewMonth(now.getMonth());
    }
    setCalOpen(true);
  };

  const selectDay = (iso) => { onChange(iso); setCalOpen(false); };

  const prevMonth = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };
  const nextMonth = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const todayISO = new Date().toISOString().split("T")[0];
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calPanel = (
    <div className="w-[284px] select-none rounded-xl border border-cream-200 bg-white p-3 shadow-premium">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          className="flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-coffee-700 hover:bg-cream-100 focus:outline-none"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-coffee-900">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-coffee-700 hover:bg-cream-100 focus:outline-none"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div className="mb-1 grid grid-cols-7 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="text-[10px] font-semibold text-coffee-700/50">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: firstDow }, (_, i) => <span key={`g${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;
          const sel = iso === value;
          const isToday = iso === todayISO;
          const disabled = Boolean(min && iso < min);
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && selectDay(iso)}
              aria-label={iso}
              aria-pressed={sel}
              className={[
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs transition",
                sel
                  ? "bg-gold-500 font-bold text-coffee-950"
                  : isToday
                  ? "font-bold text-gold-600 ring-1 ring-gold-400/70"
                  : "text-coffee-800 hover:bg-cream-100",
                disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer",
              ].join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={displayVal}
          onChange={handleTextChange}
          onClick={openCal}
          onFocus={openCal}
          placeholder="dd/mm/yyyy"
          autoComplete="off"
          aria-label={label}
          aria-describedby={inputErr ? `${id}-df-err` : undefined}
          aria-invalid={inputErr ? "true" : undefined}
          className={`field-input pr-10${
            inputErr ? " border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""
          }`}
        />
        <button
          type="button"
          onClick={openCal}
          tabIndex={-1}
          aria-label={`Open calendar for ${label}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee-700/50 transition hover:text-coffee-900 focus:outline-none"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>
      {inputErr && (
        <p id={`${id}-df-err`} className="mt-1 text-xs text-red-500" role="alert">
          {inputErr}
        </p>
      )}
      {/* Portaled to body so modal overflow/stacking-context never clips the picker */}
      {calOpen &&
        !isSheet &&
        createPortal(<div style={calStyle}>{calPanel}</div>, document.body)}
      {calOpen &&
        isSheet &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9975] bg-coffee-950/50"
              onClick={() => setCalOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-x-0 bottom-0 z-[9976] rounded-t-2xl bg-white px-4 pb-8 pt-4 shadow-premium">
              <div className="mb-3 flex items-center justify-between">
                <span className="field-label">{label}</span>
                <button
                  type="button"
                  onClick={() => setCalOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-coffee-800/50 hover:bg-cream-100 focus:outline-none"
                  aria-label="Close calendar"
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-center">{calPanel}</div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const GROUP_TYPES = [
  "Premium",
  "Honeymoon / Couple",
  "Family",
  "Group",
  "Solo",
  "Budget",
  "Custom",
];

// Personal fields that persist across open/close cycles via personalDraft
const PERSONAL_FIELDS = [
  "clientName", "email", "phone", "groupType",
  "numberOfTravelers", "message", "consent", "preferredDestination",
  "startDate", "endDate",
];

function QuoteModal({ data, programs, onClose, personalDraft, onSaveDraft, onClearDraft, onClearPrograms }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // Context fields re-initialize fresh from data on each open;
  // personal fields (including preferredDestination) are restored from session draft.
  const computedDestPrefill = (() => {
    if (data.source) return data.source;
    if (programs.length > 1) return programs.map((p) => p.title).join(", ");
    if (programs.length === 1) return programs[0].title;
    if (data.province && !data.isCustomDest)
      return `${data.province}, ${data.destinationArea}`;
    return data.destinationArea || "";
  })();

  const [form, setForm] = useState({
    // Personal — restored from draft; groupType falls back to planner packageType if draft is empty
    clientName: personalDraft.clientName,
    email: personalDraft.email,
    phone: personalDraft.phone,
    groupType: personalDraft.groupType || data.packageType || "",
    numberOfTravelers: personalDraft.numberOfTravelers,
    message: personalDraft.message,
    consent: personalDraft.consent,
    // preferredDestination: prefer user's prior manual input, otherwise derive from context
    preferredDestination: personalDraft.preferredDestination || computedDestPrefill,
    // Planner dates — prefer draft (user's prior input); fall back to card data
    startDate: personalDraft.startDate || data.startDate || "",
    endDate: personalDraft.endDate || data.endDate || "",
  });
  const [errors, setErrors ] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // upd saves personal fields to the session draft automatically
  const upd = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (PERSONAL_FIELDS.includes(field)) {
      onSaveDraft({ [field]: value });
    }
  };
  const clearErr = (field) => setErrors((e) => ({ ...e, [field]: "" }));

  // ESC close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    if (!form.clientName.trim()) {
      errs.clientName = "Name is required.";
    }
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (form.groupType !== "Solo" && !form.numberOfTravelers) {
      errs.numberOfTravelers = "Number of travelers is required.";
    }
    if (!form.consent) {
      errs.consent = "Please confirm you agree to be contacted.";
    }
    return errs;
  };

  const getGroupSizeNumber = (value) => {
    const match = String(value || "").match(/\d+/);
    return match ? Number(match[0]) : undefined;
  };

  const buildQuotePayload = () => ({
    name: form.clientName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    destination:
      form.preferredDestination.trim() ||
      computedDestPrefill ||
      data.source ||
      data.province ||
      data.destinationArea ||
      "Custom Heritage Philippines journey",
    groupSize:
      form.groupType === "Solo"
        ? 1
        : getGroupSizeNumber(form.numberOfTravelers),
    startDate: form.startDate || "",
    endDate: form.endDate || "",
    message: form.message.trim(),
    packageStyle: form.groupType || data.packageType || "",
    province: data.province || "",
    source: data.source || "",
    destinationArea: data.destinationArea || "",
    selectedPrograms: programs.map((program) => ({
      id: program.id,
      title: program.title,
      location: program.location,
      duration: program.duration,
    })),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    try {
      await createQuoteRequest(buildQuotePayload());
      onClearDraft();
      onClearPrograms();
      setSubmitted(true);
    } catch (error) {
      const details = error.response?.data?.details;
      const apiMessage = error.response?.data?.message;

      if (Array.isArray(details) && details.length > 0) {
        const fieldMap = {
          name: "clientName",
          destination: "preferredDestination",
          groupSize: "numberOfTravelers",
        };

        const apiErrors = details.reduce((acc, detail) => {
          const field = fieldMap[detail.field] || detail.field;
          acc[field] = detail.message;
          return acc;
        }, {});

        setErrors((current) => ({ ...current, ...apiErrors }));
      }

      setSubmitError(
        details?.[0]?.message ||
          apiMessage ||
          "We could not send your quote request right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };


  // Context section helpers
  const contextDest =
    data.isCustomDest || !data.province
      ? data.destinationArea || null
      : data.province
      ? `${data.province}, ${data.destinationArea}`
      : null;

  const hasContextHeader =
    Boolean(data.source) ||
    Boolean(data.packageType) ||
    Boolean(contextDest) ||
    Boolean(data.duration) ||
    Boolean(data.startDate);

  const hasJourneyPrograms = programs.length > 0;
  const showContextSection = hasContextHeader || hasJourneyPrograms;

  if (submitted) {
    return (
      <ModalShell onClose={onClose}>
        <div className="flex flex-col items-center py-10 text-center">
          <span className="mb-4 text-5xl text-gold-500" aria-hidden="true">
            ✓
          </span>
          <span className="eyebrow">Request Prepared</span>
          <h2 className="mt-2 font-serif text-2xl text-coffee-900">
            Your request is noted.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-coffee-800/70">
            Your quote request was sent successfully. Our team will review the details and respond as soon as possible.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-primary text-sm"
            >
              Continue Browsing
            </button>
            <Link
              to="/contact"
              onClick={onClose}
              className="text-center text-sm font-semibold text-coffee-800/60 transition hover:text-coffee-900"
            >
              Contact us →
            </Link>
          </div>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose}>
      <span className="eyebrow">Request a Quote</span>
      <h2 className="mt-2 font-serif text-2xl text-coffee-900">
        Tell us about your journey
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-coffee-800/70">
        Share the basics — our team shapes the route, pricing, and support
        around your group and dates.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
        noValidate
      >
        {/* ── Section 1: Your Details ── */}
        <EnquirySection title="Your Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <EnquiryField label="Client Name *" htmlFor="qm-client-name">
              <input
                id="qm-client-name"
                type="text"
                value={form.clientName}
                onChange={(e) => {
                  upd("clientName", e.target.value);
                  if (errors.clientName) clearErr("clientName");
                }}
                placeholder="Your full name"
                className={`field-input${errors.clientName ? " border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                aria-invalid={errors.clientName ? "true" : undefined}
                aria-describedby={errors.clientName ? "qm-cn-err" : undefined}
              />
              {errors.clientName && (
                <p id="qm-cn-err" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.clientName}
                </p>
              )}
            </EnquiryField>

            <EnquiryField label="Email Address *" htmlFor="qm-email">
              <input
                id="qm-email"
                type="email"
                value={form.email}
                onChange={(e) => {
                  upd("email", e.target.value);
                  if (errors.email) clearErr("email");
                }}
                placeholder="you@email.com"
                className={`field-input${errors.email ? " border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "qm-em-err" : undefined}
              />
              {errors.email && (
                <p id="qm-em-err" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </EnquiryField>

            <EnquiryField label="Phone / WhatsApp (optional)" htmlFor="qm-phone">
              <input
                id="qm-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => upd("phone", e.target.value)}
                placeholder="+63 917 000 0000"
                className="field-input"
              />
            </EnquiryField>
          </div>
        </EnquirySection>

        {/* ── Section 2: Trip Details ── */}
        <EnquirySection title="Trip Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <EnquiryField label="Group Type" htmlFor="qm-group-type">
              <select
                id="qm-group-type"
                value={form.groupType}
                onChange={(e) => upd("groupType", e.target.value)}
                className="field-input"
              >
                <option value="">Select…</option>
                {GROUP_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </EnquiryField>

            <EnquiryField
              label={form.groupType === "Solo" ? "Number of Travelers" : "Number of Travelers *"}
              htmlFor="qm-travelers"
            >
              {form.groupType === "Solo" ? (
                <input
                  id="qm-travelers"
                  type="number"
                  name="numberOfTravelers"
                  value="1"
                  min="1"
                  disabled
                  className="field-input opacity-80"
                />
              ) : (
                <>
                  <select
                    id="qm-travelers"
                    value={form.numberOfTravelers}
                    onChange={(e) => {
                      upd("numberOfTravelers", e.target.value);
                      if (errors.numberOfTravelers) clearErr("numberOfTravelers");
                    }}
                    className={`field-input${errors.numberOfTravelers ? " border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                    aria-invalid={errors.numberOfTravelers ? "true" : undefined}
                    aria-describedby={errors.numberOfTravelers ? "qm-tr-err" : undefined}
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
                  {errors.numberOfTravelers && (
                    <p id="qm-tr-err" className="mt-1 text-xs text-red-500" role="alert">
                      {errors.numberOfTravelers}
                    </p>
                  )}
                </>
              )}
            </EnquiryField>

            <EnquiryField
              label="Preferred Destination / Package"
              htmlFor="qm-destination"
              wide
            >
              <input
                id="qm-destination"
                type="text"
                value={form.preferredDestination}
                onChange={(e) => upd("preferredDestination", e.target.value)}
                placeholder="e.g. Ilocos Heritage Trail, Bataan Route…"
                className="field-input"
              />
            </EnquiryField>

            <EnquiryField label="Preferred Start Date" htmlFor="qm-start-date">
              <DateField
                id="qm-start-date"
                label="Preferred Start Date"
                value={form.startDate}
                min={today}
                onChange={(iso) => {
                  setForm((f) => ({
                    ...f,
                    startDate: iso,
                    endDate: f.endDate && f.endDate < iso ? "" : f.endDate,
                  }));
                  onSaveDraft({ startDate: iso });
                }}
              />
            </EnquiryField>

            <EnquiryField label="Preferred End Date" htmlFor="qm-end-date">
              <DateField
                id="qm-end-date"
                label="Preferred End Date"
                value={form.endDate}
                min={form.startDate || today}
                onChange={(iso) => upd("endDate", iso)}
              />
            </EnquiryField>
          </div>
        </EnquirySection>

        {/* ── Section 3: Selected Package / Program (read-only context) ── */}
        {showContextSection && (
          <EnquirySection title="Selected Package / Program" muted>
            {/* Context header: card/planner that opened the modal */}
            {hasContextHeader && (
              <dl className="space-y-2.5">
                {data.packageType && (
                  <QuoteRow label="Package Style" value={data.packageType} />
                )}
                {data.source && (
                  <QuoteRow label="Package / Tour" value={data.source} />
                )}
                {contextDest && (
                  <QuoteRow label="Destination" value={contextDest} />
                )}
                {data.duration && (
                  <QuoteRow label="Duration" value={data.duration} />
                )}
                {data.startDate && (
                  <QuoteRow
                    label="Planner Dates"
                    value={`${fmtDate(data.startDate)} – ${fmtDate(data.endDate)}`}
                  />
                )}
              </dl>
            )}

            {/* My Journey programs — always live from context */}
            {hasJourneyPrograms && (
              <div className={hasContextHeader ? "mt-3 border-t border-cream-200 pt-3" : ""}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-coffee-800/50">
                  Also included from My Journey
                </p>
                <ul className="space-y-1">
                  {programs.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-start gap-1.5 text-sm text-coffee-900"
                    >
                      <span className="text-gold-500" aria-hidden="true">✓</span>
                      {p.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add another package — closes modal and navigates to tour collection */}
            <div className="mt-3 border-t border-cream-200 pt-3">
              <button
                type="button"
                onClick={() => { onSaveDraft(form); onClose(); navigate("/tour#tour-collection"); }}
                className="text-xs font-semibold text-gold-600 transition hover:text-gold-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                + Add another package
              </button>
            </div>
          </EnquirySection>
        )}

        {/* ── Section 4: Special Requirements ── */}
        <EnquirySection title="Additional Details">
          <EnquiryField
            label="Special Requirements or Message (optional)"
            htmlFor="qm-message"
            wide
          >
            <textarea
              id="qm-message"
              rows={3}
              value={form.message}
              onChange={(e) => upd("message", e.target.value)}
              placeholder="Dietary needs, accessibility, cultural interests, anniversary, or family-specific notes…"
              className="field-input resize-none"
            />
          </EnquiryField>
        </EnquirySection>

        {/* ── Consent ── */}
        <div>
          <label
            className="flex cursor-pointer items-start gap-3"
            htmlFor="qm-consent"
          >
            <input
              id="qm-consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => {
                upd("consent", e.target.checked);
                if (errors.consent) clearErr("consent");
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-cream-300 focus:ring-2 focus:ring-gold-500/30"
              aria-invalid={errors.consent ? "true" : undefined}
              aria-describedby={errors.consent ? "qm-cons-err" : undefined}
            />
            <span className="text-sm leading-relaxed text-coffee-800/80">
              I agree to be contacted by Heritage Philippines regarding this
              quote request.
            </span>
          </label>
          {errors.consent && (
            <p id="qm-cons-err" className="mt-1 text-xs text-red-500" role="alert">
              {errors.consent}
            </p>
          )}
        </div>

        {submitError && (
          <p
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {submitError}
          </p>
        )}

        {/* ── CTA ── */}
        <div className="flex flex-col gap-3 border-t border-cream-200 pt-5 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex-1 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Quote Request →"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

// ─── Shared modal shell ───────────────────────────────────────────────────────

function ModalShell({ children, onClose }) {
  // Prevent body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

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
