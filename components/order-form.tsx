"use client";

import { useState } from "react";
import { Size } from "@/generated/prisma/client";
import { toast } from "sonner";
import { createWhatsAppMessage } from "@/lib/utils";
import { SizeSelector } from "./size-selector";
import { Minus, Plus, MessageCircle } from "lucide-react";

interface OrderFormProps {
  productName: string;
  price: number;
  sizes: Size[];
}

export function OrderForm({ productName, price, sizes }: OrderFormProps) {
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");

  const totalPrice = price * quantity;

  const handleOrder = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (customerName.trim().length < 2) {
      toast.error("Please enter a valid name");
      return;
    }

    const adminNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "";
    if (!adminNumber) {
      toast.error("WhatsApp service not configured");
      return;
    }

    const sanitizedCustomerName = customerName.trim().slice(0, 50);
    const message = createWhatsAppMessage(
      productName,
      selectedSize,
      quantity,
      totalPrice,
      sanitizedCustomerName
    );

    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <div className="space-y-6 pt-6 border-t border-midnight-600">
      {/* Size Selector */}
      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      {/* Quantity */}
      <div className="space-y-3">
        <label className="text-white font-semibold">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 rounded-lg bg-midnight-700 text-white hover:bg-midnight-600 transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="w-12 text-center text-white font-semibold text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 rounded-lg bg-midnight-700 text-white hover:bg-midnight-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Customer Name */}
      <div className="space-y-3">
        <label className="text-white font-semibold" htmlFor="customer-name">Your Name</label>
        <input
          id="customer-name"
          type="text"
          placeholder="Enter your full name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value.slice(0, 50))}
          maxLength={50}
          className="w-full px-4 py-2.5 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          aria-required="true"
        />
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-midnight-600">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">Total</span>
          <span className="text-2xl font-bold text-white">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Order Button */}
      <button
        onClick={handleOrder}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02]"
      >
        <MessageCircle className="w-5 h-5" />
        Order via WhatsApp
      </button>

      <p className="text-gray-500 text-sm text-center">
        You will be redirected to WhatsApp to complete your order
      </p>
    </div>
  );
}
