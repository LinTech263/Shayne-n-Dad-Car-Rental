import React from 'react';
import { useApp } from '../context/AppContext';
import { SignatureBar } from '../components/common/SignatureBar';
import { AvailabilitySearchBar } from '../components/common/AvailabilitySearchBar';
import { CarCard } from '../components/cars/CarCard';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle,
  ExternalLink,
  Shield,
  Plane,
  Building
} from 'lucide-react';

export const LocalLandingPage: React.FC = () => {
  const { cars, navigate, settings } = useApp();

  const suburbs = [
    {
      name: "Greencroft (Main Depot)",
      dist: "0 km (On-site)",
      deliveryTime: "Immediate / Walk-in",
      notes: "Located at 1 Drayton Avenue, just off Lomagundi Road. Full fleet storage, vehicle prep, and key collection."
    },
    {
      name: "Avondale & Avondale West",
      dist: "4.5 km",
      deliveryTime: "15 – 20 mins",
      notes: "Swift delivery to Avondale Shopping Centre, lodges, cafes, and business offices."
    },
    {
      name: "Borrowdale & Borrowdale Brooke",
      dist: "12 km",
      deliveryTime: "25 – 35 mins",
      notes: "Doorstep delivery to private residences, golf estates, and Sam Levy’s Village."
    },
    {
      name: "Mount Pleasant & Arundel",
      dist: "6 km",
      deliveryTime: "15 – 25 mins",
      notes: "Serving the University of Zimbabwe precinct, Arundel Office Park, and NGO country offices."
    },
    {
      name: "Harare CBD & Avenues",
      dist: "8 km",
      deliveryTime: "20 – 30 mins",
      notes: "Corporate deliveries to ministries, Meikles Hotel, Monomotapa Hotel, and executive offices."
    },
    {
      name: "Harare International Airport (HRE)",
      dist: "22 km",
      deliveryTime: "30 – 40 mins",
      notes: "Meet-and-greet in the arrivals hall or terminal car park handover with flight tracking."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#00005E] text-white py-14 border-b border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9DBE8] flex items-center gap-2">
              <span className="red-dot" />
              <span>Harare Local Hub · Greencroft Headquarters</span>
            </span>
            <SignatureBar isLight={true} className="w-20" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Car Hire in Harare, Zimbabwe
          </h1>
          <p className="text-xs sm:text-sm text-[#D9DBE8] max-w-2xl font-light leading-relaxed">
            Harare's premier vehicle rental depot at 1 Drayton Avenue, Greencroft. Fast doorstep delivery across Borrowdale, Avondale, Mount Pleasant, and direct Robert Gabriel Mugabe Airport meet-and-greet.
          </p>
        </div>
      </section>

      {/* Docked Search */}
      <section className="bg-[#F4F5FA] border-b border-[#D9DBE8] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AvailabilitySearchBar isDarkTheme={false} />
        </div>
      </section>

      {/* NAP & Local Hub Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Hub Information */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  Headquarters &amp; Dispatch
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#00005E]">
                  1 Drayton Avenue, Greencroft, Harare
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
                Positioned in quiet Greencroft along the strategic Lomagundi corridor, Shayne'n'Dad Car Rental provides quick, uncluttered vehicle collection free from central CBD congestion. Whether heading west towards Chinhoyi and Kariba or connecting north to Borrowdale and Mount Pleasant, our depot is effortlessly accessible.
              </p>

              {/* Exact NAP (Name, Address, Phone) Box */}
              <div className="p-6 bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs space-y-3 text-xs">
                <h3 className="font-bold text-[#00005E] uppercase tracking-wider text-[11px]">
                  Official Business Details (NAP)
                </h3>
                <div className="space-y-2 text-[#2E2E2E]">
                  <div className="flex items-start gap-2.5">
                    <Building className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
                    <div>
                      <strong>Business Name:</strong> Shayne'n'Dad Car Rental
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#B71C24] shrink-0 mt-0.5" />
                    <div>
                      <strong>Physical Address:</strong> 1 Drayton Avenue, Greencroft, Harare, Zimbabwe
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#B71C24] shrink-0" />
                    <div>
                      <strong>Phone / WhatsApp:</strong>{' '}
                      <a href="tel:+263772936555" className="hover:text-[#B71C24] font-semibold">
                        +263 77 293 6555
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#B71C24] shrink-0" />
                    <div>
                      <strong>Operating Hours:</strong> Monday to Sunday: 07:00 – 18:00 (24h Airport pre-booked)
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=-17.7836,31.0025+(Shayne%27n%27Dad+Car+Rental)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B71C24] font-semibold hover:underline"
                  >
                    <span>View on Google Maps (Directions &amp; GPS Pin)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Driving Directions */}
              <div className="space-y-3">
                <h3 className="text-base font-serif font-bold text-[#00005E] flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#B71C24]" />
                  <span>Driving Directions to Greencroft Depot</span>
                </h3>
                <div className="space-y-2 text-xs text-[#6B6E80] leading-relaxed">
                  <p>
                    <strong>From Harare CBD / Avondale:</strong> Travel along Prince Edward Street into Lomagundi Road past Avondale shopping centre. Turn into Drayton Avenue at Greencroft. Our office is at Number 1.
                  </p>
                  <p>
                    <strong>From Robert Gabriel Mugabe Airport (HRE):</strong> Take Airport Road onto Dieppe / Kenneth Kaunda Avenue, continue through the outer ring towards Lomagundi Road. Approximately 30 to 40 minutes driving time.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Suburbs Delivery Times Table */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                  Harare Suburbs Served
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#00005E]">
                  Doorstep Delivery Across Harare
                </h3>
                <p className="text-xs text-[#6B6E80]">
                  Don't want to travel to Greencroft? We deliver and collect your rental vehicle directly at your location.
                </p>
              </div>

              <div className="border border-[#D9DBE8] rounded-xs divide-y divide-[#D9DBE8] overflow-hidden text-xs">
                {suburbs.map((sub, idx) => (
                  <div key={idx} className="p-4 hover:bg-[#F4F5FA] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-sm font-semibold text-[#00005E]">
                        {sub.name}
                      </strong>
                      <span className="font-semibold text-[#1F6B4A] bg-emerald-50 px-2 py-0.5 rounded-xs text-[11px]">
                        {sub.deliveryTime}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6B6E80] mb-1">
                      Approx distance: {sub.dist}
                    </div>
                    <p className="text-xs text-[#2E2E2E] leading-relaxed">
                      {sub.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet Ready for Hire */}
      <section className="py-16 bg-[#F4F5FA] border-t border-[#D9DBE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71C24]">
                Available in Greencroft Today
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#00005E]">
                Featured Vehicles for Harare Hire
              </h2>
            </div>
            <button
              onClick={() => navigate('/cars')}
              className="text-xs font-semibold text-[#00005E] hover:text-[#B71C24] underline"
            >
              Browse entire fleet →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.slice(0, 4).map(c => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
