"use client";

import { Size } from "@/generated/prisma/client";

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize?: Size;
  onSelect?: (size: Size) => void;
}

const allSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-white font-semibold">Select Size</label>
      <div className="flex flex-wrap gap-2">
        {allSizes.map((size) => {
          const isAvailable = sizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => isAvailable && onSelect?.(size)}
              disabled={!isAvailable}
              className={`
                w-12 h-12 rounded-lg font-medium transition-all duration-200
                ${isSelected
                  ? "bg-emerald-500 text-white border-2 border-emerald-500"
                  : isAvailable
                    ? "bg-midnight-700 text-white border-2 border-midnight-600 hover:border-emerald-500/50"
                    : "bg-midnight-800 text-gray-600 border-2 border-midnight-700 cursor-not-allowed"
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>
      <p className="text-gray-500 text-sm">
        Available sizes are highlighted. Click to select your size.
      </p>
    </div>
  );
}
