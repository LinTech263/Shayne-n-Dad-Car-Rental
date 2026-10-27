import React from 'react';

interface CarImageSlotProps {
  src?: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '3/2';
  className?: string;
  categoryName?: string;
  carName?: string;
}

export const CarImageSlot: React.FC<CarImageSlotProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  categoryName,
  carName
}) => {
  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : 'aspect-[3/2]';

  if (src && src.trim() !== '') {
    return (
      <div className={`relative overflow-hidden bg-[#F4F5FA] ${aspectClass} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
        />
        {/* Subtle brand overlay */}
        <div className="absolute inset-0 bg-[#00005E]/15 pointer-events-none" />
      </div>
    );
  }

  // Tonal Navy-Grey image slot with subtle car silhouette and admin label
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#1C2038] to-[#0A0D1E] text-white flex flex-col items-center justify-center p-6 ${aspectClass} ${className} border border-[#D9DBE8]/30 group`}
      role="img"
      aria-label={alt}
    >
      {/* Subtle car roof swoosh line motif in background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 500 280"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 40 220 C 120 180, 200 60, 360 80 C 440 90, 480 180, 490 220"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
      </svg>

      {/* Car Silhouette SVG */}
      <div className="relative z-10 w-28 h-14 text-white/40 mb-3 group-hover:text-white/60 transition-colors">
        <svg
          viewBox="0 0 64 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Streamlined car profile */}
          <path d="M6 22 L11 22 M21 22 L43 22 M53 22 L58 22" />
          <path d="M10 22 C10 16, 14 14, 20 14 L28 14 L36 8 L48 8 L54 14 L58 17 C60 18, 61 20, 61 22 L61 24 L57 24" />
          <path d="M3 24 L7 24 C7 20, 10 16, 14 16" />
          <circle cx="16" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="48" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="22" r="2" fill="currentColor" />
          <circle cx="48" cy="22" r="2" fill="currentColor" />
          <path d="M35 9 L46 9 L51 14 L35 14 Z" strokeWidth="1" />
          <path d="M26 14 L33 9 L33 14 Z" strokeWidth="1" />
        </svg>
      </div>

      {carName && (
        <span className="relative z-10 text-xs font-semibold tracking-wider uppercase text-white/90 mb-1">
          {carName}
        </span>
      )}

      {categoryName && (
        <span className="relative z-10 text-[11px] text-[#D9DBE8]/70 mb-2">
          {categoryName}
        </span>
      )}

      {/* Admin replace indicator badge */}
      <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 border border-white/10 rounded-xs text-[10px] tracking-wide text-white/60 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B71C24]" />
        <span>Photo to be uploaded · Admin</span>
      </div>
    </div>
  );
};
