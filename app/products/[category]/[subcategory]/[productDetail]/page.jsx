"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Page } from "@/components/constants/constants";
import {
  findProduct,
  formatLabel,
  getProductImages,
} from "@/components/ProductGallery/productCatalog";

const trustItems = [
  { label: "Quality checked", icon: ShieldCheck },
  { label: "Export shipping", icon: Truck },
  { label: "MOQ supported", icon: PackageCheck },
];

const formatSpecValue = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return value;
};

function ProductNotFound({ category, productCode }) {
  return (
    <main className="min-h-screen bg-leather-50 px-5 py-20">
      <div className="mx-auto max-w-xl rounded-lg border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leather-100">
          <PackageCheck className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-stone-950">
          Product not found
        </h1>
        <p className="mt-3 leading-7 text-stone-600">
          We could not find product code {productCode} in the{" "}
          {formatLabel(category)} collection.
        </p>
        <Link
          href={`${Page.Products}/${category || "all"}`}
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover"
        >
          Back to Collection
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}

export default function ProductDetailsPage() {
  const params = useParams();
  const category = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category;
  const subcategory = Array.isArray(params?.subcategory)
    ? params.subcategory[0]
    : params?.subcategory;
  const productCode = Array.isArray(params?.productDetail)
    ? params.productDetail[0]
    : params?.productDetail;

  const product = useMemo(
    () => findProduct(category, productCode),
    [category, productCode],
  );
  const images = useMemo(() => getProductImages(product), [product]);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <ProductNotFound category={category} productCode={productCode} />;
  }

  const specs = product.specifications || {};
  const backHref = `${Page.Products}/${category || product.category}`;
  const quoteHref = `/get-quote/${product.productCode}`;
  const collectionLabel = formatLabel(
    subcategory || product.subCat || product.category,
  );
  const productFacts = [
    { label: "Product Code", value: product.productCode },
    { label: "Minimum Order", value: `${product.moq || 1} units` },
    { label: "Collection", value: collectionLabel },
    { label: "Finish", value: product.leatherFinish || "Customizable" },
  ];

  return (
    <main className="bg-white text-stone-900">
      <section className="bg-stone-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-700 shadow-sm transition hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to {formatLabel(category || "products")}
          </Link>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-16">
          <div className="min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-2xl">
              <Image
                src={images[activeImage]}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-stone-950/85 to-transparent p-5">
                <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wide text-stone-900 shadow-sm">
                  {collectionLabel}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border bg-white transition ${
                      activeImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-stone-200 hover:border-primary"
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-300 px-4 py-2 text-xs font-bold uppercase tracking-wide text-stone-950">
                {formatLabel(product.category)}
              </span>
              <span className="rounded-full border border-leather-200 bg-leather-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-leather-800">
                {collectionLabel}
              </span>
            </div>
            <h1 className="mt-6 max-w-3xl text-amber-800 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300">
              {product.longDescription || product.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {productFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={quoteHref}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-hover"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Request Quote
              </Link>
              <a
                href="#specifications"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 bg-leather-50 px-6 text-sm font-bold uppercase tracking-wide text-stone-900 transition hover:border-primary hover:text-primary"
              >
                <Ruler className="h-4 w-4" aria-hidden="true" />
                See Specs
              </a>
              <Link
                href={Page.Contact}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 text-sm font-bold uppercase tracking-wide text-stone-900 transition hover:border-primary hover:text-primary"
              >
                Get Custom Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-leather-200 bg-leather-50">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {trustItems.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leather-100">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm font-bold text-stone-800">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="specifications"
        className="mx-auto grid scroll-mt-24 max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.78fr_0.22fr] lg:px-8 lg:py-14"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-leather-100">
              <Ruler className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                Product details
              </p>
              <h2 className="text-3xl font-extrabold text-stone-950">
                Specifications
              </h2>
            </div>
          </div>

          {Object.keys(specs).length > 0 ? (
            <dl className="mt-7 grid gap-3 md:grid-cols-2">
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border border-stone-200 bg-leather-50 p-4"
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-stone-500">
                    {formatLabel(key)}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-stone-950">
                    {formatSpecValue(value)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-6 rounded-lg border border-stone-200 bg-leather-50 p-5 leading-7 text-stone-600">
              Technical specifications can be confirmed with our sales team.
            </p>
          )}
        </div>

        <aside className="self-start rounded-lg border border-stone-200 bg-stone-950 p-6 text-white shadow-sm">
          <PackageCheck className="h-7 w-7 text-amber-300" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-extrabold text-amber-800">
            Ready for production
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            Share the product code with your quantity, sizing, color, and label
            requirements for a focused quote.
          </p>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
              Reference
            </p>
            <p className="mt-2 font-mono text-sm font-bold text-white">
              {product.productCode}
            </p>
          </div>
          <Link
            href={quoteHref}
            className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-hover"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Request Quote
          </Link>
        </aside>
      </section>

      <section className="bg-leather-50 px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-leather-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Custom manufacturing
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-stone-950">
              Need this product adjusted for your brand?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Confirm materials, colors, sizing, packaging, and private-label
              options with our production team.
            </p>
          </div>
          <Link
            href={Page.Contact}
            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-stone-300 px-6 text-sm font-bold uppercase tracking-wide text-stone-900 transition hover:border-primary hover:text-primary"
          >
            Get Custom Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
