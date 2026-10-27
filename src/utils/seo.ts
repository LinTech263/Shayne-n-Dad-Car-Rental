import { Car, GuideArticle, FAQItem } from '../types';

export const SITE_URL = 'https://shaynendadcarrental.co.zw';
export const BRAND_NAME = "Shayne'n'Dad Car Rental";

export function getAutoRentalSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${SITE_URL}/#autorental`,
    name: BRAND_NAME,
    alternateName: ["Shayne'n'Dad Car Rentals", 'Shayne n Dad', 'Shaynendad'],
    slogan: 'driven by excellence...',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg`,
    image: `${SITE_URL}/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg`,
    description: 'Premier upmarket car rental in Harare, Zimbabwe. Executive sedans, luxury SUVs, 4x4 double cabs, self-drive, chauffeur-driven, and airport transfers.',
    telephone: '+263772936555',
    email: 'shaynendacarrental@gmail.com',
    priceRange: '$45 - $150 USD',
    currenciesAccepted: 'USD, ZiG',
    paymentAccepted: 'Cash, Credit Card, EcoCash, OneMoney, Telecash',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Drayton Avenue, Greencroft',
      addressLocality: 'Harare',
      addressRegion: 'Harare',
      addressCountry: 'ZW'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -17.7836,
      longitude: 31.0025
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '07:00',
        closes: '18:00'
      }
    ],
    areaServed: [
      { '@type': 'City', name: 'Harare' },
      { '@type': 'AdministrativeArea', name: 'Greencroft' },
      { '@type': 'AdministrativeArea', name: 'Borrowdale' },
      { '@type': 'AdministrativeArea', name: 'Avondale' },
      { '@type': 'AdministrativeArea', name: 'Mount Pleasant' },
      { '@type': 'Country', name: 'Zimbabwe' }
    ],
    sameAs: [
      'https://www.facebook.com/shaynendad/'
    ]
  };
}

export function getCarSchema(car: Car) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.year} ${car.name}`,
    image: car.images && car.images.length > 0 ? car.images[0] : `${SITE_URL}/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg`,
    description: car.description,
    brand: {
      '@type': 'Brand',
      name: car.make
    },
    model: car.model,
    vehicleModelDate: car.year.toString(),
    vehicleTransmission: car.transmission,
    fuelType: car.fuel,
    numberOfDoors: car.doors,
    seatingCapacity: car.seats,
    offers: {
      '@type': 'Offer',
      price: car.dailyRate,
      priceCurrency: 'USD',
      availability: car.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/cars/${car.slug}`,
      priceValidUntil: '2027-12-31'
    }
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  };
}

export function getFAQSchema(faqList: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function getArticleSchema(article: GuideArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: `${SITE_URL}/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg`,
    datePublished: article.publishedDate,
    author: {
      '@type': 'Organization',
      name: article.author || BRAND_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/aistudio/Shayne_n_dad_Logo_e21e58fb.jpg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guides/${article.slug}`
    }
  };
}

/**
 * Injects or updates Schema.org JSON-LD structured data into the document head
 */
export function injectStructuredData(schemaId: string, data: object) {
  if (typeof document === 'undefined') return;

  let script = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Updates document title, meta description, and canonical link
 */
export function updateDocumentMeta(title: string, description: string, path: string = '') {
  if (typeof document === 'undefined') return;

  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (metaDesc) {
    metaDesc.content = description;
  }

  let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
  if (ogTitle) ogTitle.content = title;

  let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
  if (ogDesc) ogDesc.content = description;

  let twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
  if (twitterTitle) twitterTitle.content = title;

  let twitterDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
  if (twitterDesc) twitterDesc.content = description;

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonical) {
    canonical.href = `${SITE_URL}${path}`;
  }
}
