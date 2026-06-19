"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  BookOpen,
  UserCheck,
  ListOrdered,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Calendar
} from "lucide-react";

// Import timeline data
import timelineData from "@/data/timeline.json";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="hero-glow-dark top-10 right-10" />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            About TNEA Counselling
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            A comprehensive guide to understanding ranks, seat allotment, and the choice filling lifecycle in Tamil Nadu.
          </p>
        </div>

        {/* Quick TNEA Explanations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Rank Types Card */}
          <div className="glass-panel p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-tnred/10 text-tnred dark:text-red-400">
                <Award className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                General Rank vs. Community Rank
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              TNEA releases two ranks for every candidate who completes document verification:
            </p>
            <ul className="space-y-3 pl-1">
              <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">General Rank:</strong> Your absolute merit position across all registered students in the state. This is calculated solely based on your TNEA cutoff score (out of 200).
              </li>
              <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Community Rank:</strong> Your category merit position (BC, BCM, MBC, SC, SCA, ST). If a seat under the open quota is filled, candidates are evaluated against community ranks for category-reserved seats, making this rank vital for college allotment.
              </li>
            </ul>
          </div>

          {/* Choice Filling strategy Card */}
          <div className="glass-panel p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-tnred/10 text-tnred dark:text-red-400">
                <ListOrdered className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                Smart Choice Filling Strategy
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Choice filling is the most crucial step of TNEA. Seats are allocated sequentially based on your rank and your submitted preference sheet:
            </p>
            <ul className="space-y-3 pl-1">
              <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex items-start space-x-2">
                <span className="text-tnred font-bold">1.</span>
                <span><strong>Dream Choices (Top):</strong> List 5-10 colleges slightly above your cutoff range where you hope to get in through upward movement.</span>
              </li>
              <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex items-start space-x-2">
                <span className="text-tnred font-bold">2.</span>
                <span><strong>Target Choices (Middle):</strong> List 10-15 colleges matching your cutoff score exactly. These are your primary placement targets.</span>
              </li>
              <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex items-start space-x-2">
                <span className="text-tnred font-bold">3.</span>
                <span><strong>Safe Choices (Bottom):</strong> List 5-10 colleges where cutoffs are 5-10 marks below yours to guarantee you don't end up without an allotment.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* TNEA Timeline Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center md:justify-start">
            <Calendar className="h-6 w-6 text-tnred dark:text-red-400 mr-2" />
            Counselling Milestone Timeline
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Follow the structural progress of the admissions cycle.
          </p>
        </div>

        {/* Timeline Visualization with Vertical Progress Bar */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-10 md:pl-16 mb-16">
          {/* Vertical progress bar line */}
          <div className="absolute top-0 bottom-0 left-3 sm:left-5 md:left-8 w-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "40%" }} // Indicating we are currently in Verification step (Step 2)
              className="w-full bg-gradient-to-b from-tnred to-tnred-light"
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isCompleted = item.status === "Completed";
              const isInProgress = item.status === "In Progress";
              return (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={item.step}
                  className="relative"
                >
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[38px] md:-left-[54px] w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 flex items-center justify-center text-[10px] font-extrabold shadow-sm ${
                      isCompleted
                        ? "bg-tnred border-tnred text-white"
                        : isInProgress
                        ? "bg-white dark:bg-[#120e0f] border-tnred-light text-tnred dark:text-red-400"
                        : "bg-white dark:bg-[#120e0f] border-gray-200 dark:border-white/10 text-gray-400"
                    }`}
                  >
                    {item.step}
                  </div>

                  {/* Timeline content Card */}
                  <div className="glass-panel p-5 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm space-y-2 hover-glow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-extrabold text-gray-900 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                          {item.date}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            isCompleted
                              ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300"
                              : isInProgress
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                              : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
