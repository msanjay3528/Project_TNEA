"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  TrendingUp,
  Percent,
  MapPin,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Check,
  X,
  Shuffle
} from "lucide-react";

// Import data
import collegesData from "@/data/colleges.json";

export default function Choices() {
  const [activeTab, setActiveTab] = useState<"nirf" | "cutoff" | "excellence">("nirf");
  const [compareList, setCompareList] = useState<typeof collegesData>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Paradigm Sorting
  const sortedByNIRF = [...collegesData]
    .sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999));

  const sortedByCutoff = [...collegesData]
    .sort((a, b) => {
      // Sort by CEG's CSE equivalent cutoff or average OC cutoff
      const avgA = Object.values(a.cutoffs).reduce((sum, val) => sum + val.OC, 0) / Object.values(a.cutoffs).length;
      const avgB = Object.values(b.cutoffs).reduce((sum, val) => sum + val.OC, 0) / Object.values(b.cutoffs).length;
      return avgB - avgA;
    });

  const sortedByExcellence = [...collegesData]
    .sort((a, b) => b.placementRate - a.placementRate || b.avgPackage - a.avgPackage);

  const getActiveList = () => {
    switch (activeTab) {
      case "nirf":
        return sortedByNIRF.slice(0, 10);
      case "cutoff":
        return sortedByCutoff.slice(0, 10);
      case "excellence":
        return sortedByExcellence.slice(0, 10);
    }
  };

  const toggleCompare = (college: typeof collegesData[0]) => {
    if (compareList.some((c) => c.code === college.code)) {
      setCompareList(compareList.filter((c) => c.code !== college.code));
    } else {
      if (compareList.length >= 2) {
        // Replace the second one or show warning (here we cap at 2)
        setCompareList([compareList[0], college]);
      } else {
        setCompareList([...compareList, college]);
      }
    }
  };

  // Compare two colleges helper values
  const c1 = compareList[0];
  const c2 = compareList[1];

  // Helper to compare values and return highlight styles
  const getBetter = (val1: number, val2: number, lowerIsBetter = false) => {
    if (val1 === val2) return "neutral";
    if (lowerIsBetter) {
      return val1 < val2 ? "first" : "second";
    }
    return val1 > val2 ? "first" : "second";
  };

  const getBetterText = (txt1: string | boolean, txt2: string | boolean) => {
    if (txt1 === txt2) return "neutral";
    if (typeof txt1 === "boolean" && typeof txt2 === "boolean") {
      return txt1 && !txt2 ? "first" : !txt1 && txt2 ? "second" : "neutral";
    }
    return "neutral";
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="hero-glow-red top-20 left-10" />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Smart Choice Optimizer & Compare
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Prioritize your counselling application sheet using different sorting paradigms, and compare colleges side-by-side.
          </p>
        </div>

        {/* Choice Paradigms Tabs */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 flex">
            {[
              { id: "nirf", label: "Based on NIRF Rank", icon: Award },
              { id: "cutoff", label: "Based on Cutoff Marks", icon: TrendingUp },
              { id: "excellence", label: "Based on Placements", icon: Percent }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === tab.id
                      ? "bg-tnred text-white shadow-md shadow-tnred/20"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {getActiveList().map((college, idx) => {
            const isAdded = compareList.some((c) => c.code === college.code);
            return (
              <div
                key={college.code}
                className="glass-panel p-5 rounded-3xl flex items-center justify-between gap-4 hover-glow"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-tnred dark:text-red-400">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">&bull; Code: {college.code}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white mt-1 leading-snug">
                    {college.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-3">
                    <span className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {college.district}
                    </span>
                    <span>&bull;</span>
                    <span>NIRF #{college.nirfRank || "N/A"}</span>
                    <span>&bull;</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">{college.placementRate}% Placed</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleCompare(college)}
                  className={`flex-shrink-0 p-2.5 rounded-xl border transition-all ${
                    isAdded
                      ? "bg-tnred border-tnred text-white"
                      : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                  title={isAdded ? "Remove from comparison" : "Add to comparison"}
                >
                  {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Floating Comparison Tray */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[90%] glass-panel p-4 rounded-3xl border border-tnred/30 dark:border-red-900/40 shadow-2xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="hidden sm:flex p-2 bg-tnred/10 rounded-xl text-tnred dark:text-red-400">
                  <Shuffle className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-gray-900 dark:text-white">
                    College Comparison Tray ({compareList.length}/2)
                  </span>
                  <div className="flex items-center space-x-2 mt-1 overflow-hidden truncate">
                    {compareList.map((c) => (
                      <span
                        key={c.code}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-tnred/5 text-tnred dark:text-red-400 text-[10px] font-bold border border-tnred/10 max-w-[120px] truncate"
                      >
                        {c.name.split(" - ")[0]}
                        <button onClick={() => toggleCompare(c)} className="ml-1 text-red-500 hover:text-red-700">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {compareList.length === 2 ? (
                  <button
                    onClick={() => setShowComparison(true)}
                    className="px-5 py-2.5 rounded-xl bg-tnred hover:bg-tnred-light text-white text-xs font-bold shadow-md shadow-tnred/20 flex items-center space-x-1 whitespace-nowrap"
                  >
                    <span>Compare Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <span className="text-[10px] text-gray-400 font-bold px-2">
                    Select 1 more
                  </span>
                )}
                <button
                  onClick={() => setCompareList([])}
                  className="p-2.5 rounded-xl border border-gray-200/50 dark:border-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  title="Clear all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Modal Matrix */}
        <AnimatePresence>
          {showComparison && c1 && c2 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#120e0f] border border-gray-200 dark:border-white/10 rounded-3xl max-w-3xl w-full p-6 relative overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-gray-200/10">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center">
                    <Shuffle className="h-5 w-5 text-tnred dark:text-red-400 mr-2" />
                    Side-by-Side Comparison
                  </h2>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Compare Table */}
                <div className="flex-grow overflow-y-auto mt-4 pr-1">
                  <div className="overflow-x-auto border border-gray-200/10 rounded-2xl">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200/10 text-gray-700 dark:text-gray-300">
                          <th className="p-4 font-extrabold">Attribute</th>
                          <th className="p-4 font-extrabold w-[35%] bg-tnred/5 text-tnred dark:text-red-400">
                            {c1.name.split(" - ")[0]}
                          </th>
                          <th className="p-4 font-extrabold w-[35%]">
                            {c2.name.split(" - ")[0]}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/10">
                        {/* College Code */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">TNEA Code</td>
                          <td className="p-4 font-bold bg-tnred/5">{c1.code}</td>
                          <td className="p-4 font-bold">{c2.code}</td>
                        </tr>

                        {/* District */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">District</td>
                          <td className="p-4 bg-tnred/5">{c1.district}</td>
                          <td className="p-4">{c2.district}</td>
                        </tr>

                        {/* Ownership Type */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">Ownership</td>
                          <td className="p-4 bg-tnred/5">{c1.type}</td>
                          <td className="p-4">{c2.type}</td>
                        </tr>

                        {/* NIRF Rank */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">NIRF Rank</td>
                          <td className={`p-4 font-bold bg-tnred/5 ${
                            getBetter(c1.nirfRank || 999, c2.nirfRank || 999, true) === "first"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            #{c1.nirfRank || "N/A"}
                            {getBetter(c1.nirfRank || 999, c2.nirfRank || 999, true) === "first" && " (Better)"}
                          </td>
                          <td className={`p-4 font-bold ${
                            getBetter(c1.nirfRank || 999, c2.nirfRank || 999, true) === "second"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            #{c2.nirfRank || "N/A"}
                            {getBetter(c1.nirfRank || 999, c2.nirfRank || 999, true) === "second" && " (Better)"}
                          </td>
                        </tr>

                        {/* Average Placement Package */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">Avg Placement</td>
                          <td className={`p-4 font-bold bg-tnred/5 ${
                            getBetter(c1.avgPackage, c2.avgPackage) === "first"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            {c1.avgPackage} LPA
                            {getBetter(c1.avgPackage, c2.avgPackage) === "first" && " (Better)"}
                          </td>
                          <td className={`p-4 font-bold ${
                            getBetter(c1.avgPackage, c2.avgPackage) === "second"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            {c2.avgPackage} LPA
                            {getBetter(c1.avgPackage, c2.avgPackage) === "second" && " (Better)"}
                          </td>
                        </tr>

                        {/* Placement Rate */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">Placement %</td>
                          <td className={`p-4 font-bold bg-tnred/5 ${
                            getBetter(c1.placementRate, c2.placementRate) === "first"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            {c1.placementRate}%
                            {getBetter(c1.placementRate, c2.placementRate) === "first" && " (Better)"}
                          </td>
                          <td className={`p-4 font-bold ${
                            getBetter(c1.placementRate, c2.placementRate) === "second"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            {c2.placementRate}%
                            {getBetter(c1.placementRate, c2.placementRate) === "second" && " (Better)"}
                          </td>
                        </tr>

                        {/* Autonomous status */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">Autonomous</td>
                          <td className={`p-4 bg-tnred/5 ${
                            getBetterText(c1.autonomous, c2.autonomous) === "first"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            {c1.autonomous ? "Yes" : "No"}
                          </td>
                          <td className={`p-4 ${
                            getBetterText(c1.autonomous, c2.autonomous) === "second"
                              ? "text-green-600 dark:text-green-400 font-extrabold"
                              : ""
                          }`}>
                            {c2.autonomous ? "Yes" : "No"}
                          </td>
                        </tr>

                        {/* Established */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="p-4 font-bold text-gray-500">Established</td>
                          <td className="p-4 bg-tnred/5">{c1.established}</td>
                          <td className="p-4">{c2.established}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/10 flex justify-end space-x-2">
                  <button
                    onClick={() => setShowComparison(false)}
                    className="px-6 py-2 rounded-xl bg-tnred hover:bg-tnred-light text-white text-xs font-bold shadow-md shadow-tnred/20"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
