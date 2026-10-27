import { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: "self-drive",
    slug: "self-drive-car-hire-harare",
    title: "Self-Drive Car Hire",
    shortDesc: "Take the wheel of an executive sedan, SUV or 4x4 on your own schedule across Harare and Zimbabwe.",
    headline: "Drive on your own terms. Immaculate cars, transparent terms.",
    openingParagraph: "Take the wheel of a car you'd actually enjoy driving. Pick up from our Greencroft office, meet us at the airport or have the car delivered, then drive on your own schedule. Every vehicle is fully checked, valeted, comprehensively insured, and backed by round-the-clock road assistance.",
    benefits: [
      "Total independence: drive across Harare or provincial destinations without itinerary restrictions.",
      "Comprehensive insurance cover included with clearly defined excess options.",
      "24/7 emergency roadside assistance and rapid replacement vehicle support.",
      "Clean, roadworthy fleet tested before every customer handover.",
      "Flexible pick-up: collect at Greencroft or request direct delivery to your home or hotel."
    ],
    howItWorks: [
      {
        step: "01",
        title: "Select your car and dates",
        desc: "Browse our live fleet availability. Choose your exact pick-up and return times and preferred collection point."
      },
      {
        step: "02",
        title: "Confirm and submit credentials",
        desc: "Secure your booking with EcoCash or card. Upload your driver's licence and identity document securely online."
      },
      {
        step: "03",
        title: "Inspect, collect and drive",
        desc: "Present your verification QR code at handover, sign off on the digital condition report, and take the keys."
      }
    ],
    faqs: [
      {
        question: "What documents do I need for self-drive hire?",
        answer: "You will need an original, valid driver's licence (held for at least 2 years), a valid National ID or passport, and the refundable security deposit."
      },
      {
        question: "What is the minimum age for self-drive car hire?",
        answer: "Drivers must be at least 23 years of age for economy and compact cars, and 25 years of age for executive sedans, 4x4 double cabs, and luxury SUVs."
      },
      {
        question: "Can I take the self-drive vehicle outside Harare?",
        answer: "Yes. Our vehicles are permitted across Zimbabwe on declared routes. If you intend to travel on unpaved or remote rural roads, please inform us so we ensure an appropriate 4x4 vehicle is allocated."
      },
      {
        question: "What happens if I encounter mechanical difficulty or a flat tyre?",
        answer: "Every self-drive rental is supported by our 24/7 Harare operations line (+263 77 293 6555). In the rare event of an issue, our recovery team will assist or supply a replacement vehicle promptly."
      }
    ],
    iconName: "Key"
  },
  {
    id: "chauffeur-driven",
    slug: "chauffeur-driven-car-hire-harare",
    title: "Chauffeur-Driven Car Hire",
    shortDesc: "Arrive composed with experienced, punctual drivers who know Harare's roads and etiquette.",
    headline: "Arrive composed. Experienced drivers, impeccable discretion.",
    openingParagraph: "Arrive composed. Our drivers know Harare's roads and keep to your schedule, so you can prepare for the meeting, the wedding or the flight. Whether you are hosting an international visiting dignitary, heading between ministries in the CBD, or attending an evening gala in Borrowdale Brooke, your time is respected.",
    benefits: [
      "Vetted, professional Zimbabwean drivers trained in executive protocol and defensive driving.",
      "Zero navigation stress: skip Harare traffic, parking hunts, and unfamiliar detour routes.",
      "Work or relax in the back seat with climate control and phone charging available.",
      "Daily and hourly billing options tailored to corporate delegations and special events.",
      "Guaranteed punctuality with drivers arriving at least 15 minutes ahead of scheduled time."
    ],
    howItWorks: [
      {
        step: "01",
        title: "Choose car and chauffeur tier",
        desc: "Select an executive Mercedes-Benz sedan, luxury ML SUV, or double cab and tick the chauffeur service."
      },
      {
        step: "02",
        title: "Provide your itinerary",
        desc: "Share your schedule or meeting locations. We brief the driver beforehand to ensure flawless route timing."
      },
      {
        step: "03",
        title: "Step into seamless transit",
        desc: "Your chauffeur arrives at your door or curbside, attends to luggage, and remains on standby as needed."
      }
    ],
    faqs: [
      {
        question: "Are fuel and driver allowances included in chauffeur rates?",
        answer: "The daily chauffeur fee covers the driver's professional service and time. Vehicle fuel can be billed based on actual distance travelled or pre-packaged into an all-inclusive daily rate."
      },
      {
        question: "What are the chauffeur's standard operating hours?",
        answer: "Standard chauffeur shifts cover up to 10 hours per day (typically 07:30 to 17:30). Extended hours or overnight out-of-town trips can be arranged with an agreed night allowance."
      },
      {
        question: "Can I book a chauffeur on an hourly basis for an event?",
        answer: "Yes. We offer hourly event packages with a minimum booking duration of 4 hours. Perfect for weddings, dinners, and diplomatic functions."
      },
      {
        question: "Can the driver handle airport luggage and meet guests at arrivals?",
        answer: "Yes. Our chauffeurs offer personalized meet-and-greet services inside the arrivals hall holding a discreet branded name board."
      }
    ],
    iconName: "UserCheck"
  },
  {
    id: "airport-transfers",
    slug: "airport-transfers-harare",
    title: "Airport Transfers & Shuttle",
    shortDesc: "Reliable airport pick-ups and drop-offs at Robert Gabriel Mugabe International Airport (HRE).",
    headline: "Harare airport transfers. Tracked flights, zero waiting.",
    openingParagraph: "Land at Harare International Airport (HRE) and find your ride waiting. Share your flight number when you book and we'll plan around your arrival. We monitor inbound Ethiopian Airlines, Emirates, South African Airways, Qatar Airways, and Fastjet flights so even if your flight is delayed, our driver is standing by curbside.",
    benefits: [
      "Live flight tracking: we monitor real-time touchdown times, eliminating waiting fees for flight delays.",
      "Personalised meet-and-greet in the arrivals hall with luggage assistance to your vehicle.",
      "Direct transfers to any hotel, lodge, or private residence across Harare and surrounding suburbs.",
      "Option to have your self-drive rental car handed over directly at the airport terminal.",
      "Fixed, transparent pricing with no airport parking surcharges or unexpected add-ons."
    ],
    howItWorks: [
      {
        step: "01",
        title: "Book with your flight details",
        desc: "Enter your inbound flight number, arrival date, and destination address in Harare."
      },
      {
        step: "02",
        title: "Flight tracking and dispatch",
        desc: "Our dispatch team monitors radar telemetry. The driver stages at the airport 20 minutes before touchdown."
      },
      {
        step: "03",
        title: "Greet and relaxed transit",
        desc: "Clear customs and walk straight to your driver. Cool air conditioning and chilled water await in your car."
      }
    ],
    faqs: [
      {
        question: "What happens if my flight into Harare is delayed?",
        answer: "We track your flight number in real time. We automatically adjust our arrival time without any penalty charges or missed connection issues."
      },
      {
        question: "Where do I meet the driver at Robert Gabriel Mugabe International Airport?",
        answer: "Immediately after exiting customs into the international arrivals hall, look for our driver holding a sign with your name or corporate logo."
      },
      {
        question: "Can I hire a self-drive car and collect it directly at the airport?",
        answer: "Yes! We can deliver your reserved vehicle directly to the airport car park, complete digital check-in in under five minutes, and hand you the keys."
      },
      {
        question: "Do you provide child safety seats for airport transfers?",
        answer: "Yes, infant and booster seats can be added to any airport transfer booking upon request."
      }
    ],
    iconName: "Plane"
  },
  {
    id: "doorstep-delivery",
    slug: "door-step-delivery-collection",
    title: "Door-Step Delivery & Collection",
    shortDesc: "Skip the office trip. We bring your rental vehicle to your hotel, residence or office in Harare.",
    headline: "We come to you. Direct car delivery across Harare.",
    openingParagraph: "Skip the trip to the office. We bring the car to your home, hotel or workplace in Harare and collect it when you're done. Whether you are staying in Borrowdale, Avondale, Highlands, Mount Pleasant, or Newlands, our handover team conducts the inspection on-site, saving you valuable hours.",
    benefits: [
      "Convenience first: avoid traveling across town to pick up or return your car.",
      "Service across all Harare suburbs including Borrowdale, Avondale, Greendale, Newlands, and Mount Pleasant.",
      "Digital mobile handover completed on a tablet or smartphone in under five minutes.",
      "Flexible timing: schedule delivery early in the morning before your working day begins.",
      "Affordable flat-rate delivery fee with zero hidden logistics costs."
    ],
    howItWorks: [
      {
        step: "01",
        title: "Specify your address",
        desc: "Select 'Door-step delivery' during booking and provide your physical address or hotel room details."
      },
      {
        step: "02",
        title: "Punctual handover arrival",
        desc: "Our driver delivers the freshly valeted car at your appointed time and conducts a quick walkaround."
      },
      {
        step: "03",
        title: "Effortless collection",
        desc: "When your hire concludes, we return to collect the car at your designated location. No return drive needed."
      }
    ],
    faqs: [
      {
        question: "Which areas in Harare are covered by door-step delivery?",
        answer: "We deliver to all major Harare residential and commercial zones, including Greencroft, Borrowdale, Highlands, Avondale, Mount Pleasant, Newlands, Eastlea, Belvedere, and central business districts."
      },
      {
        question: "How much notice is required for door-step delivery?",
        answer: "We recommend at least 4 hours' advance notice during business hours so our team can detail the vehicle and navigate transit schedules."
      },
      {
        question: "Can the drop-off and collection locations be different?",
        answer: "Yes! For instance, we can deliver the vehicle to your residence in Borrowdale and collect it from Harare International Airport when you depart."
      },
      {
        question: "What inspection takes place upon doorstep handover?",
        answer: "Our representative completes a digital checklist with photos of fuel level, odometer reading, and vehicle condition, which you sign and receive immediately via email/WhatsApp."
      }
    ],
    iconName: "MapPin"
  },
  {
    id: "corporate-long-term",
    slug: "corporate-long-term-car-hire",
    title: "Corporate & Long-Term Car Hire",
    shortDesc: "Monthly and project fleet solutions for businesses, NGOs, embassies and international consultants.",
    headline: "Reliable fleet for projects and executives. Transparent monthly invoicing.",
    openingParagraph: "Dependable cars for teams, projects and long stays, with clear monthly pricing and invoices that make sense to your finance department. We provide dedicated account management, regular scheduled maintenance with replacement car guarantees, and VAT-compliant documentation.",
    benefits: [
      "Deep monthly discounts: significant rate reductions on 30+ day hires.",
      "Complete VAT-compliant invoices, monthly statements, and structured corporate billing.",
      "Complimentary scheduled maintenance and immediate replacement vehicle guarantee in case of service.",
      "Multiple authorised drivers permitted under one corporate umbrella agreement.",
      "Dedicated corporate liaison on WhatsApp and phone for immediate fleet adjustments."
    ],
    howItWorks: [
      {
        step: "01",
        title: "Define fleet requirements",
        desc: "Tell us the number of vehicles, preferred classes (executive sedans, 4x4 double cabs), and project duration."
      },
      {
        step: "02",
        title: "Tailored commercial quotation",
        desc: "We generate a customized corporate contract detailing rates, mileage allowances, and servicing protocols."
      },
      {
        step: "03",
        title: "Fleet deployment and support",
        desc: "Vehicles are inspected and handed over with dedicated account management and maintenance schedules."
      }
    ],
    faqs: [
      {
        question: "What payment terms are available for corporate and NGO accounts?",
        answer: "Approved corporate clients, NGOs, and diplomatic missions can access 30-day payment terms against an approved purchase order and corporate credit application."
      },
      {
        question: "How is scheduled vehicle maintenance handled during long-term rental?",
        answer: "We coordinate all periodic servicing at intervals. When a vehicle goes for scheduled maintenance, we deliver an equivalent replacement vehicle to your office so your team experiences zero downtime."
      },
      {
        question: "Can multiple company employees drive the vehicle?",
        answer: "Yes, corporate contracts allow multiple registered company drivers once their valid driver's licences and IDs have been logged in our system."
      },
      {
        question: "What happens if a project ends earlier than expected?",
        answer: "We offer flexible contract revision terms with fair notice periods, ensuring your organisation does not pay for idle fleet capacity."
      }
    ],
    iconName: "Briefcase"
  },
  {
    id: "wedding-events",
    slug: "wedding-event-car-hire-harare",
    title: "Weddings & Special Events",
    shortDesc: "Make your celebration unforgettable with pristine bridal sedans, SUVs, and chauffeur protocol.",
    headline: "Make the day look as good as it feels. Statement cars for unforgettable moments.",
    openingParagraph: "Make the day look as good as it feels. Choose a statement car, add a chauffeur, and tell us the time and place. We'll handle the rest. From gleaming executive Mercedes-Benz bridal cars to stylish convoy SUVs for the bridal party, our vehicles arrive spotlessly detailed and on schedule.",
    benefits: [
      "Spotless presentation: showroom-detailed vehicles prepared specifically for photography.",
      "Attired, courteous chauffeurs trained in bridal party timing and photo session logistics.",
      "Coordination with your wedding planner or bridal coordinator to guarantee seamless timing.",
      "Ribbon and decor coordination permitted to match your bridal colour palette.",
      "Convoy packages available combining bridal sedans with guest or bridal party SUVs."
    ],
    howItWorks: [
      {
        step: "01",
        title: "Select your statement car",
        desc: "Choose an executive Mercedes-Benz or luxury SUV that fits your celebration aesthetic."
      },
      {
        step: "02",
        title: "Share event schedule",
        desc: "Provide the salon pick-up, ceremony venue, photo shoot destination, and reception timings."
      },
      {
        step: "03",
        title: "Enjoy your grand arrival",
        desc: "Your chauffeur ensures smooth transit between photo venues and a graceful red-carpet arrival."
      }
    ],
    faqs: [
      {
        question: "How early in advance should we book a wedding car in Harare?",
        answer: "Harare wedding dates book out fast, especially during peak seasons (August to December). We recommend reserving your wedding cars 4 to 8 weeks in advance."
      },
      {
        question: "Can we decorate the bridal car with ribbons and floral arrangements?",
        answer: "Yes! Non-abrasive silk ribbons and suction-mounted floral arrangements are welcome. Please let us know so we can coordinate setup with your florist."
      },
      {
        question: "Are wedding hires charged by the hour or by the day?",
        answer: "We offer both flexible 4-hour packages for focused ceremonies and full 12-hour all-day bridal packages."
      },
      {
        question: "What backup measures do you have in place on the wedding day?",
        answer: "We maintain standby vehicles in our Greencroft garage on every event Saturday, ensuring absolute peace of mind for your once-in-a-lifetime occasion."
      }
    ],
    iconName: "Heart"
  },
  {
    id: "outdoor-equipment",
    slug: "outdoor-equipment-hire",
    title: "Outdoor Equipment & Safari Hire",
    shortDesc: "Equipped 4x4s, camping gear, tents, and caravan equipment for Zimbabwean wilderness adventures.",
    headline: "Heading out of town? Add camping and safari gear to your 4x4 hire.",
    openingParagraph: "Heading out of town? Add caravans, tents and camping gear to your hire. Whether you are fishing on Lake Kariba, exploring the Eastern Highlands around Nyanga, or venturing into Mana Pools and Hwange National Park, we equip your expedition with tested outdoor essentials.",
    benefits: [
      "High-grade safari gear: heavy-duty canvas tents, folding chairs, tables, and LED lanterns.",
      "Mobile refrigeration: 12V/220V dual-zone compressor fridge-freezers for food preservation.",
      "Recovery gear: snatch straps, high-lift jacks, air compressors, and sand tracks included.",
      "Caravan and trailer hitch options compatible with our Toyota Hilux and Ford Ranger fleet.",
      "Expert local advice on road conditions, park gate protocols, and fuel stops."
    ],
    howItWorks: [
      {
        step: "01",
        title: "Select vehicle and expedition package",
        desc: "Pair a Toyota Hilux or Ford Ranger 4x4 with your desired camping and outdoor accessories."
      },
      {
        step: "02",
        title: "Gear briefing at Greencroft",
        desc: "Our team walks you through tent setup, fridge connection, and recovery equipment usage."
      },
      {
        step: "03",
        title: "Embark with complete readiness",
        desc: "Head into Zimbabwe's wilderness with confidence, backed by our nationwide support network."
      }
    ],
    faqs: [
      {
        question: "What camping equipment is available for hire?",
        answer: "We supply 2-person and 4-person canvas dome tents, high-density foam mattresses, sleeping bags, folding camp chairs and tables, 12V camping fridges, gas cookers, and recovery kits."
      },
      {
        question: "Can I take the outdoor equipment and 4x4 into National Parks like Mana Pools?",
        answer: "Yes, our Toyota Hilux and Ford Ranger 4x4s are specifically prepped and approved for safari excursions in Zimbabwean national parks."
      },
      {
        question: "Is training provided on how to operate the 4x4 and camping equipment?",
        answer: "Yes. During vehicle handover at our Greencroft office, our technician conducts a complete demonstration of the 4x4 system, diff-lock, tyre pressure compressor, and camping kit."
      },
      {
        question: "What is the security deposit for outdoor equipment hire?",
        answer: "A modest refundable equipment deposit is added to the vehicle deposit depending on the value of the equipment selected."
      }
    ],
    iconName: "Compass"
  }
];
