import { getProducts } from "@/actions/products";
import { ProductTable } from "@/components/product-table";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Products | Midnight Emerald Dashboard",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">All Products</h1>
          <p className="text-gray-400">Manage your product inventory</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-midnight-800 rounded-xl border border-midnight-600 overflow-hidden">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
