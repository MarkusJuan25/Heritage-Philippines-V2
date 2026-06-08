// V2 adaptation: self-contained — no heritage.js or packageImages.js dependency.

const normalizeSlug = (value) =>
  value
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Per-province real image map — matched to existing V2 public/images assets
const provinceImages = {
  // CAR
  Abra: "/images/Luzon/CAR — Cordillera Administrative Region/Mist and Limestone Caves Sagada.jpg",
  Apayao: "/images/Luzon/CAR — Cordillera Administrative Region/The Rice Terraces of Ifugao Banaue.jpg",
  Benguet: "/images/Luzon/CAR — Cordillera Administrative Region/Winding Mountain Roads Benguet.jpg",
  Ifugao: "/images/Luzon/CAR — Cordillera Administrative Region/The Rice Terraces of Ifugao Banaue.jpg",
  Kalinga: "/images/Luzon/CAR — Cordillera Administrative Region/Mist and Limestone Caves Sagada.jpg",
  "Mountain Province": "/images/Luzon/CAR — Cordillera Administrative Region/Mist and Limestone Caves Sagada.jpg",
  // Region I
  "Ilocos Norte": "/images/Luzon/Region I — Ilocos Region/The Rugged Coast of Bangui Ilocos Norte.jpg",
  "Ilocos Sur": "/images/Luzon/Region I — Ilocos Region/The Spanish Heritage of Vigan Ilocos Sur.jpg",
  "La Union": "/images/Luzon/Region I — Ilocos Region/Surf Culture and Sunsets in San Juan La Union.jpg",
  Pangasinan: "/images/Luzon/Region I — Ilocos Region/The Hundred Islands Pangasinan.jpg",
  // Region II
  Batanes: "/images/Luzon/Region II — Cagayan Valley/Marlboro Hills Batanes.jpg",
  Cagayan: "/images/Luzon/Region II — Cagayan Valley/Callao Cave Cagayan.jpg",
  Isabela: "/images/Luzon/Region II — Cagayan Valley/Corn Harvest in Isabela.jpg",
  "Nueva Vizcaya": "/images/Luzon/Region II — Cagayan Valley/The Magat River and Dam Isabela_Nueva Vizcaya.jpg",
  Quirino: "/images/Luzon/Region II — Cagayan Valley/Callao Cave Cagayan.jpg",
  // Region III
  Aurora: "/images/Luzon/Region III — Central Luzon/Crucible of History Mount Samat Cross.jpg",
  Bataan: "/images/Luzon/Region III — Central Luzon/Crucible of History Mount Samat Cross.jpg",
  Bulacan: "/images/Luzon/Region III — Central Luzon/Rice Granary Plains and Irrigation.jpg",
  "Nueva Ecija": "/images/Luzon/Region III — Central Luzon/Rice Granary Plains and Irrigation.jpg",
  Pampanga: "/images/Luzon/Region III — Central Luzon/Lahar Legacy Bacolor Church.jpg",
  Tarlac: "/images/Luzon/Region III — Central Luzon/Rice Granary Plains and Irrigation.jpg",
  Zambales: "/images/Luzon/Region III — Central Luzon/Global Connectivity Subic Bay Port.jpg",
  // Region IV-A
  Batangas: "/images/Luzon/Region IV-A — CALABARZON/The Volcanic Heart Taal Lake and Volcano.jpg",
  Cavite: "/images/Luzon/Region IV-A — CALABARZON/The Cradle of Independence Aguinaldo Shrine.jpg",
  Laguna: "/images/Luzon/Region IV-A — CALABARZON/The Vast Lake Laguna de Bay and Aquaculture.jpg",
  Quezon: "/images/Luzon/Region IV-A — CALABARZON/Port of Batangas.jpg",
  Rizal: "/images/Luzon/Region IV-A — CALABARZON/The Cradle of Independence Aguinaldo Shrine.jpg",
  // MIMAROPA
  Marinduque: "/images/Luzon/MIMAROPA Region/Archipelagic Geography Palawan and Honda Bay.jpg",
  "Occidental Mindoro": "/images/Luzon/MIMAROPA Region/Coastal Settlement and Rice Mindoro Oriental.jpg",
  "Oriental Mindoro": "/images/Luzon/MIMAROPA Region/Coastal Settlement and Rice Mindoro Oriental.jpg",
  Palawan: "/images/Luzon/MIMAROPA Region/Archipelagic Geography Palawan and Honda Bay.jpg",
  Romblon: "/images/Luzon/MIMAROPA Region/Marble and Maritime Romblon Romblon Island.jpg",
  // Region V
  Albay: "/images/Luzon/Region V — Bicol Region/The Volcano and the Plains Mount Mayon.jpg",
  "Camarines Norte": "/images/Luzon/Region V — Bicol Region/The Isolated Coast Caramoan Karst.jpg",
  "Camarines Sur": "/images/Luzon/Region V — Bicol Region/The Isolated Coast Caramoan Karst.jpg",
  Catanduanes: "/images/Luzon/Region V — Bicol Region/The Inland Sea Lake Buhi and Aquaculture.jpg",
  Masbate: "/images/Luzon/Region V — Bicol Region/Port of Matnog Sorsogon.jpg",
  Sorsogon: "/images/Luzon/Region V — Bicol Region/Port of Matnog Sorsogon.jpg",
  // Region VI
  Aklan: "/images/Visayas/Region VI — Western Visayas/The Tourism Jewel Boracay White Beach.jpg",
  Antique: "/images/Visayas/Region VI — Western Visayas/Traditional Agriculture Muscovado Sugar in Antique.jpg",
  Capiz: "/images/Visayas/Region VI — Western Visayas/The Gateway to the Islands Port of Dumangas Iloilo.jpg",
  Guimaras: "/images/Visayas/Region VI — Western Visayas/The Gateway to the Islands Port of Dumangas Iloilo.jpg",
  Iloilo: "/images/Visayas/Region VI — Western Visayas/Preserved Heritage Weaving and the Miagao Church.jpg",
  // Negros Island Region
  "Negros Occidental": "/images/Visayas/NIR — Negros Island Region/Negros Occidental The Sugar Capital Silay City.jpg",
  "Negros Oriental": "/images/Visayas/Region VII — Central Visayas/Dumaguete City, Negros Oriental.jpg",
  Siquijor: "/images/Visayas/NIR — Negros Island Region/Siquijor - Spiritual Architecture and Ancient Roots.jpg",
  // Region VII
  Bohol: "/images/Visayas/Region VII — Central Visayas/Bohol - The Geological Wonders Chocolate Hills.jpg",
  Cebu: "/images/Visayas/Region VII — Central Visayas/The Logistical Sprawl Metro Cebu.jpg",
  // Region VIII
  Biliran: "/images/Visayas/Region VIII — Eastern Visayas/The Volcanic Island and Warm Sun Biliran.jpg",
  "Eastern Samar": "/images/Visayas/Region VIII — Eastern Visayas/The Underground River and Rain Samar.jpg",
  Leyte: "/images/Visayas/Region VIII — Eastern Visayas/The MacArthur Landing Leyte.jpg",
  "Northern Samar": "/images/Visayas/Region VIII — Eastern Visayas/The Underground River and Rain Samar.jpg",
  Samar: "/images/Visayas/Region VIII — Eastern Visayas/The Underground River and Rain Samar.jpg",
  "Southern Leyte": "/images/Visayas/Region VIII — Eastern Visayas/The Remote Marine Gateway and Twilight Southern Leyte.jpg",
  // Region IX
  Sulu: "/images/Mindanao/BARMM — Bangsamoro Autonomous Region in Muslim Mindanao/Sulu The Volcanic Archipelago and Pearl Diver's Cove.jpg",
  "Zamboanga del Norte": "/images/Mindanao/Region IX — Zamboanga Peninsula/Zamboanga del Norte The Orchid City and Coastal Majesty.jpg",
  "Zamboanga del Sur": "/images/Mindanao/Region IX — Zamboanga Peninsula/Zamboanga del Sur The Vibrant Heart of Trade.jpg",
  "Zamboanga Sibugay": "/images/Mindanao/Region IX — Zamboanga Peninsula/Zamboanga Sibugay The Land of Stilt Villages and Seascape.jpg",
  // Region X
  Bukidnon: "/images/Mindanao/Region X — Northern Mindanao/Bukidnon The Land of Rolling Plateaus.jpg",
  Camiguin: "/images/Mindanao/Region X — Northern Mindanao/Camiguin Island Born of Fire.jpg",
  "Lanao del Norte": "/images/Mindanao/Region X — Northern Mindanao/Lanao del Norte Nature and Industry.jpg",
  "Misamis Occidental": "/images/Mindanao/Region X — Northern Mindanao/Misamis Occidental Coastal Heritage and Calm Waters.jpg",
  "Misamis Oriental": "/images/Mindanao/Region X — Northern Mindanao/Misamis Oriental Gateway of Progress.jpg",
  // Region XI
  "Davao de Oro": "/images/Mindanao/Region XI — Davao Region/Davao de Oro The Golden Valley.jpg",
  "Davao del Norte": "/images/Mindanao/Region XI — Davao Region/Davao del Norte The Agricultural Powerhouse.jpg",
  "Davao del Sur": "/images/Mindanao/Region XI — Davao Region/Davao del Sur The Peak of Majesty.jpg",
  "Davao Occidental": "/images/Mindanao/Region XI — Davao Region/Davao Occidental The Coastal Frontier.jpg",
  "Davao Oriental": "/images/Mindanao/Region XI — Davao Region/Davao Oriental The Sunrise Coast.jpg",
  // Region XII
  Cotabato: "/images/Mindanao/Region XII — SOCCSKSARGEN/North Cotabato The Highland Basin.jpg",
  Sarangani: "/images/Mindanao/Region XII — SOCCSKSARGEN/Sarangani The Coastal Frontier.jpg",
  "South Cotabato": "/images/Mindanao/Region XII — SOCCSKSARGEN/South Cotabato The Land of the Dreamweavers.jpg",
  "Sultan Kudarat": "/images/Mindanao/Region XII — SOCCSKSARGEN/Sultan Kudarat Coastal Plains and Foothills.jpg",
  // Region XIII
  "Agusan del Norte": "/images/Mindanao/Region XIII — Caraga/Agusan del Norte The Coastal Gateway and River Delta.jpg",
  "Agusan del Sur": "/images/Mindanao/Region XIII — Caraga/Agusan del Sur The Wildlife Sanctuary and Marshlands.jpg",
  "Dinagat Islands": "/images/Mindanao/Region XIII — Caraga/Dinagat Islands The Mystical Karst Seascape.jpg",
  "Surigao del Norte": "/images/Mindanao/Region XIII — Caraga/Surigao del Norte The Pacific Wave and Cloud 9.jpg",
  "Surigao del Sur": "/images/Mindanao/Region XIII — Caraga/Surigao del Sur The Enchanted River and Deep Blue.jpg",
  // BARMM
  Basilan: "/images/Mindanao/BARMM — Bangsamoro Autonomous Region in Muslim Mindanao/Basilan The Island Frontier and Rubber Capital.jpg",
  "Lanao del Sur": "/images/Mindanao/BARMM — Bangsamoro Autonomous Region in Muslim Mindanao/Lanao del Sur The Serene Inland Sea and Maranao Heritage.jpg",
  "Tawi-Tawi": "/images/Mindanao/BARMM — Bangsamoro Autonomous Region in Muslim Mindanao/Tawi-Tawi The Sea Gypsy Capital and Southernmost Jewels.jpg",
  "Maguindanao del Norte": "/images/Mindanao/BARMM — Bangsamoro Autonomous Region in Muslim Mindanao/Maguindanao del Norte The Marshlands and Mosque of Peace.jpg",
  "Maguindanao del Sur": "/images/Mindanao/BARMM — Bangsamoro Autonomous Region in Muslim Mindanao/Maguindanao del Sur The Golden Fields and Inland Hills.jpg",
};

// Region-level fallback if province image not found
const regionFallbackImages = {
  "Cordillera Administrative Region": "/images/Luzon/CAR — Cordillera Administrative Region/The Rice Terraces of Ifugao Banaue.jpg",
  "Region I - Ilocos Region": "/images/Luzon/Region I — Ilocos Region/The Spanish Heritage of Vigan Ilocos Sur.jpg",
  "Region II - Cagayan Valley": "/images/Luzon/Region II — Cagayan Valley/Marlboro Hills Batanes.jpg",
  "Region III - Central Luzon": "/images/Luzon/Region III — Central Luzon/Crucible of History Mount Samat Cross.jpg",
  "Region IV-A - CALABARZON": "/images/Luzon/Region IV-A — CALABARZON/Port of Batangas.jpg",
  "MIMAROPA Region": "/images/Luzon/MIMAROPA Region/Archipelagic Geography Palawan and Honda Bay.jpg",
  "Region V - Bicol Region": "/images/Luzon/Region V — Bicol Region/The Volcano and the Plains Mount Mayon.jpg",
  "Region VI - Western Visayas": "/images/Visayas/Region VI — Western Visayas/Preserved Heritage Weaving and the Miagao Church.jpg",
  "Negros Island Region": "/images/Visayas/NIR — Negros Island Region/Negros Occidental The Sugar Capital Silay City.jpg",
  "Region VII - Central Visayas": "/images/Visayas/Region VII — Central Visayas/Bohol - The Geological Wonders Chocolate Hills.jpg",
  "Region VIII - Eastern Visayas": "/images/Visayas/Region VIII — Eastern Visayas/The MacArthur Landing Leyte.jpg",
  "Region IX - Zamboanga Peninsula": "/images/Mindanao/Region IX — Zamboanga Peninsula/Zamboanga del Norte The Orchid City and Coastal Majesty.jpg",
  "Region X - Northern Mindanao": "/images/Mindanao/Region X — Northern Mindanao/Bukidnon The Land of Rolling Plateaus.jpg",
  "Region XI - Davao Region": "/images/Mindanao/Region XI — Davao Region/Davao del Sur The Peak of Majesty.jpg",
  "Region XII - SOCCSKSARGEN": "/images/Mindanao/Region XII — SOCCSKSARGEN/South Cotabato The Land of the Dreamweavers.jpg",
  "Region XIII - Caraga": "/images/Mindanao/Region XIII — Caraga/Surigao del Norte The Pacific Wave and Cloud 9.jpg",
  "Bangsamoro Autonomous Region in Muslim Mindanao": "/images/Mindanao/BARMM — Bangsamoro Autonomous Region in Muslim Mindanao/Lanao del Sur The Serene Inland Sea and Maranao Heritage.jpg",
};

// Island group fallback — last resort before generic /images/journey.jpg
const islandFallbackImages = {
  Luzon: "/images/Luzon/Region I — Ilocos Region/The Spanish Heritage of Vigan Ilocos Sur.jpg",
  Visayas: "/images/Visayas/Region VII — Central Visayas/Bohol - The Geological Wonders Chocolate Hills.jpg",
  Mindanao: "/images/Mindanao/Region X — Northern Mindanao/Bukidnon The Land of Rolling Plateaus.jpg",
};

function resolvePackageImage({ province, region, islandGroup }) {
  return (
    provinceImages[province] ||
    regionFallbackImages[region] ||
    islandFallbackImages[islandGroup] ||
    "/images/journey.jpg"
  );
}

export const islandGroups = [
  {
    id: "luzon",
    label: "Luzon",
    description:
      "Northern highlands, ancestral towns, old streets, island routes, food memory, and meaningful family homecoming journeys.",
  },
  {
    id: "visayas",
    label: "Visayas",
    description:
      "Island culture, heritage cities, faith traditions, coastal journeys, family stories, and warm regional encounters.",
  },
  {
    id: "mindanao",
    label: "Mindanao",
    description:
      "Southern landscapes, living cultures, highland routes, coastal communities, and deeply rooted regional identity.",
  },
];

export const regionShowcaseSlides = [
  {
    id: "cordillera",
    number: "01",
    title: "Cordillera Highlands",
    region: "Cordillera Administrative Region",
    islandGroup: "Luzon",
    description:
      "Mountain provinces, highland identity, ancestral landscapes, slow travel, and routes shaped by land and memory.",
    image: "/images/Luzon/CAR — Cordillera Administrative Region/The Rice Terraces of Ifugao Banaue.jpg",
  },
  {
    id: "ilocos",
    number: "02",
    title: "Ilocos Ancestral North",
    region: "Region I - Ilocos Region",
    islandGroup: "Luzon",
    description:
      "Preserved streets, northern food traditions, ancestral homes, coastal roads, and old towns with emotional texture.",
    image: "/images/Luzon/Region I — Ilocos Region/The Spanish Heritage of Vigan Ilocos Sur.jpg",
  },
  {
    id: "cagayan-valley",
    number: "03",
    title: "Cagayan Valley Routes",
    region: "Region II - Cagayan Valley",
    islandGroup: "Luzon",
    description:
      "Northern valleys, island silence, riverside towns, and province journeys shaped for discovery and return.",
    image: "/images/Luzon/Region II — Cagayan Valley/Marlboro Hills Batanes.jpg",
  },
  {
    id: "bicol",
    number: "04",
    title: "Bicol Living Culture",
    region: "Region V - Bicol Region",
    islandGroup: "Luzon",
    description:
      "Volcanic landscapes, island routes, food identity, devotional culture, and province-based homecoming journeys.",
    image: "/images/Luzon/Region V — Bicol Region/The Volcano and the Plains Mount Mayon.jpg",
  },
  {
    id: "visayas",
    number: "05",
    title: "Visayas Island Routes",
    region: "Visayas",
    islandGroup: "Visayas",
    description:
      "Heritage cities, island kinship, coastal culture, faith traditions, and family routes across central Philippines.",
    image: "/images/Visayas/Region VII — Central Visayas/Bohol - The Geological Wonders Chocolate Hills.jpg",
  },
  {
    id: "mindanao",
    number: "06",
    title: "Mindanao Southern Stories",
    region: "Mindanao",
    islandGroup: "Mindanao",
    description:
      "Southern routes shaped around culture, land, food, community, and meaningful travel support.",
    image: "/images/Mindanao/Region X — Northern Mindanao/Bukidnon The Land of Rolling Plateaus.jpg",
  },
];

const provinceSource = [
  {
    islandGroup: "Luzon",
    regions: [
      {
        region: "Cordillera Administrative Region",
        provinces: ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"],
      },
      {
        region: "Region I - Ilocos Region",
        provinces: ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
      },
      {
        region: "Region II - Cagayan Valley",
        provinces: ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
      },
      {
        region: "Region III - Central Luzon",
        provinces: ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
      },
      {
        region: "Region IV-A - CALABARZON",
        provinces: ["Batangas", "Cavite", "Laguna", "Quezon", "Rizal"],
      },
      {
        region: "MIMAROPA Region",
        provinces: ["Marinduque", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Romblon"],
      },
      {
        region: "Region V - Bicol Region",
        provinces: ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"],
      },
    ],
  },
  {
    islandGroup: "Visayas",
    regions: [
      {
        region: "Region VI - Western Visayas",
        provinces: ["Aklan", "Antique", "Capiz", "Guimaras", "Iloilo"],
      },
      {
        region: "Negros Island Region",
        provinces: ["Negros Occidental", "Negros Oriental", "Siquijor"],
      },
      {
        region: "Region VII - Central Visayas",
        provinces: ["Bohol", "Cebu"],
      },
      {
        region: "Region VIII - Eastern Visayas",
        provinces: ["Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte"],
      },
    ],
  },
  {
    islandGroup: "Mindanao",
    regions: [
      {
        region: "Region IX - Zamboanga Peninsula",
        provinces: ["Sulu", "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"],
      },
      {
        region: "Region X - Northern Mindanao",
        provinces: ["Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental"],
      },
      {
        region: "Region XI - Davao Region",
        provinces: ["Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental"],
      },
      {
        region: "Region XII - SOCCSKSARGEN",
        provinces: ["Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"],
      },
      {
        region: "Region XIII - Caraga",
        provinces: ["Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur"],
      },
      {
        region: "Bangsamoro Autonomous Region in Muslim Mindanao",
        provinces: ["Basilan", "Lanao del Sur", "Tawi-Tawi", "Maguindanao del Norte", "Maguindanao del Sur"],
      },
    ],
  },
];

const regionTone = {
  Luzon:
    "ancestral towns, old roads, highland culture, family memory, food routes, and heritage landscapes",
  Visayas:
    "island culture, historic cities, faith traditions, coastal routes, family gatherings, and warm regional encounters",
  Mindanao:
    "southern landscapes, cultural communities, highland routes, coastal heritage, food identity, and living traditions",
};

// Province-specific metadata for provinces with known reference itineraries.
// itineraryPdf reserved for PackageDetailPage — not rendered on /tour.
const itineraryMetadataByProvince = {
  Quezon: {
    duration: "3 Days / 2 Nights",
    itinerarySummary:
      "A Quezon island getaway reference shaped around Alibijaban, coastal pacing, and a short restorative route.",
    highlights: [
      "Alibijaban island escape reference",
      "Three-day coastal pacing",
      "Private or family route coordination",
      "Hotel, transfer, and travel support planning",
    ],
  },
  Iloilo: {
    duration: "5 Days / 4 Nights",
    itinerarySummary:
      "A Western Visayas reference route connecting Iloilo heritage, food memory, and a Bacolod extension.",
    highlights: [
      "Iloilo and Bacolod heritage route reference",
      "Western Visayas food and culture pacing",
      "Five-day private or family itinerary foundation",
      "Hotel, ferry, transfer, and travel support planning",
    ],
  },
  "Negros Occidental": {
    duration: "5 Days / 4 Nights",
    itinerarySummary:
      "A Bacolod-Iloilo reference route for sugar heritage, food memory, and Western Visayas city culture.",
    highlights: [
      "Bacolod and Iloilo heritage route reference",
      "Sugar heritage, food culture, and city stops",
      "Five-day private or family itinerary foundation",
      "Hotel, ferry, transfer, and travel support planning",
    ],
  },
  Benguet: {
    duration: "3 Days / 2 Nights",
    itinerarySummary:
      "A Baguio and Benguet highland reference route for cool-weather heritage, scenic stops, and gentle pacing.",
    highlights: [
      "Baguio and Benguet highland route reference",
      "Three-day mountain city pacing",
      "Scenic, cultural, and food memory stops",
      "Hotel, transfer, and travel support planning",
    ],
  },
  Bataan: {
    duration: "3 Days / 2 Nights",
    itinerarySummary:
      "A Bataan reference route for historical landscapes, family reflection, and a short heritage-focused journey.",
    highlights: [
      "Bataan historical route reference",
      "Three-day heritage and reflection pacing",
      "Private or family route coordination",
      "Hotel, transfer, and travel support planning",
    ],
  },
  Albay: {
    duration: "Day Tour",
    itinerarySummary:
      "A Bicol and Albay day tour reference centered on Mayon, local culture, and a concise scenic route.",
    highlights: [
      "Bicol and Albay day tour reference",
      "Mayon landscape and local culture pacing",
      "Concise scenic route planning",
      "Transfer and travel support coordination",
    ],
  },
};

function createProvincePackage({ province, region, islandGroup }) {
  const slug = normalizeSlug(`${province}-heritage-route`);
  const itineraryMetadata = itineraryMetadataByProvince[province] || {};

  const basePackage = {
    id: slug,
    slug,
    title: `${province} Heritage Route`,
    location: `${province}, ${region}`,
    province,
    region,
    islandGroup,
    category: islandGroup,
    theme: `${islandGroup} Heritage Journey`,
    duration: "Flexible itinerary",
    price: "Request quote",
    groupSize: "Private, family, or small group",
    shortDescription: `A flexible ${province} route shaped around roots, culture, travel comfort, and meaningful return.`,
    overview: `The ${province} Heritage Route is a flexible journey foundation for travelers who want to explore ${province} through ${regionTone[islandGroup]}. The final itinerary can be adjusted around family history, preferred pacing, travel dates, hotels, transfers, documents, and support needs.`,
    highlights: [
      "Province-based route planning",
      "Flexible private or family pacing",
      "Heritage, culture, food, and local context",
      "Hotel, transfer, document, and support coordination",
    ],
    inclusions: [
      "Custom route planning assistance",
      "Hotel and transfer coordination",
      "Travel document and insurance guidance",
      "Client support before and during the journey",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Route Orientation",
        details: [
          "Arrival support and travel briefing",
          "Gentle first stop based on traveler pace",
          "Optional local food or cultural introduction",
        ],
      },
      {
        day: "Day 2",
        title: "Province Story Route",
        details: [
          `Curated ${province} route based on traveler interests`,
          "Flexible heritage, culture, food, or family-focused stops",
          "Photo, reflection, and local encounter opportunities",
        ],
      },
      {
        day: "Day 3",
        title: "Return, Rest, or Extension",
        details: [
          "Final guided stops or personal time",
          "Transfer coordination",
          "Optional extension to nearby regions or islands",
        ],
      },
    ],
    reminders: [
      "Final rates, inclusions, availability, route sequence, and operating details are confirmed after consultation.",
      "This beta package is a province-based foundation and can be customized by traveler type, budget, schedule, and purpose.",
    ],
    travelNotes:
      "This package foundation is designed for beta browsing and inquiry. Province-specific attractions and final itinerary details should be confirmed during planning.",
  };

  const merged = { ...basePackage, ...itineraryMetadata };

  return {
    ...merged,
    image: resolvePackageImage(basePackage),
  };
}

export const provincePackages = provinceSource.flatMap((island) =>
  island.regions.flatMap((regionItem) =>
    regionItem.provinces.map((province) =>
      createProvincePackage({
        province,
        region: regionItem.region,
        islandGroup: island.islandGroup,
      })
    )
  )
);

export const groupedRegionalPackages = islandGroups.map((group) => ({
  ...group,
  packages: provincePackages.filter((item) => item.islandGroup === group.label),
}));

export const regionalPackageCategories = ["All", "Luzon", "Visayas", "Mindanao"];

export const packageStats = {
  total: provincePackages.length,
  luzon: provincePackages.filter((item) => item.islandGroup === "Luzon").length,
  visayas: provincePackages.filter((item) => item.islandGroup === "Visayas").length,
  mindanao: provincePackages.filter((item) => item.islandGroup === "Mindanao").length,
};
