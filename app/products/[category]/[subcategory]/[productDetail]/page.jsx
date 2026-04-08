"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryStore } from "@/components/store/useStore";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  Factory,
  Download,
  Mail,
  FileText,
  Loader2,
  AlertCircle,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const ProductDetails = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const router = useRouter();
  const { category, productDetail } = useParams();

  const getProductsByCategory = useCategoryStore(
    (state) => state.getProductsByCategory,
  );

  const sproducts = getProductsByCategory(category) || [];
  const product = sproducts.find((item) => item.productCode === productDetail);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle mouse move for zoom effect
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const nextImage = () => {
    if (product?.imageUrl) {
      setCurrentImageIndex((prev) =>
        prev === product.imageUrl.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (product?.imageUrl) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.imageUrl.length - 1 : prev - 1,
      );
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-leather-50 to-leather-100 px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md"
        >
          <AlertCircle size={64} className="text-leather-400 mb-6 mx-auto" />
          <h1 className="font-playfair text-3xl font-bold text-leather-900 mb-3">
            Product Not Found
          </h1>
          <p className="text-leather-600 mb-8 leading-relaxed">
            The product code "{productDetail}" could not be located in the{" "}
            {category} collection.
          </p>
          <button
            onClick={() => router.push(`/products/${category}`)}
            className=" bg-primary text-white px-8 py-4 uppercase text-xs font-bold tracking-widest rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Return to Collection
          </button>
        </motion.div>
      </div>
    );
  }

  const handleRequestQuote = () => {
    router.push(`/get-quote/${product.productCode}`);
  };

  const handleDownloadSpecSheet = async () => {
    if (!window.jspdf) {
      alert("PDF library is still loading. Please try again in a moment.");
      return;
    }
    setIsGenerating(true);
    try {
      const genAI = new GoogleGenAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate a B2B Tech Spec Sheet for FirmLeather. Title: ${
        product.title
      }. Code: ${product.productCode}. Specs: ${JSON.stringify(
        product.specifications,
      )}`;

      const result = await model.generateContent(prompt);
      const specText = result.response.text();

      const doc = new window.jspdf.jsPDF();
      // PDF styling logic
      doc.save(`${product.productCode}_spec_sheet.pdf`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI spec sheet.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-white via-leather-50/30 to-leather-100/20 min-h-screen pt-8 pb-24"
    >
      {/* AI Loader Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-leather-950/95 to-leather-900/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="text-amber-400" size={64} />
            </motion.div>
            <h2 className="font-playfair text-4xl mb-3 mt-8 text-center">
              Crafting Technical Specifications
            </h2>
            <p className="text-leather-300 font-light text-lg text-center max-w-md">
              Our AI is analyzing premium leather construction details...
            </p>
            <div className="mt-8 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="w-2 h-2 bg-amber-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 z-[91] bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
            >
              <X size={24} className="text-white" />
            </button>

            {product.imageUrl && product.imageUrl.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 z-[91] bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
                >
                  <ChevronLeft size={32} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 z-[91] bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
                >
                  <ChevronRight size={32} className="text-white" />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.imageUrl[currentImageIndex]}
                alt={product.title}
                className="max-w-full max-h-[90vh] object-contain"
                style={{
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
              />
            </motion.div>

            {product.imageUrl && product.imageUrl.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product.imageUrl.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? "bg-white w-8" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => router.push(`/products/${category}`)}
          className="flex items-center gap-3 text-leather-600 hover:text-leather-900 transition-colors mb-10 group bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-md hover:shadow-xl"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-2 transition-transform duration-300"
          />
          <span className="uppercase tracking-widest text-xs font-bold">
            Back to {category}
          </span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div
              className="relative aspect-[4/5] overflow-hidden bg-white rounded-2xl shadow-xl border border-leather-200/50 group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.imageUrl[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Zoom Indicator */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-xl">
                  <ZoomIn size={18} className="text-leather-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-leather-900">
                    Click to Enlarge
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.imageUrl && product.imageUrl.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.imageUrl.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-primary shadow-lg scale-105"
                        : "border-leather-200 hover:border-leather-400 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-leather-100 rounded-xl p-4 shadow-md text-center">
                <ShieldCheck
                  size={24}
                  className="text-amber-600 mx-auto mb-2"
                />
                <p className="text-xs font-bold text-leather-700">
                  Premium Quality
                </p>
              </div>
              <div className="bg-leather-100 rounded-xl p-4 shadow-md text-center">
                <Factory size={24} className="text-amber-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-leather-700">
                  Direct Factory
                </p>
              </div>
              <div className="bg-leather-100 rounded-xl p-4 shadow-md text-center">
                <Truck size={24} className="text-amber-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-leather-700">
                  Global Shipping
                </p>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div className="inline-block">
              <span className="bg-primary text-white font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full shadow-md">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-leather-900 leading-tight">
              {product.title}
            </h1>

            {/* MOQ and Product Code */}
            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-leather-200">
              <div className="bg-leather-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wider shadow-md">
                MOQ: {product.moq} Units
              </div>
              <div className="flex items-center gap-2 bg-leather-100 px-4 py-2.5 rounded-lg">
                <FileText size={16} className="text-leather-600" />
                <span className="text-leather-700 text-sm font-mono font-semibold">
                  {product.productCode}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-leather-700 leading-relaxed font-light">
              {product.longDescription || product.description}
            </p>

            {/* Key Features */}
            {product.feature && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-leather-100">
                <h3 className="font-playfair text-2xl mb-5 text-leather-900 flex items-center gap-2">
                  <Check size={24} className="text-amber-600" />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.feature.map((feat, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-start gap-3 text-leather-700"
                    >
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-leather-100 flex items-center justify-center">
                        <Check size={14} className="text-amber-700" />
                      </div>
                      <span className="leading-relaxed">{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className=" rounded-2xl p-6 shadow-lg border border-leather-100">
                <h3 className="font-playfair text-2xl mb-5 text-leather-900">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {Object.entries(product.specifications).map(
                    ([key, value], idx) => (
                      <motion.div
                        key={key}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className="bg-leather-100 rounded-lg p-4 border border-leather-200/50"
                      >
                        <span className="block text-xs font-bold text-leather-500 uppercase tracking-wider mb-1">
                          {key}
                        </span>
                        <span className="text-leather-900 font-semibold text-base">
                          {value}
                        </span>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <button
                onClick={handleRequestQuote}
                className="flex-1 px-5 py-5 bg-gradient-to-r from-primary to-primary-hover text-white uppercase tracking-widest rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
              >
                <Mail
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span>Request Quote</span>
              </button>
              <button
                onClick={handleDownloadSpecSheet}
                disabled={isGenerating}
                className="flex-1 px-5 py-2 border-2 border-leather-900 bg-white text-leather-900 uppercase tracking-widest rounded-xl hover:bg-leather-900 hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download
                      size={20}
                      className="group-hover:translate-y-1 transition-transform"
                    />
                    <span className=" ">Download Spec Sheet</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
