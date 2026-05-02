"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { Product } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/utils";

type SerializedProduct = Omit<Product, 'price'> & { price: number };

interface ProductGridProps {
  products: SerializedProduct[];
}

// Memoize ProductCard to prevent unnecessary re-renders when grid re-renders
const MemoizedProductCard = memo(ProductCard);

interface ProductCardProps {
  product: SerializedProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0] || "/placeholder-product.jpg";
  const altText = product.name || "Product image";

  return (
    <div className="group relative bg-midnight-800 rounded-xl overflow-hidden border border-midnight-600 hover:border-emerald-500/50 transition-all duration-300">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-product.jpg";
          }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-emerald-500 font-medium uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-white font-semibold text-lg mb-2 hover:text-emerald-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          <span className="text-gray-500 text-sm">
            {product.sizes.length} sizes
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <MemoizedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
