import { getFeaturedProducts } from "@/actions/products";
import { Product } from "@/generated/prisma/client";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { CategoriesSection } from "@/components/categories-section";
import { NewsletterSection } from "@/components/newsletter-section";

type SerializedProduct = Omit<Product, 'price'> & { price: number };

export default async function HomePage() {
  let featuredProducts: SerializedProduct[] = [];

  try {
    featuredProducts = await getFeaturedProducts();
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts products={featuredProducts} />
      <NewsletterSection />
    </div>
  );
}
