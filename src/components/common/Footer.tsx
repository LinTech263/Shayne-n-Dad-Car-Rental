import React from 'react';
import { useApp } from '../../context/AppContext';
import { SignatureBar } from './SignatureBar';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Wrench,
  CheckCircle2,
  Car,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, settings, categories, servicesList } = useApp();

  return (
    <footer className="bg-[#05053A] text-[#D9DBE8] relative overflow-hidden" aria-label="Site Footer">
      {/* Signature Underline Bar on Top of Footer */}
      <SignatureBar isLight={true} className="w-full" />

      {/* Subtle Swoosh Background Motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#00005E]/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Trust Points Row */}
      <div className="border-b border-white/10 py-8 bg-[#00005E]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-xs">
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Comprehensive Insurance</strong>
                <span className="text-white/60 text-[11px]">Cover included on all hires</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Wrench className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">24/7 Road Assistance</strong>
                <span className="text-white/60 text-[11px]">Rapid Harare support team</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Open 7 Days a Week</strong>
                <span className="text-white/60 text-[11px]">07:00 – 18:00 daily operations</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Car className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Doorstep Delivery</strong>
                <span className="text-white/60 text-[11px]">Hotels, airport, residences</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 col-span-2 md:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">No Hidden Extras</strong>
                <span className="text-white/60 text-[11px]">Itemised pricing upfront</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Plate & Facts */}
          <div className="lg:col-span-4 space-y-5">
            {/* White Plate for Logo */}
            <div className="inline-block bg-white p-2.5 rounded-xs border border-[#D9DBE8]">
              <img
                src="/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg"
                alt="Shayne'n'Dad Car Rental"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-xs leading-relaxed text-[#D9DBE8]/80 max-w-sm">
              Harare’s premier upmarket car rental company. Delivering spotless executive sedans, rugged 4x4 double cabs, and luxury SUVs for self-drive, chauffeur-driven transit, and airport transfers.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
                <span>1 Drayton Avenue, Greencroft, Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B71C24] shrink-0" />
                <a href="tel:+263772936555" className="hover:text-white transition-colors">
                  +263 77 293 6555 (Call &amp; WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B71C24] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B71C24] shrink-0" />
                <span>7 Days a week · 07:00 – 18:00 (24h Airport pre-booked)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xs transition-colors"
              >
                <span>Follow on Facebook (2,600+ community)</span>
                <ExternalLink className="w-3 h-3 text-[#B71C24]" />
              </a>
            </div>
          </div>

          {/* Quick Links & Fleet */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Our Fleet
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate(`/cars/${cat.slug}`)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigate('/cars')}
                  className="text-[#B71C24] hover:text-[#9A151C] font-semibold"
                >
                  View All Fleet →
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Rental Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesList.slice(0, 6).map(svc => (
                <li key={svc.id}>
                  <button
                    onClick={() => navigate(`/services/${svc.slug}`)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigate('/services')}
                  className="text-[#B71C24] hover:text-[#9A151C] font-semibold"
                >
                  All Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Map & Local Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Greencroft Depot
            </h4>
            <div className="bg-[#00005E] border border-white/10 p-3 rounded-xs space-y-2.5">
              <div className="text-[11px] text-[#D9DBE8] flex items-center justify-between">
                <span>Coordinates:</span>
                <span className="font-mono text-white/80">-17.7836, 31.0025</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#D9DBE8]/80">
                Conveniently located off Lomagundi Road in Greencroft. Easy 10-minute access from Avondale, Westgate, and Mount Pleasant.
              </p>
              <a
                href="https://maps.google.com/?q=-17.7836,31.0025+(Shayne%27n%27Dad+Car+Rental)"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#B71C24] hover:underline font-medium"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => navigate('/testimonials')}
                className="block hover:text-white transition-colors"
              >
                Client Testimonials &amp; Reviews →
              </button>
              <button
                onClick={() => navigate('/about')}
                className="block hover:text-white transition-colors"
              >
                About Shayne'n'Dad (Greencroft) →
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="block hover:text-white transition-colors"
              >
                Contact &amp; Harare Directions →
              </button>
              <button
                onClick={() => navigate('/car-hire-harare')}
                className="block hover:text-white transition-colors"
              >
                Harare Hub &amp; Service Suburbs →
              </button>
              <button
                onClick={() => navigate('/guides')}
                className="block hover:text-white transition-colors"
              >
                Harare Driving &amp; Travel Guides →
              </button>
              <button
                onClick={() => navigate('/faq')}
                className="block hover:text-white transition-colors"
              >
                Frequently Asked Questions →
              </button>
            </div>
          </div>
        </div>

        {/* Accepted Payment Marks & Currency */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="text-[#D9DBE8]/70 font-semibold uppercase tracking-wider text-[10px]">
              Payment Methods Accepted:
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs text-[11px] font-semibold text-white">
                EcoCash
              </span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs text-[11px] font-semibold text-white">
                OneMoney
              </span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs text-[11px] font-semibold text-white">
                Telecash
              </span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs text-[11px] font-semibold text-white">
                Visa
              </span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs text-[11px] font-semibold text-white">
                Mastercard
              </span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs text-[11px] font-semibold text-white">
                USD Cash
              </span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <span className="text-sm italic font-serif text-[#D9DBE8] tracking-wide">
              driven by excellence...
            </span>
          </div>
        </div>

        {/* Bottom Small Print & Legal Links */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D9DBE8]/60 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Shayne'n'Dad Car Rental. All rights reserved. Registered in Zimbabwe.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/rental-terms')}
              className="hover:text-white transition-colors"
            >
              Rental Terms &amp; Policies
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/admin')}
              className="text-[#D9DBE8]/70 hover:text-white transition-colors flex items-center gap-1 font-medium"
              title="Shayne'n'Dad Fleet & Dispatch Portal"
            >
              <span>Owner Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
