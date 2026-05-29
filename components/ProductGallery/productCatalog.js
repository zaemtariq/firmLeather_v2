import accessories from "@/components/ProductsData/accessories/accessories";
import apparel from "@/components/ProductsData/apparel/apparel";
import finishedLeather from "@/components/ProductsData/finished_leather/finished_leather";
import petAccessories from "@/components/ProductsData/pet-accessories/accessories";
import sports from "@/components/ProductsData/sports_gear/sports_gear";

export const fallbackProductImage =
  "/siteImages/factoryIMages/leather_manufacturer.jpg";

export const productGroups = {
  accessories,
  apparel,
  "finished-leather": finishedLeather,
  "pet-accessories": petAccessories,
  sports,
};

export const formatLabel = (value = "") =>
  value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bRfid\b/g, "RFID");

export const getProductImages = (product) => {
  const images = Array.isArray(product?.imageUrl)
    ? product.imageUrl
    : [product?.imageUrl];
  const validImages = images.filter(Boolean);

  return validImages.length ? validImages : [fallbackProductImage];
};

export const getProductImage = (product) => getProductImages(product)[0];

export const getProducts = () =>
  Object.entries(productGroups).flatMap(([collection, items]) =>
    items.map((product) => ({ ...product, collection })),
  );

export const findProduct = (category, productCode) => {
  const products = productGroups[category] || getProducts();

  return products.find((product) => product.productCode === productCode);
};

const getShuffleScore = (product) => {
  const value = `${product.collection}-${product.productCode}-firmleather`;
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
};

export const getMixedProducts = (products) =>
  [...products].sort((first, second) => {
    const scoreDiff = getShuffleScore(first) - getShuffleScore(second);

    if (scoreDiff !== 0) return scoreDiff;
    return String(first.productCode).localeCompare(String(second.productCode));
  });
