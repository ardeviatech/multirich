import type { ProductVariant } from "./products";

// Image pool for cycling across variants
const IMG = {
  whiteMarble: "https://images.unsplash.com/photo-1694376329587-2b88f6c09aab?w=400&q=80&fit=crop",
  greyStone: "https://images.unsplash.com/photo-1674831307533-96f363902316?w=400&q=80&fit=crop",
  darkGranite: "https://images.unsplash.com/photo-1690229160941-ed70482540de?w=400&q=80&fit=crop",
  darkCountertop: "https://images.unsplash.com/photo-1550053808-52a75a05955d?w=400&q=80&fit=crop",
  beigeStone: "https://images.unsplash.com/photo-1745103433871-1e762fe9aadb?w=400&q=80&fit=crop",
  brownSlab: "https://images.unsplash.com/photo-1679407263861-fd418ef4b5c7?w=400&q=80&fit=crop",
  redGranite: "https://images.unsplash.com/photo-1761773735383-48df0e56ebb8?w=400&q=80&fit=crop",
  greenMarble: "https://images.unsplash.com/photo-1592302168572-6791a029bda8?w=400&q=80&fit=crop",
  pinkStone: "https://images.unsplash.com/photo-1750748303414-e59454b1551b?w=400&q=80&fit=crop",
  bluePearl: "https://images.unsplash.com/photo-1722528251371-fef27f8cfb99?w=400&q=80&fit=crop",
  flamedGranite: "https://images.unsplash.com/photo-1628617311870-2fa156f7e630?w=400&q=80&fit=crop",
  honeyOnyx: "https://images.unsplash.com/photo-1746213864767-52d20eb43aba?w=400&q=80&fit=crop",
  naturalOnyx: "https://images.unsplash.com/photo-1738880675051-31ef87ee8344?w=400&q=80&fit=crop",
  marbleSlab: "https://images.unsplash.com/photo-1764148905481-a00fff72cfd9?w=400&q=80&fit=crop",
};

// ─── Marble Variants (68 Products) ── Prices in PHP per sqm ─────────────────
export const marbleVariants: ProductVariant[] = [
  // Calacatta series (ultra-premium Italian)
  { id: "calacatta-gold", name: "Calacatta Gold", image: IMG.whiteMarble, price: 42500, finish: "Polished", color: "White/Gold" },
  { id: "calacatta-extra", name: "Calacatta Extra", image: IMG.marbleSlab, price: 45000, finish: "Polished", color: "White" },
  { id: "calacatta-viola", name: "Calacatta Viola", image: IMG.pinkStone, price: 38500, finish: "Polished", color: "White/Purple" },
  { id: "calacatta-borghini", name: "Calacatta Borghini", image: IMG.whiteMarble, price: 40000, finish: "Polished", color: "White/Grey" },
  { id: "calacatta-macchia-vecchia", name: "Calacatta Macchia Vecchia", image: IMG.beigeStone, price: 36000, finish: "Polished", color: "Cream/Gold" },

  // Carrara series (classic Italian, more accessible)
  { id: "carrara-white", name: "Carrara White", image: IMG.greyStone, price: 12500, finish: "Polished", color: "White/Grey" },
  { id: "carrara-c", name: "Carrara C", image: IMG.whiteMarble, price: 11000, finish: "Polished", color: "White" },
  { id: "carrara-cd", name: "Carrara CD", image: IMG.greyStone, price: 9800, finish: "Honed", color: "White/Grey" },
  { id: "carrara-gioia", name: "Carrara Gioia", image: IMG.marbleSlab, price: 14200, finish: "Polished", color: "White" },
  { id: "carrara-venatino", name: "Carrara Venatino", image: IMG.whiteMarble, price: 13500, finish: "Polished", color: "White/Blue" },

  // Statuario series (premium white)
  { id: "statuario", name: "Statuario", image: IMG.whiteMarble, price: 35000, finish: "Polished", color: "White" },
  { id: "statuario-extra", name: "Statuario Extra", image: IMG.marbleSlab, price: 38000, finish: "Polished", color: "White" },
  { id: "statuario-venato", name: "Statuario Venato", image: IMG.whiteMarble, price: 32500, finish: "Polished", color: "White/Grey" },

  // Bianco series
  { id: "bianco-lasa", name: "Bianco Lasa", image: IMG.marbleSlab, price: 28000, finish: "Polished", color: "White" },
  { id: "bianco-dolomiti", name: "Bianco Dolomiti", image: IMG.whiteMarble, price: 15800, finish: "Honed", color: "White" },
  { id: "bianco-perlino", name: "Bianco Perlino", image: IMG.beigeStone, price: 11200, finish: "Polished", color: "Beige/White" },
  { id: "bianco-sivec", name: "Bianco Sivec", image: IMG.marbleSlab, price: 26500, finish: "Polished", color: "Pure White" },

  // Nero / Black series
  { id: "nero-marquina", name: "Nero Marquina", image: IMG.darkGranite, price: 16500, finish: "Polished", color: "Black" },
  { id: "nero-marquina-extra", name: "Nero Marquina Extra", image: IMG.darkCountertop, price: 18500, finish: "Polished", color: "Black" },
  { id: "negro-bilbao", name: "Negro Bilbao", image: IMG.darkGranite, price: 14800, finish: "Polished", color: "Black" },
  { id: "sahara-noir", name: "Sahara Noir", image: IMG.darkCountertop, price: 22000, finish: "Polished", color: "Black/Gold" },
  { id: "port-laurent", name: "Port Laurent", image: IMG.darkGranite, price: 19500, finish: "Polished", color: "Black/Gold" },

  // Emperador series
  { id: "emperador-dark", name: "Emperador Dark", image: IMG.brownSlab, price: 13200, finish: "Polished", color: "Dark Brown" },
  { id: "emperador-light", name: "Emperador Light", image: IMG.beigeStone, price: 10800, finish: "Polished", color: "Light Brown" },

  // Crema series
  { id: "crema-marfil", name: "Crema Marfil", image: IMG.beigeStone, price: 9500, finish: "Polished", color: "Cream" },
  { id: "crema-marfil-select", name: "Crema Marfil Select", image: IMG.beigeStone, price: 11800, finish: "Polished", color: "Cream" },
  { id: "crema-valencia", name: "Crema Valencia", image: IMG.beigeStone, price: 8900, finish: "Polished", color: "Cream/Beige" },
  { id: "crema-nova", name: "Crema Nova", image: IMG.marbleSlab, price: 10200, finish: "Polished", color: "Cream" },

  // Botticino series
  { id: "botticino-classico", name: "Botticino Classico", image: IMG.beigeStone, price: 9200, finish: "Polished", color: "Beige" },
  { id: "botticino-fiorito", name: "Botticino Fiorito", image: IMG.beigeStone, price: 8800, finish: "Polished", color: "Beige" },
  { id: "daino-reale", name: "Daino Reale", image: IMG.beigeStone, price: 10500, finish: "Polished", color: "Beige" },

  // Travertine series
  { id: "travertino-romano", name: "Travertino Romano", image: IMG.beigeStone, price: 8500, finish: "Honed", color: "Beige" },
  { id: "travertino-classico", name: "Travertino Classico", image: IMG.brownSlab, price: 7800, finish: "Honed", color: "Walnut" },
  { id: "travertino-noce", name: "Travertino Noce", image: IMG.brownSlab, price: 8200, finish: "Honed", color: "Brown" },
  { id: "travertino-silver", name: "Travertino Silver", image: IMG.greyStone, price: 9000, finish: "Honed", color: "Silver Grey" },

  // Rosa series
  { id: "rosa-portogallo", name: "Rosa Portogallo", image: IMG.pinkStone, price: 12800, finish: "Polished", color: "Pink" },
  { id: "rosa-aurora", name: "Rosa Aurora", image: IMG.pinkStone, price: 11500, finish: "Polished", color: "Pink" },
  { id: "rosa-perlino", name: "Rosa Perlino", image: IMG.pinkStone, price: 9800, finish: "Polished", color: "Soft Pink" },

  // Rosso / Red series
  { id: "rosso-levanto", name: "Rosso Levanto", image: IMG.redGranite, price: 14500, finish: "Polished", color: "Red" },
  { id: "rosso-verona", name: "Rosso Verona", image: IMG.redGranite, price: 11200, finish: "Polished", color: "Red/Pink" },
  { id: "rojo-alicante", name: "Rojo Alicante", image: IMG.redGranite, price: 12000, finish: "Polished", color: "Red" },

  // Verde / Green series
  { id: "verde-guatemala", name: "Verde Guatemala", image: IMG.greenMarble, price: 15500, finish: "Polished", color: "Green" },
  { id: "verde-alpi", name: "Verde Alpi", image: IMG.greenMarble, price: 14200, finish: "Polished", color: "Dark Green" },
  { id: "verde-issorie", name: "Verde Issorie", image: IMG.greenMarble, price: 13800, finish: "Polished", color: "Green" },
  { id: "irish-green", name: "Irish Green", image: IMG.greenMarble, price: 16000, finish: "Polished", color: "Green" },
  { id: "rain-forest-green", name: "Rain Forest Green", image: IMG.greenMarble, price: 17500, finish: "Polished", color: "Green/Brown" },
  { id: "rain-forest-brown", name: "Rain Forest Brown", image: IMG.brownSlab, price: 16800, finish: "Polished", color: "Brown" },

  // Yellow / Gold series
  { id: "amarillo-triana", name: "Amarillo Triana", image: IMG.beigeStone, price: 9200, finish: "Polished", color: "Yellow" },
  { id: "giallo-siena", name: "Giallo Siena", image: IMG.beigeStone, price: 10500, finish: "Polished", color: "Yellow/Gold" },
  { id: "golden-spider", name: "Golden Spider", image: IMG.beigeStone, price: 11800, finish: "Polished", color: "Gold/White" },

  // Premium whites
  { id: "thassos-white", name: "Thassos White", image: IMG.whiteMarble, price: 24000, finish: "Polished", color: "Pure White" },
  { id: "volakas", name: "Volakas", image: IMG.whiteMarble, price: 14500, finish: "Polished", color: "White/Grey" },
  { id: "drama-white", name: "Drama White", image: IMG.marbleSlab, price: 13200, finish: "Polished", color: "White" },
  { id: "panda-white", name: "Panda White", image: IMG.whiteMarble, price: 19800, finish: "Polished", color: "White/Black" },

  // Palissandro & special greys
  { id: "palissandro-blue", name: "Palissandro Blue", image: IMG.bluePearl, price: 16500, finish: "Polished", color: "Blue/Grey" },
  { id: "palissandro-classico", name: "Palissandro Classico", image: IMG.greyStone, price: 14800, finish: "Polished", color: "Grey/Brown" },
  { id: "grey-marquina", name: "Grey Marquina", image: IMG.greyStone, price: 13500, finish: "Polished", color: "Grey" },
  { id: "pietra-grey", name: "Pietra Grey", image: IMG.darkCountertop, price: 18000, finish: "Polished", color: "Dark Grey" },
  { id: "armani-grey", name: "Armani Grey", image: IMG.greyStone, price: 15200, finish: "Polished", color: "Grey" },
  { id: "fior-di-pesco", name: "Fior di Pesco", image: IMG.pinkStone, price: 20500, finish: "Polished", color: "Grey/Purple" },

  // Arabescato series
  { id: "arabescato-orobico", name: "Arabescato Orobico", image: IMG.greyStone, price: 22500, finish: "Polished", color: "Grey/Brown" },
  { id: "arabescato-corchia", name: "Arabescato Corchia", image: IMG.whiteMarble, price: 21000, finish: "Polished", color: "White/Grey" },

  // Breccia series
  { id: "breccia-aurora", name: "Breccia Aurora", image: IMG.beigeStone, price: 13500, finish: "Polished", color: "Beige/Rose" },
  { id: "breccia-oniciata", name: "Breccia Oniciata", image: IMG.beigeStone, price: 14200, finish: "Polished", color: "Beige" },

  // Specialty
  { id: "silver-wave", name: "Silver Wave", image: IMG.greyStone, price: 15800, finish: "Polished", color: "Silver" },
  { id: "ocean-blue", name: "Ocean Blue", image: IMG.bluePearl, price: 19000, finish: "Polished", color: "Blue" },
  { id: "mystery-white", name: "Mystery White", image: IMG.whiteMarble, price: 16200, finish: "Polished", color: "White/Blue" },
  { id: "fantasy-brown", name: "Fantasy Brown", image: IMG.brownSlab, price: 14500, finish: "Polished", color: "Brown/White" },
];

// ─── Granite Variants (52 Products) ── Prices in PHP per sqm ────────────────
export const graniteVariants: ProductVariant[] = [
  // Numbered series (standard commercial granite)
  { id: "602", name: "602", image: IMG.greyStone, price: 5200, finish: "Polished", color: "Grey" },
  { id: "616", name: "616", image: IMG.darkCountertop, price: 5800, finish: "Polished", color: "Dark Grey" },
  { id: "623", name: "623", image: IMG.beigeStone, price: 5500, finish: "Polished", color: "Beige" },
  { id: "628", name: "628", image: IMG.brownSlab, price: 5400, finish: "Polished", color: "Brown" },
  { id: "635", name: "635", image: IMG.bluePearl, price: 6200, finish: "Polished", color: "Blue Grey" },
  { id: "648", name: "648", image: IMG.darkGranite, price: 5900, finish: "Polished", color: "Black" },
  { id: "654-onda-grey", name: "654 Onda Grey", image: IMG.greyStone, price: 6500, finish: "Polished", color: "Grey" },
  { id: "664-granite-flamed", name: "664 Granite Flamed", image: IMG.flamedGranite, price: 7200, finish: "Flamed", color: "Grey" },
  { id: "672", name: "672", image: IMG.beigeStone, price: 5300, finish: "Polished", color: "Beige" },
  { id: "681", name: "681", image: IMG.darkCountertop, price: 6100, finish: "Polished", color: "Dark Grey" },
  { id: "684", name: "684", image: IMG.brownSlab, price: 5600, finish: "Polished", color: "Brown" },
  { id: "690", name: "690", image: IMG.greyStone, price: 5000, finish: "Polished", color: "Light Grey" },
  { id: "695", name: "695", image: IMG.darkGranite, price: 6300, finish: "Polished", color: "Charcoal" },
  { id: "701", name: "701", image: IMG.beigeStone, price: 5100, finish: "Polished", color: "Cream" },
  { id: "708-grey-polished", name: "708 Grey Polished", image: IMG.greyStone, price: 5800, finish: "Polished", color: "Grey" },
  { id: "712", name: "712", image: IMG.flamedGranite, price: 6800, finish: "Flamed", color: "Grey" },
  { id: "718-flamed", name: "718 Flamed", image: IMG.flamedGranite, price: 7500, finish: "Flamed", color: "Dark Grey" },
  { id: "725", name: "725", image: IMG.brownSlab, price: 5700, finish: "Polished", color: "Brown" },
  { id: "733", name: "733", image: IMG.darkCountertop, price: 6400, finish: "Polished", color: "Black" },
  { id: "740", name: "740", image: IMG.beigeStone, price: 5200, finish: "Polished", color: "Beige" },
  { id: "748-leathered", name: "748 Leathered", image: IMG.darkGranite, price: 7800, finish: "Leathered", color: "Black" },
  { id: "756", name: "756", image: IMG.greyStone, price: 5500, finish: "Polished", color: "Grey" },

  // Premium named granites
  { id: "black-galaxy", name: "Black Galaxy", image: IMG.darkCountertop, price: 12500, finish: "Polished", color: "Black/Gold" },
  { id: "absolute-black", name: "Absolute Black", image: IMG.darkGranite, price: 8500, finish: "Polished", color: "Black" },
  { id: "absolute-black-flamed", name: "Absolute Black Flamed", image: IMG.flamedGranite, price: 9200, finish: "Flamed", color: "Black" },
  { id: "absolute-black-leathered", name: "Absolute Black Leathered", image: IMG.darkGranite, price: 9800, finish: "Leathered", color: "Black" },

  // Kashmir series
  { id: "kashmir-white", name: "Kashmir White", image: IMG.whiteMarble, price: 7500, finish: "Polished", color: "White" },
  { id: "kashmir-gold", name: "Kashmir Gold", image: IMG.beigeStone, price: 8200, finish: "Polished", color: "Gold" },

  // Brown tones
  { id: "tan-brown", name: "Tan Brown", image: IMG.brownSlab, price: 6800, finish: "Polished", color: "Brown" },
  { id: "baltic-brown", name: "Baltic Brown", image: IMG.brownSlab, price: 7200, finish: "Polished", color: "Brown" },

  // Red tones
  { id: "imperial-red", name: "Imperial Red", image: IMG.redGranite, price: 8500, finish: "Polished", color: "Red" },
  { id: "new-imperial-red", name: "New Imperial Red", image: IMG.redGranite, price: 9000, finish: "Polished", color: "Red" },
  { id: "ruby-red", name: "Ruby Red", image: IMG.redGranite, price: 9500, finish: "Polished", color: "Red" },

  // Green tones
  { id: "verde-ubatuba", name: "Verde Ubatuba", image: IMG.greenMarble, price: 7800, finish: "Polished", color: "Green" },
  { id: "verde-butterfly", name: "Verde Butterfly", image: IMG.greenMarble, price: 8800, finish: "Polished", color: "Green" },

  // Pink tones
  { id: "rosa-porrino", name: "Rosa Porrino", image: IMG.pinkStone, price: 6500, finish: "Polished", color: "Pink" },
  { id: "rosa-beta", name: "Rosa Beta", image: IMG.pinkStone, price: 6800, finish: "Polished", color: "Pink" },

  // Steel Grey series
  { id: "steel-grey", name: "Steel Grey", image: IMG.greyStone, price: 7500, finish: "Polished", color: "Grey" },
  { id: "steel-grey-flamed", name: "Steel Grey Flamed", image: IMG.flamedGranite, price: 8200, finish: "Flamed", color: "Grey" },
  { id: "steel-grey-leathered", name: "Steel Grey Leathered", image: IMG.greyStone, price: 8800, finish: "Leathered", color: "Grey" },

  // Blue Pearl series
  { id: "blue-pearl", name: "Blue Pearl", image: IMG.bluePearl, price: 11500, finish: "Polished", color: "Blue" },
  { id: "blue-pearl-gt", name: "Blue Pearl GT", image: IMG.bluePearl, price: 13200, finish: "Polished", color: "Blue" },
  { id: "labrador-blue", name: "Labrador Blue", image: IMG.bluePearl, price: 14000, finish: "Polished", color: "Blue" },

  // Yellow / Gold / Beige tones
  { id: "giallo-ornamental", name: "Giallo Ornamental", image: IMG.beigeStone, price: 7200, finish: "Polished", color: "Gold/Beige" },
  { id: "giallo-veneziano", name: "Giallo Veneziano", image: IMG.beigeStone, price: 7500, finish: "Polished", color: "Yellow/Gold" },
  { id: "santa-cecilia", name: "Santa Cecilia", image: IMG.beigeStone, price: 7000, finish: "Polished", color: "Gold" },

  // White granites
  { id: "colonial-white", name: "Colonial White", image: IMG.whiteMarble, price: 8000, finish: "Polished", color: "White" },
  { id: "river-white", name: "River White", image: IMG.whiteMarble, price: 8500, finish: "Polished", color: "White/Grey" },
  { id: "moon-white", name: "Moon White", image: IMG.marbleSlab, price: 7800, finish: "Polished", color: "White" },
  { id: "viscount-white", name: "Viscount White", image: IMG.whiteMarble, price: 8200, finish: "Polished", color: "White/Grey" },

  // Exotic
  { id: "paradiso-bash", name: "Paradiso Bash", image: IMG.brownSlab, price: 9500, finish: "Polished", color: "Purple/Brown" },
  { id: "lavender-blue", name: "Lavender Blue", image: IMG.bluePearl, price: 10800, finish: "Polished", color: "Blue/Purple" },
];

// ─── Onyx Variants (4 Products) ── Prices in PHP per sqm ────────────────────
export const onyxVariants: ProductVariant[] = [
  { id: "honey-onyx", name: "Honey Onyx", image: IMG.honeyOnyx, price: 32000, finish: "Polished", color: "Honey Gold" },
  { id: "green-onyx", name: "Green Onyx", image: IMG.greenMarble, price: 38500, finish: "Polished", color: "Green" },
  { id: "white-onyx", name: "White Onyx", image: IMG.whiteMarble, price: 45000, finish: "Polished", color: "White" },
  { id: "red-onyx", name: "Red Onyx", image: IMG.naturalOnyx, price: 42000, finish: "Polished", color: "Red" },
];
