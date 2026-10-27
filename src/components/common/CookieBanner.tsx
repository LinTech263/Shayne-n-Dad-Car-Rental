import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { navigate } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('shayne_cookie_consent');
      if (!consent) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('shayne_cookie_consent', 'accepted');
    } catch {
      // storage
    }
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('shayne_cookie_consent', 'essential_only');
    } catch {
      // storage
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 sm:bottom-4 left-0 sm:left-4 z-50 max-w-md w-full p-4 bg-white border border-[#D9DBE8] shadow-2xl rounded-xs text-xs text-[#2E2E2E] animate-fadeIn"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-[#00005E] shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="leading-relaxed">
            We use essential cookies to maintain your booking session and live availability. Compliant with Zimbabwe's Cyber and Data Protection Act.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-[#00005E] hover:bg-[#05053A] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3.5 py-1.5 border border-[#D9DBE8] hover:border-[#6B6E80] text-[#2E2E2E] text-[11px] font-semibold uppercase tracking-wider rounded-xs"
            >
              Essential Only
            </button>
            <button
              onClick={() => navigate('/privacy-policy')}
              className="text-[11px] text-[#6B6E80] hover:text-[#00005E] underline"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
