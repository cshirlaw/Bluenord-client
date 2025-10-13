// components/ShareWidget.tsx
"use client";

import { useEffect, useRef } from "react";

export default function ShareWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [["OSL:BNOR|1D"]],   // BlueNord on Oslo Børs
      chartOnly: false,
      width: "100%",
      height: 420,
      locale: "en",
      showVolume: true,
      lineWidth: 2,
      autosize: true,
      dateRange: "12M",
      showFloatTooltip: true,
      colorTheme: "light",
      fontFamily: "Inter, ui-sans-serif, system-ui"
    });
    ref.current.appendChild(script);

    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="rounded-2xl border p-3">
      <div className="tradingview-widget-container" ref={ref} />
      <noscript>
        <div className="mt-3">
          JavaScript is required to display the chart. You can{" "}
          <a
            className="underline"
            href="https://live.euronext.com/en/product/equities/NO0010379266-XOSL/market-information"
            target="_blank"
            rel="noreferrer"
          >
            view BlueNord on Euronext
          </a>
          .
        </div>
      </noscript>
    </div>
  );
}