"use client";

import { useState, type ReactNode } from "react";

// Colors match the Figma file exactly (coral accent), kept separate from the
// portfolio's own palette tokens: this module reproduces MAB's real design,
// not the site's design system.
const DATES = [
  { date: "May 10th", day: "Monday" },
  { date: "May 11th", day: "Tuesday" },
  { date: "May 12th", day: "Wednesday" },
  { date: "May 13th", day: "Thursday" },
  { date: "May 14th", day: "Friday" },
] as const;

const TIMES = ["09:00", "09:45", "10:30", "11:30", "13:00", "14:15"] as const;

const APPOINTMENT = {
  name: "General Consultation",
  doctor: "Dr. Sarah Johnson",
  addressLine1: "123 Healthcare Center",
  addressLine2: "Medical District, Berlin, 10781",
};

type Step = "datetime" | "review" | "confirmation" | "account" | "account-done";

function IconCalendar({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8h14M7 2.5v3M13 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconUser({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 17c1-3.2 3.6-5 6-5s5 1.8 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconPin({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M10 17s6-5.2 6-9.6A6 6 0 0 0 4 7.4C4 11.8 10 17 10 17Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconFile({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M6 2.5h5.5L16 7v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 2.5V7h5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconCheck({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUsers({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="7" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.5 16c.7-2.6 2.4-4 4.5-4s3.8 1.4 4.5 4M11.5 16c.5-1.9 1.7-3 3.5-3s2.8 1 3.3 2.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMail({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 5.5 10 11l6.5-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconLock({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ProgressTimeline({ active }: { active: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex flex-1 items-center last:flex-none">
          <div
            className={`flex size-[28px] shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
              n < active
                ? "bg-[#d25441] text-white"
                : n === active
                  ? "bg-[#d25441] text-white ring-4 ring-[#f8e3dd]"
                  : "border border-[#e0d9d1] text-[#7c746c]"
            }`}
          >
            {n < active ? <IconCheck className="size-3.5" /> : n}
          </div>
          {n < 3 && <div className={`mx-2 h-px flex-1 ${n < active ? "bg-[#d25441]" : "bg-[#e0d9d1]"}`} />}
        </div>
      ))}
    </div>
  );
}

function Frame({
  children,
  footer,
  active,
}: {
  children: ReactNode;
  footer?: ReactNode;
  active?: 1 | 2 | 3;
}) {
  return (
    <div className="mx-auto flex h-[680px] w-full max-w-[375px] flex-col overflow-hidden rounded-[28px] border border-[#e0d9d1] bg-white shadow-[0_1px_2px_rgba(33,28,25,0.05),0_8px_24px_rgba(33,28,25,0.08)]">
      {active && (
        <div className="shrink-0 border-b border-[#e0d9d1] px-4 py-3">
          <ProgressTimeline active={active} />
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-4 py-6">{children}</div>
      {footer && <div className="shrink-0 border-t border-[#e0d9d1] px-4 py-3">{footer}</div>}
    </div>
  );
}

function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d25441] py-4 text-center text-[15px] font-semibold text-white shadow-[0_10px_12px_rgba(210,84,65,0.32)]"
    >
      {children}
    </button>
  );
}

export function MABPrototype() {
  const [step, setStep] = useState<Step>("datetime");
  const [dateIndex, setDateIndex] = useState(2);
  const [timeIndex, setTimeIndex] = useState(3);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const selectedDate = DATES[dateIndex];
  const selectedTime = TIMES[timeIndex];

  function reset() {
    setStep("datetime");
    setDateIndex(2);
    setTimeIndex(3);
    setEmail("");
    setPassword("");
  }

  if (step === "datetime") {
    return (
      <Frame active={1} footer={<PrimaryButton onClick={() => setStep("review")}>Continue</PrimaryButton>}>
        <h3 className="font-display text-2xl font-semibold leading-tight text-[#211c19]">
          Select the date for your appointment
        </h3>
        <p className="mt-2 flex items-center gap-2 text-[13.5px] text-[#7c746c]">
          <IconCalendar /> Choose a convenient time slot
        </p>
        <div className="mt-6 space-y-3">
          {DATES.map((d, i) => (
            <div key={d.date}>
              <button
                type="button"
                onClick={() => setDateIndex(i)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                  i === dateIndex ? "border-2 border-[#d25441] bg-[#f8e3dd]" : "border-transparent bg-[#f0eded]"
                }`}
              >
                <span>
                  <span className="block font-display text-[16px] font-semibold text-[#211c19]">{d.date}</span>
                  <span className="block text-[13px] text-[#7c746c]">{d.day}</span>
                </span>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                    i === dateIndex ? "border-[#d25441]" : "border-[#7c746c]"
                  }`}
                >
                  {i === dateIndex && <span className="size-2.5 rounded-full bg-[#d25441]" />}
                </span>
              </button>
              {i === dateIndex && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {TIMES.map((t, ti) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTimeIndex(ti)}
                      className={`rounded-lg border py-2.5 text-center text-[12.5px] ${
                        ti === timeIndex
                          ? "border-2 border-[#211c19] font-extrabold text-[#211c19]"
                          : "border-[#e0d9d1] text-[#675c52]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[12.5px] font-semibold tracking-wide text-[#d25441]">SHOW MORE DATES</p>
      </Frame>
    );
  }

  if (step === "review") {
    return (
      <Frame active={2} footer={<PrimaryButton onClick={() => setStep("confirmation")}>Confirm</PrimaryButton>}>
        <h3 className="font-display text-2xl font-semibold text-[#211c19]">Appointment details</h3>
        <p className="mt-1 text-[13.5px] text-[#7c746c]">Review your appointment information</p>
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-[#f0eded] p-4">
            <p className="text-[10.5px] font-semibold tracking-wide text-[#7c746c]">APPOINTMENT NAME</p>
            <p className="mt-1 font-display text-[16.5px] font-semibold text-[#211c19]">{APPOINTMENT.name}</p>
          </div>
          <div className="rounded-xl bg-[#f0eded] p-4">
            <p className="text-[10.5px] font-semibold tracking-wide text-[#7c746c]">DOCTOR&apos;S NAME</p>
            <p className="mt-1 flex items-center gap-2 font-display text-[15.5px] font-semibold text-[#211c19]">
              <IconUser /> {APPOINTMENT.doctor}
            </p>
          </div>
          <div className="rounded-xl border border-[#d25441] bg-[#f8e3dd] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-semibold tracking-wide text-[#d25441]">DATE &amp; TIME</p>
              <button
                type="button"
                onClick={() => setStep("datetime")}
                className="flex items-center gap-1 text-[12.5px] font-semibold tracking-wide text-[#d25441]"
              >
                MODIFY
              </button>
            </div>
            <p className="mt-1 flex items-center gap-2 font-display text-[15.5px] font-semibold text-[#211c19]">
              <IconCalendar /> {selectedDate.date} at {selectedTime}
            </p>
          </div>
          <div className="rounded-xl bg-[#f0eded] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-semibold tracking-wide text-[#7c746c]">ADDRESS</p>
              <p className="text-[11.5px] font-semibold text-[#7c746c]">DETAILS</p>
            </div>
            <p className="mt-1 flex items-start gap-2 text-[14.5px] text-[#211c19]">
              <IconPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {APPOINTMENT.addressLine1}
                <br />
                <span className="text-[13.5px] text-[#7c746c]">{APPOINTMENT.addressLine2}</span>
              </span>
            </p>
          </div>
          <div className="rounded-xl bg-[#f0eded] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-semibold tracking-wide text-[#7c746c]">DOCUMENTS</p>
              <span className="text-[11.5px] font-semibold text-[#7c746c]">MODIFY</span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-[13.5px] text-[#7c746c]">
              <IconFile /> Insurance card, ID required
            </p>
          </div>
          <div className="rounded-xl bg-[#f0eded] p-4">
            <p className="text-[10.5px] font-semibold tracking-wide text-[#7c746c]">PRICE</p>
            <p className="mt-1 font-display text-[15.5px] font-semibold text-[#211c19]">Legally insured</p>
            <span className="mt-2 inline-block rounded-full border border-[#df8b7e] bg-[#f8e3dd] px-2.5 py-1 text-[10.5px] font-semibold text-[#d25441]">
              Copay may apply
            </span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === "confirmation") {
    return (
      <Frame active={3}>
        <div className="flex flex-col items-center text-center">
          <h3 className="font-display text-[22px] font-semibold text-[#211c19]">Confirmation</h3>
          <div className="relative mt-4 flex size-[68px] items-center justify-center rounded-full bg-[#d25441] shadow-[0_0_0_8px_#f8e3dd]">
            <IconCheck className="size-7 text-white" />
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-[#e0d9d1] bg-[#f3ece5] p-5">
          <p className="text-center font-display text-[16.5px] font-semibold text-[#211c19]">
            Congratulations! Your appointment is booked.
          </p>
          <p className="mt-1.5 text-center text-[13px] text-[#7c746c]">We&apos;ve sent the details to your inbox.</p>
          <div className="mt-5 divide-y divide-[#e0d9d1]">
            {[
              ["DATE", selectedDate.date],
              ["TIME", selectedTime],
              ["WHERE", APPOINTMENT.addressLine1],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center gap-3 py-2.5">
                <span className="w-14 shrink-0 text-[11px] font-semibold text-[#7c746c]">{label}</span>
                <span className="text-[14.5px] text-[#211c19]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex w-full items-center gap-3 rounded-xl border border-[#e0d9d1] bg-[#f0eded] p-4 text-left">
          <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#f8e3dd] text-[#d25441]">
            <IconUsers />
          </span>
          <span>
            <span className="block font-display text-[14.5px] font-semibold text-[#211c19]">Create an account</span>
            <span className="block text-[12.5px] text-[#7c746c]">Manage or reschedule this booking anytime</span>
          </span>
        </div>
        <div className="mt-4">
          <PrimaryButton onClick={() => setStep("account")}>
            <IconUsers className="size-4" /> Create account
          </PrimaryButton>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-3 w-full rounded-full border border-[#e0d9d1] py-4 text-[15px] font-medium text-[#211c19]"
        >
          Back to home
        </button>
        <p className="mt-3 text-center text-[12px] leading-snug text-[#7c746c]">
          You can modify or cancel your appointment anytime by creating an account.
        </p>
      </Frame>
    );
  }

  if (step === "account") {
    return (
      <Frame
        footer={
          <PrimaryButton form="mab-account-form" type="submit">
            Create account
          </PrimaryButton>
        }
      >
        <button
          type="button"
          onClick={() => setStep("confirmation")}
          className="text-[13px] font-semibold text-[#7c746c]"
        >
          ← Back
        </button>
        <h3 className="mt-4 font-display text-2xl font-semibold text-[#211c19]">Create your account</h3>
        <p className="mt-2 text-[13.5px] text-[#7c746c]">Manage or reschedule this booking anytime.</p>
        <form
          id="mab-account-form"
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("account-done");
          }}
        >
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-[12px] font-semibold tracking-wide text-[#7c746c]">
              <IconMail className="size-3.5" /> EMAIL
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-[#e0d9d1] bg-[#f0eded] px-4 py-3 text-[14.5px] text-[#211c19] outline-none focus:border-[#d25441]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-[12px] font-semibold tracking-wide text-[#7c746c]">
              <IconLock className="size-3.5" /> PASSWORD
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#e0d9d1] bg-[#f0eded] px-4 py-3 text-[14.5px] text-[#211c19] outline-none focus:border-[#d25441]"
            />
          </label>
        </form>
      </Frame>
    );
  }

  return (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="relative flex size-[68px] items-center justify-center rounded-full bg-[#d25441] shadow-[0_0_0_8px_#f8e3dd]">
          <IconCheck className="size-7 text-white" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-[#211c19]">You&apos;re all set</h3>
        <p className="mt-2 max-w-[260px] text-[13.5px] text-[#7c746c]">
          Your account is ready. You can manage or reschedule this booking anytime.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-[#d25441] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_12px_rgba(210,84,65,0.32)]"
        >
          Back to home
        </button>
      </div>
    </Frame>
  );
}
