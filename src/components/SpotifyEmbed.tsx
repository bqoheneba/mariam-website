"use client";

type Props = {
  src?: string;
  height?: number;
};

export default function SpotifyEmbed({
  src = "https://open.spotify.com/embed/episode/4yJNb3ObmHSLbQl4CleTY0?utm_source=generator",
  height = 352,
}: Props) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl">
      <iframe
        src={src}
        height={height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify podcast embed"
        className="block w-full max-w-full min-w-0 rounded-xl shadow-2xl"
        style={{ border: 0, borderRadius: "12px" }}
      />
    </div>
  );
}
