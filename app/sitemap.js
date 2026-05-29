import { getProducts } from "@/components/ProductGallery/productCatalog";

const siteUrl = "https://firmleather.com";
const lastModified = new Date();

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products", priority: 0.95, changeFrequency: "weekly" },
  { path: "/manufacturing-process", priority: 0.75, changeFrequency: "monthly" },
  { path: "/factory-tour", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.75, changeFrequency: "monthly" },
  { path: "/get-quote/general", priority: 0.7, changeFrequency: "monthly" },
  { path: "/policies/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/policies/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

const productCategories = [
  {
    path: "/products/finished-leather",
    subcategories: [],
  },
  {
    path: "/products/sports",
    subcategories: ["golf-gloves", "baseball-batting-gloves"],
  },
  {
    path: "/products/apparel",
    subcategories: ["leather-jackets", "cowboy-chaps"],
  },
  {
    path: "/products/accessories",
    subcategories: ["leather-belts", "leather-wallets", "rfid-blocking-wallets"],
  },
];

const createEntry = ({ path, priority, changeFrequency }) => ({
  url: `${siteUrl}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap() {
  const categoryRoutes = productCategories.flatMap((category) => [
    createEntry({
      path: category.path,
      priority: 0.85,
      changeFrequency: "weekly",
    }),
    ...category.subcategories.map((subcategory) =>
      createEntry({
        path: `${category.path}/${subcategory}`,
        priority: 0.8,
        changeFrequency: "weekly",
      }),
    ),
  ]);

  const productRoutes = getProducts().map((product) =>
    createEntry({
      path: `/products/${product.collection}/${product.subCat || "all"}/${
        product.productCode
      }`,
      priority: 0.65,
      changeFrequency: "monthly",
    }),
  );

  return [
    ...staticRoutes.map(createEntry),
    ...categoryRoutes,
    ...productRoutes,
  ];
}
