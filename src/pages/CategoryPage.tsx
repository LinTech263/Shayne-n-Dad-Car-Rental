import React from 'react';
import { useApp } from '../context/AppContext';
import { CarCard } from '../components/cars/CarCard';
import { SignatureBar } from '../components/common/SignatureBar';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug }) => {
  const { categories, cars, navigate } = useApp();

  const category = categories.find(c => c.slug === categorySlug);
  const matchingCars = cars.filter(c => {
    if (categorySlug === 'chauffeur-driven') return c.chauffeurAvailable;
    return c.categoryId === categorySlug;
  });

  if (!category) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#00005E]">Category not found</h2>
        <button
          onClick={() => navigate('/cars')}
          className="px-5 py-2 bg-[#00005E] text-white text-xs font-semibold rounded-xs"
        >
          Return to Fleet
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero & Breadcrumbs */}
      <section className="bg-[#00005E] text-white py-12 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#D9DBE8]/70" aria-label="Breadcrumb">
            <button onClick={() => navigate('/')} className="hover:text-white">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            <button onClick={() => navigate('/cars')} className="hover:text-white">Fleet</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Harare Vehicle Category</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {category.name} for Hire in Harare
          </h1>

          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            {category.description} Inspected, valeted, comprehensively insured, and available for collection at Greencroft or airport/hotel delivery.
          </p>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D9DBE8]">
            <span className="text-xs font-semibold text-[#6B6E80]">
              Showing {matchingCars.length} vehicles in {category.name}
            </span>
            <button
              onClick={() => navigate('/cars')}
              className="text-xs text-[#00005E] hover:text-[#B71C24] font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all cars</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchingCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Related categories */}
          <div className="mt-16 pt-8 border-t border-[#D9DBE8] space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#00005E]">
              Other vehicle classes in Harare
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories
                .filter(c => c.slug !== categorySlug)
                .map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/cars/${cat.slug}`)}
                    className="p-3 bg-[#F4F5FA] border border-[#D9DBE8] hover:border-[#00005E] rounded-xs text-left transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#00005E] group-hover:text-[#B71C24]">
                      {cat.name}
                    </div>
                    <div className="text-[11px] text-[#6B6E80] mt-0.5 line-clamp-1">
                      Explore class →
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
