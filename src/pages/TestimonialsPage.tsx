import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { initialTestimonials } from '../data/testimonials';
import { TestimonialItem } from '../types';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import {
  Star,
  CheckCircle2,
  Car as CarIcon,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Send,
  X,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { navigate, settings } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // New review form state
  const [formData, setFormData] = useState({
    name: '',
    roleOrCompany: '',
    location: '',
    category: 'corporate' as TestimonialItem['category'],
    carHired: 'Mercedes-Benz E-Class',
    rating: 5,
    quote: ''
  });

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'corporate', label: 'Corporate & NGO' },
    { id: 'diaspora', label: 'Diaspora & Airport' },
    { id: 'wedding', label: 'Weddings & Events' },
    { id: 'safari', label: 'Safari & 4x4' },
    { id: 'local', label: 'Local Hirers' }
  ];

  const filteredTestimonials = activeCategory === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === activeCategory);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;

    const newReview: TestimonialItem = {
      id: `review-${Date.now()}`,
      name: formData.name,
      roleOrCompany: formData.roleOrCompany || 'Private Hirer',
      location: formData.location || 'Harare',
      category: formData.category,
      carHired: formData.carHired,
      rating: formData.rating,
      date: 'Just now',
      quote: formData.quote,
      verifiedBooking: true,
      featured: false
    };

    setTestimonials([newReview, ...testimonials]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        name: '',
        roleOrCompany: '',
        location: '',
        category: 'corporate',
        carHired: 'Mercedes-Benz E-Class',
        rating: 5,
        quote: ''
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F4F5FA] text-[#2E2E2E] pb-24">
      {/* Editorial Header Banner */}
      <section className="bg-gradient-to-b from-[#00005E] via-[#05053A] to-[#0A0D26] text-white pt-14 pb-16 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B71C24]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B71C24] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#B71C24]" />
              <span>Harare Client Experiences</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
              Driven by Excellence. Proven by Word of Mouth.
            </h1>

            <SignatureBar isLight={true} className="w-32 mb-6" />

            <p className="text-base sm:text-lg text-[#D9DBE8] max-w-2xl leading-relaxed mb-8">
              Read uncensored feedback from corporate executives, visiting diaspora families landing at Harare International Airport, wedding planners, and 4x4 expedition hirers.
            </p>

            {/* Credibility Summary Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 max-w-3xl">
              <div>
                <div className="flex items-center gap-1 text-[#E5A823] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-white">4.9 / 5.0</div>
                <div className="text-xs text-[#D9DBE8]/70">Average Hirer Rating</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-semibold">100%</span>
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-white">Verified</div>
                <div className="text-xs text-[#D9DBE8]/70">Authentic Rentals</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-blue-300 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold">7 Days</span>
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-white">Open Weekly</div>
                <div className="text-xs text-[#D9DBE8]/70">Greencroft, Harare</div>
              </div>

              <div className="flex items-center justify-start sm:justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Leave Review</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content & Category Filter */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-[#6B6E80] shrink-0 ml-1 mr-1" />
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#00005E] text-white shadow-sm ring-2 ring-[#00005E]/20'
                  : 'bg-white text-[#2E2E2E] hover:bg-[#EBECEF] border border-[#D9DBE8]'
              }`}
            >
              {cat.label}
              {cat.id === 'all' && ` (${testimonials.length})`}
            </button>
          ))}
        </div>

        {/* Testimonials Masonry / Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredTestimonials.map((t, idx) => (
              <motion.article
                key={t.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-xl p-6 sm:p-7 border border-[#D9DBE8]/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:border-[#00005E]/40"
              >
                <div>
                  {/* Top Bar: Stars & Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#E5A823]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    {t.verifiedBooking && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Rental</span>
                      </span>
                    )}
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base text-[#2E2E2E] leading-relaxed mb-6 font-normal italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Footer: Reviewer Info & Vehicle Tag */}
                <div className="pt-4 border-t border-[#D9DBE8]/50 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#00005E] leading-snug">
                      {t.name}
                    </h3>
                    <p className="text-xs text-[#6B6E80] mt-0.5">
                      {t.roleOrCompany} · <span className="text-[#2E2E2E]">{t.location}</span>
                    </p>
                  </div>

                  {t.carHired && (
                    <div
                      onClick={() => t.carSlug ? navigate(`/cars/${t.carSlug}`) : navigate('/cars')}
                      className="shrink-0 text-right cursor-pointer group-hover:text-[#B71C24] transition-colors"
                      title="View vehicle details"
                    >
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00005E] group-hover:text-[#B71C24]">
                        <CarIcon className="w-3.5 h-3.5" />
                        <span>{t.carHired}</span>
                      </div>
                      <span className="text-[10px] text-[#8C90A4]">{t.date}</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Experience Submission Callout Banner */}
        <section className="mt-14 bg-gradient-to-r from-[#00005E] to-[#121542] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#B71C24]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B71C24] mb-2 block">
              Continuous Improvement
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Have you recently driven with Shayne'n'Dad?
            </h2>
            <p className="text-sm text-[#D9DBE8] mb-6 leading-relaxed">
              Whether you rented a 4x4 double cab for safari, an executive sedan for meetings, or a city hybrid for errands, your direct feedback helps fellow travellers and shapes our concierge service.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Write Your Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border border-white/20 flex items-center gap-2"
              >
                <span>Send WhatsApp Feedback</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1 text-[#6B6E80] hover:text-[#00005E] transition-colors rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#00005E] mb-2">
                    Thank You for Your Review!
                  </h3>
                  <p className="text-sm text-[#6B6E80]">
                    Your feedback has been added to our verified client reviews and shared with our Greencroft management team.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B71C24] block mb-1">
                      Client Review
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#00005E]">
                      Share Your Experience
                    </h3>
                    <p className="text-xs text-[#6B6E80] mt-1">
                      Tell us how your rental in Harare went. Every review is read by our fleet manager.
                    </p>
                  </div>

                  {/* Rating Selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-[#2E2E2E] mb-1.5">
                      Your Overall Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating
                                ? 'fill-[#E5A823] text-[#E5A823]'
                                : 'text-[#D9DBE8]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-[#6B6E80] ml-2">
                        {formData.rating === 5 ? 'Exceptional (5/5)' : `${formData.rating} Stars`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Farai Chidzero"
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#D9DBE8] focus:border-[#00005E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Role or Company (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.roleOrCompany}
                        onChange={(e) => setFormData({ ...formData, roleOrCompany: e.target.value })}
                        placeholder="e.g. Visiting from London"
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#D9DBE8] focus:border-[#00005E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Vehicle Rented
                      </label>
                      <select
                        value={formData.carHired}
                        onChange={(e) => setFormData({ ...formData, carHired: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#D9DBE8] focus:border-[#00005E] focus:outline-none bg-white"
                      >
                        <option value="Mercedes-Benz E-Class">Mercedes-Benz E-Class</option>
                        <option value="Mercedes-Benz ML">Mercedes-Benz ML</option>
                        <option value="Toyota Hilux Double Cab 4x4">Toyota Hilux Double Cab 4x4</option>
                        <option value="Ford Ranger T6 Double Cab">Ford Ranger T6 Double Cab</option>
                        <option value="Nissan X-Trail (7-Seater)">Nissan X-Trail (7-Seater)</option>
                        <option value="Hyundai Tucson">Hyundai Tucson</option>
                        <option value="Nissan Tiida">Nissan Tiida</option>
                        <option value="Honda Fit (Hybrid)">Honda Fit (Hybrid)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#D9DBE8] focus:border-[#00005E] focus:outline-none bg-white"
                      >
                        <option value="corporate">Corporate & NGO</option>
                        <option value="diaspora">Diaspora & Airport</option>
                        <option value="wedding">Weddings & Events</option>
                        <option value="safari">Safari & 4x4</option>
                        <option value="local">Harare Local</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                      Your Comments / Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder="How was the vehicle condition, delivery punctuality, and staff interaction? Be specific..."
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#D9DBE8] focus:border-[#00005E] focus:outline-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Verified Review</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
