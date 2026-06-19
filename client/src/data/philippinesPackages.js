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
