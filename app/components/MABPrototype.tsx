"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

// Visuals (colors, shadows, spacing, icons, logo) are ported 1:1 from Daniela's
// Figma Make file for MAB, kept separate from the portfolio's own palette
// tokens: this module reproduces MAB's real design, not the site's design
// system. The device bezel (notch, home indicator) is our own addition, not
// part of the Make file.
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

type Screen = "datetime" | "review" | "confirmation" | "account" | "account-done";

function IconCalendarMuted() {
  return (
    <svg viewBox="0 0 15 15" fill="none" className="size-[15px] shrink-0" aria-hidden>
      <path d="M3.75 2.5H11.25C12.2848 2.5 13.125 3.34016 13.125 4.375V11.875C13.125 12.9098 12.2848 13.75 11.25 13.75H3.75C2.71516 13.75 1.875 12.9098 1.875 11.875V4.375C1.875 3.34016 2.71516 2.5 3.75 2.5V2.5" stroke="#7C746C" strokeWidth="1.25" />
      <path d="M5 1.25V3.75M10 1.25V3.75M1.875 6.25H13.125" stroke="#7C746C" strokeWidth="1.25" />
    </svg>
  );
}

function IconDoctor() {
  return (
    <svg viewBox="0 0 17 17" fill="none" className="size-[17px] shrink-0" aria-hidden>
      <path d="M5.66667 5.66667C5.66667 7.23043 6.93624 8.5 8.5 8.5C10.0638 8.5 11.3333 7.23043 11.3333 5.66667C11.3333 4.10291 10.0638 2.83333 8.5 2.83333C6.93624 2.83333 5.66667 4.10291 5.66667 5.66667V5.66667" stroke="#7C746C" strokeWidth="1.41667" />
      <path d="M2.83333 14.875C2.83333 11.7583 5.38333 9.20833 8.5 9.20833C11.6167 9.20833 14.1667 11.7583 14.1667 14.875" stroke="#7C746C" strokeWidth="1.41667" />
    </svg>
  );
}

function IconModifyPencil() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3 shrink-0" aria-hidden>
      <path d="M6 10H10.5" stroke="#D25441" />
      <path d="M8.25 1.75C8.66421 1.33579 9.33579 1.33579 9.75 1.75C10.1642 2.16421 10.1642 2.83579 9.75 3.25L3.5 9.5L1.5 10L2 8L8.25 1.75" stroke="#D25441" />
    </svg>
  );
}

function IconCalendarCoral() {
  return (
    <svg viewBox="0 0 17 17" fill="none" className="size-[17px] shrink-0" aria-hidden>
      <path d="M4.25 2.83333H12.75C13.9236 2.83333 14.875 3.78473 14.875 4.95833V13.4583C14.875 14.6319 13.9236 15.5833 12.75 15.5833H4.25C3.07639 15.5833 2.125 14.6319 2.125 13.4583V4.95833C2.125 3.78473 3.07639 2.83333 4.25 2.83333V2.83333" stroke="#D25441" strokeWidth="1.41667" />
      <path d="M5.66667 1.41667V4.25M11.3333 1.41667V4.25M2.125 7.08333H14.875" stroke="#D25441" strokeWidth="1.41667" />
    </svg>
  );
}

function IconPinMuted() {
  return (
    <svg viewBox="0 0 17 17" fill="none" className="size-[17px] shrink-0" aria-hidden>
      <path d="M14.1667 7.08333C14.1667 11.3333 8.5 15.5833 8.5 15.5833C8.5 15.5833 2.83333 11.3333 2.83333 7.08333C2.83333 3.95581 5.37248 1.41667 8.5 1.41667C11.6275 1.41667 14.1667 3.95581 14.1667 7.08333V7.08333" stroke="#7C746C" strokeWidth="1.41667" />
      <path d="M6.375 7.08333C6.375 8.25615 7.32718 9.20833 8.5 9.20833C9.67282 9.20833 10.625 8.25615 10.625 7.08333C10.625 5.91051 9.67282 4.95833 8.5 4.95833C7.32718 4.95833 6.375 5.91051 6.375 7.08333V7.08333" stroke="#7C746C" strokeWidth="1.41667" />
    </svg>
  );
}

function IconFileMuted() {
  return (
    <svg viewBox="0 0 17 17" fill="none" className="size-[17px] shrink-0" aria-hidden>
      <path d="M9.91667 1.41667H4.25C3.46812 1.41667 2.83333 2.05145 2.83333 2.83333V14.1667C2.83333 14.9485 3.46812 15.5833 4.25 15.5833H12.75C13.5319 15.5833 14.1667 14.9485 14.1667 14.1667V5.66667L9.91667 1.41667" stroke="#7C746C" strokeWidth="1.41667" />
      <path d="M9.91667 1.41667V5.66667H14.1667" stroke="#7C746C" strokeWidth="1.41667" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg viewBox="0 0 17 17" fill="none" className="size-[17px] shrink-0" aria-hidden>
      <path d="M8.5 0.708333V16.2917M12.0417 3.54167H6.72917C5.36088 3.54167 4.25 4.65254 4.25 6.02083C4.25 7.38912 5.36088 8.5 6.72917 8.5H10.2708C11.6391 8.5 12.75 9.61088 12.75 10.9792C12.75 12.3475 11.6391 13.4583 10.2708 13.4583H4.25" stroke="#211C19" strokeWidth="1.41667" />
    </svg>
  );
}

function IconCheckWhite() {
  return (
    <svg viewBox="0 0 30 30" fill="none" className="size-[30px]" aria-hidden>
      <path d="M25 7.5L11.25 21.25L5 15" stroke="white" strokeWidth="3.125" />
    </svg>
  );
}

function IconCalendarSmallCoral() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
      <path d="M4 2.66667H12C13.1038 2.66667 14 3.56284 14 4.66667V12.6667C14 13.7705 13.1038 14.6667 12 14.6667H4C2.89617 14.6667 2 13.7705 2 12.6667V4.66667C2 3.56284 2.89617 2.66667 4 2.66667V2.66667" stroke="#D25441" strokeWidth="1.33333" />
      <path d="M5.33333 1.33333V4M10.6667 1.33333V4M2 6.66667H14" stroke="#D25441" strokeWidth="1.33333" />
    </svg>
  );
}

function IconClockCoral() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
      <path d="M2 8C2 11.3115 4.68851 14 8 14C11.3115 14 14 11.3115 14 8C14 4.68851 11.3115 2 8 2C4.68851 2 2 4.68851 2 8V8" stroke="#D25441" strokeWidth="1.33333" />
      <path d="M8 4.66667V8L10 10" stroke="#D25441" strokeWidth="1.33333" />
    </svg>
  );
}

function IconPinSmallCoral() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
      <path d="M13.3333 6.66667C13.3333 10.6667 8 14.6667 8 14.6667C8 14.6667 2.66667 10.6667 2.66667 6.66667C2.66667 3.72312 5.05645 1.33333 8 1.33333C10.9435 1.33333 13.3333 3.72312 13.3333 6.66667V6.66667" stroke="#D25441" strokeWidth="1.33333" />
      <path d="M6 6.66667C6 7.7705 6.89617 8.66667 8 8.66667C9.10383 8.66667 10 7.7705 10 6.66667C10 5.56284 9.10383 4.66667 8 4.66667C6.89617 4.66667 6 5.56284 6 6.66667V6.66667" stroke="#D25441" strokeWidth="1.33333" />
    </svg>
  );
}

function IconUsersCoral() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-[18px]" aria-hidden>
      <path d="M12 15.75V14.25C12 12.5943 10.6557 11.25 9 11.25H4.5C2.84425 11.25 1.5 12.5943 1.5 14.25V15.75" stroke="#D25441" strokeWidth="1.5" />
      <path d="M3.75 5.25C3.75 6.90575 5.09425 8.25 6.75 8.25C8.40575 8.25 9.75 6.90575 9.75 5.25C9.75 3.59425 8.40575 2.25 6.75 2.25C5.09425 2.25 3.75 3.59425 3.75 5.25V5.25" stroke="#D25441" strokeWidth="1.5" />
      <path d="M16.5 15.75V14.25C16.499 12.8828 15.5737 11.6893 14.25 11.3475M12 2.3475C13.3274 2.68738 14.2559 3.88349 14.2559 5.25375C14.2559 6.62401 13.3274 7.82012 12 8.16" stroke="#D25441" strokeWidth="1.5" />
    </svg>
  );
}

function IconUsersWhite() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
      <path d="M10.6667 14V12.6667C10.6667 11.1949 9.47177 10 8 10H4C2.52823 10 1.33333 11.1949 1.33333 12.6667V14" stroke="white" strokeWidth="1.33333" />
      <path d="M3.33333 4.66667C3.33333 6.13844 4.52823 7.33333 6 7.33333C7.47177 7.33333 8.66667 6.13844 8.66667 4.66667C8.66667 3.19489 7.47177 2 6 2C4.52823 2 3.33333 3.19489 3.33333 4.66667H3.33333" stroke="white" strokeWidth="1.33333" />
      <path d="M15.3333 14V12.6667C15.3324 11.4514 14.51 10.3905 13.3333 10.0867M10.6667 2.08667C11.8466 2.38878 12.6719 3.45199 12.6719 4.67C12.6719 5.88801 11.8466 6.95122 10.6667 7.25333" stroke="white" strokeWidth="1.33333" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
      <path d="M2 6.33333L8 2L14 6.33333V14H2V6.33333" stroke="#211C19" strokeWidth="1.33333" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 5.5 10 11l6.5-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="flex shrink-0 items-center gap-[5px]">
      <Image src="/images/mab/mab-logo.png" alt="" width={27} height={27} className="size-[27px] object-contain" />
      <span className="font-display text-[18px] font-semibold tracking-[-0.2px] text-[#d25441]">MAB</span>
    </div>
  );
}

function ProgressTimeline({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-center">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center">
          {n > 1 && <span className={`mx-2 h-px w-10 ${n <= step ? "bg-[#d25441]" : "bg-[#e0d9d1]"}`} />}
          <span
            className={`grid size-[30px] place-items-center rounded-full border font-manrope text-[13px] font-semibold ${
              n <= step ? "border-[#d25441] bg-[#d25441] text-white" : "border-[#e0d9d1] bg-[#f3ece5] text-[#7c746c]"
            } ${n === step ? "shadow-[0_0_0_4px_#f8e3dd]" : ""}`}
          >
            {n < step ? "✓" : n}
          </span>
        </div>
      ))}
    </div>
  );
}

function Shell({ step, children }: { step: 1 | 2 | 3; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[375px]">
      <div className="relative rounded-[52px] bg-[#1a1a1a] p-[14px] shadow-[0_20px_40px_rgba(33,28,25,0.18)]">
        <div className="relative aspect-[375/812] w-full overflow-hidden rounded-[38px] border border-[#e0d9d1] bg-white">
          <div className="pointer-events-none absolute left-1/2 top-[10px] z-10 h-[24px] w-[90px] -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
          <div className="flex h-full w-full flex-col font-lexend text-[#211c19]">
            <div className="shrink-0 px-[22px] pt-9">
              <Logo />
              <div className="mt-2">
                <ProgressTimeline step={step} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-[22px] pb-10 pt-6">{children}</div>
          </div>
          <div className="pointer-events-none absolute bottom-[8px] left-1/2 z-10 h-[4px] w-[120px] -translate-x-1/2 rounded-full bg-[#1a1a1a]/70" />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  action,
  actionIcon,
  accent,
  icon,
  children,
}: {
  label: string;
  action?: string;
  actionIcon?: ReactNode;
  accent?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`w-full rounded-xl border p-[17px] ${accent ? "border-[#d25441] bg-[#f8e3dd]" : "border-transparent bg-[#f0eded]"}`}>
      <div className={`flex items-center justify-between font-manrope text-[10.5px] font-semibold tracking-[0.63px] ${accent ? "text-[#d25441]" : "text-[#7c746c]"}`}>
        <span>{label}</span>
        {action && (
          <span className="flex items-center gap-[5px]">
            {actionIcon}
            {action}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-start gap-2 text-[13.5px]">
        {icon}
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">{children}</div>
      </div>
    </div>
  );
}

function BookingRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="grid min-h-9 grid-cols-[16px_62px_1fr] items-center gap-3 border-t border-[#e0d9d1] py-2 first:border-t-0 first:pt-0">
      {icon}
      <span className="font-manrope text-[11px] font-semibold text-[#7c746c]">{label}</span>
      <strong className="whitespace-nowrap text-[14.5px] font-normal text-[#211c19]">{value}</strong>
    </div>
  );
}

export function MABPrototype() {
  const [screen, setScreen] = useState<Screen>("datetime");
  const [dateIndex, setDateIndex] = useState(2);
  const [timeIndex, setTimeIndex] = useState(3);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const selectedDate = DATES[dateIndex] ?? { date: "May 15th", day: "Saturday" };
  const selectedTime = TIMES[timeIndex] ?? TIMES[0];

  function reset() {
    setScreen("datetime");
    setDateIndex(2);
    setTimeIndex(3);
    setExpanded(false);
    setEmail("");
    setPassword("");
  }

  if (screen === "datetime") {
    return (
      <Shell key="datetime" step={1}>
        <header>
          <h1 className="font-display text-2xl font-semibold leading-[30px] tracking-[-0.24px] text-[#211c19]">
            Select the date for
            <br />
            your appointment
          </h1>
          <p className="mt-[10px] flex items-center gap-2 text-[13.5px] text-[#7c746c]">
            <IconCalendarMuted /> Choose a convenient time slot
          </p>
        </header>
        <div className="mt-6 flex flex-col gap-3">
          {DATES.map((item, index) => {
            const selected = dateIndex === index;
            return (
              <div key={item.date}>
                <button
                  type="button"
                  onClick={() => setDateIndex(index)}
                  className={`flex min-h-[71px] w-full items-center justify-between rounded-xl border px-4 py-[14px] text-left shadow-[0_1px_1px_rgba(33,28,25,0.05),0_8px_12px_rgba(33,28,25,0.06)] ${
                    selected ? "border-[#df8b7e] bg-[#f8e3dd]" : "border-[#e0d9d1] bg-[#f3ece5]"
                  }`}
                >
                  <span className="flex flex-col gap-[2px]">
                    <strong className={`font-display text-[16.5px] font-semibold ${selected ? "text-[#d25441]" : "text-[#211c19]"}`}>
                      {item.date}
                    </strong>
                    <small className="text-[13px] text-[#7c746c]">{item.day}</small>
                  </span>
                  <span className={`grid size-5 shrink-0 place-items-center rounded-full border p-1 ${selected ? "border-[#d25441]" : "border-[#e0d9d1]"}`}>
                    {selected && <span className="size-full rounded-full bg-[#d25441]" />}
                  </span>
                </button>
                {selected && (
                  <div className="grid grid-cols-3 gap-2 px-0.5 pb-3 pt-[10px]">
                    {TIMES.map((t, ti) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTimeIndex(ti)}
                        className={`h-[38px] rounded-lg border font-manrope text-[12.5px] ${
                          ti === timeIndex
                            ? "border-[#d25441] bg-[#d25441] font-semibold text-white"
                            : "border-[#e0d9d1] bg-[#f0eded] text-[#675c52]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {expanded && (
            <button
              type="button"
              onClick={() => setDateIndex(5)}
              className="flex min-h-[71px] w-full items-center justify-between rounded-xl border border-[#e0d9d1] bg-[#f3ece5] px-4 py-[14px] text-left shadow-[0_1px_1px_rgba(33,28,25,0.05),0_8px_12px_rgba(33,28,25,0.06)]"
            >
              <span className="flex flex-col gap-[2px]">
                <strong className="font-display text-[16.5px] font-semibold text-[#211c19]">May 15th</strong>
                <small className="text-[13px] text-[#7c746c]">Saturday</small>
              </span>
              <span className="size-5 shrink-0 rounded-full border border-[#e0d9d1]" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="w-full py-4 text-center font-manrope text-[12.5px] font-semibold tracking-[0.375px] text-[#d25441]"
        >
          {expanded ? "SHOW FEWER DATES" : "SHOW MORE DATES"}
        </button>
        <div className="h-px w-full bg-[#e0d9d1]" />
        <button
          type="button"
          onClick={() => setScreen("review")}
          className="mt-[10px] w-full rounded-full bg-[#d25441] py-[15px] text-center font-lexend text-[15px] font-semibold text-white shadow-[0_10px_12px_rgba(210,84,65,0.32)]"
        >
          Continue
        </button>
      </Shell>
    );
  }

  if (screen === "review") {
    return (
      <Shell key="review" step={2}>
        <header>
          <h1 className="font-display text-2xl font-semibold leading-[26.25px] tracking-[-0.24px] text-[#211c19]">Appointment details</h1>
          <p className="mt-[10px] text-[13.5px] text-[#7c746c]">Review your appointment information</p>
        </header>
        <div className="my-[25px] flex flex-col gap-3">
          <InfoCard label="APPOINTMENT NAME">
            <strong className="font-display text-[15.5px] font-semibold text-[#211c19]">{APPOINTMENT.name}</strong>
          </InfoCard>
          <InfoCard label="DOCTOR'S NAME" icon={<IconDoctor />}>
            <strong className="font-display text-[15.5px] font-semibold text-[#211c19]">{APPOINTMENT.doctor}</strong>
          </InfoCard>
          <button type="button" onClick={() => setScreen("datetime")} className="block w-full text-left">
            <InfoCard label="DATE &amp; TIME" action="MODIFY" actionIcon={<IconModifyPencil />} accent icon={<IconCalendarCoral />}>
              <strong className="font-display text-[15.5px] font-semibold text-[#211c19]">
                {selectedDate.date} at {selectedTime}
              </strong>
            </InfoCard>
          </button>
          <InfoCard label="ADDRESS" action="DETAILS" icon={<IconPinMuted />}>
            <strong className="font-display text-[15.5px] font-semibold text-[#211c19]">{APPOINTMENT.addressLine1}</strong>
            <small className="text-[13.5px] text-[#7c746c]">{APPOINTMENT.addressLine2}</small>
          </InfoCard>
          <InfoCard label="DOCUMENTS" action="MODIFY" icon={<IconFileMuted />}>
            <span className="text-[13.5px] text-[#7c746c]">Insurance card, ID required</span>
          </InfoCard>
          <InfoCard label="PRICE" icon={<IconDollar />}>
            <strong className="font-display text-[15.5px] font-semibold text-[#211c19]">Legally insured</strong>
            <em className="mt-[3px] w-fit rounded-full border border-[#df8b7e] bg-[#f8e3dd] px-2 py-[3px] font-manrope text-[10.5px] font-semibold not-italic text-[#d25441]">
              Copay may apply
            </em>
          </InfoCard>
        </div>
        <div className="h-px w-full bg-[#e0d9d1]" />
        <button
          type="button"
          onClick={() => setScreen("confirmation")}
          className="mt-[10px] w-full rounded-full bg-[#d25441] py-[15px] text-center font-lexend text-[15px] font-semibold text-white shadow-[0_10px_12px_rgba(210,84,65,0.32)]"
        >
          Confirm
        </button>
      </Shell>
    );
  }

  if (screen === "confirmation") {
    return (
      <Shell key="confirmation" step={3}>
        <div className="flex flex-col items-center gap-[15px]">
          <h1 className="font-display text-[22px] font-semibold leading-[27.5px] text-[#211c19]">Confirmation</h1>
          <div className="grid size-[68px] place-items-center rounded-full bg-[#d25441] shadow-[0_0_0_8px_#f8e3dd]">
            <IconCheckWhite />
          </div>
        </div>
        <div className="mt-4 rounded-[20px] border border-[#e0d9d1] bg-[#f3ece5] px-[17px] pb-[25px] pt-[37px] shadow-[0_1px_1px_rgba(33,28,25,0.05),0_8px_12px_rgba(33,28,25,0.06)]">
          <h2 className="text-center font-display text-[16.5px] font-semibold text-[#211c19]">
            Congratulations! Your appointment
            <br />
            is booked.
          </h2>
          <p className="mb-[10px] mt-[6px] text-center text-[13px] text-[#7c746c]">We&apos;ve sent the details to your inbox.</p>
          <BookingRow icon={<IconCalendarSmallCoral />} label="DATE" value={selectedDate.date} />
          <BookingRow icon={<IconClockCoral />} label="TIME" value={selectedTime} />
          <BookingRow icon={<IconPinSmallCoral />} label="WHERE" value={APPOINTMENT.addressLine1} />
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#e0d9d1] bg-[#f0eded] px-[17px] pb-4 pt-5">
          <span className="grid size-[38px] shrink-0 place-items-center rounded-full bg-[#f8e3dd]">
            <IconUsersCoral />
          </span>
          <div>
            <strong className="font-display text-[14.5px] font-semibold text-[#211c19]">Create an account</strong>
            <p className="mt-[3px] text-[12.5px] text-[#7c746c]">
              Manage or reschedule this booking
              <br />
              anytime
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setScreen("account")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#d25441] py-[17px] font-lexend text-[15px] font-semibold text-white shadow-[0_10px_12px_rgba(210,84,65,0.32)]"
        >
          <IconUsersWhite /> Create account
        </button>
        <button
          type="button"
          onClick={reset}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#e0d9d1] bg-white py-[15px] font-lexend text-[15px] font-medium text-[#211c19]"
        >
          <IconHome /> Back to home
        </button>
        <p className="mt-1 text-center text-[12px] leading-[18px] text-[#7c746c]">
          You can modify or cancel your appointment anytime by
          <br />
          creating an account.
        </p>
      </Shell>
    );
  }

  if (screen === "account") {
    return (
      <Shell key="account" step={3}>
        <button type="button" onClick={() => setScreen("confirmation")} className="text-[13px] font-semibold text-[#7c746c]">
          ← Back
        </button>
        <h1 className="mt-4 font-display text-2xl font-semibold text-[#211c19]">Create your account</h1>
        <p className="mt-2 text-[13.5px] text-[#7c746c]">Manage or reschedule this booking anytime.</p>
        <form
          id="mab-account-form"
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setScreen("account-done");
          }}
        >
          <label className="block">
            <span className="mb-[6px] flex items-center gap-2 font-manrope text-[12px] font-semibold tracking-[0.63px] text-[#7c746c]">
              <IconMail /> EMAIL
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
            <span className="mb-[6px] flex items-center gap-2 font-manrope text-[12px] font-semibold tracking-[0.63px] text-[#7c746c]">
              <IconLock /> PASSWORD
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#e0d9d1] bg-[#f0eded] px-4 py-3 text-[14.5px] text-[#211c19] outline-none focus:border-[#d25441]"
            />
          </label>
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#d25441] py-[15px] text-center font-lexend text-[15px] font-semibold text-white shadow-[0_10px_12px_rgba(210,84,65,0.32)]"
          >
            Create account
          </button>
        </form>
      </Shell>
    );
  }

  return (
    <Shell key="account-done" step={3}>
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="grid size-[68px] place-items-center rounded-full bg-[#d25441] shadow-[0_0_0_8px_#f8e3dd]">
          <IconCheckWhite />
        </div>
        <h1 className="mt-5 font-display text-xl font-semibold text-[#211c19]">You&apos;re all set</h1>
        <p className="mt-2 max-w-[260px] text-[13.5px] text-[#7c746c]">
          Your account is ready. You can manage or reschedule this booking anytime.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-[#d25441] px-6 py-3 font-lexend text-[14px] font-semibold text-white shadow-[0_10px_12px_rgba(210,84,65,0.32)]"
        >
          Back to home
        </button>
      </div>
    </Shell>
  );
}
