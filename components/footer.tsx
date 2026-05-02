import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-midnight-900 border-t border-midnight-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-white">MIDNIGHT</span>
              <span className="text-emerald-500 text-lg font-bold">EMERALD</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Premium clothing for the after hours. Elevate your style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=MEN" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/products?category=WOMEN" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/products?category=KIDS" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-midnight-600 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Midnight Emerald. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
