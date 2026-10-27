import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Data Protection &amp; Privacy</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            How Shayne'n'Dad Car Rental collects, protects, and handles personal data in accordance with Zimbabwe’s Cyber and Data Protection Act [Chapter 12:07].
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              1. Information We Collect
            </h2>
            <p>
              To process vehicle reservations, verify driver credentials, and meet legal motor vehicle leasing obligations in Zimbabwe, we collect: full legal name, telephone/WhatsApp contact details, residential or hotel address in Harare, driving licence number and copy, and national identity card or international passport details.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              2. How Your Data is Used
            </h2>
            <p>
              Your personal data is used solely to: (1) Confirm and manage vehicle reservations, (2) Verify identity and insurance eligibility, (3) Deliver automated booking receipts and QR codes via WhatsApp or email, and (4) Comply with Zimbabwean traffic regulatory and law enforcement requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              3. WhatsApp Communications &amp; Consent
            </h2>
            <p>
              By providing your telephone number during checkout or enquiry, you consent to receive operational booking notifications, digital PDF receipts, and verification tokens via the WhatsApp Business platform. We strictly do not sell, barter, or distribute your phone number to third-party marketing brokers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              4. Document Storage &amp; Confidentiality
            </h2>
            <p>
              Driver's licence scans and identity files are held in secure, encrypted access-controlled storage accessible exclusively by authorized management and dispatch personnel. Documents are retained only as long as necessary for regulatory compliance and insurance audit requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              5. Your Rights
            </h2>
            <p>
              Under Zimbabwe's data protection legislation, you are entitled to request confirmation of the data we hold regarding your profile, request corrections, or request deletion of data following the conclusion of your hire and settlement of accounts.
            </p>
          </div>

          <div className="pt-6 border-t border-[#D9DBE8] flex items-center justify-between text-xs text-[#6B6E80]">
            <span>Shayne'n'Dad Car Rental · Greencroft, Harare</span>
            <button onClick={() => navigate('/contact')} className="text-[#00005E] font-semibold hover:underline">
              Contact Privacy Officer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
