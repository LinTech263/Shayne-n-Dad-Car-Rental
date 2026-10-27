import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { faqs } from '../data/faq';
import { SignatureBar } from '../components/common/SignatureBar';
import { Search, ChevronDown, MessageCircle, Phone } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { settings, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'payment' | 'insurance' | 'fleet' | 'handover'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Customer Help &amp; Knowledge Base</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Clear, honest answers about hiring a car in Harare. Covering requirements, EcoCash payments, security deposits, and insurance.
          </p>

          {/* FAQ Search Input */}
          <div className="pt-4 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6B6E80] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search questions (e.g. deposit, airport, EcoCash, licence)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs text-[#2E2E2E] bg-white rounded-xs border border-[#D9DBE8] outline-none placeholder:text-[#6B6E80]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Questions Accordion */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#D9DBE8]">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'booking', label: 'Booking & Licence' },
              { id: 'payment', label: 'Payment & Deposits' },
              { id: 'insurance', label: 'Insurance & Breakdown' },
              { id: 'fleet', label: 'Fleet & Chauffeur' },
              { id: 'handover', label: 'Handover & QR' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setOpenIndex(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#00005E] text-white font-semibold'
                    : 'bg-[#F4F5FA] text-[#2E2E2E] hover:bg-[#D9DBE8]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#D9DBE8] rounded-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#00005E] hover:text-[#B71C24] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6B6E80] transition-transform duration-200 shrink-0 ${
                        openIndex === idx ? 'rotate-180 text-[#B71C24]' : ''
                      }`}
                    />
                  </button>
                  {openIndex === idx && (
                    <div className="px-5 pb-5 text-xs text-[#2E2E2E] leading-relaxed border-t border-[#D9DBE8]/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs p-6 space-y-2">
                <p className="text-xs text-[#6B6E80]">
                  No questions matched your search term "{searchTerm}".
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-[#B71C24] font-semibold underline"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>

          {/* Need Direct Assistance Card */}
          <div className="mt-16 bg-[#F4F5FA] border border-[#D9DBE8] p-8 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif font-bold text-lg text-[#00005E]">
                Still have a specific question about your trip?
              </h3>
              <p className="text-xs text-[#6B6E80]">
                Speak directly with our operations desk at 1 Drayton Avenue, Greencroft.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+263772936555"
                className="px-4 py-2 border border-[#00005E] text-[#00005E] hover:bg-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
