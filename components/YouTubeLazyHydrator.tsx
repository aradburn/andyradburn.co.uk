"use client";

import { useEffect } from "react";

const EMBED_URL = "https://www.youtube-nocookie.com/embed";
const THUMBNAIL_URL = "https://img.youtube.com/vi";

function hydratePlaceholder(placeholder: HTMLElement) {
  if (placeholder.querySelector(".youtube-lazy__trigger")) return;
  const videoId = placeholder.getAttribute("data-video-id");
  if (!videoId) return;

  const embedUrl = `${EMBED_URL}/${videoId}?autoplay=1`;
  const thumbUrl = `${THUMBNAIL_URL}/${videoId}/hqdefault.jpg`;

  placeholder.innerHTML = `
    <button
      type="button"
      class="youtube-lazy__trigger group relative block w-full cursor-pointer border-0 bg-transparent p-0"
      aria-label="Play video"
    >
      <span class="youtube-lazy__thumb block aspect-video w-full overflow-hidden rounded-sm bg-surface-border">
        <img
          src="${thumbUrl}"
          alt=""
          class="h-full w-full object-cover transition-opacity group-hover:opacity-90"
          loading="lazy"
        />
      </span>
      <span class="youtube-lazy__play absolute inset-0 flex items-center justify-center">
        <span class="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 shadow-lg transition-all group-hover:scale-110 group-hover:bg-red-600">
          <svg class="ml-1 h-8 w-8 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
      </span>
    </button>
  `;

  const trigger = placeholder.querySelector(".youtube-lazy__trigger");
  trigger?.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.className = "aspect-video w-full max-w-4xl";
    iframe.src = embedUrl;
    iframe.title = "YouTube video player";
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.allowFullscreen = true;
    placeholder.replaceChildren(iframe);
  });
}

export function YouTubeLazyHydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const placeholders = document.querySelectorAll<HTMLElement>(".youtube-lazy");
    placeholders.forEach(hydratePlaceholder);
  }, []);

  return <>{children}</>;
}
