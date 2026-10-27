import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';

export const TermsPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Legal Website Terms</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Terms of Website Use
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Terms governing the use of the Shayne'n'Dad Car Rental online booking platform, fleet listings, and digital reservation tools.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              1. Platform Usage
            </h2>
            <p>
              By accessing the website and digital booking services of Shayne'n'Dad Car Rental, you agree to comply with these terms of use. The platform is provided to verify fleet availability, calculate genuine quotations, reserve vehicles, and manage payments.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              2. Accuracy of Information &amp; Rate Quotes
            </h2>
            <p>
              While we endeavour to maintain exact real-time calendar availability and pricing, vehicle allocation is subject to final verification and security deposit clearance. In the rare event of an operational conflict, we provide equivalent or superior vehicle upgrades at no additional charge.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              3. Intellectual Property
            </h2>
            <p>
              The Shayne'n'Dad Car Rental brand crest, wordmark, logo, tagline (“driven by excellence...”), website copy, and editorial guides are the proprietary intellectual property of Shayne'n'Dad Car Rental.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              4. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Republic of Zimbabwe. Any legal disputes arising in relation to this platform or vehicle hire contracts shall be subject to the jurisdiction of the courts of Zimbabwe.
            </p>
          </div>

          <div className="pt-6 border-t border-[#D9DBE8] flex items-center justify-between text-xs text-[#6B6E80]">
            <span>Shayne'n'Dad Car Rental · 1 Drayton Ave, Greencroft, Harare</span>
            <button onClick={() => navigate('/')} className="text-[#00005E] font-semibold hover:underline">
              Return to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
