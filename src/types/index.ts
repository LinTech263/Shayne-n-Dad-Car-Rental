export interface BusinessSettings {
  name: string;
  brandLine: string;
  address: string;
  phone: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string;
  facebook: string;
  openingHours: string;
  currency: 'USD' | 'ZiG';
  zigRate: number; // e.g. 26.5 ZiG per 1 USD
  timeZone: string;
  callbackPromiseEnabled: boolean;
  callbackPromiseText: string;
  services: {
    selfDrive: boolean;
    chauffeurDriven: boolean;
    airportTransfers: boolean;
    deliveryCollection: boolean;
    corporateLongTerm: boolean;
    weddingEvents: boolean;
    outdoorEquipment: boolean;
  };
  pickupLocations: Array<{
    id: string;
    name: string;
    fee: number;
    description: string;
  }>;
  bookingRules: {
    bufferHours: number;
    minNoticeHours: number;
    minRentalDays: number;
    sameDayCutoffHour: number; // 16 for 4 PM
    securityDepositRequired: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  featuredOrder: number;
}

export interface Car {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  year: number;
  make: string;
  model: string;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Hybrid';
  seats: number;
  doors: number;
  luggage: string;
  engine: string;
  features: string[];
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  deposit: number;
  chauffeurAvailable: boolean;
  chauffeurDailyRate: number;
  mileageAllowance: string;
  status: 'available' | 'booked' | 'maintenance';
  nextFreeDate?: string;
  images: string[];
  featured: boolean;
  isDemo: boolean;
  tagline: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  headline: string;
  openingParagraph: string;
  benefits: string[];
  howItWorks: Array<{
    step: string;
    title: string;
    desc: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  iconName: string;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  author: string;
  category: string;
  content: string[];
  keyTakeaways: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedCarSlugs?: string[];
  relatedServiceSlugs?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'booking' | 'payment' | 'insurance' | 'fleet' | 'handover';
}

export interface RentalQuote {
  car: Car;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  days: number;
  ratePerDay: number;
  baseTotal: number;
  chauffeurSelected: boolean;
  chauffeurTotal: number;
  deliveryLocationId: string;
  deliveryFee: number;
  selectedExtras: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  extrasTotal: number;
  subtotal: number;
  deposit: number;
  grandTotal: number;
  dueNow: number;
  currency: 'USD' | 'ZiG';
  zigRate: number;
  grandTotalZiG: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  roleOrCompany: string;
  location: string;
  category: 'corporate' | 'diaspora' | 'wedding' | 'safari' | 'local';
  carHired: string;
  carSlug?: string;
  rating: number;
  date: string;
  quote: string;
  verifiedBooking: boolean;
  featured?: boolean;
  approved?: boolean;
}

export interface EnquiryItem {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  carSlug: string;
  carName: string;
  startDate?: string;
  endDate?: string;
  chauffeurNeeded?: boolean;
  pickupLocation?: string;
  offerPrice?: number | null;
  message?: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
}
