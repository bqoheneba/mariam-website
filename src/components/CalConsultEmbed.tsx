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
    <div className="w-full flex justify-center rounded-xl overflow-hidden bg-[#202020] backdrop-blur-sm min-h-[750px] h-[780px] lg:h-[820px]">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={calLink}
        calOrigin={calOrigin}
        embedJsUrl={embedJsUrl}
        className="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
          minHeight: 720,
          overflow: "auto",
        }}
        config={{
          layout: "column_view",
          useSlotsViewOnSmallScreen: "true",
        }}
      />
    </div>
  );
}
