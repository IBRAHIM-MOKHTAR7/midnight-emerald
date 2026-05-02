"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { value: "ALL", label: "All Categories" },
  { value: "MEN", label: "Men" },
  { value: "WOMEN", label: "Women" },
  { value: "KIDS", label: "Kids" },
];

interface ProductFiltersProps {
  currentCategory?: string;
}

export function ProductFilters({ currentCategory }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentCategory || "ALL"}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="px-4 py-2.5 bg-midnight-800 border border-midnight-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
