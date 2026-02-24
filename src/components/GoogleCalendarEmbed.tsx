"use client";

import React from "react";

type Props = {
  calendarSrc?: string;
  height?: string | number;
  theme?: "light" | "dark";
};

export default function GoogleCalendarEmbed({
  calendarSrc = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1424iSu83N2PPFTQEQH93SgAtYGv6z_H6ZAGa4lFHcbyCsLnw9U5IfGWhmYc-tW7z_LcKKHVMK",
  height = 700,
  theme = "dark",
}: Props) {
  // Check if it is a public calendar embed or an appointment schedule
  // Appointment schedule URLs typically look like /appointments/schedules/ or /calendar/u/0/appointments
  const isEmbed = calendarSrc.includes("/embed?");

  // Only add parameters if it is the old embed style
  const cleanSrc = isEmbed
    ? calendarSrc.includes("?")
      ? `${calendarSrc}&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=1`
      : `${calendarSrc}?showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=1`
    : calendarSrc;

  return (
    <div className="w-full flex justify-center p-4 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
      <iframe
        src={cleanSrc}
        style={{
          border: 0,
          // Apply filters to force dark mode on both types of embeds
          // For Appointment Schedules, we need to invert but rotate hue back to keep brand colors intact
          filter: theme === "dark" ? "invert(0.92) hue-rotate(180deg)" : "none",
          // Add mix-blend-mode to help it blend better with the background
          mixBlendMode: theme === "dark" ? "lighten" : "normal",
        }}
        width="100%"
        height={typeof height === "number" ? String(height) : height}
        frameBorder="0"
        scrolling="yes"
        title="Google Calendar"
        className="max-w-full rounded-lg"
      />
    </div>
  );
}
