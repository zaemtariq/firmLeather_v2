import { buildListingMetadata } from "@/components/ProductGallery/productSeo";

export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;

  return buildListingMetadata({
    category,
    subcategory,
    canonical: `/products/${category}/${subcategory}`,
  });
}

export { default } from "@/components/ProductGallery/ProductListingPage";
