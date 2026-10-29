import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Car, EnquiryItem, TestimonialItem, BusinessSettings } from '../types';
import { formatPrice } from '../utils/pricing';
import {
  CarFront,
  Users,
  Settings as SettingsIcon,
  MessageSquare,
  TrendingUp,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Lock,
  Unlock,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Star,
  Check,
  X,
  Calendar,
  DollarSign,
  Fuel,
  Cog,
  Briefcase
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    cars,
    updateCar,
    addCar,
    deleteCar,
    resetCars,
    settings,
    updateSettings,
    resetSettings,
    testimonials,
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    resetTestimonials,
    enquiries,
    updateEnquiry,
    addEnquiry,
    deleteEnquiry,
    resetEnquiries,
    currency,
    toggleCurrency,
    navigate
  } = useApp();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('shayne_admin_auth') === 'true';
  });
  const [pinCode, setPinCode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'fleet' | 'bookings' | 'settings' | 'reviews'>('overview');

  // Search & Filter States
  const [carSearch, setCarSearch] = useState('');
  const [carCategoryFilter, setCarCategoryFilter] = useState('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState('');

  // Fleet Edit Modal State
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [carForm, setCarForm] = useState<Partial<Car>>({});

  // New Booking Modal State
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState<Partial<EnquiryItem>>({
    status: 'New',
    chauffeurNeeded: false
  });

  // New Review Modal State
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState<Partial<TestimonialItem>>({
    rating: 5,
    category: 'corporate',
    verifiedBooking: true,
    featured: true,
    approved: true
  });

  // Settings Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept standard passcode 2630 or admin or any 4+ char password for convenience
    if (pinCode.trim() === '2630' || pinCode.trim().toLowerCase() === 'admin' || pinCode.length >= 4) {
      setIsAuthenticated(true);
      setAuthError(false);
      localStorage.setItem('shayne_admin_auth', 'true');
    } else {
      setAuthError(true);
    }
  };

  const handleDemoUnlock = () => {
    setIsAuthenticated(true);
    setAuthError(false);
    localStorage.setItem('shayne_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('shayne_admin_auth');
  };

  // Fleet Metrics
  const totalFleet = cars.length;
  const availableCars = cars.filter(c => c.status === 'available').length;
  const bookedCars = cars.filter(c => c.status === 'booked').length;
  const maintenanceCars = cars.filter(c => c.status === 'maintenance').length;
  const fleetUtilization = totalFleet > 0 ? Math.round((bookedCars / totalFleet) * 100) : 0;

  // Bookings Metrics
  const pendingLeads = enquiries.filter(e => e.status === 'New').length;
  const confirmedBookings = enquiries.filter(e => e.status === 'Confirmed').length;

  // Estimated Monthly Revenue
  const estimatedRevenueUSD = cars.reduce((acc, car) => {
    // approx 18 rental days per month per active car
    return acc + (car.dailyRate * (car.status === 'booked' ? 22 : 12));
  }, 0);
  const estimatedRevenueZiG = Math.round(estimatedRevenueUSD * settings.zigRate);

  // Filtered Cars
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(carSearch.toLowerCase()) ||
        car.tagline.toLowerCase().includes(carSearch.toLowerCase());
      const matchesCategory = carCategoryFilter === 'all' || car.categoryId === carCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [cars, carSearch, carCategoryFilter]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return enquiries.filter(lead => {
      const matchesSearch = lead.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        lead.phone.includes(bookingSearch) ||
        lead.carName.toLowerCase().includes(bookingSearch.toLowerCase());
      const matchesStatus = bookingStatusFilter === 'all' || lead.status === bookingStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enquiries, bookingSearch, bookingStatusFilter]);

  // Car Save / Update Handlers
  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCar) {
      updateCar(editingCar.id, carForm);
      showToast(`Updated specs for ${editingCar.name}`);
      setEditingCar(null);
    } else if (isAddingCar && carForm.name) {
      const newCar: Car = {
        id: `car-${Date.now()}`,
        name: carForm.name,
        slug: carForm.slug || carForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        categoryId: carForm.categoryId || 'suvs-crossovers',
        year: Number(carForm.year) || 2024,
        make: carForm.make || 'Toyota',
        model: carForm.model || carForm.name,
        transmission: (carForm.transmission as 'Automatic' | 'Manual') || 'Automatic',
        fuel: (carForm.fuel as 'Petrol' | 'Diesel' | 'Hybrid') || 'Diesel',
        seats: Number(carForm.seats) || 5,
        doors: Number(carForm.doors) || 4,
        luggage: carForm.luggage || '3 Large Suitcases',
        engine: carForm.engine || '2.8L Turbo Diesel',
        features: carForm.features || ['Air Conditioning', 'Bluetooth', 'Reverse Camera', 'All-Terrain Tyres'],
        dailyRate: Number(carForm.dailyRate) || 120,
        weeklyRate: Number(carForm.weeklyRate) || 110,
        monthlyRate: Number(carForm.monthlyRate) || 95,
        deposit: Number(carForm.deposit) || 250,
        chauffeurAvailable: carForm.chauffeurAvailable !== false,
        chauffeurDailyRate: Number(carForm.chauffeurDailyRate) || 40,
        mileageAllowance: '200 km / day included',
        status: (carForm.status as 'available' | 'booked' | 'maintenance') || 'available',
        images: carForm.images && carForm.images.length > 0 ? carForm.images : ['/vehicle-photos/toyota-hilux.jpg'],
        featured: Boolean(carForm.featured),
        isDemo: false,
        tagline: carForm.tagline || 'Reliable executive travel in Harare',
        description: carForm.description || 'Pristine condition, comprehensively insured.'
      };
      addCar(newCar);
      showToast(`Added ${newCar.name} to the Harare fleet`);
      setIsAddingCar(false);
    }
  };

  // Direct WhatsApp Reply
  const openWhatsAppReply = (lead: EnquiryItem) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${lead.fullName}, thank you for contacting Shayne'n'Dad Car Rental (Harare) regarding the ${lead.carName}. We would be delighted to assist you with your hire.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  // If Not Authenticated: Display Luxury Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-[#F4F5FA] via-white to-[#E9EAF5]">
        <div className="w-full max-w-md liquid-glass p-8 sm:p-10 rounded-3xl border border-[#D9DBE8] shadow-2xl relative overflow-hidden">
          {/* Decorative Corner Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#B71C24]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#00005E]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="inline-block bg-white p-3 rounded-xl border border-[#D9DBE8] shadow-xs">
              <img
                src="/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg"
                alt="Shayne'n'Dad Car Rental"
                className="h-12 w-auto object-contain mx-auto"
              />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-[#00005E]">
                Owner &amp; Dispatch Portal
              </h1>
              <p className="text-xs text-[#6B6E80] mt-1">
                Fleet management &amp; bookings · 1 Drayton Ave, Greencroft
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2E2E2E] mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B71C24]" />
                <span>Security Passcode / PIN</span>
              </label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. 2630)"
                value={pinCode}
                onChange={e => {
                  setPinCode(e.target.value);
                  setAuthError(false);
                }}
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#D9DBE8] bg-white/90 focus:border-[#00005E] focus:ring-2 focus:ring-[#00005E]/10 outline-none transition-all"
                autoFocus
              />
              {authError && (
                <p className="text-[11px] text-[#B71C24] font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid passcode. Use 2630 or click Demo Mode below.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00005E] hover:bg-[#05053A] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Log In to Portal
            </button>

            {/* 1-Click Demo Mode Access */}
            <div className="pt-3 border-t border-[#D9DBE8]/70 text-center space-y-2">
              <p className="text-[11px] text-[#6B6E80]">
                Evaluating or testing the portal?
              </p>
              <button
                type="button"
                onClick={handleDemoUnlock}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>1-Click Demo Mode Unlock</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-[#00005E] hover:text-[#B71C24] underline cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Portal Interface
  return (
    <div className="min-h-screen bg-[#F4F5FA] text-[#2E2E2E] pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#00005E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Portal Command Bar */}
      <div className="bg-[#05053A] text-white border-b border-white/10 sticky top-[65px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Shayne'n'Dad Admin Portal
              </span>
              <span className="text-[11px] text-white/60 ml-2 hidden sm:inline">
                Harare Central Dispatch · Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleCurrency}
              className="text-xs font-semibold px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white border border-white/15 transition-colors cursor-pointer"
            >
              Currency: <strong className="text-emerald-300">{currency}</strong>
            </button>

            <button
              onClick={() => navigate('/')}
              className="text-xs font-medium px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#B71C24]" />
              <span className="hidden sm:inline">View Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-xs font-medium px-3 py-1 bg-[#B71C24]/80 hover:bg-[#B71C24] rounded-lg text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Liquid Glass Navigation Tab Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-[#00005E] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'fleet'
                  ? 'bg-white text-[#00005E] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <CarFront className="w-4 h-4" />
              <span>Fleet Manager ({cars.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-white text-[#00005E] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Bookings &amp; Leads ({enquiries.length})</span>
              {pendingLeads > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#B71C24] text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingLeads}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white text-[#00005E] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Depot &amp; Rates Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-white text-[#00005E] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Testimonials &amp; Reviews</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ========================================================
            TAB 1: DASHBOARD & ANALYTICS OVERVIEW
            ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="liquid-glass p-5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6E80]">
                    Fleet Utilization
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#00005E] mt-1">
                    {fleetUtilization}%
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {availableCars} ready for handover
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#00005E]/10 text-[#00005E] flex items-center justify-center">
                  <CarFront className="w-6 h-6" />
                </div>
              </div>

              <div className="liquid-glass p-5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6E80]">
                    Active Inquiries
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#B71C24] mt-1">
                    {pendingLeads} New
                  </div>
                  <span className="text-[11px] text-[#6B6E80]">
                    {confirmedBookings} confirmed bookings
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#B71C24]/10 text-[#B71C24] flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="liquid-glass p-5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6E80]">
                    Projected Revenue
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#00005E] mt-1">
                    ${estimatedRevenueUSD.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[#6B6E80]">
                    ZiG {estimatedRevenueZiG.toLocaleString()}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="liquid-glass p-5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6E80]">
                    Total Fleet Assets
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#00005E] mt-1">
                    {totalFleet} Cars
                  </div>
                  <span className="text-[11px] text-[#6B6E80]">
                    {maintenanceCars} in scheduled service
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Two-Column Analytics Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Upcoming Handovers & Priority Actions */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D9DBE8] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9DBE8]/70">
                  <h3 className="font-serif font-bold text-lg text-[#00005E]">
                    Pending Customer Leads &amp; Airport Handovers
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#B71C24] font-semibold hover:underline"
                  >
                    View All Leads →
                  </button>
                </div>

                <div className="divide-y divide-[#D9DBE8]/60">
                  {enquiries.slice(0, 4).map(lead => (
                    <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-semibold text-[#00005E]">
                            {lead.fullName}
                          </strong>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              lead.status === 'New'
                                ? 'bg-amber-100 text-amber-800'
                                : lead.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B6E80] mt-0.5">
                          {lead.carName} · {lead.startDate || 'Dates TBD'} · {lead.pickupLocation || 'Greencroft Depot'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openWhatsAppReply(lead)}
                          className="px-2.5 py-1.5 bg-[#25D366] text-white text-[11px] font-semibold rounded-lg hover:bg-[#20ba59] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Fleet Status Radar */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-[#D9DBE8] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9DBE8]/70">
                  <h3 className="font-serif font-bold text-lg text-[#00005E]">
                    Fleet Readiness Status
                  </h3>
                  <button
                    onClick={() => setActiveTab('fleet')}
                    className="text-xs text-[#B71C24] font-semibold hover:underline"
                  >
                    Manage Fleet →
                  </button>
                </div>

                <div className="space-y-3">
                  {cars.slice(0, 5).map(car => (
                    <div key={car.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#D9DBE8]/40">
                      <div className="flex items-center gap-3">
                        <img
                          src={car.images[0] || '/vehicle-photos/hero-fleet.jpg'}
                          alt={car.name}
                          className="w-10 h-7 object-cover rounded-md border border-[#D9DBE8]"
                        />
                        <div>
                          <strong className="block text-[#00005E] font-medium">{car.name}</strong>
                          <span className="text-[10px] text-[#6B6E80]">${car.dailyRate}/day</span>
                        </div>
                      </div>

                      {/* Live Toggle Status */}
                      <select
                        value={car.status}
                        onChange={e => {
                          updateCar(car.id, { status: e.target.value as any });
                          showToast(`Updated ${car.name} status to ${e.target.value}`);
                        }}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                          car.status === 'available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : car.status === 'booked'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-red-50 text-red-800 border-red-300'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                        <option value="maintenance">Service</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: FLEET MANAGER
            ======================================================== */}
        {activeTab === 'fleet' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Fleet Control Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#D9DBE8] shadow-xs">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-[#6B6E80] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search fleet by name or specs..."
                    value={carSearch}
                    onChange={e => setCarSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                  />
                </div>

                <select
                  value={carCategoryFilter}
                  onChange={e => setCarCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none bg-white cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="executive-sedans">Executive Sedans</option>
                  <option value="suvs-crossovers">SUVs &amp; Crossovers</option>
                  <option value="double-cabs-4x4">Double Cabs &amp; 4x4s</option>
                  <option value="economy-city-cars">Economy City Cars</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCarForm({
                      categoryId: 'suvs-crossovers',
                      transmission: 'Automatic',
                      fuel: 'Diesel',
                      status: 'available',
                      featured: true
                    });
                    setIsAddingCar(true);
                  }}
                  className="px-4 py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Car</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset fleet to factory initial cars?')) {
                      resetCars();
                      showToast('Fleet restored to initial data');
                    }
                  }}
                  className="p-2 border border-[#D9DBE8] text-[#6B6E80] hover:text-[#00005E] rounded-xl transition-colors cursor-pointer"
                  title="Reset Fleet to Default"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Fleet Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <div
                  key={car.id}
                  className="liquid-glass-card rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-[16/9] bg-[#05053A]">
                      <img
                        src={car.images[0] || '/vehicle-photos/hero-fleet.jpg'}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                          {car.year} {car.make}
                        </span>

                        <span
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md ${
                            car.status === 'available'
                              ? 'bg-emerald-600/90 text-white'
                              : car.status === 'booked'
                              ? 'bg-amber-600/90 text-white'
                              : 'bg-red-600/90 text-white'
                          }`}
                        >
                          {car.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Featured Star Badge */}
                      <button
                        onClick={() => {
                          updateCar(car.id, { featured: !car.featured });
                          showToast(`${car.name} featured status updated`);
                        }}
                        className={`absolute bottom-3 right-3 p-1.5 rounded-lg text-xs backdrop-blur-md cursor-pointer ${
                          car.featured
                            ? 'bg-[#E5A823] text-white shadow-md'
                            : 'bg-black/50 text-white/70 hover:text-white'
                        }`}
                        title={car.featured ? 'Featured on Homepage' : 'Not Featured'}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Spec Summary */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-serif font-bold text-base text-[#00005E] line-clamp-1">
                          {car.name}
                        </h4>
                        <span className="text-xs font-bold text-[#B71C24] shrink-0">
                          ${car.dailyRate}/d
                        </span>
                      </div>

                      <p className="text-[11px] text-[#6B6E80] line-clamp-2 mb-4">
                        {car.tagline}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#2E2E2E] bg-[#F4F5FA] p-3 rounded-xl mb-4">
                        <div>
                          <span className="text-[#6B6E80] block text-[10px]">Weekly Rate:</span>
                          <strong>${car.weeklyRate}/day</strong>
                        </div>
                        <div>
                          <span className="text-[#6B6E80] block text-[10px]">Deposit:</span>
                          <strong>${car.deposit}</strong>
                        </div>
                        <div>
                          <span className="text-[#6B6E80] block text-[10px]">Chauffeur Fee:</span>
                          <strong>+${car.chauffeurDailyRate}/day</strong>
                        </div>
                        <div>
                          <span className="text-[#6B6E80] block text-[10px]">Transmission:</span>
                          <strong>{car.transmission}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-[#D9DBE8]/60 pt-3">
                    {/* Live Status Selector */}
                    <select
                      value={car.status}
                      onChange={e => {
                        updateCar(car.id, { status: e.target.value as any });
                        showToast(`Status updated to ${e.target.value}`);
                      }}
                      className="text-xs font-medium px-2 py-1 rounded-lg border border-[#D9DBE8] outline-none cursor-pointer"
                    >
                      <option value="available">Available</option>
                      <option value="booked">Booked</option>
                      <option value="maintenance">Maintenance</option>
                    </select>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingCar(car);
                          setCarForm(car);
                        }}
                        className="p-2 text-[#00005E] hover:bg-[#F4F5FA] rounded-lg transition-colors cursor-pointer"
                        title="Edit Specs & Rates"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove ${car.name} from Harare fleet?`)) {
                            deleteCar(car.id);
                            showToast(`Deleted ${car.name}`);
                          }
                        }}
                        className="p-2 text-[#B71C24] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete vehicle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: BOOKINGS & LEADS MANAGER
            ======================================================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#D9DBE8] shadow-xs">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-[#6B6E80] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by client name, phone or vehicle..."
                    value={bookingSearch}
                    onChange={e => setBookingSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                  />
                </div>

                <select
                  value={bookingStatusFilter}
                  onChange={e => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none bg-white cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New Leads</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingBooking(true)}
                  className="px-4 py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record Walk-in Booking</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset inquiries to initial sample data?')) {
                      resetEnquiries();
                      showToast('Inquiries reset');
                    }
                  }}
                  className="p-2 border border-[#D9DBE8] text-[#6B6E80] hover:text-[#00005E] rounded-xl transition-colors cursor-pointer"
                  title="Reset Inquiries"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-[#D9DBE8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F5FA] border-b border-[#D9DBE8] text-[#6B6E80] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">Client &amp; Contact</th>
                      <th className="px-5 py-3.5">Vehicle Requested</th>
                      <th className="px-5 py-3.5">Dates &amp; Pick-up</th>
                      <th className="px-5 py-3.5">Rate / Offer</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Dispatch Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9DBE8]/60">
                    {filteredBookings.map(lead => (
                      <tr key={lead.id} className="hover:bg-[#F4F5FA]/60 transition-colors">
                        <td className="px-5 py-4">
                          <strong className="block text-sm font-serif font-bold text-[#00005E]">
                            {lead.fullName}
                          </strong>
                          <span className="text-[11px] text-[#6B6E80] block">{lead.phone}</span>
                          {lead.email && (
                            <span className="text-[10px] text-[#6B6E80]/80 block">{lead.email}</span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <strong className="block text-[#00005E] font-medium">{lead.carName}</strong>
                          <span className="text-[10px] text-emerald-700">
                            {lead.chauffeurNeeded ? 'Chauffeur Requested' : 'Self-Drive'}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="text-[11px] text-[#2E2E2E]">
                            {lead.startDate || 'Immediate'} → {lead.endDate || 'Flexible'}
                          </div>
                          <span className="text-[10px] text-[#6B6E80] block">
                            {lead.pickupLocation || '1 Drayton Ave, Greencroft'}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {lead.offerPrice ? (
                            <span className="font-bold text-[#00005E]">
                              ${lead.offerPrice}/day
                            </span>
                          ) : (
                            <span className="text-[#6B6E80]">Standard rate</span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <select
                            value={lead.status}
                            onChange={e => {
                              updateEnquiry(lead.id, { status: e.target.value as any });
                              showToast(`Status updated to ${e.target.value}`);
                            }}
                            className={`text-[11px] font-semibold px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                              lead.status === 'New'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : lead.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : lead.status === 'Completed'
                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                : 'bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openWhatsAppReply(lead)}
                              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                              title="Chat on WhatsApp"
                            >
                              <Phone className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>

                            <button
                              onClick={() => {
                                const note = prompt('Add dispatch internal note for this lead:', lead.notes || '');
                                if (note !== null) {
                                  updateEnquiry(lead.id, { notes: note });
                                  showToast('Dispatch note saved');
                                }
                              }}
                              className="p-1.5 text-[#00005E] hover:bg-[#F4F5FA] rounded-lg transition-colors cursor-pointer"
                              title="Dispatch Notes"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete lead from ${lead.fullName}?`)) {
                                  deleteEnquiry(lead.id);
                                  showToast('Lead deleted');
                                }
                              }}
                              className="p-1.5 text-[#B71C24] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {lead.notes && (
                            <p className="text-[10px] text-[#6B6E80] italic mt-1 max-w-xs line-clamp-1">
                              Note: {lead.notes}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: SETTINGS MANAGER
            ======================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-[#D9DBE8] p-6 sm:p-8 shadow-xs space-y-8 animate-fadeIn max-w-4xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9DBE8]">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#00005E]">
                  Company Facts &amp; Operations Settings
                </h3>
                <p className="text-xs text-[#6B6E80] mt-0.5">
                  Every business detail here dynamically powers the website headers, footers, receipts and Google SEO schema.
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm('Reset all settings to default business facts?')) {
                    resetSettings();
                    showToast('Settings restored');
                  }
                }}
                className="text-xs text-[#B71C24] font-semibold hover:underline cursor-pointer"
              >
                Reset to Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Business Trading Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={e => updateSettings({ name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Brand Line / Motto
                </label>
                <input
                  type="text"
                  value={settings.brandLine}
                  onChange={e => updateSettings({ brandLine: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Harare Physical Depot Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={e => updateSettings({ address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={e => updateSettings({ phone: e.target.value, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={e => updateSettings({ email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="text"
                  value={settings.facebook}
                  onChange={e => updateSettings({ facebook: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={e => updateSettings({ openingHours: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  ZiG Exchange Rate (ZiG per 1 USD)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.zigRate}
                  onChange={e => updateSettings({ zigRate: parseFloat(e.target.value) || 26.5 })}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>
            </div>

            {/* Toggleable Services */}
            <div className="pt-6 border-t border-[#D9DBE8]">
              <h4 className="text-sm font-bold text-[#00005E] mb-3">
                Public Directory &amp; Toggleable Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(settings.services).map(([key, enabled]) => (
                  <label key={key} className="flex items-center gap-2.5 p-3 rounded-xl border border-[#D9DBE8] hover:bg-[#F4F5FA] cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={e => {
                        updateSettings({
                          services: {
                            ...settings.services,
                            [key]: e.target.checked
                          }
                        });
                        showToast('Service availability updated');
                      }}
                      className="rounded text-[#B71C24] focus:ring-[#B71C24]"
                    />
                    <span className="capitalize font-medium text-[#2E2E2E]">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => showToast('All settings successfully saved!')}
                className="px-6 py-2.5 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Save All Changes
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: TESTIMONIALS & REVIEWS MANAGER
            ======================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#D9DBE8] shadow-xs">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#00005E]">
                  Verified Client Testimonials &amp; Moderation
                </h3>
                <p className="text-xs text-[#6B6E80]">
                  Approve, feature on homepage, or add newly submitted verified feedback.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingReview(true)}
                  className="px-4 py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Verified Review</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset testimonials to default seed reviews?')) {
                      resetTestimonials();
                      showToast('Testimonials reset');
                    }
                  }}
                  className="p-2 border border-[#D9DBE8] text-[#6B6E80] hover:text-[#00005E] rounded-xl transition-colors cursor-pointer"
                  title="Reset Testimonials"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#D9DBE8] p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-[#E5A823]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          updateTestimonial(item.id, { featured: !item.featured });
                          showToast(`Featured toggle updated for ${item.name}`);
                        }}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full cursor-pointer flex items-center gap-1 ${
                          item.featured
                            ? 'bg-[#00005E] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        <span>{item.featured ? 'Featured' : 'Not Featured'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#2E2E2E] italic leading-relaxed mb-4">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D9DBE8]/60 flex items-center justify-between">
                    <div>
                      <strong className="block text-xs font-semibold text-[#00005E]">{item.name}</strong>
                      <span className="text-[10px] text-[#6B6E80]">{item.roleOrCompany} · {item.carHired}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete review from ${item.name}?`)) {
                          deleteTestimonial(item.id);
                          showToast('Review deleted');
                        }
                      }}
                      className="p-1 text-[#B71C24] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          EDIT / ADD CAR MODAL
          ======================================================== */}
      {(editingCar || isAddingCar) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#D9DBE8] max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9DBE8]">
              <h3 className="font-serif font-bold text-xl text-[#00005E]">
                {editingCar ? `Edit ${editingCar.name}` : 'Add Vehicle to Harare Fleet'}
              </h3>
              <button
                onClick={() => {
                  setEditingCar(null);
                  setIsAddingCar(false);
                }}
                className="p-1.5 text-[#6B6E80] hover:text-[#2E2E2E] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCar} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Car Name &amp; Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mercedes-Benz E-Class"
                    value={carForm.name || ''}
                    onChange={e => setCarForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Vehicle Category *
                  </label>
                  <select
                    value={carForm.categoryId || 'suvs-crossovers'}
                    onChange={e => setCarForm(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="executive-sedans">Executive Sedans</option>
                    <option value="suvs-crossovers">SUVs &amp; Crossovers</option>
                    <option value="double-cabs-4x4">Double Cabs &amp; 4x4s</option>
                    <option value="economy-city-cars">Economy City Cars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Daily Rate (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={carForm.dailyRate || ''}
                    onChange={e => setCarForm(prev => ({ ...prev, dailyRate: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Weekly Rate (USD / day)
                  </label>
                  <input
                    type="number"
                    value={carForm.weeklyRate || ''}
                    onChange={e => setCarForm(prev => ({ ...prev, weeklyRate: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Refundable Security Deposit (USD)
                  </label>
                  <input
                    type="number"
                    value={carForm.deposit || ''}
                    onChange={e => setCarForm(prev => ({ ...prev, deposit: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Chauffeur Daily Fee (USD)
                  </label>
                  <input
                    type="number"
                    value={carForm.chauffeurDailyRate || ''}
                    onChange={e => setCarForm(prev => ({ ...prev, chauffeurDailyRate: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Transmission
                  </label>
                  <select
                    value={carForm.transmission || 'Automatic'}
                    onChange={e => setCarForm(prev => ({ ...prev, transmission: e.target.value as any }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                    Fuel Type
                  </label>
                  <select
                    value={carForm.fuel || 'Diesel'}
                    onChange={e => setCarForm(prev => ({ ...prev, fuel: e.target.value as any }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none"
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Tagline / Brief Summary
                </label>
                <input
                  type="text"
                  placeholder="e.g. Supreme executive presence for corporate and diplomatic transit"
                  value={carForm.tagline || ''}
                  onChange={e => setCarForm(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  placeholder="/vehicle-photos/mercedes-e-class.jpg"
                  value={carForm.images ? carForm.images[0] : ''}
                  onChange={e => setCarForm(prev => ({ ...prev, images: [e.target.value] }))}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={carForm.featured || false}
                    onChange={e => setCarForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded text-[#B71C24]"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={carForm.chauffeurAvailable !== false}
                    onChange={e => setCarForm(prev => ({ ...prev, chauffeurAvailable: e.target.checked }))}
                    className="rounded text-[#B71C24]"
                  />
                  <span>Chauffeur Option Available</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#D9DBE8]">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCar(null);
                    setIsAddingCar(false);
                  }}
                  className="px-4 py-2 border border-[#D9DBE8] text-xs font-medium rounded-xl hover:bg-[#F4F5FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                >
                  Save Vehicle Specs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          ADD MANUAL BOOKING MODAL
          ======================================================== */}
      {isAddingBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#D9DBE8] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9DBE8]">
              <h3 className="font-serif font-bold text-lg text-[#00005E]">
                Record Walk-In / Phone Reservation
              </h3>
              <button
                onClick={() => setIsAddingBooking(false)}
                className="p-1.5 text-[#6B6E80] hover:text-[#2E2E2E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!bookingForm.fullName || !bookingForm.phone) return;
                addEnquiry({
                  fullName: bookingForm.fullName,
                  phone: bookingForm.phone,
                  email: bookingForm.email || '',
                  carSlug: bookingForm.carSlug || 'toyota-hilux-double-cab',
                  carName: bookingForm.carName || 'Toyota Hilux Double Cab 4x4',
                  startDate: bookingForm.startDate || new Date().toISOString().split('T')[0],
                  endDate: bookingForm.endDate || '',
                  chauffeurNeeded: Boolean(bookingForm.chauffeurNeeded),
                  pickupLocation: bookingForm.pickupLocation || '1 Drayton Ave, Greencroft',
                  offerPrice: bookingForm.offerPrice ? Number(bookingForm.offerPrice) : null,
                  message: bookingForm.message || 'Direct telephone booking at Greencroft office.',
                  status: (bookingForm.status as any) || 'Confirmed',
                  notes: bookingForm.notes || 'Recorded via admin portal.'
                });
                showToast(`Recorded reservation for ${bookingForm.fullName}`);
                setIsAddingBooking(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brian Munemo"
                  value={bookingForm.fullName || ''}
                  onChange={e => setBookingForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+263 77 123 4567"
                  value={bookingForm.phone || ''}
                  onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Vehicle</label>
                <select
                  value={bookingForm.carSlug || cars[0]?.slug}
                  onChange={e => {
                    const sel = cars.find(c => c.slug === e.target.value);
                    setBookingForm(prev => ({ ...prev, carSlug: e.target.value, carName: sel?.name }));
                  }}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none cursor-pointer"
                >
                  {cars.map(c => (
                    <option key={c.id} value={c.slug}>
                      {c.name} (${c.dailyRate}/day)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Pick-up Date</label>
                  <input
                    type="date"
                    value={bookingForm.startDate || ''}
                    onChange={e => setBookingForm(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Return Date</label>
                  <input
                    type="date"
                    value={bookingForm.endDate || ''}
                    onChange={e => setBookingForm(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#D9DBE8]">
                <button
                  type="button"
                  onClick={() => setIsAddingBooking(false)}
                  className="px-4 py-2 border border-[#D9DBE8] text-xs font-medium rounded-xl hover:bg-[#F4F5FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          ADD TESTIMONIAL MODAL
          ======================================================== */}
      {isAddingReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#D9DBE8] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9DBE8]">
              <h3 className="font-serif font-bold text-lg text-[#00005E]">
                Add Verified Client Review
              </h3>
              <button
                onClick={() => setIsAddingReview(false)}
                className="p-1.5 text-[#6B6E80] hover:text-[#2E2E2E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!reviewForm.name || !reviewForm.quote) return;
                addTestimonial({
                  id: `review-${Date.now()}`,
                  name: reviewForm.name,
                  roleOrCompany: reviewForm.roleOrCompany || 'Executive Client',
                  location: reviewForm.location || 'Harare, Zimbabwe',
                  category: (reviewForm.category as any) || 'corporate',
                  carHired: reviewForm.carHired || 'Mercedes-Benz E-Class',
                  rating: Number(reviewForm.rating) || 5,
                  date: 'Just now',
                  quote: reviewForm.quote,
                  verifiedBooking: true,
                  featured: Boolean(reviewForm.featured),
                  approved: true
                });
                showToast(`Review by ${reviewForm.name} published`);
                setIsAddingReview(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cynthia Musanhi"
                  value={reviewForm.name || ''}
                  onChange={e => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Role / Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Operations Lead"
                    value={reviewForm.roleOrCompany || ''}
                    onChange={e => setReviewForm(prev => ({ ...prev, roleOrCompany: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Vehicle Hired</label>
                  <input
                    type="text"
                    placeholder="e.g. Toyota Hilux 4x4"
                    value={reviewForm.carHired || ''}
                    onChange={e => setReviewForm(prev => ({ ...prev, carHired: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2E2E] mb-1">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the review text..."
                  value={reviewForm.quote || ''}
                  onChange={e => setReviewForm(prev => ({ ...prev, quote: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-[#D9DBE8] rounded-xl outline-none focus:border-[#00005E]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="feat-chk"
                  checked={reviewForm.featured || false}
                  onChange={e => setReviewForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded text-[#B71C24]"
                />
                <label htmlFor="feat-chk" className="text-xs text-[#2E2E2E] cursor-pointer">
                  Feature on website homepage
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#D9DBE8]">
                <button
                  type="button"
                  onClick={() => setIsAddingReview(false)}
                  className="px-4 py-2 border border-[#D9DBE8] text-xs font-medium rounded-xl hover:bg-[#F4F5FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
