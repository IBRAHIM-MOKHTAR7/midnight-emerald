"use server";

import { db } from "@/lib/db";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";

// Rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(identifier: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

// Constants
const REVALIDATE_PATHS = ["/products", "/", "/dashboard"] as const;
const MAX_SEARCH_LENGTH = 100;
const DEFAULT_PAGE_SIZE = 50;
const VALID_CATEGORIES = ["MEN", "WOMEN", "KIDS"] as const;

// Validation schemas
const productSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  description: z.string().min(1).max(2000).trim(),
  price: z.number().positive().max(999999.99),
  images: z.array(z.string().url()).min(1).max(8),
  category: z.enum(["MEN", "WOMEN", "KIDS"]),
  sizes: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL"])).min(1).max(6),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;

// Helper: Serialize Prisma product to plain object
function serializeProduct<T extends { price: unknown }>(product: T) {
  return { ...product, price: Number(product.price) };
}

function serializeProducts<T extends { price: unknown }>(products: T[]) {
  return products.map(serializeProduct);
}

// Helper: Build safe where clause with input sanitization
function buildProductWhereClause(
  category?: string,
  search?: string
): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = {};

  if (category && category !== "ALL") {
    if (VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
      where.category = category as typeof VALID_CATEGORIES[number];
    }
  }

  if (search?.trim()) {
    let sanitizedSearch = search.trim().slice(0, MAX_SEARCH_LENGTH);

    // Remove dangerous characters for security
    const badChars = ['<', '>', '"', "'", ';', '(', ')', '&', '+'];
    for (const char of badChars) {
      sanitizedSearch = sanitizedSearch.split(char).join('');
    }

    if (sanitizedSearch) {
      where.OR = [
        { name: { contains: sanitizedSearch, mode: "insensitive" } },
        { description: { contains: sanitizedSearch, mode: "insensitive" } },
      ];
    }
  }

  return where;
}

// Helper function to revalidate paths and cache
function revalidateProductPaths(additionalPath?: string) {
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
  if (additionalPath) {
    revalidatePath(additionalPath);
  }
  revalidateTag("products", {});
}

export async function getProducts(
  category?: string,
  search?: string,
  limit: number = DEFAULT_PAGE_SIZE
) {
  if (!checkRateLimit("getProducts", 100, 60000)) {
    throw new Error("Rate limit exceeded");
  }

  const getCachedProducts = unstable_cache(
    async () => {
      const where = buildProductWhereClause(category, search);

      const products = await db.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: Math.min(limit, 100),
      });

      return serializeProducts(products);
    },
    [`products-${category || "all"}-${search || "all"}-${limit}`],
    { revalidate: 60, tags: ["products"] }
  );

  return getCachedProducts();
}

export async function getFeaturedProducts() {
  if (!checkRateLimit("getFeatured", 50, 60000)) {
    throw new Error("Rate limit exceeded");
  }

  const getCached = unstable_cache(
    async () => {
      const products = await db.product.findMany({
        where: { featured: true, inStock: true },
        take: 6,
        orderBy: { createdAt: "desc" },
      });
      return serializeProducts(products);
    },
    ["featured-products"],
    { revalidate: 300, tags: ["products"] }
  );

  return getCached();
}

export async function getProductById(id: string) {
  if (!checkRateLimit(`getProduct-${id}`, 30, 60000)) {
    throw new Error("Rate limit exceeded");
  }

  if (!id || typeof id !== "string") {
    throw new Error("Invalid product ID");
  }

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) return null;
  return serializeProduct(product);
}

export async function createProduct(data: ProductInput) {
  if (!checkRateLimit("createProduct", 10, 60000)) {
    throw new Error("Rate limit exceeded");
  }

  const validated = productSchema.parse(data);

  const product = await db.product.create({
    data: validated,
  });

  revalidateProductPaths();

  return serializeProduct(product);
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  if (!checkRateLimit(`updateProduct-${id}`, 10, 60000)) {
    throw new Error("Rate limit exceeded");
  }

  if (!id || typeof id !== "string") {
    throw new Error("Invalid product ID");
  }

  const product = await db.product.update({
    where: { id },
    data,
  });

  revalidateProductPaths(`/products/${id}`);

  return serializeProduct(product);
}

export async function deleteProduct(id: string) {
  if (!checkRateLimit("deleteProduct", 5, 60000)) {
    throw new Error("Rate limit exceeded");
  }

  if (!id || typeof id !== "string") {
    throw new Error("Invalid product ID");
  }

  await db.product.delete({
    where: { id },
  });

  revalidateProductPaths();
}
