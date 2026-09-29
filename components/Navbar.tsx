"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { navLinks, brand } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // Section anchors: smooth scroll on homepage, navigate to /#section from other pages
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
      // else: let the browser navigate to /#section naturally
    }
    setMobileOpen(false);
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
          : "bg-white/80 backdrop-blur-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-md">
            <span className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-white opacity-90" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-[#111111] group-hover:text-teal-600 transition-colors duration-200">Apple</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (<Link
              key={link.href}
              href={getHref(link.href)}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                isActive(link.href)
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-[#444] hover:text-teal-600 hover:bg-teal-50'
              }`}>
              {link.label}
            </Link>))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button onClick={() => setSearchOpen((v) => !v)} className="p-2 rounded-lg text-[#444] hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600" aria-label="Toggle search">
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-lg text-[#444] hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600" aria-label={`Cart, ${cartCount} items`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-teal-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden p-2 rounded-lg text-[#444] hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600" aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="pb-3">
                <input type="search" placeholder="Search products…" autoFocus className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F5F5F3] text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (<Link
              key={link.href}
              href={getHref(link.href)}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(link.href)
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-[#444] hover:text-teal-600 hover:bg-teal-50'
              }`}>
              {link.label}
            </Link>))}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-[#444] hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200">
                Wishlist
              </Link>
              <Link href="/cart" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-[#444] hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200">
                Cart ({cartCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
