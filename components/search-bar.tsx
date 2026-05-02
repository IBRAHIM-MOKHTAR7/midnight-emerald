"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

const DEBOUNCE_DELAY = 300;
const MAX_SEARCH_LENGTH = 100;

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const updateSearch = useCallback((searchQuery: string) => {
    const sanitizedQuery = searchQuery.trim().slice(0, MAX_SEARCH_LENGTH);
    const currentSearch = searchParams.get("search") || "";

    // Only update if query actually changed
    if (sanitizedQuery === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());

    if (sanitizedQuery) {
      params.set("search", sanitizedQuery);
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSearch(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [query, updateSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_SEARCH_LENGTH);
    setQuery(value);
  }, []);

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        maxLength={MAX_SEARCH_LENGTH}
        className="w-full pl-10 pr-10 py-2.5 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
        aria-label="Search products"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
