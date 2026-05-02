"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { AuthModal } from "./auth-modal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-midnight-900/80 backdrop-blur-md border-b border-midnight-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                MIDNIGHT
              </span>
              <span className="text-emerald-500 text-xl font-bold">EMERALD</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth Buttons */}
              {!isSignedIn ? (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium"
                >
                  Sign In
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="p-2 text-gray-300 hover:text-emerald-400 transition-colors"
                    title="Dashboard"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                      },
                    }}
                  />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-midnight-900 border-b border-midnight-600">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-midnight-800 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Auth */}
              {!isSignedIn ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="block w-full text-left px-3 py-2 text-emerald-500 hover:text-emerald-400 hover:bg-midnight-800 rounded-md transition-colors font-medium"
                >
                  Sign In
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-midnight-800 rounded-md transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <div className="px-3 py-2">
                    <UserButton />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
