import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const { currentPath, settings } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);

  // Build contextual message based on current page
  let contextualMessage = "Hello Shayne'n'Dad Car Rental, I am visiting your website and would like to enquire about vehicle availability in Harare.";
  if (currentPath.startsWith('/cars/')) {
    const slug = currentPath.replace('/cars/', '');
    contextualMessage = `Hello Shayne'n'Dad, I am viewing the ${slug.replace(/-/g, ' ')} on your website and would like to check availability and rates.`;
  } else if (currentPath.startsWith('/services/')) {
    const slug = currentPath.replace('/services/', '');
    contextualMessage = `Hello Shayne'n'Dad, I am enquiring about your ${slug.replace(/-/g, ' ')} service in Harare.`;
  }

  const encodedUrl = `https://wa.me/263772936555?text=${encodeURIComponent(contextualMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2">
      {/* Contextual Floating Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#2E2E2E] text-xs py-2 px-3.5 rounded-xs shadow-xl border border-[#D9DBE8] animate-fadeIn max-w-xs">
          <span>Chat directly with our Greencroft operations team</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#6B6E80] hover:text-[#2E2E2E] p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={encodedUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat on WhatsApp with Shayne'n'Dad Car Rental"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
