import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateRentalDays } from '../../utils/pricing';
import { X, Tag, Calendar, User, Phone, Mail, MessageSquare, CheckCircle, MessageCircle } from 'lucide-react';

export const EnquiryOfferModal: React.FC = () => {
  const { enquiryModalData, closeEnquiryModal, cars, settings } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carSlug, setCarSlug] = useState('general');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chauffeurNeeded, setChauffeurNeeded] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (enquiryModalData.isOpen) {
      if (enquiryModalData.carSlug) setCarSlug(enquiryModalData.carSlug);
      if (enquiryModalData.dates?.start) setStartDate(enquiryModalData.dates.start);
      if (enquiryModalData.dates?.end) setEndDate(enquiryModalData.dates.end);
      setSubmitted(false);
    }
  }, [enquiryModalData]);

  if (!enquiryModalData.isOpen) return null;

  const days = calculateRentalDays(startDate, '09:00', endDate, '09:00');
  const selectedCar = cars.find(c => c.slug === carSlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trapped

    setLoading(true);
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          carSlug,
          carName: selectedCar ? selectedCar.name : 'General Enquiry',
          startDate,
          endDate,
          chauffeurNeeded,
          offerPrice,
          message
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Shayne'n'Dad, my name is ${fullName || 'a prospective client'}. I am enquiring about ${selectedCar ? selectedCar.name : 'a rental car'} for ${days} days (${startDate || 'flexible'} to ${endDate || 'flexible'}). ${offerPrice ? `My proposed offer is $${offerPrice}/day.` : ''} ${message}`;
    window.open(`https://wa.me/263772936555?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="bg-white rounded-xs border border-[#D9DBE8] max-w-lg w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={closeEnquiryModal}
          className="absolute top-4 right-4 p-1.5 text-[#6B6E80] hover:text-[#00005E] transition-colors rounded-xs focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-[#1F6B4A] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#00005E]">
              Enquiry &amp; Offer Submitted
            </h3>
            <p className="text-xs text-[#2E2E2E] leading-relaxed max-w-sm mx-auto">
              Thank you, {fullName}. We review every quotation and offer individually. {settings.callbackPromiseText}. An update has been queued for your WhatsApp on <strong className="font-semibold">{phone}</strong>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp Now</span>
              </button>
              <button
                onClick={closeEnquiryModal}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#00005E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#D9DBE8] pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-4 h-4 text-[#B71C24]" />
                <h3 id="enquiry-modal-title" className="text-base font-serif font-bold text-[#00005E]">
                  Make an Offer or Ask a Question
                </h3>
              </div>
              <p className="text-xs text-[#6B6E80]">
                Tell us what you have in mind. We will return with a genuine answer, not a sales pitch.
              </p>
            </div>

            {/* Hidden honeypot */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Car of interest */}
            <div>
              <label htmlFor="enquiry-car" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                Vehicle of Interest
              </label>
              <select
                id="enquiry-car"
                value={carSlug}
                onChange={e => setCarSlug(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none cursor-pointer"
              >
                <option value="general">General Enquiry / Not sure yet</option>
                {cars.map(c => (
                  <option key={c.id} value={c.slug}>
                    {c.name} (${c.dailyRate}/day listed)
                  </option>
                ))}
              </select>
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="enquiry-start" className="block text-[11px] font-semibold text-[#2E2E2E] mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#B71C24]" />
                  <span>Pick-up Date</span>
                </label>
                <input
                  id="enquiry-start"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                />
              </div>
              <div>
                <label htmlFor="enquiry-end" className="block text-[11px] font-semibold text-[#2E2E2E] mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#B71C24]" />
                  <span>Return Date ({days} {days === 1 ? 'day' : 'days'})</span>
                </label>
                <input
                  id="enquiry-end"
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                />
              </div>
            </div>

            {/* Offer price & Chauffeur checkbox */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label htmlFor="enquiry-offer" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Your Proposed Offer (Optional USD/day)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-[#6B6E80]">$</span>
                  <input
                    id="enquiry-offer"
                    type="number"
                    placeholder="e.g. 110"
                    value={offerPrice}
                    onChange={e => setOfferPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 sm:pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2E2E2E]">
                  <input
                    type="checkbox"
                    checked={chauffeurNeeded}
                    onChange={e => setChauffeurNeeded(e.target.checked)}
                    className="w-4 h-4 text-[#B71C24] border-[#D9DBE8] rounded-xs focus:ring-[#B71C24]"
                  />
                  <span>Chauffeur driver needed</span>
                </label>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="enquiry-name" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Full Name *
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  required
                  placeholder="e.g. Rumbidzai Ndlovu"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                />
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  required
                  placeholder="+263 77 000 0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-email" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                Email Address (Optional)
              </label>
              <input
                id="enquiry-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
              />
            </div>

            <div>
              <label htmlFor="enquiry-message" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                Message / Particular Requirements
              </label>
              <textarea
                id="enquiry-message"
                rows={3}
                placeholder="Share any special notes: destination, flight arrival, canopy requirements, or specific requests..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
              />
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#6B6E80]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  required
                  className="w-3.5 h-3.5 mt-0.5 text-[#B71C24] border-[#D9DBE8] rounded-xs focus:ring-[#B71C24]"
                />
                <span>
                  I consent to Shayne'n'Dad Car Rental contacting me via WhatsApp, phone or email regarding this enquiry.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Send My Enquiry & Offer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
