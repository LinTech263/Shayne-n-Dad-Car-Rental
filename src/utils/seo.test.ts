import test from 'node:test';
import assert from 'node:assert/strict';
import { getAutoRentalSchema, getCarSchema, getBreadcrumbSchema, getFAQSchema, SITE_URL, BRAND_NAME } from './seo';
import { initialCars } from '../data/cars';
import { faqs } from '../data/faq';

test('getAutoRentalSchema generates valid Schema.org AutoRental payload', () => {
  const schema = getAutoRentalSchema();
  assert.equal(schema['@type'], 'AutoRental');
  assert.equal(schema.name, BRAND_NAME);
  assert.equal(schema.telephone, '+263772936555');
  assert.equal(schema.address.streetAddress, '1 Drayton Avenue, Greencroft');
  assert.equal(schema.address.addressCountry, 'ZW');
  assert.ok(schema.openingHoursSpecification.length > 0);
  assert.ok(schema.sameAs.includes('https://www.facebook.com/shaynendad/'));
});

test('getCarSchema outputs accurate Offer and Car specs', () => {
  const hilux = initialCars.find(c => c.slug === 'toyota-hilux-double-cab')!;
  const schema = getCarSchema(hilux);
  assert.equal(schema['@type'], 'Car');
  assert.equal(schema.model, 'Hilux GD-6');
  assert.equal(schema.offers.price, 130);
  assert.equal(schema.offers.priceCurrency, 'USD');
  assert.equal(schema.offers.url, `${SITE_URL}/cars/toyota-hilux-double-cab`);
});

test('getBreadcrumbSchema produces 1-indexed ListItem chain', () => {
  const crumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Fleet', url: '/cars' },
    { name: 'Toyota Hilux', url: '/cars/toyota-hilux-double-cab' }
  ]);
  assert.equal(crumbs['@type'], 'BreadcrumbList');
  assert.equal(crumbs.itemListElement.length, 3);
  assert.equal(crumbs.itemListElement[0].position, 1);
  assert.equal(crumbs.itemListElement[2].name, 'Toyota Hilux');
});

test('getFAQSchema formats all FAQ items into Question/Answer pairs', () => {
  const faqSchema = getFAQSchema(faqs.slice(0, 3));
  assert.equal(faqSchema['@type'], 'FAQPage');
  assert.equal(faqSchema.mainEntity.length, 3);
  assert.equal(faqSchema.mainEntity[0]['@type'], 'Question');
  assert.ok(faqSchema.mainEntity[0].acceptedAnswer.text.length > 10);
});
