import React from 'react';
import { Car } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/pricing';
import { CarImageSlot } from '../common/CarImageSlot';
import { Users, Fuel, Briefcase, Cog, Check, Bookmark, Scale, ArrowRight } from 'lucide-react';

interface CarCardProps {
  car: Car;
  className?: string;
  showAvailabilityBadge?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  className = '',
  showAvailabilityBadge = true
}) => {
  const {
    navigate,
    currency,
    settings,
    categories,
    isCarSaved,
    toggleSaveCar,
    isCarInCompare,
    toggleCompareCar,
    openEnquiryModal
  } = useApp();

  const category = categories.find(c => c.id === car.categoryId);
  const isSaved = isCarSaved(car.slug);
  const isCompared = isCarInCompare(car.slug);

  return (
    <article
      className={`bg-white border border-[#D9DBE8]/70 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-[#00005E]/40 hover:shadow-xl hover:-translate-y-1 group ${className}`}
    >
      {/* Media / Image Container */}
      <div className="relative overflow-hidden aspect-[16/9] bg-[#F4F5FA]">
        <img
          src={car.images[0] || '/vehicle-photos/hero-fleet.jpg'}
          alt={`${car.year} ${car.name} for hire in Harare`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges: Category & Availability */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#00005E]/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
            {category?.name || 'Harare Fleet'}
          </span>

          {showAvailabilityBadge && (
            <span className="text-[10px] font-semibold text-white bg-[#1F6B4A]/95 backdrop-blur-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Available</span>
            </span>
          )}
        </div>

        {/* Wishlist & Compare Quick Actions */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => toggleCompareCar(car.slug)}
            className={`p-2 rounded-lg text-xs transition-all duration-200 cursor-pointer shadow-md active:scale-90 ${
              isCompared
                ? 'bg-[#B71C24] text-white ring-2 ring-white/40'
                : 'bg-black/60 hover:bg-black/85 text-white backdrop-blur-xs'
            }`}
            title={isCompared ? 'Remove from compare' : 'Add to compare'}
            aria-label={`Compare ${car.name}`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => toggleSaveCar(car.slug)}
            className={`p-2 rounded-lg text-xs transition-all duration-200 cursor-pointer shadow-md active:scale-90 ${
              isSaved
                ? 'bg-[#B71C24] text-white ring-2 ring-white/40'
                : 'bg-black/60 hover:bg-black/85 text-white backdrop-blur-xs'
            }`}
            title={isSaved ? 'Saved to wishlist' : 'Save to wishlist'}
            aria-label={`Save ${car.name}`}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Headline & Year */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3
              onClick={() => navigate(`/cars/${car.slug}`)}
              className="text-base sm:text-lg font-serif font-bold text-[#00005E] hover:text-[#B71C24] transition-colors cursor-pointer line-clamp-1"
            >
              {car.name}
            </h3>
            <span className="text-xs text-[#6B6E80] shrink-0 font-medium">{car.year}</span>
          </div>

          <p className="text-xs text-[#6B6E80] line-clamp-2 mb-4 leading-relaxed">
            {car.tagline}
          </p>

          {/* Clean Unboxed Metadata Specs with Typographic Separators (Anti-Slop Zero-Pills) */}
          <div className="flex items-center gap-2 text-xs text-[#2E2E2E] pb-4 mb-4 border-b border-[#D9DBE8]/60 flex-wrap">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#B71C24]" />
              <span>{car.seats} Seats</span>
            </span>
            <span aria-hidden="true" className="text-[#D9DBE8]">·</span>
            <span className="flex items-center gap-1">
              <Cog className="w-3.5 h-3.5 text-[#B71C24]" />
              <span>{car.transmission}</span>
            </span>
            <span aria-hidden="true" className="text-[#D9DBE8]">·</span>
            <span className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-[#B71C24]" />
              <span>{car.fuel}</span>
            </span>
            <span aria-hidden="true" className="text-[#D9DBE8]">·</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#B71C24]" />
              <span>{car.luggage.split(' ')[0]} Bags</span>
            </span>
          </div>
        </div>

        {/* Pricing & Call to Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-xs text-[#6B6E80]">From </span>
              <span className="text-lg font-bold text-[#00005E] tabular-nums">
                {formatPrice(car.dailyRate, currency, settings.zigRate)}
              </span>
              <span className="text-xs text-[#6B6E80]"> / day</span>
            </div>

            <div className="text-[11px] text-[#1F6B4A] font-semibold">
              {formatPrice(car.weeklyRate, currency, settings.zigRate)}/d weekly
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => navigate(`/cars/${car.slug}`)}
              className="py-2.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <span>Book Car</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => openEnquiryModal(car.slug, car.name)}
              className="py-2.5 border border-[#00005E] text-[#00005E] hover:bg-[#F4F5FA] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              Make Offer
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
