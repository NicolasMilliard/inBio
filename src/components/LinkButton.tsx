import { useState } from 'react';

export type LinkButtonProps = {
  href: string;
  label: string;
};

export const LinkButton = ({ href, label }: LinkButtonProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(`${href}/favicon.ico`);

  const googleFallback = `https://www.google.com/s2/favicons?domain=${href}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[0.9375rem] font-semibold text-slate-900 no-underline shadow-[0_1px_12px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-150 hover:-translate-y-px hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] active:translate-y-0"
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={label}
          className="h-5 w-5 shrink-0 rounded-sm object-cover"
          onError={() => {
            if (imgSrc !== googleFallback) {
              setImgSrc(googleFallback);
            } else {
              setImgSrc(null);
            }
          }}
        />
      ) : (
        <span className="text-[1.1rem] leading-none">🔗</span>
      )}
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
      <svg
        className="shrink-0 text-slate-700 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  );
};
