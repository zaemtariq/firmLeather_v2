import { productGroups, formatLabel, getProductImage } from "./productCatalog";

export const siteUrl = "https://firmleather.com";

const defaultImage = "/siteImages/factoryIMages/leather_manufacturer.jpg";

const categorySeo = {
  all: {
    title: "Leather Products | FirmLeather",
    description:
      "Browse FirmLeather's export-ready leather products, including finished leather, leather apparel, accessories, sports leather gear, and wholesale private label options.",
  },
  accessories: {
    title: "Leather Accessories Manufacturer | FirmLeather",
    description:
      "Explore wholesale leather accessories including belts, wallets, bags, and custom private label leather goods manufactured by FirmLeather.",
  },
  apparel: {
    title: "Leather Apparel Manufacturer | FirmLeather",
    description:
      "Discover premium leather apparel manufacturing for jackets, coats, custom garments, fashion brands, wholesalers, and private label buyers.",
  },
  "finished-leather": {
    title: "Finished Leather Supplier | FirmLeather",
    description:
      "Source finished and crust leather prepared for footwear, garments, accessories, sports goods, and industrial leather applications.",
  },
  sports: {
    title: "Sports Leather Gear Manufacturer | FirmLeather",
    description:
      "Browse sports leather gear including golf gloves and baseball batting gloves made for grip, durability, repeatable fit, and export production.",
  },
};

export const absoluteUrl = (path = "/") =>
  path.startsWith("http") ? path : `${siteUrl}${path}`;

export const getCategorySeo = (category = "all") =>
  categorySeo[category] || {
    title: `${formatLabel(category)} Leather Products | FirmLeather`,
    description: `Explore FirmLeather ${formatLabel(
      category,
    ).toLowerCase()} products, specifications, and wholesale quote options.`,
  };

export const buildListingMetadata = ({
  category = "all",
  subcategory,
  canonical = "/products",
} = {}) => {
  const knownCategory = category === "all" || Boolean(productGroups[category]);
  const seo = getCategorySeo(knownCategory ? category : "all");
  const subcategoryLabel = subcategory ? formatLabel(subcategory) : "";
  const title = subcategoryLabel
    ? `${subcategoryLabel} | ${formatLabel(category)} | FirmLeather`
    : seo.title;
  const description = subcategoryLabel
    ? `Browse FirmLeather ${subcategoryLabel.toLowerCase()} products for wholesale, custom manufacturing, private label production, and export-ready leather goods.`
    : seo.description;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "FirmLeather",
      "leather products",
      "leather manufacturer",
      "wholesale leather supplier",
      "private label leather manufacturing",
      knownCategory && category !== "all" ? formatLabel(category) : null,
      subcategoryLabel || null,
    ].filter(Boolean),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "FirmLeather",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "FirmLeather product manufacturing",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    robots: {
      index: knownCategory,
      follow: true,
    },
  };
};

export const buildProductMetadata = ({
  category,
  subcategory,
  product,
  productCode,
}) => {
  const categoryName = formatLabel(category || "products");
  const subcategoryName = formatLabel(subcategory || "");
  const productName = product?.title || formatLabel(productCode || "Product");
  const description =
    product?.description ||
    product?.longDescription ||
    `Explore FirmLeather ${categoryName.toLowerCase()} product details, specifications, minimum order quantity, and quote options.`;
  const canonical = `/products/${category}/${subcategory}/${productCode}`;
  const image = product ? getProductImage(product) : defaultImage;

  return {
    metadataBase: new URL(siteUrl),
    title: `${productName} | FirmLeather`,
    description,
    keywords: [
      productName,
      product?.productCode,
      categoryName,
      subcategoryName,
      "FirmLeather",
      "leather products",
      "custom leather manufacturing",
      "wholesale leather supplier",
    ].filter(Boolean),
    alternates: { canonical },
    openGraph: {
      title: `${productName} | FirmLeather`,
      description,
      url: canonical,
      siteName: "FirmLeather",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName} | FirmLeather`,
      description,
      images: [image],
    },
    robots: {
      index: Boolean(product),
      follow: true,
      googleBot: {
        index: Boolean(product),
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
};
