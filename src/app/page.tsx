"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  Briefcase,
  Compass,
  ArrowRight,
  TrendingUp,
  School,
  FileText,
  Languages
} from "lucide-react";

// Import data
import collegesData from "@/data/colleges.json";
import coursesData from "@/data/courses.json";
import newsData from "@/data/news.json";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/colleges");
    }
  };

  // Get top 3 colleges by NIRF rank
  const topColleges = [...collegesData]
    .sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999))
    .slice(0, 3);

  // Get first 3 courses
  const featuredCourses = coursesData.slice(0, 3);

  // Get first 3 news items
  const recentNews = newsData.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="relative flex-grow">
        {/* Ambient background glows */}
        <div className="hero-glow-red top-20 left-10 md:left-20" />
        <div className="hero-glow-dark bottom-40 right-10 md:right-32" />

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-tnred/10 text-tnred dark:text-red-400 text-xs font-bold border border-tnred/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TNEA Counselling Guide 2026</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-gray-900 dark:text-white">CLGMTE</span>
              <span className="block bg-gradient-to-r from-tnred via-tnred-light to-red-600 bg-clip-text text-transparent mt-2">
                Smart TNEA Guidance Platform
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 dark:text-gray-400">
              Navigate college cutoffs, explore engineering branches, organize choice filling orders, and interact with our AI counsellor to make the best admissions decisions.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative mt-8">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search colleges (CEG, SSN, PSG...), courses (CSE, ECE...), districts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 shadow-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tnred dark:focus:ring-red-400 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-6 py-2.5 rounded-xl bg-tnred hover:bg-tnred-light text-white text-xs font-bold transition-all shadow-md"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link href="/colleges">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-xl bg-tnred text-white text-sm font-bold shadow-md shadow-tnred/20 hover:shadow-lg cursor-pointer flex items-center space-x-1"
                >
                  <span>Explore Colleges</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
              <Link href="/ask-ai">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-bold shadow-sm hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                >
                  <Sparkles className="h-4 w-4 text-tnred dark:text-red-400" />
                  <span>Ask CLGMTE AI</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-20"
          >
            {[
              { label: "Colleges", value: "470+", icon: School },
              { label: "Courses Offered", value: "100+", icon: BookOpen },
              { label: "Cutoff Analysis", value: "5 Years", icon: TrendingUp },
              { label: "Bilingual Support", value: "தமிழ் + English", icon: Languages }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center hover-glow"
                >
                  <div className="p-3 rounded-xl bg-tnred/10 text-tnred dark:text-red-400 mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* Featured Section Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Top Ranked Colleges */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-tnred dark:text-red-400" />
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    Top Ranked Colleges
                  </h2>
                </div>
                <Link
                  href="/colleges"
                  className="text-sm font-bold text-tnred dark:text-red-400 flex items-center hover:underline"
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {topColleges.map((college) => (
                  <div
                    key={college.code}
                    className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover-glow"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                          Code: {college.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-tnred/10 text-tnred dark:text-red-400 text-[10px] font-bold">
                          NIRF #{college.nirfRank}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                        {college.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {college.district} &bull; {college.type} &bull; {college.autonomous ? "Autonomous" : "Non-Autonomous"}
                      </p>
                    </div>
                    <Link href={`/colleges?code=${college.code}`}>
                      <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-tnred hover:text-white dark:hover:bg-red-500 text-xs font-bold transition-all">
                        Details
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Courses */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-tnred dark:text-red-400" />
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    Trending Branches
                  </h2>
                </div>
                <Link
                  href="/courses"
                  className="text-sm font-bold text-tnred dark:text-red-400 flex items-center hover:underline"
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {featuredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover-glow"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[10px] font-bold">
                          {course.category}
                        </span>
                        <span className="text-xs text-gray-500 font-semibold">{course.degree} &bull; {course.duration}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                        {course.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {course.description}
                      </p>
                    </div>
                    <Link href="/courses">
                      <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-tnred hover:text-white dark:hover:bg-red-500 text-xs font-bold transition-all whitespace-nowrap">
                        Explore Scope
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            {/* Latest Counselling Updates */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-tnred dark:text-red-400" />
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    Counselling Updates
                  </h2>
                </div>
                <Link
                  href="/about"
                  className="text-sm font-bold text-tnred dark:text-red-400 flex items-center hover:underline"
                >
                  <span>View Timeline</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentNews.map((news) => (
                  <div
                    key={news.id}
                    className="glass-panel p-5 rounded-2xl hover-glow"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">{news.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Careers */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-tnred dark:text-red-400" />
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    Popular Career Paths
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "AI Engineer",
                    desc: "Design and train smart machine learning models. High-demand global career.",
                    tags: ["AI & DS", "CSE"]
                  },
                  {
                    title: "VLSI Design Engineer",
                    desc: "Design microchips and semiconductors. Exploding job scope in India.",
                    tags: ["ECE", "EEE"]
                  },
                  {
                    title: "Electric Vehicle Designer",
                    desc: "Develop energy cells, motors, and powertrains for clean transportation.",
                    tags: ["EEE", "Mech"]
                  },
                  {
                    title: "Full Stack Developer",
                    desc: "Create beautiful, high-performing web and mobile software platforms.",
                    tags: ["CSE", "IT"]
                  }
                ].map((career, idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover-glow"
                  >
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                        {career.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                        {career.desc}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-4">
                      {career.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-tnred/5 text-tnred dark:text-red-300 text-[10px] font-bold border border-tnred/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
