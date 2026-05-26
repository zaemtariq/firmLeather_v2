import { findProduct } from "@/components/ProductGallery/productCatalog";
import { buildProductMetadata } from "@/components/ProductGallery/productSeo";

export async function generateMetadata({ params }) {
  const { category, subcategory, productDetail } = await params;
  const product = findProduct(category, productDetail);

  return buildProductMetadata({
    category,
    subcategory,
    product,
    productCode: productDetail,
  });
}

export default function ProductDetailLayout({ children }) {
  return children;
}
