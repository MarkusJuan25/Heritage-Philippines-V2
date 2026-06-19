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

// V1 source: 5 PDF itineraries covering 6 provinces.
// Benguet (Baguio Tour), Bataan, Albay (Bicol Day Tour),
// Quezon (Alibijaban Island), Negros Occidental, Iloilo (Bacolod-Iloilo combined).
// No 82-province draft file exists in this project.
// All other provinces use the generic 3-day fallback in createProvincePackage.
const itineraryMetadataByProvince = {

  Benguet: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Baguio City, Benguet (Burnham Suites)",
    transport:
      "Bus from Metro Manila (Cubao or Pasay terminals) via Victory Liner, Genesis, or Dagupan Bus. Approximately 5–6 hours to Baguio City.",
    bestFor: "Highland heritage families, cool-weather retreats, cultural explorers, small groups",
    costingNote:
      "Package rates are inquiry-based. Hotel selection and transport confirmed after consultation based on group type and schedule.",
    supplierChecks: [
      "Burnham Suites or equivalent hotel coordination",
      "Local guide or driver for Day 2 highland circuit",
      "La Trinidad Strawberry Farm and Mines View access coordination",
    ],
    highlights: [
      "La Trinidad Strawberry Farm — strawberry picking and farm visit",
      "Burnham Park boating, cycling, and Rose Garden walk",
      "Mines View Park and Wright Park horseback riding",
      "Baguio Night Market — ukay-ukay, souvenirs, street food",
      "Camp John Hay morning walk among pine trees",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Baguio City — City Orientation",
        details: [
          "9:00 AM — Arrival in Baguio City via bus",
          "10:00 AM–12:00 PM — La Trinidad Strawberry Farm: strawberry picking and farm visit",
          "12:00 PM — Lunch at Kabunian Cafe and Restaurant",
          "2:00 PM — Check-in at Burnham Suites; freshen up and prepare for afternoon walk",
          "3:00–4:00 PM — Session Road walk: shops, cafes, and the main commercial strip",
          "4:00–5:30 PM — Burnham Park: boating at Burnham Lake, bike rental, Rose Garden walk",
          "6:00–7:30 PM — Dinner at Burnham Suites",
          "7:40–9:00 PM — SM City Baguio: shopping and rooftop overlooking view of the city skyline",
        ],
      },
      {
        day: "Day 2",
        title: "Baguio Heritage and Scenic Circuit",
        details: [
          "7:00–8:30 AM — Breakfast at the hotel",
          "9:00–10:00 AM — Baguio Botanical Garden: pine tree garden pathways and cultural attire photos",
          "10:10–11:00 AM — Wright Park: horseback riding, scenic stair walk toward The Mansion",
          "11:00–11:30 AM — The Mansion: official summer residence of the Philippine President",
          "12:00–12:45 PM — Lunch near Mines View area",
          "1:00–2:00 PM — Mines View Park: panoramic views, souvenir stalls, Igorot costume photo stop",
          "3:00–4:30 PM — Mirador Jesuit Villa Retreat House: prayer garden and bamboo eco-trails",
          "6:00–7:30 PM — Dinner at Good Taste Restaurant",
          "8:00–9:30 PM — Baguio Night Market: ukay-ukay, souvenirs, and local street food",
        ],
      },
      {
        day: "Day 3",
        title: "Final Baguio Morning and Departure",
        details: [
          "7:00–8:30 AM — Breakfast at the hotel",
          "9:00–11:00 AM — Camp John Hay: relaxing morning walk among pine trees",
          "12:00 PM — Lunch at Choco-laté de Batirol: traditional hot chocolate and Filipino dishes",
          "1:30–2:30 PM — Baguio Public Market: fresh produce, local delicacies, handicrafts, and souvenirs",
          "3:00 PM — Proceed to bus terminal and depart from Baguio",
        ],
      },
    ],
  },

  Bataan: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Balanga City, Bataan (Crown Royale Hotel)",
    transport:
      "Bus from Metro Manila (Cubao, Monumento, or SM Caloocan) via Genesis Transport to Balanga City. Approximately 2 hours 39 minutes (128 km). Local transfers by private van.",
    bestFor: "Historical heritage travelers, WWII reflection tours, family groups, school and cultural tours",
    costingNote:
      "Package rates are inquiry-based. Hotel and transport confirmed after consultation.",
    supplierChecks: [
      "Crown Royale Hotel or equivalent coordination",
      "Local heritage guide for WWII and historical sites",
      "Las Casas Filipinas de Acuzar day tour booking",
      "Playa La Caleta resort coordination",
    ],
    highlights: [
      "Dambana ng Kagitingan / Mt. Samat National Shrine and Death March Monument",
      "Zero Kilometer Death March Marker and Japan-Philippines Friendship Tower",
      "Bataan World War II Museum",
      "Las Casas Filipinas de Acuzar — restored Spanish colonial heritage walk",
      "Playa La Caleta beachfront",
      "Pawikan Conservation Center — sea turtle education and exhibit",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Historical Exploration — Manila to Bataan",
        details: [
          "8:00 AM — Depart from Manila (approximately 2h 39m, 128 km via Genesis Transport)",
          "11:45 AM–1:00 PM — Arrival at Buenas Ridge: lunch with scenic views of Bataan",
          "1:00–2:00 PM — Travel to Crown Royale Hotel in Balanga City; hotel check-in",
          "2:30–3:15 PM — Flaming Sword monument: symbolic WWII landmark of Filipino and American bravery",
          "3:30–4:30 PM — Bataan World War II Museum: artifacts, photographs, and historical exhibits",
          "4:35–5:15 PM — Plaza Mayor De Ciudad de Balanga: leisure walk and local snacks",
          "5:15–5:30 PM — Cathedral Shrine and Parish of St. Joseph: architecture and quiet reflection",
          "6:00–7:00 PM — Dinner at The Bethany restaurant",
          "7:00 PM — Return to hotel and rest",
        ],
      },
      {
        day: "Day 2",
        title: "Heritage Shrines and Beachfront Relaxation",
        details: [
          "7:00–8:00 AM — Breakfast at the hotel",
          "8:00–9:30 AM — Dambana ng Kagitingan / Mt. Samat National Shrine: scenic drive and Death March Monument",
          "9:30–10:20 AM — Japan-Philippines Friendship Tower: solemn reflection",
          "10:20–10:35 AM — Zero Kilometer Death March Marker",
          "10:35–11:40 AM — Las Casas Filipinas de Acuzar: guided heritage walk through restored Spanish colonial houses",
          "11:40 AM–12:40 PM — Lunch at Hotel de Oriente, Binondo Hall inside Las Casas",
          "1:10–6:00 PM — Playa La Caleta: swimming, shoreside relaxation, and coastal rest",
          "6:00–7:00 PM — Dinner at Playa La Caleta beachfront",
          "7:00 PM — Return to hotel",
        ],
      },
      {
        day: "Day 3",
        title: "Eco Tour — Crafts, Conservation, and Departure",
        details: [
          "7:00–8:00 AM — Breakfast at the hotel",
          "8:00–9:15 AM — Pulo Handicraft in Orani: locally made bamboo, wood, and native fiber crafts",
          "9:15–10:30 AM — Pawikan Conservation Center, Morong: sea turtle conservation education and exhibit",
          "10:30 AM–12:00 PM — Return to hotel and check out",
          "12:10–12:40 PM — Bataan Tourism Park: souvenir shopping and local delicacies",
          "12:40–1:40 PM — Lunch at Mesa Feliz Restaurant",
          "2:00 PM — Depart from Bataan and return to Manila",
        ],
      },
    ],
  },

  Albay: {
    duration: "Day Tour",
    gatewayBase: "Legazpi City, Albay (Bicol International Airport)",
    transport:
      "Direct flight from Manila to Legazpi (approximately 1 hour). Or overnight bus from Pasay terminals (approximately 9–10 hours).",
    bestFor: "Volcano landscape travelers, Bicol food adventure, ATV and adventure tours, photography groups",
    costingNote:
      "Day tour rates are inquiry-based. Guide and transport within Albay confirmed per group size.",
    supplierChecks: [
      "Mayon SkyDrive ATV Adventure booking",
      "Cagsawa Ruins local guide coordination",
      "Waway's Restaurant reservation",
      "Airport-to-site transport coordination",
    ],
    highlights: [
      "Mayon SkyDrive ATV Adventure — off-road trail and river crossing toward Mayon Volcano",
      "Cagsawa Ruins — 1814 eruption heritage landmark with Mayon backdrop",
      "Colonial Creamery — sili (chili) ice cream",
      "Daraga Church — baroque hilltop landmark overlooking Albay",
      "Waway's Restaurant — Bicolano cuisine: laing, pinangat, Bicol Express",
    ],
    itinerary: [
      {
        day: "Day Tour",
        title: "Bicol Spice Adventure — Mayon, Ruins, and Culture",
        details: [
          "8:00 AM — Arrival at Bicol International Airport, Legazpi City",
          "8:25–10:30 AM — Mayon SkyDrive ATV Adventure: off-road trail crossing a 200-meter river toward Mayon Volcano; SkyDrive Combo Trail through grassland and Cagsawa forest",
          "10:30–11:00 AM — Cagsawa Ruins: sightseeing at the 1814 Mayon eruption heritage landmark; souvenir stalls; sili ice cream at Colonial Creamery",
          "11:20–11:40 AM — Daraga Church: baroque-style church on a hilltop overlooking Albay",
          "12:00–1:00 PM — Lunch at Waway's Restaurant: Bicolano dishes including laing, pinangat, and Bicol Express",
          "1:00–1:30 PM — Return to Bicol International Airport for departure",
        ],
      },
    ],
  },

  Quezon: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "San Andres Port, Quezon → Alabat Island (Nanay Santa's Garden Beach Resort)",
    transport:
      "Bus from Manila to San Andres Port, Quezon (approximately 6 hours). Boat transfer from San Andres Port to Alabat Island (approximately 45 minutes). Tricycle transfer on the island.",
    bestFor: "Island escape travelers, couples, family groups, off-grid coastal rest, nature retreats",
    costingNote:
      "Package rates are inquiry-based. Island boat transfers, resort accommodation, and Alibijaban day tour included in coordination.",
    supplierChecks: [
      "Nanay Santa's Garden Beach Resort coordination (Alabat Island)",
      "Bangka boat from San Andres Port to Alabat Island",
      "Private boat for Alibijaban Island day tour",
      "Island picnic lunch coordination",
      "Travel insurance for island and water activities",
    ],
    highlights: [
      "Alibijaban Island — pristine sandbar, crystal-clear water, mangroves, snorkeling",
      "Nanay Santa's Garden Beach Resort — beachfront stay on Alabat Island",
      "Private boat island-hopping experience",
      "Fresh seafood and local island meals",
      "Optional sunset cruise",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to San Andres to Alabat Island",
        details: [
          "7:00 AM — Departure from Manila by land",
          "1:00 PM — Arrival at San Andres Port, Quezon",
          "1:30 PM — Boat transfer to Alabat Island: scenic ocean crossing",
          "2:15 PM — Tricycle transfer to Nanay Santa's Garden Beach Resort",
          "2:30 PM — Check-in at the resort and settle in",
          "Afternoon — Relax by the shore, swim, or unwind at the beachfront",
          "Evening — Fresh seafood and local island specialties by the beach",
        ],
      },
      {
        day: "Day 2",
        title: "Alibijaban Island Private Tour",
        details: [
          "7:00 AM — Breakfast of fresh tropical fruits and local delicacies at Nanay Santa's",
          "8:00 AM — Private boat to Alibijaban Island: exclusive ocean crossing",
          "Island activities — Sandbar walk at low tide, swimming in clear waters, mangrove exploration, optional snorkeling",
          "12:30 PM — Picnic lunch on the sandbar",
          "3:00 PM — Return to Nanay Santa's Beach Resort; afternoon rest or beach leisure",
          "5:00 PM — Optional sunset cruise or leisurely shoreline stroll",
          "7:00 PM — Private beach dinner",
        ],
      },
      {
        day: "Day 3",
        title: "Leisure and Departure — Alabat to Manila",
        details: [
          "6:30 AM — Sunrise view and light breakfast by the beach",
          "Morning — Leisure time: swimming, spa, or photo session around the resort",
          "11:00 AM — Check-out and transfer to the port on Alabat Island",
          "11:30 AM — Boat back to San Andres Port on the mainland",
          "12:30 PM — Depart for Manila by land",
          "6:30 PM — Arrival in Manila",
        ],
      },
    ],
  },

  Iloilo: {
    duration: "5 Days / 4 Nights",
    gatewayBase: "Bacolod City, Negros Occidental → Iloilo City, Iloilo (combined Western Visayas route)",
    transport:
      "Direct flight from Manila to Bacolod-Silay International Airport, then OceanJet or Weesam Express ferry to Iloilo (Guimaras Strait crossing, approx. 1.5 hours). Or fly directly to Iloilo International Airport.",
    bestFor: "Heritage city explorers, Western Visayas food and culture, combined Bacolod-Iloilo route, family groups",
    costingNote:
      "Package rates are inquiry-based. Combined Bacolod-Iloilo tour. Hotel, ferry, and inter-city transport confirmed after consultation.",
    supplierChecks: [
      "Park Inn by Radisson Iloilo coordination",
      "OceanJet or Weesam Express ferry scheduling (BREDCO Port Bacolod to Iloilo)",
      "Silay City and Bacolod heritage guide",
      "Restaurant reservations: Netong's, Tatoy's, Breakthrough, Tong Yang Plus",
    ],
    highlights: [
      "Molo Church and Molo Mansion — Gothic heritage and ancestral house",
      "Jaro Metropolitan Cathedral — Marian shrine of Our Lady of the Candles",
      "Camina Balay nga Bato — heritage house with tsokolate de batirol",
      "Netong's Original La Paz Batchoy — Iloilo's iconic noodle dish",
      "Festive Walk Iloilo — evening shopping and dining at Iloilo Business Park",
      "Biscocho Haus — biscocho, butterscotch, barquillos, and Ilonggo pasalubong",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Bacolod City — Heritage and Food Introduction",
        details: [
          "9:00 AM — Arrival in Bacolod City and check-in at Seda Hotel",
          "1:00–2:00 PM — Lunch at Manokan Country Premiere: Bacolod's famous Chicken Inasal",
          "2:30–3:00 PM — San Sebastian Cathedral: heritage church for quiet reflection and architecture",
          "3:30–4:30 PM — The Ruins: the 'Taj Mahal of Negros' — sugar heritage landmark and sunset photos",
          "5:00–6:00 PM — Bacolod Public Plaza: leisurely walk and sightseeing",
          "6:30 PM — Dinner at the hotel",
        ],
      },
      {
        day: "Day 2",
        title: "Silay City Heritage Circuit — Sugar Baron Ancestral Homes",
        details: [
          "7:00–8:30 AM — Breakfast at the hotel",
          "9:00–10:00 AM — Negros Museum: Negros Island history, culture, and artistic heritage",
          "10:30 AM–12:30 PM — Balay Negrense: preserved Gaston family ancestral house, sugar baron era antiques and furnishings",
          "12:30–1:30 PM — Lunch in Silay at a heritage restaurant",
          "2:00–3:00 PM — Bernardino Jalandoni Museum: ancestral home with antique furniture and sugar baron family history",
          "4:30–6:00 PM — Capitol Lagoon Park in Bacolod: scenic lagoon walk in front of the Provincial Capitol",
          "7:00 PM — Dinner at a local Bacolod restaurant",
        ],
      },
      {
        day: "Day 3",
        title: "Ferry to Iloilo — Molo Church and River Esplanade",
        details: [
          "7:00–8:00 AM — Breakfast at the hotel in Bacolod City",
          "9:00 AM — Transfer to BREDCO Port",
          "9:30–11:00 AM — Ferry to Iloilo City via OceanJet or Weesam Express across the Guimaras Strait",
          "11:30 AM — Hotel check-in at Park Inn by Radisson Iloilo",
          "12:30–1:30 PM — Lunch at Netong's Original La Paz Batchoy in the La Paz district",
          "2:00–2:40 PM — Molo Church (St. Anne Parish Church): Gothic heritage church with female saint statues",
          "2:50–5:00 PM — Molo Mansion: restored heritage house with souvenir shops and local crafts",
          "5:30–7:30 PM — Iloilo River Esplanade: sunset walk along one of the Philippines' longest river esplanades",
          "7:30 PM — Dinner at Breakthrough Restaurant: Ilonggo seafood and classic local dishes",
        ],
      },
      {
        day: "Day 4",
        title: "Iloilo Heritage and Cultural Landmarks",
        details: [
          "7:00–8:30 AM — Breakfast at Park Inn by Radisson Iloilo",
          "9:30–10:30 AM — Museo Iloilo: archaeological finds, historical artifacts, and Western Visayas cultural heritage",
          "12:00–1:00 PM — Lunch at Tatoy's Manokan and Seafood: grilled seafood and native lechon manok",
          "2:30–3:30 PM — Jaro Metropolitan Cathedral: Marian shrine of Our Lady of the Candles",
          "4:00–4:30 PM — Camina Balay nga Bato: heritage house with traditional tsokolate de batirol",
          "6:00–7:30 PM — Festive Walk Iloilo: evening shopping and dining at Iloilo Business Park",
          "8:00 PM — Dinner at Tong Yang Plus buffet (Festive Walk Mall)",
        ],
      },
      {
        day: "Day 5",
        title: "Pasalubong Shopping and Departure from Iloilo",
        details: [
          "7:00–8:00 AM — Final breakfast at Park Inn by Radisson Iloilo",
          "8:30–10:00 AM — Pasalubong shopping at Biscocho Haus: biscocho, butterscotch, barquillos, and Ilonggo sweets",
          "10:30 AM — Hotel check-out",
          "Transfer to Iloilo International Airport for departure flight",
        ],
      },
    ],
  },

  "Negros Occidental": {
    duration: "5 Days / 4 Nights",
    gatewayBase: "Bacolod City, Negros Occidental (Seda Hotel Bacolod) → Iloilo City (Park Inn by Radisson)",
    transport:
      "Direct flight from Manila to Bacolod-Silay International Airport. Or fly to Iloilo and take OceanJet or Weesam Express ferry across the Guimaras Strait to Bacolod (approximately 1.5 hours). Inter-city transfers by private van.",
    bestFor: "Sugar heritage and Silay City history, Bacolod food culture, Western Visayas combined route, city and heritage travelers",
    costingNote:
      "Package rates are inquiry-based. Combined Bacolod-Iloilo tour. Hotel, ferry, and inter-city transport confirmed after consultation.",
    supplierChecks: [
      "Seda Hotel Bacolod coordination",
      "OceanJet or Weesam Express ferry scheduling (BREDCO Port, Bacolod to Iloilo)",
      "Silay City heritage guide — Balay Negrense and Bernardino Jalandoni Museum",
      "Restaurant reservations: Manokan Country, Tatoy's, Netong's, Breakthrough",
    ],
    highlights: [
      "The Ruins — the 'Taj Mahal of Negros,' sugar baron heritage landmark",
      "Balay Negrense and Bernardino Jalandoni Museum — Silay City sugar baron ancestral homes",
      "San Sebastian Cathedral — Bacolod heritage church",
      "Manokan Country Premiere — Bacolod Chicken Inasal",
      "Capitol Lagoon Park — lagoon view and city walk",
      "Negros Museum — Negros Island cultural and historical exhibits",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Bacolod City — Heritage and Food Introduction",
        details: [
          "9:00 AM — Arrival in Bacolod City and check-in at Seda Hotel",
          "1:00–2:00 PM — Lunch at Manokan Country Premiere: Bacolod's famous Chicken Inasal",
          "2:30–3:00 PM — San Sebastian Cathedral: heritage church for quiet reflection and architecture",
          "3:30–4:30 PM — The Ruins: the 'Taj Mahal of Negros' — sugar heritage landmark and sunset photos",
          "5:00–6:00 PM — Bacolod Public Plaza: leisurely walk and sightseeing",
          "6:30 PM — Dinner at the hotel",
        ],
      },
      {
        day: "Day 2",
        title: "Silay City Heritage Circuit — Sugar Baron Ancestral Homes",
        details: [
          "7:00–8:30 AM — Breakfast at the hotel",
          "9:00–10:00 AM — Negros Museum: Negros Island history, culture, and artistic heritage",
          "10:30 AM–12:30 PM — Balay Negrense: preserved Gaston family ancestral house, sugar baron era antiques and furnishings",
          "12:30–1:30 PM — Lunch in Silay at a heritage restaurant",
          "2:00–3:00 PM — Bernardino Jalandoni Museum: ancestral home with antique furniture and sugar baron family history",
          "4:30–6:00 PM — Capitol Lagoon Park in Bacolod: scenic lagoon walk in front of the Provincial Capitol",
          "7:00 PM — Dinner at a local Bacolod restaurant",
        ],
      },
      {
        day: "Day 3",
        title: "Ferry to Iloilo — Molo Church and River Esplanade",
        details: [
          "7:00–8:00 AM — Breakfast at the hotel in Bacolod City",
          "9:00 AM — Transfer to BREDCO Port",
          "9:30–11:00 AM — Ferry to Iloilo City via OceanJet or Weesam Express across the Guimaras Strait",
          "11:30 AM — Hotel check-in at Park Inn by Radisson Iloilo",
          "12:30–1:30 PM — Lunch at Netong's Original La Paz Batchoy in the La Paz district",
          "2:00–2:40 PM — Molo Church (St. Anne Parish Church): Gothic heritage church with female saint statues",
          "2:50–5:00 PM — Molo Mansion: restored heritage house with souvenir shops and local crafts",
          "5:30–7:30 PM — Iloilo River Esplanade: sunset walk along one of the Philippines' longest river esplanades",
          "7:30 PM — Dinner at Breakthrough Restaurant: Ilonggo seafood and classic local dishes",
        ],
      },
      {
        day: "Day 4",
        title: "Iloilo Heritage and Cultural Landmarks",
        details: [
          "7:00–8:30 AM — Breakfast at Park Inn by Radisson Iloilo",
          "9:30–10:30 AM — Museo Iloilo: archaeological finds, historical artifacts, and Western Visayas cultural heritage",
          "12:00–1:00 PM — Lunch at Tatoy's Manokan and Seafood: grilled seafood and native lechon manok",
          "2:30–3:30 PM — Jaro Metropolitan Cathedral: Marian shrine of Our Lady of the Candles",
          "4:00–4:30 PM — Camina Balay nga Bato: heritage house with traditional tsokolate de batirol",
          "6:00–7:30 PM — Festive Walk Iloilo: evening shopping and dining at Iloilo Business Park",
          "8:00 PM — Dinner at Tong Yang Plus buffet (Festive Walk Mall)",
        ],
      },
      {
        day: "Day 5",
        title: "Pasalubong Shopping and Departure from Iloilo",
        details: [
          "7:00–8:00 AM — Final breakfast at Park Inn by Radisson Iloilo",
          "8:30–10:00 AM — Pasalubong shopping at Biscocho Haus: biscocho, butterscotch, barquillos, and Ilonggo sweets",
          "10:30 AM — Hotel check-out",
          "Transfer to Iloilo International Airport for departure flight",
        ],
      },
    ],
  },

  Abra: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Bangued, Abra (via Vigan, Ilocos Sur)",
    transport:
      "Bus from Manila to Vigan (approximately 8–9 hours via Victory Liner or Partas), then van or minibus to Bangued (approximately 1.5 hours). Alternatively, drive via NLEX-TPLEX through Baguio then Abra route.",
    bestFor: "Highland heritage travelers, waterfall seekers, off-the-beaten-path Luzon routes, small groups",
    costingNote:
      "Package rates are inquiry-based. Transport and accommodation in Bangued confirmed after consultation based on group type.",
    supplierChecks: [
      "Local driver and guide coordination in Bangued",
      "Kaparkan Falls trekking permit and guide",
      "Accommodation in Bangued",
      "Abra Provincial Tourism Office coordination",
    ],
    highlights: [
      "Kaparkan Falls — multi-tiered limestone cascades called the 'Niagara of the North'",
      "Tineg River — remote highland river canyon scenery",
      "Bangued Church and plaza — Spanish colonial heritage center",
      "Pidigan Church — quiet Ilocano heritage church near Bangued",
      "Villa Fria Falls — accessible waterfall for a lighter day option",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Bangued — Arrival and Heritage Orientation",
        details: [
          "Early morning — Depart Manila by bus toward Vigan, Ilocos Sur",
          "Late afternoon — Arrive in Vigan; transfer by van to Bangued, Abra (approximately 1.5 hours)",
          "Evening — Arrive in Bangued; check-in and rest",
          "Optional — Stroll around Bangued Plaza and the Abra Provincial Capitol grounds",
        ],
      },
      {
        day: "Day 2",
        title: "Kaparkan Falls Trek and Tineg River Route",
        details: [
          "6:00 AM — Early breakfast; prepare for highland trek",
          "7:00 AM — Depart for Tineg by local vehicle (approximately 2 hours from Bangued)",
          "9:00 AM — Begin guided trek to Kaparkan Falls through forested trails",
          "11:00 AM — Arrive at Kaparkan Falls: explore the multi-tiered limestone cascades and swimming area",
          "12:30 PM — Picnic lunch near the falls",
          "2:00 PM — Trek return; optional Tineg River bank rest stop",
          "4:30 PM — Return to Bangued",
          "Evening — Dinner in Bangued",
        ],
      },
      {
        day: "Day 3",
        title: "Heritage Churches, Villa Fria Falls, and Departure",
        details: [
          "7:30 AM — Breakfast and check-out",
          "8:30 AM — Pidigan Church: quiet Ilocano heritage church near Bangued",
          "10:00 AM — Villa Fria Falls: short accessible waterfall stop near town",
          "11:30 AM — Bangued Public Market: local produce, Abra handicrafts, and pasalubong",
          "12:30 PM — Lunch in Bangued before departure",
          "2:00 PM — Depart for Vigan or Manila",
        ],
      },
    ],
  },

  "Agusan del Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Butuan City, Agusan del Norte (Bancasi Airport)",
    transport:
      "Direct flight from Manila to Butuan (Bancasi Airport), approximately 1.5 hours. Local transfers within the city by multicab or private van.",
    bestFor: "Philippine pre-colonial history, balangay boat heritage, cultural museum travelers, small groups and families",
    costingNote:
      "Package rates are inquiry-based. Hotel and transfers within Butuan confirmed after consultation.",
    supplierChecks: [
      "Accommodation in Butuan City",
      "Butuan National Museum and Balangay Shrine access",
      "Local heritage guide coordination",
      "Butuan City Tourism Office coordination",
    ],
    highlights: [
      "Balangay Shrine Museum — site of the oldest recovered wooden boats in Southeast Asia",
      "Butuan National Museum — golden tara and pre-colonial Butuan artifacts",
      "Agusan River — lifeblood of the Caraga region",
      "Holy Infant Parish Church — Butuan's patron saint heritage landmark",
      "Baug Heritage Village — living cultural community near Butuan",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Butuan City — Pre-Colonial History Introduction",
        details: [
          "Morning — Arrive at Bancasi Airport; transfer to hotel in Butuan City",
          "Afternoon — Check-in and rest; orientation walk around Butuan's city center",
          "3:00 PM — Holy Infant Parish Church: patron saint of Butuan, historic devotional landmark",
          "4:30 PM — Guingona Park and Butuan City plaza: relaxed afternoon walk",
          "Evening — Dinner at a local Butuan restaurant featuring Caraga regional cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Balangay Shrine and Pre-Colonial Butuan",
        details: [
          "7:30 AM — Breakfast at the hotel",
          "9:00 AM — Balangay Shrine Museum: excavated site of the oldest wooden boat finds in Southeast Asia (dating to 320 AD); guided tour",
          "11:00 AM — Butuan National Museum: golden tara replica, pre-colonial gold artifacts, and Butuan trading kingdom exhibits",
          "12:30 PM — Lunch in the city",
          "2:30 PM — Agusan River bank: scenic walk and local fishing community observation",
          "4:00 PM — Baug Heritage Village: visit to the living Lumad cultural settlement near Butuan",
          "Evening — Rest and free evening in the city",
        ],
      },
      {
        day: "Day 3",
        title: "Cultural Souvenirs and Departure",
        details: [
          "7:30 AM — Breakfast and hotel check-out",
          "9:00 AM — Local market or city center: souvenir shopping and Caraga regional delicacies",
          "10:30 AM — Optional final stop at the Balangay marker or People's Plaza",
          "11:30 AM — Transfer to Bancasi Airport for departure flight",
        ],
      },
    ],
  },

  "Agusan del Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Prosperidad, Agusan del Sur (via Butuan City, Agusan del Norte)",
    transport:
      "Fly to Butuan (Bancasi Airport), then travel by land to Prosperidad (approximately 2 hours). Provincial roads into the interior require a sturdy vehicle or local van.",
    bestFor: "Wildlife and wetland explorers, Lumad cultural encounters, ecotourism groups, off-grid nature travelers",
    costingNote:
      "Package rates are inquiry-based. Agusan Marsh access requires coordination with local wildlife sanctuary management and DENR.",
    supplierChecks: [
      "DENR Agusan Marsh Wildlife Sanctuary permit",
      "Local Manobo community guide for cultural encounter",
      "Accommodation in Prosperidad or accredited ecotourism lodge",
      "Boat hire for marsh exploration",
    ],
    highlights: [
      "Agusan Marsh Wildlife Sanctuary — one of Southeast Asia's most significant freshwater wetlands",
      "Manobo floating village communities — life on the marsh",
      "Lake Mainit — one of the deepest lakes in the Philippines",
      "Lumad Manobo cultural traditions and boat life",
      "Agusan River tributaries — remote river valley routes",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Butuan and Transfer to Agusan del Sur",
        details: [
          "Morning — Arrive at Bancasi Airport, Butuan City",
          "9:30 AM — Transfer by land to Prosperidad (approximately 2 hours)",
          "12:00 PM — Lunch in Prosperidad town proper",
          "Afternoon — Check-in and rest at accredited lodge",
          "Late afternoon — Orientation on Agusan Marsh access and safety briefing",
          "Evening — Dinner and preparation for early marsh departure",
        ],
      },
      {
        day: "Day 2",
        title: "Agusan Marsh Wildlife Sanctuary and Manobo Floating Villages",
        details: [
          "6:00 AM — Early departure by boat into the Agusan Marsh",
          "Morning — Guided marsh exploration: freshwater wetland wildlife, water lilies, and bird species",
          "9:30 AM — Visit to Manobo floating village community: traditional stilt houses and daily marsh life",
          "11:30 AM — Return boat journey; picnic or packed lunch at the marsh edge",
          "2:00 PM — Rest at lodge; optional village market exploration",
          "Evening — Cultural sharing session with Manobo community guide (if available)",
        ],
      },
      {
        day: "Day 3",
        title: "Lake Mainit Day Visit and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:00 AM — Travel to Lake Mainit shore (shared boundary with Surigao del Norte)",
          "9:30 AM — Lake Mainit shoreline visit: one of the Philippines' deepest lakes; scenic views and local fishing community",
          "11:00 AM — Return to Prosperidad for lunch",
          "1:00 PM — Depart for Butuan City",
          "3:30 PM — Arrive in Butuan; transfer to Bancasi Airport for departure",
        ],
      },
    ],
  },

  Aklan: {
    duration: "4 Days / 3 Nights",
    gatewayBase: "Caticlan, Aklan (Godofredo P. Ramos Airport) → Boracay Island",
    transport:
      "Fly from Manila to Caticlan (approximately 1 hour), then tricycle to Caticlan Jetty Port and 15-minute pump boat to Boracay. Alternatively, fly to Kalibo International Airport (approximately 1 hour) and take a 2-hour van ride to Caticlan.",
    bestFor: "Beach and island travelers, Ati-Atihan festival culture, Aklan mainland waterfalls, couples and families",
    costingNote:
      "Package rates are inquiry-based. Boracay environmental fee and Caticlan jetty fee apply at point of entry. Hotel confirmed after consultation.",
    supplierChecks: [
      "Caticlan or Kalibo Airport coordination",
      "Pump boat transfer and Boracay environmental fee",
      "Beach resort or hotel in Boracay",
      "Island-hopping boat rental coordination",
      "Ati-Atihan Festival schedule check if applicable (January)",
    ],
    highlights: [
      "Boracay White Beach — one of the Philippines' most iconic white sand shores",
      "Puka Shell Beach — quieter north-end beach with a different pace",
      "Ati-Atihan Festival heritage, Kalibo — origin of the island's most celebrated cultural tradition",
      "Jawili Falls, Tangalan — multi-tiered waterfall on the Aklan mainland",
      "Boracay island-hopping — Crystal Cove, Crocodile Island snorkeling, Bat Cave",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Caticlan and Boracay Beach Orientation",
        details: [
          "Morning — Fly into Caticlan; tricycle to Caticlan Jetty Port",
          "Pump boat crossing to Boracay Island (approximately 15 minutes)",
          "Late morning — Check-in at beach resort; freshen up",
          "Afternoon — First walk along Boracay White Beach: Station 1, 2, and 3 orientation",
          "Sunset — Beachfront sunset at Station 1 or Diniwid area",
          "Evening — Dinner at a White Beach restaurant; optional D'Mall pasalubong visit",
        ],
      },
      {
        day: "Day 2",
        title: "Boracay Island-Hopping and Puka Shell Beach",
        details: [
          "8:00 AM — Breakfast at the resort",
          "9:00 AM — Island-hopping boat tour: Crystal Cove, Crocodile Island snorkeling, Bat Cave",
          "12:00 PM — Return to beach resort for lunch",
          "2:00 PM — Afternoon walk to Puka Shell Beach at the northern end of the island",
          "5:00 PM — Sunset walk along the north coast",
          "Evening — Dinner and optional night market or beachside bonfire",
        ],
      },
      {
        day: "Day 3",
        title: "Kalibo Heritage and Jawili Falls",
        details: [
          "7:00 AM — Breakfast and check-out of Boracay resort",
          "8:30 AM — Pump boat back to Caticlan; van ride to Kalibo (approximately 1.5 hours)",
          "10:30 AM — Kalibo Catholic Church and town plaza: Spanish colonial heritage in Aklan's capital",
          "12:00 PM — Lunch in Kalibo featuring Aklanon local cuisine",
          "2:00 PM — Jawili Falls, Tangalan: multi-tiered falls accessible by short trek",
          "4:30 PM — Aklan River walk and Kalibo public market: local crafts and weave products",
          "Evening — Overnight in Kalibo or Caticlan area for early departure",
        ],
      },
      {
        day: "Day 4",
        title: "Departure from Aklan",
        details: [
          "Morning — Breakfast and final pasalubong in Kalibo",
          "9:30 AM — Transfer to Kalibo International Airport or Caticlan Airport",
          "Depart from Aklan via morning flight back to Manila",
        ],
      },
    ],
  },

  Antique: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "San Jose de Buenavista, Antique (via Iloilo City)",
    transport:
      "Fly to Iloilo International Airport, then take a 2-hour van or bus ride to San Jose de Buenavista via the Antique coastal road. Or direct ferry from Iloilo to Culasi.",
    bestFor: "Off-the-beaten-path Western Visayas, waterfall and river adventure, island day trips, cultural encounters",
    costingNote:
      "Package rates are inquiry-based. Nogas Island and Seco Island access requires advance boat hire coordination.",
    supplierChecks: [
      "Hotel or pension house in San Jose de Buenavista",
      "Boat hire to Nogas Island",
      "Tibiao River rafting or kayaking guide coordination",
      "Local tricycle transfers on the Antique coastal road",
    ],
    highlights: [
      "Nogas Island — pristine islet with clear water and white sand off Hamtic",
      "Tibiao River — kayaking and eco-adventure river route",
      "Malumpati Cold Spring — crystal-clear natural pool in Pandan",
      "Seco Island — remote sandbar island day excursion from Culasi",
      "Dao Highland — upland community in northern Antique",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in San Jose and Coastal Road Orientation",
        details: [
          "Morning — Fly to Iloilo then transfer by van to San Jose de Buenavista (approximately 2 hours)",
          "Afternoon — Check-in at hotel; rest and freshen up",
          "3:30 PM — San Jose de Buenavista town center: Provincial Capitol grounds and plaza walk",
          "5:00 PM — Coastal drive along the Antique shore: views of the Sulu Sea at dusk",
          "Evening — Dinner featuring Antiqueno cuisine: tiyula, fresh seafood, and local kakanin",
        ],
      },
      {
        day: "Day 2",
        title: "Nogas Island and Tibiao River Adventure",
        details: [
          "7:00 AM — Breakfast and early departure",
          "8:00 AM — Boat ride to Nogas Island off Hamtic: snorkeling, sandbar walk, and coral viewing",
          "11:00 AM — Return to mainland; lunch in Hamtic area",
          "1:30 PM — Travel to Tibiao River for kayaking or river trekking",
          "3:30 PM — Malumpati Cold Spring, Pandan: natural cold spring pool and river picnic area",
          "5:30 PM — Return to San Jose de Buenavista",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Dao Highland and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive to Dao highland barangay in northern Antique: upland community visit",
          "10:30 AM — Return toward San Jose; stop at local weaving community",
          "12:00 PM — Lunch and pasalubong at local market",
          "2:00 PM — Depart by van back to Iloilo City for flight home",
        ],
      },
    ],
  },

  Apayao: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Kabugao, Apayao (via Tuguegarao, Cagayan or Laoag, Ilocos Norte)",
    transport:
      "Fly to Tuguegarao or Laoag, then travel by land to Kabugao (approximately 3–4 hours from Tuguegarao). Roads into Apayao require an SUV or local transport.",
    bestFor: "Remote highland trekkers, cave explorers, eco-travelers, off-grid Cordillera experience",
    costingNote:
      "Package rates are inquiry-based. Apayao is among the more remote CAR provinces; final logistics require close coordination with local operators.",
    supplierChecks: [
      "Accommodation in Kabugao or approved eco-lodge",
      "Lussok Crystal Cave guide and permit coordination",
      "Maton Falls trekking guide",
      "Apayao River boat tour coordination",
    ],
    highlights: [
      "Lussok Crystal Cave — dramatic crystal cave formations near Kabugao",
      "Maton Falls — multi-tiered highland waterfall",
      "Apayao River — clean river for swimming and quiet exploration",
      "Kabugao town center — the quiet highland capital of Apayao",
      "Nagtipunan area — remote community and river valley scenery",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kabugao — Remote Highland Orientation",
        details: [
          "Morning — Fly to Tuguegarao then travel by land to Kabugao (approximately 3–4 hours)",
          "Afternoon — Arrive in Kabugao; check-in at approved lodge",
          "Late afternoon — Kabugao town orientation: Provincial Capitol, plaza, and Apayao River bank",
          "Evening — Dinner and early rest for next day's trek",
        ],
      },
      {
        day: "Day 2",
        title: "Lussok Crystal Cave and Maton Falls Trek",
        details: [
          "6:00 AM — Early breakfast; prepare for the day",
          "7:00 AM — Guided trek to Lussok Crystal Cave: explore crystal stalactite and stalagmite formations",
          "10:00 AM — Return from cave; travel to Maton Falls trailhead",
          "11:00 AM — Trek to Maton Falls; swim in the natural falls pool",
          "1:00 PM — Packed lunch at the falls area",
          "3:00 PM — Return to Kabugao",
          "Evening — Rest; optional interaction with local highland community",
        ],
      },
      {
        day: "Day 3",
        title: "Apayao River and Departure",
        details: [
          "7:00 AM — Breakfast and check-out preparation",
          "8:30 AM — Apayao River bank: relaxed swim or local boat ride along the clean mountain river",
          "10:30 AM — Kabugao market: local produce and highland crafts",
          "12:00 PM — Lunch before departure",
          "1:00 PM — Depart by land back to Tuguegarao for flight home",
        ],
      },
    ],
  },

  Aurora: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Baler, Aurora",
    transport:
      "Bus from Manila (Cubao or Pasay) to Baler via Cabanatuan route (approximately 5–6 hours) via Genesis or Joy Bus. Private car via NLEX to Nueva Ecija then Pantabangan-Baler Road.",
    bestFor: "Surfing beginners and enthusiasts, heritage church travelers, waterfall seekers, weekend coastal escapes",
    costingNote:
      "Package rates are inquiry-based. Surfboard rentals and guides available locally at Sabang Beach. Hotel confirmed after consultation.",
    supplierChecks: [
      "Beachside accommodation in Baler (Sabang Beach area)",
      "Surfboard rental and surf instructor coordination",
      "Ditumabo Falls trekking guide",
      "Local tricycle or multicab transfers in Baler",
    ],
    highlights: [
      "Sabang Beach — Aurora's surf capital, beginner-friendly waves",
      "Baler Church — heritage church from the 1898 Spanish-American War siege",
      "Ditumabo Mother Falls — dramatic multi-tier falls via river trek",
      "Aniao Islets — twin offshore islets for snorkeling and coastal views",
      "Baler town — quiet provincial capital with layered historical significance",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Baler — Surfside Arrival",
        details: [
          "Early morning — Depart Manila by bus or private car",
          "Late morning — Arrive in Baler; check-in at Sabang Beach accommodation",
          "Afternoon — First visit to Sabang Beach: observe the surf and rest by the shore",
          "3:00 PM — Baler Church: heritage church where Spanish soldiers held out during the 1898 siege; brief visit and reflection",
          "Evening — Beachside dinner and rest",
        ],
      },
      {
        day: "Day 2",
        title: "Surfing Sabang and Ditumabo Falls Trek",
        details: [
          "7:00 AM — Breakfast at the accommodation",
          "8:00 AM — Morning surf lesson at Sabang Beach with local instructor",
          "11:00 AM — Cool down; beachside rest",
          "12:30 PM — Lunch in Baler town",
          "2:00 PM — Depart for Ditumabo Mother Falls, Maria Aurora",
          "2:45 PM — Begin river trek to Ditumabo Falls (approximately 45 minutes of river wading)",
          "4:00 PM — Arrive at Ditumabo Falls: swim in the pool beneath the cascading falls",
          "5:30 PM — Trek back and return to Baler",
          "Evening — Dinner at a local Baler restaurant",
        ],
      },
      {
        day: "Day 3",
        title: "Aniao Islets, Pasalubong, and Departure",
        details: [
          "7:00 AM — Breakfast and check-out preparation",
          "8:00 AM — Bangka to Aniao Islets: short snorkeling and coastal view stop",
          "10:00 AM — Return to shore",
          "11:00 AM — Pasalubong at local Baler market: peanut butter, tinapa, and local sweets",
          "12:00 PM — Lunch before departure",
          "1:00 PM — Depart Baler for Manila by bus or private car",
        ],
      },
    ],
  },

  Basilan: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Isabela City, Basilan (via Zamboanga City ferry)",
    transport:
      "Fly from Manila to Zamboanga City (approximately 1.5 hours). Take a fast craft or passenger ferry from Zamboanga City to Isabela City, Basilan (approximately 1.5–2 hours). Local transfers by tricycle within Isabela City.",
    bestFor: "Cultural history travelers, Yakan weaving heritage, frontier island explorers, small cultural groups",
    costingNote:
      "Package rates are inquiry-based. Travel advisories for Basilan should be reviewed prior to booking. Coordination with local registered operators is required.",
    supplierChecks: [
      "Zamboanga–Isabela fast craft schedule and booking",
      "Accredited hotel or guesthouse in Isabela City",
      "Local heritage guide familiar with Yakan community sites",
      "Isabela City Tourism Office coordination",
    ],
    highlights: [
      "Fort Isabela — Spanish fortification overlooking the Basilan Strait",
      "Yakan Weaving Village — traditional geometric textile craft of the Yakan people",
      "Malamawi Beach — accessible beach island near Isabela City",
      "St. Peter's Cathedral, Isabela — heritage colonial church",
      "Rubber plantations — Basilan's agricultural landscape and economic identity",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Zamboanga to Isabela City — Island Frontier Arrival",
        details: [
          "Morning — Arrive in Zamboanga City by flight; transfer to port",
          "Late morning — Fast craft to Isabela City, Basilan (approximately 1.5–2 hours)",
          "Afternoon — Check-in at hotel; brief orientation",
          "3:30 PM — Fort Isabela: Spanish-era fort overlooking the Basilan Strait; heritage walk and views",
          "5:00 PM — St. Peter's Cathedral: colonial church in Isabela City center",
          "Evening — Dinner at a local restaurant and rest",
        ],
      },
      {
        day: "Day 2",
        title: "Yakan Weaving Heritage and Rubber Plantation Visit",
        details: [
          "7:30 AM — Breakfast at the hotel",
          "9:00 AM — Yakan Weaving Village: guided tour of the weaving process; observe traditional Yakan geometric textile patterns",
          "11:00 AM — Rubber plantation drive: Basilan's landscape shaped by rubber cultivation since the American period",
          "12:30 PM — Lunch in Isabela City",
          "2:30 PM — Malamawi Beach: bangka ride to the quiet beach island near Isabela City; swimming and shore rest",
          "5:00 PM — Return to Isabela City",
          "Evening — Dinner and free time",
        ],
      },
      {
        day: "Day 3",
        title: "Pasalubong and Return Ferry to Zamboanga",
        details: [
          "7:30 AM — Breakfast and hotel check-out",
          "8:30 AM — Isabela City market: local crafts, Yakan textiles, and island produce",
          "10:00 AM — Transfer to Isabela City Port",
          "10:30 AM — Fast craft back to Zamboanga City",
          "12:30 PM — Arrive in Zamboanga City; transfer to airport for departure flight",
        ],
      },
    ],
  },

  Batanes: {
    duration: "4 Days / 3 Nights",
    gatewayBase: "Basco, Batan Island, Batanes (Basco Airport)",
    transport:
      "Scheduled flights to Basco from Manila or Clark, subject to current airline schedules and weather conditions; flight duration is approximately 1.5–2 hours. Seats are limited and advance booking is essential. Inter-island transit to Sabtang Island by Faluwa wooden boat is weather-dependent and may be cancelled at short notice. Local travel by tricycle or bike rental on Batan Island.",
    bestFor: "Scenic landscape travelers, Ivatan heritage culture, island walks, photography groups, slow travel enthusiasts",
    costingNote:
      "Package rates are inquiry-based. Batanes is a remote northern province — flights have limited seats and should be booked well in advance. Weather windows directly affect Sabtang island crossings and may require flexible scheduling.",
    supplierChecks: [
      "Round-trip flight booking to Basco (advance purchase required; confirm current airline schedules)",
      "Accredited homestay or hotel in Basco",
      "Faluwa boat to Sabtang Island (weather-contingent; confirm with local boatmen)",
      "Local tricycle or bike hire around Batan Island",
      "Batanes Tourism Office coordination",
    ],
    highlights: [
      "Vayang Rolling Hills (Marlboro Hills) — dramatic grass hills overlooking the West Philippine Sea",
      "Sabtang Island — preserved Ivatan stone village communities",
      "Naidi Hills and Batan Island lighthouse — northern Philippines landmark",
      "Ivatan stone houses — vernacular architecture built for typhoon resilience",
      "Honesty Coffee Shop, Ivana — Batanes' famous unstaffed honor-system store in South Batan",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Basco — Batan Island Orientation",
        details: [
          "Morning — Arrive at Basco Airport; check-in at homestay or hotel",
          "Afternoon — Basco town orientation: Basco Church, Provincial Capitol, and lighthouse area",
          "3:00 PM — Vayang Rolling Hills (Marlboro Hills): sweeping views of rolling green hills against the sea at golden hour",
          "Evening — Dinner featuring Ivatan cuisine: uved balls, coconut crab if available, and local greens",
        ],
      },
      {
        day: "Day 2",
        title: "Sabtang Island — Stone Village Cultural Immersion",
        details: [
          "6:00 AM — Early breakfast; prepare for Sabtang crossing",
          "7:00 AM — Faluwa boat from Ivana Port to Sabtang Island (crossing is weather-dependent and may be cancelled; approximately 30 minutes if conditions allow)",
          "8:00 AM — Savidug Idjang viewpoint: ancient hillfort site with panoramic views over Sabtang",
          "9:00 AM — Chavayan Village: stone Ivatan houses, vakul hat weavers, and preserved village layout",
          "11:00 AM — Sabtang Lighthouse coast: scenic cliff walk and Pacific view",
          "12:30 PM — Packed lunch in Sabtang",
          "2:00 PM — Morong Beach and Nakabuang Arch: coastal scenery and the natural stone arch along the Sabtang shoreline",
          "4:00 PM — Faluwa return to Ivana Port, Batan Island",
          "Evening — Rest and dinner in Basco",
        ],
      },
      {
        day: "Day 3",
        title: "South Batan and Ivana — Honesty Store, Coastal Views, and North Batan Circuit",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Ivana town: Ivana Port area and nearby heritage church; South Batan coastal scenery",
          "9:30 AM — Honesty Coffee Shop, Ivana: browse the unmanned honor-system store; try Batanes coffee and local products",
          "10:30 AM — Dipnaysupuan Japanese Tunnel: WWII underground tunnel near Basco",
          "12:00 PM — Lunch in Basco",
          "1:30 PM — Naidi Hills and Batan Island lighthouse: panoramic views across Basco and the northern coast",
          "3:00 PM — Valugan Boulder Beach: beach strewn with volcanic boulders on the Pacific-facing shore",
          "4:30 PM — Chawa View Deck: cliff overlook along the southern Batan coast",
          "Evening — Final dinner in Basco",
        ],
      },
      {
        day: "Day 4",
        title: "Morning Leisure and Departure",
        details: [
          "6:30 AM — Sunrise walk near Basco shore",
          "8:00 AM — Breakfast and hotel check-out",
          "9:00 AM — Final pasalubong at Basco market: Batanes garlic, dried fish, and woven goods",
          "Transfer to Basco Airport for departure flight",
        ],
      },
    ],
  },

  Batangas: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Tagaytay City / Taal, Batangas",
    transport:
      "Bus from Manila (Pasay or Cubao) to Tagaytay or Batangas City via DLTB or Jam Liner (approximately 1.5–2.5 hours). Private car via SLEX to STAR Tollway is the most comfortable option.",
    bestFor: "Heritage church travelers, volcanic landscape day trips, diving in Anilao, family heritage routes, weekend escapes",
    costingNote:
      "Package rates are inquiry-based. Taal Lake boat hire to Taal Volcano Island requires advance coordination and safety clearance based on PHIVOLCS alert levels.",
    supplierChecks: [
      "Hotel in Tagaytay or Taal town",
      "Taal Lake bangka hire (check PHIVOLCS alert status before booking)",
      "Anilao dive shop coordination if diving is included",
      "San Agustin Church Taal guide confirmation",
    ],
    highlights: [
      "Taal Volcano and Taal Lake — one of the world's smallest active volcanoes on an island within a lake",
      "Basilica of St. Martin de Tours, Taal — one of the largest Catholic churches in Asia",
      "Caleruega Church — Dominican chapel in a scenic hilltop garden in Nasugbu",
      "Anilao, Mabini — one of the Philippines' premier dive and marine photography sites",
      "Tagaytay Ridge — cool highland dining with panoramic Taal views",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Tagaytay — Taal Lake Arrival",
        details: [
          "Morning — Depart Manila by bus or private car to Tagaytay (approximately 1.5–2 hours)",
          "Late morning — Check-in at Tagaytay hotel; rest",
          "1:00 PM — Tagaytay Ridge: lunch with a panoramic view of Taal Volcano and Taal Lake",
          "3:00 PM — Caleruega Church, Nasugbu: tranquil Dominican chapel garden and view deck",
          "Evening — Dinner at a Tagaytay restaurant: bulalo soup and classic Batangas dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Taal Heritage Town and Taal Lake Crossing",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Drive to Taal town (approximately 1 hour from Tagaytay)",
          "9:30 AM — Basilica of St. Martin de Tours: heritage tour of one of Asia's largest Catholic churches",
          "10:30 AM — Taal heritage houses: ancestral homes along the old town streets",
          "12:00 PM — Lunch at Josephine's Restaurant or equivalent in Taal",
          "1:30 PM — Travel to Talisay for Taal Lake crossing (subject to PHIVOLCS alert level clearance)",
          "2:00 PM — Bangka across Taal Lake to Taal Volcano Island: crater rim walk and sulfuric lake view",
          "4:30 PM — Return by bangka to Talisay shore",
          "Evening — Return to Tagaytay; dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Anilao Coastal Visit and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive to Anilao, Mabini (approximately 1.5 hours from Tagaytay)",
          "10:00 AM — Anilao waterfront: snorkel or dive tour at the marine sanctuary",
          "12:00 PM — Lunch at a local Anilao seafood restaurant",
          "1:30 PM — Depart from Anilao back to Manila via Batangas City",
          "4:00 PM — Arrive in Manila",
        ],
      },
    ],
  },

  Biliran: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Naval, Biliran Island (via Tacloban, Leyte)",
    transport:
      "Fly from Manila to Tacloban Daniel Z. Romualdez Airport (approximately 1.5 hours), then travel by van to Biliran Island via the Biliran Bridge (approximately 1.5–2 hours).",
    bestFor: "Quiet island nature escapes, waterfall seekers, hot spring relaxation, off-grid Eastern Visayas travelers",
    costingNote:
      "Package rates are inquiry-based. Biliran is a quieter island province; final logistics coordinated with local operators.",
    supplierChecks: [
      "Hotel or lodging in Naval, Biliran",
      "Local guide for Ulan-ulan Falls and Tomalistis Falls",
      "Mainit Hot Springs access coordination",
      "Tacloban–Biliran van transfer booking",
    ],
    highlights: [
      "Ulan-ulan Falls — multi-layered cascading waterfall near Naval",
      "Mainit Hot Springs — natural volcanic hot spring pools in the highland interior",
      "Tomalistis Falls — remote falls with a natural swimming pool",
      "Biliran Island coastline — quiet bays and fishing community views",
      "Naval town center — relaxed island capital and fishing port",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Tacloban to Naval — Biliran Island Arrival",
        details: [
          "Morning — Fly into Tacloban; transfer by van to Naval, Biliran (approximately 1.5–2 hours)",
          "Afternoon — Check-in at hotel; rest and freshen up",
          "3:30 PM — Naval town walk: port area, town plaza, and local market orientation",
          "5:00 PM — Biliran Island coastline drive: fishing village views and island shore at sunset",
          "Evening — Dinner at a Naval seafood restaurant",
        ],
      },
      {
        day: "Day 2",
        title: "Waterfalls and Hot Springs Circuit",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Guided trip to Ulan-ulan Falls: short trek to the multi-tiered falls; swim in natural pool",
          "11:00 AM — Travel to Mainit Hot Springs: highland hot spring pools for relaxation",
          "1:00 PM — Picnic lunch at the springs area or return to Naval for lunch",
          "3:00 PM — Tomalistis Falls: quieter falls with a natural pool",
          "5:30 PM — Return to Naval",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Island Coastal Walk and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Biliran coastline morning drive: barangay coastal roads and island shore views",
          "10:00 AM — Caibiran town: interior island community and valley views",
          "12:00 PM — Lunch in Naval before departure",
          "1:30 PM — Depart by van to Tacloban Airport",
          "3:30 PM — Arrive at Tacloban for departure flight",
        ],
      },
    ],
  },

  Bohol: {
    duration: "4 Days / 3 Nights",
    gatewayBase: "Tagbilaran City, Bohol (Bohol-Panglao International Airport)",
    transport:
      "Direct flight from Manila to Bohol-Panglao International Airport (approximately 1.5 hours). Local transfers by van, tricycle, or hired motorcycle within Bohol.",
    bestFor: "Heritage church travelers, natural wonder seekers, island beach relaxation, family and heritage groups",
    costingNote:
      "Package rates are inquiry-based. Chocolate Hills viewdeck, Loboc River cruise, and tarsier sanctuary may carry separate entrance or activity fees.",
    supplierChecks: [
      "Hotel in Tagbilaran City or Panglao Island",
      "Loboc River cruise booking",
      "Philippine Tarsier Sanctuary coordination",
      "Island-hopping boat hire at Panglao or Balicasag",
      "Baclayon Church heritage guide coordination",
    ],
    highlights: [
      "Chocolate Hills — over 1,200 unique cone-shaped hills across the Carmen plains",
      "Loboc River Floating Restaurant Cruise — drifting through lush rainforest scenery",
      "Philippine Tarsier Sanctuary — encounter one of the world's smallest primates in semi-wild habitat",
      "Baclayon Church — 16th-century coral stone heritage church",
      "Balicasag Island — world-class dive site and marine sanctuary",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Tagbilaran — Heritage Church and Coastal Orientation",
        details: [
          "Morning — Arrive at Bohol-Panglao Airport; transfer to hotel",
          "Afternoon — Check-in and rest",
          "2:30 PM — Baclayon Church: one of the oldest coral stone churches in the Philippines; attached museum visit",
          "3:30 PM — Blood Compact Shrine: monument to the 1565 Sikatuna-Legazpi blood compact",
          "4:30 PM — Tagbilaran City walk and waterfront: city plaza and harbor view",
          "Evening — Dinner at a local Tagbilaran restaurant featuring Boholano cuisine and fresh seafood",
        ],
      },
      {
        day: "Day 2",
        title: "Tarsier Sanctuary, Loboc River, Bilar Forest, and Chocolate Hills",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:00 AM — Philippine Tarsier Sanctuary, Corella: guided encounter with one of the world's smallest primates in their semi-wild habitat; strict no-flash photography policy applies",
          "10:00 AM — Loboc River Floating Restaurant Cruise: lunch while drifting through forested river scenery",
          "12:30 PM — Man-made Forest in Bilar: drive through the dense mahogany tree-lined road",
          "1:30 PM — Continue toward Carmen; optional stop in Antequera for local basket crafts only if timing permits",
          "2:30 PM — Chocolate Hills Complex, Carmen: viewdeck panorama of the 1,200+ cone hills across the valley",
          "4:30 PM — Return to Tagbilaran",
          "Evening — Dinner in Tagbilaran",
        ],
      },
      {
        day: "Day 3",
        title: "Panglao Island and Balicasag Marine Sanctuary",
        details: [
          "7:00 AM — Breakfast and transfer to Panglao Island",
          "8:30 AM — Alona Beach orientation: beachfront morning stroll",
          "10:00 AM — Boat tour to Balicasag Island: snorkeling at the marine sanctuary (marine wildlife may be observed but cannot be guaranteed)",
          "12:30 PM — Return to Alona Beach for lunch",
          "2:30 PM — Virgin Island sandbar near Panglao: swimming and relaxation",
          "5:00 PM — Return to hotel in Tagbilaran or overnight on Panglao",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 4",
        title: "Morning Leisure and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Tagbilaran Public Market: local kalamay, dried mangoes, and Bohol pasalubong",
          "10:00 AM — Transfer to Bohol-Panglao Airport",
          "Depart from Bohol via morning flight to Manila",
        ],
      },
    ],
  },

  Bukidnon: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Malaybalay City, Bukidnon (via Cagayan de Oro City)",
    transport:
      "Fly from Manila to Laguindingan Airport, Cagayan de Oro (approximately 1.5 hours). Travel by van from CDO to Malaybalay (approximately 1.5 hours via Sayre Highway).",
    bestFor: "Highland adventure seekers, pineapple country and pine landscape travelers, monastery visits, family and cultural groups",
    costingNote:
      "Package rates are inquiry-based. Dahilayan Adventure Park has separate activity fees. Mt. Kitanglad trekking requires advance DENR permit coordination.",
    supplierChecks: [
      "Hotel in Malaybalay City",
      "Dahilayan Adventure Park activity reservation",
      "Monastery of the Transfiguration visit schedule",
      "CDO–Malaybalay van transfer coordination",
    ],
    highlights: [
      "Dahilayan Adventure Park — zipline and adventure courses in a cool highland pine setting",
      "Monastery of the Transfiguration, Malaybalay — Benedictine monastery with sweeping highland views",
      "Kitanglad Range Natural Park — one of the Philippines' most important biodiversity zones",
      "Del Monte pineapple country — sweeping plantation vistas along the plateau",
      "Kaamulan Festival heritage — Bukidnon's living tribal cultural festival (March)",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Cagayan de Oro to Malaybalay — Highland Arrival",
        details: [
          "Morning — Arrive at Laguindingan Airport; travel by van to Malaybalay (approximately 1.5 hours)",
          "Noon — Arrive in Malaybalay City; check-in at hotel",
          "Afternoon — Malaybalay city center: Provincial Capitol grounds and town orientation",
          "3:30 PM — Monastery of the Transfiguration: Benedictine monastery with sweeping highland views and peaceful garden grounds",
          "5:00 PM — Drive along Sayre Highway: views of rolling Bukidnon farmland and plateau scenery",
          "Evening — Dinner in Malaybalay featuring local highland cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Dahilayan Adventure Park and Pineapple Country",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Depart for Dahilayan, Manolo Fortich (approximately 1 hour from Malaybalay)",
          "9:30 AM — Dahilayan Adventure Park: zipline rides over pine-forested valleys; optional sky bike and rope courses",
          "12:00 PM — Lunch in Manolo Fortich or packed picnic at the park",
          "2:00 PM — Del Monte pineapple plantation drive: vistas of the country's largest pineapple growing area",
          "4:00 PM — Return to Malaybalay",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Kitanglad Range and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Kitanglad Range entrance area: highland landscape views and biodiversity orientation (day visit; full trekking requires advance DENR permit)",
          "10:30 AM — Impasug-ong highland: pines and rolling Bukidnon upland scenery",
          "12:00 PM — Lunch in Malaybalay before departure",
          "1:30 PM — Depart by van to Cagayan de Oro; Laguindingan Airport for return flight",
        ],
      },
    ],
  },

  Bulacan: {
    duration: "2 Days / 1 Night",
    gatewayBase: "Malolos City, Bulacan",
    transport:
      "Bus from Manila (Monumento, Caloocan) via Baliwag Transit or Tamaraw to Malolos (approximately 1.5 hours). Private car via McArthur Highway or NLEX.",
    bestFor: "Philippine Revolution and heritage church travelers, school and civic tours, family heritage groups, day trips from Manila",
    costingNote:
      "Package rates are inquiry-based. Most Bulacan heritage sites are accessible as day trips from Metro Manila. Overnight option based on preference.",
    supplierChecks: [
      "Hotel or pension house in Malolos City",
      "Barasoain Church access and heritage guide",
      "Biak-na-Bato National Park coordination (San Miguel, Bulacan)",
      "Local guide for Malolos heritage circuit",
    ],
    highlights: [
      "Barasoain Church — site of the First Philippine Republic Congress in 1898",
      "Malolos Cathedral (Our Lady of Mount Carmel) — adjacent heritage landmark",
      "Marcelo H. del Pilar ancestral home, Bulacan town — hometown of the Filipino reformist writer",
      "Biak-na-Bato National Park — Aguinaldo's revolutionary mountain hideout with limestone caves",
      "Malolos Heritage Zone — ancestral houses along the historic city center streets",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Malolos — Philippine Republic Heritage Route",
        details: [
          "Morning — Depart Manila by bus or private car to Malolos City (approximately 1.5 hours)",
          "10:00 AM — Barasoain Church: site where the Malolos Constitution was drafted and the First Philippine Republic congress convened; heritage museum visit",
          "11:30 AM — Malolos Cathedral: adjacent colonial church and heritage precinct walk",
          "12:30 PM — Lunch at a local Malolos restaurant",
          "2:00 PM — Malolos heritage house walk: ancestral homes along heritage streets near the church",
          "4:00 PM — Marcelo H. del Pilar ancestral home, Bulacan town (approximately 30 minutes from Malolos): hometown of the renowned reformist writer",
          "Evening — Dinner in Malolos and overnight stay",
        ],
      },
      {
        day: "Day 2",
        title: "Biak-na-Bato National Park and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive to Biak-na-Bato National Park, San Miguel (approximately 1.5 hours from Malolos)",
          "10:00 AM — Biak-na-Bato caves: limestone cave system used as Aguinaldo's mountain headquarters during the revolution",
          "11:30 AM — Sibul Spring: natural mineral spring nearby",
          "1:00 PM — Lunch in San Miguel area",
          "2:30 PM — Return to Manila",
        ],
      },
    ],
  },

  Cagayan: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Tuguegarao City, Cagayan (Tuguegarao Airport)",
    transport:
      "Direct flight from Manila to Tuguegarao Airport (approximately 1 hour). Local transfers within Cagayan by van or multicab.",
    bestFor: "Cave explorers, natural heritage travelers, Palaui Island seekers, northern Luzon heritage routes",
    costingNote:
      "Package rates are inquiry-based. Callao Cave and Palaui Island access requires coordination with the Peñablanca Protected Landscape Authority.",
    supplierChecks: [
      "Hotel in Tuguegarao City",
      "Callao Cave guide and entrance coordination",
      "Palaui Island boat hire from Santa Ana (weather-dependent)",
      "Local van hire for Peñablanca and Cagayan Valley touring",
    ],
    highlights: [
      "Callao Cave — 7-chamber limestone cave with a natural chapel lit by a skylight opening",
      "Palaui Island — uninhabited heritage island with a Spanish colonial lighthouse and clear marine waters",
      "Peñablanca Protected Landscape — one of the Philippines' most significant cave systems",
      "Cagayan River — longest river in the Philippines running through the valley",
      "Tuguegarao Cathedral — heritage church in the Cagayan capital",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Tuguegarao — Cagayan Valley Orientation",
        details: [
          "Morning — Arrive at Tuguegarao Airport; transfer to hotel",
          "Afternoon — City orientation: Tuguegarao Cathedral, Cagayan Provincial Capitol, and city plaza",
          "3:00 PM — Cagayan River bank: views of the country's longest river and its broad valley basin",
          "Evening — Dinner at a local Tuguegarao restaurant featuring Ibanag cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Callao Cave and Peñablanca Protected Landscape",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Drive to Callao Cave, Peñablanca (approximately 25 km from Tuguegarao)",
          "9:30 AM — Callao Cave guided tour: 7-chamber limestone cave complex; natural chapel in Chamber 1 lit by a skylight opening",
          "11:30 AM — Callao Cave zipline over the Pinacanauan River (optional)",
          "12:30 PM — Lunch near Callao Cave",
          "2:00 PM — Pinacanauan River boat ride: scenic crossing to additional cave chamber viewpoints",
          "4:00 PM — Return to Tuguegarao",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Palaui Island Day Visit and Departure",
        details: [
          "5:30 AM — Early departure by van to Santa Ana Port (approximately 2.5 hours from Tuguegarao)",
          "8:00 AM — Boat hire to Palaui Island: 15-minute crossing to the uninhabited island",
          "9:00 AM — Cape Engaño Lighthouse: Spanish colonial lighthouse at the island's northeastern tip; coastal forest walk",
          "11:00 AM — Palaui Island beach and marine sanctuary: snorkeling in clear waters",
          "12:30 PM — Packed lunch on the island",
          "2:00 PM — Return boat to Santa Ana Port",
          "3:00 PM — Drive back to Tuguegarao Airport for departure flight",
        ],
      },
    ],
  },

  "Camarines Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Daet, Camarines Norte (via Manila bus or Naga City route)",
    transport:
      "Bus from Manila (Pasay terminals) to Daet (approximately 7–8 hours) via DLTB, Isarog, or Penafrancia Tours. Or fly to Naga City then travel north to Daet by van (approximately 2 hours).",
    bestFor: "Surf and beach travelers, island-hopping seekers, off-beaten Bicol routes, nature and coastal groups",
    costingNote:
      "Package rates are inquiry-based. Bagasbas Beach surf lessons and Apuao Grande Island boat hire confirmed after consultation.",
    supplierChecks: [
      "Hotel or surf hostel in Daet near Bagasbas Beach",
      "Surfboard rental and local surf instructor",
      "Bangka hire to Apuao Grande Island from Mercedes Port",
      "Mercedes Fish Port access for early morning market visit",
    ],
    highlights: [
      "Bagasbas Beach — Camarines Norte's surf beach, beginner-friendly with north swells",
      "Apuao Grande Island — pristine island with white sand and clear water off Mercedes",
      "Mercedes Fish Port — one of the largest fishing ports in the Bicol region",
      "Daet town center — quiet provincial capital with heritage church",
      "Mt. Cadigdig — inland hiking destination with Bicol landscape views",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Daet — Bagasbas Beach First Evening",
        details: [
          "Late afternoon — Arrive in Daet by bus or van transfer from Naga",
          "Check-in at beach accommodation near Bagasbas",
          "5:00 PM — First walk at Bagasbas Beach: observe surf conditions and watch the sunset",
          "Evening — Dinner at a local Daet beachside restaurant; fresh Bicol seafood",
        ],
      },
      {
        day: "Day 2",
        title: "Surfing Bagasbas and Apuao Grande Island",
        details: [
          "7:00 AM — Breakfast at the accommodation",
          "8:00 AM — Morning surf session at Bagasbas Beach with local instructor",
          "10:30 AM — Rest and freshen up",
          "12:00 PM — Lunch in Daet",
          "1:30 PM — Transfer to Mercedes Port for bangka hire to Apuao Grande Island",
          "2:30 PM — Apuao Grande Island: swimming, snorkeling, and sandbar walk",
          "5:00 PM — Return to Mercedes and transfer to Daet",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Mercedes Fish Port and Departure",
        details: [
          "6:00 AM — Early visit to Mercedes Fish Port: morning catch activity at one of the region's largest fishing ports",
          "8:00 AM — Daet heritage church visit: Saint John the Baptist Parish",
          "9:30 AM — Daet public market: local produce and Bicolano pasalubong",
          "11:00 AM — Lunch before departure",
          "12:30 PM — Depart Daet by bus toward Manila or van to Naga for flight home",
        ],
      },
    ],
  },

  "Camarines Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Naga City, Camarines Sur (Naga Airport)",
    transport:
      "Direct flight from Manila to Naga Airport (approximately 1 hour). Or overnight bus from Pasay terminals (approximately 9–10 hours). Caramoan Peninsula accessed by van plus bangka from Sabang Port (approximately 3–4 hours total from Naga).",
    bestFor: "Caramoan island karst explorers, Peñafrancia pilgrimage travelers, watersports groups, Bicol food and heritage",
    costingNote:
      "Package rates are inquiry-based. Caramoan island-hopping is weather-dependent and requires advance boat hire coordination.",
    supplierChecks: [
      "Hotel in Naga City",
      "Bangka hire for Caramoan island-hopping (Sabang Port, Garchitorena)",
      "CamSur Watersports Complex booking if wakeboard is included",
      "Caramoan local guide and permit coordination",
    ],
    highlights: [
      "Caramoan Peninsula — dramatic limestone karst islands, white sand beaches, and clear seas",
      "Basilica Minore of Our Lady of Peñafrancia — patron saint shrine of Bicolandia",
      "CamSur Watersports Complex — premier wakeboarding cable park in the Philippines",
      "Lake Buhi — home of the sinarapan, one of the world's smallest commercial fish",
      "Naga City — Bicol's cultural and devotional center",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Naga City — Heritage and Devotional Tour",
        details: [
          "Morning — Arrive in Naga via flight or bus; check-in at hotel",
          "Afternoon — Naga Metropolitan Cathedral: Naga's patron church",
          "2:30 PM — Basilica Minore of Our Lady of Peñafrancia: visit the shrine of Bicolandia's patron saint",
          "4:00 PM — Naga City Riverside Park: walk along the Naga River",
          "Evening — Dinner at a local Naga restaurant: Bicol Express, laing, and fresh Bicolano dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Caramoan Peninsula Island-Hopping",
        details: [
          "5:30 AM — Early departure by van to Sabang Port, Garchitorena (approximately 3 hours from Naga)",
          "8:30 AM — Bangka island-hopping: Manlawi Sandbar, Lahos Island, Matukad Island, and Cotivas Island",
          "12:30 PM — Picnic lunch on a sandbar island",
          "3:00 PM — Return bangka to Sabang Port",
          "4:00 PM — Van back to Naga City",
          "Evening — Rest and dinner in Naga",
        ],
      },
      {
        day: "Day 3",
        title: "Lake Buhi, CWC, and Departure",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — CamSur Watersports Complex, Pili: wakeboard cable session or leisure lakeside visit",
          "10:30 AM — Drive to Lake Buhi: scenic mountain lake; observe the local sinarapan fishing culture",
          "12:30 PM — Lunch in Naga",
          "2:00 PM — Naga market pasalubong: pili nuts, chili products, and Bicol native goods",
          "3:30 PM — Transfer to Naga Airport or bus terminal for departure",
        ],
      },
    ],
  },

  Camiguin: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Mambajao, Camiguin Island (via Cagayan de Oro City)",
    transport:
      "Fly from Manila to Laguindingan Airport, Cagayan de Oro (approximately 1.5 hours). Travel by van to Balingoan Port (approximately 1.5 hours), then take a 45-minute ferry to Benoni Port, Camiguin. Local transport by tricycle or habal-habal on the island.",
    bestFor: "Volcanic island adventure, heritage church ruins, hot spring and waterfall travelers, small group island escapes",
    costingNote:
      "Package rates are inquiry-based. Camiguin is a small island — most destinations can be covered in 2–3 days. Ferry schedules should be confirmed in advance.",
    supplierChecks: [
      "Balingoan–Benoni ferry schedule and confirmation",
      "Hotel or resort in Mambajao area",
      "Local tricycle or habal-habal guide for island circuit",
      "White Island sandbar boat hire",
      "Ardent Hot Springs entrance coordination",
    ],
    highlights: [
      "White Island — pristine uninhabited sandbar with Hibok-Hibok Volcano as backdrop",
      "Sunken Cemetery — submerged cemetery from the 1871 eruption, marked by a cross at sea",
      "Ardent Hot Springs — natural volcanic hot spring pools in the forest",
      "Katibawasan Falls — tall freshwater waterfall near Mambajao",
      "Old Camiguin Church Ruins — lava-covered remnants of a 17th-century church",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Cagayan de Oro to Camiguin — Island Arrival and Volcanic Ruins",
        details: [
          "Morning — Arrive at Laguindingan Airport; van to Balingoan Port (approximately 1.5 hours)",
          "Late morning — Ferry to Benoni Port, Camiguin (approximately 45 minutes)",
          "Noon — Tricycle transfer to Mambajao; check-in at resort",
          "2:00 PM — Old Camiguin Church Ruins: lava-submerged remains of the 17th-century parish church",
          "3:30 PM — Stations of the Cross Monument: hillside cross and statue complex with island panorama",
          "5:00 PM — Sunken Cemetery marker: view the offshore cross marking the lava-buried cemetery",
          "Evening — Dinner at a local Camiguin restaurant; fresh island seafood",
        ],
      },
      {
        day: "Day 2",
        title: "White Island, Ardent Hot Springs, and Katibawasan Falls",
        details: [
          "7:00 AM — Breakfast at the resort",
          "8:00 AM — Bangka to White Island: wade onto the sandbar with Hibok-Hibok Volcano in the background",
          "9:30 AM — Return to shore; travel to Katibawasan Falls — tall freshwater waterfall with natural pool",
          "11:30 AM — Santo Niño Cold Spring: natural cold spring pool under jungle canopy",
          "1:00 PM — Lunch in Mambajao",
          "2:30 PM — Ardent Hot Springs: soak in volcanic hot spring pools in a forested hillside setting",
          "5:00 PM — Return to accommodation",
          "Evening — Dinner and optional night market in Mambajao",
        ],
      },
      {
        day: "Day 3",
        title: "Mantigue Island and Departure",
        details: [
          "7:00 AM — Breakfast and check-out preparation",
          "8:30 AM — Bangka to Mantigue Island: small nature island with snorkeling and sea turtle sighting area",
          "10:30 AM — Return to Camiguin mainland",
          "11:30 AM — Pasalubong at Mambajao market: Camiguin lanzones, pastel, and dried seafood",
          "12:30 PM — Lunch before departure",
          "2:00 PM — Ferry from Benoni to Balingoan Port",
          "3:00 PM — Van to Laguindingan Airport for departure flight",
        ],
      },
    ],
  },

  Capiz: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Roxas City, Capiz (Roxas Airport)",
    transport:
      "Fly from Manila to Roxas Airport (approximately 1 hour) via Cebu Pacific or direct charter. Or travel via bus from Iloilo City to Roxas City (approximately 3 hours).",
    bestFor: "Seafood gastronomy travelers, heritage church routes, island day trips, family groups paired with Iloilo",
    costingNote:
      "Package rates are inquiry-based. Capiz is often paired with Iloilo as a Western Visayas combined route.",
    supplierChecks: [
      "Hotel in Roxas City",
      "Seafood restaurant reservation at Roxas City waterfront",
      "Olotayan Island boat hire",
      "Capiz shell workshop access",
      "Pueblo de Panay heritage site guide",
    ],
    highlights: [
      "Roxas City Seafood Boulevard — fresh and affordable shellfish along the waterfront",
      "Olotayan Island — quiet island day trip off the Roxas coast",
      "Capiz shell craft industry — the province's signature decorative product",
      "Roxas Cathedral (St. Anthony de Padua Parish) — heritage church in the city center",
      "Pueblo de Panay — one of Panay's oldest settlement areas near Roxas",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Roxas City — Seafood Capital Introduction",
        details: [
          "Morning — Arrive at Roxas Airport; transfer to hotel",
          "Afternoon — Check-in; rest and freshen up",
          "3:00 PM — Roxas City heritage walk: St. Anthony de Padua Cathedral, City Hall, and Baybay Beach promenade",
          "5:00 PM — Capiz Provincial Capitol grounds and Panay River bank views",
          "Evening — Dinner at the Roxas City Seafood Boulevard: fresh oysters, scallops, and shellfish at waterfront stalls",
        ],
      },
      {
        day: "Day 2",
        title: "Olotayan Island Day Trip and Capiz Shell Heritage",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Transfer to port for bangka to Olotayan Island (approximately 45 minutes)",
          "9:30 AM — Olotayan Island: swimming, snorkeling, and island beach rest",
          "12:30 PM — Packed lunch on the island or return to mainland for lunch",
          "2:30 PM — Return to Roxas City",
          "3:30 PM — Capiz shell workshop: observe how capiz shells are processed into decorative crafts and lighting panels",
          "Evening — Free evening at Roxas waterfront",
        ],
      },
      {
        day: "Day 3",
        title: "Pueblo de Panay and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Pueblo de Panay heritage community: one of Panay's oldest settlement sites with ancestral homes",
          "10:30 AM — Roxas City public market: capiz shell products, dried seafood, and local sweets",
          "12:00 PM — Lunch before departure",
          "1:30 PM — Transfer to Roxas Airport for return flight to Manila",
        ],
      },
    ],
  },

  Catanduanes: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Virac, Catanduanes (Virac Airport)",
    transport:
      "Direct flight from Manila to Virac Airport (approximately 1 hour) via Cebu Pacific or SkyJet. Or ferry from Tabaco, Albay to Virac (approximately 3.5 hours). Local transfers by tricycle within the island.",
    bestFor: "Surf and wave travelers, natural landscape seekers, quiet island escapes, coastal heritage visitors",
    costingNote:
      "Package rates are inquiry-based. Catanduanes is known for strong waves; surfing is season-dependent (best October–March).",
    supplierChecks: [
      "Hotel or surf lodge in Virac or Puraran",
      "Surfboard rental and surf guide at Puraran Beach",
      "Tricycle or van hire for island circuit",
      "Bato Church access coordination",
    ],
    highlights: [
      "Puraran Beach — world-class surfing waves known as 'Majestics,' Catanduanes' surf mecca",
      "Binurong Point — dramatic cliff viewpoint overlooking the Pacific Ocean",
      "Twin Rock Beach — iconic twin volcanic rock formations offshore near Virac",
      "Bato Church — well-preserved 18th-century Spanish colonial parish church",
      "Maribina Falls — accessible island waterfall near Virac",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Virac — Island Heritage and Beach Orientation",
        details: [
          "Morning — Arrive at Virac Airport; transfer to hotel",
          "Afternoon — Check-in; rest and explore Virac town center",
          "3:00 PM — Bato Church: 18th-century heritage church with thick volcanic stone walls",
          "4:30 PM — Twin Rock Beach: late afternoon swim and photo stop at the iconic twin rock formations",
          "Evening — Dinner in Virac featuring local Catandunganon cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Puraran Beach Surf Day and Binurong Point",
        details: [
          "7:00 AM — Breakfast and early departure toward Puraran",
          "8:30 AM — Arrive at Puraran Beach (approximately 1.5 hours from Virac): 'Majestics' surf break; surfboard rental and local guide",
          "Morning — Surf session or observation of the powerful Pacific swells",
          "12:00 PM — Lunch at a Puraran Beach carinderia",
          "1:30 PM — Binurong Point: cliffside viewpoint with panoramic views of the Pacific coast",
          "3:30 PM — Return journey to Virac",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Maribina Falls and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Maribina Falls: accessible island waterfall with a natural pool",
          "10:30 AM — Virac public market: local crafts, dried fish, and Catanduanes pasalubong",
          "12:00 PM — Lunch in Virac before departure",
          "1:30 PM — Transfer to Virac Airport for return flight to Manila",
        ],
      },
    ],
  },

  Cavite: {
    duration: "2 Days / 1 Night",
    gatewayBase: "Kawit / Cavite City, Cavite (via Manila or Coastal Road)",
    transport:
      "Bus from Manila (Pasay or Lawton) via Cavite route (approximately 1.5–2 hours). Private car via Coastal Road or CAVITEX to Kawit and Cavite City.",
    bestFor: "Philippine Revolution heritage, historical families, school and civic tours, day trip or short overnight groups",
    costingNote:
      "Package rates are inquiry-based. Most Cavite heritage sites are accessible within a 1–2 day circuit from Metro Manila.",
    supplierChecks: [
      "Aguinaldo Shrine, Kawit — National Historical Commission visit coordination",
      "Fort San Felipe heritage access and local guide",
      "Hotel in Tagaytay or Cavite City if overnight stay",
      "San Roque Parish Church guide coordination",
    ],
    highlights: [
      "Aguinaldo Shrine, Kawit — site of the first raising of the Philippine Flag on June 12, 1898",
      "Fort San Felipe, Cavite City — Spanish fortress and Philippine naval heritage landmark",
      "San Roque Parish, Cavite City — colonial heritage church on the old coastal peninsula",
      "Maragondon Church — heritage church in Cavite's interior highlands",
      "Tagaytay Ridge — highland dining and Taal Lake views on the Cavite-Batangas border",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Kawit to Cavite City — Philippine Independence Heritage",
        details: [
          "8:00 AM — Depart Manila by bus or private car",
          "10:00 AM — Aguinaldo Shrine, Kawit: ancestral home of Gen. Emilio Aguinaldo where Philippine Independence was declared on June 12, 1898; museum tour and balcony viewing",
          "12:00 PM — Lunch in Kawit or travel to Cavite City",
          "1:30 PM — Fort San Felipe, Cavite City: Spanish-era fortification and naval heritage landmark",
          "2:30 PM — San Roque Parish Church: Cavite's heritage coastal church on the old Cavite peninsula",
          "4:00 PM — Cavite City seafront promenade: Sangley Point views and Manila Bay outlook",
          "Evening — Dinner in Cavite City; overnight at Tagaytay or Cavite area hotel",
        ],
      },
      {
        day: "Day 2",
        title: "Maragondon, Tagaytay Views, and Departure",
        details: [
          "7:30 AM — Breakfast and check-out",
          "9:00 AM — Maragondon Church: interior Cavite heritage church and town plaza",
          "11:00 AM — Drive to Tagaytay Ridge: panoramic views of Taal Lake and Taal Volcano",
          "12:30 PM — Lunch at a Tagaytay restaurant: bulalo soup and highland dishes",
          "2:00 PM — Return to Manila via Tagaytay-Nasugbu highway or SLEX",
        ],
      },
    ],
  },

  Cebu: {
    duration: "4 Days / 3 Nights",
    gatewayBase: "Cebu City, Cebu (Mactan-Cebu International Airport)",
    transport:
      "Direct flights from Manila and other Philippine cities to Mactan-Cebu International Airport (approximately 1.5 hours from Manila). Cebu City accessible from Mactan via bridge and taxi. Inter-province travel by hired van.",
    bestFor: "Heritage city explorers, culinary travelers, island beach groups, marine encounters, family and heritage groups",
    costingNote:
      "Package rates are inquiry-based. Oslob whale shark interaction involves a separate conservation fee and is subject to operating conditions, local regulations, and weather. Island-hopping and Kawasan Falls tour timings depend on road and traffic conditions.",
    supplierChecks: [
      "Hotel in Cebu City or Mactan Island",
      "Whale shark interaction guide at Oslob — BFAR conservation guidelines apply; activity subject to operating conditions",
      "Island-hopping boat hire at Mactan or Olango",
      "Heritage guide for colonial Cebu City circuit",
      "Transport van for southern Cebu day tour",
    ],
    highlights: [
      "Magellan's Cross — 16th-century Christian heritage landmark in the heart of Cebu City",
      "Basilica Minore del Santo Niño — oldest Roman Catholic church in the Philippines",
      "Fort San Pedro — Spanish colonial triangular fort overlooking Cebu Harbor",
      "Casa Gorordo Museum — restored 19th-century Cebuano ancestral house",
      "Oslob Whale Shark Interaction — guided shallow-water activity subject to conservation rules and operating conditions",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Cebu City — Colonial Heritage Circuit",
        details: [
          "Morning — Arrive at Mactan-Cebu International Airport; transfer to Cebu City hotel",
          "Afternoon — Check-in and rest",
          "2:00 PM — Magellan's Cross and Cebu Metropolitan Cathedral: founding Christian landmarks of Cebu",
          "3:00 PM — Basilica Minore del Santo Niño: oldest Catholic church in the Philippines and its museum",
          "4:00 PM — Fort San Pedro: Spanish colonial fort and heritage gardens",
          "5:00 PM — Casa Gorordo Museum: 19th-century ancestral house turned cultural museum",
          "Evening — Dinner at a Cebu City heritage district restaurant; optional Colon Street heritage walk",
        ],
      },
      {
        day: "Day 2",
        title: "Taoist Temple, Tops Lookout, and Carcar Heritage Town",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Taoist Temple, Beverly Hills: Chinese Filipino heritage and hilltop city views",
          "10:00 AM — Tops Lookout, Busay: panoramic Cebu City skyline and strait view",
          "12:00 PM — Drive south to Carcar City (approximately 1.5 hours from Cebu City)",
          "1:00 PM — Carcar heritage church (Sto. Tomas de Villanueva Parish) and heritage street facades",
          "2:00 PM — Carcar chicharon and market: Cebu's famous fried pork rind and street food",
          "4:00 PM — Taboan Market, Cebu City (Pasil area): dried mangoes, otap, danggit, and Cebuano pasalubong on the return drive",
          "Evening — Dinner in Cebu City",
        ],
      },
      {
        day: "Day 3",
        title: "Oslob Whale Shark and Kawasan Falls",
        details: [
          "4:30 AM — Pre-dawn departure by van to Oslob (approximately 3.5 hours)",
          "8:00 AM — Oslob Whale Shark Interaction: guided shallow-water activity following BFAR conservation guidelines; subject to weather, operating conditions, and local regulations — participation cannot be guaranteed in advance",
          "10:00 AM — Travel continues south through Oslob and across southern Cebu toward Badian; timing depends on road and traffic conditions",
          "Kawasan Falls, Badian: turquoise multi-tiered waterfall; swim in the natural pool",
          "Packed lunch near the falls",
          "Afternoon — Return journey to Cebu City",
          "Evening — Dinner in Cebu City; rest before departure day",
        ],
      },
      {
        day: "Day 4",
        title: "Mactan Heritage Complex and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Mactan Heritage Complex: Lapu-Lapu Monument and the adjacent Magellan Marker, commemorating the 1521 Battle of Mactan",
          "10:00 AM — Lunch near Mactan",
          "11:30 AM — Transfer to Mactan-Cebu International Airport for departure flight",
        ],
      },
    ],
  },

  Cotabato: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Kidapawan City, North Cotabato (via General Santos or Davao City)",
    transport:
      "Fly from Manila to General Santos International Airport (approximately 2 hours) or Davao International Airport, then travel by van to Kidapawan City (approximately 2–3 hours).",
    bestFor: "Mt. Apo foothill visitors, geothermal area explorers, highland cultural encounters, nature heritage groups",
    costingNote:
      "Package rates are inquiry-based. Mt. Apo summit trekking is a separate multi-day program requiring DENR permits, registered guides, fitness preparation, and weather assessment — it is not part of this standard itinerary. Lake Agco and Mandarangan area day visits require a local guide and DENR coordination.",
    supplierChecks: [
      "Hotel in Kidapawan City",
      "DENR permit for Mt. Apo foothills area access",
      "Local accredited day tour guide",
      "Mandarangan Geothermal Springs access coordination",
      "GenSan or Davao–Kidapawan van transfer",
    ],
    highlights: [
      "Mt. Apo National Park — the Philippines' highest peak (2,954 m) and a protected biodiversity zone",
      "Lake Agco — geothermal feature at the Mt. Apo foothills with boiling pools, sulfuric steam, and forested surroundings",
      "Mandarangan Geothermal Springs — natural hot spring pools in the Mt. Apo forest",
      "Mandarangan Trail foothills — forest trail orientation at the edge of the national park",
      "Arakan Valley — highland agricultural valley with Manobo community heritage",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kidapawan — Mt. Apo Highland Orientation",
        details: [
          "Morning — Arrive at General Santos or Davao Airport; van transfer to Kidapawan City (approximately 2–3 hours)",
          "Afternoon — Check-in at hotel; orientation with local guide on Mt. Apo national park access and safety",
          "3:30 PM — Kidapawan City walk: city plaza and Cotabato highland town orientation",
          "Evening — Dinner at a local Kidapawan restaurant; briefing on next day's highland route",
        ],
      },
      {
        day: "Day 2",
        title: "Lake Agco Geothermal Area and Mandarangan Springs",
        details: [
          "6:30 AM — Breakfast and early departure toward Mt. Apo foothills (approximately 1.5 hours from Kidapawan)",
          "8:00 AM — Lake Agco: geothermal feature at the base of Mt. Apo; observe bubbling pools, sulfuric steam vents, and mud-spa sections from designated safe areas; forested highland scenery surrounds the site",
          "9:30 AM — Mandarangan Geothermal Springs: natural hot spring pools in the forest; soak and rest",
          "11:00 AM — Mandarangan Trail foothills orientation: day-use forest walk at the edge of the national park (full Mt. Apo summit route is a separate multi-day program requiring advance permits, registered guides, and fitness assessment)",
          "12:30 PM — Packed lunch at foothills rest area",
          "2:00 PM — Return to Kidapawan City",
          "3:30 PM — Kidapawan City afternoon: public market or People's Park leisure stop",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Arakan Valley Cultural Visit and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Arakan Valley drive: highland agricultural valley with views of the Mt. Apo range; Manobo community areas in the valley (community encounters are subject to prior coordination with local guides and community representatives)",
          "10:30 AM — Arakan town market: local highland produce and cultural goods",
          "12:00 PM — Lunch in Kidapawan before departure",
          "1:30 PM — Depart by van to General Santos or Davao Airport for return flight",
        ],
      },
    ],
  },

  "Davao Occidental": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Malita, Davao Occidental (via General Santos City or Davao City)",
    transport:
      "Fly from Manila to General Santos International Airport (approximately 2 hours) or Davao International Airport, then travel by van to Malita (approximately 4 hours from General Santos or 5 hours from Davao City). Southern Davao roads require a sturdy vehicle.",
    bestFor: "Remote coastal Mindanao travelers, indigenous cultural encounters, off-grid provincial journeys, small adventurous groups",
    costingNote:
      "Package rates are inquiry-based. Davao Occidental is among the more remote provinces in Mindanao; logistics require close coordination with local operators and registered guides.",
    supplierChecks: [
      "Accommodation in Malita or Don Marcelino",
      "Local guide familiar with B'laan and Bagobo-Tagabawa community areas",
      "GenSan or Davao–Malita van transfer coordination",
      "Malita local tourism office coordination",
    ],
    highlights: [
      "Malalag Bay coastal scenery — remote southern Mindanao shoreline",
      "B'laan and Bagobo-Tagabawa indigenous heritage — southern Davao tribal communities",
      "Malita town center — quiet provincial capital on the Pacific corridor",
      "Coastal fishing villages — traditional fishing life along the Davao Occidental shore",
      "Don Marcelino municipality — southernmost coastal township with jungle-edge scenery",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "General Santos to Malita — Southern Frontier Arrival",
        details: [
          "Morning — Arrive at General Santos Airport; travel by van to Malita (approximately 4 hours through southern Davao roads)",
          "Afternoon — Arrive in Malita; check-in at lodging; rest and freshen up",
          "Late afternoon — Malita town orientation: provincial capitol grounds, coastal promenade, and Malalag Bay views",
          "Evening — Dinner at a local Malita eatery featuring southern Mindanao regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Coastal Heritage and Indigenous Cultural Encounter",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:30 AM — Coastal fishing village visit: observe traditional fishing life and boat-building along the Davao Occidental shore",
          "10:30 AM — B'laan or Bagobo-Tagabawa community visit (subject to prior coordination with local guide and community representatives): traditional weaving, oral heritage, and highland-to-coast cultural identity",
          "12:30 PM — Lunch in community area or return to Malita",
          "2:30 PM — Don Marcelino coastal drive: southern municipal road views toward the jungle-edged Pacific corridor",
          "5:00 PM — Return to Malita",
          "Evening — Dinner and relaxed evening in Malita",
        ],
      },
      {
        day: "Day 3",
        title: "Malita Market and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Malita public market: local produce, crafts, and southern Davao regional goods",
          "10:00 AM — Final bay walk or town plaza stop",
          "11:00 AM — Depart by van to General Santos or Davao City for departure flight",
        ],
      },
    ],
  },

  "Davao Oriental": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Mati City, Davao Oriental (via Davao City)",
    transport:
      "Fly from Manila to Francisco Bangoy International Airport, Davao City (approximately 2 hours), then travel by van to Mati City (approximately 3 hours via the Davao–Mati highway).",
    bestFor: "Pacific coastline travelers, surfers and kiteboarders, waterfall seekers, Mandaya cultural heritage, nature groups",
    costingNote:
      "Package rates are inquiry-based. Aliwagwag Falls access and Dahican watersports conditions are weather-dependent and should be confirmed with local operators in advance.",
    supplierChecks: [
      "Hotel in Mati City",
      "Dahican surfboard or kitesurfing rental coordination",
      "Local guide for Aliwagwag Falls trekking",
      "Davao City–Mati City van transfer booking",
      "Mandaya community guide coordination if cultural visit is included",
    ],
    highlights: [
      "Dahican Beach — Davao Oriental's Pacific surf and kitesurf destination along a long black sand shore",
      "Aliwagwag Falls — staircase cascade of up to 84 drops through forest; one of the tallest in the Philippines",
      "Pujada Bay — sheltered bay with island views near Mati City",
      "Cape San Agustin — forested headland on Davao Oriental's southern tip",
      "Mandaya indigenous heritage — traditional dagmay weaving and coastal-highland tribal culture",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Davao City to Mati — Pacific Coast Arrival",
        details: [
          "Morning — Arrive at Davao International Airport; van transfer to Mati City (approximately 3 hours)",
          "Afternoon — Check-in in Mati City; rest and freshen up",
          "3:30 PM — Pujada Bay overlook: views of the sheltered bay and island formations near the city",
          "5:00 PM — Mati City walk: city plaza, seaside area, and local market orientation",
          "Evening — Dinner at a Mati restaurant featuring Davao Oriental seafood and regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Dahican Beach and Aliwagwag Falls",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:00 AM — Dahican Beach: long Pacific-facing black sand shore; surfing, kitesurfing, or beach relaxation (board rental available locally; conditions vary seasonally)",
          "11:30 AM — Rest and freshen up",
          "1:00 PM — Lunch in Mati City or Dahican area",
          "2:30 PM — Depart toward Cateel for Aliwagwag Falls (approximately 1.5 hours from Mati City)",
          "4:00 PM — Aliwagwag Falls: guided approach to the staircase cascades through forest; swimming in the lower pool",
          "6:00 PM — Return to Mati City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Mandaya Cultural Heritage and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Mandaya community weaving visit in the Mati area (subject to prior guide and community coordination): observe traditional dagmay fiber weaving and tribal cultural heritage",
          "10:30 AM — Cape San Agustin coastal drive: scenic road toward the southern forested headland",
          "12:00 PM — Lunch in Mati City before departure",
          "1:30 PM — Depart by van to Davao City; transfer to airport for return flight",
        ],
      },
    ],
  },

  "Davao de Oro": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Nabunturan, Davao de Oro (via Davao City or Tagum City)",
    transport:
      "Fly from Manila to Francisco Bangoy International Airport, Davao City (approximately 2 hours), then travel by van to Nabunturan via Tagum City (approximately 2 hours). Some interior routes within the province require a sturdy vehicle.",
    bestFor: "Geothermal hot spring seekers, highland agricultural landscape travelers, Mandaya tribal heritage, off-grid Mindanao interior routes",
    costingNote:
      "Package rates are inquiry-based. Davao de Oro is a highland interior province; Maragusan ecotourism and community visits require advance coordination with local guides.",
    supplierChecks: [
      "Hotel or lodging in Nabunturan",
      "Mainit Hot Springs access coordination",
      "Maragusan ecotourism guide booking",
      "Local Mandaya community guide if cultural encounter is included",
      "Davao–Nabunturan van transfer",
    ],
    highlights: [
      "Mainit Hot Springs — geothermal hot spring pools in the Nabunturan highland forest",
      "Maragusan ecotourism area — highland community with forest trails and river scenery",
      "Mandaya tribal heritage — traditional dagmay weaving and upland cultural identity",
      "Nabunturan town center — capital of the former Compostela Valley province",
      "Highland agricultural valley scenery — plantation landscape and river basin views",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Davao City to Nabunturan — Highland Valley Arrival",
        details: [
          "Morning — Arrive at Davao International Airport; van transfer via Tagum City to Nabunturan (approximately 2 hours)",
          "Afternoon — Check-in at lodging; rest and freshen up",
          "3:30 PM — Nabunturan town center: provincial capitol, plaza, and highland valley orientation",
          "Evening — Dinner at a local eatery; introduction to the province's highland regional character",
        ],
      },
      {
        day: "Day 2",
        title: "Mainit Hot Springs and Maragusan Highlands",
        details: [
          "7:00 AM — Breakfast at the lodging",
          "8:30 AM — Mainit Hot Springs, Nabunturan: geothermal hot spring pools in a forested highland setting; soak and relax",
          "10:30 AM — Travel toward Maragusan (approximately 1.5 hours from Nabunturan)",
          "12:00 PM — Lunch in Maragusan town",
          "1:30 PM — Maragusan ecotourism area: highland river scenery, forest trail orientation, and local community visit (subject to advance guide coordination)",
          "4:00 PM — Return to Nabunturan",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Mandaya Heritage Visit and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Mandaya community weaving visit near Nabunturan or New Bataan area (subject to prior guide and community coordination): traditional dagmay cloth weaving introduction",
          "10:30 AM — Nabunturan public market: local highland produce and crafts",
          "12:00 PM — Lunch before departure",
          "1:00 PM — Depart by van via Tagum City to Davao International Airport for return flight",
        ],
      },
    ],
  },

  "Davao del Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Tagum City, Davao del Norte (via Davao City)",
    transport:
      "Fly from Manila to Francisco Bangoy International Airport, Davao City (approximately 2 hours), then travel by van or bus to Tagum City (approximately 1 hour via the Davao–Tagum highway).",
    bestFor: "Agricultural heritage travelers, plantation landscape and food-trail groups, nature seekers, families exploring northern Davao region",
    costingNote:
      "Package rates are inquiry-based. Hijo Plantation Resort visits require advance booking confirmation.",
    supplierChecks: [
      "Hotel in Tagum City",
      "Hijo Plantation Resort or equivalent coordination in Madaum, Tagum",
      "Davao–Tagum City van transfer",
      "Local guide for agricultural belt and township route",
    ],
    highlights: [
      "Hijo Plantation Resort, Tagum — heritage agri-resort in a riverside banana plantation setting in Madaum",
      "Banana and pineapple plantation belt — Davao del Norte's agricultural heartland",
      "Tagum City parks and cultural center — the commercial hub of northern Davao region",
      "Asuncion Valley scenic drive — inland highland valley and agricultural landscape",
      "Carmen and Kapalong township routes — provincial community travel through the interior",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Davao City to Tagum — Agricultural Heartland Arrival",
        details: [
          "Morning — Arrive at Davao International Airport; van transfer to Tagum City (approximately 1 hour)",
          "Noon — Check-in at hotel in Tagum City",
          "Afternoon — Tagum City orientation: People's Park, Tagum City Hall area, and Tagum Riverwalk",
          "3:30 PM — Hijo Plantation Resort area, Madaum: riverside banana plantation heritage resort; afternoon grounds walk",
          "Evening — Dinner in Tagum City featuring Davao regional cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Plantation Belt and Asuncion Valley",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Banana and pineapple plantation drive: Carmen and Asuncion township belt; views of the agricultural landscape that defines Davao del Norte's regional identity",
          "10:30 AM — Asuncion Valley scenic drive: highland valley views and upland community road",
          "12:30 PM — Lunch in Asuncion or Kapalong town",
          "2:30 PM — Kapalong township: local market and mountain foothills scenery",
          "4:30 PM — Return to Tagum City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Tagum City Market and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Tagum City public market: local Davao del Norte produce, regional fruits, and agricultural goods",
          "10:00 AM — Tagum City heritage church and city center final walk",
          "11:30 AM — Depart by van to Davao International Airport for return flight",
        ],
      },
    ],
  },

  "Davao del Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Digos City, Davao del Sur (via Davao City)",
    transport:
      "Fly from Manila to Francisco Bangoy International Airport, Davao City (approximately 2 hours), then travel by van south to Digos City (approximately 1 hour via the Davao–General Santos highway).",
    bestFor: "Mt. Apo foothills travelers, waterfall seekers, coastal agricultural landscape groups, families combining Davao City with southern Davao",
    costingNote:
      "Package rates are inquiry-based. Mt. Apo trekking from the Davao del Sur side is a separate multi-day program requiring DENR permits, registered guides, and advance fitness assessment — it is not part of this standard itinerary.",
    supplierChecks: [
      "Hotel in Digos City",
      "Local guide for Tudaya Falls, Santa Cruz",
      "Davao City–Digos City van transfer",
      "Santa Cruz or Bansalan highland access coordination",
    ],
    highlights: [
      "Tudaya Falls, Santa Cruz — scenic multi-tiered waterfall near the Mt. Apo foothills",
      "Digos City coastal area — Gulf of Davao shoreline and fishing village views",
      "Mt. Apo southern view — distant profile of the Philippines' highest peak from Davao del Sur",
      "Bansalan highland plateau — agricultural uplands and coffee-growing area",
      "Davao Gulf coastal drive — provincial coast through Santa Cruz and fishing communities",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Davao City to Digos City — Southern Davao Arrival",
        details: [
          "Morning — Arrive at Davao International Airport; van transfer south to Digos City (approximately 1 hour)",
          "Noon — Check-in at hotel; rest and freshen up",
          "Afternoon — Digos City orientation: city plaza, Señor Divino Tesoro Parish Church, and Gulf of Davao waterfront area",
          "Evening — Dinner at a local Digos restaurant featuring southern Davao regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Tudaya Falls and Mt. Apo Foothills Drive",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Drive to Santa Cruz, Davao del Sur (approximately 45 minutes from Digos City)",
          "9:30 AM — Tudaya Falls, Santa Cruz: guided trek to the multi-tiered waterfall in the Mt. Apo foothills; swim in the natural pool",
          "12:00 PM — Packed lunch at the falls area or return to Santa Cruz for lunch",
          "2:00 PM — Mt. Apo foothills drive: Bansalan agricultural highland plateau and views of the southern slope",
          "4:30 PM — Return to Digos City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Davao Gulf Coast and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Davao Gulf coastal drive: Digos shoreline and fishing village views along the gulf",
          "10:00 AM — Digos City public market: local produce, durian, and Davao del Sur regional goods",
          "11:30 AM — Lunch before departure",
          "12:30 PM — Depart by van north to Davao International Airport for return flight",
        ],
      },
    ],
  },

  "Dinagat Islands": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "San Jose, Dinagat Island (via Surigao City, Surigao del Norte)",
    transport:
      "Fly from Manila to Surigao Airport (approximately 2 hours), then take a ferry or fastcraft from Surigao City Port to Dinagat Islands (approximately 1–2 hours depending on vessel type and port of entry). Island transport by tricycle or habal-habal.",
    bestFor: "Remote island karst explorers, cave and coastal geology seekers, off-grid Caraga travel, small adventurous groups",
    costingNote:
      "Package rates are inquiry-based. Dinagat Islands is one of the more remote island provinces; ferry schedules are weather-dependent and require advance confirmation. Cave visits require local guide coordination.",
    supplierChecks: [
      "Surigao City–Dinagat Islands ferry schedule and booking",
      "Accommodation in San Jose or accredited guesthouse",
      "Local guide for Cabocboc Cave and island routes",
      "Tricycle or habal-habal hire on Dinagat Island",
      "Surigao Airport–port transfer coordination",
    ],
    highlights: [
      "Cabocboc Cave, Loreto — limestone cave with crystal formations on Dinagat Island",
      "Dinagat Islands karst seascape — dramatic limestone cliffs and coastal rock formations",
      "San Jose coastal views — quiet provincial capital with island bay scenery",
      "Island fishing communities — remote island life and maritime heritage of Caraga",
      "Basilisa municipality — southern Dinagat Island township with coastal access",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Surigao City to Dinagat — Island Frontier Arrival",
        details: [
          "Morning — Arrive at Surigao Airport; transfer to Surigao City Port",
          "Late morning — Ferry or fastcraft to Dinagat Islands (weather-dependent; approximately 1–2 hours)",
          "Afternoon — Arrive at San Jose; check-in at guesthouse; rest and orient",
          "Late afternoon — San Jose coastal walk: provincial capitol area, bay views, and fishing community",
          "Evening — Dinner featuring Caraga island seafood",
        ],
      },
      {
        day: "Day 2",
        title: "Cabocboc Cave and Island Karst Seascape",
        details: [
          "7:00 AM — Breakfast at the guesthouse",
          "8:30 AM — Travel to Loreto municipality (by local transport; approximately 1 hour from San Jose)",
          "9:30 AM — Cabocboc Cave: guided tour of the limestone cave with crystal stalactite and stalagmite formations",
          "11:30 AM — Dinagat Island karst coastal walk: dramatic limestone cliffs and rock formations along the shoreline",
          "1:00 PM — Packed lunch in Loreto area",
          "3:00 PM — Return to San Jose",
          "4:30 PM — Basilisa municipality coastal drive if time permits: southern island fishing township and sea views",
          "Evening — Dinner and rest in San Jose",
        ],
      },
      {
        day: "Day 3",
        title: "Island Morning and Return to Surigao",
        details: [
          "7:00 AM — Breakfast and check-out preparation",
          "8:30 AM — San Jose market: local island crafts and seafood products",
          "10:00 AM — Ferry or fastcraft return to Surigao City Port (subject to schedule and weather conditions)",
          "Noon — Arrive in Surigao City; transfer to Surigao Airport for departure flight",
        ],
      },
    ],
  },

  "Eastern Samar": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Borongan City, Eastern Samar (via Tacloban City, Leyte)",
    transport:
      "Fly from Manila to Tacloban Daniel Z. Romualdez Airport (approximately 1.5 hours), then travel by van or bus to Borongan City (approximately 3–4 hours via the Eastern Samar road). Alternatively, fly to Catarman, Northern Samar and travel south.",
    bestFor: "Surf and Pacific coastline travelers, Pacific War heritage, island history seekers, remote Eastern Visayas routes",
    costingNote:
      "Package rates are inquiry-based. Calicoan Island surf conditions are weather and season dependent. Homonhon Island access requires boat hire and weather clearance.",
    supplierChecks: [
      "Hotel or pension house in Borongan City",
      "Calicoan Island surfboard rental and local surf guide",
      "Boat hire to Homonhon Island (weather-dependent)",
      "Tacloban–Borongan van or bus transfer",
      "Guiuan municipal tourism coordination for heritage sites",
    ],
    highlights: [
      "Calicoan Island, Guiuan — Eastern Samar's surf destination with Pacific-facing beach breaks",
      "Homonhon Island — site of Ferdinand Magellan's first recorded landing in the Philippines, March 1521",
      "Guiuan's historic parish church and town plaza — Spanish heritage and Pacific War significance",
      "Lulugayan Falls — accessible waterfall near Borongan City",
      "Borongan City Pacific coastline — raw eastern coast facing the open Pacific Ocean",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Tacloban to Borongan — Pacific Coast Arrival",
        details: [
          "Morning — Arrive in Tacloban; van transfer to Borongan City (approximately 3–4 hours through Eastern Samar roads)",
          "Afternoon — Arrive in Borongan City; check-in at hotel or pension house",
          "4:00 PM — Borongan City coastal walk: Pacific-facing shoreline and city plaza orientation",
          "Evening — Dinner at a local Borongan restaurant featuring Eastern Samar seafood",
        ],
      },
      {
        day: "Day 2",
        title: "Calicoan Island Surf and Guiuan Heritage",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:00 AM — Travel south to Guiuan (approximately 1.5 hours from Borongan City)",
          "9:30 AM — Guiuan heritage: historic parish church and town plaza; brief WWII Pacific base heritage orientation",
          "11:00 AM — Calicoan Island: short bridge crossing to Calicoan; surf break with board rental and local guide available (conditions vary seasonally)",
          "1:00 PM — Lunch at a beachside carinderia in Calicoan or Guiuan",
          "3:00 PM — Homonhon Island boat departure (if weather and sea conditions allow): site of Ferdinand Magellan's first recorded landing in the Philippines in March 1521; historical marker and coastal scenery",
          "5:00 PM — Return to Guiuan; drive back toward Borongan City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Lulugayan Falls and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Lulugayan Falls, Borongan area: accessible waterfall with a natural pool",
          "10:30 AM — Borongan City public market: local crafts and Eastern Samar pasalubong",
          "12:00 PM — Lunch in Borongan before departure",
          "1:30 PM — Van or bus back to Tacloban (approximately 3–4 hours)",
          "Late afternoon — Arrive at Tacloban Airport for departure flight",
        ],
      },
    ],
  },

  Guimaras: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Jordan, Guimaras (via Iloillo City, Iloilo)",
    transport:
      "Fly from Manila to Iloilo International Airport (approximately 1.5 hours). Take a short motorboat from Ortiz Wharf, Iloilo City to Buenavista or Jordan, Guimaras (approximately 15–20 minutes). Local transport by tricycle or motorcycle-for-hire on the island.",
    bestFor: "Mango heritage travelers, island monastery culture, marine sanctuary seekers, Western Visayas island-hopping groups",
    costingNote:
      "Package rates are inquiry-based. Guimaras is a small island province easily combined with Iloilo. Boat transfers and marine sanctuary visits are weather-dependent.",
    supplierChecks: [
      "Iloilo–Guimaras pump boat or motorboat booking",
      "Accommodation in Buenavista, Jordan, or accredited island resort",
      "Trappist Monastery visit schedule confirmation",
      "Baras Sand Bar boat hire",
      "Local tricycle guide for island circuit",
    ],
    highlights: [
      "Guimaras mangoes — among the sweetest mangoes in the world, cultivated across the island",
      "Our Lady of the Philippines Trappist Monastery — contemplative monastery with mango preserves and peaceful grounds",
      "Navalas Church ruins — centuries-old coral-stone chapel on the island's north coast",
      "Baras Sand Bar — white sand islet accessible by bangka near Jordan",
      "Taklong Island National Marine Reserve — marine sanctuary and snorkeling area",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Iloilo City to Guimaras — Island Arrival and Mango Welcome",
        details: [
          "Morning — Fly to Iloilo; transfer to Ortiz Wharf",
          "Pump boat crossing to Jordan or Buenavista, Guimaras (approximately 15–20 minutes)",
          "Late morning — Check-in at island accommodation; freshen up",
          "Afternoon — Jordan municipal tour: provincial capitol grounds, Buenavista ridge views, and Jordan strait scenery",
          "3:30 PM — Our Lady of the Philippines Trappist Monastery: quiet contemplative grounds; purchase Trappist mango jam and local monastery products",
          "Evening — Dinner featuring Guimaras seafood and mango-based dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Baras Sand Bar, Navalas Ruins, and Marine Sanctuary",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:30 AM — Bangka to Baras Sand Bar: white sand islet near Jordan; snorkeling in the surrounding reef",
          "10:30 AM — Return to mainland; drive north to Navalas",
          "11:00 AM — Navalas Church ruins: centuries-old coral-stone chapel remnants on the island's north coast",
          "12:30 PM — Lunch in Navalas or return to Jordan for lunch",
          "2:00 PM — Taklong Island National Marine Reserve: snorkeling at the protected marine area (access subject to weather and park conditions)",
          "5:00 PM — Return to accommodation",
          "Evening — Mango dessert and island dinner",
        ],
      },
      {
        day: "Day 3",
        title: "Mango Orchard and Return to Iloilo",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Guimaras mango orchard visit: see the famed Guimaras mango trees and learn about the harvest culture (season-dependent)",
          "10:30 AM — Island market and pasalubong: fresh mangoes, mango preserves, dried mango products, and local Guimaras crafts",
          "12:00 PM — Lunch before departure",
          "1:00 PM — Pump boat return to Ortiz Wharf, Iloilo City",
          "Transfer to Iloilo International Airport for return flight",
        ],
      },
    ],
  },

  Ifugao: {
    duration: "4 Days / 3 Nights",
    gatewayBase: "Banaue, Ifugao (via Manila overnight bus or Cauayan/Tuguegarao flight connection)",
    transport:
      "Overnight bus from Manila to Banaue (approximately 9–10 hours via Coda Lines, Florida Bus, or similar carriers departing Cubao or Sampaloc terminals). Alternatively, fly to Cauayan, Isabela or Tuguegarao, then travel by van toward Banaue via Nueva Vizcaya (approximately 4–5 hours). Batad requires a jeepney ride plus a 30–45 minute trek from the saddle point.",
    bestFor: "UNESCO heritage landscape travelers, highland Ifugao cultural encounters, rice terrace trekking, photography groups, slow travel enthusiasts",
    costingNote:
      "Package rates are inquiry-based. Batad Rice Terraces and trekking routes require a local registered guide. Tappiyah Falls involves a short but steep trail. Weather can affect trail conditions.",
    supplierChecks: [
      "Overnight bus Manila–Banaue booking or Cauayan/Tuguegarao flight with onward van",
      "Accommodation in Banaue town",
      "Registered Ifugao local guide for Batad and terrace trails",
      "Jeepney hire from Banaue to Batad saddle point",
      "Tam-an village guide coordination",
    ],
    highlights: [
      "Banaue Rice Terraces — UNESCO World Heritage Site; 2,000-year-old stone-walled terraces carved into the Cordillera mountains",
      "Batad Rice Terraces — amphitheater-shaped rice terraces in a remote highland bowl",
      "Tappiyah Falls — dramatic waterfall reached by trekking through the Batad terrace landscape",
      "Tam-an and Bangaan villages — traditional Ifugao settlement clusters with muyong forest views",
      "Ifugao woodcarving and bulul tradition — living indigenous craft heritage of the highlands",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Overnight Bus Arrival in Banaue — First Terrace Views",
        details: [
          "Early morning — Arrive in Banaue by overnight bus from Manila (approximately 9–10 hours)",
          "Check-in at inn or lodge; freshen up and rest briefly",
          "8:00 AM — Banaue Rice Terraces viewpoint: first-light views of the UNESCO-listed terraces; orientation with local guide",
          "10:00 AM — Tam-an village walk: traditional Ifugao houses, woodcarving demonstration, and terrace edge paths",
          "12:00 PM — Lunch at a Banaue inn restaurant",
          "2:00 PM — Bangaan village: traditional settlement cluster with layered terrace views",
          "4:00 PM — Return to Banaue; rest and acclimatize to highland altitude",
          "Evening — Dinner in Banaue; guide briefing on the next day's Batad route",
        ],
      },
      {
        day: "Day 2",
        title: "Batad Rice Terraces and Tappiyah Falls Trek",
        details: [
          "7:00 AM — Breakfast at the lodge",
          "7:45 AM — Jeepney to Batad saddle point (approximately 45 minutes from Banaue)",
          "8:30 AM — Trek from saddle point down into Batad village (approximately 30–45 minutes on mountain trail)",
          "9:30 AM — Batad Rice Terraces: explore the amphitheater-shaped terrace bowl; guided walk along the terrace walls",
          "11:00 AM — Trek to Tappiyah Falls (approximately 30 minutes from Batad village): waterfall plunging into a pool amid the terrace landscape",
          "12:30 PM — Packed lunch in Batad village",
          "2:00 PM — Trek return to saddle point; jeepney back to Banaue",
          "4:00 PM — Rest at lodge",
          "Evening — Dinner and cultural sharing with guide",
        ],
      },
      {
        day: "Day 3",
        title: "Hapao Rice Terraces and Ifugao Cultural Heritage",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Drive to Hungduan for Hapao Rice Terraces: UNESCO-component terrace cluster with a quieter, less-visited character",
          "10:30 AM — Ifugao traditional house and bulul figure exhibit: woodcarving demonstration in Hungduan or Banaue market",
          "12:00 PM — Lunch in Banaue",
          "2:00 PM — Banaue market: Ifugao weavers, local produce, and highland craft trade",
          "3:30 PM — Free afternoon: terrace viewpoint, pasalubong browsing",
          "Evening — Final dinner in Banaue",
        ],
      },
      {
        day: "Day 4",
        title: "Morning Leisure and Departure",
        details: [
          "6:30 AM — Early terrace viewpoint sunrise walk",
          "8:00 AM — Breakfast and check-out",
          "9:00 AM — Final pasalubong at Banaue market: Ifugao woven goods, wooden crafts, and highland coffee",
          "10:00 AM — Depart Banaue by bus or hired van toward Manila or airport connection",
        ],
      },
    ],
  },

  "Ilocos Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Laoag City, Ilocos Norte (Laoag International Airport)",
    transport:
      "Direct flight from Manila to Laoag International Airport (approximately 1 hour) via Philippine Airlines or Cebu Pacific. Or overnight bus from Manila (approximately 9–10 hours) via Partas or Farinas Transit.",
    bestFor: "UNESCO heritage church travelers, northern Luzon scenic routes, sand dune adventure, Pagudpud beach escapes, cultural heritage groups",
    costingNote:
      "Package rates are inquiry-based. La Paz Sand Dunes 4x4 ride and Kabigan Falls trekking are confirmed separately with local operators in Laoag and Pagudpud.",
    supplierChecks: [
      "Hotel in Laoag City or Pagudpud beach area",
      "La Paz Sand Dunes 4x4 off-road vehicle rental",
      "Pagudpud accommodation if overnight at Saud Beach",
      "Local guide for Paoay Church and heritage circuit",
      "Transport coordination for northern Ilocos Norte circuit",
    ],
    highlights: [
      "Paoay Church — UNESCO earthquake-baroque heritage church with massive lateral buttresses",
      "La Paz Sand Dunes — vast coastal sand dunes for 4x4 off-road riding near Laoag",
      "Bangui Windmills — iconic row of wind turbines along the northern Ilocos Norte coast",
      "Saud Beach, Pagudpud — pristine northern Luzon beach in a sheltered bay",
      "Bacarra Bell Tower and Sarrat Church — inland heritage churches of Ilocos Norte",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Laoag — Paoay Church and Sand Dunes",
        details: [
          "Morning — Arrive at Laoag International Airport; transfer to hotel in Laoag City",
          "Afternoon — Check-in and rest",
          "2:00 PM — Paoay Church (St. Augustine Parish, Paoay): UNESCO earthquake-baroque church with distinctive massive buttresses; heritage walk and grounds",
          "3:30 PM — Paoay Lake: scenic lake adjacent to the heritage church",
          "5:00 PM — La Paz Sand Dunes: 4x4 off-road ride through the vast coastal sand dunes overlooking the South China Sea (tour operators available locally)",
          "Evening — Dinner in Laoag City featuring Ilocano cuisine: bagnet, pinakbet, and dinengdeng",
        ],
      },
      {
        day: "Day 2",
        title: "Bangui Windmills, Pagudpud, and Saud Beach",
        details: [
          "7:00 AM — Breakfast and early departure north",
          "8:30 AM — Sarrat Church: 18th-century heritage church in the hometown of Ferdinand Marcos",
          "9:30 AM — Bangui Windmills: row of wind turbines along the northern Ilocos Norte coast; photo stop and coastal views",
          "11:00 AM — Continue north to Pagudpud (approximately 30 minutes from Bangui)",
          "12:00 PM — Saud Beach, Pagudpud: lunch at a beachside restaurant; swim in clear northern Luzon waters",
          "2:30 PM — Kabigan Falls (short trek from the highway): waterfall in a forested coastal valley near Pagudpud",
          "5:00 PM — Sunset at Saud Beach",
          "Evening — Dinner in Pagudpud area",
        ],
      },
      {
        day: "Day 3",
        title: "Bacarra Tower, Batac Heritage, and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive back toward Laoag via Bacarra (approximately 30 minutes from Laoag)",
          "9:00 AM — Bacarra Bell Tower: striking ruined colonial bell tower standing apart from its church",
          "10:00 AM — Batac City heritage sites: Marcos Museum and regional Ilocos Norte exhibits",
          "12:00 PM — Lunch in Laoag City",
          "1:30 PM — Pasalubong at Laoag market: Ilocos empanada, pinipig, and Ilocano woven products",
          "3:00 PM — Transfer to Laoag International Airport for departure flight",
        ],
      },
    ],
  },

  "Ilocos Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Vigan City, Ilocos Sur",
    transport:
      "Bus from Manila (Cubao or Pasay) to Vigan City via Partas or Dominion Bus Lines (approximately 8–9 hours). Or fly to Laoag International Airport, Ilocos Norte, then travel south to Vigan by van (approximately 1.5 hours).",
    bestFor: "UNESCO heritage city travelers, colonial architecture walks, Ilocano food culture, family heritage routes, cultural groups",
    costingNote:
      "Package rates are inquiry-based. Kalesa carriage rides and heritage house entry fees are confirmed locally in Vigan. Pottery workshops in Pagburnayan are subject to schedule and group size.",
    supplierChecks: [
      "Heritage hotel or pension in Vigan City",
      "Kalesa carriage hire in Calle Crisologo",
      "Pagburnayan pottery workshop coordination",
      "Local heritage guide for Vigan heritage house circuit",
      "Bantay Church and Bell Tower access",
    ],
    highlights: [
      "Calle Crisologo — UNESCO-listed cobblestone street lined with preserved Spanish colonial houses",
      "Bantay Church and Bell Tower — fortified 16th-century church with a freestanding watchtower",
      "Pagburnayan (Burnay Pottery district) — centuries-old kiln-fired earthenware pottery tradition",
      "Vigan longganisa and empanada — iconic Ilocano street food of the heritage city",
      "Syquia Mansion and Crisologo Museum — ancestral homes open for heritage tours",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Vigan City — UNESCO Heritage Walk",
        details: [
          "Morning — Arrive in Vigan by bus or van transfer from Laoag",
          "Late morning — Check-in at heritage hotel; freshen up",
          "1:00 PM — Lunch at a Vigan restaurant: empanada, Vigan longganisa, and bagnet",
          "2:30 PM — Calle Crisologo UNESCO heritage walk: cobblestone street lined with 16th–19th century Spanish colonial townhouses; kalesa carriage ride",
          "4:00 PM — Syquia Mansion: heritage house of the Quirino family; guided tour",
          "5:00 PM — Crisologo Museum: ancestral home and personal effects of the Crisologo political family",
          "6:00 PM — Plaza Salcedo: evening walk and fountain area",
          "Evening — Dinner at a Vigan heritage district restaurant",
        ],
      },
      {
        day: "Day 2",
        title: "Bantay Church, Pagburnayan, and Vigan Heritage Circuit",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Bantay Church (St. Augustine Parish, Bantay): fortified 16th-century church; climb the freestanding Bantay Bell Tower for views over Vigan",
          "10:00 AM — Pagburnayan (Burnay Pottery district): watch traditional kiln-fired Ilocano earthenware pottery made from local clay; browse and purchase burnay jars and ceramic goods",
          "11:30 AM — Vigan Cathedral (Metropolitan Cathedral of the Conversion of St. Paul): heritage church at the center of the heritage zone",
          "12:30 PM — Lunch at a heritage district cafe",
          "2:00 PM — Heritage house circuit: interiors of preserved ancestral homes open to visitors in the Vigan heritage zone",
          "4:00 PM — Ilocos Sur pasalubong: abel Ilocos woven fabric, Ilocos vinegar, garlic, and longganisa",
          "Evening — Dinner and free evening in Vigan",
        ],
      },
      {
        day: "Day 3",
        title: "Morning Vigan Market and Departure",
        details: [
          "7:00 AM — Breakfast",
          "8:00 AM — Vigan Public Market: local produce, Ilocano vinegar, snacks, and freshly cooked morning empanada",
          "9:30 AM — Final walk along Calle Crisologo or Plaza Burgos",
          "10:30 AM — Depart Vigan by bus toward Manila or van to Laoag for return flight",
        ],
      },
    ],
  },

  Isabela: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Ilagan City, Isabela (Cauayan Airport, Isabela)",
    transport:
      "Fly from Manila to Cauayan Airport, Isabela (approximately 1.5 hours) via Philippine Airlines or Cebu Pacific. Transfer by van to Ilagan City (approximately 45 minutes from Cauayan).",
    bestFor: "Cave and wildlife heritage travelers, Cagayan Valley agricultural landscape, Magat Dam seekers, heritage church groups",
    costingNote:
      "Package rates are inquiry-based. Palanan Wilderness (Sierra Madre) is a remote multi-day destination requiring advance DENR coordination and is not part of this standard itinerary.",
    supplierChecks: [
      "Hotel in Ilagan City or Cauayan City",
      "Ilagan City caves access and guide",
      "Isabela Wildlife Sanctuary guide coordination",
      "Magat Dam scenic access from Ramon or Santiago City",
      "Tumauini Church heritage guide",
    ],
    highlights: [
      "Magat Dam and Reservoir — one of the Philippines' largest hydroelectric dams with sweeping lake and highland views",
      "Tumauini Church (Sto. Domingo Parish) — National Cultural Treasure and 18th-century heritage church",
      "Ilagan City caves — limestone cave network near the provincial capital",
      "Isabela Wildlife Sanctuary — protected area for Philippine deer and endemic Cagayan Valley wildlife",
      "Cagayan Valley agricultural plain — vast corn and rice landscape of one of the Philippines' largest provinces",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Ilagan City — Cagayan Valley Orientation",
        details: [
          "Morning — Arrive at Cauayan Airport; van transfer to Ilagan City (approximately 45 minutes)",
          "Noon — Check-in at hotel; rest",
          "Afternoon — Ilagan City orientation: city plaza, heritage church, and Cagayan Valley basin views",
          "3:30 PM — Isabela Wildlife Sanctuary gate area: provincial wildlife reserve with endemic deer species; grounds walk (sanctuary interior visits subject to DENR coordination)",
          "Evening — Dinner in Ilagan City featuring Cagayan Valley regional cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Tumauini Church, Magat Dam, and Ilagan Caves",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Drive to Tumauini (approximately 30 minutes from Ilagan City)",
          "9:00 AM — Tumauini Church (Sto. Domingo Parish): National Cultural Treasure; 18th-century church with well-preserved baroque facade and heritage interiors",
          "10:30 AM — Drive toward Magat Dam area, Ramon (approximately 1.5 hours from Tumauini via Santiago City)",
          "12:00 PM — Lunch near Santiago City or Ramon",
          "1:30 PM — Magat Dam and Reservoir viewpoint: sweeping views of the enormous reservoir and surrounding Cagayan Valley highlands",
          "3:30 PM — Return to Ilagan City",
          "4:30 PM — Ilagan City caves: short guided cave visit near the city",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Agricultural Plain and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Cagayan Valley agricultural plain drive: sweeping corn and rice landscape characteristic of Isabela, one of the Philippines' largest and most productive provinces",
          "10:00 AM — Cauayan City market: local produce, Isabela corn-based products, and regional goods",
          "11:30 AM — Transfer to Cauayan Airport for departure flight",
        ],
      },
    ],
  },

  Kalinga: {
    duration: "4 Days / 3 Nights",
    gatewayBase: "Tabuk City → Tinglayan, Kalinga",
    transport:
      "Fly from Manila to Tuguegarao Airport, Cagayan (approximately 1 hour), then travel by van to Tabuk City, Kalinga (approximately 3 hours). From Tabuk, travel by jeepney or 4x4 to Tinglayan (approximately 3 hours on a winding mountain road). Buscalan village requires a 30–45 minute uphill trek from the Tinglayan jump-off.",
    bestFor: "Indigenous cultural heritage travelers, traditional tattooing heritage seekers, rice terrace trekkers, photography groups, adventurous small groups",
    costingNote:
      "Package rates are inquiry-based. Buscalan village visits require a registered local guide and a community fee. The traditional batek tattooing experience is subject to the mambabatok's schedule, health, and availability — it cannot be guaranteed. Visitors must respect community protocols at all times.",
    supplierChecks: [
      "Accommodation in Tabuk City and Tinglayan homestay",
      "Registered Kalinga local guide for Tinglayan and Buscalan route",
      "Tuguegarao–Tabuk van transfer",
      "Tabuk–Tinglayan jeepney or 4x4 coordination",
      "Community entry fee for Buscalan village",
    ],
    highlights: [
      "Buscalan Village — remote Butbut Kalinga community; home of legendary mambabatok Whang-Od Oggay",
      "Batek (traditional Kalinga tattoo) — ancient geometric hand-tapped tattoo tradition of Kalinga warrior heritage",
      "Tulgao Rice Terraces — remote highland terraces in Tinglayan municipality",
      "Pasil River — highland river running through the Kalinga mountain range",
      "Tabuk City — Kalinga's gateway capital on the edge of the Cagayan Valley",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Tuguegarao to Tabuk City — Kalinga Highland Gateway",
        details: [
          "Morning — Arrive at Tuguegarao Airport; van transfer to Tabuk City (approximately 3 hours through Cagayan Valley and into the Kalinga highlands)",
          "Afternoon — Check-in in Tabuk City; rest",
          "3:30 PM — Tabuk City orientation: provincial capitol and Pasil River bridge views",
          "Evening — Dinner in Tabuk; guide briefing on Tinglayan route and Buscalan community protocols",
        ],
      },
      {
        day: "Day 2",
        title: "Tinglayan and Buscalan Village — Kalinga Tattoo Heritage",
        details: [
          "6:00 AM — Early breakfast and departure for Tinglayan by jeepney or 4x4 (approximately 3 hours on mountain road)",
          "9:00 AM — Arrive in Tinglayan; check-in at community homestay",
          "10:00 AM — Trek from Tinglayan toward Buscalan village (approximately 30–45 minutes uphill on a mountain trail)",
          "10:45 AM — Buscalan village arrival: explore the Butbut Kalinga community; observe traditional architecture and village life",
          "11:30 AM — Batek tattoo session (subject to the mambabatok's schedule and availability; participation cannot be guaranteed): observe or join the traditional hand-tapping technique using pomelo thorn and bamboo",
          "1:00 PM — Lunch at a community homestay",
          "Afternoon — Free exploration of Buscalan: terrace views, cultural exchange, and community interaction",
          "Evening — Overnight in Tinglayan homestay",
        ],
      },
      {
        day: "Day 3",
        title: "Tulgao Rice Terraces and Pasil River",
        details: [
          "7:00 AM — Breakfast in Tinglayan",
          "8:30 AM — Trek or jeepney to Tulgao: remote highland rice terraces of the Butbut Kalinga; walk along the terrace walls and community trail",
          "11:00 AM — Pasil River: highland river rest and scenery along the Kalinga mountain range",
          "1:00 PM — Packed lunch in Tinglayan area",
          "3:00 PM — Return journey by jeepney toward Tabuk City",
          "Evening — Arrive in Tabuk; dinner and rest",
        ],
      },
      {
        day: "Day 4",
        title: "Tabuk City and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Tabuk City public market: local Kalinga produce, highland weaves, and regional goods",
          "10:00 AM — Depart by van to Tuguegarao Airport",
          "1:00 PM — Arrive at Tuguegarao for departure flight",
        ],
      },
    ],
  },

  "La Union": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "San Fernando City, La Union",
    transport:
      "Bus from Manila (Cubao or Pasay) to San Fernando, La Union (approximately 5–6 hours) via Partas, Dominion, or Victory Liner. Private car via NLEX-TPLEX to Rosario, La Union exit.",
    bestFor: "Surf beginners and enthusiasts, coastal heritage travelers, Ilocandia food and culture, northern Luzon weekend groups",
    costingNote:
      "Package rates are inquiry-based. Surf lessons and board rentals at Urbiztondo Beach are confirmed locally with accredited surf instructors in San Juan, La Union.",
    supplierChecks: [
      "Surf hostel or beachside hotel in San Juan, La Union",
      "Surfboard rental and surf instructor at Urbiztondo Beach",
      "Ma-Cho Temple visit coordination",
      "Local van or tricycle transfers between San Fernando and San Juan",
    ],
    highlights: [
      "Urbiztondo Beach, San Juan — 'Surf City Philippines,' beginner-friendly waves with a vibrant beach culture",
      "Ma-Cho Temple, San Fernando — the largest Chinese temple in northern Luzon",
      "Poro Point Lighthouse — Spanish-era coastal lighthouse on the La Union headland",
      "Agoo Basilica — National Shrine of Our Lady of Charity in Agoo, La Union",
      "San Fernando City heritage church — the colonial heart of the La Union capital",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to San Fernando — Heritage and Coastal Arrival",
        details: [
          "Morning — Depart Manila by bus or private car (approximately 5–6 hours)",
          "Afternoon — Arrive in San Fernando City; check-in at hotel",
          "3:00 PM — San Fernando City heritage church: colonial heritage landmark in the La Union capital",
          "4:00 PM — Ma-Cho Temple, San Fernando: the largest Chinese Filipino temple in northern Luzon; tranquil grounds with sea views",
          "5:30 PM — Poro Point Lighthouse: walk toward the Spanish-era lighthouse on the coastal headland",
          "Evening — Dinner at a San Fernando City restaurant featuring fresh La Union seafood and Ilocano dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Surf Day at Urbiztondo Beach, San Juan",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Transfer to San Juan, La Union (approximately 30 minutes from San Fernando)",
          "9:00 AM — Morning surf session at Urbiztondo Beach: accredited local surf instructor and board rental for beginners or intermediate surfers",
          "12:00 PM — Lunch at a San Juan beachside cafe (numerous surf-culture eateries along the beach road)",
          "2:00 PM — Afternoon free time: swim, rest on the beach, or explore San Juan surf town",
          "5:00 PM — Sunset at Urbiztondo Beach",
          "Evening — Dinner in San Juan; optional night market or beachside bonfire",
        ],
      },
      {
        day: "Day 3",
        title: "Agoo Basilica and Departure",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Agoo, La Union (approximately 20 minutes from San Fernando): Agoo Basilica (National Shrine of Our Lady of Charity); heritage church and pilgrimage grounds",
          "10:00 AM — La Union pasalubong shopping in San Fernando: local woodcraft, basi wine, and Ilocano regional products",
          "12:00 PM — Lunch in San Fernando City before departure",
          "1:30 PM — Depart by bus or private car back to Manila",
        ],
      },
    ],
  },

  Laguna: {
    duration: "2 Days / 1 Night",
    gatewayBase: "Santa Cruz / Pagsanjan / Calamba, Laguna",
    transport:
      "Bus from Manila (Buendia EDSA, Pasay, or Cubao) to Santa Cruz, Pagsanjan, or Calamba via JAM or DLTB (approximately 2–3 hours depending on traffic). Private car via SLEX.",
    bestFor: "Heritage church travelers, waterfall and gorge adventure, Rizal heritage families, hot spring wellness groups, day trips or short overnight escapes from Metro Manila",
    costingNote:
      "Package rates are inquiry-based. Pagsanjan Falls gorge shooting requires boat hire and local boatmen guides. The activity is subject to river water levels and weather conditions; operating schedules are confirmed locally.",
    supplierChecks: [
      "Hotel or hot spring resort in Los Baños or Pagsanjan area",
      "Pagsanjan Falls bangka and boatman hire (seasonal water level advisory applies)",
      "Nagcarlan Underground Cemetery access",
      "Pila heritage town local guide",
      "Rizal Shrine, Calamba visit coordination",
    ],
    highlights: [
      "Pagsanjan Falls and Gorge — famous gorge shooting experience through towering limestone canyon walls",
      "Nagcarlan Underground Cemetery — 19th-century circular brick mausoleum with underground crypt; National Cultural Treasure",
      "Pila Heritage Town — one of the best-preserved Spanish colonial town centers in Luzon",
      "Dr. Jose Rizal Shrine, Calamba — birthplace and family home of the Philippine national hero",
      "Los Baños Hot Springs — geothermal resort town at the foot of Mt. Makiling",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Laguna — Rizal Heritage, Los Baños, and Pagsanjan",
        details: [
          "8:00 AM — Depart Manila by bus or private car toward Calamba (approximately 1.5–2 hours via SLEX)",
          "10:00 AM — Dr. Jose Rizal Shrine, Calamba: birthplace of the Philippine national hero; restored family home, garden, and heritage museum",
          "11:30 AM — Drive to Los Baños: geothermal spring resort town at the foot of Mt. Makiling; optional soak at a local hot spring facility",
          "1:00 PM — Lunch in Los Baños area",
          "2:30 PM — Drive to Pagsanjan (approximately 45 minutes from Los Baños)",
          "3:30 PM — Check-in at Pagsanjan area accommodation",
          "Evening — Dinner in Pagsanjan town; boatman briefing for next morning's gorge shooting",
        ],
      },
      {
        day: "Day 2",
        title: "Pagsanjan Gorge, Nagcarlan Cemetery, Pila Heritage, and Departure",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:00 AM — Pagsanjan Falls gorge shooting: bangka ride upstream through limestone canyon walls to the base of Pagsanjan Falls; bamboo raft shoot back through the rapids (subject to river water levels and weather conditions)",
          "11:00 AM — Return and freshen up",
          "12:00 PM — Lunch in Pagsanjan town",
          "1:30 PM — Nagcarlan Underground Cemetery (approximately 20 minutes from Pagsanjan): 19th-century circular brick mausoleum with underground crypt; National Cultural Treasure",
          "3:00 PM — Pila Heritage Town (approximately 15 minutes from Nagcarlan): well-preserved Spanish colonial townscape; St. Peter of Verona Church, ancestral houses, and heritage plaza",
          "5:00 PM — Depart Laguna for Manila via SLEX",
        ],
      },
    ],
  },

  "Lanao del Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Iligan City (gateway to Lanao del Norte, via Laguindingan Airport)",
    transport:
      "Fly from Manila to Laguindingan Airport, Misamis Oriental (approximately 2 hours), then travel by van to Iligan City (approximately 1 hour via the Cagayan–Iligan road). Iligan City serves as the main hub for waterfall access and Lanao del Norte coastal exploration.",
    bestFor: "Waterfall seekers, northern Mindanao heritage travelers, coastal landscape groups, photography enthusiasts",
    costingNote:
      "Package rates are inquiry-based. Maria Cristina Falls and Tinago Falls visits require coordination with Iligan City Tourism and local site operators. Waterfall access conditions vary seasonally.",
    supplierChecks: [
      "Hotel in Iligan City",
      "Maria Cristina Falls access permit and local guide",
      "Tinago Falls descent guide (approximately 300 steps)",
      "Panguil Bay coastal and community guide",
      "Laguindingan Airport–Iligan City van transfer",
    ],
    highlights: [
      "Maria Cristina Falls — twin-curtain waterfall and a major hydroelectric source; one of the tallest falls in the Philippines",
      "Tinago Falls — 'hidden falls' reached by a steep descent into a limestone gorge and emerald pool",
      "Mimbalot Falls — layered cascade in an Iligan forested park setting",
      "Kolambugan coastal area — Panguil Bay fishing community on the Lanao del Norte coast",
      "Timoga Spring Park — natural spring pool complex in the Iligan lowlands",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Laguindingan to Iligan City — Gateway Arrival and Orientation",
        details: [
          "Morning — Arrive at Laguindingan Airport; van transfer to Iligan City (approximately 1 hour)",
          "Noon — Check-in at hotel in Iligan City",
          "Afternoon — Timoga Spring Park: natural spring pool complex near Iligan; swim in spring-fed pools",
          "4:30 PM — Cathedral of St. Michael the Archangel, Iligan City: heritage parish church in the city center",
          "Evening — Dinner in Iligan City featuring northern Mindanao seafood and regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Maria Cristina Falls and Tinago Falls",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:30 AM — Maria Cristina Falls: twin-curtain waterfall dropping approximately 98 meters; viewing platform and hydroelectric facility surroundings (access subject to permit and seasonal water release schedules)",
          "10:30 AM — Mimbalot Falls: cascade in the Iligan park system; short forest walk to the falls area",
          "12:30 PM — Lunch in Iligan City",
          "2:00 PM — Tinago Falls: descent of approximately 300 steps into a limestone gorge to reach the hidden waterfall and emerald pool; swimming permitted",
          "5:00 PM — Return to Iligan City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Panguil Bay Coast and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Kolambugan coastal drive: Panguil Bay fishing community and coastal landscape on the Lanao del Norte shoreline",
          "10:30 AM — Iligan City public market: local produce, freshwater fish, and northern Mindanao regional goods",
          "12:00 PM — Lunch before departure",
          "1:30 PM — Depart by van to Laguindingan Airport for return flight",
        ],
      },
    ],
  },

  "Lanao del Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Marawi City, Lanao del Sur (via Iligan City or Cagayan de Oro City)",
    transport:
      "Fly from Manila to Laguindingan Airport (approximately 2 hours), then travel by van to Iligan City (approximately 1 hour) and onward to Marawi City (approximately 1 hour from Iligan City). Travel to Lanao del Sur requires advance coordination with accredited local guides and verification of current conditions and advisories with the Bangsamoro Tourism Office prior to booking.",
    bestFor: "Maranao cultural heritage travelers, Lake Lanao landscape seekers, Philippine Islamic heritage groups, academic and cultural study groups",
    costingNote:
      "Package rates are inquiry-based. Travel to Marawi City and Lanao del Sur is coordinated through accredited local guides and the Bangsamoro Tourism Office. Access arrangements are confirmed on a case-by-case basis in accordance with current conditions.",
    supplierChecks: [
      "Bangsamoro Tourism Office coordination and accredited local guide",
      "Accommodation in Marawi City",
      "Lake Lanao shoreline boat access and guide",
      "Maranao craft community visit coordination",
      "Laguindingan–Iligan–Marawi van transfer",
    ],
    highlights: [
      "Lake Lanao — one of the Philippines' largest and most ecologically significant freshwater lakes; deeply sacred to the Maranao people",
      "Maranao cultural heritage — okir woodcarving, malong weaving, brassware, and the living arts of the Maranao",
      "Marawi City — the cultural and spiritual center of the Maranao people; seat of Bangsamoro Islamic identity in Lanao del Sur",
      "Agus River corridor — the lake's outflow river connecting Lake Lanao to the sea",
      "Lanao del Sur highland basin — elevated lake valley framed by hills and Maranao agricultural communities",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Iligan City to Marawi City — Maranao Gateway Arrival",
        details: [
          "Morning — Arrive at Laguindingan Airport; van transfer to Iligan City (approximately 1 hour)",
          "Late morning — Continue by van to Marawi City, Lanao del Sur (approximately 1 hour from Iligan City; access subject to current conditions and guide coordination)",
          "Noon — Arrive in Marawi City; check-in at accommodation; orientation briefing with local guide",
          "Afternoon — Marawi City guided orientation: context on Maranao heritage and the community's living cultural identity",
          "Evening — Dinner featuring Maranao regional dishes; cultural briefing from local guide",
        ],
      },
      {
        day: "Day 2",
        title: "Lake Lanao and Maranao Cultural Heritage",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:30 AM — Lake Lanao shoreline: one of the Philippines' largest freshwater lakes; highland lake views and lakeside community visit (shoreline and boat excursion subject to local guide and community coordination)",
          "10:30 AM — Maranao craft community visit: okir woodcarving and malong weaving demonstration (subject to prior coordination and artisan availability)",
          "12:30 PM — Lunch in Marawi City featuring Maranao cuisine",
          "2:30 PM — Agus River area: highland valley scenery along the lake's river outflow corridor",
          "Evening — Dinner and rest in Marawi City",
        ],
      },
      {
        day: "Day 3",
        title: "Maranao Arts Market and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Marawi market: traditional brassware, malong textiles, Maranao ceramics, and regional goods",
          "10:00 AM — Depart Marawi City by van to Iligan City",
          "11:30 AM — Iligan City brief stop before continuing to Laguindingan Airport",
          "1:30 PM — Arrive at Laguindingan Airport for return flight",
        ],
      },
    ],
  },

  Leyte: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Tacloban City, Leyte (Daniel Z. Romualdez Airport)",
    transport:
      "Fly from Manila to Tacloban Daniel Z. Romualdez Airport (approximately 1.5 hours). Within Leyte, travel by van between Tacloban City and Ormoc City (approximately 2 hours). Kalanggaman Island requires a bangka from Palompon (approximately 1 hour; weather-dependent).",
    bestFor: "WWII Pacific heritage travelers, island sandbar seekers, hot spring wellness groups, Eastern Visayas history and heritage groups",
    costingNote:
      "Package rates are inquiry-based. Kalanggaman Island bangka access is weather-dependent and must be confirmed with local operators in Palompon before departure. The Ormoc–Tongonan route requires van transfer coordination.",
    supplierChecks: [
      "Hotel in Tacloban City",
      "Bangka hire from Palompon for Kalanggaman Island (weather-dependent)",
      "Tacloban–Ormoc City van transfer",
      "MacArthur Landing Memorial National Park access",
      "Tongonan Hot Spring National Park guide coordination",
    ],
    highlights: [
      "MacArthur Landing Memorial National Park — bronze statues at Red Beach, Palo, marking General MacArthur's WWII return to the Philippines",
      "San Juanico Bridge — the longest bridge in the Philippines spanning the San Juanico Strait",
      "Kalanggaman Island, Palompon — pristine white sandbar island in the Camotes Sea",
      "Tongonan Hot Spring National Park, Ormoc — geothermal spring area in the Leyte highland interior",
      "Tacloban City colonial and WWII heritage — the Leyte capital's layered historical and cultural identity",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Tacloban City Arrival — MacArthur Heritage and San Juanico Bridge",
        details: [
          "Morning — Arrive at Tacloban Daniel Z. Romualdez Airport; check-in at hotel in Tacloban City",
          "Afternoon — Tacloban City heritage walk: Leyte Provincial Capitol, Sto. Niño Parish Church, and Rizal Avenue",
          "3:00 PM — MacArthur Landing Memorial National Park, Palo (approximately 15 minutes from Tacloban): bronze statues of General Douglas MacArthur and his landing party at Red Beach; WWII Pacific theater orientation",
          "5:00 PM — San Juanico Bridge viewpoint: views across the San Juanico Strait toward Samar",
          "Evening — Dinner in Tacloban City featuring Leyteño regional cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Kalanggaman Island",
        details: [
          "6:00 AM — Early breakfast and departure for Palompon, Leyte (approximately 2 hours from Tacloban City)",
          "8:30 AM — Palompon port: bangka to Kalanggaman Island (approximately 1 hour; sea conditions confirmed with local operator before departure)",
          "9:30 AM — Kalanggaman Island: pristine white sandbar extending into the Camotes Sea; swimming, snorkeling, and beach relaxation",
          "12:30 PM — Packed lunch on Kalanggaman Island",
          "2:00 PM — Bangka return to Palompon",
          "4:00 PM — Van return to Tacloban City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Ormoc City, Tongonan Hot Spring, and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:00 AM — Van to Ormoc City (approximately 2 hours from Tacloban via the Leyte interior road)",
          "10:00 AM — Ormoc City: Ormoc Bay coastal views and city plaza heritage walk",
          "11:00 AM — Tongonan Hot Spring National Park: geothermal spring area in the Leyte highland interior; soak and relax",
          "1:00 PM — Lunch in Ormoc area",
          "2:30 PM — Depart Ormoc toward Tacloban by van (approximately 2 hours)",
          "5:00 PM — Arrive at Tacloban; transfer to Daniel Z. Romualdez Airport for departure flight",
        ],
      },
    ],
  },

  "Maguindanao del Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Cotabato City (gateway to Maguindanao del Norte, via Awang Airport)",
    transport:
      "Fly from Manila to Awang Airport, Cotabato City (approximately 2 hours). Maguindanao del Norte is accessed from Cotabato City by van. Travel within the province requires advance coordination with accredited local guides and the Bangsamoro Tourism Office; current conditions and advisories must be verified prior to booking.",
    bestFor: "Bangsamoro cultural heritage travelers, Liguasan Marsh ecological interest groups, Maguindanao arts and craft heritage, academic and cultural study groups",
    costingNote:
      "Package rates are inquiry-based. Travel to Maguindanao del Norte is arranged through accredited guides and the Bangsamoro Tourism Office on a case-by-case basis. Access to Liguasan Marsh and community areas requires advance coordination.",
    supplierChecks: [
      "Bangsamoro Tourism Office coordination and accredited local guide",
      "Accommodation in Cotabato City or provincial area",
      "Liguasan Marsh boat access and local guide",
      "Maguindanao crafts community visit coordination",
      "Manila–Cotabato City flight booking",
    ],
    highlights: [
      "Liguasan Marsh — one of Southeast Asia's largest freshwater marshes; critical wetland ecosystem in the Mindanao interior",
      "Maguindanao cultural heritage — traditional malong weaving, brassware, and the living artistic traditions of the Maguindanao",
      "Cotabato City heritage — the commercial and cultural gateway to the Bangsamoro region",
      "Sultan Kudarat (Nuling) — historic riverside municipality connected to the Maguindanao sultanate legacy",
      "Bangsamoro Autonomous Region identity — the cultural and governance center of the Maguindanao homeland",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Cotabato City Arrival — Bangsamoro Gateway Orientation",
        details: [
          "Morning — Arrive at Awang Airport, Cotabato City; transfer to accommodation",
          "Afternoon — Cotabato City orientation: heritage walk through the public market, city plaza, and Río Grande de Mindanao riverside",
          "3:30 PM — Sultan Kudarat (Nuling) riverside area: historic municipality along the Mindanao River with connections to the Maguindanao sultanate heritage",
          "Evening — Dinner featuring Maguindanao regional cuisine; guide briefing on provincial access and cultural protocols",
        ],
      },
      {
        day: "Day 2",
        title: "Liguasan Marsh and Maguindanao Cultural Heritage",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Liguasan Marsh access: one of the largest freshwater marshes in Southeast Asia; boat excursion through marsh channels and wetland communities (subject to guide coordination and seasonal water conditions)",
          "11:00 AM — Marsh community visit: floating village life and traditional fishing heritage of the Liguasan communities",
          "1:00 PM — Packed lunch in the marsh area or return for lunch",
          "3:00 PM — Maguindanao weaving and brassware community: traditional malong textile and okir brasswork demonstration (subject to prior guide and community coordination)",
          "Evening — Return to accommodation; dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Cotabato Market and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Cotabato City market: Maguindanao malong textiles, traditional brassware, Bangsamoro crafts, and regional goods",
          "10:30 AM — Final riverside walk or city heritage area",
          "12:00 PM — Lunch before departure",
          "1:30 PM — Transfer to Awang Airport for return flight",
        ],
      },
    ],
  },

  "Maguindanao del Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Buluan / Upi, Maguindanao del Sur (via Cotabato City or General Santos City)",
    transport:
      "Fly from Manila to Awang Airport, Cotabato City (approximately 2 hours) or General Santos International Airport. Travel into Maguindanao del Sur by van (approximately 1–2 hours from Cotabato City toward Buluan or Upi). Advance coordination with accredited local guides and the Bangsamoro Tourism Office is required for all travel within the province.",
    bestFor: "Bangsamoro and Teduray indigenous cultural heritage travelers, Lake Buluan ecological interest groups, academic and cultural study groups",
    costingNote:
      "Package rates are inquiry-based. Travel to Maguindanao del Sur requires advance coordination with accredited guides and the Bangsamoro Tourism Office. Upi municipality visits involve Teduray ancestral domain areas and require prior community consent and guide arrangement.",
    supplierChecks: [
      "Bangsamoro Tourism Office coordination and accredited local guide",
      "Accommodation in Buluan or Upi area",
      "Lake Buluan boat and local guide",
      "Teduray community visit coordination through appropriate guide",
      "Cotabato City–Buluan van transfer",
    ],
    highlights: [
      "Lake Buluan — significant freshwater lake in the Maguindanao del Sur lowland interior",
      "Upi municipality — home of the Teduray and Lambangian indigenous peoples; traditional crafts and highland community heritage",
      "Maguindanao del Sur wetland and river landscape — broad Mindanao interior river basin scenery",
      "Teduray traditional culture — weaving, basket-making, and ancestral community heritage",
      "Bangsamoro provincial interior — the BARMM region's broad lowland and interior landscape",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Cotabato City to Buluan — Interior Arrival",
        details: [
          "Morning — Arrive at Awang Airport, Cotabato City; van transfer to Buluan, Maguindanao del Sur (approximately 1.5 hours)",
          "Noon — Arrive in Buluan; check-in at accommodation; orientation with local guide",
          "Afternoon — Buluan town and Lake Buluan shoreline: provincial lakeside community and freshwater lake views",
          "Evening — Dinner featuring Maguindanao regional cuisine; guide briefing on the Upi route and community protocols",
        ],
      },
      {
        day: "Day 2",
        title: "Lake Buluan and Upi Indigenous Heritage",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Lake Buluan boat excursion: lake scenery and lakeside fishing communities (boat access subject to guide coordination and weather conditions)",
          "11:00 AM — Drive to Upi municipality (approximately 1.5 hours from Buluan toward the highland interior)",
          "12:30 PM — Lunch in Upi area",
          "2:00 PM — Teduray community visit (subject to prior guide arrangement and community consent): traditional weaving, basket-making, and highland cultural heritage of the Teduray and Lambangian peoples",
          "Evening — Return to Buluan; dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Provincial Market and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Local market visit: Maguindanao textiles, crafts, and fresh lake produce",
          "10:30 AM — Lake Buluan final shoreline walk",
          "12:00 PM — Lunch before departure",
          "1:30 PM — Van return to Cotabato City; transfer to Awang Airport for departure flight",
        ],
      },
    ],
  },

  Marinduque: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Boac, Marinduque (via Marinduque Airport or Balanacan Port)",
    transport:
      "Fly from Manila to Marinduque Airport (approximately 1 hour) via light aircraft. Alternatively, travel by bus from Manila to Dalahican Port, Lucena City (approximately 3 hours) and take a ferry to Balanacan Port, Sta. Cruz, Marinduque (approximately 2.5–3 hours). Island transport by tricycle or van hire.",
    bestFor: "Island heritage travelers, Moriones Festival enthusiasts, cave and reef seekers, family heritage routes, slow island travel",
    costingNote:
      "Package rates are inquiry-based. The Moriones Festival occurs during Holy Week (date varies annually); visits timed to the festival require well-advance booking. Tres Reyes Islands boat access is weather-dependent.",
    supplierChecks: [
      "Accommodation in Boac town",
      "Local van or tricycle hire for island circuit",
      "Tres Reyes Islands bangka and snorkeling guide",
      "Bathala Caves local guide in Torrijos",
      "Manila–Marinduque flight or Lucena–Balanacan ferry booking",
    ],
    highlights: [
      "Moriones Festival — Marinduque's world-renowned Holy Week festival featuring masked Roman centurion costumes",
      "Boac Cathedral — National Cultural Treasure; fortified hilltop heritage church overlooking the Boac River valley",
      "Tres Reyes Islands (Three Kings Islands) — marine sanctuary islands with snorkeling and coastal scenery",
      "Bathala Caves — multi-chamber limestone cave network in Torrijos, Marinduque",
      "Boac River heritage walk — scenic river flanked by Spanish-era heritage structures",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Marinduque — Boac Heritage and Cathedral",
        details: [
          "Morning — Arrive at Marinduque Airport or Balanacan Port; transfer to Boac by van or tricycle",
          "Noon — Check-in at accommodation in Boac",
          "Afternoon — Boac town heritage walk: Boac River, heritage structures along the riverside, and town plaza",
          "3:30 PM — Boac Cathedral (St. Joseph the Worker Parish): National Cultural Treasure; fortified hilltop church with panoramic views over the Boac River valley",
          "Evening — Dinner in Boac featuring Marinduque regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Bathala Caves and Tres Reyes Islands",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:30 AM — Drive to Torrijos, Marinduque (approximately 1 hour from Boac)",
          "9:30 AM — Bathala Caves: guided tour of the multi-chamber limestone cave system; large formations and cathedral-sized chambers",
          "11:30 AM — Return to Gasan area or port",
          "12:30 PM — Lunch in Gasan or packed lunch",
          "2:00 PM — Bangka to Tres Reyes Islands: marine sanctuary; snorkeling in coral gardens (sea conditions confirmed with local bangka operator before departure)",
          "5:00 PM — Return to shore; back to Boac",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Island Circumferential Drive and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Marinduque circumferential road: island circuit drive through coastal fishing communities, provincial town centers, and landscape views",
          "10:30 AM — Mogpog or Buenavista inland stop: highland interior scenery and local community",
          "12:00 PM — Lunch before departure",
          "1:30 PM — Transfer to Marinduque Airport or Balanacan Port for return journey",
        ],
      },
    ],
  },

  Masbate: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Masbate City, Masbate (Masbate Airport)",
    transport:
      "Fly from Manila to Masbate Airport (approximately 1.5 hours) via Cebu Pacific or Philippine Airlines. Alternatively, ferry from Pilar, Sorsogon or Bulan to Masbate City. Ticao Island requires a bangka from San Jacinto, Masbate (approximately 45 minutes).",
    bestFor: "Island ranch heritage travelers, manta ray and reef divers, Masbate Rodeo Festival groups, remote Visayas island explorers",
    costingNote:
      "Package rates are inquiry-based. Ticao Island Manta Bowl diving requires an accredited local dive operator and is subject to manta ray presence, sea conditions, and seasonal patterns — marine wildlife sightings cannot be guaranteed. Masbate Rodeo Festival occurs annually in April.",
    supplierChecks: [
      "Hotel in Masbate City",
      "Ticao Island bangka and accredited dive operator for the Manta Bowl",
      "Buntod Reef Marine Sanctuary snorkeling guide",
      "Kalanay Cave local guide in Mobo",
      "Manila–Masbate flight or ferry booking",
    ],
    highlights: [
      "Buntod Reef Marine Sanctuary — shallow reef snorkeling and a sandspit near Masbate City",
      "Ticao Island Manta Bowl — world-class manta ray dive site in the Ticao Pass",
      "Masbate Rodeo Festival — the Philippines' premier cattle-ranching festival held annually in April in Masbate City",
      "Kalanay Cave, Mobo — significant pre-colonial burial site and limestone cave with archaeological heritage",
      "Pawa Mangrove Nature Park — coastal mangrove forest boardwalk near Masbate City",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Masbate City Arrival — Reef Sanctuary and City Heritage",
        details: [
          "Morning — Arrive at Masbate Airport; transfer to hotel in Masbate City",
          "Noon — Check-in and rest",
          "1:30 PM — Buntod Reef Marine Sanctuary: sandbar island with snorkeling over the reef and beach relaxation",
          "3:30 PM — Pawa Mangrove Nature Park: boardwalk through the coastal mangrove forest",
          "5:00 PM — Masbate City plaza and heritage church walk",
          "Evening — Dinner featuring Masbate fresh seafood; introduction to the island's cattle-ranching heritage",
        ],
      },
      {
        day: "Day 2",
        title: "Ticao Island Manta Bowl",
        details: [
          "6:00 AM — Early breakfast and departure toward San Jacinto port",
          "7:30 AM — Bangka to Ticao Island (approximately 45 minutes from the departure port; departure subject to weather and sea conditions)",
          "9:00 AM — Ticao Island Manta Bowl: dive or snorkel excursion in the Ticao Pass; manta rays may be present seasonally (sightings cannot be guaranteed; dive and sea conditions confirmed with local operator)",
          "12:00 PM — Packed lunch on Ticao Island or aboard the bangka",
          "2:00 PM — Ticao Island beach and coastal scenery",
          "4:00 PM — Bangka return to Masbate City area",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Kalanay Cave, Mobo, and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive to Mobo, Masbate (approximately 1 hour from Masbate City)",
          "9:30 AM — Kalanay Cave: guided visit to the pre-colonial limestone burial site; one of the Philippines' significant prehistoric archaeological heritage sites with burial jar finds",
          "11:30 AM — Return drive to Masbate City",
          "12:30 PM — Lunch in Masbate City before departure",
          "2:00 PM — Masbate City market: local dried fish, regional goods, and pasalubong",
          "3:30 PM — Transfer to Masbate Airport for departure flight",
        ],
      },
    ],
  },

  "Misamis Occidental": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Ozamiz City / Oroquieta City, Misamis Occidental (via Ozamiz Airport)",
    transport:
      "Fly from Manila to Ozamiz Airport (approximately 1.5 hours) or Laguindingan Airport (approximately 2 hours), then travel by van to Oroquieta City (approximately 1 hour from Ozamiz).",
    bestFor: "Coastal wetland and mangrove travelers, heritage church seekers, Panguil Bay landscape groups, northern Mindanao off-the-beaten-track routes",
    costingNote:
      "Package rates are inquiry-based. Baliangao Protected Landscape and Seascape birdwatching and mangrove access require coordination with the DENR protected area office. Lake Duminagat access requires local guide coordination.",
    supplierChecks: [
      "Hotel in Oroquieta City or Ozamiz City",
      "Baliangao Protected Landscape guide and DENR coordination",
      "Lake Duminagat local access coordination",
      "Fort Ozamiz heritage access",
      "Ozamiz Airport–Oroquieta City van transfer",
    ],
    highlights: [
      "Baliangao Protected Landscape and Seascape — mangrove forest, wetland birds, and coastal biodiversity reserve",
      "Fort Ozamiz (Fort Santiago ruins), Ozamiz City — Spanish-era colonial fortification overlooking Panguil Bay",
      "Lake Duminagat — small crater lake in the interior of Misamis Occidental",
      "Oroquieta City heritage church — St. John the Baptist Parish; colonial heritage in the provincial capital",
      "Panguil Bay coastal scenery — the bay separating Misamis Occidental from Lanao del Norte",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Ozamiz City Arrival — Fort Heritage and Panguil Bay",
        details: [
          "Morning — Arrive at Ozamiz Airport; check-in at hotel in Ozamiz City or Oroquieta City",
          "Afternoon — Ozamiz City heritage walk: Immaculate Conception Cathedral and Ozamiz City plaza",
          "3:00 PM — Fort Ozamiz (Fort Santiago ruins): Spanish colonial fortification overlooking Panguil Bay; heritage walk along the bay-facing walls",
          "5:00 PM — Panguil Bay coastal views: the bay separating Misamis Occidental and Lanao del Norte",
          "Evening — Dinner in Ozamiz City featuring northern Mindanao seafood and regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Baliangao Wetlands and Oroquieta City Heritage",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Drive to Baliangao (approximately 1 hour from Oroquieta City)",
          "9:30 AM — Baliangao Protected Landscape and Seascape: mangrove boardwalk, wetland birdwatching, and coastal biodiversity walk (DENR coordination required; local guide assists with bird identification)",
          "12:00 PM — Lunch in Baliangao or return to Oroquieta for lunch",
          "2:00 PM — Oroquieta City: St. John the Baptist Parish heritage church; city hall area and market",
          "4:00 PM — Lake Duminagat visit (if accessible with local guide): small crater lake in the Misamis Occidental interior",
          "Evening — Return to accommodation; dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Provincial Market and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Oroquieta City public market: local Misamis Occidental produce, fisheries, and regional goods",
          "10:00 AM — Coastal drive through Jimenez or Sinacaban toward Ozamiz",
          "12:00 PM — Lunch in Ozamiz City before departure",
          "1:30 PM — Transfer to Ozamiz Airport for return flight",
        ],
      },
    ],
  },

  "Misamis Oriental": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Cagayan de Oro City (gateway to Misamis Oriental, via Laguindingan Airport)",
    transport:
      "Fly from Manila to Laguindingan Airport, Misamis Oriental (approximately 2 hours). Laguindingan Airport is located within Misamis Oriental province. Transfer by van to Cagayan de Oro City (approximately 45 minutes) or directly to provincial towns.",
    bestFor: "Adventure and nature travelers, highland and coastal combination groups, northern Mindanao heritage seekers, wildlife reserve visitors",
    costingNote:
      "Package rates are inquiry-based. Initao-Libertad Protected Area visits require coordination with the DENR protected area office. White-water rafting on the Cagayan de Oro River must be booked with accredited local operators.",
    supplierChecks: [
      "Hotel in Cagayan de Oro City",
      "Cagayan de Oro white-water rafting accredited operator",
      "Jasaan Mainit Hot Spring access and local transport",
      "Initao-Libertad Protected Area DENR guide coordination",
      "Laguindingan Airport–CDO van transfer",
    ],
    highlights: [
      "Cagayan de Oro River white-water rafting — one of the Philippines' premier adventure rafting experiences on Class II–III rapids",
      "Jasaan Mainit Hot Spring — natural geothermal pools beside a river in Jasaan, Misamis Oriental",
      "Initao-Libertad Protected Landscape and Seascape — coastal forest, cave complex, and marine ecosystem reserve",
      "Macajalar Bay coastal scenery — the bay fronting Misamis Oriental's western coast",
      "Laguindingan Airport surroundings — Misamis Oriental's gateway area overlooking the coast",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Laguindingan Arrival — Macajalar Bay and CDO Orientation",
        details: [
          "Morning — Arrive at Laguindingan Airport, Misamis Oriental; van transfer to Cagayan de Oro City (approximately 45 minutes)",
          "Noon — Check-in at hotel in Cagayan de Oro City",
          "Afternoon — Cagayan de Oro City orientation: San Agustin Cathedral, Museo de Oro (regional museum), and city plaza",
          "4:30 PM — El Salvador City coastal drive: Macajalar Bay shoreline and fishing village scenery",
          "Evening — Dinner in Cagayan de Oro featuring northern Mindanao regional cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "CDO White-Water Rafting and Jasaan Hot Springs",
        details: [
          "7:00 AM — Breakfast at the hotel",
          "8:00 AM — Cagayan de Oro River white-water rafting: Class II–III rapids with an accredited rafting operator (approximately 2–3 hours on the river)",
          "11:30 AM — Freshen up",
          "12:30 PM — Lunch in CDO or along the road to Jasaan",
          "2:00 PM — Drive to Jasaan, Misamis Oriental (approximately 45 minutes from CDO)",
          "3:00 PM — Jasaan Mainit Hot Spring: natural geothermal pools beside the river; soak and relax",
          "5:30 PM — Return to CDO",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Initao Protected Area and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive to Initao, Misamis Oriental (approximately 45 minutes from CDO)",
          "9:30 AM — Initao-Libertad Protected Landscape and Seascape: coastal forest cave complex; guided trail through the protected reserve (DENR coordination required)",
          "11:30 AM — Return drive toward Laguindingan Airport",
          "1:00 PM — Lunch near the airport before departure",
          "2:30 PM — Transfer to Laguindingan Airport for return flight",
        ],
      },
    ],
  },

  "Mountain Province": {
    duration: "4 Days / 3 Nights",
    gatewayBase: "Bontoc / Sagada, Mountain Province (via overnight bus from Manila or Banaue connection)",
    transport:
      "Overnight bus from Manila to Sagada or Bontoc (approximately 8–10 hours via Florida Bus or Coda Lines departing Cubao or Sampaloc terminals). Alternatively, travel via Banaue, Ifugao and onward to Sagada by jeepney (approximately 3 hours). Within Mountain Province, jeepney or van hire between Sagada and Bontoc (approximately 45 minutes).",
    bestFor: "Highland Cordillera heritage travelers, cave trekkers, hanging coffins cultural seekers, sunrise landscape photographers, slow highland journeys",
    costingNote:
      "Package rates are inquiry-based. Sumaguing Cave requires a registered local guide and spelunking equipment rental. Kiltepan sunrise views depend on weather and cloud cover — clear conditions cannot be guaranteed. Bomod-ok Falls involves a 45-minute trek through rice terrace footpaths.",
    supplierChecks: [
      "Accommodation in Sagada (inn or guesthouse)",
      "Registered Sagada local guide for cave tours and burial cliff routes",
      "Bontoc Museum visit coordination",
      "Maligcong Rice Terraces guide if trekking",
      "Overnight bus Manila–Sagada booking",
    ],
    highlights: [
      "Sagada Hanging Coffins — ancient Kankana-ey burial practice; coffins lodged in Echo Valley limestone cliffs",
      "Sumaguing Cave — large underground cave with limestone formations, boulders, and a river passage",
      "Kiltepan Viewpoint — pre-dawn sunrise above a sea of clouds over the Mountain Province peaks",
      "Bontoc Museum — comprehensive ethnographic museum documenting Mountain Province's indigenous cultural groups",
      "Bomod-ok (Big) Falls — waterfall reached by trekking through active rice terraces near Sagada",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Overnight Bus Arrival — Sagada Orientation and Echo Valley",
        details: [
          "Early morning — Arrive in Sagada by overnight bus from Manila",
          "Check-in at inn or guesthouse; freshen up and rest briefly",
          "9:00 AM — Sagada town orientation: St. Mary the Virgin Church (Episcopal mission church), Sagada visitor registration, and guide arrangement",
          "10:30 AM — Echo Valley and Hanging Coffins: guided walk to the cliff face where ancient Kankana-ey coffins are suspended on the limestone walls; cultural and historical context from the registered local guide",
          "12:00 PM — Lunch at a Sagada inn or local eatery: pinikpikan, etag, and Cordillera highland dishes",
          "2:00 PM — Lumiang Burial Cave: cave entrance holding ancient stacked coffins; cave approach with guide",
          "4:00 PM — Free afternoon: Sagada town walk, weaving shop browse, and highland village scenery",
          "Evening — Dinner in Sagada; guide briefing on next day's cave and falls route",
        ],
      },
      {
        day: "Day 2",
        title: "Sumaguing Cave and Bomod-ok Falls",
        details: [
          "7:00 AM — Breakfast at the inn",
          "8:00 AM — Sumaguing Cave: guided spelunking through the large cave chamber, stalactite and stalagmite formations, underground river passages, and boulder descent (helmet and guide lantern provided; physical fitness required)",
          "11:00 AM — Freshen up and rest",
          "12:00 PM — Lunch in Sagada",
          "1:30 PM — Trek to Bomod-ok (Big) Falls (approximately 45 minutes through active rice terraces and footpaths): waterfall with a natural pool for swimming",
          "4:30 PM — Return to Sagada",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Kiltepan Sunrise, Bontoc Museum, and Maligcong",
        details: [
          "5:00 AM — Kiltepan Viewpoint: pre-dawn drive to the sunrise viewpoint (weather-dependent; sea of clouds visibility varies seasonally and cannot be guaranteed)",
          "7:00 AM — Return to Sagada for breakfast",
          "9:00 AM — Drive to Bontoc (approximately 45 minutes from Sagada)",
          "10:00 AM — Bontoc Museum: comprehensive ethnographic museum documenting the Bontoc, Kankana-ey, Balangao, and neighboring Mountain Province cultural groups",
          "12:00 PM — Lunch in Bontoc town",
          "1:30 PM — Maligcong Rice Terraces: terraces near Bontoc with a quieter character; guided walk along the terrace walls and community path",
          "4:00 PM — Return to Sagada or overnight in Bontoc",
          "Evening — Final highland dinner; highland coffee and woven goods browsing",
        ],
      },
      {
        day: "Day 4",
        title: "Sagada Morning and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Sagada market and pasalubong: Cordillera woven goods, local coffee, etag (smoked pork), and highland crafts",
          "10:00 AM — Depart Sagada by bus or hired van toward Manila or toward airport connection",
        ],
      },
    ],
  },

  "Negros Oriental": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Dumaguete City, Negros Oriental (Sibulan Airport)",
    transport:
      "Fly from Manila to Dumaguete Airport, Sibulan (approximately 1.5 hours) via Cebu Pacific or Philippine Airlines. Alternatively, ferry from Cebu City to Dumaguete (approximately 3 hours). Within the province, travel by van or tricycle to surrounding destinations.",
    bestFor: "Marine sanctuary divers and snorkelers, highland lake trekkers, Dumaguete city culture and food travelers, university heritage groups",
    costingNote:
      "Package rates are inquiry-based. Apo Island Marine Reserve requires a reservation through the local government of Dauin; boat access and reserve entry are subject to daily visitor limits and weather conditions.",
    supplierChecks: [
      "Hotel in Dumaguete City",
      "Apo Island Marine Reserve reservation and bangka hire from Malatapay or Dauin",
      "Casaroro Falls local guide in Valencia",
      "Dumaguete–Valencia van transfer and local guide",
      "Bais City dolphin-watching operator if included",
    ],
    highlights: [
      "Apo Island Marine Reserve — world-class marine sanctuary with sea turtles and rich coral gardens",
      "Rizal Boulevard, Dumaguete City — the city's beloved seaside promenade with a relaxed provincial cafe culture",
      "Twin Lakes, Valencia — Lake Balanan and Lake Danao; highland crater lakes above Dumaguete",
      "Casaroro Falls, Valencia — dramatic narrow waterfall reached by steps and a short forest trek",
      "Silliman University campus — the oldest Protestant university in Asia; heritage buildings and anthropology museum",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Dumaguete City Arrival — Boulevard and Silliman Heritage",
        details: [
          "Morning — Arrive at Dumaguete Airport, Sibulan; transfer to hotel in Dumaguete City",
          "Noon — Check-in and rest",
          "1:30 PM — Rizal Boulevard promenade: Dumaguete's beloved seaside boulevard with cafes, heritage gazebo, and Visayan island views",
          "3:00 PM — Silliman University campus: the oldest Protestant university in Asia; historic campus buildings, anthropology museum, and university grounds walk",
          "5:00 PM — Dumaguete Cathedral (St. Catherine of Alexandria Cathedral): Spanish colonial heritage church facing the city plaza",
          "Evening — Dinner in Dumaguete City featuring Negrense cuisine; silvanas local pastry for dessert",
        ],
      },
      {
        day: "Day 2",
        title: "Apo Island Marine Reserve",
        details: [
          "6:00 AM — Early breakfast and depart for Malatapay or Dauin (approximately 30 minutes from Dumaguete City)",
          "7:30 AM — Bangka to Apo Island Marine Reserve (approximately 30 minutes; subject to weather and sea conditions)",
          "8:30 AM — Snorkeling at Apo Island: sea turtles, rich coral gardens, and diverse reef fish in one of the Philippines' premier marine sanctuaries (marine wildlife may be encountered but cannot be guaranteed)",
          "12:00 PM — Packed lunch on Apo Island",
          "1:30 PM — Free time on the island: additional snorkeling, village exploration, or beach rest",
          "3:30 PM — Bangka return to mainland; van to Dumaguete City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Valencia Twin Lakes, Casaroro Falls, and Departure",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Drive to Valencia, Negros Oriental (approximately 30 minutes from Dumaguete City)",
          "9:00 AM — Twin Lakes, Valencia: Lake Balanan and Lake Danao; highland crater lake views amid forested hillsides",
          "10:30 AM — Casaroro Falls, Valencia: descent by steps and a short forest trek to the dramatic narrow falls and pool",
          "12:30 PM — Lunch in Valencia or Dumaguete City",
          "2:00 PM — Dumaguete City pasalubong: silvanas, otap, and local Negros Oriental products",
          "3:30 PM — Transfer to Dumaguete Airport for return flight",
        ],
      },
    ],
  },

  "Northern Samar": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Catarman, Northern Samar (Catarman Airport)",
    transport:
      "Fly from Manila to Catarman Airport, Northern Samar (approximately 1.5 hours) via Cebu Pacific or Philippine Airlines. Alternatively, fly to Tacloban, Leyte and travel north by bus (approximately 3–4 hours to Catarman). Biri Island requires a bangka from Allen, Northern Samar (approximately 20–30 minutes; weather-dependent).",
    bestFor: "Coastal rock formation travelers, remote Eastern Visayas island seekers, heritage church groups, raw Pacific coastline enthusiasts",
    costingNote:
      "Package rates are inquiry-based. Biri Island bangka access depends on weather and sea conditions. Visits to Biri rock formations involve uneven terrain and open sea crossings — confirmed with local operators before departure.",
    supplierChecks: [
      "Hotel or pension in Catarman",
      "Allen–Biri Island bangka hire and local guide",
      "Local van hire for Catarman heritage circuit and Allen route",
      "Catarman Airport transfer coordination",
    ],
    highlights: [
      "Biri Island (Biri-Larosa Protected Landscape) — dramatic basalt rock formations sculpted by millennia of Pacific wave action",
      "Allen coastal area — gateway township with Northern Samar bay and strait views",
      "Catarman heritage church — St. John the Baptist Parish; capital town colonial heritage",
      "Northern Samar Pacific coastline — raw eastern Samar coast facing the open Pacific Ocean",
      "Laoang Island township — historic island municipality in the Eastern Samar Sea",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Catarman Arrival — Capital Heritage and Coastal Orientation",
        details: [
          "Morning — Arrive at Catarman Airport; check-in at hotel or pension in Catarman",
          "Afternoon — Catarman town heritage walk: St. John the Baptist Parish church, provincial capitol grounds, and Northern Samar market area",
          "3:30 PM — Catarman coastal drive: Northern Samar bay views and fishing community",
          "Evening — Dinner in Catarman featuring Northern Samar seafood and local dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Biri Island — Pacific Rock Formations",
        details: [
          "7:00 AM — Breakfast",
          "8:00 AM — Drive to Allen, Northern Samar (approximately 1.5 hours from Catarman)",
          "9:30 AM — Bangka to Biri Island (approximately 20–30 minutes from Allen; weather-dependent; sea conditions confirmed with local operator before departure)",
          "10:00 AM — Biri Island rock formations: guided walk through the unique basalt rock sculptures shaped by Pacific wave action — Binurong Point, Caranas, and other coastal formations",
          "12:30 PM — Packed lunch on Biri Island",
          "2:00 PM — Biri Island tidal pools and shoreline: explore the rock pools and coastal scenery between formations",
          "4:00 PM — Bangka return to Allen",
          "5:30 PM — Van return to Catarman",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Laoang Island and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive toward Laoang Island area (approximately 1.5 hours from Catarman): historic island municipality of Northern Samar",
          "10:30 AM — Northern Samar Pacific coastal road: undeveloped eastern coastline views facing the open Pacific",
          "12:00 PM — Lunch before return to Catarman",
          "1:30 PM — Return to Catarman; transfer to Catarman Airport for departure flight",
        ],
      },
    ],
  },

  "Nueva Ecija": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Cabanatuan City, Nueva Ecija",
    transport:
      "Bus from Manila (Cubao or Pasay) to Cabanatuan City via Genesis or Victory Liner (approximately 3–4 hours via NLEX). Private car via NLEX to the Cabanatuan exit. Within the province, van hire to Minalungao, Pantabangan, and heritage sites.",
    bestFor: "WWII heritage travelers, limestone gorge and reservoir seekers, Luzon agricultural heritage groups, families on heritage road trips from Manila",
    costingNote:
      "Package rates are inquiry-based. Minalungao National Park gorge activities require registration at the DENR park office in General Tinio. Pantabangan Lake boat activities are confirmed with local operators.",
    supplierChecks: [
      "Hotel in Cabanatuan City or San Jose City",
      "DENR registration at Minalungao National Park, General Tinio",
      "Pantabangan Lake bangka and floating cottage coordination",
      "Local van hire for provincial circuit",
      "Cabanatuan National Shrine local guide",
    ],
    highlights: [
      "Minalungao National Park — limestone canyon gorge along the Peñaranda River in General Tinio",
      "Pantabangan Dam and Reservoir — one of Luzon's largest reservoirs; lake scenery in the Sierra Madre foothills",
      "Cabanatuan National Shrine — WWII memorial at the site of Camp Pangatian prisoner-of-war compound",
      "Gabaldon School Buildings — heritage schoolhouses; National Cultural Treasures in several Nueva Ecija municipalities",
      "Nueva Ecija rice plain — the 'Rice Granary of the Philippines'; sweeping lowland agricultural landscape",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Cabanatuan City — WWII Heritage Arrival",
        details: [
          "Morning — Depart Manila by bus or private car (approximately 3–4 hours via NLEX)",
          "Late morning — Arrive in Cabanatuan City; check-in at hotel",
          "1:00 PM — Lunch in Cabanatuan City",
          "2:30 PM — Cabanatuan National Shrine: WWII memorial at the site of Camp Pangatian, where Filipino and American prisoners of war were held during the Japanese occupation; heritage museum and grounds",
          "4:30 PM — Cabanatuan City heritage church (St. Nicholas of Tolentino Cathedral) and city plaza walk",
          "Evening — Dinner in Cabanatuan City featuring Nueva Ecija rice-country cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Minalungao Gorge and Pantabangan Reservoir",
        details: [
          "7:00 AM — Breakfast",
          "8:00 AM — Drive to General Tinio for Minalungao National Park (approximately 1 hour from Cabanatuan City)",
          "9:00 AM — Minalungao National Park: limestone gorge along the Peñaranda River; swimming in the gorge pool, bamboo rafting, and gorge walk (DENR registration required at park entrance)",
          "12:00 PM — Packed lunch at the park or nearby General Tinio",
          "2:00 PM — Drive to Pantabangan (approximately 1.5 hours from General Tinio)",
          "3:30 PM — Pantabangan Dam and Reservoir: views of the Sierra Madre-framed reservoir; bangka or floating cottage on the lake",
          "6:00 PM — Return to Cabanatuan City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Gabaldon Heritage and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Gabaldon School Building visit: one of the heritage Gabaldon schoolhouses (National Cultural Treasure) in a nearby Nueva Ecija municipality",
          "10:00 AM — Nueva Ecija rice plain drive: the sweeping paddy landscape of one of the Philippines' most productive rice provinces",
          "11:30 AM — Cabanatuan City market: local rice, longganisa, and Nueva Ecija regional goods",
          "1:00 PM — Lunch before departure",
          "2:30 PM — Depart by bus or private car back to Manila (approximately 3–4 hours)",
        ],
      },
    ],
  },

  "Nueva Vizcaya": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Bayombong, Nueva Vizcaya",
    transport:
      "Bus from Manila to Bayombong via Partas, Victory Liner, or Dalin (approximately 7–8 hours via the Cagayan Valley Road). Alternatively, fly to Cauayan Airport, Isabela and travel south by van to Bayombong (approximately 2.5 hours).",
    bestFor: "Cave and geological heritage travelers, Cordillera gateway groups, highland river landscape seekers, birdwatching travelers",
    costingNote:
      "Package rates are inquiry-based. Capisaan Cave in Kasibu requires a registered local guide and coordination with the DENR. Sections of the cave system involve river wading and moderate spelunking; physical fitness and appropriate footwear are required.",
    supplierChecks: [
      "Hotel in Bayombong",
      "Capisaan Cave registered guide and DENR coordination in Kasibu",
      "Local van hire for Kasibu and provincial circuit",
      "Diadi Wetland birdwatching guide coordination",
      "Manila–Bayombong bus or Cauayan–Bayombong van transfer",
    ],
    highlights: [
      "Capisaan Cave, Kasibu — one of the largest limestone cave systems in Asia; underground river and cathedral chambers",
      "Bayombong Heritage Church (Our Lady of Purification Parish) — National Cultural Treasure; colonial church in the provincial capital",
      "Magat River valley — scenic highland river valley cutting through the Caraballo Mountains",
      "Diadi Wetland Bird Sanctuary — lowland wetland with migratory and endemic bird species",
      "Cordillera gateway highway — Nueva Vizcaya's mountain road connecting the Luzon lowlands to the Cordillera highlands",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Bayombong — Cagayan Valley Gateway Arrival",
        details: [
          "Depart Manila by bus (approximately 7–8 hours via Cagayan Valley Road)",
          "Arrive in Bayombong; check-in at hotel; rest and freshen up",
          "Afternoon — Bayombong Heritage Church (Our Lady of Purification Parish): National Cultural Treasure; colonial church with a well-preserved facade and heritage interior",
          "3:30 PM — Bayombong town plaza and Magat River bridge: highland river scenery at the provincial capital",
          "Evening — Dinner in Bayombong featuring Cagayan Valley highland cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Capisaan Cave, Kasibu",
        details: [
          "7:00 AM — Breakfast",
          "8:00 AM — Drive to Kasibu, Nueva Vizcaya (approximately 1.5 hours from Bayombong via mountain road)",
          "9:30 AM — Capisaan Cave: guided exploration of one of the largest limestone cave systems in Asia; underground river passages, cathedral chambers, and stalactite and stalagmite formations (river wading and moderate physical exertion required; DENR registration required)",
          "1:00 PM — Packed lunch in Kasibu area",
          "3:00 PM — Return drive toward Bayombong via Magat River valley scenic road",
          "Evening — Arrive in Bayombong; dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Diadi Wetland and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Diadi, Nueva Vizcaya (approximately 30 minutes from Bayombong): Diadi Wetland Bird Sanctuary; wetland walk with birdwatching (migratory and endemic species; birdwatching guide recommended)",
          "10:30 AM — Cordillera gateway highway scenic drive: highland valley views toward Ifugao and Mountain Province",
          "12:00 PM — Lunch before departure",
          "1:30 PM — Depart Bayombong by bus toward Manila or van to Cauayan Airport",
        ],
      },
    ],
  },

  "Occidental Mindoro": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Mamburao / Sablayan, Occidental Mindoro (via San Jose Airport or Batangas ferry)",
    transport:
      "Fly from Manila to San Jose Airport, Occidental Mindoro (approximately 1 hour) via Cebu Pacific or Philippine Airlines, then travel by van north to Sablayan or Mamburao. Alternatively, ferry from Batangas Port to Abra de Ilog, Occidental Mindoro (approximately 3–4 hours). Apo Reef requires a bangka from Sablayan (approximately 2–3 hours at sea; weather-dependent).",
    bestFor: "World-class reef divers and snorkelers, Tamaraw wildlife heritage seekers, remote island Mindoro travelers, conservation-minded nature groups",
    costingNote:
      "Package rates are inquiry-based. Apo Reef Natural Park access requires a DENR permit and a registered dive or snorkel operator in Sablayan. Sea crossings to Apo Reef are weather-dependent and cannot be attempted in unfavorable conditions — access cannot be guaranteed on a fixed schedule.",
    supplierChecks: [
      "Hotel or guesthouse in Sablayan or Mamburao",
      "Apo Reef Natural Park DENR permit and accredited dive or snorkel operator in Sablayan",
      "Mt. Iglit-Baco National Park guide and DENR coordination for Tamaraw area",
      "San Jose Airport–Sablayan/Mamburao van transfer",
      "Manila–San Jose flight or Batangas–Abra de Ilog ferry booking",
    ],
    highlights: [
      "Apo Reef Natural Park — one of the world's largest contiguous coral reef systems; world-class diving and snorkeling in a DENR-protected marine park",
      "Mt. Iglit-Baco National Park — protected habitat of the Critically Endangered Tamaraw, an endemic Mindoro dwarf buffalo",
      "Sablayan coastal area — the jump-off town for Apo Reef with a relaxed western Mindoro atmosphere",
      "Mamburao town — the Occidental Mindoro provincial capital on the northern coast",
      "Ambulong Island — coastal island near Mamburao with unspoiled beach and reef",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Occidental Mindoro — Sablayan Coastal Orientation",
        details: [
          "Morning — Arrive at San Jose Airport; van transfer north to Sablayan (approximately 1–1.5 hours)",
          "Noon — Check-in at guesthouse in Sablayan; orientation with dive or snorkel operator for Apo Reef route",
          "Afternoon — Sablayan town: coastal promenade, Sablayan Bay views, and local market",
          "3:30 PM — Sablayan Prison Farm grounds: working farm settlement with a scenic agricultural and coastal setting",
          "Evening — Dinner in Sablayan featuring western Mindoro seafood and regional dishes; guide briefing on Apo Reef boat departure conditions",
        ],
      },
      {
        day: "Day 2",
        title: "Apo Reef Natural Park",
        details: [
          "5:30 AM — Pre-dawn departure for Apo Reef by bangka from Sablayan Port (approximately 2–3 hours at sea; departure subject to weather and sea conditions)",
          "8:00 AM — Arrive at Apo Reef Natural Park: DENR ranger briefing and check-in",
          "8:30 AM — Reef diving or snorkeling: explore the vast shallow and deep reef systems with diverse marine life, sea turtles, reef sharks, and abundant coral gardens (sea conditions and visibility vary; access subject to DENR regulations and weather)",
          "12:00 PM — Packed lunch on the reef islet or aboard the bangka",
          "1:30 PM — Second dive or snorkel session at a different reef section",
          "3:00 PM — Begin return journey to Sablayan",
          "6:00 PM — Arrive in Sablayan; dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Mt. Iglit-Baco National Park Area and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive toward Mt. Iglit-Baco National Park gate area (approximately 1 hour from Sablayan): protected highland habitat of the Critically Endangered Tamaraw (Bubalus mindorensis); park gate orientation with DENR ranger (interior access and Tamaraw sightings require advance DENR coordination and cannot be guaranteed)",
          "11:00 AM — Return toward San Jose, Occidental Mindoro",
          "1:00 PM — Lunch in San Jose before departure",
          "2:30 PM — Transfer to San Jose Airport for return flight to Manila",
        ],
      },
    ],
  },

  Pangasinan: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Dagupan City / Alaminos City, Pangasinan",
    transport:
      "Bus from Manila (Cubao or Pasay) to Dagupan City or Alaminos City via Five Star, Victory Liner, or Partas (approximately 4–5 hours via TPLEX). Private car via NLEX-TPLEX to the Pangasinan exits. Local van hire between Dagupan, Lingayen, and Alaminos.",
    bestFor: "Heritage pilgrimage travelers, coastal and island day-trippers, food-culture groups, central Luzon heritage routes, families on accessible north Luzon getaways",
    costingNote:
      "Package rates are inquiry-based. Hundred Islands boat rentals and island landing fees are confirmed with registered banca operators and the Alaminos City Tourism Office. Boat access to individual islands is subject to weather and sea conditions.",
    supplierChecks: [
      "Hotel in Dagupan City or Alaminos City",
      "Registered banca operator at Lucap Wharf, Alaminos City for Hundred Islands access",
      "Our Lady of Manaoag Shrine guide or local orientation coordination",
      "Local van hire for Pangasinan provincial circuit",
      "Lingayen Gulf heritage orientation guide",
    ],
    highlights: [
      "Hundred Islands National Park, Alaminos — 124 islands and islets in a protected coastal landscape; boat-accessible marine park",
      "Our Lady of Manaoag Shrine, Manaoag — one of the most visited Marian pilgrimage churches in northern Luzon",
      "Dagupan City bangus culture — the milkfish aquaculture capital of the Philippines",
      "Lingayen Gulf heritage — WWII Allied liberation landing site with provincial capitol grounds and coastal scenery",
      "Calasiao puto — Pangasinan's celebrated traditional steamed rice cakes, made in the town of Calasiao",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Pangasinan — Pilgrimage, Gulf Heritage, and Arrival",
        details: [
          "Morning — Depart Manila by bus or private car toward Pangasinan (approximately 4–5 hours via TPLEX)",
          "En route stop in Manaoag (approximately 3.5–4 hours from Manila): Our Lady of Manaoag Shrine; pilgrimage visit to the centuries-old Marian church and grounds",
          "Afternoon — Continue to Lingayen: Pangasinan Provincial Capitol grounds, Lingayen Gulf coastal walk, and WWII liberation landing site orientation",
          "4:30 PM — Drive to Dagupan City (approximately 15 minutes from Lingayen); check-in at hotel",
          "Evening — Dinner in Dagupan City featuring bangus dishes and Pangasinense regional cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Hundred Islands National Park, Alaminos",
        details: [
          "7:00 AM — Breakfast and depart for Alaminos City (approximately 1 hour from Dagupan City)",
          "8:30 AM — Lucap Wharf, Alaminos: register banca, arrange island landing fees, and depart for Hundred Islands National Park (subject to sea conditions and park office confirmation)",
          "9:00 AM — Children's Island: snorkeling, swimming, and coral reef viewing in the park's most accessible area",
          "10:30 AM — Governor's Island: limestone cliff formation, stairway, and panoramic views over the island cluster",
          "11:30 AM — Quezon Island: main picnic island with beach and park facilities",
          "1:00 PM — Lunch at a Lucap Village seaside eatery or packed lunch on the island",
          "2:30 PM — Additional island stops at the banca guide's direction (subject to sea conditions and visitor preference)",
          "4:30 PM — Return to Lucap Wharf; van back to Dagupan City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Dagupan Food Culture, Calasiao, and Departure",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Dagupan City market area: fresh bangus from the fishpond belt; milkfish aquaculture landscape and local seafood market",
          "10:00 AM — Calasiao, Pangasinan (approximately 20 minutes from Dagupan): visit a traditional puto producer; browse and purchase the town's celebrated steamed rice cakes",
          "11:30 AM — Bonuan Blue Beach, Dagupan: Lingayen Gulf-facing beach community and shoreline walk",
          "1:00 PM — Lunch featuring Pangasinense specialties: bangus sa tausi, pigar-pigar, or fresh Lingayen Gulf fish dishes",
          "2:30 PM — Depart by bus or private car back to Manila (approximately 4–5 hours via TPLEX)",
        ],
      },
    ],
  },

  Quirino: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Cabarroguis, Quirino (via Cauayan Airport, Isabela or overnight bus from Manila)",
    transport:
      "Fly from Manila to Cauayan Airport, Isabela (approximately 1.5 hours), then travel by van to Cabarroguis, Quirino (approximately 2 hours via the Isabela–Quirino road). Alternatively, overnight bus from Manila to Cabarroguis (approximately 9–10 hours via the Cagayan Valley Road). Roads into interior Quirino municipalities may require a sturdy vehicle.",
    bestFor: "Eco-tourism and cave heritage travelers, highland river and countryside seekers, remote Cagayan Valley interior groups, small adventurous travel groups",
    costingNote:
      "Package rates are inquiry-based. Aglipay Cave exploration requires a registered local guide and prior coordination with the municipal tourism office. River and waterfall access within the province is subject to weather, water levels, and guide confirmation.",
    supplierChecks: [
      "Hotel or guesthouse in Cabarroguis or Diffun",
      "Aglipay Cave registered local guide and Aglipay municipal tourism coordination",
      "River or nature trail guide and safety confirmation for any water activity",
      "Local van hire for interior Quirino routes",
      "Cauayan Airport–Cabarroguis van transfer or overnight bus Manila–Cabarroguis",
    ],
    highlights: [
      "Aglipay Caves, Aglipay — extensive limestone cave system in Quirino's eastern interior municipality",
      "Quirino highland river valleys — forested river corridors cutting through the Sierra Madre foothills",
      "Cabarroguis town center — the quiet provincial capital at the heart of the Cagayan Valley corridor",
      "Diffun market town — the province's main commercial hub and agricultural trade center",
      "Quirino Protected Landscape — upland forested ecosystem along the Sierra Madre biodiversity corridor",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Cauayan to Cabarroguis — Highland Province Arrival",
        details: [
          "Morning — Arrive at Cauayan Airport, Isabela; van transfer to Cabarroguis, Quirino (approximately 2 hours)",
          "Noon — Check-in at guesthouse; rest and freshen up",
          "Afternoon — Cabarroguis town orientation: provincial capitol, cultural center area, and highland valley views",
          "3:30 PM — Cabarroguis riverside walk: river scenery at the provincial capital and introduction to the Quirino highland community character",
          "Evening — Dinner in Cabarroguis featuring Cagayan Valley highland regional cuisine; guide briefing on the next day's cave route",
        ],
      },
      {
        day: "Day 2",
        title: "Aglipay Caves and Highland River Scenery",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Drive to Aglipay municipality (approximately 1 hour from Cabarroguis)",
          "9:30 AM — Aglipay Caves: guided tour of the limestone cave complex with a registered local guide; multi-chamber passages and cave formations (exploration depth subject to current conditions and guide assessment)",
          "12:00 PM — Packed lunch in the Aglipay area",
          "2:00 PM — Highland river valley scenic drive: forested river corridor through the Quirino interior toward Diffun",
          "4:00 PM — Diffun market: the main commercial center of Quirino; local produce, highland goods, and regional trade character",
          "Evening — Return to Cabarroguis; dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Quirino Countryside and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Quirino upland countryside drive: scenic highland roads through forested slopes and farming communities along the Sierra Madre corridor",
          "10:30 AM — Final market stop in Cabarroguis: local crafts, upland produce, and regional goods",
          "12:00 PM — Lunch before departure",
          "1:30 PM — Depart by van to Cauayan Airport (approximately 2 hours) for return flight, or depart by bus toward Manila",
        ],
      },
    ],
  },

  Pampanga: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "San Fernando City, Pampanga",
    transport:
      "Bus from Manila (Cubao or Pasay) to San Fernando via Five Star, Genesis, or Philippine Rabbit (approximately 1.5–2 hours via NLEX). Private car via NLEX to the San Fernando/Pampanga exit. Local tricycle or van hire between heritage sites within the province.",
    bestFor: "Heritage church travelers, Kapampangan food-culture groups, culinary heritage tours, Central Luzon day-trip and extended heritage routes",
    costingNote:
      "Package rates are inquiry-based. Kapampangan culinary experiences and heritage house visits are confirmed locally with tour operators or through the San Fernando and Angeles City tourism offices.",
    supplierChecks: [
      "Hotel in San Fernando City or Angeles City",
      "Betis and Bacolor church heritage guide",
      "Angeles City culinary trail operator or local guide",
      "Kapampangan crafts artisan studio coordination",
      "San Fernando City–Angeles City local transport",
    ],
    highlights: [
      "Betis Church (San Guillermo Parish, Betis, Guagua) — National Cultural Treasure; ornately carved 17th-century baroque church interior",
      "Bacolor Church (St. Augustine Parish) — Spanish colonial church partially buried by Mt. Pinatubo lahar in 1991; a heritage and disaster-memory landmark",
      "Kapampangan culinary heritage — sisig, kare-kare, morcon, and Pampanga's living tradition as a Philippine food capital",
      "San Fernando City heritage — the Pampanga provincial capital with colonial-era churches and the Giant Lantern Festival tradition",
      "Angeles City food and culture trail — Kapampangan culinary identity and multicultural heritage hub",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Pampanga — Bacolor, Betis, and San Fernando Heritage",
        details: [
          "Morning — Depart Manila by bus or private car (approximately 1.5–2 hours via NLEX)",
          "10:00 AM — Bacolor, Pampanga: St. Augustine Parish Church; the partially lahar-buried Spanish colonial church from the 1991 Mt. Pinatubo eruption; grounds walk and heritage context",
          "11:30 AM — Betis, Guagua: San Guillermo Parish Church (Betis Church); National Cultural Treasure with ornately carved baroque interior; heritage walk and guide",
          "1:00 PM — Lunch in the Betis or Guagua area featuring Kapampangan cuisine",
          "3:00 PM — San Fernando City: Immaculate Conception Parish Church and city plaza heritage walk",
          "5:00 PM — Check-in at hotel in San Fernando City",
          "Evening — Dinner in San Fernando featuring Kapampangan regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Angeles City Culinary Heritage and Kapampangan Culture",
        details: [
          "8:00 AM — Breakfast at the hotel",
          "9:00 AM — Drive to Angeles City (approximately 20 minutes from San Fernando)",
          "10:00 AM — Angeles City heritage walk: Holy Rosary Parish Church and historic district orientation",
          "11:00 AM — Kapampangan culinary experience: market visit and heritage restaurant lunch featuring sisig, kare-kare, morcon, and Kapampangan specialties (confirmed with local culinary guide or restaurant advance reservation)",
          "1:30 PM — Kapampangan crafts studio: visit a local woodcarving, parol-making, or mask-crafting artisan (subject to advance coordination and current operating schedule)",
          "3:30 PM — Angeles City heritage exhibits: cultural context on Kapampangan history and pre-war urban heritage",
          "Evening — Dinner in Angeles City; return to San Fernando for the night",
        ],
      },
      {
        day: "Day 3",
        title: "San Fernando Heritage, Pasalubong, and Departure",
        details: [
          "8:00 AM — Breakfast and check-out",
          "9:00 AM — San Fernando City heritage stroll: Fernandino ancestral house facades and city landmarks",
          "10:30 AM — Pampanga pasalubong: local sweets (tibok-tibok, pastillas de leche), tocino, Giant Lantern replica crafts, and regional goods",
          "12:00 PM — Lunch in San Fernando City featuring Kapampangan dishes",
          "1:30 PM — Depart by bus or private car back to Manila (approximately 1.5–2 hours via NLEX)",
        ],
      },
    ],
  },

  Tarlac: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Tarlac City, Tarlac",
    transport:
      "Bus from Manila (Cubao or Pasay) to Tarlac City via Victory Liner, Genesis, or Philippine Rabbit (approximately 2.5–3 hours via NLEX-TPLEX). Private car via NLEX-TPLEX to the Tarlac exit. Local van hire for Capas, San Jose, and Bamban routes.",
    bestFor: "WWII heritage travelers, pilgrimage and spiritual retreat groups, Central Luzon historical routes, families on multi-province road trips",
    costingNote:
      "Package rates are inquiry-based. Monasterio de Tarlac has designated visiting hours that should be confirmed in advance. Bamban indigenous community visits require prior coordination with local guides and community representatives.",
    supplierChecks: [
      "Hotel in Tarlac City",
      "Monasterio de Tarlac visiting schedule advance confirmation",
      "Capas National Shrine local heritage guide",
      "Bamban Aeta community guide and prior coordination",
      "Local van hire for Capas, San Jose, and Bamban routes",
    ],
    highlights: [
      "Capas National Shrine, Capas — WWII memorial at Camp O'Donnell; honors the Filipino and American prisoners who died during and after the Bataan Death March",
      "Monasterio de Tarlac, San Jose — mountaintop pilgrimage monastery on Mt. Resurrection, housing a Relic of the True Cross",
      "Tarlac City heritage — the provincial capital with a Spanish-era church and Central Luzon lowland character",
      "Bamban Aeta communities — indigenous Aeta peoples of the Mt. Pinatubo corridor in western Tarlac",
      "Tarlac agricultural plain — sugarcane, rice, and corn farming landscape of the Central Luzon basin",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Tarlac — Capas National Shrine and City Arrival",
        details: [
          "Morning — Depart Manila by bus or private car (approximately 2.5–3 hours via NLEX-TPLEX)",
          "10:30 AM — Capas, Tarlac: Capas National Shrine at Camp O'Donnell; WWII memorial for the Filipino and American prisoners who died during and after the Bataan Death March; heritage museum and grounds",
          "12:30 PM — Lunch in Capas or Tarlac City",
          "2:00 PM — Tarlac City: check-in at hotel",
          "3:30 PM — Tarlac City heritage walk: Tarlac Cathedral (St. John the Baptist Parish), city plaza, and provincial capitol grounds",
          "Evening — Dinner in Tarlac City featuring Central Luzon regional cuisine",
        ],
      },
      {
        day: "Day 2",
        title: "Monasterio de Tarlac Pilgrimage and Bamban Community",
        details: [
          "7:00 AM — Breakfast",
          "8:00 AM — Drive to San Jose, Tarlac for Monasterio de Tarlac (approximately 45 minutes from Tarlac City)",
          "9:00 AM — Monasterio de Tarlac, Mt. Resurrection: pilgrimage visit to the mountaintop monastery; Relic of the True Cross chapel; monastery grounds walk with panoramic Tarlac valley views (visiting schedule subject to current monastery operating hours; advance confirmation required)",
          "11:30 AM — Return drive to Tarlac City",
          "1:00 PM — Lunch in Tarlac City",
          "2:30 PM — Bamban, western Tarlac: Aeta community area in the Mt. Pinatubo corridor (community visit subject to prior guide arrangement and community consent; cultural protocols must be respected)",
          "5:00 PM — Return to Tarlac City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Tarlac Agricultural Landscape and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Tarlac agricultural plain drive: sugarcane and rice field landscape along the Central Luzon basin",
          "10:00 AM — Tarlac City market: local produce and Central Luzon pasalubong",
          "11:30 AM — Lunch before departure",
          "12:30 PM — Depart by bus or private car to Manila (approximately 2.5–3 hours via TPLEX-NLEX)",
        ],
      },
    ],
  },

  Zambales: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Olongapo City / San Antonio, Zambales (via NLEX-SCTEX from Manila)",
    transport:
      "Bus from Manila (Cubao or Pasay) to Olongapo City via Victory Liner (approximately 2.5–3 hours via NLEX-SCTEX). Private car via NLEX-SCTEX to the Olongapo exit. Van hire for Zambales coastal towns north of Subic. Anawangin Cove and Capones Island require a registered banca from San Antonio (subject to weather and sea conditions).",
    bestFor: "Coastal cove seekers, volcanic landscape travelers, island beach groups, Subic Bay heritage travelers, small group adventure routes",
    costingNote:
      "Package rates are inquiry-based. Anawangin Cove, Nagsasa Cove, and Capones Island boat access requires operator confirmation and is subject to weather, sea conditions, and environmental carrying capacity limits. Potipot Island bangka transfer is also weather-dependent.",
    supplierChecks: [
      "Hotel in Olongapo City or San Antonio, Zambales",
      "Registered banca operator in San Antonio for Anawangin, Capones, and nearby cove access",
      "Potipot Island bangka operator coordination in Candelaria",
      "Local van hire for Zambales coastal circuit",
      "SCTEX-to-Olongapo bus or private car arrangement",
    ],
    highlights: [
      "Anawangin Cove, San Antonio — volcanic ash shoreline with agoho pine trees in a sheltered cove; accessible by boat only",
      "Capones Island, San Antonio — lighthouse island with reef snorkeling; colonial-era lighthouse structure",
      "Potipot Island, Candelaria — small white-sand island with clear water accessible by bangka off the northern Zambales coast",
      "Olongapo City and Subic Bay — the former US naval base gateway town with Pacific War heritage context",
      "Zambales coastal highway — the provincial scenic road connecting Olongapo to Iba through beach towns and coastal communities",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Olongapo City — Heritage Orientation and Coastal Arrival",
        details: [
          "Morning — Depart Manila by bus or private car (approximately 2.5–3 hours via NLEX-SCTEX)",
          "Late morning — Arrive in Olongapo City; check-in at hotel",
          "Afternoon — Olongapo City orientation: Rizal Triangle Park and city heritage walk",
          "3:30 PM — Subic Bay coastal drive: panoramic bay views and WWII Pacific War heritage context",
          "Evening — Dinner in Olongapo City featuring Zambales seafood and regional dishes",
        ],
      },
      {
        day: "Day 2",
        title: "Anawangin Cove and Capones Island",
        details: [
          "6:30 AM — Early breakfast and depart for San Antonio, Zambales (approximately 30 minutes from Olongapo)",
          "7:30 AM — San Antonio port: board a registered banca for Anawangin Cove (sea conditions and operator confirmation required before departure)",
          "8:30 AM — Anawangin Cove: volcanic ash shoreline and agoho pine grove; swimming and beach relaxation in the sheltered cove",
          "11:00 AM — Capones Island: colonial-era lighthouse heritage structure; reef snorkeling in the surrounding waters (weather-dependent)",
          "1:00 PM — Packed lunch at Anawangin Cove or Capones beach area",
          "3:00 PM — Banca return to San Antonio port",
          "4:00 PM — Return to Olongapo City area",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Potipot Island and Zambales Coastal Road Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:00 AM — Drive north along the Zambales coastal road to Candelaria (approximately 1.5 hours from Olongapo City)",
          "9:30 AM — Potipot Island: bangka transfer from the Candelaria shoreline (approximately 5–10 minutes; weather-dependent); white-sand island beach and reef snorkeling",
          "12:30 PM — Packed lunch on Potipot Island or return to Candelaria for lunch",
          "2:00 PM — Iba town visit: brief stop at the Zambales provincial capital",
          "3:30 PM — Depart south along the Zambales coastal road back toward Manila via SCTEX (approximately 3–4 hours from Iba)",
        ],
      },
    ],
  },

  Rizal: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Antipolo City, Rizal",
    transport:
      "Drive from Manila via Marcos Highway or Ortigas Extension (approximately 30–45 minutes to Antipolo City depending on traffic). UV Express from Cubao to Antipolo. Van or private car required for Tanay, Pililla, Morong, and Binangonan routes within the province.",
    bestFor: "Art and pilgrimage travelers, waterfall and nature viewpoint seekers, heritage church groups, Metro Manila short-escape travelers, families on accessible provincial getaways",
    costingNote:
      "Package rates are inquiry-based. Masungi Georeserve requires an advance online reservation and a conservation fee; same-day access is not permitted. Daranak and Batlag Falls access is subject to current park conditions and water levels.",
    supplierChecks: [
      "Hotel or boutique inn in Antipolo City",
      "Pinto Art Museum advance ticket coordination",
      "Masungi Georeserve advance online reservation (required well before visit date)",
      "Local van hire for Tanay, Pililla, Angono, and Binangonan routes",
      "Daranak Falls entry and guide coordination in Tanay",
    ],
    highlights: [
      "Our Lady of Peace and Good Voyage Shrine, Antipolo — one of the most visited Marian pilgrimage churches in the Philippines",
      "Pinto Art Museum, Antipolo — hilltop contemporary Philippine art museum with open pavilion galleries and Laguna de Bay views",
      "Daranak and Batlag Falls, Tanay — twin waterfalls in the Tanay highland forest",
      "Pililla Windmills, Pililla — rows of wind turbines on the Sierra Madre ridge with sweeping Laguna de Bay views",
      "Angono Petroglyphs, Angono — National Cultural Treasure; prehistoric rock carvings estimated to be the oldest known work of art in the Philippines",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Antipolo Pilgrimage, Pinto Art Museum, and Hilltop Culture",
        details: [
          "Morning — Depart Manila by car or van (approximately 30–45 minutes to Antipolo City)",
          "10:00 AM — Our Lady of Peace and Good Voyage Shrine, Antipolo Cathedral: pilgrimage visit to the centuries-old Marian shrine; heritage chapel and grounds walk",
          "11:30 AM — Hinulugang Taktak National Park: waterfall park within Antipolo City; grounds walk and heritage orientation",
          "1:00 PM — Lunch at one of Antipolo's hilltop restaurants featuring views of Laguna de Bay or the Sierra Madre ridge",
          "3:00 PM — Pinto Art Museum: hilltop contemporary Philippine art museum with open-air pavilion galleries and a sculpture garden (visiting hours subject to current schedule; advance ticket recommended)",
          "5:30 PM — Antipolo ridgeline cafe culture: sunset views from Antipolo's hillside cafe district",
          "Evening — Dinner in Antipolo; check-in at inn",
        ],
      },
      {
        day: "Day 2",
        title: "Tanay Waterfalls and Pililla Windmills",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Drive to Tanay, Rizal (approximately 45 minutes from Antipolo City)",
          "9:30 AM — Daranak Falls, Tanay: swimming waterfall with a natural pool (access subject to current park conditions and water level)",
          "10:30 AM — Batlag Falls, Tanay: second waterfall accessible via a short forest trail from Daranak (guide recommended)",
          "12:30 PM — Lunch in Tanay town",
          "2:00 PM — Drive to Pililla, Rizal (approximately 45 minutes from Tanay)",
          "3:00 PM — Pililla Wind Farm: rows of wind turbines on the ridge above Laguna de Bay; panoramic lake and mountain views; photography stop",
          "5:00 PM — Return to Antipolo City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Angono Petroglyphs, Binangonan Heritage, and Departure",
        details: [
          "7:30 AM — Breakfast and check-out",
          "9:00 AM — Angono, Rizal (approximately 30 minutes from Antipolo): Angono Petroglyphs National Cultural Treasure; prehistoric rock carvings; guided heritage walk",
          "10:30 AM — Angono arts district: the town known as the arts capital of the Philippines; local gallery or craftsman studio visit",
          "12:00 PM — Binangonan: Sts. Peter and Paul Parish Church; heritage church on the Laguna de Bay shoreline",
          "1:00 PM — Lunch in Binangonan or Angono before departure",
          "2:30 PM — Return to Manila by car or van (approximately 45 minutes)",
        ],
      },
    ],
  },

  "Oriental Mindoro": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Puerto Galera / Calapan City, Oriental Mindoro (via Batangas Port ferry)",
    transport:
      "Travel from Manila to Batangas Grand Terminal (approximately 2–3 hours via SLEX). Take a ferry from Batangas Port to Calapan City (approximately 2 hours) or an outrigger boat to Puerto Galera Muelle Pier or White Beach (approximately 45 minutes from Batangas Port). All vessel departures are subject to schedules and sea conditions. Within the province, van or tricycle hire between Calapan City and Puerto Galera (approximately 2 hours by road).",
    bestFor: "Dive and snorkel travelers, island beach escapes, Mangyan cultural heritage groups, short Luzon island crossings, families seeking a manageable sea and nature route",
    costingNote:
      "Package rates are inquiry-based. Ferry and outrigger schedules between Batangas and Oriental Mindoro vary by vessel and season; advance booking is recommended during peak periods. Marine activities in Puerto Galera must be booked with accredited dive or snorkel operators and are subject to sea state and conditions.",
    supplierChecks: [
      "Batangas Port to Puerto Galera or Calapan ferry or outrigger booking",
      "Accommodation in Puerto Galera (Sabang, White Beach, or Talipanan area)",
      "Accredited dive or snorkel operator in Puerto Galera",
      "Registered cultural guide for Mangyan heritage community visit",
      "Local van or tricycle hire between Puerto Galera and Calapan City",
    ],
    highlights: [
      "Puerto Galera dive sites — acclaimed dive destination within the Verde Island Passage, one of the world's most biodiverse marine corridors",
      "Puerto Galera beaches — White Beach, Sabang Beach, and the quieter Talipanan Beach; diverse coastal character from lively to secluded",
      "Mangyan indigenous heritage — the eight Mangyan indigenous groups of Mindoro; traditional weaving, basket-making, and the ambahan oral poetry tradition",
      "Calapan City — the Oriental Mindoro provincial capital with a heritage church and Sibuyan Sea coastal character",
      "Verde Island Passage seascape — open sea views from the Mindoro shore across one of the Pacific's most ecologically significant marine straits",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Batangas to Puerto Galera — Sea Crossing and Coastal Arrival",
        details: [
          "Morning — Depart Manila to Batangas Grand Terminal (approximately 2–3 hours via SLEX)",
          "Board outrigger boat to Puerto Galera Muelle Pier or White Beach (approximately 45 minutes from Batangas Port; subject to sea conditions and vessel schedule; advance ticket recommended)",
          "Late morning — Arrive at Puerto Galera; check-in at accommodation in White Beach, Talipanan, or Sabang area",
          "Afternoon — White Beach and Muelle area orientation: beach walk and Verde Island Passage sea views",
          "3:30 PM — Puerto Galera town proper: San Isidro Labrador Parish Church and heritage plaza heritage walk",
          "Evening — Dinner at a Puerto Galera beachside restaurant featuring Oriental Mindoro seafood",
        ],
      },
      {
        day: "Day 2",
        title: "Marine Activity and Mangyan Cultural Heritage",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:30 AM — Dive or snorkel excursion at Puerto Galera marine sites: Verde Island Passage reef systems with diverse coral and marine life (booked with an accredited operator; dive conditions subject to sea state and visibility; not guaranteed)",
          "12:00 PM — Lunch in Sabang or White Beach area",
          "2:00 PM — Mangyan cultural heritage visit: introduction to Mangyan traditional arts with a registered cultural guide; traditional weaving, basket-making, and ambahan poetry context (community visits subject to advance guide coordination and community consent)",
          "5:00 PM — Return to accommodation; sunset at beach",
          "Evening — Dinner and rest in Puerto Galera",
        ],
      },
      {
        day: "Day 3",
        title: "Calapan City and Departure Ferry",
        details: [
          "7:00 AM — Breakfast and check-out from Puerto Galera",
          "8:30 AM — Van or tricycle to Calapan City (approximately 2 hours from Puerto Galera via the provincial road)",
          "10:30 AM — Calapan City: Immaculate Conception Cathedral, city market, and Sibuyan Sea coastal walk",
          "12:00 PM — Lunch in Calapan City",
          "2:00 PM — Calapan Ferry Terminal: board ferry to Batangas Port (approximately 2 hours; subject to schedule and sea conditions)",
          "4:30 PM — Arrive at Batangas Port; transfer by bus or private car to Manila (approximately 2–3 hours via SLEX)",
        ],
      },
    ],
  },

  Palawan: {
    duration: "5 Days / 4 Nights",
    gatewayBase: "Puerto Princesa City, Palawan (Puerto Princesa International Airport)",
    transport:
      "Fly from Manila to Puerto Princesa International Airport (approximately 1.5 hours) via Philippine Airlines, Cebu Pacific, or AirAsia. El Nido is reached from Puerto Princesa by van transfer (approximately 5–6 hours via the Palawan National Highway, subject to road conditions) or by chartered air transfer (approximately 45 minutes, subject to availability and weather). All sea activities throughout Palawan are subject to weather, sea state, permitting requirements, and advance operator booking.",
    bestFor: "UNESCO natural heritage travelers, underground river seekers, island lagoon and reef groups, island escape travelers, nature and conservation groups",
    costingNote:
      "Package rates are inquiry-based. Puerto Princesa Subterranean River National Park permits must be arranged well in advance; same-day walk-in access is not guaranteed. Honda Bay island hopping and El Nido island tours are confirmed with accredited operators and depend on weather and sea conditions. The van transfer between Puerto Princesa and El Nido is a long overland journey; road conditions vary seasonally.",
    supplierChecks: [
      "Hotel in Puerto Princesa City (Nights 1–3) and El Nido (Nights 4–5)",
      "Puerto Princesa Subterranean River National Park permit (advance booking required)",
      "Honda Bay island hopping accredited operator and schedule confirmation",
      "Iwahig River firefly cruise operator and schedule confirmation",
      "El Nido van transfer or air charter booking and island hopping tour operator",
    ],
    highlights: [
      "Puerto Princesa Subterranean River National Park — UNESCO World Heritage Site and New 7 Wonders of Nature; a navigable underground river through a limestone karst cave system",
      "Honda Bay island hopping — Luli Island, Starfish Island, and Pandan Island in the sheltered bay east of Puerto Princesa",
      "Iwahig River firefly cruise — evening mangrove river cruise through bioluminescent firefly colonies",
      "El Nido island lagoons — Big Lagoon, Small Lagoon, Secret Beach, and limestone cliff seascapes of the Bacuit Archipelago",
      "Palawan seascape and marine biodiversity — waters surrounding the island chain form part of a globally significant coral triangle corridor",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Puerto Princesa Arrival and Iwahig Firefly Cruise",
        details: [
          "Morning — Fly from Manila to Puerto Princesa International Airport (approximately 1.5 hours); check-in at hotel in Puerto Princesa City",
          "Afternoon — Puerto Princesa City orientation: Immaculate Conception Cathedral, Palawan Museum (subject to current opening schedule), and city plaza walk",
          "3:30 PM — Baker's Hill: hilltop park with Palawan views and local artisanal goods",
          "Evening — Iwahig River firefly cruise: mangrove river cruise to observe bioluminescent firefly colonies in the Iwahig watershed (cruise timing and firefly visibility subject to conditions and operator schedule)",
          "9:00 PM — Return to Puerto Princesa City; dinner and rest",
        ],
      },
      {
        day: "Day 2",
        title: "Puerto Princesa Subterranean River National Park",
        details: [
          "6:30 AM — Early breakfast and departure for Sabang (approximately 2 hours from Puerto Princesa City, including road and boat transfer)",
          "8:30 AM — Sabang Wharf: boat transfer to the Underground River entrance (approximately 15 minutes; subject to weather and sea conditions)",
          "9:00 AM — Puerto Princesa Subterranean River National Park: permitted guided paddle tour through the limestone karst cave (permits must be arranged in advance; tour depth and duration subject to current regulations and conditions)",
          "11:30 AM — Return to Sabang; lunch at a Sabang beachside restaurant",
          "1:30 PM — Sabang Beach and elevated canopy walkway (if currently accessible): brief exploration of the coastal area",
          "3:00 PM — Return transfer to Puerto Princesa City",
          "Evening — Dinner and rest; preparation for Honda Bay island hopping",
        ],
      },
      {
        day: "Day 3",
        title: "Honda Bay Island Hopping",
        details: [
          "7:30 AM — Breakfast at the hotel",
          "8:30 AM — Honda Bay departure from Sta. Lourdes Wharf: island hopping with an accredited operator (subject to weather and sea conditions)",
          "9:00 AM — Luli Island: sandbar island that partially submerges at high tide; swimming and beach relaxation",
          "10:30 AM — Starfish Island: shallow clear water with resident sea stars and snorkeling",
          "12:00 PM — Pandan Island: lunch and beach rest in the marine sanctuary area (activities subject to marine park conditions)",
          "2:30 PM — Return to Sta. Lourdes Wharf; van to Puerto Princesa City",
          "4:30 PM — Puerto Princesa public market: Palawan cashew products, dried fish, and local crafts",
          "Evening — Dinner in Puerto Princesa City; early rest before El Nido transfer",
        ],
      },
      {
        day: "Day 4",
        title: "Puerto Princesa to El Nido — Bacuit Archipelago Arrival",
        details: [
          "6:00 AM — Early breakfast and check-out",
          "7:00 AM — Depart Puerto Princesa by van toward El Nido (approximately 5–6 hours via the Palawan National Highway; road conditions vary seasonally)",
          "1:00 PM — Arrive in El Nido; check-in at accommodation",
          "2:30 PM — El Nido town orientation: El Nido Beach and Corong-Corong coastal walk; views of the Bacuit Archipelago limestone towers",
          "4:30 PM — Sunset at El Nido town beachfront or nearby cove",
          "Evening — Dinner in El Nido; briefing on the next day's island hopping tour",
        ],
      },
      {
        day: "Day 5",
        title: "El Nido Island Hopping and Departure",
        details: [
          "7:30 AM — Breakfast at accommodation",
          "8:30 AM — El Nido island hopping: accredited boat tour of Bacuit Archipelago stops; specific islands and lagoons (Big Lagoon, Small Lagoon, Seven Commandos Beach, Secret Beach, or others) subject to tour schedule, sea conditions, tides, and daily permit allocation",
          "12:30 PM — Picnic lunch served on the boat or at a beach stop",
          "2:30 PM — Final snorkel or lagoon stop (conditions permitting)",
          "4:00 PM — Return to El Nido town",
          "Evening — Dinner in El Nido; overnight rest before departure",
          "Departure note — Return from El Nido to Manila is arranged separately: van back to Puerto Princesa the following morning (approximately 5–6 hours) or chartered air transfer (subject to availability and weather); onward Manila flight from Puerto Princesa International Airport",
        ],
      },
    ],
  },

  Romblon: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Romblon Town, Romblon Island (via Batangas Port ferry or Tugdan Airport, Tablas)",
    transport:
      "Fly from Manila to Tugdan Airport, Tablas, Romblon (approximately 1 hour via Cebu Pacific or Skyjet; subject to schedule availability and season). Alternatively, take an overnight ferry from Batangas Port to Romblon town or to Odiongan, Tablas (approximately 10–12 hours; RORO ferry subject to schedule and sea conditions). Travel between Tablas Island and Romblon Island is via inter-island bangka or ferry (approximately 2–3 hours; subject to weather and sea state). Local tricycle and multicab hire within Romblon town and surrounding areas.",
    bestFor: "Marble crafts heritage groups, island beach explorers, Spanish colonial church travelers, small group cultural routes, travelers connecting MIMAROPA provinces",
    costingNote:
      "Package rates are inquiry-based. Romblon ferry schedules are seasonal and should be confirmed well in advance. Inter-island transfers between Tablas and Romblon Island and to Cobrador Island are subject to sea conditions and registered banca operator availability.",
    supplierChecks: [
      "Batangas Port ferry or Tugdan Airport Skyjet or Cebu Pacific booking confirmation",
      "Romblon town accommodation (Romblon Island or Tablas Island)",
      "Local tricycle or multicab hire in Romblon town",
      "Registered banca operator for Cobrador Island or Bonbon Beach coastal access",
      "Marble workshop or artisan coordination in Romblon town",
    ],
    highlights: [
      "Fort San Andres, Romblon — Spanish colonial fort overlooking Romblon Bay; one of the oldest Spanish military fortifications in the Philippines",
      "Cathedral of Saint Joseph, Romblon — centuries-old heritage church in the town center; Romblon's spiritual anchor and heritage landmark",
      "Romblon marble industry — the province's defining craft; workshops producing sculpture, tiles, and decorative marble pieces from local quarries",
      "Bonbon Beach and Cobrador Island — accessible natural beaches near Romblon town; sheltered cove snorkeling and sand bar walks (subject to sea conditions)",
      "Tablas Island coastal character — the largest island in the group; fishing villages, white-sand beaches at Santa Fe, and MIMAROPA island life",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Romblon — Ferry or Flight Arrival and Town Orientation",
        details: [
          "Pre-departure — Depart Manila the previous evening by overnight ferry from Batangas Port to Romblon town (approximately 10–12 hours; arrive early morning), or fly from Manila to Tugdan Airport, Tablas on an early flight and transfer to Romblon town by inter-island bangka (approximately 2–3 hours from Tablas to Romblon Island; sea conditions apply)",
          "Morning — Arrive in Romblon town; check-in at accommodation",
          "10:00 AM — Romblon town orientation walk: waterfront promenade, town market, and heritage district introduction",
          "11:00 AM — Cathedral of Saint Joseph, Romblon: heritage church visit and century-old church complex walk",
          "12:30 PM — Lunch in Romblon town featuring fresh Romblon seafood",
          "2:30 PM — Fort San Andres: Spanish colonial fort on the hill above Romblon Bay; heritage walk and panoramic bay views",
          "4:30 PM — Romblon marble workshops: visit a local marble artisan producing sculptures, tiles, and decorative pieces from Romblon's native quarries",
          "Evening — Dinner in Romblon town; rest and adjustment to island pace",
        ],
      },
      {
        day: "Day 2",
        title: "Coastal Heritage and Romblon Island Beaches",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:30 AM — Bonbon Beach: sandbar beach walk on the protected shore near Romblon town (sandbar visibility subject to tide)",
          "10:30 AM — Cobrador Island: registered banca transfer to this small island off the Romblon coast for snorkeling and beach relaxation (sea conditions and banca operator availability required; not guaranteed same-day walk-in)",
          "1:00 PM — Packed lunch on Cobrador Island beach",
          "3:00 PM — Return banca to Romblon town",
          "4:30 PM — Romblon marble market and souvenir area: marble tiles, bookends, figurines, and locally quarried goods",
          "Evening — Dinner and rest; preparation for departure",
        ],
      },
      {
        day: "Day 3",
        title: "Romblon Town Final Morning and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Final Romblon town heritage walk: bay view from the waterfront and any remaining marble or heritage stops",
          "10:00 AM — Departure by ferry from Romblon Port to Batangas Port (schedule confirmation required in advance) or by inter-island bangka to Tugdan Airport, Tablas for onward flight to Manila",
          "Note — Ferry to Batangas Port takes approximately 10–12 hours; for daytime travel, early departure is required. If returning via Tablas, inter-island bangka to Tugdan takes approximately 2–3 hours, and onward flights are subject to airline schedule.",
        ],
      },
    ],
  },

  Sorsogon: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Sorsogon City, Sorsogon",
    transport:
      "Overnight bus from Manila (Cubao or Pasay terminals) to Sorsogon City via ALPS, Philtranco, or Isarog Bus Lines (approximately 10–12 hours; schedules vary by carrier). Alternatively, fly from Manila to Legazpi Airport, Albay (approximately 1 hour) and travel south to Sorsogon City by van or bus (approximately 1.5–2 hours via the Sorsogon highway). Donsol is approximately 40 minutes from Sorsogon City by van. Bulusan is approximately 1.5 hours southeast. Local van hire recommended for full-day provincial circuits.",
    bestFor: "Wildlife and nature travelers, Bicol regional heritage circuits, whale shark encounter groups, volcano lake trekkers, families and small groups on extended Luzon routes",
    costingNote:
      "Package rates are inquiry-based. Whale shark (butanding) interaction in Donsol operates under the Donsol Eco-Tourism Program; a Bureau of Fisheries–accredited Butanding Interaction Officer (BIO-guide) is mandatory and interaction is not guaranteed. Season typically runs November to June, peaking January to May. Bulusan Volcano National Park access should be confirmed with DENR and local tourism office ahead of visit.",
    supplierChecks: [
      "Hotel in Sorsogon City",
      "Donsol Eco-Tourism Program registration and BIO-guide booking (advance coordination required)",
      "Bulusan Volcano National Park DENR-registered guide",
      "Local van hire for Donsol, Bulusan, and Barcelona circuits",
      "Matnog boat tour operator for Puerto Diablo limestone formations (optional, conditions-dependent)",
    ],
    highlights: [
      "Donsol Butanding Encounter — whale shark interaction in the Donsol River mouth; guided snorkel swim alongside whale sharks in season (not guaranteed)",
      "Bulusan Volcano National Park — Lake Bulusan crater lake, Masacrot Hot Spring, and the forested volcanic slopes of Bulusan volcano",
      "Barcelona Church ruins — the earthquake-damaged Spanish colonial church in Barcelona, Sorsogon; a heritage and natural disaster memory landmark",
      "Sorsogon Bay mangroves and coastline — the bay's mangrove forests and fishing village culture along the Sorsogon shoreline",
      "Rizal Beach, Gubat — volcanic black sand beach popular with local surfers on the Pacific-facing coast",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Sorsogon City — Arrival and Provincial Orientation",
        details: [
          "Pre-departure — Depart Manila by overnight bus (approximately 10–12 hours) or fly to Legazpi, Albay the morning of and drive to Sorsogon City (approximately 1.5–2 hours)",
          "Morning — Arrive in Sorsogon City; check-in at hotel",
          "11:00 AM — Sorsogon City heritage walk: Sorsogon City Plaza and heritage church orientation",
          "12:30 PM — Lunch in Sorsogon City featuring Bicolano cuisine (Bicol Express, laing, and pinangat)",
          "2:30 PM — Sorsogon Bay shoreline drive: mangrove areas and fishing village character along the bay",
          "4:30 PM — Barcelona, Sorsogon: Barcelona Church ruins; the Spanish colonial church damaged by historical earthquakes; grounds walk and heritage context",
          "Evening — Dinner in Sorsogon City; rest and trip briefing for Donsol the following morning",
        ],
      },
      {
        day: "Day 2",
        title: "Donsol Whale Shark Encounter and Bulusan Volcano National Park",
        details: [
          "5:30 AM — Early departure from Sorsogon City by van to Donsol (approximately 40 minutes)",
          "6:30 AM — Donsol Eco-Tourism registration and BIO-guide briefing at the Donsol visitor center",
          "7:00 AM — Butanding boat tour: snorkel encounter with whale sharks in the Donsol area (season November to June; peak January to May; interaction and sighting subject to current whale shark presence; BIO-guide mandatory; advance booking strongly recommended)",
          "10:30 AM — Return to Donsol visitor center; debrief and return boat",
          "11:30 AM — Light lunch in Donsol or return drive to Sorsogon City",
          "1:30 PM — Drive to Bulusan, Sorsogon (approximately 1.5 hours)",
          "3:00 PM — Bulusan Volcano National Park: Lake Bulusan crater lake walk; Masacrot Cold Spring (if accessible; DENR guide required; access subject to volcanic activity monitoring level)",
          "5:30 PM — Return drive to Sorsogon City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Gubat Coastal Heritage and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive to Gubat, Sorsogon (approximately 30 minutes from Sorsogon City)",
          "9:00 AM — Rizal Beach, Gubat: volcanic black sand beach popular with local surfers; coastal morning walk and Pacific sea views",
          "10:30 AM — Prieto Diaz coastal area: fishing village and clear-water Subic Beach (brief stop)",
          "12:00 PM — Lunch in Gubat or Sorsogon City",
          "1:30 PM — Depart Sorsogon City by bus toward Manila (approximately 10–12 hours), or return by van to Legazpi Airport for afternoon flight",
        ],
      },
    ],
  },

  Siquijor: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Siquijor Town, Siquijor (via Dumaguete City, Negros Oriental ferry)",
    transport:
      "Fly from Manila to Dumaguete Airport (approximately 1.5 hours via Cebu Pacific or Philippine Airlines) or fly to Cebu City and take a fast craft to Dumaguete City (approximately 3.5–4 hours). From Dumaguete City Pier, take a fast ferry to Siquijor Town or Larena Port (approximately 30–60 minutes depending on vessel; Ocean Jet, Delta Fast Craft, or similar; subject to schedule and sea conditions). Siquijor Island is most efficiently explored by rented motorbike or habal-habal hire for the approximately 80-kilometer circumferential road. Van hire is available for groups.",
    bestFor: "Heritage church pilgrims, waterfall and nature groups, island circuit travelers, photographers, small groups seeking a quieter Visayas island escape",
    costingNote:
      "Package rates are inquiry-based. Ferry schedules between Dumaguete and Siquijor vary by operator and season. Siquijor's circumferential road circuit can be completed in a day by motorbike but is best paced over two days when including heritage sites and swimming stops.",
    supplierChecks: [
      "Dumaguete to Siquijor ferry booking (Ocean Jet, Delta Fast Craft, or equivalent)",
      "Accommodation in Siquijor Town or San Juan area",
      "Motorbike or habal-habal hire for island circumferential circuit",
      "Local heritage guide for Lazi Church and Convent (optional)",
      "Salagdoong Beach and Cambugahay Falls entrance coordination",
    ],
    highlights: [
      "Lazi Church and Convent (St. Isidore the Farmer Parish, Lazi) — 19th-century coral stone church and adjacent convent complex; one of the largest old convents in Asia",
      "Cambugahay Falls, Lazi — multi-tiered natural swimming pools in a forested ravine; accessible via a short trail with a rope swing",
      "Salagdoong Beach, Maria — protected beach with cliff jumping platforms in a forested cove on the island's northeast coast",
      "Paliton Beach, San Juan — quiet white-sand cove on the island's western side; calm water and undeveloped character",
      "Old Balete Tree, San Juan — centuries-old giant balete tree with a freshwater pool at its base; a spiritual and natural heritage landmark",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Dumaguete to Siquijor — Ferry Crossing and Heritage Town Arrival",
        details: [
          "Morning — Fly into Dumaguete Airport; land transfer to Dumaguete City Pier (approximately 15 minutes)",
          "Midday — Board ferry to Siquijor Town or Larena Port (approximately 30–60 minutes; Ocean Jet or Delta Fast Craft subject to schedule; advance ticket recommended)",
          "Afternoon — Arrive in Siquijor; check-in at accommodation in Siquijor Town or San Juan area",
          "3:00 PM — Siquijor Town heritage walk: San Francisco Parish Church (19th-century heritage church), town plaza, and Siquijor Bay promenade",
          "4:30 PM — Old Balete Tree, San Juan: the centuries-old giant balete with its freshwater pool; a quiet heritage nature stop after settling in",
          "Evening — Dinner in San Juan or Siquijor Town featuring fresh Visayas seafood; overview of the following day's island circuit",
        ],
      },
      {
        day: "Day 2",
        title: "Island Heritage Circuit — Lazi Church, Cambugahay Falls, and Salagdoong Beach",
        details: [
          "7:00 AM — Breakfast",
          "8:00 AM — Depart by motorbike or habal-habal toward Lazi (eastern side of the island circuit; approximately 30–40 minutes from San Juan area)",
          "9:00 AM — Lazi Church and Convent (St. Isidore the Farmer Parish): coral stone heritage church and the adjacent old convent complex; guided heritage walk (guide optional)",
          "10:30 AM — Cambugahay Falls, Lazi: short forest trail to the tiered natural swimming pools; swimming and rope swing in the clear turquoise water",
          "12:30 PM — Lunch at a roadside or beachside restaurant in the Lazi or Maria area",
          "2:00 PM — Salagdoong Beach, Maria: forested cove beach with cliff jumping platforms (participation at traveler's own discretion; water depth and platform safety should be assessed on arrival)",
          "4:30 PM — Continue circuit road back toward San Juan via the northern coast",
          "Evening — Dinner and rest at accommodation",
        ],
      },
      {
        day: "Day 3",
        title: "Paliton Beach Morning and Departure Ferry",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:00 AM — Paliton Beach, San Juan: early morning visit to the quiet white-sand cove on the western shore; swimming and coastal walk before the island wakes",
          "10:00 AM — Return to Siquijor Town or Larena Port for departure ferry",
          "10:30 AM — Board ferry back to Dumaguete City (approximately 30–60 minutes; subject to schedule)",
          "Afternoon — Arrive Dumaguete; land transfer to Dumaguete Airport for onward flight to Manila or Cebu, or continue to another Visayas destination",
        ],
      },
    ],
  },

  Samar: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Catbalogan City, Samar (via Tacloban City, Leyte and San Juanico Bridge)",
    transport:
      "Fly from Manila to Daniel Z. Romualdez Airport, Tacloban City, Leyte (approximately 1.5 hours via Cebu Pacific, Philippine Airlines, or AirAsia). From Tacloban, drive south and cross the San Juanico Bridge to Samar Island, then west to Catbalogan City (approximately 1.5–2 hours by van). Alternatively, travel by overnight bus from Manila through Matnog, Sorsogon ferry crossing to Allen, Northern Samar and south to Catbalogan City (approximately 18–20 hours total; long overland route). For Sohoton Natural Bridge National Park in Basey, a bancaboat from Basey town is required (approximately 30–60 minutes depending on water levels; tidal and river conditions affect cave and jellyfish lake access). Langun-Gobingob Cave in Calbiga is approximately 45 minutes from Catbalogan by van.",
    bestFor: "Cave adventure travelers, natural bridge and karst landscape groups, Eastern Visayas heritage circuits, small adventure groups with good physical condition",
    costingNote:
      "Package rates are inquiry-based. Sohoton Natural Bridge National Park boat tours and cave access in Basey require advance coordination with the Basey Municipal Tourism Office. Jellyfish lake access at Sohoton is tidal and seasonal; it is not guaranteed on every visit. Langun-Gobingob Cave spelunking requires a DENR-accredited guide, proper equipment, and is not suitable for travelers with limited mobility or claustrophobia.",
    supplierChecks: [
      "Hotel in Catbalogan City",
      "Sohoton Natural Bridge National Park boat operator and Basey Municipal Tourism Office advance coordination",
      "Langun-Gobingob Cave DENR-accredited guide and equipment coordination",
      "Tacloban Airport pickup and Catbalogan City van transfer",
      "Local van hire for Basey, Calbiga, and Catbalogan city circuits",
    ],
    highlights: [
      "Sohoton Natural Bridge National Park, Basey — a limestone karst landscape of natural cave tunnels, a natural rock arch bridge, and seasonal stingless jellyfish in a tidal cove",
      "Langun-Gobingob Cave, Calbiga — one of the largest cave systems in Asia; a multi-chamber spelunking adventure through bat colonies and ancient cave formations",
      "Catbalogan City heritage — the Samar provincial capital on the Samar Sea; heritage church and city waterfront character",
      "San Juanico Bridge approach — one of the longest bridges in the Philippines crossing the narrow San Juanico Strait between Leyte and Samar",
      "Samar interior forest — one of the most extensive remaining lowland forest corridors in the Visayas; framing the landscape between major sites",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Tacloban to Catbalogan — San Juanico Crossing and City Arrival",
        details: [
          "Morning — Fly from Manila to Tacloban City, Leyte (approximately 1.5 hours); met at Daniel Z. Romualdez Airport by van",
          "10:00 AM — Drive south and west from Tacloban toward Samar Island; approach and cross San Juanico Bridge over the San Juanico Strait (one of the longest bridges in the Philippines)",
          "11:30 AM — Arrive in Catbalogan City; check-in at hotel",
          "12:30 PM — Lunch in Catbalogan City featuring Samar regional cuisine",
          "2:00 PM — Catbalogan City orientation: Catbalogan City Plaza, heritage church walk, and Samar Sea waterfront",
          "4:00 PM — Briefing on Sohoton National Park visit: boat timing, tidal window, jellyfish lake conditions, and cave access protocols",
          "Evening — Dinner in Catbalogan City; early rest for an early Sohoton start",
        ],
      },
      {
        day: "Day 2",
        title: "Sohoton Natural Bridge National Park",
        details: [
          "6:00 AM — Early breakfast and departure by van to Basey, Samar (approximately 30 minutes from Catbalogan City)",
          "7:00 AM — Basey Municipal Tourism Office registration; guide and banca briefing",
          "7:30 AM — Banca upriver into Sohoton Natural Bridge National Park: limestone canyon walls and mangrove transition zone",
          "8:30 AM — Natural Bridge arch: the limestone natural rock bridge over the Sohoton River; guided heritage and geology walk",
          "9:30 AM — Sohoton Cave passage: guided paddling through the low cave tunnel (helmet and life jacket required; water level inside the cave varies with tide and rainfall; access not guaranteed at all conditions)",
          "10:30 AM — Jellyfish Cove (Sohoton Cove): enclosed tidal pool with stingless jellyfish (seasonal and tidal; presence not guaranteed; access depends on current water levels and park management)",
          "12:30 PM — Return banca to Basey; lunch at a Basey riverside spot",
          "2:30 PM — Return to Catbalogan City",
          "4:00 PM — Samar Sea late afternoon walk; rest before dinner",
          "Evening — Dinner and rest; briefing for Langun-Gobingob Cave the following day",
        ],
      },
      {
        day: "Day 3",
        title: "Langun-Gobingob Cave and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:00 AM — Drive to Calbiga, Samar (approximately 45 minutes from Catbalogan City)",
          "9:00 AM — Langun-Gobingob Cave, Calbiga: one of the largest cave systems in Asia; DENR-accredited guide required; basic spelunking equipment necessary; multi-chamber cave with bat colonies, cave formations, and underground streams (guide briefing, equipment check, and safety orientation before entry; this is not a casual walk-through; physical fitness and comfort in confined spaces required)",
          "12:00 PM — Return from cave; lunch in Calbiga town",
          "1:30 PM — Return van to Catbalogan City and onward to Tacloban Airport for departure flight",
          "Note — Tacloban flights to Manila depart throughout the day; departure timing should be confirmed with the tour operator to allow sufficient travel time from Calbiga",
        ],
      },
    ],
  },

  "Southern Leyte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Maasin City, Southern Leyte (via Cebu City ferry or Tacloban City overland)",
    transport:
      "From Cebu City, take a fast ferry from Pier 1 to Maasin City (approximately 3.5–4 hours via SuperCat, Jesse Robredo Express, or equivalent; subject to schedule and sea conditions). Alternatively, fly to Tacloban City, Leyte and drive south to Maasin City via the Leyte highway (approximately 3–3.5 hours by van). Limasawa Island requires a bangka from Padre Burgos, Southern Leyte (approximately 30–45 minutes; sea conditions and registered banca operator required). Padre Burgos Marine Reserve boat and dive access requires an accredited dive operator in Padre Burgos town.",
    bestFor: "Philippine history pilgrimage travelers, divers and marine heritage groups, remote Visayas island seekers, families on Eastern Visayas heritage circuits, whale shark encounter travelers",
    costingNote:
      "Package rates are inquiry-based. Limasawa Island bangka access from Padre Burgos is weather-dependent and should be coordinated with a registered boat operator and the local barangay. Padre Burgos Marine Reserve diving requires an accredited dive operator. Whale shark encounter in Sogod Bay (Pintuyan area) is seasonal and not guaranteed; coordination with the local eco-tourism office is required.",
    supplierChecks: [
      "Cebu City to Maasin City ferry booking or Tacloban airport transfer and van coordination",
      "Hotel in Maasin City",
      "Registered bangka operator for Limasawa Island (Padre Burgos departure point)",
      "Accredited dive or snorkel operator at Padre Burgos Marine Reserve",
      "Pintuyan whale shark eco-tourism coordination (optional; seasonal)",
    ],
    highlights: [
      "Limasawa Island — the site of the first Christian Mass in the Philippines celebrated by Ferdinand Magellan on March 31, 1521; a national historical landmark of deep significance to Philippine identity",
      "Maasin City Cathedral (St. Michael the Archangel) — the heritage cathedral of the Southern Leyte capital; a provincial spiritual and cultural anchor",
      "Padre Burgos Marine Reserve — acclaimed wall diving destination in Sogod Bay; one of the finest marine reserves in the Eastern Visayas",
      "Sogod Bay — the wide inland sea forming the western approach to Southern Leyte; whale shark sightings reported seasonally near Pintuyan",
      "Southern Leyte coastal character — the southernmost province of Leyte Island; remote, green, and facing both the Camotes Sea and Sogod Bay",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Cebu or Tacloban to Maasin City — Cathedral and Provincial Arrival",
        details: [
          "Morning — Depart Cebu City Pier 1 by fast ferry to Maasin City (approximately 3.5–4 hours; subject to schedule and sea conditions) or fly to Tacloban City and drive south by van (approximately 3–3.5 hours)",
          "Midday or early afternoon — Arrive in Maasin City; check-in at hotel",
          "3:00 PM — St. Michael the Archangel Cathedral, Maasin City: heritage cathedral visit and city plaza walk",
          "4:30 PM — Maasin City waterfront: Camotes Sea views and fishing village character along the Maasin City shore",
          "Evening — Dinner in Maasin City featuring Southern Leyte seafood; route overview for Limasawa and Padre Burgos",
        ],
      },
      {
        day: "Day 2",
        title: "Limasawa Island — Site of the First Christian Mass in the Philippines",
        details: [
          "6:30 AM — Early breakfast and departure by van to Padre Burgos, Southern Leyte (approximately 45 minutes from Maasin City)",
          "8:00 AM — Padre Burgos: board registered bangka to Limasawa Island (approximately 30–45 minutes; sea conditions must be confirmed before departure)",
          "9:00 AM — Limasawa Island: the site where Ferdinand Magellan celebrated the first Christian Mass in the Philippines on Easter Sunday, March 31, 1521; heritage monument and national shrine grounds walk with local heritage guide",
          "10:30 AM — Limasawa village and coastal walk: island community, traditional fishing life, and Sogod Bay views from the island",
          "12:00 PM — Packed lunch on Limasawa Island",
          "1:30 PM — Return bangka to Padre Burgos (sea conditions apply)",
          "3:00 PM — Padre Burgos Marine Reserve briefing: snorkel or dive with an accredited operator in the marine reserve (conditions-dependent; accredited operator required)",
          "5:00 PM — Return to Maasin City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Sogod Bay, Malitbog Heritage, and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Drive north along Sogod Bay toward Malitbog, Southern Leyte (approximately 45 minutes from Maasin City)",
          "9:30 AM — Malitbog: St. Joseph Parish Church; heritage colonial-era church in this fishing town on the Sogod Bay shore",
          "10:30 AM — Sogod Bay coastal drive: the wide inland bay with views of the Samar Island mountains across the water",
          "11:30 AM — Optional Pintuyan detour (if seasonal whale shark reports are confirmed): Pintuyan eco-tourism site for whale shark snorkel encounter (subject to current whale shark presence and eco-tourism office coordination; not guaranteed)",
          "1:00 PM — Lunch in Maasin City or at a Sogod Bay coastal stop",
          "2:30 PM — Depart Maasin City by ferry back to Cebu City or by van north to Tacloban City for departure flight",
        ],
      },
    ],
  },

  Sulu: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Jolo, Sulu (via Zamboanga City regional air connection)",
    transport:
      "Fly from Manila or Cebu City to Zamboanga City Airport. Onward regional air connection to Jolo Airport, Sulu is the primary means of access (approximately 30–40 minutes by regional aircraft; schedules and aircraft type subject to operational availability and season). All ground transfers within Sulu are arranged through accredited Bangsamoro regional tour operators and coordinated in advance with the Bangsamoro Tourism Office. Independent overland or sea travel is not part of this package; all logistics are operator-managed.",
    bestFor: "Philippine Islamic history researchers, Sulu Sultanate cultural heritage specialists, and travelers joining an operator-led Bangsamoro heritage program with confirmed regional operator coordination",
    costingNote:
      "Package rates are inquiry-based. Access to Sulu requires advance coordination with the Bangsamoro Tourism Office and an accredited regional operator. Travelers are advised to review current travel advisories from the Philippine Department of Foreign Affairs and their home country's consular guidance before confirming travel. All on-ground logistics, site access, and guide arrangements are operator-managed throughout.",
    supplierChecks: [
      "Bangsamoro Tourism Office advance coordination and operator endorsement",
      "Zamboanga City to Jolo regional air connection booking (subject to schedule and availability)",
      "Accredited Bangsamoro regional tour operator for all on-ground management",
      "Operator-selected and coordinated accommodation in Jolo",
      "All site access and heritage guide arrangements confirmed through regional operator",
    ],
    highlights: [
      "Jolo historical port town — the Sulu provincial capital with a layered heritage reflecting centuries of the Sulu Sultanate's maritime trade dominance across the Sulu Sea and into Borneo",
      "Sulu Sultanate cultural heritage — the Sultanate of Sulu was among the most powerful Islamic polities in Southeast Asia; its legacy persists in oral traditions, ceremonial arts, royal memory, and Tausug community identity",
      "Maimbung historical area — the ancestral seat of the Sulu Sultanate; location of historically significant structures and continuing cultural memory within the Sulu Archipelago",
      "Sulu pearl trade heritage — Sulu's pearl-diving traditions made the archipelago one of the most significant pearl trading centers in the broader Southeast Asian region",
      "Tausug cultural expression — music, weaving, the kulintang ensemble, and ceremonial arts preserved within the living culture of the Sulu Archipelago",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Zamboanga City to Jolo — Regional Transfer and Operator Orientation",
        details: [
          "Morning — Fly from Manila or Cebu City to Zamboanga City Airport; met by operator representative",
          "Midday — Operator-arranged regional air transfer from Zamboanga City to Jolo Airport, Sulu (approximately 30–40 minutes; subject to schedule and operational conditions)",
          "Afternoon — Arrive in Jolo; transfer to operator-selected accommodation",
          "4:00 PM — Operator briefing: itinerary confirmation, site access protocols, community engagement guidelines, and cultural context introduction for Tausug heritage",
          "Evening — Dinner at accommodation or operator-arranged local setting; rest and preparation for heritage visits",
        ],
      },
      {
        day: "Day 2",
        title: "Jolo Heritage — Sultanate Legacy and Tausug Cultural Context",
        details: [
          "Morning — Breakfast at accommodation",
          "9:00 AM — Jolo town heritage walk: historic port quarter, market district, and the layered architectural and civic character of Jolo shaped by centuries of trade and cultural exchange (all movement operator-guided and coordinated)",
          "11:00 AM — Islamic heritage orientation: mosque visit and Bangsamoro cultural guide introduction to the historical significance of Jolo as one of the Philippines' oldest Islamic centers",
          "12:30 PM — Lunch at an operator-arranged local setting featuring Tausug cuisine",
          "2:30 PM — Sulu Sultanate cultural context session: Sultanate history, royal regalia traditions, and the Tausug oral and performing arts with a regional cultural guide",
          "4:30 PM — Jolo coastal area: Sulu Sea waterfront and traditional fishing community character along the town shore",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Maimbung Historical Area and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Maimbung, Sulu: the historical ancestral area of the Sulu Sultanate (access coordinated by operator in advance; site visits subject to community arrangements and current on-ground conditions)",
          "11:00 AM — Return to Jolo; Sulu pearl and shell craft market: traditional pearl and shell craft pieces representing the Sulu Archipelago's historical pearl trade heritage",
          "12:30 PM — Lunch before departure",
          "2:00 PM — Operator transfer to Jolo Airport for regional flight back to Zamboanga City",
          "Onward — Zamboanga City to Manila or Cebu City by commercial flight (to be booked in advance with operator coordination)",
        ],
      },
    ],
  },

  "Zamboanga del Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Dipolog City, Zamboanga del Norte (Dipolog Airport)",
    transport:
      "Fly from Manila to Dipolog Airport, Zamboanga del Norte (approximately 1.5 hours via Cebu Pacific or Philippine Airlines). Dapitan City is approximately 14 kilometers from Dipolog City (approximately 20 minutes by van or jeepney). Local van hire is recommended for group travel between Dipolog City, Dapitan City, and the provincial coastal circuit.",
    bestFor: "Jose Rizal heritage and Philippine national history travelers, beach and coastal groups, Mindanao regional circuits, families on accessible Zamboanga Peninsula routes",
    costingNote:
      "Package rates are inquiry-based. The Rizal Shrine in Dapitan charges an entrance fee managed by the National Historical Commission of the Philippines; visiting hours should be confirmed with the NHCP or local tourism office. Dakak beach area access varies by facility; advance coordination is recommended.",
    supplierChecks: [
      "Hotel in Dipolog City or Dapitan City",
      "Local van hire for Dipolog–Dapitan circuit and coastal routes",
      "Rizal Shrine, Dapitan NHCP guide coordination and advance access confirmation",
      "Dakak or coastal beach area advance reservation or coordination",
      "Dipolog Airport arrival and departure transfer",
    ],
    highlights: [
      "Rizal Shrine, Dapitan — National Historical Landmark; the preserved home, garden clinic, school, and coastal farm where Jose Rizal spent his four-year exile (1892–1896) and carried out medicine and civic work",
      "Dapitan Bay — the sheltered bay where Rizal lived and worked; the setting for his most productive civic years outside of Manila",
      "Dipolog City — the Zamboanga del Norte capital known as the Orchid City; Linabo Peak viewpoint looks out over the city and the Dipolog Bay coastline",
      "Sindangan Bay and north coast — the provincial coast along the Sulu Sea; fishing communities and open sea views toward the Zamboanga Peninsula",
      "Zamboanga del Norte agricultural and coastal landscape — the gentle transition between the provincial coast and the Zamboanga Peninsula interior",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Dipolog City — Arrival and City Orientation",
        details: [
          "Morning — Fly from Manila to Dipolog Airport (approximately 1.5 hours)",
          "Midday — Land transfer to hotel in Dipolog City (approximately 10 minutes from the airport)",
          "12:30 PM — Lunch in Dipolog City featuring Zamboanga del Norte regional dishes",
          "2:30 PM — Linabo Peak, Dipolog City: hilltop viewpoint above the city with panoramic views of Dipolog Bay and the northern Zamboanga del Norte coastline",
          "4:00 PM — Dipolog City heritage walk: city plaza, public market, and Dipolog Bay promenade",
          "Evening — Dinner in Dipolog City; briefing on the Dapitan Rizal Shrine visit the following morning",
        ],
      },
      {
        day: "Day 2",
        title: "Dapitan Heritage — Rizal Shrine, Bay, and Civic Legacy",
        details: [
          "7:30 AM — Breakfast at hotel",
          "8:30 AM — Drive to Dapitan City (approximately 20 minutes from Dipolog City)",
          "9:00 AM — Rizal Shrine, Dapitan: National Historical Landmark; guided tour of Jose Rizal's exile home, garden clinic, and farm; the site where Rizal practiced medicine, built civic infrastructure, and conducted scientific observations during his four-year exile from 1892 to 1896 (entrance fee; NHCP guide; visiting hours subject to advance confirmation)",
          "11:00 AM — Dapitan coastal area: the shoreline where Rizal navigated locally; Fort del Pilar context and bay walk",
          "12:00 PM — Lunch in Dapitan City",
          "2:00 PM — Dapitan Bay shoreline: fishing village walk and the bay's quiet provincial character",
          "3:30 PM — Dakak coastal area (advance coordination required): scenic drive and coastal scenery in the Dapitan beach zone",
          "5:00 PM — Return drive to Dipolog City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Dipolog Market and Departure",
        details: [
          "7:30 AM — Breakfast and check-out",
          "8:30 AM — Dipolog City public market: regional produce, orchid-related goods, and local pasalubong",
          "10:00 AM — Dipolog Bay morning walk and final coastal views",
          "11:30 AM — Lunch in Dipolog City",
          "1:00 PM — Transfer to Dipolog Airport for departure flight to Manila",
        ],
      },
    ],
  },

  "Zamboanga del Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Pagadian City, Zamboanga del Sur (Moret Airport, Pagadian City)",
    transport:
      "Fly from Manila or Cebu City to Pagadian Airport (Moret Airport; approximately 1.5 hours from Manila via Cebu Pacific or Philippine Airlines). Pagadian City is the provincial capital of Zamboanga del Sur and serves as the commercial and transport hub of the province. Day routes to Margosatubig and interior lake communities require local van hire; road conditions on secondary provincial roads may vary seasonally. Pagadian's steep urban terrain is navigated locally by the city's distinctive small pedicabs.",
    bestFor: "Mindanao provincial city travelers, lake district nature groups, regional heritage and culture circuits, travelers exploring the Zamboanga Peninsula interior",
    costingNote:
      "Package rates are inquiry-based. Lake Utok access in Margosatubig and interior routes requires local van hire and guide coordination; road conditions on secondary routes may vary by season. Pagadian's floating market is an informal waterfront activity operating on irregular schedules; early morning timing gives the best chance of activity.",
    supplierChecks: [
      "Hotel in Pagadian City",
      "Local van hire for Margosatubig, lake district, and provincial circuit routes",
      "Pagadian City local guide for city orientation and floating market timing",
      "Moret Airport arrival and departure transfer coordination",
      "Margosatubig community or lake area guide (if applicable)",
    ],
    highlights: [
      "Pagadian City — the 'Little Hong Kong of the South'; a city of dramatic steep hillsides navigated by small panoramic pedicabs; one of Mindanao's most distinctive urban landscapes",
      "Pagadian floating market — an informal waterfront tradition where vendors sell produce and fish from boats along the Pagadian Bay foreshore",
      "Lake Utok, Margosatubig — an inland freshwater lake in the southern interior of Zamboanga del Sur surrounded by forested hills and rural community areas",
      "Illana Bay coastal zone — the wide bay along Zamboanga del Sur's eastern coast; mangrove estuaries, fishing towns, and the approach to the Moro Gulf",
      "Subanen indigenous presence — the indigenous Subanen communities of the Zamboanga del Sur highlands form part of the province's layered Mindanao cultural landscape",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Pagadian City — Arrival and City Orientation",
        details: [
          "Morning — Fly to Pagadian Airport (Moret Airport); transfer to hotel in Pagadian City (approximately 10 minutes from the airport)",
          "Midday — Lunch in Pagadian City featuring Mindanao regional cuisine",
          "2:00 PM — Pagadian City orientation: city plaza heritage walk, hillside neighborhood views, and introduction to the city's famously steep topography",
          "3:30 PM — Pagadian pedicab ride: the city's uniquely small pedicabs navigating steep urban streets; a local transport landmark unlike anywhere else in the Philippines",
          "4:30 PM — Pagadian Bay waterfront: Punta Flecha coastal promenade and Illana Bay views at the approach to early evening",
          "Evening — Dinner in Pagadian City; briefing on the following day's lake and market route",
        ],
      },
      {
        day: "Day 2",
        title: "Floating Market, Margosatubig, and Lake Utok",
        details: [
          "6:30 AM — Early morning at Pagadian waterfront floating market: informal boat-based vendor market along the bay foreshore (vendor activity varies by day; early morning gives the best window for activity)",
          "8:30 AM — Breakfast after market visit",
          "10:00 AM — Drive to Margosatubig, Zamboanga del Sur (approximately 1.5–2 hours from Pagadian City; secondary road conditions should be confirmed with driver)",
          "11:30 AM — Margosatubig town and Lake Utok approach: freshwater lake surrounded by forested interior hills; rural community character of the Zamboanga del Sur interior",
          "1:00 PM — Lunch in Margosatubig or picnic at the lake area (guide or driver coordination for meal stop)",
          "2:30 PM — Lake Utok shoreline: lake scenery, Subanen community area, and forested hill views (residential areas should be observed with appropriate respect for community privacy)",
          "4:30 PM — Return drive to Pagadian City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Pagadian Bay Final Morning and Departure",
        details: [
          "7:30 AM — Breakfast and check-out",
          "9:00 AM — Pagadian City market: regional produce, dried fish, and Mindanao goods",
          "10:30 AM — Final Pagadian Bay coastal walk and hillside city views before departure",
          "12:00 PM — Lunch in Pagadian City",
          "1:30 PM — Transfer to Pagadian Airport (Moret Airport) for departure flight to Manila or Cebu City",
        ],
      },
    ],
  },

  "Zamboanga Sibugay": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Ipil, Zamboanga Sibugay (via Zamboanga City air connection and overland transfer)",
    transport:
      "Fly from Manila or Cebu City to Zamboanga City Airport (approximately 1.5–2 hours from Manila; the nearest commercial airport to Zamboanga Sibugay province). Drive from Zamboanga City to Ipil, the Zamboanga Sibugay provincial capital (approximately 2–3 hours by van via the main provincial highway). Local van or registered banca hire is required for coastal community and island visits within Sibuguey Bay. Banca access in the bay is subject to sea conditions, tidal state, and advance operator coordination.",
    bestFor: "Bajau-Sama sea culture travelers, mangrove and coastal ecology groups, off-the-beaten-track Mindanao heritage seekers, small groups with prior regional operator coordination",
    costingNote:
      "Package rates are inquiry-based. Stilt village and coastal island visits in Sibuguey Bay require a registered banca operator and advance barangay coordination. Community visits to Bajau-Sama settlements require a local guide and should follow community protocols regarding access and photography. Some coastal and island areas may require advance barangay clearance.",
    supplierChecks: [
      "Zamboanga City hotel for transit night (if applicable) or direct Ipil accommodation",
      "Zamboanga City to Ipil van transfer coordination",
      "Registered banca operator for Sibuguey Bay island and stilt village access",
      "Local guide for coastal community and mangrove bay route",
      "Olutanga Island or coastal island barangay clearance coordination",
    ],
    highlights: [
      "Sibuguey Bay stilt villages — the over-water communities of the Bajau-Sama sea peoples built above the sheltered inner bay; one of the most distinctive settlement landscapes in the Zamboanga Peninsula",
      "Olutanga Island — a coastal island in Sibuguey Bay accessible by banca; forested and surrounded by clear tropical water at the bay's open edge",
      "Ipil and Zamboanga Sibugay character — the provincial capital of a young province created in 2001; a Subanen indigenous and Muslim-Christian coastal frontier community",
      "Kabasalan mangrove corridor — one of the province's most significant mangrove conservation areas along the Sibuguey Bay inner coast",
      "Sibuguey Bay marine environment — the protected inner bay supporting traditional fishing communities and coastal biodiversity in the western Zamboanga Peninsula",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Zamboanga City to Ipil — Regional Transfer and Sibuguey Bay Arrival",
        details: [
          "Morning — Fly from Manila or Cebu City to Zamboanga City Airport; met by operator or driver",
          "Midday — Van departure from Zamboanga City toward Ipil, Zamboanga Sibugay (approximately 2–3 hours via the provincial highway)",
          "Afternoon — Arrive in Ipil; check-in at accommodation",
          "4:00 PM — Ipil town orientation: provincial capital market area and Sibuguey Bay coastal promenade",
          "Evening — Dinner in Ipil featuring Sibuguey coastal seafood; guide briefing on the following day's bay circuit",
        ],
      },
      {
        day: "Day 2",
        title: "Sibuguey Bay — Stilt Villages, Mangroves, and Coastal Communities",
        details: [
          "7:00 AM — Breakfast",
          "8:30 AM — Registered banca departure from Ipil or a nearby coastal access point (sea conditions and tide must be confirmed with operator before departure)",
          "9:30 AM — Bajau-Sama stilt village approach: over-water communities built above the bay; guide accompaniment required; community visit protocols must be followed; photography deferred to community norms and guide direction",
          "11:00 AM — Mangrove estuary passage: banca transit through the bay's mangrove channel network; guide interpretation of the coastal ecosystem and traditional fishing community livelihood",
          "12:30 PM — Packed lunch onboard or at a coastal rest point (coordinated by guide)",
          "2:00 PM — Kabasalan mangrove area approach or Olutanga Island coastal edge: island coastal scenery and bay water (access subject to operator coordination, tide, and barangay clearance confirmed in advance)",
          "4:00 PM — Return banca to Ipil",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Ipil Market and Return to Zamboanga City",
        details: [
          "7:30 AM — Breakfast and check-out",
          "9:00 AM — Ipil public market: Sibugay local produce, dried seafood, and regional goods",
          "10:30 AM — Final Sibuguey Bay view and coastal walk before departure",
          "11:30 AM — Van departure from Ipil to Zamboanga City (approximately 2–3 hours)",
          "Afternoon — Arrive Zamboanga City; transfer to Zamboanga City Airport for departure flight to Manila or Cebu City",
        ],
      },
    ],
  },

  Sarangani: {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Alabel, Sarangani (via General Santos City Airport, General Santos City)",
    transport:
      "Fly from Manila or Cebu City to Francisco B. Reyes Airport, General Santos City (approximately 1.5 hours from Manila via Cebu Pacific, Philippine Airlines, or AirAsia). Drive from General Santos City to Alabel, the Sarangani provincial capital (approximately 30–40 minutes). Gumasa Beach in Glan, Sarangani is approximately 1.5–2 hours from General Santos City by van along the provincial coast road. Tinagong Dagat in Maasim requires a short registered banca transfer subject to sea and tidal conditions. Local van hire is essential for Sarangani's provincial circuit.",
    bestFor: "Archaeological heritage travelers, beach and coastal groups, Mindanao SOCCSKSARGEN regional circuits, marine nature travelers, small groups exploring the Celebes Sea coast",
    costingNote:
      "Package rates are inquiry-based. The Maitum anthropomorphic pottery site and Ayub Cave require coordination with the National Museum of the Philippines regional office and local tourism; visiting hours and access must be confirmed in advance. Gumasa Beach in Glan is a significant drive from the gateway city and should be planned as an early departure route or with accommodation in Glan. Tinagong Dagat banca access depends on sea conditions and registered operator availability.",
    supplierChecks: [
      "Hotel in General Santos City area or Alabel, Sarangani",
      "Local van hire for Gumasa Beach (Glan), Maitum, and Maasim circuit",
      "Maitum Archaeological Site advance coordination with NMP regional office or local tourism office",
      "Registered banca operator for Tinagong Dagat, Maasim (advance coordination required)",
      "General Santos City Airport arrival and departure transfer",
    ],
    highlights: [
      "Maitum Anthropomorphic Pottery, Maitum — National Cultural Treasures; Iron Age burial jars with molded human facial features recovered from Ayub Cave; among the most significant archaeological finds in the Philippines",
      "Gumasa Beach, Glan — a long sweep of fine white sand on the Celebes Sea shore of southern Sarangani; one of the most pristine beaches in Mindanao",
      "Tinagong Dagat (Hidden Sea), Maasim — a coastal lagoon enclosed by rocky headlands and accessible by banca; its calm inner water contrasts with the open Sarangani Bay outside",
      "Sarangani Bay Protected Seascape — a nationally protected coastal ecosystem with coral reefs, sea grass beds, and diverse marine fauna along the inner bay",
      "Sarangani coastal communities — the fishing towns of Glan, Maasim, and Kiamba along the bay's arc; an active Mindanao coastal landscape of livelihood and heritage",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "General Santos City to Sarangani — Arrival and Maitum Archaeological Heritage",
        details: [
          "Morning — Fly to General Santos City Airport; land transfer toward Maitum, Sarangani (approximately 1.5–2 hours from the airport)",
          "10:00 AM — Maitum, Sarangani: Ayub Cave heritage area; site of the Maitum Anthropomorphic Pottery — Iron Age burial jars with human-faced features declared National Cultural Treasures; guided visit with local heritage context (advance coordination with NMP or local tourism office required; site hours must be confirmed)",
          "12:30 PM — Lunch in Maitum or Kiamba featuring Sarangani coastal dishes",
          "2:30 PM — Drive to Alabel, Sarangani provincial capital (approximately 45 minutes from Maitum)",
          "4:00 PM — Alabel town orientation and Sarangani Bay approach views",
          "Evening — Check-in at hotel; dinner in Alabel area",
        ],
      },
      {
        day: "Day 2",
        title: "Gumasa Beach, Glan and Tinagong Dagat, Maasim",
        details: [
          "6:30 AM — Early departure by van from hotel toward Glan, Sarangani (approximately 1.5–2 hours from Alabel; early start recommended to maximize beach time)",
          "8:30 AM — Gumasa Beach, Glan: arrival at the long fine white-sand beach on the Celebes Sea; swimming, beach walk, and coastal morning light",
          "11:00 AM — Glan coastal fishing village: the community character and livelihoods along the southern Sarangani shoreline",
          "12:00 PM — Lunch in Glan featuring fresh Celebes Sea fish",
          "2:00 PM — Drive toward Maasim, Sarangani (approximately 1 hour from Glan)",
          "3:30 PM — Tinagong Dagat (Hidden Sea), Maasim: registered banca transfer through the coastal passage into the enclosed lagoon (sea state, tide, and advance registered operator coordination required; access cannot be confirmed without prior arrangement)",
          "5:00 PM — Return to hotel area",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Sarangani Bay Coastal Drive and Departure",
        details: [
          "7:30 AM — Breakfast and check-out",
          "9:00 AM — Sarangani Bay coastal drive: the arc of the bay from Alabel toward the General Santos City boundary; fishing villages, bay scenery, and the Sarangani Bay Protected Seascape shoreline",
          "10:30 AM — Market stop: regional dried fish, Mindanao produce, and pasalubong",
          "12:00 PM — Lunch before departure",
          "1:00 PM — Transfer to General Santos City Airport for departure flight to Manila or Cebu City",
        ],
      },
    ],
  },

  "South Cotabato": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Lake Sebu, South Cotabato (via General Santos City Airport and overland transfer)",
    transport:
      "Fly from Manila or Cebu City to Francisco B. Reyes Airport, General Santos City (approximately 1.5 hours from Manila via Cebu Pacific, Philippine Airlines, or AirAsia). Drive from General Santos City to Koronadal City, South Cotabato (approximately 1 hour) and onward to Lake Sebu (approximately 1 additional hour from Koronadal City via mountain road; road conditions on the Lake Sebu approach improve in dry season). Local tricycle, habal-habal, or van hire within the Lake Sebu area for heritage village and falls circuit.",
    bestFor: "T'boli indigenous culture travelers, waterfall and highland lake groups, Philippine textile heritage seekers, families on Mindanao SOCCSKSARGEN cultural routes",
    costingNote:
      "Package rates are inquiry-based. Lake Sebu Seven Falls zip line activity is subject to weather conditions, equipment inspection, and current operator availability; participation is not guaranteed and is at the traveler's own assessment. T'boli cultural village visits and weaving demonstrations require advance coordination with local heritage guides. Road conditions on the Lake Sebu mountain approach should be confirmed before departure, particularly during wet season.",
    supplierChecks: [
      "Accommodation in Lake Sebu (lakeside guesthouse or resort; advance booking required due to limited rooms)",
      "Local heritage guide for T'boli cultural village and weaving demonstration",
      "Seven Falls registered guide and zip line operator coordination",
      "General Santos City to Lake Sebu van hire (mountain road; driver familiarity with route required)",
      "T'boli brass craft or t'nalak weaving artisan advance visit coordination",
    ],
    highlights: [
      "Lake Sebu — a highland crater lake at 300 meters elevation; spiritual and cultural home of the T'boli indigenous people of South Cotabato",
      "Seven Falls of Lake Sebu — a cascade series on the Sungcop River descending through forested gorges; each waterfall named in the T'boli language",
      "T'boli t'nalak weaving — a UNESCO Intangible Cultural Heritage tradition; the T'boli create t'nalak cloth from abaca fibers using a dream-inspired design process",
      "T'boli cultural village and heritage — traditional T'boli brasswork, beadwork, and ceremonial garments; the indigenous community's living cultural identity around the lake",
      "South Cotabato highland landscape — the Allah Valley approach and the forested slopes descending into the Lake Sebu basin",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "General Santos City to Lake Sebu — Highland Arrival and Lake Orientation",
        details: [
          "Morning — Fly to General Santos City Airport; van transfer to Koronadal City, South Cotabato (approximately 1 hour)",
          "11:00 AM — Koronadal City brief orientation: provincial capital plaza and South Cotabato landscape overview",
          "12:00 PM — Lunch in Koronadal City featuring South Cotabato highland dishes",
          "1:30 PM — Drive from Koronadal City to Lake Sebu (approximately 1 hour via mountain road; road condition confirmation with driver before departure)",
          "3:00 PM — Arrive Lake Sebu; check-in at lakeside accommodation",
          "4:00 PM — Lake Sebu orientation walk: lakeside promenade and first views of the highland crater lake and surrounding forested slopes",
          "5:00 PM — T'boli market area: introduction to t'nalak cloth, brasswork, and local artisan goods at the lake village",
          "Evening — Dinner featuring T'boli-inspired or South Cotabato highland cuisine; cultural guide briefing on the following day's heritage circuit",
        ],
      },
      {
        day: "Day 2",
        title: "Seven Falls Heritage Circuit and T'boli Cultural Village",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:30 AM — Seven Falls of Lake Sebu: guided waterfall circuit along the Sungcop River gorge; the registered guide leads the walk through the falls series (Hikong Alu through Hikong Lemek; trail conditions vary by season; some falls require a short hike on uneven terrain)",
          "10:00 AM — Seven Falls zip line (subject to current operator status, weather conditions, and traveler assessment; participation is voluntary; guide confirms status before the visit)",
          "12:00 PM — Lunch at a Lake Sebu lakeside restaurant",
          "2:00 PM — T'boli cultural village visit: guided introduction to T'boli community life, traditional dress, and ceremonial heritage (advance coordination required; community visit follows cultural guide protocols)",
          "3:30 PM — T'boli t'nalak weaving demonstration: observing or participating in the abaca fiber weaving tradition with a master weaver (subject to weaver availability and advance coordination)",
          "5:00 PM — Lake Sebu sunset: the lake at late afternoon light from a lakeside viewpoint",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Lake Sebu Morning, T'boli Craft Market, and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:30 AM — Lake Sebu early morning: final lakeside walk and water views at the calmest part of the highland day",
          "9:30 AM — T'boli crafts and pasalubong: t'nalak cloth pieces, brasswork, beadwork, and Lake Sebu dried fish and coffee",
          "11:00 AM — Drive from Lake Sebu to Koronadal City (approximately 1 hour) and onward to General Santos City (approximately 1 hour)",
          "1:30 PM — Lunch in Koronadal City or General Santos City area",
          "3:00 PM — Transfer to General Santos City Airport for departure flight to Manila or Cebu City",
        ],
      },
    ],
  },

  "Sultan Kudarat": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Tacurong City / Isulan, Sultan Kudarat (via General Santos City Airport and overland transfer)",
    transport:
      "Fly from Manila or Cebu City to Francisco B. Reyes Airport, General Santos City (approximately 1.5 hours from Manila). Drive from General Santos City north to Tacurong City, Sultan Kudarat (approximately 1.5 hours via the Sultan Kudarat highway). Isulan, the provincial capital, is approximately 30 minutes north of Tacurong City. Local van hire is required for the Allah River valley, Lake Buluan shoreline, and provincial interior routes; secondary road conditions in interior areas should be confirmed seasonally.",
    bestFor: "Philippine Islamic history travelers, Maguindanao Sultanate heritage groups, agricultural valley and river landscape seekers, travelers on the SOCCSKSARGEN regional circuit",
    costingNote:
      "Package rates are inquiry-based. The province of Sultan Kudarat is named after Sultan Dipatuan Kudarat, the 17th-century Maguindanao Sultan who led sustained resistance against Spanish colonization; heritage visits connected to this legacy require coordination with local heritage guides and the provincial tourism office. Lake Buluan shoreline access points vary by community; advance guide coordination is recommended.",
    supplierChecks: [
      "Hotel in Tacurong City or Isulan",
      "Local van hire for Allah Valley, Lake Buluan, and provincial interior routes",
      "Provincial or local heritage guide for Sultan Kudarat historical and cultural context",
      "Lake Buluan shoreline access and community coordination",
      "General Santos City Airport to Tacurong City driver coordination",
    ],
    highlights: [
      "Isulan — the provincial capital of Sultan Kudarat, named in memory of the great Maguindanao Sultan who resisted Spanish colonial expansion across Mindanao in the 17th century",
      "Allah Valley — the broad, fertile agricultural valley of the Allah River system; the geographic heart of Sultan Kudarat's farming and community landscape",
      "Lake Buluan — one of the largest freshwater lakes in Mindanao shared between Sultan Kudarat and Maguindanao; a significant inland water body for regional livelihoods",
      "Allah River heritage — the river that defines the valley's character; a thread connecting the province's agricultural communities and its pre-colonial Islamic heritage",
      "Tacurong City — the main commercial center of Sultan Kudarat and the practical gateway into the province from General Santos City",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "General Santos City to Tacurong City — Arrival and Allah Valley Orientation",
        details: [
          "Morning — Fly to General Santos City Airport; van transfer north to Tacurong City, Sultan Kudarat (approximately 1.5 hours via the provincial highway)",
          "Midday — Arrive Tacurong City; check-in at hotel",
          "1:00 PM — Lunch in Tacurong City featuring South Mindanao regional cuisine",
          "3:00 PM — Tacurong City market and commercial district: the commercial character of the Sultan Kudarat hub; local produce, dried goods, and regional market culture",
          "4:30 PM — Allah River view near Tacurong City: the river that drains the Allah Valley and defines the province's agricultural character",
          "Evening — Dinner in Tacurong City; heritage guide briefing on the Sultan Kudarat historical and cultural context for the following days",
        ],
      },
      {
        day: "Day 2",
        title: "Isulan Heritage, Allah Valley, and Lake Buluan",
        details: [
          "7:30 AM — Breakfast",
          "9:00 AM — Drive to Isulan, Sultan Kudarat provincial capital (approximately 30 minutes from Tacurong City)",
          "9:30 AM — Isulan heritage orientation: provincial capital plaza, capitol grounds, and heritage guide introduction to Sultan Dipatuan Kudarat — the 17th-century Maguindanao Sultan who led sustained resistance against Spanish colonization of Mindanao and whose legacy gives the province its name",
          "11:00 AM — Allah Valley agricultural landscape drive: the broad flat valley floor of rice and corn cultivation; the rural character of the Sultan Kudarat interior",
          "12:30 PM — Lunch in Isulan or along the Allah Valley road",
          "2:00 PM — Lake Buluan approach: drive to the Lake Buluan shoreline access (guide and advance community coordination required; exact shoreline access point confirmed in advance)",
          "3:30 PM — Lake Buluan: one of the largest freshwater lakes in Mindanao; fishing community character and lake views",
          "5:00 PM — Return to Tacurong City",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Tacurong City Market and Departure",
        details: [
          "7:30 AM — Breakfast and check-out",
          "9:00 AM — Tacurong City public market: regional produce, dried goods, and Sultan Kudarat pasalubong",
          "10:30 AM — Final Allah River or city area walk",
          "12:00 PM — Lunch in Tacurong City",
          "1:30 PM — Drive back to General Santos City Airport (approximately 1.5 hours) for departure flight to Manila or Cebu City",
        ],
      },
    ],
  },

  "Surigao del Norte": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "General Luna, Siargao Island (via Sayak Airport, Del Carmen, Surigao del Norte)",
    transport:
      "Fly from Manila or Cebu City to Sayak Airport, Siargao Island (Del Carmen, Surigao del Norte; approximately 1.5–2 hours from Manila via Cebu Pacific or Philippine Airlines; subject to airline schedule and seasonal frequency). Alternatively, fly to Surigao City Airport and take a ferry to Dapa Port, Siargao (approximately 2 hours by RORO or fast craft; sea conditions apply). From Sayak Airport, van or habal-habal hire to General Luna (approximately 30 minutes). Island activities including rock pools, mangroves, and island hopping require registered banca operators; all sea-based activities are subject to weather, wave height, and tidal conditions.",
    bestFor: "Surf travelers and surf culture groups, island hopping and snorkel seekers, mangrove eco-tourism groups, heritage church travelers, Mindanao island escape routes",
    costingNote:
      "Package rates are inquiry-based. Cloud 9 surfing is best experienced from September to November at peak swell; non-surfers can observe from the boardwalk. Magpupungko rock pools are only accessible at low tide; timing must be confirmed with guides before the visit. Island hopping around Guyam, Naked, and Daku islands and the Sugba Lagoon boat tour require registered banca operators and are subject to weather and sea conditions.",
    supplierChecks: [
      "Accommodation in General Luna, Siargao Island (advance booking essential during peak surf season September–November)",
      "Sayak Airport van or habal-habal hire to General Luna",
      "Registered banca operator for island hopping (Guyam, Naked Island, Daku Island)",
      "Sugba Lagoon registered boat tour operator and DENR permit coordination",
      "Magpupungko rock pools guide and tidal timing confirmation",
    ],
    highlights: [
      "Cloud 9, General Luna — the surf break that established Siargao as the Philippines' surf capital; a hollow right-hand reef break and the venue of international surfing competitions",
      "Magpupungko rock pools, Pilar — natural tidal pools in a rock formation exposed at low tide; one of the most striking natural features on the island",
      "Siargao island hopping — Guyam Island (small forested island with white sand), Naked Island (exposed sandbar), and Daku Island (fishing community and long beach strip)",
      "Sugba Lagoon, Del Carmen — a large inland lagoon accessible by registered boat in the Del Carmen mangrove corridor; clear jade-green water and limestone cliff framing",
      "Del Carmen mangrove forest — the largest mangrove forest in the Philippines by area; a significant ecological corridor along the western Siargao coast",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Manila to Siargao Island — Airport Arrival and General Luna Orientation",
        details: [
          "Morning — Fly from Manila or Cebu City to Sayak Airport, Siargao (Del Carmen); van or habal-habal to General Luna (approximately 30 minutes)",
          "Midday — Check-in at accommodation in General Luna",
          "1:30 PM — Lunch in General Luna featuring Siargao seafood",
          "3:00 PM — Cloud 9 boardwalk: the surfing landmark; observation deck above the reef break gives non-surfers a full view of the wave; surfboard rentals and beginner lessons available through registered operators for those who want to try",
          "4:30 PM — General Luna beach walk: the surf town's coastal strip, Siargao Sea views, and island atmosphere",
          "Evening — Dinner at a General Luna beachside restaurant; guide briefing on the following day's island and rock pool circuit",
        ],
      },
      {
        day: "Day 2",
        title: "Magpupungko Rock Pools and Siargao Island Hopping",
        details: [
          "7:00 AM — Breakfast",
          "8:00 AM — Drive to Magpupungko, Pilar (approximately 45 minutes from General Luna): natural tidal rock pools (access requires low tide; guide confirms tidal window before departure; arrival at the pools must coincide with low water for pool access)",
          "10:00 AM — Return drive to General Luna",
          "11:00 AM — Registered banca departure for island hopping: Guyam Island (small forested sandbar island), Naked Island (open sandbar), Daku Island (fishing community and beach strip); packed lunch served onboard or at Daku Island",
          "12:30 PM — Daku Island: beach lunch and rest on the longest of the three islands",
          "2:30 PM — Return banca to General Luna (sea conditions and wave height confirmed with operator before each crossing)",
          "4:00 PM — Rest and afternoon free time in General Luna",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Sugba Lagoon or Del Carmen Mangroves and Departure",
        details: [
          "7:00 AM — Breakfast and check-out (luggage stored at accommodation or van)",
          "8:30 AM — Drive to Del Carmen, Siargao (approximately 45 minutes from General Luna)",
          "9:30 AM — Sugba Lagoon: registered boat tour through the Del Carmen mangrove estuary to the enclosed jade-green lagoon (DENR permit and registered operator required; advance booking recommended; sea and lagoon entry conditions subject to operator assessment on the day)",
          "11:30 AM — Del Carmen mangrove boardwalk: brief walk through the mangrove forest edges; guide orientation on the ecological significance of the CARAGA mangrove corridor",
          "1:00 PM — Return to Del Carmen; lunch before departure",
          "2:30 PM — Transfer to Sayak Airport for departure flight to Manila or Cebu City",
        ],
      },
    ],
  },

  "Surigao del Sur": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Tandag City, Surigao del Sur (via Butuan City, Bancasi Airport and overland transfer)",
    transport:
      "Fly from Manila or Cebu City to Bancasi Airport, Butuan City (Agusan del Norte; approximately 1.5 hours from Manila via Cebu Pacific or Philippine Airlines; Butuan is the CARAGA regional gateway). Drive south from Butuan City to Hinatuan and then to Tandag City, the Surigao del Sur capital (total approximately 3.5–4 hours; road passes through Caraga coastal highway). Tinuy-an Falls in Bislig City is approximately 2 hours south of Tandag City. Britania Island Group in San Agustin is approximately 45 minutes north of Tandag City. All island hopping requires registered banca operators and is subject to weather and sea conditions.",
    bestFor: "Waterfall heritage travelers, enchanted river groups, island hopping seekers, Mindanao CARAGA regional routes, small groups on Surigao coastal heritage circuits",
    costingNote:
      "Package rates are inquiry-based. Hinatuan Enchanted River (Hinatuan, Surigao del Sur) has a scheduled daily fish-feeding ritual at noon; timing the visit around this is recommended and should be confirmed locally. Tinuy-an Falls in Bislig operates with an entrance fee and guide; trail conditions vary in wet season. Britania Island Group island hopping requires registered banca operators and advance coordination with the San Agustin tourism office.",
    supplierChecks: [
      "Hotel in Tandag City",
      "Butuan City to Tandag City van hire and driver experienced with the Caraga coastal road",
      "Hinatuan Enchanted River guide and fish-feeding schedule confirmation",
      "Tinuy-an Falls registered guide and Bislig City tourism coordination",
      "Britania Island Group registered banca operator and San Agustin tourism office coordination",
    ],
    highlights: [
      "Hinatuan Enchanted River, Hinatuan — a short but remarkably deep river fed by a submarine spring; its luminous blue-green water and daily fish-feeding ritual are among the most photographed natural spectacles in Mindanao",
      "Tinuy-an Falls, Bislig — the widest waterfall in the Philippines; a multi-tiered curtain of water descending through forested ravines; often described as the Niagara of the Philippines",
      "Britania Island Group, San Agustin — a cluster of small forested islands with white sand beaches and clear water off the Surigao del Sur coast",
      "Tandag City — the quiet Surigao del Sur provincial capital on Tandag Bay; a coastal city with a relaxed provincial character and the logistical base for the province's dispersed attractions",
      "Surigao del Sur coastal highway — the Caraga coastal road connecting the province's waterfall, river, and island destinations through a forested coastal landscape",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Butuan City to Hinatuan Enchanted River and Tandag City Arrival",
        details: [
          "Morning — Fly to Bancasi Airport, Butuan City; met by van driver for the southbound Caraga coastal highway drive",
          "10:00 AM — Begin drive south from Butuan City toward Hinatuan, Surigao del Sur (approximately 3 hours along the coastal highway)",
          "1:00 PM — Hinatuan, Surigao del Sur: Hinatuan Enchanted River; the brilliantly clear submarine-spring-fed river where the daily fish-feeding event typically occurs at noon (timing with the fish-feeding ritual requires coordination with local tourism; the event schedule should be confirmed in advance)",
          "2:30 PM — River swim in the designated area at Hinatuan Enchanted River (swimming is permitted in sections with lifeguards; diving into the spring's deeper zone is restricted)",
          "3:30 PM — Continue drive south to Tandag City (approximately 1 hour from Hinatuan)",
          "5:00 PM — Arrive Tandag City; check-in at hotel",
          "Evening — Dinner in Tandag City; briefing on the Tinuy-an Falls visit the following morning",
        ],
      },
      {
        day: "Day 2",
        title: "Tinuy-an Falls, Bislig City",
        details: [
          "7:00 AM — Breakfast at hotel",
          "8:00 AM — Drive from Tandag City south to Bislig City (approximately 2 hours; road follows the Surigao del Sur coast)",
          "10:00 AM — Tinuy-an Falls, Bislig City: the widest waterfall in the Philippines; registered guide required; descent trail through forested ravine to the tiered waterfall base; swimming in designated pool areas at the base (trail conditions vary in wet season; guide-only access)",
          "12:30 PM — Lunch in Bislig City",
          "2:00 PM — Brief Bislig City coastal orientation: Bislig Bay and the Surigao del Sur southern coast",
          "3:30 PM — Return drive to Tandag City (approximately 2 hours)",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Britania Island Group and Return to Butuan City",
        details: [
          "6:30 AM — Early breakfast and check-out",
          "7:30 AM — Drive north from Tandag City to San Agustin, Surigao del Sur (approximately 45 minutes)",
          "8:30 AM — Britania Island Group island hopping: registered banca tour among the small forested islands and white-sand beaches of the Britania Group (San Agustin tourism office coordination and registered banca operator required; sea conditions and wave height must be assessed before departure)",
          "11:00 AM — Island beach stop and swim in the Britania Group",
          "12:00 PM — Packed lunch on the island or return to San Agustin for lunch",
          "1:30 PM — Return banca to San Agustin",
          "2:30 PM — Begin northbound drive from San Agustin toward Butuan City (approximately 4 hours via Caraga coastal highway)",
          "Evening — Arrive Butuan City; overnight in Butuan or departure on an evening flight if scheduling allows",
        ],
      },
    ],
  },

  "Tawi-Tawi": {
    duration: "3 Days / 2 Nights",
    gatewayBase: "Bongao, Tawi-Tawi (via Zamboanga City regional air connection)",
    transport:
      "Fly from Manila or Cebu City to Zamboanga City Airport. Onward regional air connection to Bongao Airport, Tawi-Tawi (approximately 40 minutes by regional aircraft; schedules and aircraft type subject to operational availability). All inter-island transfers to Simunul, Panampangan, and surrounding islands require registered banca operators operating from Bongao; sea conditions, tidal state, and wave height must be confirmed before any island departure. All on-ground logistics are coordinated through an accredited regional operator in advance with Bangsamoro Tourism Office guidance.",
    bestFor: "Philippine Islamic heritage specialists, oldest-mosque pilgrimage travelers, sea nomad culture groups, researchers and documentary travelers with confirmed regional operator coordination",
    costingNote:
      "Package rates are inquiry-based. Access to Tawi-Tawi requires advance coordination with the Bangsamoro Tourism Office and an accredited regional tour operator. Travelers are advised to review current travel advisories from the Philippine Department of Foreign Affairs and their home country's consular guidance before confirming travel. All site access, island crossings, and community visits are operator-managed throughout. Panampangan sandbar and inter-island banca access are subject to sea conditions and operator assessment.",
    supplierChecks: [
      "Bangsamoro Tourism Office advance coordination and operator endorsement",
      "Zamboanga City to Bongao regional air connection booking (subject to schedule and availability)",
      "Accredited Bangsamoro regional tour operator for all on-ground management",
      "Operator-selected and coordinated accommodation in Bongao",
      "Registered banca operator for Simunul, Panampangan, and inter-island transfers",
    ],
    highlights: [
      "Sheikh Karimul Makhdum Mosque, Simunul — built in 1380 AD and recognized as the oldest mosque in the Philippines; an extraordinary milestone in the history of Islam's arrival in the Philippine archipelago",
      "Bud Bongao (Bongao Peak) — the sacred forested hill rising above Bongao town; home to long-tailed macaques regarded as sacred by the local community; a spiritual landmark of the Tawi-Tawi archipelago",
      "Panampangan Island sandbar — one of the longest sandbars in the Philippines; a remote white-sand strip accessible by banca across the Tawi-Tawi sea",
      "Sama Dilaut (Bajau Laut) sea nomad heritage — the Sama Dilaut of Tawi-Tawi are among the world's last sea nomadic peoples; their distinctive stilt village and boat-dwelling culture defines the human geography of the archipelago",
      "Tawi-Tawi weaving heritage — the Tarawakan and Sama weaving traditions of Tawi-Tawi; intricate textile patterns woven on backstrap looms using traditional geometric and maritime motifs",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Zamboanga City to Bongao — Regional Transfer and Bongao Orientation",
        details: [
          "Morning — Fly from Manila or Cebu City to Zamboanga City Airport; met by operator representative",
          "Midday — Operator-arranged regional air connection to Bongao Airport, Tawi-Tawi (approximately 40 minutes; subject to schedule and operational conditions)",
          "Afternoon — Arrive Bongao; transfer to operator-selected accommodation",
          "4:00 PM — Bongao town orientation walk: waterfront promenade, market district, and the Tawi-Tawi Sea character of the provincial capital",
          "5:00 PM — Bud Bongao (Bongao Peak) approach: the sacred hill above town; the macaque colony at the lower trail and the spiritual significance of the peak to the local community (ascent to the summit is a moderate hike; guide required; community protocols around the sacred site must be respected)",
          "Evening — Dinner at accommodation or operator-arranged local setting; guide briefing on the Simunul mosque visit and island access for the following day",
        ],
      },
      {
        day: "Day 2",
        title: "Simunul — Sheikh Karimul Makhdum Mosque and Sama Heritage",
        details: [
          "7:00 AM — Breakfast at accommodation",
          "8:00 AM — Registered banca departure from Bongao to Simunul Island (crossing time and sea conditions confirmed with operator before departure)",
          "9:00 AM — Sheikh Karimul Makhdum Mosque, Simunul: the oldest mosque in the Philippines, built in 1380 AD; guided heritage visit with context on the mosque's role in the arrival of Islam in the Philippine archipelago (appropriate dress is required; visitors follow mosque entry protocols; guide leads heritage interpretation)",
          "11:00 AM — Simunul community: brief walk through the island's historic village setting with the Sulu Sea and surrounding Tawi-Tawi islands as backdrop",
          "12:00 PM — Return banca to Bongao (sea conditions apply)",
          "1:00 PM — Lunch in Bongao featuring Sama-Tausug cuisine",
          "3:00 PM — Sama Dilaut stilt village approach from Bongao waterfront: the over-water community visible from the Bongao shoreline; cultural guide context on the sea nomad identity and livelihood traditions of the Sama Dilaut (full community immersion visits require prior operator arrangement and community consent)",
          "5:00 PM — Tawi-Tawi weaving session: traditional Sama textile introduction with a local weaver (subject to advance operator arrangement and artisan availability)",
          "Evening — Dinner and rest",
        ],
      },
      {
        day: "Day 3",
        title: "Panampangan Sandbar and Departure",
        details: [
          "7:00 AM — Breakfast and check-out",
          "8:00 AM — Registered banca departure from Bongao to Panampangan Island sandbar (island crossing distance and sea conditions must be confirmed with operator before departure; not accessible in rough sea states)",
          "9:30 AM — Panampangan sandbar: one of the longest sandbars in the Philippines; white sand, the surrounding Tawi-Tawi Sea, and the remote southern archipelago horizon",
          "11:30 AM — Return banca to Bongao (conditions apply)",
          "12:30 PM — Lunch in Bongao; final Tawi-Tawi craft market: local weaving, shell work, and Sama artisan goods",
          "2:00 PM — Operator transfer to Bongao Airport for regional flight back to Zamboanga City",
          "Onward — Zamboanga City to Manila or Cebu City by commercial flight (to be booked in advance with operator coordination)",
        ],
      },
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
