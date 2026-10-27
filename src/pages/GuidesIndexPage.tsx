import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

export const GuidesIndexPage: React.FC = () => {
  const { guidesList, navigate } = useApp();

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Harare Automotive &amp; Travel Insights</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Harare Car Hire &amp; Driving Guides
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Expert knowledge and local insights on driving in Harare, airport transfers, choosing between self-drive and chauffeurs, and road trip preparation in Zimbabwe.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guidesList.map((guide, idx) => (
              <article
                key={guide.id}
                onClick={() => navigate(`/guides/${guide.slug}`)}
                className="bg-white border border-[#D9DBE8] rounded-xs p-6 hover:border-[#00005E] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#6B6E80] pb-2 border-b border-[#D9DBE8]/60">
                    <span className="font-semibold text-[#00005E] uppercase tracking-wider">
                      {guide.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B71C24]" />
                      <span>{guide.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-xl text-[#00005E] group-hover:text-[#B71C24] transition-colors leading-snug">
                    {guide.title}
                  </h2>

                  <p className="text-xs text-[#6B6E80] leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9DBE8] flex items-center justify-between text-xs font-semibold text-[#00005E] group-hover:text-[#B71C24]">
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
