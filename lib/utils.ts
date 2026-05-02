import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function createWhatsAppMessage(
  productName: string,
  size: string,
  quantity: number,
  totalPrice: number,
  customerName: string
): string {
  return `Hello! I'd like to order:\n\n👕 ${productName}\n📏 Size: ${size}\n🔢 Quantity: ${quantity}\n💵 Total: $${totalPrice.toFixed(2)}\n\n👤 Customer: ${customerName}`;
}
