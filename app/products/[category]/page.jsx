import { buildListingMetadata } from "@/components/ProductGallery/productSeo";

export async function generateMetadata({ params }) {
  const { category } = await params;

  return buildListingMetadata({
    category,
    canonical: `/products/${category}`,
  });
}

export { default } from "@/components/ProductGallery/ProductListingPage";
