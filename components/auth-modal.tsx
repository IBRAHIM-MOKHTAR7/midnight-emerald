"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "sign-in" | "sign-up";
}

export function AuthModal({ isOpen, onClose, mode = "sign-in" }: AuthModalProps) {
  const [authMode, setAuthMode] = useState(mode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white transition-colors sm:right-0"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Auth Component */}
        {authMode === "sign-in" ? (
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-midnight-800 border border-midnight-600 shadow-2xl",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-midnight-700 border-midnight-600 text-white hover:bg-midnight-600",
                formFieldLabel: "text-gray-300",
                formFieldInput: "bg-midnight-700 border-midnight-600 text-white",
                footerActionText: "text-gray-400",
                footerActionLink: "text-emerald-500 hover:text-emerald-400",
                formButtonPrimary: "bg-emerald-500 hover:bg-emerald-600",
              },
            }}
            routing="hash"
            fallbackRedirectUrl="/dashboard"
          />
        ) : (
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-midnight-800 border border-midnight-600 shadow-2xl",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-midnight-700 border-midnight-600 text-white hover:bg-midnight-600",
                formFieldLabel: "text-gray-300",
                formFieldInput: "bg-midnight-700 border-midnight-600 text-white",
                footerActionText: "text-gray-400",
                footerActionLink: "text-emerald-500 hover:text-emerald-400",
                formButtonPrimary: "bg-emerald-500 hover:bg-emerald-600",
              },
            }}
            routing="hash"
            fallbackRedirectUrl="/dashboard"
          />
        )}
      </div>
    </div>
  );
}
