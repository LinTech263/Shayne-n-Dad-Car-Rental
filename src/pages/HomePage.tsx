import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { AvailabilitySearchBar } from '../components/common/AvailabilitySearchBar';
import { CarCard } from '../components/cars/CarCard';
import { initialTestimonials } from '../data/testimonials';
import {
  Shield,
  Clock,
  Car,
  Wrench,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  MapPin,
  Calendar,
  Send,
  Star,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigate,
    cars,
    servicesList,
    guidesList,
    settings,
    openEnquiryModal
  } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Quick enquiry form state
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickCar, setQuickCar] = useState('general');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const featuredCars = cars.filter(c => c.featured);
  const previewTestimonials = initialTestimonials.filter(t => t.featured).slice(0, 3);

  const homeFaqs = [
    {
      q: "What do I need to hire a car in Harare?",
      a: "An original, valid driver's licence held for at least two years, a valid national ID card or international passport, and the refundable security deposit. Digital copies can be submitted online during checkout or presented at pickup."
    },
    {
      q: "Can I pay using EcoCash or international cards?",
      a: "Yes. We accept EcoCash, OneMoney, Telecash, and Visa/Mastercard payments online via our secure Paynow Zimbabwe gateway, as well as cash or card swipe at our Greencroft office."
    },
    {
      q: "How does the refundable security deposit work?",
      a: "Deposits range from $150 to $350 based on vehicle class. The deposit is held during the rental for incidental fuel or traffic penalties, and is released immediately following return inspection."
    },
    {
      q: "Do you deliver vehicles to Robert Gabriel Mugabe International Airport?",
      a: "Yes! We track your incoming flight and meet you curbside or inside arrivals at Harare International Airport (HRE). We also offer doorstep delivery to hotels and residences across Harare."
    },
    {
      q: "Is comprehensive insurance included in the daily rate?",
      a: "Yes. Every rental includes comprehensive insurance cover with clearly defined excess limits and 24/7 roadside assistance."
    }
  ];

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: quickName,
          phone: quickPhone,
          carSlug: quickCar,
          message: quickMessage
        })
      });
      setQuickSubmitted(true);
    } catch {
      setQuickSubmitted(true);
    }
  };

  return (
    <div className="bg-[#F4F5FA] text-[#2E2E2E]">
      {/* ========================================================
          HERO SECTION (Editorial Split Showcase + Animations)
          ======================================================== */}
      <section className="relative bg-gradient-to-b from-[#00005E] via-[#05053A] to-[#0A0D26] text-white pt-12 pb-24 md:pt-18 md:pb-28 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-32 -right-32 w-[550px] h-[550px] bg-[#B71C24]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle swoosh curve line in background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg viewBox="0 0 1440 600" fill="none" className="w-full h-full object-cover">
            <path
              d="M-100 500 C 300 450, 600 100, 1100 150 C 1300 170, 1500 350, 1600 450"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Editorial Copy */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Eyebrow with Signature Bar */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9DBE8] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B71C24] animate-pulse" />
                  <span>Shayne'n'Dad Car Rental · Greencroft, Harare</span>
                </span>
                <SignatureBar isLight={true} className="w-28" />
              </div>

              {/* Huge Serif Headline with Italic Energy */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] text-balance">
                Harare’s finest cars.{' '}
                <span className="italic font-normal text-[#D9DBE8]">Ready</span> when you are.
              </h1>

              {/* Sub-headline */}
              <p className="text-sm sm:text-base md:text-lg text-[#D9DBE8] leading-relaxed max-w-2xl font-light">
                Executive sedans, luxury SUVs and rugged double cabs. Self-drive or with a discreet chauffeur. Hand-delivered to your residence, hotel, or Robert Gabriel Mugabe International Airport.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#D9DBE8]">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B71C24]" />
                  <span>Comprehensive Insurance</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#B71C24]" />
                  <span>Open 7 Days a Week</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <Car className="w-3.5 h-3.5 text-[#B71C24]" />
                  <span>Curbside Airport Delivery</span>
                </span>
              </div>

              {/* Dual CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/cars')}
                  className="px-6 py-3.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 border border-white/30 hover:border-white text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-2 hover:bg-white/10 backdrop-blur-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Hero Showcase Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="relative group rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md shadow-2xl p-2.5">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#00005E]">
                  <img
                    src="/cars/hero-fleet.jpg"
                    alt="Shayne'n'Dad Luxury Fleet Harare"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Fleet Available</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-[#00005E]/80 backdrop-blur-md border border-white/20">
                      Greencroft, Harare
                    </span>
                  </div>

                  {/* Bottom Float Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-[#E5A823] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-xs font-semibold text-white ml-1.5">4.9 / 5.0 Rating</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-white">
                      Driven by excellence...
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                      Mercedes E-Class, ML SUV, Hilux 4x4 Double Cab &amp; more.
                    </p>
                  </div>
                </div>

                {/* Quick Fleet Model Pills */}
                <div className="pt-3 px-1 pb-1 flex items-center justify-between text-[11px] text-[#D9DBE8]">
                  <span className="hover:text-white cursor-pointer" onClick={() => navigate('/cars/mercedes-benz-e-class')}>Mercedes-Benz</span>
                  <span className="text-white/30">·</span>
                  <span className="hover:text-white cursor-pointer" onClick={() => navigate('/cars/toyota-hilux-double-cab')}>Toyota Hilux</span>
                  <span className="text-white/30">·</span>
                  <span className="hover:text-white cursor-pointer" onClick={() => navigate('/cars/nissan-x-trail')}>Nissan X-Trail</span>
                  <span className="text-white/30">·</span>
                  <span className="hover:text-white cursor-pointer" onClick={() => navigate('/cars/honda-fit')}>Honda Fit</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Availability Search Bar Docked at Bottom of Hero */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-16"
          >
            <AvailabilitySearchBar isDarkTheme={false} />
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          TRUST STRIP
          ======================================================== */}
      <section className="bg-white border-b border-[#D9DBE8] py-5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs text-[#2E2E2E]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#B71C24]" />
              <span className="font-semibold">Comprehensive Insurance Included</span>
            </div>
            <span className="hidden sm:inline text-[#D9DBE8]">·</span>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#B71C24]" />
              <span className="font-semibold">24/7 Road Assistance in Harare</span>
            </div>
            <span className="hidden sm:inline text-[#D9DBE8]">·</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B71C24]" />
              <span className="font-semibold">Open 7 Days (07:00 – 18:00)</span>
            </div>
            <span className="hidden sm:inline text-[#D9DBE8]">·</span>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#B71C24]" />
              <span className="font-semibold">Airport &amp; Hotel Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          01 THE FLEET (Animated Cards with Real Images)
          ======================================================== */}
      <section className="py-20 bg-[#F4F5FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B71C24]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  01 The Fleet
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00005E] tracking-tight">
                Choose the drive that suits the day.
              </h2>
              <p className="text-sm text-[#6B6E80] leading-relaxed">
                From an immaculate executive sedan for diplomatic meetings to a heavy-duty 4x4 double cab for the Zambezi valley. Every car shows live availability, so you only see what you can actually book.
              </p>
            </div>

            <div>
              <button
                onClick={() => navigate('/cars')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00005E] hover:bg-[#05053A] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>View Full Fleet ({cars.length} vehicles)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Fleet Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </motion.div>

          {/* Category Navigation Links */}
          <div className="mt-12 pt-8 border-t border-[#D9DBE8] flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-semibold text-[#6B6E80] uppercase tracking-wider text-[11px]">
              Explore by vehicle class:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/cars/executive-sedans')}
                className="hover:text-[#B71C24] transition-colors cursor-pointer"
              >
                Executive Sedans
              </button>
              <span>·</span>
              <button
                onClick={() => navigate('/cars/suvs-crossovers')}
                className="hover:text-[#B71C24] transition-colors cursor-pointer"
              >
                SUVs &amp; Crossovers
              </button>
              <span>·</span>
              <button
                onClick={() => navigate('/cars/double-cabs-4x4')}
                className="hover:text-[#B71C24] transition-colors cursor-pointer"
              >
                Double Cabs &amp; 4x4s
              </button>
              <span>·</span>
              <button
                onClick={() => navigate('/cars/economy-city-cars')}
                className="hover:text-[#B71C24] transition-colors cursor-pointer"
              >
                Economy City Cars
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          02 VERIFIED CLIENT TESTIMONIALS (Dedicated Feature)
          ======================================================== */}
      <section className="py-20 bg-white border-y border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B71C24]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  02 Client Experiences
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00005E] tracking-tight">
                Proven by word of mouth in Harare.
              </h2>
              <p className="text-sm text-[#6B6E80] leading-relaxed">
                Read what corporate delegates, returning diaspora families landing at Harare International Airport, and local clients have to say about our fleet and punctuality.
              </p>
            </div>

            <div>
              <button
                onClick={() => navigate('/testimonials')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Read All Testimonials &amp; Submit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewTestimonials.map((t, idx) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#F4F5FA] rounded-2xl p-7 border border-[#D9DBE8] flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:border-[#00005E]/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#E5A823]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Hire</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2E2E2E] leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9DBE8]/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#00005E]">{t.name}</h3>
                    <p className="text-[11px] text-[#6B6E80]">{t.roleOrCompany} · {t.location}</p>
                  </div>
                  <span className="text-[10px] text-[#B71C24] font-semibold">{t.carHired}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          03 SERVICES
          ======================================================== */}
      <section className="py-20 bg-[#F4F5FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B71C24]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                03 Rental Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00005E] tracking-tight">
              More than just handing over keys.
            </h2>
            <p className="text-sm text-[#6B6E80] leading-relaxed">
              Every service is designed around how people actually travel in Zimbabwe.
            </p>
          </div>

          <div className="divide-y divide-[#D9DBE8] border-y border-[#D9DBE8] bg-white rounded-2xl overflow-hidden shadow-xs">
            {servicesList.map((svc, idx) => (
              <div
                key={svc.id}
                onClick={() => navigate(`/services/${svc.slug}`)}
                className="py-5 sm:py-6 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F4F5FA] transition-colors cursor-pointer group"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-serif text-lg font-bold text-[#B71C24] shrink-0">
                    0{idx + 1}.
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#00005E] group-hover:text-[#B71C24] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-[#6B6E80] mt-1 max-w-2xl leading-relaxed">
                      {svc.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#00005E] group-hover:text-[#B71C24] shrink-0 self-end md:self-center">
                  <span>Explore service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          04 WHY SHAYNE'N'DAD (Proof Points + Executive Image)
          ======================================================== */}
      <section className="py-20 bg-[#05053A] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: 5 Numbered Proof Points */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B71C24]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8]">
                    04 Why Shayne'n'Dad
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  Five reasons clients come back.
                </h2>
                <SignatureBar isLight={true} className="w-20" />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <span className="font-serif text-base font-bold text-[#B71C24] shrink-0 pt-0.5">1.</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Real people, real answers.</h4>
                    <p className="text-xs text-[#D9DBE8]/80 leading-relaxed mt-0.5">
                      Call or WhatsApp and you reach the people who run the cars. No automated call centres.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-serif text-base font-bold text-[#B71C24] shrink-0 pt-0.5">2.</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Clear, transparent pricing.</h4>
                    <p className="text-xs text-[#D9DBE8]/80 leading-relaxed mt-0.5">
                      You see the daily rate, extras, deposit and total before you pay. No deductions sprung at return.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-serif text-base font-bold text-[#B71C24] shrink-0 pt-0.5">3.</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Covered on Zimbabwean roads.</h4>
                    <p className="text-xs text-[#D9DBE8]/80 leading-relaxed mt-0.5">
                      Comprehensive insurance and 24/7 Harare recovery assistance are included on every reservation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-serif text-base font-bold text-[#B71C24] shrink-0 pt-0.5">4.</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">We deliver directly to you.</h4>
                    <p className="text-xs text-[#D9DBE8]/80 leading-relaxed mt-0.5">
                      Door-step delivery and collection to your home, hotel, or office, plus Robert Gabriel Mugabe Airport meet-and-greet.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-serif text-base font-bold text-[#B71C24] shrink-0 pt-0.5">5.</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Open seven days a week.</h4>
                    <p className="text-xs text-[#D9DBE8]/80 leading-relaxed mt-0.5">
                      Because travel doesn't keep banking hours. Our operations desk is staffed every day from 07:00 to 18:00.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Real Executive Car Image + Pull Quote */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative aspect-[16/9] group bg-black/40">
                <img
                  src="/cars/mercedes-e-class.jpg"
                  alt="Mercedes-Benz E-Class Executive Hire in Harare"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B71C24]">Featured Executive</span>
                  <p className="text-sm font-serif font-bold text-white">Mercedes-Benz E-Class</p>
                  <p className="text-[11px] text-white/80">Available with vetted chauffeur or self-drive</p>
                </div>
              </div>

              <div className="border border-white/20 p-6 rounded-2xl bg-[#00005E]/60 backdrop-blur-md relative">
                <span className="font-serif text-4xl text-[#B71C24] leading-none block mb-2">“</span>
                <p className="font-serif text-base sm:text-lg italic text-white leading-relaxed mb-3">
                  The vehicle was delivered to our Borrowdale hotel spotless and on time. Direct WhatsApp communication with the Greencroft management team gave our international delegation complete peace of mind.
                </p>
                <div className="pt-3 border-t border-white/10 text-xs">
                  <strong className="block text-white font-semibold">T. Makoni</strong>
                  <span className="text-[#D9DBE8]/70">Corporate Mining Delegation · Harare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          05 MAKE AN OFFER / ASK A QUESTION
          ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F4F5FA] border border-[#D9DBE8] p-8 sm:p-12 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B71C24]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                    05 Make an Offer / Enquire
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00005E] tracking-tight">
                  Not ready to book yet? Tell us what you have in mind.
                </h2>

                <p className="text-xs text-[#2E2E2E] leading-relaxed">
                  Pick a car, share your dates and, if you like, the price you’d like to pay. We’ll come back to you with an answer, not a sales pitch.
                </p>

                <div className="pt-2 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#1F6B4A] font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>{settings.callbackPromiseText}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6E80]">
                    <Clock className="w-4 h-4 text-[#B71C24]" />
                    <span>Open 7 days a week: 07:00 – 18:00</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={settings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#20ba59] transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Or WhatsApp Us Directly</span>
                  </a>
                </div>
              </div>

              {/* Form Side */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9DBE8] shadow-xs">
                {quickSubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 bg-emerald-50 text-[#1F6B4A] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#00005E]">
                      Enquiry Received
                    </h3>
                    <p className="text-xs text-[#2E2E2E]">
                      Thank you! {settings.callbackPromiseText}. We will WhatsApp or call you on <strong className="font-semibold">{quickPhone}</strong>.
                    </p>
                    <button
                      onClick={() => setQuickSubmitted(false)}
                      className="mt-2 text-xs text-[#B71C24] font-semibold underline cursor-pointer"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tendai Masuku"
                          value={quickName}
                          onChange={e => setQuickName(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                          Phone or WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+263 77 000 0000"
                          value={quickPhone}
                          onChange={e => setQuickPhone(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Car of Interest
                      </label>
                      <select
                        value={quickCar}
                        onChange={e => setQuickCar(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] focus:border-[#00005E] outline-none cursor-pointer"
                      >
                        <option value="general">General Fleet Enquiry</option>
                        {cars.map(c => (
                          <option key={c.id} value={c.slug}>
                            {c.name} (${c.dailyRate}/day)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Your Proposed Dates &amp; Offer (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. 5 days from 10 November for a Chinhoyi site trip. Willing to offer $110/day..."
                        value={quickMessage}
                        onChange={e => setQuickMessage(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] focus:border-[#00005E] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Send My Enquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FAQ PREVIEW (Accordion)
          ======================================================== */}
      <section className="py-20 bg-[#F4F5FA] border-t border-[#D9DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
              Frequently Answered
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#00005E]">
              Clear answers before you hire.
            </h2>
            <p className="text-xs text-[#6B6E80]">
              Everything you need to know about requirements, deposits, fuel, and handover in Harare.
            </p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#D9DBE8] rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#00005E] hover:text-[#B71C24] transition-colors cursor-pointer"
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B6E80] transition-transform duration-200 shrink-0 ${
                      activeFaq === idx ? 'rotate-180 text-[#B71C24]' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[#2E2E2E] leading-relaxed border-t border-[#D9DBE8]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/faq')}
              className="text-xs font-semibold text-[#00005E] hover:text-[#B71C24] underline underline-offset-4 cursor-pointer"
            >
              View all rental questions &amp; answers →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          CLOSING BOOKING BAND (Deep Navy Section)
          ======================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#00005E] to-[#05053A] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8]">
              Reserve Online in Minutes
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Your next journey starts here.
            </h2>
            <p className="text-sm text-[#D9DBE8]/90 font-light">
              Choose your dates and see what’s available today. Pay with EcoCash or card with instant receipt.
            </p>
          </div>

          <div className="pt-4 max-w-4xl mx-auto text-left">
            <AvailabilitySearchBar isDarkTheme={true} />
          </div>
        </div>
      </section>
    </div>
  );
};
