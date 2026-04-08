const apparel = [
  {
    id: 5001,
    productCode: "LJ-BR-HUB-01",
    title: "HOODED UTILITY BOMBER",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A versatile hybrid jacket featuring a straight front zipper and dual button-flap chest pockets.",
    longDescription:
      "The Hooded Utility Bomber combines classic leather craftsmanship with modern streetwear, featuring an integrated grey fabric hoodie for a layered look without the bulk.",
    feature: [
      "Integrated Fabric Hoodie: Urban layered aesthetic",
      "Premium Brown Leather: Durable and soft finish",
      "Ribbed Cuffs & Hem: Classic bomber fit for warmth",
      "Dual Chest Pockets: Practical storage with button flaps",
    ],
    specifications: {
      material: "Genuine Leather",
      color: "Brown/Grey",
      fit: "Bomber Style",
      closure: "Zipper",
      hood: "Fixed Fabric",
    },
    imageUrl: ["/Leather-Jackets/hooded-utility-bomber.jpg"],
    moq: 5,
  },
  {
    id: 5002,
    productCode: "LJ-ES-MBC-02",
    title: "MODERN BIKER WITH CONTRAST STITCHING",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "An espresso-toned asymmetric jacket featuring unique orange/tan contrast stitching.",
    longDescription:
      "This modern take on the biker jacket uses espresso leather and high-contrast stitching to highlight the iconic notched collar and asymmetric zip silhouette.",
    feature: [
      "Contrast Stitching: Designer detail for a unique look",
      "Asymmetric Zipper: Traditional biker styling",
      "Notched Collar: Polished yet rebellious profile",
      "Tailored Fit: Contoured to the body for a modern silhouette",
    ],
    specifications: {
      material: "Full-Grain Leather",
      color: "Espresso",
      fit: "Slim Biker",
      closure: "Asymmetric Zip",
      stitching: "Contrast Tan",
    },
    imageUrl: ["/Leather-Jackets/modern-biker-with-contrast-stitching.jpg"],
    moq: 5,
  },
  {
    id: 5003,
    productCode: "LJ-BK-MPC-03",
    title: "MULTI-POCKET COMMUTER JACKET",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A black hybrid jacket with a fabric hood, ribbed hem, and functional utility zippers.",
    longDescription:
      "Designed for the urban explorer, the Multi-Pocket Commuter features several secure zip compartments and a comfortable ribbed waist for all-day wear.",
    feature: [
      "Multi-Zip Design: Tactical storage for essentials",
      "Fabric Hood: Added protection and casual style",
      "Shoulder Epaulets: Military-inspired detailing",
      "Ribbed Waistband: Snug fit that keeps the cold out",
    ],
    specifications: {
      material: "Smooth Black Leather",
      color: "Black",
      fit: "Standard Utility",
      closure: "Center Zipper",
      pockets: "Multiple Exterior Zips",
    },
    imageUrl: ["/Leather-Jackets/multi-pocket-commuter-jacket.jpg"],
    moq: 5,
  },
  {
    id: 5004,
    productCode: "LJ-BR-SLA-04",
    title: "SHERPA-LINED AVIATOR JACKET",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "Rugged brown leather paired with a thick, cream-colored shearling collar and trim.",
    longDescription:
      "The Sherpa-Lined Aviator is built for extreme warmth and durability, referencing WWII flight jacket designs with heavy-duty insulation.",
    feature: [
      "Shearling Collar: Maximum warmth and vintage style",
      "Rugged Leather Exterior: Weather-resistant and tough",
      "Buckled Collar Straps: Secure closure for wind protection",
      "Shearling Cuffs: Ensures heat retention in cold climates",
    ],
    specifications: {
      material: "Distressed Brown Leather",
      color: "Brown/Cream",
      fit: "Heavier Pilot Fit",
      closure: "Heavy Duty Zipper",
      lining: "Sherpa/Fleece",
    },
    imageUrl: ["/Leather-Jackets/sherpa-lined-aviator-jacket.jpg"],
    moq: 5,
  },
  {
    id: 5005,
    productCode: "LJ-BR-TLB-05",
    title: "TAILORED LEATHER BLAZER",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A sophisticated, two-button leather sport coat with a traditional notched lapel.",
    longDescription:
      "Elevate your professional wardrobe with the Tailored Leather Blazer, combining the structure of a suit with the luxury of fine leather.",
    feature: [
      "Notched Lapel: Classic blazer silhouette",
      "Two-Button Closure: Versatile for formal or casual wear",
      "Flap Waist Pockets: Traditional tailored appearance",
      "Rear Vent: Allows for movement and comfort",
    ],
    specifications: {
      material: "Polished Lambskin",
      color: "Chocolate Brown",
      fit: "Tailored Blazer",
      closure: "Buttons",
      pockets: "Dual Flap",
    },
    imageUrl: ["/Leather-Jackets/tailored-leather-blazer.jpg"],
    moq: 5,
  },
  {
    id: 5006,
    productCode: "LJ-BR-VCR-06",
    title: "VINTAGE CAFE RACER",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A minimalist, distressed brown leather jacket featuring a snap-tab band collar.",
    longDescription:
      "The Vintage Cafe Racer celebrates 1960s motorcycle culture with a sleek, aerodynamic design and subtle shoulder quilting.",
    feature: [
      "Snap-Tab Collar: Minimalist racing style",
      "Linear Shoulder Quilting: Adds texture and protection",
      "Distressed Finish: Authentic vintage character",
      "Zipped Cuffs: Allows for glove integration and custom fit",
    ],
    specifications: {
      material: "Aged Leather",
      color: "Vintage Brown",
      fit: "Slim Racer",
      closure: "Straight Zip",
      collar: "Stand-up Tab",
    },
    imageUrl: ["/Leather-Jackets/vintage-cafe-racer.jpg"],
    moq: 5,
  },
  {
    id: 5007,
    productCode: "LJ-BR-DHB-07",
    title: "DISTRESSED HERITAGE BIKER",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A classic double-rider silhouette in weathered leather with an asymmetric zipper and belt.",
    longDescription:
      "Embody the golden age of motorcycle style with the Heritage Biker, featuring a pre-weathered look and heavy-duty hardware.",
    feature: [
      "Full Waist Belt: Traditional biker fit adjustment",
      "Weathered Leather: Unique, lived-in aesthetic",
      "Asymmetric Front: Iconic off-center zip closure",
      "Coin Pocket: Signature small front snap pocket",
    ],
    specifications: {
      material: "Cowhide Leather",
      color: "Distressed Tan",
      fit: "Classic Biker",
      closure: "Asymmetric Zip",
      hardware: "Antique Brass",
    },
    imageUrl: ["/Leather-Jackets/distressed-heritage-biker.jpg"],
    moq: 5,
  },
  {
    id: 5008,
    productCode: "LJ-BR-CLM-08",
    title: "CHOCOLATE LEATHER MOTO",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A clean-cut, dark brown biker jacket with silver hardware and an asymmetric zip.",
    longDescription:
      "The Chocolate Leather Moto offers a refined take on the biker jacket, using smooth, dark leather for a more versatile, upscale appearance.",
    feature: [
      "Silver Hardware: High-contrast polished look",
      "Asymmetric Zip: Classic edgy silhouette",
      "Zipped Hand Pockets: Secure storage for daily items",
      "Shoulder Straps: Military-style epaulets for structure",
    ],
    specifications: {
      material: "Premium Smooth Leather",
      color: "Chocolate Brown",
      fit: "Modern Slim",
      closure: "Asymmetric Zip",
      hardware: "Silver Tone",
    },
    imageUrl: ["/Leather-Jackets/chocolate-leather-moto.jpg"],
    moq: 5,
  },
  {
    id: 5009,
    productCode: "LJ-BK-CBD-09",
    title: "CLASSIC BLACK DOUBLE RIDER",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "The quintessential 'rockstar' jacket with an asymmetric zip and lapel snaps.",
    longDescription:
      "This is the definitive black leather jacket, featuring a full waist belt and lapels that snap down for a timeless, aggressive profile.",
    feature: [
      "Wide Lapels: Classic snap-down triangular flaps",
      "Heavy Waist Belt: Ensures a custom, secure fit",
      "Zipped Sleeve Cuffs: Iconic motorcycle design",
      "Treated Black Finish: Sleek and moisture-resistant",
    ],
    specifications: {
      material: "Heavyweight Black Leather",
      color: "Black",
      fit: "Traditional Biker",
      closure: "Asymmetric Zip",
      hardware: "Polished Silver",
    },
    imageUrl: ["/Leather-Jackets/classic-black-double-rider.png"],
    moq: 5,
  },
  {
    id: 5010,
    productCode: "LJ-BK-PLF-10",
    title: "POLISHED LEATHER FIELD JACKET",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A minimalist black jacket with a clean fold-over collar and a straight-zip front.",
    longDescription:
      "The Polished Field Jacket offers a sophisticated, understated look that works perfectly over business attire or casual wear.",
    feature: [
      "Fold-Over Collar: Clean and professional neckline",
      "Straight Front Zipper: Streamlined minimalist design",
      "Internal Pockets: Secure storage for travel documents",
      "Smooth Texture: Refined finish with no excessive hardware",
    ],
    specifications: {
      material: "Nappa Leather",
      color: "Matte Black",
      fit: "Regular Straight Cut",
      closure: "Center Zipper",
      collar: "Classic Shirt Style",
    },
    imageUrl: ["/Leather-Jackets/polished-leather-field-jacket.jpg"],
    moq: 5,
  },
  {
    id: 5011,
    productCode: "LJ-BK-QBJ-11",
    title: "QUILTED BIKER JACKET",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A slim-fit black moto jacket featuring prominent 'accordion' quilting on the shoulders.",
    longDescription:
      "The Quilted Biker combines high-fashion textures with athletic inspiration, featuring accordion stretch panels on the sleeves for maximum mobility.",
    feature: [
      "Accordion Quilting: Superior flex and athletic look",
      "Vertical Zip Pockets: Sleek, high-access storage",
      "Slim Fit Profile: Modern, body-contoured silhouette",
      "Reinforced Stitching: Added durability at joints",
    ],
    specifications: {
      material: "Flexible Black Leather",
      color: "Deep Black",
      fit: "Athletic Slim",
      closure: "Asymmetric Zip",
      padding: "Shoulder & Sleeve Quilting",
    },
    imageUrl: ["/Leather-Jackets/quilted-biker-jacket.png"],
    moq: 5,
  },
  {
    id: 5012,
    productCode: "LJ-BK-EBB-12",
    title: "ELITE LEATHER BOMBER",
    category: "apparel",
    subCat: "leather-jackets",
    description:
      "A sleek, black MA-1 style bomber with a ribbed collar, cuffs, and hem.",
    longDescription:
      "The Elite Leather Bomber is the ultimate luxury staple, featuring premium leather and a sporty silhouette that fits any wardrobe.",
    feature: [
      "Ribbed Trims: Ensures a classic bomber shape",
      "Sleeve Utility Pocket: Iconic MA-1 flight jacket detail",
      "Internal Lining: Smooth satin-feel interior for comfort",
      "Polished Leather: High-end shine and durability",
    ],
    specifications: {
      material: "Premium Calfskin",
      color: "Onyx Black",
      fit: "Classic Bomber",
      closure: "Center Zipper",
      trim: "Knit Ribbing",
    },
    imageUrl: ["/Leather-Jackets/elite-leather-bomber.jpg"],
    moq: 5,
  },
];

export default apparel;
