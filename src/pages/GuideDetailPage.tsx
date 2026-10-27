import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { CarCard } from '../components/cars/CarCard';
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Share2
} from 'lucide-react';

interface GuideDetailPageProps {
  guideSlug: string;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ guideSlug }) => {
  const { guidesList, cars, servicesList, navigate } = useApp();

  const guide = guidesList.find(g => g.slug === guideSlug);

  if (!guide) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#00005E]">Guide not found</h2>
        <button
          onClick={() => navigate('/guides')}
          className="px-5 py-2 bg-[#00005E] text-white text-xs font-semibold rounded-xs"
        >
          Return to Guides
        </button>
      </div>
    );
  }

  // Related cars
  const relatedCars = (guide.relatedCarSlugs || [])
    .map(slug => cars.find(c => c.slug === slug))
    .filter((c): c is typeof cars[0] => Boolean(c));

  // Related services
  const relatedServices = (guide.relatedServiceSlugs || [])
    .map(slug => servicesList.find(s => s.slug === slug))
    .filter((s): s is typeof servicesList[0] => Boolean(s));

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-1.5 text-xs text-[#D9DBE8]/70" aria-label="Breadcrumb">
            <button onClick={() => navigate('/')} className="hover:text-white">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            <button onClick={() => navigate('/guides')} className="hover:text-white">Guides</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            <span className="text-white font-medium line-clamp-1">{guide.title}</span>
          </nav>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24] bg-white px-2.5 py-0.5 rounded-xs inline-block">
              {guide.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {guide.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#D9DBE8] pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#B71C24]" />
              <span>{guide.author}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B71C24]" />
              <span>{guide.readTime}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B71C24]" />
              <span>Published {guide.publishedDate}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Prose Content */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Key Takeaways Box */}
          {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
            <div className="bg-[#F4F5FA] border border-[#D9DBE8] p-6 rounded-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-[#00005E] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#B71C24]" />
                <span>Key Takeaways for Harare Travellers</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#2E2E2E]">
                {guide.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="red-dot mt-1.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Body Paragraphs */}
          <div className="prose prose-slate max-w-none space-y-5 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
            {guide.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Guide Specific FAQs */}
          {guide.faqs && guide.faqs.length > 0 && (
            <div className="pt-8 border-t border-[#D9DBE8] space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#00005E] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#B71C24]" />
                <span>Frequently Asked Regarding this Topic</span>
              </h3>
              <div className="space-y-3">
                {guide.faqs.map((f, fIdx) => (
                  <div key={fIdx} className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-1.5">
                    <h4 className="font-serif font-bold text-sm text-[#00005E]">
                      {f.question}
                    </h4>
                    <p className="text-xs text-[#2E2E2E] leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="pt-8 border-t border-[#D9DBE8] space-y-3">
              <h4 className="font-serif font-bold text-base text-[#00005E]">
                Related Services Discussed in This Guide
              </h4>
              <div className="flex flex-wrap gap-2">
                {relatedServices.map(svc => (
                  <button
                    key={svc.id}
                    onClick={() => navigate(`/services/${svc.slug}`)}
                    className="px-3.5 py-2 bg-[#F4F5FA] border border-[#D9DBE8] hover:border-[#00005E] rounded-xs text-xs font-semibold text-[#00005E] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{svc.title}</span>
                    <ArrowRight className="w-3 h-3 text-[#B71C24]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Vehicles */}
          {relatedCars.length > 0 && (
            <div className="pt-8 border-t border-[#D9DBE8] space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#00005E]">
                  Vehicles Mentioned in This Guide
                </h4>
                <button
                  onClick={() => navigate('/cars')}
                  className="text-xs text-[#B71C24] font-semibold hover:underline"
                >
                  View full fleet →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedCars.map(c => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
