import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { calculateRentalPrice, formatPrice, calculateRentalDays } from '../utils/pricing';
import { CarImageSlot } from '../components/common/CarImageSlot';
import { SignatureBar } from '../components/common/SignatureBar';
import { CarCard } from '../components/cars/CarCard';
import {
  Calendar,
  Clock,
  MapPin,
  Shield,
  CheckCircle,
  Users,
  Cog,
  Fuel,
  Briefcase,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Tag,
  Scale,
  Bookmark,
  AlertCircle
} from 'lucide-react';

interface CarDetailPageProps {
  carSlug: string;
}

export const CarDetailPage: React.FC<CarDetailPageProps> = ({ carSlug }) => {
  const {
    cars,
    categories,
    navigate,
    currency,
    settings,
    openEnquiryModal,
    searchFilter,
    isCarSaved,
    toggleSaveCar,
    isCarInCompare,
    toggleCompareCar
  } = useApp();

  const car = cars.find(c => c.slug === carSlug);

  // Booking state on detail page
  const [startDate, setStartDate] = useState(searchFilter.startDate);
  const [startTime, setStartTime] = useState(searchFilter.startTime || '09:00');
  const [endDate, setEndDate] = useState(searchFilter.endDate);
  const [endTime, setEndTime] = useState(searchFilter.endTime || '09:00');
  const [chauffeurSelected, setChauffeurSelected] = useState(false);
  const [deliveryLocationId, setDeliveryLocationId] = useState('greencroft-office');
  const [selectedExtras, setSelectedExtras] = useState<Array<{ id: string; name: string; price: number; isPerDay: boolean }>>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const availableExtras = [
    { id: 'child-seat', name: 'Child Safety Seat', price: 10, isPerDay: true },
    { id: 'extra-driver', name: 'Additional Registered Driver', price: 5, isPerDay: true },
    { id: 'gps-unit', name: 'Portable GPS Navigation', price: 8, isPerDay: true },
    { id: 'camping-tent', name: '4-Person Canvas Dome Tent', price: 15, isPerDay: true }
  ];

  const handleToggleExtra = (extra: typeof availableExtras[0]) => {
    setSelectedExtras(prev =>
      prev.some(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const selectedLocation = settings.pickupLocations.find(l => l.id === deliveryLocationId) || settings.pickupLocations[0];

  const quote = useMemo(() => {
    if (!car) return null;
    return calculateRentalPrice({
      car,
      startDate,
      startTime,
      endDate,
      endTime,
      chauffeurSelected,
      deliveryLocationId,
      deliveryFee: selectedLocation.fee,
      selectedExtras,
      currency,
      zigRate: settings.zigRate
    });
  }, [car, startDate, startTime, endDate, endTime, chauffeurSelected, deliveryLocationId, selectedExtras, currency, settings.zigRate, selectedLocation.fee]);

  if (!car) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#00005E]">Vehicle not found</h2>
        <button
          onClick={() => navigate('/cars')}
          className="px-5 py-2 bg-[#00005E] text-white text-xs font-semibold rounded-xs"
        >
          Return to Fleet
        </button>
      </div>
    );
  }

  const category = categories.find(c => c.id === car.categoryId);
  const similarCars = cars.filter(c => c.categoryId === car.categoryId && c.id !== car.id).slice(0, 3);
  const isSaved = isCarSaved(car.slug);
  const isCompared = isCarInCompare(car.slug);

  const waBookingMessage = `Hello Shayne'n'Dad, I would like to reserve the ${car.name} from ${startDate} (${startTime}) to ${endDate} (${endTime}). Location: ${selectedLocation.name}. ${chauffeurSelected ? 'With Chauffeur.' : ''} Estimated total: $${quote?.grandTotal || car.dailyRate}. Please confirm availability!`;

  const waBookingUrl = `https://wa.me/263772936555?text=${encodeURIComponent(waBookingMessage)}`;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#F4F5FA] border-b border-[#D9DBE8] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-[#6B6E80]" aria-label="Breadcrumb">
            <button onClick={() => navigate('/')} className="hover:text-[#00005E]">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            <button onClick={() => navigate('/cars')} className="hover:text-[#00005E]">Fleet</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
            {category && (
              <>
                <button onClick={() => navigate(`/cars/${category.slug}`)} className="hover:text-[#00005E]">
                  {category.name}
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#B71C24]" />
              </>
            )}
            <span className="text-[#00005E] font-semibold">{car.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Vehicle Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Visuals & Specifications (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Visual Display */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#D9DBE8] shadow-lg">
                <CarImageSlot
                  src={
                    activeImageIndex === 2
                      ? '/cars/hero-fleet.jpg'
                      : car.images[activeImageIndex] || car.images[0] || '/cars/hero-fleet.jpg'
                  }
                  alt={`${car.year} ${car.name} - Front View`}
                  aspectRatio="16/9"
                  categoryName={category?.name}
                  carName={car.name}
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-xs font-semibold text-white bg-[#1F6B4A] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Available For Selected Dates</span>
                  </span>
                </div>

                {/* Quick actions */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => toggleCompareCar(car.slug)}
                    className={`p-2 rounded-lg text-xs font-medium transition-all shadow-md active:scale-95 ${
                      isCompared ? 'bg-[#B71C24] text-white ring-2 ring-white/40' : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                    title={isCompared ? 'Remove from compare' : 'Compare this car'}
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleSaveCar(car.slug)}
                    className={`p-2 rounded-lg text-xs font-medium transition-all shadow-md active:scale-95 ${
                      isSaved ? 'bg-[#B71C24] text-white ring-2 ring-white/40' : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                    title={isSaved ? 'Saved to wishlist' : 'Save to wishlist'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Image Slot Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { title: 'Main View', src: car.images[0] || '/cars/hero-fleet.jpg' },
                  { title: 'Angle Profile', src: car.images[0] || '/cars/hero-fleet.jpg' },
                  { title: 'Harare Fleet', src: '/cars/hero-fleet.jpg' }
                ].map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-xs ${
                      activeImageIndex === idx ? 'border-[#B71C24] ring-2 ring-[#B71C24]/30' : 'border-[#D9DBE8] hover:border-[#00005E]'
                    }`}
                  >
                    <CarImageSlot
                      src={thumb.src}
                      alt={`${car.name} - ${thumb.title}`}
                      aspectRatio="16/9"
                      carName={thumb.title}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Header & Story */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  {category?.name} · {car.year}
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#00005E] tracking-tight">
                  {car.name}
                </h1>
                <p className="text-sm font-serif italic text-[#6B6E80]">
                  {car.tagline}
                </p>
                <SignatureBar className="w-16 mt-2" />
              </div>

              <div className="text-xs sm:text-sm text-[#2E2E2E] leading-relaxed space-y-3 pt-2">
                <p>{car.description}</p>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-serif font-bold text-[#00005E]">
                Vehicle Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-1">
                  <span className="text-[#6B6E80] text-[11px] block">Transmission</span>
                  <strong className="text-[#00005E] font-semibold flex items-center gap-1">
                    <Cog className="w-3.5 h-3.5 text-[#B71C24]" />
                    <span>{car.transmission}</span>
                  </strong>
                </div>

                <div className="p-3 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-1">
                  <span className="text-[#6B6E80] text-[11px] block">Engine &amp; Power</span>
                  <strong className="text-[#00005E] font-semibold flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-[#B71C24]" />
                    <span>{car.engine}</span>
                  </strong>
                </div>

                <div className="p-3 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-1">
                  <span className="text-[#6B6E80] text-[11px] block">Seating Capacity</span>
                  <strong className="text-[#00005E] font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#B71C24]" />
                    <span>{car.seats} Adult Passengers</span>
                  </strong>
                </div>

                <div className="p-3 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-1">
                  <span className="text-[#6B6E80] text-[11px] block">Luggage Space</span>
                  <strong className="text-[#00005E] font-semibold flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#B71C24]" />
                    <span>{car.luggage}</span>
                  </strong>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-serif font-bold text-[#00005E]">
                Standard Equipment &amp; Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {car.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#2E2E2E]">
                    <CheckCircle className="w-4 h-4 text-[#1F6B4A] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Requirements Summary */}
            <div className="p-4 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-2 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#00005E] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#B71C24]" />
                <span>Rental Inclusions &amp; Requirements</span>
              </h4>
              <ul className="space-y-1 text-[#6B6E80] list-disc list-inside">
                <li>Daily mileage allowance: <strong className="text-[#2E2E2E]">{car.mileageAllowance}</strong></li>
                <li>Comprehensive insurance included with standard excess cover</li>
                <li>Valid physical driver's licence (2+ years) &amp; National ID/Passport required at handover</li>
                <li>Refundable security deposit: <strong className="text-[#2E2E2E]">{formatPrice(car.deposit, currency, settings.zigRate)}</strong></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Live Booking & Price Breakdown Engine (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white border border-[#D9DBE8] p-6 rounded-xs shadow-lg space-y-6">
              {/* Price Banner */}
              <div className="border-b border-[#D9DBE8] pb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#6B6E80]">Daily Rate</span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#00005E]">
                    {formatPrice(car.dailyRate, currency, settings.zigRate)}
                    <span className="text-xs font-sans text-[#6B6E80] font-normal"> / day</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#1F6B4A] font-semibold block">
                    {formatPrice(car.weeklyRate, currency, settings.zigRate)}/d (7+ days)
                  </span>
                  <span className="text-[11px] text-[#1F6B4A] font-semibold block">
                    {formatPrice(car.monthlyRate, currency, settings.zigRate)}/d (30+ days)
                  </span>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6E80] mb-1">
                      Pick-up Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6E80] mb-1">
                      Pick-up Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6E80] mb-1">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6E80] mb-1">
                      Return Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] font-medium"
                    />
                  </div>
                </div>

                {/* Handover Location */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6E80] mb-1">
                    Handover &amp; Return Point
                  </label>
                  <select
                    value={deliveryLocationId}
                    onChange={e => setDeliveryLocationId(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] font-medium cursor-pointer"
                  >
                    {settings.pickupLocations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} {loc.fee > 0 ? `(+$${loc.fee})` : '(Free)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chauffeur Option */}
                {car.chauffeurAvailable && (
                  <label className="flex items-center gap-2 p-3 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={chauffeurSelected}
                      onChange={e => setChauffeurSelected(e.target.checked)}
                      className="w-4 h-4 text-[#B71C24] rounded-xs"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-semibold text-[#00005E]">Add Chauffeur Driver</span>
                      <span className="text-[#B71C24] font-bold">+${car.chauffeurDailyRate}/day</span>
                    </div>
                  </label>
                )}
              </div>

              {/* Optional Extras Selector */}
              <div className="space-y-2 pt-2 border-t border-[#D9DBE8]">
                <span className="block text-xs font-bold text-[#00005E] uppercase tracking-wider">
                  Optional Extras
                </span>
                <div className="space-y-1.5">
                  {availableExtras.map(extra => {
                    const isChecked = selectedExtras.some(e => e.id === extra.id);
                    return (
                      <label
                        key={extra.id}
                        className="flex items-center justify-between text-xs p-2 rounded-xs hover:bg-[#F4F5FA] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleExtra(extra)}
                            className="w-3.5 h-3.5 text-[#B71C24] rounded-xs"
                          />
                          <span className="text-[#2E2E2E]">{extra.name}</span>
                        </div>
                        <span className="text-[#6B6E80] font-medium">+${extra.price}/day</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Live Itemised Price Breakdown */}
              {quote && (
                <div className="bg-[#F4F5FA] p-4 rounded-xs border border-[#D9DBE8] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6B6E80]">
                    <span>Rental ({quote.days} {quote.days === 1 ? 'day' : 'days'} × ${quote.ratePerDay}/d):</span>
                    <span className="font-medium text-[#2E2E2E] tabular-nums">${quote.baseTotal}</span>
                  </div>

                  {quote.chauffeurSelected && (
                    <div className="flex justify-between text-[#6B6E80]">
                      <span>Chauffeur ({quote.days} days):</span>
                      <span className="font-medium text-[#2E2E2E] tabular-nums">${quote.chauffeurTotal}</span>
                    </div>
                  )}

                  {quote.deliveryFee > 0 && (
                    <div className="flex justify-between text-[#6B6E80]">
                      <span>Location Handover Fee:</span>
                      <span className="font-medium text-[#2E2E2E] tabular-nums">${quote.deliveryFee}</span>
                    </div>
                  )}

                  {quote.extrasTotal > 0 && (
                    <div className="flex justify-between text-[#6B6E80]">
                      <span>Selected Extras:</span>
                      <span className="font-medium text-[#2E2E2E] tabular-nums">${quote.extrasTotal}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#6B6E80]">
                    <span>Refundable Deposit (held):</span>
                    <span className="font-medium text-[#2E2E2E] tabular-nums">${quote.deposit}</span>
                  </div>

                  <div className="pt-2 border-t border-[#D9DBE8] flex justify-between items-baseline font-bold">
                    <span className="text-sm text-[#00005E]">Total Due:</span>
                    <div className="text-right">
                      <div className="text-xl font-serif text-[#B71C24] tabular-nums">
                        {formatPrice(quote.grandTotal, currency, settings.zigRate)}
                      </div>
                      {currency === 'USD' && (
                        <div className="text-[10px] text-[#6B6E80] font-normal">
                          Approx. {formatPrice(quote.grandTotal, 'ZiG', settings.zigRate)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <span>Book This Car Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openEnquiryModal(car.slug, car.name, { start: startDate, end: endDate })}
                    className="py-2.5 border border-[#00005E] text-[#00005E] hover:bg-[#F4F5FA] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors text-center"
                  >
                    Make an Offer
                  </button>

                  <a
                    href={waBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-[#6B6E80] text-center space-y-1">
                <p>✓ Pay with EcoCash, OneMoney, Telecash or Card</p>
                <p>✓ Instant receipt &amp; QR verification token</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars in Same Category */}
        {similarCars.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#D9DBE8] space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                Alternative Options
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#00005E]">
                Similar vehicles in Harare
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map(c => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
