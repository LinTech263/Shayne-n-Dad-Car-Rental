import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import {
  Calendar,
  CreditCard,
  QrCode,
  FileCheck,
  Key,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigate } = useApp();

  const detailedSteps = [
    {
      num: "01",
      icon: Calendar,
      title: "Select your vehicle & dates online",
      desc: "Browse our live fleet of executive sedans, crossovers, and 4x4 double cabs. Every vehicle shows real availability, so you never waste time on unavailable cars.",
      tips: ["Filter by transmission, seats or chauffeur option", "Choose your collection point: Greencroft depot, airport, or hotel"]
    },
    {
      num: "02",
      icon: CreditCard,
      title: "Reserve & pay securely with EcoCash or card",
      desc: "Lock in your booking through our integrated Paynow gateway. We accept EcoCash, OneMoney, Telecash, and Visa/Mastercard with transparent pricing.",
      tips: ["Full itemised price breakdown displayed upfront", "Option to pay in full or pay a deposit with balance at handover"]
    },
    {
      num: "03",
      icon: QrCode,
      title: "Receive WhatsApp receipt & verification QR token",
      desc: "Immediately upon payment confirmation, an official branded PDF receipt and a secure verification QR code are sent straight to your WhatsApp and email.",
      tips: ["Contains your verified booking reference and dates", "Public verification page available for airport or corporate authentication"]
    },
    {
      num: "04",
      icon: Key,
      title: "Vehicle handover & digital condition check",
      desc: "At handover, present your QR code on your smartphone. Our representative conducts a rapid 5-minute digital inspection with photos of mileage and fuel.",
      tips: ["Inspect tyres, fuel level, and bodywork alongside our representative", "Sign the digital rental agreement directly on the device"]
    },
    {
      num: "05",
      icon: ShieldCheck,
      title: "Enjoy your drive with 24/7 roadside cover",
      desc: "Drive with absolute peace of mind across Harare or provincial Zimbabwe. Comprehensive insurance and 24/7 emergency response are active on every mile.",
      tips: ["Operations line active 24/7 (+263 77 293 6555)", "Replacement car dispatched promptly in case of rare breakdown"]
    },
    {
      num: "06",
      icon: FileCheck,
      title: "Return & instant security deposit release",
      desc: "Return the vehicle to Greencroft or have our team collect it from your location. Following a quick inspection, your deposit is processed for release.",
      tips: ["Full-to-full fuel return policy", "Instant digital check-in receipt sent to your phone"]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Rental Process &amp; Verification</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            How Renting With Shayne'n'Dad Works
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            From online reservation to key handover and WhatsApp verification tokens. Everything designed for seamless, trustworthy travel in Harare.
          </p>
        </div>
      </section>

      {/* Step by Step Breakdown */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                The Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00005E]">
                Six simple stages from booking to return.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-white border border-[#D9DBE8] rounded-xs space-y-4 hover:border-[#00005E] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-2xl text-[#B71C24]">
                        {step.num}.
                      </span>
                      <div className="w-9 h-9 bg-[#F4F5FA] rounded-xs flex items-center justify-center text-[#00005E]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#00005E]">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#2E2E2E] leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="pt-3 border-t border-[#D9DBE8]/60 space-y-1.5">
                      {step.tips.map((tip, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-[11px] text-[#6B6E80]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B4A] shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-[#00005E] text-white p-8 sm:p-10 rounded-xs text-center space-y-4">
            <h3 className="text-2xl font-serif font-bold">
              Ready to reserve your vehicle in Harare?
            </h3>
            <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-lg mx-auto">
              Check live calendar availability for your travel dates and receive your verification QR code instantly.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/cars')}
                className="px-6 py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs inline-flex items-center gap-2"
              >
                <span>Check Fleet Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
