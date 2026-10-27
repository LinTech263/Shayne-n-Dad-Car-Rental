import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, Clock, CheckCircle } from 'lucide-react';

export const CallbackModal: React.FC = () => {
  const { isCallbackModalOpen, setIsCallbackModalOpen, settings } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (08:00 – 12:00)');
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isCallbackModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // anti-spam bot trap

    setLoading(true);
    try {
      await fetch('/api/callback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, preferredTime })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // graceful offline / fallback experience
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsCallbackModalOpen(false);
    setSubmitted(false);
    setName('');
    setPhone('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-modal-title"
    >
      <div className="bg-white rounded-xs border border-[#D9DBE8] max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-[#6B6E80] hover:text-[#00005E] transition-colors rounded-xs focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-[#1F6B4A] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#00005E]">
              We have received your request
            </h3>
            <p className="text-xs text-[#2E2E2E] leading-relaxed">
              {settings.callbackPromiseText}. Our operations manager will ring you on{' '}
              <strong className="text-[#00005E] font-semibold">{phone}</strong>.
            </p>
            <div className="pt-3">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-[#00005E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-[#B71C24]" />
                <h3 id="callback-modal-title" className="text-base font-serif font-bold text-[#00005E]">
                  Request a Call-Back
                </h3>
              </div>
              <p className="text-xs text-[#6B6E80]">
                {settings.callbackPromiseEnabled && (
                  <span className="text-[#1F6B4A] font-semibold block mb-1">
                    ✓ {settings.callbackPromiseText}
                  </span>
                )}
                Leave your Zimbabwean or international phone number, and we'll call you directly.
              </p>
            </div>

            {/* Anti-spam Honeypot field (hidden from real users) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="cb-name" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                Your Full Name
              </label>
              <input
                id="cb-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="e.g. Tendai Moyo"
                className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
              />
            </div>

            <div>
              <label htmlFor="cb-phone" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                Phone or WhatsApp Number
              </label>
              <input
                id="cb-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                placeholder="e.g. +263 77 123 4567"
                className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
              />
            </div>

            <div>
              <label htmlFor="cb-time" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                Preferred Call Window
              </label>
              <select
                id="cb-time"
                value={preferredTime}
                onChange={e => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none cursor-pointer"
              >
                <option value="As soon as possible">As soon as possible (Opening hours)</option>
                <option value="Morning (08:00 – 12:00)">Morning (08:00 – 12:00)</option>
                <option value="Afternoon (12:00 – 16:00)">Afternoon (12:00 – 16:00)</option>
                <option value="Late Afternoon (16:00 – 18:00)">Late Afternoon (16:00 – 18:00)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Request Direct Call'}
              </button>
            </div>

            <p className="text-[10px] text-[#6B6E80] text-center">
              Your details are used solely to return your inquiry. We respect your privacy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
