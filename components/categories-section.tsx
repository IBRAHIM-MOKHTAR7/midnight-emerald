"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Women",
    description: "Elegant dresses, coats, and accessories for the modern woman",
    href: "/products?category=WOMEN",
    gradient: "from-purple-600/30 via-pink-500/20 to-emerald-500/20",
    icon: "✨",
  },
  {
    name: "Men",
    description: "Sophisticated suits, jackets, and timeless pieces",
    href: "/products?category=MEN",
    gradient: "from-emerald-600/30 via-teal-500/20 to-blue-500/20",
    icon: "👔",
  },
  {
    name: "Essentials",
    description: "Must-have basics that never go out of style",
    href: "/products",
    gradient: "from-amber-500/20 via-gray-500/20 to-emerald-500/20",
    icon: "⭐",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-midnight-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Browse Categories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Shop by <span className="text-emerald-400">Category</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every style and occasion
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={category.href}
                className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl bg-midnight-800/50 border border-midnight-600/50 p-6 sm:p-10 hover:border-emerald-500/50 transition-all duration-500 h-full"
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`} />

                {/* Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:text-emerald-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    {category.description}
                  </p>

                  <div className="flex items-center text-emerald-400 font-semibold group-hover:text-emerald-300">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
