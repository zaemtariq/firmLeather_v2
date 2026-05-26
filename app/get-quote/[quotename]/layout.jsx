import {
  findProduct,
  formatLabel,
  getProductImage,
} from "@/components/ProductGallery/productCatalog";

const defaultImage = "/siteImages/factoryIMages/partner_us.jpg";

export async function generateMetadata({ params }) {
  const { quotename } = await params;
  const isGeneralQuote = !quotename || quotename === "general";
  const product = isGeneralQuote ? null : findProduct(undefined, quotename);
  const title = product
    ? `Request Quote for ${product.title}`
    : "Request a Leather Manufacturing Quote";
  const description = product
    ? `Request pricing, sample details, minimum order quantity, and private label options for ${product.title} from Firm Leather.`
    : "Request wholesale pricing, samples, custom leather manufacturing, private label production, and export order details from Firm Leather.";
  const canonical = `/get-quote/${quotename || "general"}`;
  const image = product ? getProductImage(product) : defaultImage;

  return {
    title,
    description,
    keywords: [
      "Firm Leather quote",
      "leather manufacturing quote",
      "wholesale leather pricing",
      "private label leather production",
      product?.title,
      product?.productCode,
      product?.category ? formatLabel(product.category) : null,
    ].filter(Boolean),
    alternates: { canonical },
    openGraph: {
      title: `${title} | Firm Leather`,
      description,
      url: canonical,
      siteName: "Firm Leather",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product?.title || "Firm Leather quote request",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Firm Leather`,
      description,
      images: [image],
    },
    robots: {
      index: isGeneralQuote,
      follow: true,
    },
  };
}

export default function QuoteDetailLayout({ children }) {
  return children;
}
