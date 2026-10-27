import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';
import { MobileStickyBottomBar } from './components/common/MobileStickyBottomBar';
import { CallbackModal } from './components/common/CallbackModal';
import { EnquiryOfferModal } from './components/common/EnquiryOfferModal';
import { CompareDrawer } from './components/common/CompareDrawer';
import { CookieBanner } from './components/common/CookieBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { CarsPage } from './pages/CarsPage';
import { CategoryPage } from './pages/CategoryPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { LocalLandingPage } from './pages/LocalLandingPage';
import { AboutPage } from './pages/AboutPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FAQPage } from './pages/FAQPage';
import { GuidesIndexPage } from './pages/GuidesIndexPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { ContactPage } from './pages/ContactPage';
import { EnquirePage } from './pages/EnquirePage';
import { RentalTermsPage } from './pages/RentalTermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

import {
  updateDocumentMeta,
  injectStructuredData,
  getCarSchema,
  getArticleSchema,
  getFAQSchema,
  getBreadcrumbSchema
} from './utils/seo';
import { faqs } from './data/faq';

function AppContent() {
  const { currentPath, categories, cars, servicesList, guidesList } = useApp();

  // Dynamic SEO & Structured Data updates on route change
  useEffect(() => {
    let title = "Car Hire Harare | Luxury & Self-Drive Rental | Shayne'n'Dad";
    let desc = "Hire executive sedans, SUVs and double cabs in Harare. See live availability, book online and pay by EcoCash or card. Delivery and airport transfers available.";

    if (currentPath === '/') {
      updateDocumentMeta(title, desc, '/');
    } else if (currentPath === '/cars') {
      title = "Our Fleet | Cars for Hire in Harare | Shayne'n'Dad";
      desc = "Browse sedans, SUVs and double cabs for hire in Harare. Check live availability, compare daily rates and book online in minutes.";
      updateDocumentMeta(title, desc, '/cars');
    } else if (currentPath.startsWith('/cars/')) {
      const slug = currentPath.replace('/cars/', '');
      const matchedCar = cars.find(c => c.slug === slug);
      if (matchedCar) {
        title = matchedCar.seoTitle || `${matchedCar.name} Hire Harare | Shayne'n'Dad Car Rental`;
        desc = matchedCar.seoDescription || matchedCar.description.substring(0, 155);
        updateDocumentMeta(title, desc, currentPath);
        injectStructuredData('car-product-schema', getCarSchema(matchedCar));
      } else {
        const matchedCategory = categories.find(c => c.slug === slug);
        if (matchedCategory) {
          title = matchedCategory.seoTitle;
          desc = matchedCategory.seoDescription;
          updateDocumentMeta(title, desc, currentPath);
        }
      }
    } else if (currentPath === '/services') {
      title = "Car Rental Services in Harare | Self-Drive & Chauffeur | Shayne'n'Dad";
      desc = "Full car rental services in Harare: self-drive, executive chauffeur, airport transfers, delivery, corporate leasing, wedding cars and safari gear.";
      updateDocumentMeta(title, desc, '/services');
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const matchedService = servicesList.find(s => s.slug === slug);
      if (matchedService) {
        title = `${matchedService.title} in Harare | Shayne'n'Dad Car Rental`;
        desc = matchedService.shortDesc;
        updateDocumentMeta(title, desc, currentPath);
      }
    } else if (currentPath === '/car-hire-harare') {
      title = "Car Hire Harare | Greencroft, Borrowdale, Avondale | Shayne'n'Dad";
      desc = "Car hire located at 1 Drayton Avenue, Greencroft, Harare. Serving Borrowdale, Avondale, Mt Pleasant, and Harare Airport. Open 7 days.";
      updateDocumentMeta(title, desc, '/car-hire-harare');
    } else if (currentPath === '/about' || currentPath === '/about-us') {
      title = "About Shayne'n'Dad Car Rental | Driven by Excellence | Harare";
      desc = "Learn about Shayne'n'Dad Car Rental in Greencroft, Harare. Upmarket executive fleet, transparent pricing, and dependable 7-day service.";
      updateDocumentMeta(title, desc, currentPath);
    } else if (currentPath === '/testimonials') {
      title = "Client Reviews & Testimonials | Shayne'n'Dad Car Rental Harare";
      desc = "Verified reviews from corporate executives, diaspora visitors, wedding planners, and 4x4 safari hirers with Shayne'n'Dad Car Rental in Harare.";
      updateDocumentMeta(title, desc, '/testimonials');
    } else if (currentPath === '/how-it-works') {
      title = "How Renting Works | 3 Easy Steps | Shayne'n'Dad Car Rental";
      desc = "Book in 3 steps: choose dates, pay with EcoCash or card, and receive your verification QR code on WhatsApp. Collect at Greencroft or airport.";
      updateDocumentMeta(title, desc, '/how-it-works');
    } else if (currentPath === '/faq') {
      title = "Car Hire FAQs Harare | Pricing, Requirements & Insurance | Shayne'n'Dad";
      desc = "Common questions about hiring a car in Harare. Requirements, payments via EcoCash/cards, security deposits, and insurance.";
      updateDocumentMeta(title, desc, '/faq');
      injectStructuredData('faq-schema', getFAQSchema(faqs));
    } else if (currentPath === '/guides') {
      title = "Harare Car Hire & Travel Guides | Shayne'n'Dad";
      desc = "Expert advice on driving in Zimbabwe, airport transfers, self-drive versus chauffeur hire, and road trip vehicle selection.";
      updateDocumentMeta(title, desc, '/guides');
    } else if (currentPath.startsWith('/guides/')) {
      const slug = currentPath.replace('/guides/', '');
      const matchedGuide = guidesList.find(g => g.slug === slug);
      if (matchedGuide) {
        title = `${matchedGuide.title} | Shayne'n'Dad Harare`;
        desc = matchedGuide.metaDescription;
        updateDocumentMeta(title, desc, currentPath);
        injectStructuredData('article-schema', getArticleSchema(matchedGuide));
      }
    } else if (currentPath === '/contact' || currentPath === '/contact-us') {
      title = "Contact Shayne'n'Dad Car Rental | Greencroft, Harare";
      desc = "Call or WhatsApp +263 77 293 6555 or visit us at 1 Drayton Avenue, Greencroft, Harare. Open seven days a week.";
      updateDocumentMeta(title, desc, currentPath);
    } else if (currentPath === '/enquire') {
      title = "Make an Offer / Enquire | Shayne'n'Dad Car Rental";
      desc = "Request a bespoke quote or propose your preferred rental rate on any vehicle in our Harare fleet. Fast human responses.";
      updateDocumentMeta(title, desc, '/enquire');
    } else if (currentPath === '/rental-terms') {
      title = "Rental Terms & Policies | Shayne'n'Dad Car Rental Harare";
      desc = "Read our transparent rental requirements, security deposit rules, insurance excess limits, and cancellation policies.";
      updateDocumentMeta(title, desc, '/rental-terms');
    } else if (currentPath === '/privacy-policy') {
      title = "Privacy Policy | Zimbabwe Data Protection | Shayne'n'Dad";
      desc = "How we protect and handle your personal identification and booking records in compliance with Zimbabwean law.";
      updateDocumentMeta(title, desc, '/privacy-policy');
    } else if (currentPath === '/terms') {
      title = "Terms of Website Use | Shayne'n'Dad Car Rental";
      desc = "Terms and conditions governing the use of the Shayne'n'Dad Car Rental online booking platform.";
      updateDocumentMeta(title, desc, '/terms');
    }
  }, [currentPath, cars, categories, servicesList, guidesList]);

  // Route Resolver
  const renderRoute = () => {
    const cleanPath = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    if (cleanPath === '/' || cleanPath === '') {
      return <HomePage />;
    }
    if (cleanPath === '/cars') {
      return <CarsPage />;
    }
    if (cleanPath.startsWith('/cars/')) {
      const slug = cleanPath.replace('/cars/', '').trim();
      if (!slug) return <CarsPage />;
      const isCategory = categories.some(c => c.slug === slug);
      if (isCategory) {
        return <CategoryPage categorySlug={slug} />;
      }
      return <CarDetailPage carSlug={slug} />;
    }
    if (cleanPath === '/services') {
      return <ServicesPage />;
    }
    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '').trim();
      if (!slug) return <ServicesPage />;
      return <ServiceDetailPage serviceSlug={slug} />;
    }
    if (cleanPath === '/car-hire-harare') {
      return <LocalLandingPage />;
    }
    if (cleanPath === '/about' || cleanPath === '/about-us') {
      return <AboutPage />;
    }
    if (cleanPath === '/testimonials') {
      return <TestimonialsPage />;
    }
    if (cleanPath === '/how-it-works') {
      return <HowItWorksPage />;
    }
    if (cleanPath === '/faq') {
      return <FAQPage />;
    }
    if (cleanPath === '/guides') {
      return <GuidesIndexPage />;
    }
    if (cleanPath.startsWith('/guides/')) {
      const slug = cleanPath.replace('/guides/', '').trim();
      if (!slug) return <GuidesIndexPage />;
      return <GuideDetailPage guideSlug={slug} />;
    }
    if (cleanPath === '/contact' || cleanPath === '/contact-us') {
      return <ContactPage />;
    }
    if (cleanPath === '/enquire') {
      return <EnquirePage />;
    }
    if (cleanPath === '/rental-terms') {
      return <RentalTermsPage />;
    }
    if (cleanPath === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (cleanPath === '/terms') {
      return <TermsPage />;
    }
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2E2E2E]">
      <Header />
      <main className="flex-1" id="main-content">
        {renderRoute()}
      </main>
      <Footer />

      {/* Global Interactive Elements */}
      <FloatingWhatsAppButton />
      <MobileStickyBottomBar />
      <CallbackModal />
      <EnquiryOfferModal />
      <CompareDrawer />
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
