import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, CarFront, ArrowRight } from 'lucide-react';

interface AvailabilitySearchBarProps {
  className?: string;
  isDarkTheme?: boolean;
}

export const AvailabilitySearchBar: React.FC<AvailabilitySearchBarProps> = ({
  className = '',
  isDarkTheme = false
}) => {
  const { searchFilter, setSearchFilter, navigate, categories, settings } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cars');
  };

  const bgStyle = isDarkTheme
    ? 'bg-[#00005E]/95 backdrop-blur-md border-[#2A2E5A] text-white shadow-2xl'
    : 'bg-white/95 backdrop-blur-md border-[#D9DBE8]/80 text-[#2E2E2E] shadow-xl';

  const inputBg = isDarkTheme
    ? 'bg-[#05053A]/90 border-[#30356C] text-white focus:border-[#B71C24] focus:ring-1 focus:ring-[#B71C24]'
    : 'bg-[#F4F5FA] border-[#D9DBE8] text-[#2E2E2E] focus:border-[#00005E] focus:ring-1 focus:ring-[#00005E]';

  const labelColor = isDarkTheme ? 'text-[#D9DBE8]' : 'text-[#6B6E80]';

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={`rounded-2xl border p-5 md:p-7 transition-all duration-300 ${bgStyle} ${className}`}
      aria-label="Vehicle availability search"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Pick-up Date & Time */}
        <div>
          <label htmlFor="search-pickup-date" className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <Calendar className="w-3.5 h-3.5 text-[#B71C24]" />
            <span>Pick-up Date</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              id="search-pickup-date"
              type="date"
              value={searchFilter.startDate}
              onChange={e => setSearchFilter(prev => ({ ...prev, startDate: e.target.value }))}
              required
              className={`col-span-2 px-3 py-2.5 text-xs rounded-lg border outline-none font-medium transition-all ${inputBg}`}
            />
            <input
              type="time"
              value={searchFilter.startTime}
              onChange={e => setSearchFilter(prev => ({ ...prev, startTime: e.target.value }))}
              className={`px-2 py-2.5 text-xs rounded-lg border outline-none font-medium transition-all ${inputBg}`}
              aria-label="Pick-up time"
            />
          </div>
        </div>

        {/* Return Date & Time */}
        <div>
          <label htmlFor="search-return-date" className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <Clock className="w-3.5 h-3.5 text-[#B71C24]" />
            <span>Return Date</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              id="search-return-date"
              type="date"
              value={searchFilter.endDate}
              onChange={e => setSearchFilter(prev => ({ ...prev, endDate: e.target.value }))}
              required
              className={`col-span-2 px-3 py-2.5 text-xs rounded-lg border outline-none font-medium transition-all ${inputBg}`}
            />
            <input
              type="time"
              value={searchFilter.endTime}
              onChange={e => setSearchFilter(prev => ({ ...prev, endTime: e.target.value }))}
              className={`px-2 py-2.5 text-xs rounded-lg border outline-none font-medium transition-all ${inputBg}`}
              aria-label="Return time"
            />
          </div>
        </div>

        {/* Collection Location */}
        <div>
          <label htmlFor="search-location" className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <MapPin className="w-3.5 h-3.5 text-[#B71C24]" />
            <span>Handover Location</span>
          </label>
          <select
            id="search-location"
            value={searchFilter.pickupLocation}
            onChange={e => setSearchFilter(prev => ({ ...prev, pickupLocation: e.target.value }))}
            className={`w-full px-3 py-2.5 text-xs rounded-lg border outline-none font-medium transition-all cursor-pointer ${inputBg}`}
          >
            {settings.pickupLocations.map(loc => (
              <option key={loc.id} value={loc.id} className="text-[#2E2E2E]">
                {loc.name} {loc.fee > 0 ? `(+$${loc.fee})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="search-category" className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${labelColor}`}>
            <CarFront className="w-3.5 h-3.5 text-[#B71C24]" />
            <span>Vehicle Class</span>
          </label>
          <select
            id="search-category"
            value={searchFilter.categoryId}
            onChange={e => setSearchFilter(prev => ({ ...prev, categoryId: e.target.value }))}
            className={`w-full px-3 py-2.5 text-xs rounded-lg border outline-none font-medium transition-all cursor-pointer ${inputBg}`}
          >
            <option value="all" className="text-[#2E2E2E]">All Fleet Classes</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id} className="text-[#2E2E2E]">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Action */}
        <div className="pt-2 sm:pt-0">
          <button
            type="submit"
            className="w-full h-[42px] px-5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </form>
  );
};
