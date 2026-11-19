import React from 'react';

interface VidaLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Crisp typographic reproduction of the Vida Medical Centre lockup
 * (`| VIDA` over `MEDICAL CENTRE`), matching the brand identity cleanly on both light and navy surfaces.
 */
export default function VidaLogo({ variant = 'dark', className = '' }: VidaLogoProps) {
  const isLight = variant === 'light';
  const barColor = isLight ? 'bg-white/85' : 'bg-[#0472B5]';
  const titleColor = isLight ? 'text-white' : 'text-[#0472B5]';
  const subtitleColor = isLight ? 'text-sky-100/90' : 'text-[#0472B5]';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <span className={`w-[2px] h-9 rounded-full shrink-0 ${barColor}`} aria-hidden="true" />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[21px] sm:text-[23px] font-bold tracking-[0.04em] leading-[0.95] ${titleColor}`}
        >
          VIDA
        </span>
        <span
          className={`text-[9.5px] sm:text-[10px] font-medium tracking-[0.14em] mt-1 leading-none ${subtitleColor}`}
        >
          MEDICAL CENTRE
        </span>
      </span>
    </span>
  );
}
