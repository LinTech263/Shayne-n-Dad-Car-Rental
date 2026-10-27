import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/pricing';
import { CarImageSlot } from './CarImageSlot';
import { X, Scale, Trash2, ArrowRight } from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const {
    compareSlugs,
    toggleCompareCar,
    clearCompare,
    isCompareDrawerOpen,
    setIsCompareDrawerOpen,
    cars,
    currency,
    settings,
    navigate,
    openEnquiryModal
  } = useApp();

  if (!isCompareDrawerOpen) return null;

  const comparedCars = cars.filter(c => compareSlugs.includes(c.slug));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 md:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-drawer-title"
    >
      <div className="bg-white rounded-t-xs md:rounded-xs border border-[#D9DBE8] max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#D9DBE8]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#B71C24]" />
            <h3 id="compare-drawer-title" className="text-lg font-serif font-bold text-[#00005E]">
              Compare Fleet ({comparedCars.length} of 3 selected)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {comparedCars.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-[#6B6E80] hover:text-[#B71C24] flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareDrawerOpen(false)}
              className="p-1.5 text-[#6B6E80] hover:text-[#00005E] rounded-xs"
              aria-label="Close comparison drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {comparedCars.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-sm text-[#6B6E80]">
              You haven't added any vehicles to compare yet.
            </p>
            <button
              onClick={() => {
                setIsCompareDrawerOpen(false);
                navigate('/cars');
              }}
              className="px-5 py-2 bg-[#00005E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
            >
              Browse Fleet
            </button>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D9DBE8]">
                  <th className="p-3 w-40 font-semibold text-[#6B6E80] uppercase tracking-wider text-[11px] bg-[#F4F5FA]">
                    Vehicle
                  </th>
                  {comparedCars.map(car => (
                    <th key={car.id} className="p-3 min-w-[220px]">
                      <div className="space-y-2">
                        <div className="relative">
                          <CarImageSlot
                            src={car.images[0]}
                            alt={car.name}
                            aspectRatio="16/9"
                            carName={car.name}
                          />
                          <button
                            onClick={() => toggleCompareCar(car.slug)}
                            className="absolute top-2 right-2 p-1 bg-black/60 text-white hover:bg-[#B71C24] rounded-full"
                            title="Remove from comparison"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#00005E]">
                          {car.name}
                        </h4>
                        <div className="text-xs font-semibold text-[#B71C24]">
                          {formatPrice(car.dailyRate, currency, settings.zigRate)} / day
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9DBE8]">
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Weekly Rate</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3 font-medium">
                      {formatPrice(car.weeklyRate, currency, settings.zigRate)} / day
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Monthly Rate</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3 font-medium text-[#1F6B4A]">
                      {formatPrice(car.monthlyRate, currency, settings.zigRate)} / day
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Refundable Deposit</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3">
                      {formatPrice(car.deposit, currency, settings.zigRate)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Seats &amp; Doors</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3">
                      {car.seats} Seats · {car.doors} Doors
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Transmission</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3 font-medium">
                      {car.transmission}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Fuel &amp; Engine</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3">
                      {car.fuel} · {car.engine}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Luggage Capacity</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3">
                      {car.luggage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Mileage Allowance</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3">
                      {car.mileageAllowance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Chauffeur Option</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3">
                      {car.chauffeurAvailable ? (
                        <span className="text-[#1F6B4A] font-semibold">
                          Available (+${car.chauffeurDailyRate}/day)
                        </span>
                      ) : (
                        <span className="text-[#6B6E80]">Self-drive only</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#6B6E80] bg-[#F4F5FA]">Action</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="p-3 space-y-2">
                      <button
                        onClick={() => {
                          setIsCompareDrawerOpen(false);
                          navigate(`/cars/${car.slug}`);
                        }}
                        className="w-full py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setIsCompareDrawerOpen(false);
                          openEnquiryModal(car.slug, car.name);
                        }}
                        className="w-full py-1.5 border border-[#00005E] text-[#00005E] text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:bg-[#F4F5FA]"
                      >
                        Make an Offer
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
