"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type SerializedProduct = Omit<Product, 'price'> & { price: number };

interface FeaturedProductsProps {
  products: SerializedProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-midnight-800 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-16 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Featured</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Trending <span className="text-emerald-400">Now</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: SerializedProduct; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="group relative bg-midnight-900/50 rounded-2xl overflow-hidden border border-midnight-600/50 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/5">
        {/* Image Container */}
        <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-transparent to-transparent opacity-60" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Product Info */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.featured && (
              <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                ★ Featured
              </span>
            )}
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="text-white font-bold text-xl mb-3 hover:text-emerald-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-black text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-400 text-sm">
              {product.sizes.length} sizes available
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
