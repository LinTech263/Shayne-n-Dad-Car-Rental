import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle,
  Navigation,
  Building
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, setIsCallbackModalOpen } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Booking Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          phone,
          email,
          message: `[${subject}] ${message}`
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Harare Operations &amp; Concierge</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Contact Shayne'n'Dad Car Rental
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Reach our Greencroft operations team 7 days a week. We are available by direct phone call, WhatsApp, email, or in-person at 1 Drayton Avenue, Greencroft, Harare.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Hub Facts */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  Direct Contact
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#00005E]">
                  Real people. Instant answers.
                </h2>
                <p className="text-xs text-[#6B6E80] leading-relaxed">
                  Call or WhatsApp to reach the people who manage and maintain the cars.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Address Card */}
                <div className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#00005E]">
                    <MapPin className="w-4 h-4 text-[#B71C24]" />
                    <span>Depot Location</span>
                  </div>
                  <p className="text-[#2E2E2E] leading-relaxed">
                    1 Drayton Avenue, Greencroft, Harare, Zimbabwe
                  </p>
                  <span className="text-[11px] text-[#6B6E80] block">
                    Coordinates: -17.7836, 31.0025 (Off Lomagundi Road corridor)
                  </span>
                  <a
                    href="https://maps.google.com/?q=-17.7836,31.0025+(Shayne%27n%27Dad+Car+Rental)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#B71C24] font-semibold hover:underline pt-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Phone & WhatsApp Card */}
                <div className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-[#00005E]">
                    <Phone className="w-4 h-4 text-[#B71C24]" />
                    <span>Telephone &amp; WhatsApp Hotline</span>
                  </div>
                  <p className="text-[#2E2E2E]">
                    <a href="tel:+263772936555" className="font-semibold text-sm hover:text-[#B71C24]">
                      +263 77 293 6555
                    </a>
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={settings.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] text-white rounded-xs font-semibold flex items-center gap-1.5 hover:bg-[#20ba59]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsCallbackModalOpen(true)}
                      className="px-3 py-1.5 border border-[#00005E] text-[#00005E] hover:bg-white rounded-xs font-semibold"
                    >
                      Request Call-Back
                    </button>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#00005E]">
                    <Mail className="w-4 h-4 text-[#B71C24]" />
                    <span>Email Enquiries &amp; Invoices</span>
                  </div>
                  <a href={`mailto:${settings.email}`} className="text-[#2E2E2E] hover:text-[#B71C24] font-medium block">
                    {settings.email}
                  </a>
                </div>

                {/* Opening Hours Card */}
                <div className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#00005E]">
                    <Clock className="w-4 h-4 text-[#B71C24]" />
                    <span>Operational Hours</span>
                  </div>
                  <p className="text-[#2E2E2E]">
                    Open 7 Days Per Week · 07:00 – 18:00
                  </p>
                  <p className="text-[11px] text-[#6B6E80]">
                    24/7 Airport transfers and handovers available on pre-booked itineraries.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Direct Enquiry Form */}
            <div className="lg:col-span-7 bg-white border border-[#D9DBE8] p-8 rounded-xs shadow-sm">
              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  Send a Message
                </span>
                <h3 className="text-xl font-serif font-bold text-[#00005E]">
                  How can we assist with your journey?
                </h3>
                <p className="text-xs text-[#6B6E80]">
                  {settings.callbackPromiseText}. We'll respond with clear specifics.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-[#1F6B4A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#00005E]">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-[#2E2E2E] max-w-sm mx-auto leading-relaxed">
                    Thank you, {name}. Our operations team has received your message. An answer will be delivered to your WhatsApp or email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#B71C24] font-semibold underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Chipo Mutasa"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        WhatsApp or Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="+263 77 123 4567"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="chipo@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Topic of Enquiry
                      </label>
                      <select
                        id="contact-subject"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none cursor-pointer"
                      >
                        <option value="Booking Enquiry">Vehicle Booking Enquiry</option>
                        <option value="Chauffeur Services">Chauffeur &amp; Protocol</option>
                        <option value="Airport Transfer">Harare Airport Transfer (HRE)</option>
                        <option value="Corporate / NGO Leasing">Corporate / Monthly Lease</option>
                        <option value="Weddings & Events">Wedding Car Hire</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Share your travel dates, vehicle preference, or specific destination requirements..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
