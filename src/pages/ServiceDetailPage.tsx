import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { CarCard } from '../components/cars/CarCard';
import {
  ChevronRight,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Shield,
  Clock
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceSlug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceSlug }) => {
  const { servicesList, cars, navigate, settings, openEnquiryModal } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const service = servicesList.find(s => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#00005E]">Service not found</h2>
        <button
          onClick={() => navigate('/services')}
          className="px-5 py-2 bg-[#00005E] text-white text-xs font-semibold rounded-xs"
        >
          Return to Services
        </button>
      </div>
    );
  }

  // Suggest 3 suitable cars for this service
  const suggestedCars = cars.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-1.5 text-xs text-[#D9DBE8]/70" aria-label="Breadcrumb">
            <button onClick={() => navigate('/')} className="hover:text-white">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            <button onClick={() => navigate('/services')} className="hover:text-white">Services</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            <span className="text-white font-medium">{service.title}</span>
          </nav>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Harare Professional Service</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            {service.title} in Harare
          </h1>

          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            {service.headline}
          </p>
        </div>
      </section>

      {/* Overview & Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#00005E]">
                  About this service
                </h2>
                <p className="text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
                  {service.openingParagraph}
                </p>
              </div>

              {/* 5 Concrete Benefit Bullets */}
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-serif font-bold text-[#00005E]">
                  Key Service Highlights
                </h3>
                <div className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-[#2E2E2E]">
                      <CheckCircle className="w-4 h-4 text-[#1F6B4A] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works Mini-Section (3 Steps) */}
              <div className="space-y-6 pt-6 border-t border-[#D9DBE8]">
                <h3 className="text-lg font-serif font-bold text-[#00005E]">
                  How it works
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.howItWorks.map((step, idx) => (
                    <div key={idx} className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-2">
                      <span className="text-base font-serif font-bold text-[#B71C24]">
                        {step.step}.
                      </span>
                      <h4 className="font-semibold text-xs text-[#00005E]">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-[#6B6E80] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Card */}
            <div className="lg:col-span-5 bg-[#F4F5FA] border border-[#D9DBE8] p-6 rounded-xs space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl text-[#00005E]">
                  Book or Enquire About {service.title}
                </h3>
                <p className="text-xs text-[#6B6E80] leading-relaxed">
                  Choose from our live fleet of executive sedans, SUVs, and 4x4 double cabs.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate('/cars')}
                  className="w-full py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Select a Car For This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openEnquiryModal('general', service.title)}
                  className="w-full py-2.5 border border-[#00005E] text-[#00005E] hover:bg-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                >
                  Request a Custom Quote
                </button>

                <a
                  href={`https://wa.me/263772936555?text=${encodeURIComponent(`Hi Shayne'n'Dad, I'd like to book your ${service.title} in Harare.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="border-t border-[#D9DBE8] pt-4 space-y-2 text-xs text-[#6B6E80]">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#B71C24]" />
                  <span>Comprehensive insurance included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B71C24]" />
                  <span>Staffed 7 days a week from 07:00 – 18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs (4 to 6 Questions) */}
      <section className="py-16 bg-[#F4F5FA] border-t border-[#D9DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
              Got Questions?
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#00005E]">
              Frequently Asked About {service.title}
            </h3>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#D9DBE8] rounded-xs overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#00005E] hover:text-[#B71C24] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B6E80] transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-[#B71C24]' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[#2E2E2E] leading-relaxed border-t border-[#D9DBE8]/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Cars for This Service */}
      <section className="py-16 bg-white border-t border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                Recommended Fleet
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#00005E]">
                Vehicles commonly selected for {service.title}
              </h3>
            </div>
            <button
              onClick={() => navigate('/cars')}
              className="text-xs font-semibold text-[#00005E] hover:text-[#B71C24] underline"
            >
              View all fleet →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedCars.map(c => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
