"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, Home, School } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fcfbfb] dark:bg-[#0d090a] text-[#1a1515] dark:text-[#f5eded] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tnred/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-6 relative"
      >
        <div className="p-4 bg-tnred/10 text-tnred dark:text-red-400 rounded-3xl inline-block shadow-sm">
          <HelpCircle className="h-16 w-16" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-tnred to-tnred-light bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Oops! The page you are looking for does not exist. It might have been moved or the URL could be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-tnred text-white text-xs font-bold shadow-md shadow-tnred/20 hover:shadow-lg flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </motion.div>
          </Link>
          <Link href="/colleges">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-xs font-bold shadow-sm hover:bg-gray-50 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <School className="h-4 w-4 text-tnred dark:text-red-400" />
              <span>Explore Colleges</span>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
