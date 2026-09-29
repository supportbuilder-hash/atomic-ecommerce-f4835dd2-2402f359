"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, Truck, RefreshCw, Shield, Leaf } from 'lucide-react';
import { useTranslations } from "next-intl";
import { brand } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const categories = [
  {
    id: "skincare",
    label: "Skincare",
    description: "Clean formulas, visible results",
    image: "https://www.beautycreationscosmetics.com/cdn/shop/products/the-five-step-essentials-skincare-kit-bcskin-beauty-creations-189465.jpg?v=1723046704",
    href: "#products",
  },
  {
    id: "home",
    label: "Home",
    description: "Calm spaces, considered objects",
    image: "https://www.beautycreationscosmetics.com/cdn/shop/products/the-five-step-essentials-skincare-kit-bcskin-beauty-creations-189465.jpg?v=1723046704",
    href: "#products",
  },
  {
    id: "wellness",
    label: "Wellness",
    description: "Rituals for a quieter life",
    image: "https://static.newhomeinc.com/newhomeinc/images/newhomeinc_og.jpg",
    href: "#products",
  },
  {
    id: "stationery",
    label: "Stationery",
    description: "Tools that respect your focus",
    image: "https://globalwellnessinstitute.org/wp-content/uploads/2019/05/wellnessinfographic.png",
    href: "#products",
  },
];

const products = [
  {
    id: 1,
    name: "Clarity Face Serum",
    category: "Skincare",
    price: 48,
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller",
    image: "https://m.media-amazon.com/images/I/517P9nJUGfL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Home",
    price: 89,
    rating: 4.8,
    reviews: 204,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    category: "Home",
    price: 64,
    rating: 4.7,
    reviews: 178,
    badge: null,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 4,
    name: "Calm Body Oil",
    category: "Wellness",
    price: 36,
    rating: 4.9,
    reviews: 421,
    badge: "Bestseller",
    image: "https://m.media-amazon.com/images/I/61LMatxfgML._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 5,
    name: "Dot Grid Notebook",
    category: "Stationery",
    price: 22,
    rating: 4.6,
    reviews: 95,
    badge: "New",
    image: "https://vanness1938.com/cdn/shop/products/Pocket-Dot-Grid-Paper_1400x.png?v=1618083594",
  },
  {
    id: 6,
    name: "Matte Lip Balm Trio",
    category: "Skincare",
    price: 28,
    rating: 4.8,
    reviews: 267,
    badge: null,
    image: "https://m.media-amazon.com/images/I/71VMZV2MdKL._AC_UF1000,1000_QL80_.jpg",
  },
];

const values = [
  {
    id: "shipping",
    icon: Truck,
    title: "Free Shipping Over $60",
    description: "Every order above $60 ships free, anywhere in the country.",
  },
  {
    id: "returns",
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not right for you? Return it within 30 days, no questions asked.",
  },
  {
    id: "quality",
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every product is tested and approved by our in-house team.",
  },
  {
    id: "planet",
    icon: Leaf,
    title: "Planet-First Packaging",
    description: "All packaging is compostable or made from recycled materials.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Mara Chen",
    role: "Interior Designer",
    quote:
      "Lumen has completely changed how I think about the objects in my home. Every piece is intentional.",
    rating: 5,
    avatar: "https://www.salisbury.edu/_images/directory/mxchen.jpg",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Wellness Coach",
    quote:
      "The Calm Body Oil is part of my morning ritual now. The quality is unlike anything else at this price.",
    rating: 5,
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    role: "Freelance Writer",
    quote:
      "The stationery line is genuinely beautiful. My desk has never felt more like a place I want to be.",
    rating: 5,
    avatar: "https://www.bmi.com/images/news/2023/_770/Latin-Spotlight-Sofia-Reyes.jpg",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  const isBestseller = label === "Bestseller";
  return (
    <span
      className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full ${
        isBestseller
          ? "bg-teal-600 text-white"
          : "bg-white text-teal-700 border border-teal-200"
      }`}>
      {label}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-16">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(13,148,136,0.06) 0%, transparent 70%)",
          }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="order-2 lg:order-1">
              <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-5">
                {t("hero.eyebrow")}
              </motion.p>
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#111] leading-[1.05] text-balance mb-6">
                {t("hero.headline1")}
                <br />
                <span className="text-teal-600">{t("hero.headline2")}</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-gray-500 leading-relaxed max-w-md mb-10 text-pretty">
                {t("hero.subheadline")}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                <Link
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2">Shop</Link>
                <Link
                  href="#categories"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#categories")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-md px-1">
                  {t("hero.secondaryCta")}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Social proof strip */}
              <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6 border-t border-gray-100 pt-8">
                {[
                  { value: "12k+", label: t("hero.stat1") },
                  { value: "4.9", label: t("hero.stat2") },
                  { value: "100%", label: t("hero.stat3") },
                ].map((stat) => (<div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-semibold text-[#111] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {stat.label}
                  </span>
                </div>))}
              </motion.div>
            </motion.div>

            {/* Right: Product image */}
            <motion.div variants={slideInRight} initial="hidden" animate="visible" className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gray-50 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_64px_-16px_rgba(0,0,0,0.12)]">
                <img src="https://www.otterbox.com/cdn/shop/files/lumen-passport-iphb23-paris-1.png?v=1773853742&width=1920" alt="Lumen minimalist essentials collection" className="w-full h-full object-cover" />
                {/* Floating badge */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }} className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.10)] border border-white/60">
                  <p className="text-xs text-gray-400 mb-0.5">{t("hero.floatingLabel")}</p>
                  <p className="text-sm font-semibold text-[#111]">
                    {t("hero.floatingProduct")}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">4.9</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative ring */}
              <div className="absolute -top-6 -right-6 w-48 h-48 rounded-full border border-teal-100 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-teal-50 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-24 md:py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">
                {t("categories.eyebrow")}
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-[#111] text-balance">
                {t("categories.heading")}
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (<motion.a
                key={cat.id}
                href={cat.href}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(cat.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] transition-shadow duration-300">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold text-lg leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-white/70 text-xs mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </motion.a>))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section id="products" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeInUp} className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">
                  {t("products.eyebrow")}
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-[#111] text-balance">
                  {t("products.heading")}
                </h2>
              </div>
              <a href="#products" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200">
                {t("products.viewAll")}
                <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (<motion.div key={product.id} variants={fadeInUp} whileHover={{ y: -6, transition: { duration: 0.25 } }} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)] transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {product.badge && <Badge label={product.badge} />}
                  {/* Quick add overlay */}
                  <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute inset-0 bg-black/10 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="inline-flex items-center gap-2 bg-white text-[#111] text-sm font-medium px-5 py-2.5 rounded-full shadow-md hover:bg-teal-600 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
                      <ShoppingCart size={14} />
                      {t("products.addToCart")}
                    </button>
                  </motion.div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-600 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-base font-semibold text-[#111] mb-2 leading-snug">
                    {product.name}
                  </h3>
                  <StarRating rating={product.rating} count={product.reviews} />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-semibold text-[#111]">
                      ${product.price.toFixed(2)}
                    </span>
                    <button aria-label={`Add ${product.name} to cart`} className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
                      <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {/* Split layout: text left, values right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={slideInLeft}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-4">
                  {t("about.eyebrow")}
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-[#111] leading-tight text-balance mb-6">
                  {t("about.heading")}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 text-pretty">
                  {t("about.body1")}
                </p>
                <p className="text-gray-500 leading-relaxed text-pretty">
                  {t("about.body2")}
                </p>
              </motion.div>

              <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {values.map((v) => {
                  const Icon = v.icon;
                  return (
                    <motion.div key={v.id} variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)]">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                        <Icon size={18} className="text-teal-600" />
                      </div>
                      <h3 className="text-sm font-semibold text-[#111] mb-1.5">
                        {v.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {v.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">
                {t("testimonials.eyebrow")}
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-[#111] text-balance">
                {t("testimonials.heading")}
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((review, idx) => (
                <motion.div
                  key={review.id}
                  variants={fadeInUp}
                  className={`bg-[#fafafa] rounded-2xl p-7 border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)] ${
                    idx === 1 ? "md:mt-6" : ""
                  }`}>
                  <div className="flex items-center gap-0.5 mb-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 text-pretty">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    <div>
                      <p className="text-sm font-semibold text-[#111]">
                        {review.name}
                      </p>
                      <p className="text-xs text-gray-400">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-24 md:py-32 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-2xl mx-auto text-center">
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 mb-4">
              {t("newsletter.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight text-balance mb-5">
              {t("newsletter.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-10 text-pretty">
              {t("newsletter.body")}
            </motion.p>

            <motion.div variants={fadeInUp}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className="inline-flex items-center gap-2 bg-teal-600/20 border border-teal-500/30 text-teal-400 px-6 py-3.5 rounded-full text-sm font-medium">
                  {t("newsletter.success")}
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("newsletter.placeholder")} required className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" />
                  <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-7 py-3 rounded-full text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]">
                    {t("newsletter.cta")}
                  </button>
                </form>
              )}
              <p className="text-white/25 text-xs mt-4">
                {t("newsletter.disclaimer")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}