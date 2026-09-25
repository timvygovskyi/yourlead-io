'use client';

import { useState } from 'react';
import Image from 'next/image';

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0`;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = u.pathname.startsWith('/shorts/')
        ? u.pathname.split('/')[2]
        : u.searchParams.get('v');
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
    }
  } catch {
    // fall through
  }
  return null;
}

export default function VideoEmbed({
  videoUrl,
  thumbnail,
  title,
}: {
  videoUrl: string;
  thumbnail: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = toEmbedUrl(videoUrl);

  if (playing && embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900">
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => (embedUrl ? setPlaying(true) : window.open(videoUrl, '_blank', 'noopener'))}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={thumbnail}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-slate-900/20 transition-colors group-hover:bg-slate-900/35">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-md">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-slate-900" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
