import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  Bookmark,
  Scale,
  CarFront,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPath,
    navigate,
    settings,
    categories,
    servicesList,
    currency,
    toggleCurrency,
    savedCarSlugs,
    compareSlugs,
    setIsCompareDrawerOpen,
    setIsCallbackModalOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [carsDropdownOpen, setCarsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCarsDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [currentPath]);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setCarsDropdownOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#05053A] text-white text-[11px] border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D9DBE8]">
              <Clock className="w-3 h-3 text-[#B71C24]" />
              <span>Open 7 Days · 07:00 – 18:00 (24/7 Handover on Request)</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-[#D9DBE8]">
              <ShieldCheck className="w-3 h-3 text-[#B71C24]" />
              <span>1 Drayton Avenue, Greencroft, Harare</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCallbackModalOpen(true)}
              className="text-xs text-[#D9DBE8] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Request Call-Back
            </button>
            <span className="text-white/20">|</span>
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#D9DBE8] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>+263 77 293 6555</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header: Solid White Bar so Logo sits on White with Hairline Rule */}
      <header
        className={`sticky top-0 z-40 border-b border-[#D9DBE8] transition-all duration-300 ${
          isScrolled ? 'liquid-glass py-2.5 shadow-sm' : 'bg-white py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: Logo Plate */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
              aria-label="Shayne'n'Dad Car Rental Home"
            >
              <div className="bg-white p-1 rounded-xs flex items-center">
                <img
                  src="/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg"
                  alt="Shayne'n'Dad Car Rental"
                  className={`object-contain transition-all duration-200 ${
                    isScrolled ? 'h-9 w-auto' : 'h-11 w-auto'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean, Single-line, No Pills) */}
          <nav
            className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#2E2E2E]"
            aria-label="Main Navigation"
          >
            {/* Cars Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setCarsDropdownOpen(true)}
              onMouseLeave={() => setCarsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('/cars')}
                className={`flex items-center gap-1 py-2 hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentPath.startsWith('/cars') ? 'text-[#00005E] font-semibold' : ''
                }`}
                aria-expanded={carsDropdownOpen}
              >
                <span>Fleet</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B6E80]" />
              </button>

              {/* Cars Dropdown / Mega Menu */}
              {carsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#D9DBE8] shadow-xl py-3 rounded-xs z-50 animate-fadeIn">
                  <div className="px-4 py-1.5 border-b border-[#D9DBE8]/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00005E]">
                      Fleet Categories
                    </span>
                    <button
                      onClick={() => handleNav('/cars')}
                      className="text-[11px] text-[#B71C24] font-medium hover:underline flex items-center gap-0.5"
                    >
                      <span>View all</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="py-1">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleNav(`/cars/${cat.slug}`)}
                        className="w-full px-4 py-2 text-left hover:bg-[#F4F5FA] flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#00005E] group-hover:text-[#B71C24] transition-colors">
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-[#6B6E80] line-clamp-1">
                            {cat.description}
                          </div>
                        </div>
                        <span className="text-xs text-[#B71C24] opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('/services')}
                className={`flex items-center gap-1 py-2 hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentPath.startsWith('/services') ? 'text-[#00005E] font-semibold' : ''
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B6E80]" />
              </button>

              {/* Services Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#D9DBE8] shadow-xl py-3 rounded-xs z-50 animate-fadeIn">
                  <div className="px-4 py-1.5 border-b border-[#D9DBE8]/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00005E]">
                      Rental Services
                    </span>
                    <button
                      onClick={() => handleNav('/services')}
                      className="text-[11px] text-[#B71C24] font-medium hover:underline flex items-center gap-0.5"
                    >
                      <span>Overview</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="py-1">
                    {servicesList.map(svc => (
                      <button
                        key={svc.id}
                        onClick={() => handleNav(`/services/${svc.slug}`)}
                        className="w-full px-4 py-2 text-left hover:bg-[#F4F5FA] flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#00005E] group-hover:text-[#B71C24] transition-colors">
                            {svc.title}
                          </div>
                          <div className="text-[11px] text-[#6B6E80] line-clamp-1">
                            {svc.shortDesc}
                          </div>
                        </div>
                        <span className="text-xs text-[#B71C24] opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/car-hire-harare')}
              className={`hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPath === '/car-hire-harare' ? 'text-[#00005E] font-semibold' : ''
              }`}
            >
              Harare Hub
            </button>

            <button
              onClick={() => handleNav('/how-it-works')}
              className={`hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPath === '/how-it-works' ? 'text-[#00005E] font-semibold' : ''
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => handleNav('/guides')}
              className={`hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPath.startsWith('/guides') ? 'text-[#00005E] font-semibold' : ''
              }`}
            >
              Guides
            </button>

            <button
              onClick={() => handleNav('/testimonials')}
              className={`hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPath === '/testimonials' ? 'text-[#00005E] font-semibold' : ''
              }`}
            >
              Testimonials
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPath === '/about' || currentPath === '/about-us' ? 'text-[#00005E] font-semibold' : ''
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className={`hover:text-[#00005E] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPath === '/contact' || currentPath === '/contact-us' ? 'text-[#00005E] font-semibold' : ''
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Zone 3: Actions (Currency, Compare, Availability CTA, WhatsApp) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency Switcher */}
            <button
              onClick={toggleCurrency}
              className="text-xs font-semibold px-2 py-1.5 border border-[#D9DBE8] rounded-xs hover:border-[#00005E] text-[#2E2E2E] transition-colors flex items-center gap-1 cursor-pointer"
              title="Switch between USD and Zimbabwe Gold (ZiG)"
              aria-label={`Currency: ${currency}. Click to switch.`}
            >
              <span className={currency === 'USD' ? 'text-[#00005E] font-bold' : 'text-[#6B6E80]'}>USD</span>
              <span className="text-[#D9DBE8]">/</span>
              <span className={currency === 'ZiG' ? 'text-[#B71C24] font-bold' : 'text-[#6B6E80]'}>ZiG</span>
            </button>

            {/* Compare Drawer Trigger */}
            {compareSlugs.length > 0 && (
              <button
                onClick={() => setIsCompareDrawerOpen(true)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#00005E] bg-[#F4F5FA] border border-[#D9DBE8] rounded-xs hover:bg-[#D9DBE8]/40 transition-colors cursor-pointer"
                aria-label={`Compare ${compareSlugs.length} cars`}
              >
                <Scale className="w-3.5 h-3.5 text-[#B71C24]" />
                <span>Compare ({compareSlugs.length})</span>
              </button>
            )}

            {/* Direct WhatsApp Action Link */}
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 border border-[#D9DBE8] hover:border-[#25D366] text-[#25D366] rounded-xs transition-colors hover:bg-emerald-50/50"
              title="Chat on WhatsApp (+263 77 293 6555)"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Primary Action Button: Solid Brand Red */}
            <button
              onClick={() => handleNav('/cars')}
              className="hidden sm:inline-flex px-4 py-2 bg-[#B71C24] hover:bg-[#9A151C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap shrink-0 shadow-sm active:translate-y-px"
            >
              Check Availability
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-[#00005E] border border-[#D9DBE8] rounded-xs hover:bg-[#F4F5FA] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] z-50 bg-white border-t border-[#D9DBE8] overflow-y-auto animate-fadeIn">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9DBE8]">
              <span className="text-xs uppercase tracking-wider font-bold text-[#00005E]">
                Menu &amp; Navigation
              </span>
              <button
                onClick={toggleCurrency}
                className="text-xs font-bold px-2.5 py-1 border border-[#D9DBE8] rounded-xs"
              >
                Currency: <span className="text-[#B71C24]">{currency}</span>
              </button>
            </div>

            <nav className="space-y-4">
              <button
                onClick={() => handleNav('/')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                Home
              </button>

              <button
                onClick={() => handleNav('/cars')}
                className="block w-full text-left text-base font-semibold text-[#00005E] flex items-center justify-between"
              >
                <span>The Fleet (All Cars)</span>
                <span className="text-xs text-[#B71C24]">View →</span>
              </button>

              <div className="pl-3 border-l-2 border-[#D9DBE8] space-y-2 py-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNav(`/cars/${cat.slug}`)}
                    className="block w-full text-left text-xs text-[#6B6E80] hover:text-[#00005E]"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleNav('/services')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                Services
              </button>

              <button
                onClick={() => handleNav('/car-hire-harare')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                Harare Hub &amp; Locations
              </button>

              <button
                onClick={() => handleNav('/how-it-works')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                How It Works
              </button>

              <button
                onClick={() => handleNav('/guides')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                Travel Guides
              </button>

              <button
                onClick={() => handleNav('/faq')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                Frequently Asked Questions
              </button>

              <button
                onClick={() => handleNav('/testimonials')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                Client Testimonials &amp; Reviews
              </button>

              <button
                onClick={() => handleNav('/about')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                About Us
              </button>

              <button
                onClick={() => handleNav('/contact')}
                className="block w-full text-left text-base font-semibold text-[#2E2E2E] hover:text-[#00005E]"
              >
                Contact Us
              </button>
            </nav>

            <div className="pt-6 border-t border-[#D9DBE8] space-y-3">
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+263 77 293 6555)</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCallbackModalOpen(true);
                }}
                className="w-full py-2.5 border border-[#00005E] text-[#00005E] text-xs font-semibold uppercase tracking-wider rounded-xs"
              >
                Request Same-Day Call-Back
              </button>
            </div>

            <div className="pt-4 text-center">
              <p className="text-xs text-[#6B6E80] italic">driven by excellence...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
