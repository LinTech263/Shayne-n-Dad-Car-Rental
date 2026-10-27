import { Car, RentalQuote } from '../types';

export interface PricingOptions {
  car: Car;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:mm
  chauffeurSelected?: boolean;
  deliveryLocationId?: string;
  deliveryFee?: number;
  selectedExtras?: Array<{ id: string; name: string; price: number; isPerDay?: boolean }>;
  promoDiscountPercent?: number;
  currency?: 'USD' | 'ZiG';
  zigRate?: number;
}

export function calculateRentalDays(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): number {
  if (!startDate || !endDate) return 1;

  const start = new Date(`${startDate}T${startTime || '09:00'}:00`);
  const end = new Date(`${endDate}T${endTime || '09:00'}:00`);

  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return 1;

  const diffHours = diffMs / (1000 * 60 * 60);
  // Any extra hours beyond 24h count as an additional rental day (standard car rental 24h cycle)
  const days = Math.ceil(diffHours / 24);
  return Math.max(1, days);
}

export function calculateRentalPrice(options: PricingOptions): RentalQuote {
  const {
    car,
    startDate,
    startTime = '09:00',
    endDate,
    endTime = '09:00',
    chauffeurSelected = false,
    deliveryLocationId = 'greencroft-office',
    deliveryFee = 0,
    selectedExtras = [],
    promoDiscountPercent = 0,
    currency = 'USD',
    zigRate = 26.5
  } = options;

  const days = calculateRentalDays(startDate, startTime, endDate, endTime);

  // Rate tiers: >= 30 days = monthlyRate; >= 7 days = weeklyRate; else dailyRate
  let ratePerDay = car.dailyRate;
  if (days >= 30 && car.monthlyRate > 0) {
    ratePerDay = car.monthlyRate;
  } else if (days >= 7 && car.weeklyRate > 0) {
    ratePerDay = car.weeklyRate;
  }

  let baseTotal = ratePerDay * days;

  if (promoDiscountPercent > 0) {
    baseTotal = Math.round(baseTotal * (1 - promoDiscountPercent / 100));
  }

  const chauffeurTotal = chauffeurSelected ? (car.chauffeurDailyRate || 35) * days : 0;

  const extrasTotal = selectedExtras.reduce((sum, extra) => {
    return sum + (extra.isPerDay ? extra.price * days : extra.price);
  }, 0);

  const subtotal = baseTotal + chauffeurTotal + deliveryFee + extrasTotal;
  const deposit = car.deposit || 250;
  const grandTotal = subtotal + deposit;
  const grandTotalZiG = Math.round(grandTotal * zigRate);

  return {
    car,
    startDate,
    startTime,
    endDate,
    endTime,
    days,
    ratePerDay,
    baseTotal,
    chauffeurSelected,
    chauffeurTotal,
    deliveryLocationId,
    deliveryFee,
    selectedExtras: selectedExtras.map(e => ({ id: e.id, name: e.name, price: e.price })),
    extrasTotal,
    subtotal,
    deposit,
    grandTotal,
    dueNow: grandTotal,
    currency,
    zigRate,
    grandTotalZiG
  };
}

export function formatPrice(amount: number, currency: 'USD' | 'ZiG' = 'USD', zigRate: number = 26.5): string {
  if (currency === 'ZiG') {
    const inZig = Math.round(amount * zigRate);
    return `ZiG ${inZig.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}
