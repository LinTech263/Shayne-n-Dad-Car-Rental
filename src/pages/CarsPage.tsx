import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CarCard } from '../components/cars/CarCard';
import { AvailabilitySearchBar } from '../components/common/AvailabilitySearchBar';
import { SignatureBar } from '../components/common/SignatureBar';
import { SlidersHorizontal, RefreshCw, MessageCircle, Scale } from 'lucide-react';

export const CarsPage: React.FC = () => {
  const {
    cars,
    categories,
    searchFilter,
    setSearchFilter,
    compareSlugs,
    setIsCompareDrawerOpen,
    settings
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchFilter.categoryId || 'all'
  );
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [minSeats, setMinSeats] = useState<number>(0);
  const [chauffeurOnly, setChauffeurOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      if (selectedCategory !== 'all' && car.categoryId !== selectedCategory) {
        return false;
      }
      if (selectedTransmission !== 'all' && car.transmission !== selectedTransmission) {
        return false;
      }
      if (selectedFuel !== 'all' && car.fuel !== selectedFuel) {
        return false;
      }
      if (minSeats > 0 && car.seats < minSeats) {
        return false;
      }
      if (chauffeurOnly && !car.chauffeurAvailable) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price-desc') return b.dailyRate - a.dailyRate;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [cars, selectedCategory, selectedTransmission, selectedFuel, minSeats, chauffeurOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedTransmission('all');
    setSelectedFuel('all');
    setMinSeats(0);
    setChauffeurOnly(false);
    setSortBy('recommended');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-12 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Harare Fleet · Live Availability</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Our Fleet in Harare
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light">
            Browse our pristine sedans, SUVs, and 4x4 double cabs. Every vehicle undergoes a 40-point safety inspection, includes comprehensive cover, and is backed by 24/7 road assistance.
          </p>
        </div>
      </section>

      {/* Availability Search Bar Strip */}
      <section className="bg-[#F4F5FA] border-b border-[#D9DBE8] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AvailabilitySearchBar isDarkTheme={false} />
        </div>
      </section>

      {/* Main Filter & Fleet Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="bg-white border border-[#D9DBE8] p-5 rounded-2xl shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 font-semibold text-[#00005E]">
                <SlidersHorizontal className="w-4 h-4 text-[#B71C24]" />
                <span>Filter By:</span>
              </div>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] font-medium outline-none cursor-pointer hover:border-[#00005E] transition-colors"
                aria-label="Filter by vehicle class"
              >
                <option value="all">All Classes</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              {/* Transmission */}
              <select
                value={selectedTransmission}
                onChange={e => setSelectedTransmission(e.target.value)}
                className="px-3 py-2 border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] font-medium outline-none cursor-pointer hover:border-[#00005E] transition-colors"
                aria-label="Filter by transmission"
              >
                <option value="all">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>

              {/* Fuel */}
              <select
                value={selectedFuel}
                onChange={e => setSelectedFuel(e.target.value)}
                className="px-3 py-2 border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] font-medium outline-none cursor-pointer hover:border-[#00005E] transition-colors"
                aria-label="Filter by fuel type"
              >
                <option value="all">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              {/* Chauffeur Toggle */}
              <label className="flex items-center gap-2 px-3 py-2 border border-[#D9DBE8] rounded-lg bg-[#F4F5FA] cursor-pointer font-medium hover:border-[#00005E] transition-colors">
                <input
                  type="checkbox"
                  checked={chauffeurOnly}
                  onChange={e => setChauffeurOnly(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#B71C24] rounded-sm"
                />
                <span>Chauffeur Available</span>
              </label>

              {(selectedCategory !== 'all' || selectedTransmission !== 'all' || selectedFuel !== 'all' || chauffeurOnly) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#B71C24] font-semibold flex items-center gap-1 hover:underline ml-2 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Sort & Compare Count */}
            <div className="flex items-center gap-3">
              {compareSlugs.length > 0 && (
                <button
                  onClick={() => setIsCompareDrawerOpen(true)}
                  className="px-3.5 py-2 bg-[#00005E] text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <Scale className="w-3.5 h-3.5 text-[#B71C24]" />
                  <span>Compare ({compareSlugs.length})</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                <span className="text-[#6B6E80]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-[#D9DBE8] rounded-lg bg-white font-medium outline-none cursor-pointer hover:border-[#00005E] transition-colors"
                  aria-label="Sort cars"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Count */}
          <div className="mb-6 flex items-center justify-between text-xs text-[#6B6E80]">
            <span>Showing {filteredCars.length} of {cars.length} vehicles available</span>
            <span>All vehicles include comprehensive cover &amp; 24/7 breakdown assist</span>
          </div>

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#00005E]">
                No vehicles match your exact criteria
              </h3>
              <p className="text-xs text-[#6B6E80] max-w-md mx-auto leading-relaxed">
                Try widening your filters or reach out directly to our Greencroft office. We can often arrange customized allocations or alternative vehicles.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#00005E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
                >
                  Reset All Filters
                </button>
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
