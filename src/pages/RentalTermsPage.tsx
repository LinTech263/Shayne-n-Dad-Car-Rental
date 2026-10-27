import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { Shield, AlertCircle, FileText } from 'lucide-react';

export const RentalTermsPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Rental Agreement Terms &amp; Policies</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Rental Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Please review the operating terms governing all self-drive and chauffeur-driven hires with Shayne'n'Dad Car Rental in Harare, Zimbabwe.
          </p>
        </div>
      </section>

      {/* Main Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
          <div className="p-4 bg-[#FBECEC] border border-[#B71C24]/30 rounded-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#B71C24] shrink-0 mt-0.5" />
            <div className="text-xs text-[#2E2E2E]">
              <strong className="block text-[#B71C24] font-semibold mb-1">
                Summary for Quick Reference:
              </strong>
              Drivers must be at least 23 years old (25 for executive &amp; 4x4 vehicles) with a licence held for 2+ years. All vehicles include comprehensive insurance. Security deposits are refundable upon undamaged return with full fuel.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              1. Driving Licence &amp; Identity Requirements
            </h2>
            <p>
              The primary renter and any registered additional drivers must present an original, valid physical driver’s licence held for a minimum of two (2) full years. For foreign visitors and diaspora clients, national driving licences printed in English or an International Driving Permit (IDP) accompanied by a valid passport are accepted.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              2. Security Deposit &amp; Payment Settlement
            </h2>
            <p>
              A refundable security deposit ranging between $150 and $350 (depending on vehicle class) is required prior to vehicle release. Deposits can be paid via EcoCash, OneMoney, Visa/Mastercard, or cash. Following return inspection and confirmation of fuel levels and zero traffic violations, the deposit is processed for immediate return.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              3. Fuel Policy (Full-to-Full)
            </h2>
            <p>
              Vehicles are handed over with a full tank of verified quality fuel and must be returned with a full tank. In the event a vehicle is returned with less than a full tank, refuelling will be charged at standard service station rates plus a modest administration refuelling fee deducted from the security deposit.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              4. Insurance &amp; Road Cover
            </h2>
            <p>
              All rates include comprehensive motor vehicle insurance covering third-party liability, fire, and theft, subject to the applicable standard excess. The insurance does not cover gross driver negligence, driving under the influence of alcohol or narcotics, unauthorized off-road driving beyond declared capability, or damage caused by an unregistered driver.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              5. Geographic Restrictions &amp; Borders
            </h2>
            <p>
              Our vehicles are authorized for travel on designated paved and maintained gravel roads across Zimbabwe. If you plan to travel into remote national parks (such as Mana Pools) or out-of-town areas, you must declare this during reservation so an appropriate 4x4 can be assigned. Cross-border travel outside Zimbabwe requires prior written authorisation and cross-border paperwork.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#00005E]">
              6. Cancellation &amp; Booking Amendments
            </h2>
            <p>
              Bookings cancelled more than 24 hours prior to scheduled pick-up receive a full refund or can be converted into rental credit. For cancellations within 24 hours of pick-up, the first day’s rental is retained to cover pre-allocation and preparation costs.
            </p>
          </div>

          <div className="pt-6 border-t border-[#D9DBE8] flex items-center justify-between">
            <span className="text-xs text-[#6B6E80]">
              Last updated: March 2026 · Shayne'n'Dad Car Rental
            </span>
            <button
              onClick={() => navigate('/contact')}
              className="text-xs font-semibold text-[#00005E] hover:text-[#B71C24] underline"
            >
              Contact Legal &amp; Office Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
