// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-neutral-900">
      <div className="mx-auto px-4 flex justify-end items-center h-16">

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/page" className="hover:text-blue-500">
            Page
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-neutral-900 text-white flex flex-col items-center justify-center space-y-6 md:hidden transition-transform">
          {/* Close Button (inside menu) */}
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>

          {/* Links */}
          <Link
            href="/"
            className="text-xl hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/page"
            className="text-xl hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Page
          </Link>
        </div>
      )}
    </nav>
  );
}
