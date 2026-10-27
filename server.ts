import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initialCars } from './src/data/cars';
import { categories } from './src/data/categories';
import { services } from './src/data/services';
import { guides } from './src/data/guides';
import { initialSettings } from './src/data/settings';
import { faqs } from './src/data/faq';
import {
  getAutoRentalSchema,
  getCarSchema,
  getFAQSchema,
  getArticleSchema,
  SITE_URL,
  BRAND_NAME
} from './src/utils/seo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function createServer() {
  const app = express();
  app.use(express.json());

  // Store leads / enquiries in memory (seeded with demo leads)
  const enquiries: any[] = [
    {
      id: 'lead-1',
      fullName: 'Farai Chidzero',
      phone: '+263 77 123 4567',
      email: 'f.chidzero@consulting.co.zw',
      carSlug: 'toyota-hilux-double-cab',
      carName: 'Toyota Hilux Double Cab 4x4',
      startDate: '2026-11-05',
      endDate: '2026-11-12',
      chauffeurNeeded: false,
      offerPrice: 110,
      message: 'Need the 4x4 for a mineral survey trip near Chinhoyi. Will need canopy and tow bar.',
      status: 'New',
      createdAt: new Date().toISOString()
    }
  ];

  // Store callback requests
  const callbackRequests: any[] = [];

  // ==========================================
  // TECHNICAL SEO: robots.txt
  // ==========================================
  app.get('/robots.txt', (req: Request, res: Response) => {
    res.type('text/plain');
    res.send(`User-agent: *
Disallow: /admin
Disallow: /account
Disallow: /book
Disallow: /api
Disallow: /verify
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
  });

  // ==========================================
  // TECHNICAL SEO: sitemap.xml
  // ==========================================
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const today = new Date().toISOString().split('T')[0];

    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/cars', priority: '0.9', changefreq: 'daily' },
      { url: '/services', priority: '0.8', changefreq: 'weekly' },
      { url: '/car-hire-harare', priority: '0.9', changefreq: 'weekly' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/about-us', priority: '0.7', changefreq: 'monthly' },
      { url: '/testimonials', priority: '0.8', changefreq: 'weekly' },
      { url: '/how-it-works', priority: '0.7', changefreq: 'monthly' },
      { url: '/faq', priority: '0.7', changefreq: 'weekly' },
      { url: '/guides', priority: '0.8', changefreq: 'weekly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact-us', priority: '0.8', changefreq: 'monthly' },
      { url: '/enquire', priority: '0.8', changefreq: 'weekly' },
      { url: '/rental-terms', priority: '0.5', changefreq: 'monthly' },
      { url: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
      { url: '/terms', priority: '0.5', changefreq: 'monthly' }
    ];

    const categoryRoutes = categories.map(cat => ({
      url: `/cars/${cat.slug}`,
      priority: '0.85',
      changefreq: 'weekly'
    }));

    const carRoutes = initialCars.map(car => ({
      url: `/cars/${car.slug}`,
      priority: '0.9',
      changefreq: 'daily'
    }));

    const serviceRoutes = services.map(svc => ({
      url: `/services/${svc.slug}`,
      priority: '0.85',
      changefreq: 'weekly'
    }));

    const guideRoutes = guides.map(guide => ({
      url: `/guides/${guide.slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    }));

    const allUrls = [
      ...staticRoutes,
      ...categoryRoutes,
      ...carRoutes,
      ...serviceRoutes,
      ...guideRoutes
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    item => `  <url>
    <loc>${SITE_URL}${item.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.type('application/xml');
    res.send(xml);
  });

  // ==========================================
  // REST API Endpoints
  // ==========================================
  app.get('/api/settings', (req: Request, res: Response) => {
    res.json(initialSettings);
  });

  app.get('/api/cars', (req: Request, res: Response) => {
    res.json(initialCars);
  });

  app.get('/api/categories', (req: Request, res: Response) => {
    res.json(categories);
  });

  app.get('/api/services', (req: Request, res: Response) => {
    res.json(services);
  });

  app.get('/api/guides', (req: Request, res: Response) => {
    res.json(guides);
  });

  app.get('/api/faqs', (req: Request, res: Response) => {
    res.json(faqs);
  });

  app.post('/api/enquiries', (req: Request, res: Response) => {
    const { fullName, phone, email, carSlug, carName, startDate, endDate, chauffeurNeeded, offerPrice, message } = req.body;
    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Full name and phone or WhatsApp number are required.' });
    }

    const newEnquiry = {
      id: `lead-${Date.now()}`,
      fullName,
      phone,
      email: email || '',
      carSlug: carSlug || 'general',
      carName: carName || 'General Enquiry',
      startDate: startDate || '',
      endDate: endDate || '',
      chauffeurNeeded: Boolean(chauffeurNeeded),
      offerPrice: offerPrice ? parseFloat(offerPrice) : null,
      message: message || '',
      status: 'New',
      createdAt: new Date().toISOString()
    };

    enquiries.unshift(newEnquiry);
    res.json({ success: true, lead: newEnquiry, message: initialSettings.callbackPromiseText });
  });

  app.post('/api/callback-request', (req: Request, res: Response) => {
    const { name, phone, preferredTime } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    const item = {
      id: `call-${Date.now()}`,
      name: name || 'Caller',
      phone,
      preferredTime: preferredTime || 'As soon as possible',
      createdAt: new Date().toISOString()
    };
    callbackRequests.push(item);
    res.json({ success: true, message: initialSettings.callbackPromiseText });
  });

  // ==========================================
  // Vite SSR & Static Serving
  // ==========================================
  let vite: any;
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    // Serve static files from public
    app.use('/vehicle-photos', express.static(path.resolve(__dirname, 'public/vehicle-photos')));
    app.use('/src/assets/images', express.static(path.resolve(__dirname, 'src/assets/images')));
    app.use(express.static(path.resolve(__dirname, 'public'), { redirect: false }));
    app.use(vite.middlewares);
  } else {
    app.use('/vehicle-photos', express.static(path.resolve(__dirname, 'public/vehicle-photos')));
    app.use(express.static(path.resolve(__dirname, 'public'), { redirect: false }));
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
  }

  // Helper to determine route metadata and Schema for SSR injection
  function getRouteMetadata(pathname: string) {
    let title = "Car Hire Harare | Luxury & Self-Drive Rental | Shayne'n'Dad";
    let description = "Hire executive sedans, SUVs and double cabs in Harare. See live availability, book online and pay by EcoCash or card. Delivery and airport transfers available.";
    let structuredData: any = getAutoRentalSchema();

    if (pathname === '/cars') {
      title = "Our Fleet | Cars for Hire in Harare | Shayne'n'Dad";
      description = "Browse sedans, SUVs and double cabs for hire in Harare. Check live availability, compare daily rates and book online in minutes.";
    } else if (pathname.startsWith('/cars/')) {
      const slug = pathname.replace('/cars/', '');
      const matchedCar = initialCars.find(c => c.slug === slug);
      if (matchedCar) {
        title = `${matchedCar.name} Hire Harare | Shayne'n'Dad Car Rental`;
        description = matchedCar.description.substring(0, 155);
        structuredData = getCarSchema(matchedCar);
      } else {
        const matchedCategory = categories.find(c => c.slug === slug);
        if (matchedCategory) {
          title = matchedCategory.seoTitle;
          description = matchedCategory.seoDescription;
        }
      }
    } else if (pathname === '/services') {
      title = "Car Rental Services in Harare | Self-Drive & Chauffeur | Shayne'n'Dad";
      description = "Full car rental services in Harare: self-drive, executive chauffeur, airport transfers, delivery, corporate leasing, wedding cars and safari gear.";
    } else if (pathname.startsWith('/services/')) {
      const slug = pathname.replace('/services/', '');
      const matchedService = services.find(s => s.slug === slug);
      if (matchedService) {
        title = `${matchedService.title} in Harare | Shayne'n'Dad Car Rental`;
        description = matchedService.shortDesc;
      }
    } else if (pathname === '/car-hire-harare') {
      title = "Car Hire Harare | Greencroft, Borrowdale, Avondale | Shayne'n'Dad";
      description = "Car hire located at 1 Drayton Avenue, Greencroft, Harare. Serving Borrowdale, Avondale, Mt Pleasant, and Harare Airport. Open 7 days.";
    } else if (pathname === '/about' || pathname === '/about-us') {
      title = "About Shayne'n'Dad Car Rental | Driven by Excellence | Harare";
      description = "Learn about Shayne'n'Dad Car Rental in Greencroft, Harare. Upmarket executive fleet, transparent pricing, and dependable 7-day service.";
    } else if (pathname === '/contact' || pathname === '/contact-us') {
      title = "Contact Shayne'n'Dad Car Rental | Greencroft, Harare";
      description = "Call or WhatsApp +263 77 293 6555 or visit us at 1 Drayton Avenue, Greencroft, Harare. Open seven days a week.";
    } else if (pathname === '/testimonials') {
      title = "Client Reviews & Testimonials | Shayne'n'Dad Car Rental Harare";
      description = "Verified reviews from corporate executives, diaspora visitors, wedding planners, and 4x4 safari hirers with Shayne'n'Dad Car Rental in Harare.";
    } else if (pathname === '/faq') {
      title = "Car Hire FAQs Harare | Pricing, Requirements & Insurance | Shayne'n'Dad";
      description = "Common questions about hiring a car in Harare. Requirements, payments via EcoCash/cards, security deposits, and insurance.";
      structuredData = getFAQSchema(faqs);
    } else if (pathname === '/guides') {
      title = "Harare Car Hire & Travel Guides | Shayne'n'Dad";
      description = "Expert advice on driving in Zimbabwe, airport transfers, self-drive versus chauffeur hire, and road trip vehicle selection.";
    } else if (pathname.startsWith('/guides/')) {
      const slug = pathname.replace('/guides/', '');
      const matchedGuide = guides.find(g => g.slug === slug);
      if (matchedGuide) {
        title = `${matchedGuide.title} | Shayne'n'Dad Harare`;
        description = matchedGuide.metaDescription;
        structuredData = getArticleSchema(matchedGuide);
      }
    }

    return { title, description, structuredData };
  }

  // HTML Pre-rendering & Metadata Injection Handler
  app.use('*', async (req: Request, res: Response, next) => {
    const url = req.originalUrl.split('?')[0];

    try {
      let template: string;
      if (!isProduction) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'), 'utf-8');
      }

      const { title, description, structuredData } = getRouteMetadata(url);

      // Replace metadata in HTML template
      let html = template
        .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
        .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${description}" />`)
        .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
        .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${SITE_URL}${url}" />`);

      // Inject JSON-LD Schema
      const schemaScript = `<script type="application/ld+json" id="server-ld-json">${JSON.stringify(structuredData)}</script>`;
      html = html.replace('</head>', `  ${schemaScript}\n  </head>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shayne'n'Dad Car Rental server running on http://0.0.0.0:${PORT}`);
  });
}

createServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
