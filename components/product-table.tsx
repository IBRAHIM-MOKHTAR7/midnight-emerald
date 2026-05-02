"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/actions/products";
import { Pencil, Trash2, Star, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type SerializedProduct = Omit<Product, 'price'> & { price: number };

interface ProductTableProps {
  products: SerializedProduct[];
}

export function ProductTable({ products }: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No products found</p>
        <Link
          href="/dashboard/products/new"
          className="inline-block mt-4 text-emerald-500 hover:text-emerald-400"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-midnight-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Product</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Sizes</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-midnight-600">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-midnight-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-midnight-600">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 text-xs text-yellow-500">
                          <Star className="w-3 h-3 fill-yellow-500" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-white">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {product.sizes.join(", ")}
                </td>
                <td className="px-6 py-4">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 text-emerald-500 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-500 text-sm">
                      <XCircle className="w-4 h-4" />
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className="p-2 rounded-lg hover:bg-midnight-600 text-gray-400 hover:text-white transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      {deletingId === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-midnight-600">
        {products.map((product) => (
          <div key={product.id} className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-midnight-600 flex-shrink-0">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium truncate">{product.name}</p>
                  {product.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium uppercase">
                    {product.category}
                  </span>
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 text-emerald-500 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-500 text-xs">
                      <XCircle className="w-3 h-3" />
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
              <span className="text-white font-bold text-lg flex-shrink-0">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                Sizes: {product.sizes.join(", ")}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard/products/${product.id}/edit`}
                  className="p-2 rounded-lg hover:bg-midnight-600 text-gray-400 hover:text-white transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {deletingId === product.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
