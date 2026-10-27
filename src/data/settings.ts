import { BusinessSettings } from '../types';

export const initialSettings: BusinessSettings = {
  name: "Shayne'n'Dad Car Rental",
  brandLine: "driven by excellence...",
  address: "1 Drayton Avenue, Greencroft, Harare, Zimbabwe",
  phone: "+263 77 293 6555",
  whatsapp: "+263 77 293 6555",
  whatsappUrl: "https://wa.me/263772936555",
  email: "shaynendacarrental@gmail.com",
  facebook: "https://www.facebook.com/shaynendad/",
  openingHours: "Monday – Sunday: 07:00 – 18:00 (Open 7 days a week; 24/7 pick-up & airport transfers on pre-booking)",
  currency: "USD",
  zigRate: 26.5, // 1 USD = 26.5 ZiG (admin-configurable exchange rate)
  timeZone: "Africa/Harare",
  callbackPromiseEnabled: true,
  callbackPromiseText: "We reply within the hour during opening hours",
  services: {
    selfDrive: true,
    chauffeurDriven: true,
    airportTransfers: true,
    deliveryCollection: true,
    corporateLongTerm: true,
    weddingEvents: true,
    outdoorEquipment: true,
  },
  pickupLocations: [
    {
      id: "greencroft-office",
      name: "Greencroft Office (1 Drayton Ave)",
      fee: 0,
      description: "Direct collection from our main office in Greencroft, Harare. Zero transfer charge."
    },
    {
      id: "harare-airport-hre",
      name: "Harare International Airport (HRE)",
      fee: 20,
      description: "Meet-and-greet curbside at Robert Gabriel Mugabe International Airport with your flight monitored."
    },
    {
      id: "doorstep-harare",
      name: "Door-step Delivery in Harare (Hotel / Residence)",
      fee: 15,
      description: "Handover delivered directly to your doorstep, hotel, or office in Harare."
    }
  ],
  bookingRules: {
    bufferHours: 3,
    minNoticeHours: 4,
    minRentalDays: 1,
    sameDayCutoffHour: 16,
    securityDepositRequired: true,
  }
};
