import type { ProductVariant } from "./products";

// Image pool for cycling across variants
const IMG = {
  whiteQuartz: "https://images.unsplash.com/photo-1694376329587-2b88f6c09aab?w=400&q=80&fit=crop",
  greyQuartz: "https://images.unsplash.com/photo-1674831307533-96f363902316?w=400&q=80&fit=crop",
  darkQuartz: "https://images.unsplash.com/photo-1690229160941-ed70482540de?w=400&q=80&fit=crop",
  beigeQuartz: "https://images.unsplash.com/photo-1745103433871-1e762fe9aadb?w=400&q=80&fit=crop",
  brownQuartz: "https://images.unsplash.com/photo-1679407263861-fd418ef4b5c7?w=400&q=80&fit=crop",
  creamSurface: "https://images.unsplash.com/photo-1764148905481-a00fff72cfd9?w=400&q=80&fit=crop",
  darkSurface: "https://images.unsplash.com/photo-1550053808-52a75a05955d?w=400&q=80&fit=crop",
  neutralSurface: "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?w=400&q=80&fit=crop",
  blueTone: "https://images.unsplash.com/photo-1722528251371-fef27f8cfb99?w=400&q=80&fit=crop",
  greenTone: "https://images.unsplash.com/photo-1592302168572-6791a029bda8?w=400&q=80&fit=crop",
  pinkTone: "https://images.unsplash.com/photo-1750748303414-e59454b1551b?w=400&q=80&fit=crop",
  redTone: "https://images.unsplash.com/photo-1761773735383-48df0e56ebb8?w=400&q=80&fit=crop",
  engineered: "https://images.unsplash.com/photo-1769763828411-eb09bb05d97f?w=400&q=80&fit=crop",
  terrazzo: "https://images.unsplash.com/photo-1628617311870-2fa156f7e630?w=400&q=80&fit=crop",
};

// ─── Quartz Variants (27 Products) ── Prices in PHP per sqm ─────────────────
export const quartzVariants: ProductVariant[] = [
  // Premium marble-look quartz
  { id: "calacatta-nuvo", name: "Calacatta Nuvo", image: IMG.whiteQuartz, price: 21500, finish: "Polished", color: "White/Grey" },
  { id: "statuario-maximus", name: "Statuario Maximus", image: IMG.creamSurface, price: 22800, finish: "Polished", color: "White" },
  { id: "empira-white", name: "Empira White", image: IMG.whiteQuartz, price: 19500, finish: "Polished", color: "White" },
  { id: "empira-black", name: "Empira Black", image: IMG.darkQuartz, price: 18800, finish: "Polished", color: "Black" },

  // Solid white series
  { id: "pure-white", name: "Pure White", image: IMG.creamSurface, price: 13500, finish: "Polished", color: "Pure White" },
  { id: "snow-white", name: "Snow White", image: IMG.whiteQuartz, price: 12800, finish: "Matte", color: "White" },
  { id: "organic-white", name: "Organic White", image: IMG.creamSurface, price: 14200, finish: "Matte", color: "White" },

  // Grey / neutral tones
  { id: "misty-carrera", name: "Misty Carrera", image: IMG.greyQuartz, price: 16500, finish: "Polished", color: "White/Grey" },
  { id: "london-grey", name: "London Grey", image: IMG.greyQuartz, price: 17200, finish: "Polished", color: "Grey" },

  // Concrete series
  { id: "rugged-concrete", name: "Rugged Concrete", image: IMG.greyQuartz, price: 18500, finish: "Rough", color: "Grey" },
  { id: "airy-concrete", name: "Airy Concrete", image: IMG.beigeQuartz, price: 17800, finish: "Rough", color: "Light Grey" },
  { id: "raw-concrete", name: "Raw Concrete", image: IMG.greyQuartz, price: 18200, finish: "Rough", color: "Dark Grey" },
  { id: "fresh-concrete", name: "Fresh Concrete", image: IMG.beigeQuartz, price: 17500, finish: "Matte", color: "Warm Grey" },

  // Dark / dramatic series
  { id: "jet-black", name: "Jet Black", image: IMG.darkQuartz, price: 15500, finish: "Polished", color: "Black" },
  { id: "piatra-grey", name: "Piatra Grey", image: IMG.darkSurface, price: 19000, finish: "Polished", color: "Charcoal" },
  { id: "vanilla-noir", name: "Vanilla Noir", image: IMG.darkQuartz, price: 20500, finish: "Polished", color: "Black/Gold" },

  // Mid-range tones
  { id: "coastal-grey", name: "Coastal Grey", image: IMG.greyQuartz, price: 15800, finish: "Polished", color: "Grey/White" },
  { id: "desert-limestone", name: "Desert Limestone", image: IMG.beigeQuartz, price: 16200, finish: "Matte", color: "Beige" },
  { id: "excava", name: "Excava", image: IMG.brownQuartz, price: 17800, finish: "Rough", color: "Brown/Grey" },
  { id: "woodlands", name: "Woodlands", image: IMG.brownQuartz, price: 16500, finish: "Matte", color: "Brown" },

  // Warm tones
  { id: "tuscan-dawn", name: "Tuscan Dawn", image: IMG.beigeQuartz, price: 15200, finish: "Polished", color: "Beige/Cream" },
  { id: "buttermilk", name: "Buttermilk", image: IMG.beigeQuartz, price: 13800, finish: "Polished", color: "Cream" },

  // Specialty
  { id: "midnight-corvo", name: "Midnight Corvo", image: IMG.darkSurface, price: 17500, finish: "Matte", color: "Black" },
  { id: "clearskies", name: "Clearskies", image: IMG.whiteQuartz, price: 14800, finish: "Polished", color: "White/Blue" },
  { id: "pebble", name: "Pebble", image: IMG.beigeQuartz, price: 13200, finish: "Polished", color: "Warm Beige" },
  { id: "shitake", name: "Shitake", image: IMG.brownQuartz, price: 14500, finish: "Polished", color: "Taupe" },
  { id: "primordia", name: "Primordia", image: IMG.terrazzo, price: 19500, finish: "Rough", color: "Grey/Terrazzo" },
];

// ─── Solid Surface Variants (32 Products) ── Prices in PHP per sqm ──────────
export const solidSurfaceVariants: ProductVariant[] = [
  // White series
  { id: "glacier-white", name: "Glacier White", image: IMG.whiteQuartz, price: 8500, finish: "Matte", color: "White" },
  { id: "designer-white", name: "Designer White", image: IMG.creamSurface, price: 9200, finish: "Matte", color: "White" },
  { id: "cameo-white", name: "Cameo White", image: IMG.whiteQuartz, price: 8800, finish: "Matte", color: "Warm White" },

  // Neutral / warm series
  { id: "linen", name: "Linen", image: IMG.beigeQuartz, price: 7500, finish: "Matte", color: "Linen" },
  { id: "bisque", name: "Bisque", image: IMG.beigeQuartz, price: 7200, finish: "Matte", color: "Bisque" },
  { id: "bone", name: "Bone", image: IMG.creamSurface, price: 7800, finish: "Matte", color: "Bone" },
  { id: "vanilla", name: "Vanilla", image: IMG.beigeQuartz, price: 7500, finish: "Matte", color: "Vanilla" },
  { id: "almond", name: "Almond", image: IMG.beigeQuartz, price: 7200, finish: "Matte", color: "Almond" },

  // Sand / earth tones
  { id: "sahara", name: "Sahara", image: IMG.brownQuartz, price: 7800, finish: "Matte", color: "Sand" },
  { id: "sandstone", name: "Sandstone", image: IMG.beigeQuartz, price: 7500, finish: "Matte", color: "Sandstone" },
  { id: "dune", name: "Dune", image: IMG.beigeQuartz, price: 8200, finish: "Semi-gloss", color: "Beige" },
  { id: "tumbleweed", name: "Tumbleweed", image: IMG.brownQuartz, price: 7800, finish: "Matte", color: "Brown" },

  // Dark / brown series
  { id: "cocoa-brown", name: "Cocoa Brown", image: IMG.brownQuartz, price: 8500, finish: "Matte", color: "Dark Brown" },
  { id: "deep-espresso", name: "Deep Espresso", image: IMG.darkQuartz, price: 9200, finish: "Matte", color: "Espresso" },
  { id: "deep-nocturne", name: "Deep Nocturne", image: IMG.darkSurface, price: 9800, finish: "Matte", color: "Black" },
  { id: "midnight-pearl", name: "Midnight Pearl", image: IMG.darkQuartz, price: 10500, finish: "Semi-gloss", color: "Black Pearl" },

  // Grey series
  { id: "dove-grey", name: "Dove Grey", image: IMG.greyQuartz, price: 7800, finish: "Matte", color: "Light Grey" },
  { id: "platinum", name: "Platinum", image: IMG.greyQuartz, price: 8800, finish: "Semi-gloss", color: "Grey" },
  { id: "sterling", name: "Sterling", image: IMG.greyQuartz, price: 8200, finish: "Matte", color: "Silver Grey" },
  { id: "pewter", name: "Pewter", image: IMG.greyQuartz, price: 8500, finish: "Matte", color: "Dark Grey" },
  { id: "rain-cloud", name: "Rain Cloud", image: IMG.greyQuartz, price: 8200, finish: "Matte", color: "Blue Grey" },

  // Color accents
  { id: "blue-mist", name: "Blue Mist", image: IMG.blueTone, price: 9500, finish: "Matte", color: "Blue" },
  { id: "aqua", name: "Aqua", image: IMG.blueTone, price: 9800, finish: "Semi-gloss", color: "Aqua" },
  { id: "mint-ice", name: "Mint Ice", image: IMG.greenTone, price: 9200, finish: "Matte", color: "Mint" },
  { id: "moss-green", name: "Moss Green", image: IMG.greenTone, price: 9500, finish: "Matte", color: "Green" },
  { id: "cameo-pink", name: "Cameo Pink", image: IMG.pinkTone, price: 9200, finish: "Matte", color: "Pink" },
  { id: "rose-quartz", name: "Rose Quartz", image: IMG.pinkTone, price: 9800, finish: "Matte", color: "Rose" },
  { id: "red-shimmer", name: "Red Shimmer", image: IMG.redTone, price: 10200, finish: "Semi-gloss", color: "Red" },

  // Specialty / textured
  { id: "rice-paper", name: "Rice Paper", image: IMG.creamSurface, price: 8500, finish: "Matte", color: "Off-White" },
  { id: "abalone", name: "Abalone", image: IMG.neutralSurface, price: 11200, finish: "Semi-gloss", color: "Pearl" },
  { id: "savannah", name: "Savannah", image: IMG.beigeQuartz, price: 7800, finish: "Matte", color: "Warm Beige" },
  { id: "arctic-ice", name: "Arctic Ice", image: IMG.whiteQuartz, price: 9500, finish: "Semi-gloss", color: "Ice White" },
];
