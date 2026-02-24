"use client";

import React from "react";

type Props = {
  src?: string;
  width?: string | number;
  height?: string | number;
};

export default function SpotifyEmbed({
  src = "https://open.spotify.com/embed/episode/4yJNb3ObmHSLbQl4CleTY0?utm_source=generator",
  width = "100%",
  height = 352,
}: Props) {
  return (
    <div className="w-full flex justify-center">
      <iframe
        style={{ borderRadius: "12px" }}
        src={src}
        width={width}
        height={height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="max-w-3xl w-full shadow-2xl"
      ></iframe>
    </div>
  );
}
