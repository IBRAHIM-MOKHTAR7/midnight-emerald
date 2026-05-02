import { Product } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/utils";

type SerializedProduct = Omit<Product, 'price'> & { price: number };

interface ProductDetailsProps {
  product: SerializedProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-4">
      {/* Category Badge */}
      <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <span className="text-emerald-500 text-sm font-medium uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-2xl sm:text-3xl font-bold text-emerald-500">
          {formatPrice(product.price)}
        </span>
        {product.inStock ? (
          <span className="text-emerald-400 text-sm">In Stock</span>
        ) : (
          <span className="text-red-400 text-sm">Out of Stock</span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
        {product.description}
      </p>

      {/* Features */}
      <div className="pt-4 border-t border-midnight-600">
        <h3 className="text-white font-semibold mb-3">Product Details</h3>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Premium quality materials
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available in {product.sizes.length} sizes
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Free shipping on orders over $100
          </li>
        </ul>
      </div>
    </div>
  );
}
