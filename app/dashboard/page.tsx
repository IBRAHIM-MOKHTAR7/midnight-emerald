import { getProducts } from "@/actions/products";
import { ProductTable } from "@/components/product-table";
import { StatsCard } from "@/components/stats-card";
import { Package, TrendingUp, Users } from "lucide-react";

export default async function DashboardPage() {
  const products = await getProducts();

  const stats = {
    totalProducts: products.length,
    featuredProducts: products.filter((p) => p.featured).length,
    inStock: products.filter((p) => p.inStock).length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Manage your products and inventory</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          trend="+12%"
        />
        <StatsCard
          title="Featured Products"
          value={stats.featuredProducts}
          icon={TrendingUp}
          trend="Active"
        />
        <StatsCard
          title="In Stock"
          value={stats.inStock}
          icon={Users}
          trend="Available"
        />
      </div>

      {/* Products Table */}
      <div className="bg-midnight-800 rounded-xl border border-midnight-600 overflow-hidden">
        <div className="p-6 border-b border-midnight-600">
          <h2 className="text-xl font-semibold text-white">Inventory Overview</h2>
        </div>
        <ProductTable products={products} />
      </div>
    </div>
  );
}
