import { notFound } from "next/navigation";
import { getProductById } from "@/actions/products";
import { ProductDetails } from "@/components/product-details";
import { ImageGallery } from "@/components/image-gallery";
import { SizeSelector } from "@/components/size-selector";
import { OrderForm } from "@/components/order-form";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Midnight Emerald",
    };
  }

  return {
    title: `${product.name} | Midnight Emerald`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-midnight-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            <ProductDetails product={product} />
            <SizeSelector sizes={product.sizes} />
            <OrderForm
              productName={product.name}
              price={Number(product.price)}
              sizes={product.sizes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
