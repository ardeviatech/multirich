export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  brands?: string[];
  features?: string[];
  applications?: string[];
  subProducts?: SubProduct[];
}

export interface SubProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  specs?: string[];
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  image: string;
  price: number;
  finish?: string;
  color?: string;
}

import { marbleVariants, graniteVariants, onyxVariants } from "./natural-stones-variants";
import { quartzVariants, solidSurfaceVariants } from "./synthetic-stones-variants";

export const productCategories: ProductCategory[] = [
  {
    id: "natural-stones",
    slug: "natural-stones",
    name: "Natural Stones",
    subtitle: "Marble, Granite, Onyx",
    description:
      "Discover our curated collection of the world's finest natural stones. From the timeless elegance of Italian Calacatta marble to the bold drama of Black Galaxy granite, each slab is hand-selected for its unique veining, depth, and character. Our natural stones transform spaces into works of art.",
    image:
      "https://images.unsplash.com/photo-1759150467207-1d4870e074fc?w=800&q=80&fit=crop",
    brands: ["Italian Imports", "Spanish Quarries", "Indian Selections"],
    features: [
      "Hand-selected premium slabs",
      "Unique natural veining patterns",
      "Heat & scratch resistant",
      "Available in polished, honed & leathered finishes",
    ],
    applications: [
      "Kitchen countertops",
      "Bathroom vanities",
      "Feature walls",
      "Flooring",
      "Staircases",
    ],
    subProducts: [
      {
        id: "marble",
        name: "Marble",
        description:
          "Timeless elegance with distinctive veining. Our marble collection features Calacatta, Carrara, Statuario, and Nero Marquina varieties sourced from the finest quarries worldwide.",
        image:
          "https://images.unsplash.com/photo-1764148905481-a00fff72cfd9?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 18mm, 20mm, 30mm",
          "Finish: Polished, Honed, Brushed",
          "Size: Custom cut available",
        ],
        variants: marbleVariants,
      },
      {
        id: "granite",
        name: "Granite",
        description:
          "Unmatched durability and natural beauty. Our granite range includes Black Galaxy, Absolute Black, Kashmir White, and many more premium selections.",
        image:
          "https://images.unsplash.com/photo-1690229160941-ed70482540de?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 20mm, 30mm",
          "Finish: Polished, Flamed, Leathered",
          "Size: Standard slabs & custom cuts",
        ],
        variants: graniteVariants,
      },
      {
        id: "onyx",
        name: "Onyx",
        description:
          "Translucent luxury that creates breathtaking backlit features. Our onyx collection offers stunning color variations from honey gold to emerald green.",
        image:
          "https://images.unsplash.com/photo-1630756377422-7cfae60dd550?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 18mm, 20mm",
          "Finish: Polished, Bookmatched",
          "Application: Backlit walls, Reception desks",
        ],
        variants: onyxVariants,
      },
    ],
  },
  {
    id: "synthetic-stones",
    slug: "synthetic-stones",
    name: "Synthetic Stones",
    subtitle: "Quartz, Solid Surface",
    description:
      "Engineered for perfection, our synthetic stone collection combines the beauty of natural stone with superior performance. Non-porous, stain-resistant, and available in a wide range of colors and patterns to suit any design vision.",
    image:
      "https://images.unsplash.com/photo-1642935263083-2f80ed5da14f?w=800&q=80&fit=crop",
    brands: ["Caesarstone", "Silestone", "Corian"],
    features: [
      "Non-porous & hygienic surface",
      "Superior stain resistance",
      "Consistent color & pattern",
      "Low maintenance",
    ],
    applications: [
      "Kitchen countertops",
      "Commercial surfaces",
      "Healthcare facilities",
      "Laboratory tops",
    ],
    subProducts: [
      {
        id: "quartz",
        name: "Quartz",
        description:
          "Engineered quartz surfaces that combine natural quartz minerals with advanced polymer resins, creating a surface that's both beautiful and virtually maintenance-free.",
        image:
          "https://images.unsplash.com/photo-1769763828411-eb09bb05d97f?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 20mm, 30mm",
          "Finish: Polished, Matte, Rough",
          "Warranty: 15-year limited",
        ],
        variants: quartzVariants,
      },
      {
        id: "solid-surface",
        name: "Solid Surface",
        description:
          "Seamless, non-porous surfaces ideal for creating flowing designs without visible joints. Perfect for custom shapes and integrated sinks.",
        image:
          "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 6mm, 12mm",
          "Finish: Matte, Semi-gloss",
          "Seamless joint capability",
        ],
        variants: solidSurfaceVariants,
      },
    ],
  },
  {
    id: "high-pressure-laminates",
    slug: "high-pressure-laminates",
    name: "High-Pressure Laminates",
    subtitle: "Wilsonart, Arborite, Multi-Form, MF Multi-form",
    description:
      "Premium high-pressure laminates from the world's leading manufacturers. Our HPL collection offers thousands of designs, from realistic wood grains and stone patterns to solid colors and abstract textures, all engineered for lasting beauty and durability.",
    image:
      "https://images.unsplash.com/photo-1658264250874-52f403e2ebaa?w=800&q=80&fit=crop",
    brands: ["Wilsonart", "Arborite", "Multi-Form", "MF Multi-form"],
    features: [
      "Scratch & impact resistant",
      "Wide range of designs & textures",
      "Easy to clean & maintain",
      "Cost-effective surface solution",
    ],
    applications: [
      "Furniture surfaces",
      "Wall cladding",
      "Countertops",
      "Office partitions",
      "Retail fixtures",
    ],
    subProducts: [
      {
        id: "wilsonart",
        name: "Wilsonart",
        description:
          "Industry-leading HPL with an extensive design library. Known for exceptional durability and realistic surface textures.",
        image:
          "https://images.unsplash.com/photo-1658264250874-52f403e2ebaa?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 0.7mm, 1.0mm, 1.3mm",
          "Size: 4' x 8', 5' x 12'",
          "900+ designs available",
        ],
      },
      {
        id: "arborite",
        name: "Arborite",
        description:
          "High-performance decorative laminates with innovative surface technologies for residential and commercial applications.",
        image:
          "https://images.unsplash.com/photo-1658264250874-52f403e2ebaa?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 0.7mm, 1.0mm",
          "Size: 4' x 8', 4' x 10'",
          "Fire-rated options available",
        ],
      },
      {
        id: "multi-form",
        name: "Multi-Form / MF Multi-form",
        description:
          "Our proprietary laminate line offering competitive pricing without compromising on quality. Available in trending designs curated for the Philippine market.",
        image:
          "https://images.unsplash.com/photo-1658264250874-52f403e2ebaa?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 0.7mm, 1.0mm",
          "Size: 4' x 8'",
          "Budget-friendly options",
        ],
      },
    ],
  },
  {
    id: "compact-boards",
    slug: "compact-boards",
    name: "Compact Boards",
    subtitle: "Greenlam, Multi-Form Boards",
    description:
      "High-density compact laminate boards engineered for demanding applications. These through-body colored panels offer exceptional structural integrity and are ideal for areas requiring moisture resistance and high durability.",
    image:
      "https://images.unsplash.com/photo-1610931915635-611da43b9591?w=800&q=80&fit=crop",
    brands: ["Greenlam", "Multi-Form Boards"],
    features: [
      "Through-body color consistency",
      "Moisture & humidity resistant",
      "High impact strength",
      "Self-supporting structure",
    ],
    applications: [
      "Toilet partitions",
      "Lockers",
      "Exterior cladding",
      "Lab furniture",
      "Elevator interiors",
    ],
    subProducts: [
      {
        id: "greenlam",
        name: "Greenlam",
        description:
          "Premium compact panels with superior durability and design options. Ideal for high-traffic and moisture-prone environments.",
        image:
          "https://images.unsplash.com/photo-1610931915635-611da43b9591?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 3mm, 6mm, 12mm",
          "Size: 4' x 8', custom available",
          "Impact resistant core",
        ],
      },
      {
        id: "multi-form-boards",
        name: "Multi-Form Boards",
        description:
          "Versatile compact boards suitable for both interior and exterior applications, featuring excellent weathering resistance.",
        image:
          "https://images.unsplash.com/photo-1610931915635-611da43b9591?w=600&q=80&fit=crop",
        specs: [
          "Thickness: 4mm, 6mm, 10mm, 12mm",
          "Size: 4' x 8'",
          "UV resistant options",
        ],
      },
    ],
  },
  {
    id: "edging",
    slug: "edging",
    name: "Edging",
    subtitle: "Rehau, Doellken",
    description:
      "Professional-grade edge banding solutions from global leaders in edging technology. Our collection ensures seamless, durable edge finishes that perfectly complement your laminate and board selections.",
    image:
      "https://images.unsplash.com/photo-1737534884876-426964ba462a?w=800&q=80&fit=crop",
    brands: ["Rehau", "Doellken"],
    features: [
      "Color-matched to laminate collections",
      "Pre-glued & unglued options",
      "ABS & PVC materials",
      "Excellent adhesion properties",
    ],
    applications: [
      "Furniture manufacturing",
      "Cabinet making",
      "Shelving & storage",
      "Office furniture",
    ],
    subProducts: [
      {
        id: "rehau",
        name: "Rehau",
        description:
          "Premium polymer-based edge banding with laser-edge technology for invisible joint lines and perfect finish.",
        image:
          "https://images.unsplash.com/photo-1737534884876-426964ba462a?w=600&q=80&fit=crop",
        specs: [
          "Width: 19mm, 22mm, 42mm",
          "Thickness: 0.4mm, 1mm, 2mm",
          "Laser-edge compatible",
        ],
      },
      {
        id: "doellken",
        name: "Doellken",
        description:
          "High-quality edge banding with extensive design matching capabilities and consistent color accuracy across batches.",
        image:
          "https://images.unsplash.com/photo-1737534884876-426964ba462a?w=600&q=80&fit=crop",
        specs: [
          "Width: 19mm, 22mm, 42mm, 54mm",
          "Thickness: 0.4mm, 1mm, 2mm",
          "ABS & PP materials",
        ],
      },
    ],
  },
  {
    id: "chemicals-adhesives",
    slug: "chemicals-adhesives",
    name: "Chemicals / Adhesives",
    subtitle: "Laticrete, MF Solutions",
    description:
      "Complete range of professional-grade installation materials and adhesives. From stone-specific epoxies to general-purpose construction adhesives, we provide everything needed for a perfect installation.",
    image:
      "https://images.unsplash.com/photo-1702392183172-17fdef8002b4?w=800&q=80&fit=crop",
    brands: ["Laticrete", "MF Solutions"],
    features: [
      "Professional-grade formulations",
      "Stone-safe compositions",
      "Fast-setting options available",
      "Complete installation systems",
    ],
    applications: [
      "Stone installation",
      "Tile setting",
      "Laminate bonding",
      "Surface treatment",
      "Sealing & protection",
    ],
    subProducts: [
      {
        id: "laticrete",
        name: "Laticrete",
        description:
          "Globally trusted installation materials including adhesives, grouts, sealants, and waterproofing systems for stone and tile.",
        image:
          "https://images.unsplash.com/photo-1702392183172-17fdef8002b4?w=600&q=80&fit=crop",
        specs: [
          "Adhesives: Thin-set, Epoxy, Mastic",
          "Grout: Sanded, Unsanded, Epoxy",
          "Waterproofing systems available",
        ],
      },
      {
        id: "mf-solutions",
        name: "MF Solutions",
        description:
          "Our proprietary line of adhesives and chemical solutions, formulated specifically for the Philippine climate and local installation requirements.",
        image:
          "https://images.unsplash.com/photo-1702392183172-17fdef8002b4?w=600&q=80&fit=crop",
        specs: [
          "Contact adhesives",
          "Laminate glues",
          "Surface cleaners",
          "Sealants & fillers",
        ],
      },
    ],
  },
  {
    id: "interior-films",
    slug: "interior-films",
    name: "Interior Films",
    subtitle: "Architectural & Decorative Films",
    description:
      "Transform existing surfaces instantly with our architectural interior films. These self-adhesive vinyl films replicate the look and feel of natural materials at a fraction of the cost, perfect for renovation projects and surface refreshes.",
    image:
      "https://images.unsplash.com/photo-1694939929393-a7d77537bfb3?w=800&q=80&fit=crop",
    features: [
      "Self-adhesive application",
      "Realistic textures & patterns",
      "Cost-effective renovation solution",
      "Easy to apply & remove",
    ],
    applications: [
      "Furniture refinishing",
      "Wall cladding renovation",
      "Elevator interiors",
      "Hotel & hospitality",
      "Retail store fitouts",
    ],
    subProducts: [
      {
        id: "wood-grain-films",
        name: "Wood Grain Films",
        description:
          "Ultra-realistic wood grain patterns that bring the warmth and texture of natural timber to any surface.",
        image:
          "https://images.unsplash.com/photo-1694939929393-a7d77537bfb3?w=600&q=80&fit=crop",
        specs: [
          "Width: 1220mm",
          "Thickness: 0.15mm - 0.25mm",
          "Textured & smooth finishes",
        ],
      },
      {
        id: "stone-films",
        name: "Stone & Marble Films",
        description:
          "Elegant stone and marble patterns for creating luxurious surfaces without the weight and cost of natural stone.",
        image:
          "https://images.unsplash.com/photo-1694939929393-a7d77537bfb3?w=600&q=80&fit=crop",
        specs: [
          "Width: 1220mm",
          "Thickness: 0.15mm - 0.25mm",
          "High-gloss & matte options",
        ],
      },
    ],
  },
  {
    id: "wpc",
    slug: "wpc",
    name: "WPC",
    subtitle: "Wood Plastic Composite",
    description:
      "Sustainable wood-plastic composite products that combine the beauty of wood with the resilience of modern polymers. Our WPC range is perfect for outdoor applications where natural wood would deteriorate, offering zero-maintenance luxury.",
    image:
      "https://images.unsplash.com/photo-1635348291497-8c28ef034996?w=800&q=80&fit=crop",
    features: [
      "Weather & UV resistant",
      "Termite & rot proof",
      "Zero maintenance required",
      "Eco-friendly materials",
    ],
    applications: [
      "Outdoor decking",
      "Wall cladding",
      "Fencing & railing",
      "Pergolas",
      "Landscape features",
    ],
    subProducts: [
      {
        id: "wpc-decking",
        name: "WPC Decking",
        description:
          "Premium composite decking boards available in a variety of wood-like colors and textures. Splinter-free, fade-resistant, and built to last.",
        image:
          "https://images.unsplash.com/photo-1635348291497-8c28ef034996?w=600&q=80&fit=crop",
        specs: [
          "Profile: Solid & Hollow",
          "Width: 140mm, 150mm",
          "Length: 2200mm, 2900mm, Custom",
        ],
      },
      {
        id: "wpc-cladding",
        name: "WPC Wall Cladding",
        description:
          "Exterior wall cladding solutions that provide insulation and aesthetic appeal. Easy interlocking installation system.",
        image:
          "https://images.unsplash.com/photo-1635348291497-8c28ef034996?w=600&q=80&fit=crop",
        specs: [
          "Profile: Various profiles",
          "Width: 150mm, 200mm",
          "Tongue & groove system",
        ],
      },
    ],
  },
  {
    id: "other-products",
    slug: "other-products",
    name: "Other Products",
    subtitle: "Specialty & Complementary Materials",
    description:
      "Explore our extended range of specialty materials and complementary products designed to complete your project. From specialty tiles to unique surface treatments, we offer solutions for every design challenge.",
    image:
      "https://images.unsplash.com/photo-1764148905481-a00fff72cfd9?w=800&q=80&fit=crop",
    features: [
      "Specialty surface materials",
      "Custom fabrication options",
      "Technical support included",
      "Project consultation available",
    ],
    applications: [
      "Commercial projects",
      "Residential interiors",
      "Hospitality design",
      "Custom installations",
    ],
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((cat) => cat.slug === slug);
}

export function getSubProduct(categorySlug: string, subProductId: string) {
  const category = getCategoryBySlug(categorySlug);
  if (!category || !category.subProducts) return undefined;
  return category.subProducts.find((sp) => sp.id === subProductId);
}

export function getVariant(categorySlug: string, subProductId: string, variantId: string) {
  const subProduct = getSubProduct(categorySlug, subProductId);
  if (!subProduct || !subProduct.variants) return undefined;
  return subProduct.variants.find((v) => v.id === variantId);
}