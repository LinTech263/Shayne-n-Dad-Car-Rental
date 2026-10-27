import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialSettings } from '../data/settings';
import { initialCars } from '../data/cars';
import { categories } from '../data/categories';
import { services } from '../data/services';
import { guides } from '../data/guides';
import { BusinessSettings, Car, Category, ServiceItem, GuideArticle } from '../types';
import { updateDocumentMeta, injectStructuredData, getAutoRentalSchema } from '../utils/seo';

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  cars: Car[];
  categories: Category[];
  servicesList: ServiceItem[];
  guidesList: GuideArticle[];
  currency: 'USD' | 'ZiG';
  toggleCurrency: () => void;
  savedCarSlugs: string[];
  toggleSaveCar: (slug: string) => void;
  isCarSaved: (slug: string) => boolean;
  compareSlugs: string[];
  toggleCompareCar: (slug: string) => void;
  isCarInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  isCompareDrawerOpen: boolean;
  setIsCompareDrawerOpen: (open: boolean) => void;
  isCallbackModalOpen: boolean;
  setIsCallbackModalOpen: (open: boolean) => void;
  enquiryModalData: { isOpen: boolean; carSlug?: string; carName?: string; dates?: { start: string; end: string } };
  openEnquiryModal: (carSlug?: string, carName?: string, dates?: { start: string; end: string }) => void;
  closeEnquiryModal: () => void;
  searchFilter: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    pickupLocation: string;
    categoryId: string;
  };
  setSearchFilter: React.Dispatch<React.SetStateAction<{
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    pickupLocation: string;
    categoryId: string;
  }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function normalizePath(rawPath: string): string {
  if (!rawPath) return '/';
  const clean = rawPath.split('?')[0].split('#')[0];
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean || '/';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const [settings, setSettings] = useState<BusinessSettings>(initialSettings);
  const [cars] = useState<Car[]>(initialCars);
  const [currency, setCurrency] = useState<'USD' | 'ZiG'>('USD');
  const [savedCarSlugs, setSavedCarSlugs] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('shayne_saved_cars');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [enquiryModalData, setEnquiryModalData] = useState<{
    isOpen: boolean;
    carSlug?: string;
    carName?: string;
    dates?: { start: string; end: string };
  }>({ isOpen: false });

  // Default dates: tomorrow to 4 days later
  const getDefaultDates = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 1);
    const end = new Date(today);
    end.setDate(today.getDate() + 4);
    return {
      startDate: start.toISOString().split('T')[0],
      startTime: '09:00',
      endDate: end.toISOString().split('T')[0],
      endTime: '09:00',
      pickupLocation: 'greencroft-office',
      categoryId: 'all'
    };
  };

  const [searchFilter, setSearchFilter] = useState(getDefaultDates);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Save wishlist in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shayne_saved_cars', JSON.stringify(savedCarSlugs));
    } catch {
      // storage unavailable
    }
  }, [savedCarSlugs]);

  // Inject initial AutoRental structured data
  useEffect(() => {
    injectStructuredData('global-autorental-schema', getAutoRentalSchema());
  }, []);

  const navigate = (path: string) => {
    const norm = normalizePath(path);
    if (norm === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', norm);
    setCurrentPath(norm);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'USD' ? 'ZiG' : 'USD'));
  };

  const toggleSaveCar = (slug: string) => {
    setSavedCarSlugs(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isCarSaved = (slug: string) => savedCarSlugs.includes(slug);

  const toggleCompareCar = (slug: string) => {
    setCompareSlugs(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      }
      if (prev.length >= 3) {
        // limit to 3 cars
        return [...prev.slice(1), slug];
      }
      return [...prev, slug];
    });
  };

  const isCarInCompare = (slug: string) => compareSlugs.includes(slug);

  const clearCompare = () => setCompareSlugs([]);

  const openEnquiryModal = (carSlug?: string, carName?: string, dates?: { start: string; end: string }) => {
    setEnquiryModalData({
      isOpen: true,
      carSlug,
      carName,
      dates
    });
  };

  const closeEnquiryModal = () => {
    setEnquiryModalData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        settings,
        updateSettings,
        cars,
        categories,
        servicesList: services,
        guidesList: guides,
        currency,
        toggleCurrency,
        savedCarSlugs,
        toggleSaveCar,
        isCarSaved,
        compareSlugs,
        toggleCompareCar,
        isCarInCompare,
        clearCompare,
        isCompareDrawerOpen,
        setIsCompareDrawerOpen,
        isCallbackModalOpen,
        setIsCallbackModalOpen,
        enquiryModalData,
        openEnquiryModal,
        closeEnquiryModal,
        searchFilter,
        setSearchFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
