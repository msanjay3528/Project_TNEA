"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Award,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
  BookOpen,
  Briefcase,
  HelpCircle,
  Percent,
  CheckCircle,
  Building
} from "lucide-react";

// Import data
import collegesData from "@/data/colleges.json";
import coursesData from "@/data/courses.json";

function CollegesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [filterAutonomous, setFilterAutonomous] = useState<boolean | null>(null);
  const [filterType, setFilterType] = useState("All"); // All, Government, Private, Government-Aided
  const [filterTopRanked, setFilterTopRanked] = useState(false);

  // Selected college modal state
  const [selectedCollege, setSelectedCollege] = useState<typeof collegesData[0] | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "courses" | "cutoff" | "placement" | "highlights">("overview");

  // Read query params on load
  useEffect(() => {
    const qSearch = searchParams.get("search");
    const qCode = searchParams.get("code");

    if (qSearch) {
      setSearchQuery(qSearch);
    }

    if (qCode) {
      const col = collegesData.find((c) => c.code === qCode);
      if (col) {
        setSelectedCollege(col);
        setModalTab("overview");
      }
    }
  }, [searchParams]);

  // Extract unique districts
  const districts = ["All", ...Array.from(new Set(collegesData.map((c) => c.district)))];

  // Filters logic
  const filteredColleges = collegesData.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.code.includes(searchQuery) ||
      college.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedDistrict === "All" || college.district === selectedDistrict;

    const matchesAutonomous =
      filterAutonomous === null || college.autonomous === filterAutonomous;

    const matchesType =
      filterType === "All" || college.type === filterType;

    const matchesTopRanked =
      !filterTopRanked || (college.nirfRank !== null && college.nirfRank <= 100);

    return matchesSearch && matchesDistrict && matchesAutonomous && matchesType && matchesTopRanked;
  });

  const openCollegeModal = (college: typeof collegesData[0]) => {
    setSelectedCollege(college);
    setModalTab("overview");
    // Update URL query param silently
    router.replace(`/colleges?code=${college.code}`, { scroll: false });
  };

  const closeCollegeModal = () => {
    setSelectedCollege(null);
    // Clear URL query param
    router.replace("/colleges", { scroll: false });
  };

  return (
    <div className="relative">
      <div className="hero-glow-dark top-10 right-10" />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Engineering Colleges Directory
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Explore TNEA counseling colleges, view historical cutoffs, NAAC/NIRF indicators, and average salaries.
        </p>
      </div>

      {/* Filter Controls Panel */}
      <div className="glass-panel p-6 rounded-3xl mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 h-4.5 w-4.5 text-gray-400 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by college name, code, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-tnred"
            />
          </div>

          {/* District Dropdown */}
          <div className="relative">
            <MapPin className="absolute left-3.5 h-4.5 w-4.5 text-gray-400 top-1/2 -translate-y-1/2" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-tnred appearance-none cursor-pointer"
            >
              <option value="All">All Districts</option>
              {districts.filter(d => d !== "All").map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* College Type Dropdown */}
          <div className="relative">
            <Building className="absolute left-3.5 h-4.5 w-4.5 text-gray-400 top-1/2 -translate-y-1/2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-tnred appearance-none cursor-pointer"
            >
              <option value="All">All Ownership Types</option>
              <option value="Government">Government / Constituent</option>
              <option value="Government-Aided">Government Aided</option>
              <option value="Private">Private / Self-Financing</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200/10">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center">
            <Filter className="h-3 w-3 mr-1" /> Quick Filters:
          </span>
          <button
            onClick={() => setFilterAutonomous(filterAutonomous === true ? null : true)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
              filterAutonomous === true
                ? "bg-tnred border-tnred text-white"
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
            }`}
          >
            Autonomous
          </button>
          <button
            onClick={() => setFilterAutonomous(filterAutonomous === false ? null : false)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
              filterAutonomous === false
                ? "bg-tnred border-tnred text-white"
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
            }`}
          >
            Non-Autonomous
          </button>
          <button
            onClick={() => setFilterTopRanked(!filterTopRanked)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
              filterTopRanked
                ? "bg-tnred border-tnred text-white"
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
            }`}
          >
            Top Ranked (NIRF &le; 100)
          </button>
          {(searchQuery || selectedDistrict !== "All" || filterAutonomous !== null || filterType !== "All" || filterTopRanked) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDistrict("All");
                setFilterAutonomous(null);
                setFilterType("All");
                setFilterTopRanked(false);
              }}
              className="text-[10px] font-bold text-red-500 hover:underline ml-auto"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Counter */}
      <div className="mb-4 text-xs font-bold text-gray-500 dark:text-gray-400">
        Showing {filteredColleges.length} of {collegesData.length} colleges
      </div>

      {/* Colleges Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredColleges.map((college) => (
            <motion.div
              layout
              key={college.code}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between hover-glow"
            >
              <div>
                {/* Card Header badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-gray-400">
                    Code: {college.code}
                  </span>
                  <div className="flex space-x-1">
                    {college.autonomous && (
                      <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300 text-[10px] font-bold">
                        Autonomous
                      </span>
                    )}
                    {college.nirfRank && (
                      <span className="px-2 py-0.5 rounded bg-tnred/10 text-tnred dark:text-red-400 text-[10px] font-bold">
                        NIRF #{college.nirfRank}
                      </span>
                    )}
                  </div>
                </div>

                {/* College Name & District */}
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white leading-snug line-clamp-2">
                  {college.name}
                </h3>

                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{college.district} &bull; {college.type}</span>
                </div>

                {/* Overview snippet */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                  {college.overview}
                </p>
              </div>

              {/* Placement Snapshot & Button */}
              <div className="mt-6 pt-4 border-t border-gray-200/10 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    Avg Placement
                  </span>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                    {college.avgPackage} LPA
                  </span>
                </div>
                <button
                  onClick={() => openCollegeModal(college)}
                  className="px-4 py-2 rounded-xl bg-tnred hover:bg-tnred-light text-white text-xs font-bold transition-all shadow-md shadow-tnred/10"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredColleges.length === 0 && (
        <div className="text-center py-20">
          <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No colleges match your filter</h3>
          <p className="text-xs text-gray-500 mt-1">Try resetting the filters or modifying your search query.</p>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedCollege && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 35 }}
              className="bg-white dark:bg-[#120e0f] border border-gray-200 dark:border-white/10 rounded-3xl max-w-3xl w-full p-6 relative overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="pr-12">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-[10px] font-bold">
                    TNEA CODE: {selectedCollege.code}
                  </span>
                  {selectedCollege.autonomous && (
                    <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300 text-[10px] font-bold">
                      Autonomous
                    </span>
                  )}
                  {selectedCollege.nirfRank && (
                    <span className="px-2 py-0.5 rounded bg-tnred/10 text-tnred dark:text-red-400 text-[10px] font-bold">
                      NIRF Rank: {selectedCollege.nirfRank}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-2 leading-snug">
                  {selectedCollege.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {selectedCollege.district} &bull; {selectedCollege.type} Institution
                </p>
              </div>

              <button
                onClick={closeCollegeModal}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Tab Navigation */}
              <div className="flex space-x-2 border-b border-gray-200/10 my-4 overflow-x-auto no-scrollbar">
                {(["overview", "courses", "cutoff", "placement", "highlights"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setModalTab(tab)}
                    className={`pb-2.5 px-3 text-xs font-bold border-b-2 capitalize transition-all whitespace-nowrap ${
                      modalTab === tab
                        ? "border-tnred text-tnred dark:text-red-400"
                        : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents (Scrollable area) */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {/* Overview Tab */}
                {modalTab === "overview" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        About the College
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedCollege.overview}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <Calendar className="h-5 w-5 text-tnred dark:text-red-400 mb-1" />
                        <span className="block text-[10px] font-bold text-gray-400">Established</span>
                        <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {selectedCollege.established}
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <Award className="h-5 w-5 text-tnred dark:text-red-400 mb-1" />
                        <span className="block text-[10px] font-bold text-gray-400">NIRF Rank</span>
                        <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                          #{selectedCollege.nirfRank || "N/A"}
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <DollarSign className="h-5 w-5 text-tnred dark:text-red-400 mb-1" />
                        <span className="block text-[10px] font-bold text-gray-400">Avg Package</span>
                        <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {selectedCollege.avgPackage} LPA
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <Percent className="h-5 w-5 text-tnred dark:text-red-400 mb-1" />
                        <span className="block text-[10px] font-bold text-gray-400">Placement %</span>
                        <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {selectedCollege.placementRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Courses Tab */}
                {modalTab === "courses" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      Admissions Courses Offered
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedCollege.coursesOffered.map((cId) => {
                        const courseObj = coursesData.find((cr) => cr.id === cId);
                        return (
                          <div
                            key={cId}
                            className="p-3 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex items-center space-x-3"
                          >
                            <div className="p-2 rounded-lg bg-tnred/10 text-tnred dark:text-red-400">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-gray-900 dark:text-white">
                                {courseObj ? courseObj.name : cId.toUpperCase()}
                              </span>
                              <span className="text-[10px] text-gray-400 font-semibold">
                                {courseObj ? courseObj.degree : "B.E."} &bull; 4 Years
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cutoff Tab */}
                {modalTab === "cutoff" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      TNEA 2025 Round-1 Closing Cutoff Marks
                    </h4>
                    <div className="overflow-x-auto border border-gray-200/20 dark:border-white/10 rounded-2xl">
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold border-b border-gray-200/10">
                            <th className="p-3">Branch Course</th>
                            <th className="p-3 text-center">OC</th>
                            <th className="p-3 text-center">BC</th>
                            <th className="p-3 text-center">BCM</th>
                            <th className="p-3 text-center">MBC</th>
                            <th className="p-3 text-center">SC</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/10">
                          {Object.entries(selectedCollege.cutoffs).map(([courseKey, values]) => {
                            const courseObj = coursesData.find((cr) => cr.id === courseKey);
                            return (
                              <tr key={courseKey} className="hover:bg-gray-50 dark:hover:bg-white/5">
                                <td className="p-3 font-bold text-gray-900 dark:text-white max-w-[160px] truncate">
                                  {courseObj ? courseObj.name : courseKey.toUpperCase()}
                                </td>
                                <td className="p-3 text-center font-semibold text-tnred dark:text-red-400">{values.OC}</td>
                                <td className="p-3 text-center font-semibold">{values.BC}</td>
                                <td className="p-3 text-center font-semibold">{values.BCM}</td>
                                <td className="p-3 text-center font-semibold">{values.MBC}</td>
                                <td className="p-3 text-center font-semibold">{values.SC}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                      * Cutoffs correspond to Round 1 academic counselling closing marks of the respective community seats in 2025.
                    </p>
                  </div>
                )}

                {/* Placement Tab */}
                {modalTab === "placement" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 border border-gray-200/20 dark:border-white/5 bg-gray-50 dark:bg-white/5 rounded-2xl text-center">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Placement Rate
                        </span>
                        <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                          {selectedCollege.placementRate}%
                        </span>
                      </div>
                      <div className="p-4 border border-gray-200/20 dark:border-white/5 bg-gray-50 dark:bg-white/5 rounded-2xl text-center">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Average Package
                        </span>
                        <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                          {selectedCollege.avgPackage} LPA
                        </span>
                      </div>
                      <div className="p-4 border border-gray-200/20 dark:border-white/5 bg-gray-50 dark:bg-white/5 rounded-2xl text-center">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Highest Package
                        </span>
                        <span className="text-2xl font-extrabold text-tnred dark:text-red-400">
                          {selectedCollege.maxPackage} LPA
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                        <Briefcase className="h-4 w-4 mr-1.5 text-tnred dark:text-red-400" />
                        Top Recruiters
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCollege.recruiters.map((rec, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-3 py-1.5 rounded-xl border border-gray-200/40 dark:border-white/10 bg-white dark:bg-white/5 text-xs text-gray-600 dark:text-gray-300 font-semibold"
                          >
                            {rec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Highlights Tab */}
                {modalTab === "highlights" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      Key Achievements & Highlights
                    </h4>
                    <ul className="space-y-3">
                      {selectedCollege.highlights.map((hl, hlIdx) => (
                        <li
                          key={hlIdx}
                          className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-2xl flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle className="h-4.5 w-4.5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/10 flex justify-end">
                <button
                  onClick={closeCollegeModal}
                  className="px-6 py-2 rounded-xl bg-tnred hover:bg-tnred-light text-white text-xs font-bold shadow-md shadow-tnred/20"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Colleges() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
        <Suspense fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-tnred dark:text-red-400" />
              <span className="text-sm font-bold text-gray-500">Loading Directory...</span>
            </div>
          </div>
        }>
          <CollegesContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

// Add simple Loader2 wrapper for Suspense fallback
const Loader2 = ({ className }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
