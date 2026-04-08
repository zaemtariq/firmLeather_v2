"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import CategoryTabs from "@/components/ProductGallery/CategoryTabs";
import ProductGrid from "@/components/ProductGallery/ProductGrid";
import SubCatSidebar from "@/components/ProductGallery/SubCatSidebar"; // Import new sidebar
import { CATEGORIES_DATA } from "@/components/constants/constants";

export default function ProductsPage() {
  const { category, subcategory } = useParams();
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get active data based on current URL category
  const activeCategory = Array.isArray(category)
    ? category[0]
    : category || "all";
  const activeData = CATEGORIES_DATA.find((cat) => cat.id === activeCategory);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-leather-200">
      <CategoryTabs />
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <ProductDetails
              key="details"
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onRequestQuote={(p) =>
                router.push(`/get-quote/${category}/${subcategory}/${p}`)
              }
            />
          ) : (
            <div
              className="flex flex-col  md:flex-row gap-8"
              key="grid-container"
            >
              {/* LEFT SIDE PANEL */}
              <SubCatSidebar activeData={activeData} />

              {/* MAIN CONTENT AREA */}
              <main className="flex-1">
                <ProductGrid
                  category={category}
                  onProductSelect={setSelectedProduct}
                  onRequestQuote={(p) =>
                    router.push(`/get-quote/${category}/${subcategory}/${p}`)
                  }
                />
              </main>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
