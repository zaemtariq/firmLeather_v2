"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Layers } from "lucide-react";
import { CATEGORIES_DATA, Page } from "@/components/constants/constants";
import {
  formatLabel,
  getMixedProducts,
  getProductImage,
  getProducts,
  productGroups,
} from "./productCatalog";

const categoryCopy = {
  all: {
    title: "Leather Products",
    eyebrow: "Export-ready collections",
    description:
      "Browse finished leather, apparel, accessories, and sports gear built for private labels, wholesalers, and global buyers.",
  },
  accessories: {
    title: "Leather Accessories",
    eyebrow: "Wallets, belts, and daily carry",
    description:
      "Refined leather accessories with dependable stitching, clean finishing, and flexible private-label options.",
  },
  apparel: {
    title: "Leather Apparel",
    eyebrow: "Jackets and custom garments",
    description:
      "Premium leather apparel made for consistent sizing, durable construction, and brand-ready customization.",
  },
  "finished-leather": {
    title: "Finished Leather",
    eyebrow: "Raw materials for makers",
    description:
      "Finished and crust leather prepared for footwear, garments, accessories, and industrial applications.",
  },
  sports: {
    title: "Sports Leather Gear",
    eyebrow: "Performance leather goods",
    description:
      "Cabretta gloves and baseball leather goods designed around grip, fit, and repeatable production quality.",
  },
};

const customManufacturingNote =
  "The product displayed are only a small selection of our manufacturing capabilities. We specialize in custom manufacturing and can produce products according to your specific requirements, including custom designs, materials, colors, sizes, logos, branding, and packaging.";

const getCategoryHref = (categoryId) =>
  categoryId === "all" ? Page.Products : `${Page.Products}/${categoryId}`;

const getProductHref = (product) =>
  `${Page.Products}/${product.collection}/${product.subCat || "all"}/${
    product.productCode
  }`;

const getQuoteHref = (product) => `/get-quote/${product.productCode}`;

function CategoryFilter({ activeCategory }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar" role="list">
      {CATEGORIES_DATA.map((category) => {
        const Icon = category.icon || Layers;
        const active = activeCategory === category.id;

        return (
          <Link
            key={category.id}
            href={getCategoryHref(category.id)}
            className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-bold uppercase tracking-wide transition ${
              active
                ? "border-primary bg-primary text-white"
                : "border-stone-200 bg-white text-stone-700 hover:border-primary hover:text-primary"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {category.label}
          </Link>
        );
      })}
    </div>
  );
}

function SubcategoryFilter({ activeCategory, activeSubcategory, options }) {
  if (!options.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={getCategoryHref(activeCategory)}
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
          activeSubcategory === "all"
            ? "border-stone-900 bg-stone-900 text-white"
            : "border-stone-200 bg-white text-stone-700 hover:border-primary hover:text-primary"
        }`}
      >
        All {activeCategory === "all" ? "Products" : "Items"}
      </Link>

      {options.map((subCategory) => (
        <Link
          key={subCategory}
          href={`${Page.Products}/${activeCategory}/${subCategory}`}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            activeSubcategory === subCategory
              ? "border-stone-900 bg-stone-900 text-white"
              : "border-stone-200 bg-white text-stone-700 hover:border-primary hover:text-primary"
          }`}
        >
          {formatLabel(subCategory)}
        </Link>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const features = product.feature || product.features || [];

  return (
    <article className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-leather-300 hover:shadow-xl">
      <Link href={getProductHref(product)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-leather-100">
          <Image
            src={getProductImage(product)}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-800 shadow-sm">
            {formatLabel(product.subCat || product.collection)}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              {product.productCode}
            </p>
            <h2 className="mt-2 text-lg font-bold leading-tight text-stone-950">
              {product.title}
            </h2>
          </div>
          <span className="shrink-0 rounded-full bg-leather-100 px-3 py-1 text-xs font-bold text-leather-800">
            MOQ {product.moq || 1}
          </span>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
          {product.description || product.longDescription}
        </p>

        {features.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-stone-700">
            {features.slice(0, 2).map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex gap-2">
          <Link
            href={getProductHref(product)}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-stone-950 px-4 text-sm font-bold text-white transition hover:bg-primary"
          >
            Details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={getQuoteHref(product)}
            className="flex h-11 items-center justify-center rounded-full border border-stone-300 px-4 text-sm font-bold text-stone-800 transition hover:border-primary hover:text-primary"
          >
            Quote
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductListingPage() {
  const params = useParams();
  const categoryParam = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category;
  const subcategoryParam = Array.isArray(params?.subcategory)
    ? params.subcategory[0]
    : params?.subcategory;

  const activeCategory = productGroups[categoryParam] ? categoryParam : "all";
  const activeSubcategory = subcategoryParam || "all";
  const activeData =
    CATEGORIES_DATA.find((category) => category.id === activeCategory) ||
    CATEGORIES_DATA[0];
  const copy = categoryCopy[activeCategory] || categoryCopy.all;
  const allProducts = getProducts();
  const categoryProducts =
    activeCategory === "all"
      ? getMixedProducts(allProducts)
      : allProducts.filter((product) => product.collection === activeCategory);
  const products =
    activeSubcategory === "all"
      ? categoryProducts
      : categoryProducts.filter(
          (product) => product.subCat === activeSubcategory,
        );
  const subcategories =
    activeCategory === "all" ? [] : activeData.sub_cat || [];

  return (
    <main className="bg-leather-50 text-stone-900">
      <section className="border-b border-leather-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-normal text-stone-950 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
              {copy.description}
            </p>
            <p className="mt-5 max-w-3xl rounded-lg border border-leather-200 bg-leather-50 p-5 text-sm font-semibold leading-7 text-stone-700">
              {customManufacturingNote}
            </p>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-lg bg-stone-950">
            <Image
              src="/siteImages/factoryIMages/leather_manufacturer.jpg"
              alt="Leather production at FirmLeather"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover opacity-85"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-stone-950 to-transparent p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
                {products.length} products available
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-stone-200">
                Select a collection, review the product code, and request a
                quote for production details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <CategoryFilter activeCategory={activeCategory} />

        <div className="mt-5 flex flex-col gap-5 border-y border-leather-200 py-5 lg:flex-row lg:items-center lg:justify-between">
          <SubcategoryFilter
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
            options={subcategories}
          />
          <p className="text-sm font-semibold text-stone-600">
            Showing {products.length} of {categoryProducts.length} products
          </p>
        </div>

        {products.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.productCode} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-stone-950">
              No products found
            </h2>
            <p className="mx-auto mt-3 max-w-md text-stone-600">
              This filter does not have products yet. Choose another collection
              or ask us about a custom production run.
            </p>
            <Link
              href={Page.Contact}
              className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover"
            >
              Contact Sales
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
