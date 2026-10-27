import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRentalDays, calculateRentalPrice, formatPrice } from './pricing';
import { initialCars } from '../data/cars';

test('calculateRentalDays calculates 24-hour day cycle correctly', () => {
  // Exactly 24 hours -> 1 day
  assert.equal(calculateRentalDays('2026-11-01', '09:00', '2026-11-02', '09:00'), 1);
  // 26 hours -> 2 days (due to 24h block rounding)
  assert.equal(calculateRentalDays('2026-11-01', '09:00', '2026-11-02', '11:00'), 2);
  // 7 days exact
  assert.equal(calculateRentalDays('2026-11-01', '09:00', '2026-11-08', '09:00'), 7);
  // Same day minimum fallback is 1 day
  assert.equal(calculateRentalDays('2026-11-01', '09:00', '2026-11-01', '12:00'), 1);
});

test('calculateRentalPrice applies daily vs weekly vs monthly tiers', () => {
  const hilux = initialCars.find(c => c.slug === 'toyota-hilux-double-cab')!;
  assert.ok(hilux);

  // 3 days: daily rate is 130
  const quote3Days = calculateRentalPrice({
    car: hilux,
    startDate: '2026-11-01',
    startTime: '09:00',
    endDate: '2026-11-04',
    endTime: '09:00',
    deliveryFee: 0,
    chauffeurSelected: false
  });
  assert.equal(quote3Days.days, 3);
  assert.equal(quote3Days.ratePerDay, 130);
  assert.equal(quote3Days.baseTotal, 390);
  assert.equal(quote3Days.deposit, 300);
  assert.equal(quote3Days.grandTotal, 690);

  // 7 days: weekly rate is 115
  const quote7Days = calculateRentalPrice({
    car: hilux,
    startDate: '2026-11-01',
    startTime: '09:00',
    endDate: '2026-11-08',
    endTime: '09:00',
    deliveryFee: 0,
    chauffeurSelected: false
  });
  assert.equal(quote7Days.days, 7);
  assert.equal(quote7Days.ratePerDay, 115);
  assert.equal(quote7Days.baseTotal, 805);

  // 30 days: monthly rate is 90
  const quote30Days = calculateRentalPrice({
    car: hilux,
    startDate: '2026-11-01',
    startTime: '09:00',
    endDate: '2026-12-01',
    endTime: '09:00',
    deliveryFee: 0,
    chauffeurSelected: false
  });
  assert.equal(quote30Days.days, 30);
  assert.equal(quote30Days.ratePerDay, 90);
  assert.equal(quote30Days.baseTotal, 2700);
});

test('calculateRentalPrice includes chauffeur, delivery fee and ZiG calculation', () => {
  const eClass = initialCars.find(c => c.slug === 'mercedes-benz-e-class')!;
  const quote = calculateRentalPrice({
    car: eClass,
    startDate: '2026-11-01',
    startTime: '09:00',
    endDate: '2026-11-03',
    endTime: '09:00', // 2 days
    chauffeurSelected: true,
    deliveryFee: 20, // Airport delivery
    selectedExtras: [{ id: 'child-seat', name: 'Child Safety Seat', price: 10, isPerDay: true }],
    zigRate: 26.5
  });

  assert.equal(quote.days, 2);
  assert.equal(quote.ratePerDay, 140);
  assert.equal(quote.baseTotal, 280);
  assert.equal(quote.chauffeurTotal, 70); // 35 * 2
  assert.equal(quote.deliveryFee, 20);
  assert.equal(quote.extrasTotal, 20); // 10 * 2
  assert.equal(quote.subtotal, 390); // 280 + 70 + 20 + 20
  assert.equal(quote.deposit, 300);
  assert.equal(quote.grandTotal, 690);
  assert.equal(quote.grandTotalZiG, Math.round(690 * 26.5));
});

test('formatPrice formats USD and ZiG currencies', () => {
  assert.equal(formatPrice(100, 'USD'), '$100');
  assert.equal(formatPrice(100, 'ZiG', 26.5), 'ZiG 2,650');
});
