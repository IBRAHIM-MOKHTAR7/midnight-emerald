"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Product, Size, Category } from "@/generated/prisma/client";
import { createProduct, updateProduct } from "@/actions/products";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";
import Image from "next/image";

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES: Category[] = ["MEN", "WOMEN", "KIDS"];

// URL validation
const IMAGE_URL_REGEX = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
const isValidImageUrl = (url: string): boolean =>
  url.startsWith("http") && (IMAGE_URL_REGEX.test(url) || url.includes("utfs.io"));

export function ProductForm({ product, isEditing }: ProductFormProps) {
  const router = useRouter();
  const imageUrlInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>(product?.sizes || []);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ? String(product.price) : "",
    category: product?.category || "MEN",
    featured: product?.featured || false,
    inStock: product?.inStock ?? true,
  });

  // Memoized callbacks
  const toggleSize = useCallback((size: Size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addImageUrl = useCallback(() => {
    const input = imageUrlInputRef.current;
    if (!input) return;

    const url = input.value.trim();
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    if (!isValidImageUrl(url)) {
      toast.error("Please enter a valid image URL (jpg, png, gif, webp)");
      return;
    }

    setImages((prev) => [...prev, url]);
    input.value = "";
    toast.success("Image URL added");
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImageUrl();
    }
  }, [addImageUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    if (selectedSizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        images,
        sizes: selectedSizes,
      };

      if (isEditing && product) {
        await updateProduct(product.id, data);
        toast.success("Product updated successfully");
      } else {
        await createProduct(data);
        toast.success("Product created successfully");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(isEditing ? "Failed to update product" : "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl w-full">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2.5 bg-midnight-800 border border-midnight-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="Enter product name"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2.5 bg-midnight-800 border border-midnight-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
          placeholder="Enter product description"
        />
      </div>

      {/* Price & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2.5 bg-midnight-800 border border-midnight-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            className="w-full px-4 py-2.5 bg-midnight-800 border border-midnight-600 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Available Sizes</label>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`w-12 h-12 rounded-lg font-medium transition-all duration-200 ${selectedSizes.includes(size)
                ? "bg-emerald-500 text-white border-2 border-emerald-500"
                : "bg-midnight-800 text-gray-400 border-2 border-midnight-600 hover:border-emerald-500/50"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Images</label>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {images.map((url, index) => (
              <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image src={url} alt={`Product ${index + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-red-500/80 text-white hover:bg-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res) {
              setImages((prev) => [...prev, ...res.map((file) => file.url)]);
              toast.success("Images uploaded successfully");
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`Upload failed: ${error.message}`);
          }}
          className="ut-button:bg-emerald-500 ut-button:hover:bg-emerald-600 ut-button:text-white ut-button:rounded-lg ut-button:px-4 ut-button:py-2.5 ut-button:font-medium ut-button:transition-colors"
        />

        {/* Add Image URL Directly */}
        <div className="mt-4 flex gap-2">
          <input
            ref={imageUrlInputRef}
            type="url"
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 bg-midnight-800 border border-midnight-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            Add URL
          </button>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5 rounded border-midnight-600 bg-midnight-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-midnight-900"
          />
          <span className="text-gray-300">Featured Product</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            className="w-5 h-5 rounded border-midnight-600 bg-midnight-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-midnight-900"
          />
          <span className="text-gray-300">In Stock</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold rounded-lg transition-colors"
      >
        {isSubmitting ? (
          "Saving..."
        ) : isEditing ? (
          "Update Product"
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Create Product
          </>
        )}
      </button>
    </form>
  );
}
