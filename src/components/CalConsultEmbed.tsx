"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CAL_NAMESPACE = "consult";

/** Path after your Cal host, e.g. mariamdigitalbee/consult (from Share → Embed). */
const defaultCalLink = "mariamdigitalbee/consult";

/** Cal.eu (and other non-cal.com instances) need matching origin + embed script — not app.cal.com. */
const defaultCalOrigin = "https://www.cal.eu";

export default function CalConsultEmbed() {
  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK?.trim() || defaultCalLink;
  const calOrigin =
    process.env.NEXT_PUBLIC_CAL_ORIGIN?.trim() || defaultCalOrigin;
  const embedJsUrl =
    process.env.NEXT_PUBLIC_CAL_EMBED_JS_URL?.trim() ||
    `${calOrigin.replace(/\/$/, "")}/embed/embed.js`;

  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({
        namespace: CAL_NAMESPACE,
        embedJsUrl,
      });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#112831" },
          dark: { "cal-brand": "#112831" },
        },
        hideEventTypeDetails: false,
        layout: "column_view",
      });
    })();
  }, [embedJsUrl]);

  return (
    <div className="flex h-[clamp(960px,92dvh,1150px)] w-full items-center justify-center overflow-hidden rounded-xl bg-[#202020] backdrop-blur-sm">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={calLink}
        calOrigin={calOrigin}
        embedJsUrl={embedJsUrl}
        className="flex h-full w-full min-h-0 flex-col items-center justify-center [&_iframe]:mx-auto [&_iframe]:block [&_iframe]:max-h-full [&_iframe]:w-full [&_iframe]:max-w-full"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100%",
        }}
        config={{
          layout: "column_view",
          useSlotsViewOnSmallScreen: "true",
        }}
      />
    </div>
  );
}
