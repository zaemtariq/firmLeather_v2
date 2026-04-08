"use client";
import React, { useState } from "react";
import CategoryTabs from "@/components/ProductGallery/CategoryTabs";
import { AnimatePresence } from "framer-motion";
import ProductGrid from "@/components/ProductGallery/ProductGrid";
import ProductDetails from "@/components/ProductGallery/ProductDetails";
import Features from "@/components/ProductGallery/Features";
import Customization from "@/components/ProductGallery/Customization";
import CallToAction from "@/components/ProductGallery/CallToAction";
import { useRouter, useParams } from "next/navigation";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();
  const { category, subcategory } = useParams();

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    // Scroll to top when opening details for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
  };

  const handleRequestQuote = (productDetails) => {
    setSelectedProduct(null);
    // Use URL hash for scrolling across pages - much more reliable than setTimeout
    router.push(
      `/get-quote/${category}/${subcategory}/${productDetails}#contact`,
    );
  };

  return (
    <div
      id="top"
      className=" min-h-screen bg-leather-50 font-sans selection:bg-leather-200 selection:text-leather-900"
    >
      <CategoryTabs />

      <AnimatePresence mode="wait">
        {selectedProduct ? (
          <ProductDetails
            key="details"
            product={selectedProduct}
            onBack={handleBackToHome}
            onRequestQuote={handleRequestQuote}
          />
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductGrid
              onProductSelect={handleProductSelect}
              onRequestQuote={handleRequestQuote}
            />
            <Features />
            <Customization />
            <CallToAction />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
