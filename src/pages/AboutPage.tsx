import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { CarImageSlot } from '../components/common/CarImageSlot';
import { Shield, Clock, MapPin, Award, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate, settings } = useApp();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Our Story &amp; Ethos</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            About Shayne'n'Dad Car Rental
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Driven by excellence. Built on a simple, enduring standard: renting a car should feel as good as arriving in one.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  Harare Automotive Concierge
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00005E]">
                  Posh uptown quality, personal accountability.
                </h2>
                <SignatureBar className="w-16" />
              </div>

              <div className="text-xs sm:text-sm text-[#2E2E2E] leading-relaxed space-y-4">
                <p className="font-serif text-base italic text-[#00005E]">
                  “Shayne'n'Dad Car Rental is a Harare car hire company built on a simple idea: renting a car should feel as good as arriving in one.”
                </p>

                <p>
                  Operating from our primary depot at 1 Drayton Avenue, Greencroft, we serve corporate executives, diaspora families returning home through Harare International Airport, diplomats, wedding couples, and local clients who require dependable, immaculate vehicles.
                </p>

                <p>
                  We deliberately reject the sterile corporate rental model where customers are treated as invoice numbers. When you telephone or message on WhatsApp, you speak directly to the individuals who care for the fleet. Every car is hand-valeted, thoroughly road-tested, and checked for cold air-conditioning, fluid integrity, and tyre condition before handover.
                </p>

                <p>
                  Our motto printed under our crest—<em className="font-semibold text-[#00005E]">driven by excellence...</em>—is not a marketing slogan; it is the daily operational metric by which we measure every customer journey.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D9DBE8]">
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#00005E]">7 Days a Week</strong>
                  <span className="text-xs text-[#6B6E80]">Open every day from 07:00 to 18:00</span>
                </div>
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#00005E]">Greencroft Depot</strong>
                  <span className="text-xs text-[#6B6E80]">Off Lomagundi corridor in Harare</span>
                </div>
              </div>
            </div>

            {/* Visual Slot */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-[#D9DBE8] rounded-2xl overflow-hidden shadow-xl">
                <CarImageSlot
                  src="/vehicle-photos/hero-fleet.jpg"
                  alt="Shayne'n'Dad Executive Fleet in Harare"
                  aspectRatio="4/3"
                  carName="Greencroft Operations & Fleet"
                  categoryName="1 Drayton Ave, Harare"
                />
              </div>

              <div className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xl text-xs text-[#6B6E80] text-center">
                <p className="font-serif italic text-[#00005E] text-sm mb-1">
                  driven by excellence...
                </p>
                <p>
                  Hand-valeted, mechanically vetted, and delivered across Harare 7 days a week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Operation */}
      <section className="py-16 bg-[#F4F5FA] border-t border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
              Our Commitments
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00005E]">
              What you can count on every time.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="bg-white border border-[#D9DBE8] p-6 rounded-xs space-y-3">
              <Shield className="w-5 h-5 text-[#B71C24]" />
              <h3 className="font-serif font-bold text-base text-[#00005E]">
                Total Transparency
              </h3>
              <p className="text-[#6B6E80] leading-relaxed">
                Zero surprise charges. You see daily rates, insurance, deposit, and delivery fees itemised line-by-line before paying.
              </p>
            </div>

            <div className="bg-white border border-[#D9DBE8] p-6 rounded-xs space-y-3">
              <Clock className="w-5 h-5 text-[#B71C24]" />
              <h3 className="font-serif font-bold text-base text-[#00005E]">
                Flight-Tracked Punctuality
              </h3>
              <p className="text-[#6B6E80] leading-relaxed">
                We monitor incoming flights to Robert Gabriel Mugabe Airport. Even with delays, your vehicle is ready on arrival.
              </p>
            </div>

            <div className="bg-white border border-[#D9DBE8] p-6 rounded-xs space-y-3">
              <MapPin className="w-5 h-5 text-[#B71C24]" />
              <h3 className="font-serif font-bold text-base text-[#00005E]">
                Harare-Wide Handover
              </h3>
              <p className="text-[#6B6E80] leading-relaxed">
                Greencroft collection, hotel delivery, or residential handover. We bring the vehicle directly to your doorstep.
              </p>
            </div>

            <div className="bg-white border border-[#D9DBE8] p-6 rounded-xs space-y-3">
              <CheckCircle className="w-5 h-5 text-[#B71C24]" />
              <h3 className="font-serif font-bold text-base text-[#00005E]">
                Mechanical Vigilance
              </h3>
              <p className="text-[#6B6E80] leading-relaxed">
                Every vehicle completes a multi-point safety verification before keys change hands. Backed by 24/7 recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-[#00005E] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-serif font-bold">
            Ready to experience Harare’s finest car hire?
          </h2>
          <p className="text-xs sm:text-sm text-[#D9DBE8] font-light">
            Check live fleet availability or chat with our Greencroft team on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/cars')}
              className="px-6 py-2.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
            >
              Browse Fleet
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2.5 border border-white/40 text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider rounded-xs"
            >
              Contact Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
