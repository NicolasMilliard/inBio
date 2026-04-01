export type CtaProps = {
  href: string;
  label: string;
  icon?: string;
};

export const CtaButton = ({ href, label, icon }: CtaProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-black/8 bg-white/55 px-4 py-3.5 text-[0.9375rem] font-semibold text-[#111] no-underline shadow-[0_1px_12px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-150 hover:-translate-y-px hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] active:translate-y-0"
    >
      {icon && (
        <span className="shrink-0 text-[1.1rem] leading-none">{icon}</span>
      )}
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
      <svg
        className="shrink-0 text-black/35 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black/50"
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

export default CtaButton;
