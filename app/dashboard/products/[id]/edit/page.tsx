import { notFound } from "next/navigation";
import { getProductById } from "@/actions/products";
import { ProductForm } from "@/components/product-form";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: product ? `Edit ${product.name} | Dashboard` : "Edit Product | Dashboard",
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Edit Product</h1>
        <p className="text-gray-400">Update {product.name}</p>
      </div>
      <ProductForm product={product} isEditing />
    </div>
  );
}
