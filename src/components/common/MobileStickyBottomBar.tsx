import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, Calendar } from 'lucide-react';

export const MobileStickyBottomBar: React.FC = () => {
  const { navigate, settings, currentPath } = useApp();

  let contextualMessage = "Hello Shayne'n'Dad, I'd like to check vehicle availability and rates in Harare.";
  if (currentPath.startsWith('/cars/')) {
    const slug = currentPath.replace('/cars/', '');
    contextualMessage = `Hello Shayne'n'Dad, I am enquiring about availability for ${slug.replace(/-/g, ' ')}.`;
  }
  const waUrl = `https://wa.me/263772936555?text=${encodeURIComponent(contextualMessage)}`;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[#D9DBE8] p-2.5 shadow-lg flex items-center gap-2 max-h-[64px]"
      aria-label="Mobile Quick Actions"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors active:translate-y-px"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span className="truncate">WhatsApp</span>
      </a>

      <button
        onClick={() => navigate('/cars')}
        className="flex-1 py-2.5 px-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors active:translate-y-px"
      >
        <Calendar className="w-4 h-4 shrink-0" />
        <span className="truncate">Check Dates</span>
      </button>
    </div>
  );
};
