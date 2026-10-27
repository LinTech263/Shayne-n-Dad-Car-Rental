import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { servicesList, navigate } = useApp();

  return (
    <div className="bg-white min-h-screen">
      {/* Services Header */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Tailored Fleet Solutions</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Car Rental &amp; Mobility Services in Harare
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            From flexible self-drive options and chauffeur-driven protocol to tracked airport transfers and long-term corporate leasing. Everything delivered with excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((svc, idx) => (
              <article
                key={svc.id}
                onClick={() => navigate(`/services/${svc.slug}`)}
                className="bg-white border border-[#D9DBE8] rounded-xs p-6 hover:border-[#00005E] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-lg text-[#B71C24]">
                      0{idx + 1}.
                    </span>
                    <span className="text-[11px] font-semibold text-[#00005E] uppercase tracking-wider">
                      Harare Service
                    </span>
                  </div>

                  <h2 className="text-xl font-serif font-bold text-[#00005E] group-hover:text-[#B71C24] transition-colors">
                    {svc.title}
                  </h2>

                  <p className="text-xs text-[#6B6E80] leading-relaxed">
                    {svc.shortDesc}
                  </p>

                  <div className="pt-2 border-t border-[#D9DBE8]/60 space-y-1.5">
                    {svc.benefits.slice(0, 3).map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-[11px] text-[#2E2E2E]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1F6B4A] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9DBE8] flex items-center justify-between text-xs font-semibold text-[#00005E] group-hover:text-[#B71C24]">
                  <span>View Details &amp; Rates</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>

          {/* Reassurance Banner */}
          <div className="mt-16 bg-[#F4F5FA] border border-[#D9DBE8] p-8 rounded-xs text-center space-y-3">
            <h3 className="font-serif font-bold text-xl text-[#00005E]">
              Need a bespoke corporate or long-term package?
            </h3>
            <p className="text-xs text-[#6B6E80] max-w-xl mx-auto">
              We accommodate special itineraries, cross-border permits on request, multi-car event convoys, and structured monthly invoicing for NGOs and companies.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-2.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
              >
                Discuss Custom Requirements
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
