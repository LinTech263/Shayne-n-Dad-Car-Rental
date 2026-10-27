import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { calculateRentalDays } from '../utils/pricing';
import { Tag, Calendar, MessageCircle, Send, CheckCircle, Shield } from 'lucide-react';

export const EnquirePage: React.FC = () => {
  const { cars, settings } = useApp();

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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCar = cars.find(c => c.slug === carSlug);
  const days = calculateRentalDays(startDate, '09:00', endDate, '09:00');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          carName: selectedCar ? selectedCar.name : 'General Fleet Enquiry',
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

  const handleWhatsApp = () => {
    const text = `Hello Shayne'n'Dad, my name is ${fullName || 'a client'}. I would like to make an offer on the ${selectedCar ? selectedCar.name : 'a rental car'} for ${days} days from ${startDate || 'unspecified'} to ${endDate || 'unspecified'}. ${offerPrice ? `Proposed rate: $${offerPrice}/day.` : ''} ${message}`;
    window.open(`https://wa.me/263772936555?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Bespoke Quotations &amp; Offers</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Make an Offer or Request a Quote
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Planning an extended stay, corporate assignment, or multi-day road trip? Propose your desired vehicle, dates and rate. We respond with a real commercial decision, not automated sales copy.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F4F5FA] border border-[#D9DBE8] p-8 sm:p-10 rounded-xs shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-[#1F6B4A] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#00005E]">
                  Enquiry &amp; Offer Received
                </h2>
                <p className="text-xs sm:text-sm text-[#2E2E2E] max-w-md mx-auto leading-relaxed">
                  Thank you, {fullName}. Our operations manager will review your dates and offer. {settings.callbackPromiseText}. We will reach you on <strong className="font-semibold">{phone}</strong>.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continue on WhatsApp Now</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#00005E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#00005E] mb-1">
                    Your Trip Specifics
                  </h2>
                  <p className="text-xs text-[#6B6E80]">
                    {settings.callbackPromiseText}.
                  </p>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label htmlFor="enquire-car" className="block text-xs font-semibold text-[#2E2E2E] mb-1.5">
                    Vehicle of Interest
                  </label>
                  <select
                    id="enquire-car"
                    value={carSlug}
                    onChange={e => setCarSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none cursor-pointer"
                  >
                    <option value="general">General Fleet Advice / Undecided</option>
                    {cars.map(c => (
                      <option key={c.id} value={c.slug}>
                        {c.name} (${c.dailyRate}/day regular rate)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="enquire-start" className="block text-xs font-semibold text-[#2E2E2E] mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B71C24]" />
                      <span>Pick-up Date</span>
                    </label>
                    <input
                      id="enquire-start"
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="enquire-end" className="block text-xs font-semibold text-[#2E2E2E] mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B71C24]" />
                      <span>Return Date ({days} {days === 1 ? 'day' : 'days'})</span>
                    </label>
                    <input
                      id="enquire-end"
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none"
                    />
                  </div>
                </div>

                {/* Proposed Offer & Chauffeur */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label htmlFor="enquire-offer" className="block text-xs font-semibold text-[#2E2E2E] mb-1.5">
                      Your Proposed Rate (Optional USD/day)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs text-[#6B6E80]">$</span>
                      <input
                        id="enquire-offer"
                        type="number"
                        placeholder="e.g. 110"
                        value={offerPrice}
                        onChange={e => setOfferPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2E2E2E]">
                      <input
                        type="checkbox"
                        checked={chauffeurNeeded}
                        onChange={e => setChauffeurNeeded(e.target.checked)}
                        className="w-4 h-4 text-[#B71C24] border-[#D9DBE8] rounded-xs"
                      />
                      <span>Chauffeur driver requested</span>
                    </label>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#D9DBE8]">
                  <div>
                    <label htmlFor="enquire-name" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="enquire-name"
                      type="text"
                      required
                      placeholder="e.g. Simba Sithole"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="enquire-phone" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                      WhatsApp or Phone Number *
                    </label>
                    <input
                      id="enquire-phone"
                      type="tel"
                      required
                      placeholder="+263 77 000 0000"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="enquire-email" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    id="enquire-email"
                    type="email"
                    placeholder="simba@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="enquire-notes" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Itinerary Details or Special Requests
                  </label>
                  <textarea
                    id="enquire-notes"
                    rows={3}
                    placeholder="Any flight arrival times, out-of-town destinations, camping accessories or corporate invoice requirements..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-white focus:border-[#00005E] outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#6B6E80]">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      required
                      className="w-3.5 h-3.5 mt-0.5 text-[#B71C24] border-[#D9DBE8] rounded-xs"
                    />
                    <span>
                      I consent to Shayne'n'Dad Car Rental contacting me via WhatsApp, telephone, or email to discuss this quotation.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Submitting...' : 'Send My Enquiry & Offer'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
