import { LayoutGrid, Layers, Wallet, Trophy, Shirt } from "lucide-react";
export const Page = {
  Home: "/",
  Products: "/products",
  ManufacturingProcess: "/manufacturing-process",
  RequestQuote: "/get-quote/general",
  About: "/about",
  Contact: "/contact",
  privacy_policy: "/policies/privacy-policy",
  terms_of_service: "/policies/terms-of-service",
};
export const FACTORY_STATIONS = [
  {
    id: "selection-tanning",
    name: "Raw Hide Selection & Vegetable Tanning",
    description:
      "The foundation of premium leather quality begins with selecting only the finest full-grain and top-grain hides. An ancient, organic vegetable tanning process using natural tannins derived from tree barks and plants — producing rich, durable, and eco-friendly finished leather.",
    imageUrl: "/siteImages/factory/tanning.jpg",
    videoUrl: "./siteVideo/manufacturing_process/tanning_process.mp4",
    details: [
      "30-day slow-immersion vegetable tanning process",
      "Top 1% ethically sourced hides from sustainable farms",
      "Rigorous raw hide imperfection and grading checks",
      "Eco-friendly water filtration and waste management systems",
    ],
  },
  {
    id: "quality-check",
    name: "Finished Leather Quality Control (QC)",
    description:
      "A rigorous multi-point leather inspection process to ensure every inch of finished leather meets international export quality standards — trusted by global leather importers, brands, and manufacturers.",
    imageUrl: "/siteImages/factory/quality-check.jpg",
    videoUrl: "./siteVideo/manufacturing_process/quality_check.mp4",
    details: [
      "Color consistency spectrophotometry testing",
      "Tensile strength, durability, and flexibility testing",
      "Surface grain defect and texture analysis",
      "Moisture content stabilization for long-term leather preservation",
    ],
  },
  {
    id: "cutting",
    name: "Precision Leather Cutting & Sizing",
    description:
      "Marrying traditional master leather craftsmanship with modern laser-guided cutting accuracy for exact dimensions and minimal material waste — optimized for high-volume leather production.",
    imageUrl: "/siteImages/factory/cutting.jpg",
    videoUrl: "./siteVideo/manufacturing_process/laser_cutting.mp4",
    details: [
      "Laser-guided leather pattern optimization",
      "Digital nesting technology to minimize leather waste",
      "Precision sizing calibrated to global manufacturing standards",
      "Structural grain alignment and consistency checks",
    ],
  },
  {
    id: "stitching",
    name: "Artisan Leather Stitching & Assembly",
    description:
      "Each leather piece is hand-assembled by skilled artisans with decades of experience in premium leather goods construction — ensuring superior durability and craftsmanship in every product.",
    imageUrl: "/siteImages/factory/stitching.jpg",
    videoUrl: "./siteVideo/manufacturing_process/stitching_process.mp4",
    details: [
      "Traditional saddle stitching technique for maximum strength",
      "Reinforced stitching at high-stress load-bearing points",
      "Custom waxed linen threads for enhanced longevity",
      "Signature hand-burnished leather edges for premium finish",
    ],
  },
  {
    id: "qc",
    name: "Sizing & Final Leather Quality Control",
    description:
      "A comprehensive multi-point final inspection stage where every stitch, edge, and hardware component is verified against master samples — ensuring export-ready leather goods that meet international buyer specifications.",
    imageUrl: "/siteImages/factory/qc.jpg",
    videoUrl: "./siteVideo/manufacturing_process/sizing_quality_check.mp4",
    details: [
      "Sizing, stitch tension, and alignment verification",
      "Hardware stress and durability testing",
      "Color matching under controlled lighting conditions",
      "Final structural integrity and export compliance audit",
    ],
  },
  {
    id: "finishing-packing",
    name: "Premium Finishing & Custom Export Packaging",
    description:
      "The final touch of luxury leather finishing — from hand-polishing and conditioning to protective, eco-friendly custom packaging designed for safe international shipping and premium brand presentation.",
    imageUrl: "/siteImages/factory/packing.jpg",
    videoUrl: "./siteVideo/manufacturing_process/finishing_packing.mp4",
    details: [
      "Manual beeswax leather edge polishing and conditioning",
      "Anti-tarnish hardware protection treatment",
      "Global logistics tracking integration for international orders",
    ],
  },
];

export const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#about" },
  { name: "Product Line", href: "#products" },
  { name: "Sustainability", href: "#sustainability" },
  { name: "Contact", href: "#contact" },
];

export const PRODUCT_LINE = [
  {
    id: 1,
    title: "FINISHED LEATHERS",
    Url: "/products/finished-leather",
    description:
      "Expertly tanned Cabretta, Cow, and Buffalo finished leathers tailored for premium wholesale and retail markets. We specialize in robust, full-grain hides celebrated for their natural grain pattern, enduring strength, and superior surface finish — ideal for footwear uppers, leather lining, garment manufacturing, and various industrial leather applications.",
    imageUrl: "/siteImages/factoryIMages/raw_leather (2).jpg",
    side: "right",
  },
  {
    id: 2,
    title: "SPORTS LEATHER GEAR",
    Url: "/products/sports",
    description:
      "High-performance sports leathers engineered for the global athletic and sporting goods industry. Our specialized leather production includes professional-grade baseballs, premium Cabretta golf gloves, and durable leather golf belts — designed for maximum flexibility, superior grip, and long-lasting wear in competitive sports environments.",
    imageUrl: "/siteImages/factoryIMages/sports_gear (2).jpg",
    side: "left",
  },
  {
    id: 3,
    title: "LEATHER APPAREL",
    Url: "/products/apparel",
    description:
      "Timeless fashion meets superior leather craftsmanship. Our leather apparel division specializes in premium leather jackets, leather coats, and custom leather garments for high-end fashion brands and private labels. Using supple, full-grain skins that offer a perfect fit, elegant drape, and lasting durability for the luxury leather fashion market.",
    imageUrl: "/siteImages/factoryIMages/leather_apparel.avif",
    side: "right",
  },
  {
    id: 4,
    title: "LEATHER ACCESSORIES",
    Url: "/products/accessories",
    description:
      "A sophisticated range of handcrafted leather goods including artisanal leather bags, elegant leather purses, leather wallets, and heavy-duty leather belts. Each piece is precision-crafted to showcase the natural beauty and texture of genuine leather, ensuring premium daily functionality, durability, and timeless style for wholesale and retail buyers.",
    imageUrl: "/siteImages/factoryIMages/leather_accessories.jpg",
    side: "left",
  },
];

export const QUALITY_STATS = [
  { stage: "Raw Material", value: 98 },
  { stage: "Tanning", value: 92 },
  { stage: "Cutting & Sizing", value: 99 },
  { stage: "Stitching", value: 97 },
  { stage: "Quality Check", value: 100 },
  { stage: "Final Finishing", value: 100 },
];

export const CATEGORIES_DATA = [
  {
    id: "all",
    label: "ALL COLLECTIONS",
    icon: LayoutGrid,
    sub_cat: [
      "leather-belts",
      "leather-wallets",
      "leather-jackets",
      "golf-gloves",
      "baseBall-gloves",
    ],
  },
  {
    id: "sports",
    label: "PERFORMANCE SPORTS",
    icon: Trophy,
    sub_cat: ["golf-gloves", "baseBall-gloves"],
  },
  {
    id: "apparel",
    label: "APPAREL",
    icon: Shirt,
    sub_cat: ["leather-jackets"],
  },
  {
    id: "accessories",
    label: "ACCESSORIES",
    icon: Wallet,
    sub_cat: ["leather-belts", "leather-wallets"],
  },
  {
    id: "finished-leather",
    label: "FINISHED LEATHER",
    icon: Layers,
    sub_cat: [],
  },
];
