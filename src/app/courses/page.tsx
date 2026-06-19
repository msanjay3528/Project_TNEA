"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, BookOpen, Brain, Shield, Cpu, Bot, Award, X, HelpCircle, Briefcase } from "lucide-react";
import coursesData from "@/data/courses.json";

// Stories data
const stories = [
  {
    id: "ai",
    title: "AI Revolution",
    icon: Brain,
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    content: {
      headline: "The Artificial Intelligence & Data Science Wave",
      description: "Generative AI, Large Language Models (LLMs), and automated analytics are redefining every sector. Students entering AI & DS will learn to design models, parse big data systems, and build automated agents. High-demand fields include NLP, computer vision, and neural engineering.",
      stats: "Estimated 11.5 million AI jobs globally by 2026",
      careers: "Machine Learning Engineer, Data Scientist, AI Architect, Prompt Engineer"
    }
  },
  {
    id: "cyber",
    title: "Cyber Security",
    icon: Shield,
    gradient: "from-blue-500 via-teal-500 to-green-500",
    content: {
      headline: "Securing the Digital Infrastructure",
      description: "With rapid cloud migration comes increased vulnerabilities. Cyber Security focuses on cryptography, network defense, penetration testing, and ethical hacking. Specialized graduates protect corporate networks, state databases, and cloud structures.",
      stats: "3.5 million unfulfilled cybersecurity openings worldwide",
      careers: "Security Analyst, Penetration Tester, Cryptographer, CISO"
    }
  },
  {
    id: "semi",
    title: "Semiconductors",
    icon: Cpu,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    content: {
      headline: "India's Semiconductor Expansion",
      description: "With the India Semiconductor Mission (ISM) attracting billions in fab setups, ECE and VLSI engineers are in unprecedented demand. This vertical covers silicon design, chip fabrication, embedded systems, and hardware synthesis.",
      stats: "Expected $80B domestic market footprint by 2030",
      careers: "VLSI Design Engineer, Chip Layout Designer, Embedded Systems Analyst"
    }
  },
  {
    id: "robotics",
    title: "Robotics & IoT",
    icon: Bot,
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
    content: {
      headline: "Autonomous Systems & Smart Sensors",
      description: "Robotics combines Mechanical, Electronics, and Software to build intelligent automation. Applications stretch from drone delivery systems to robotic surgery and smart industrial arms. IoT connects hardware systems through real-time communication protocols.",
      stats: "Automation sector growing at 15.4% CAGR",
      careers: "Robotics Engineer, IoT Solutions Architect, Automation Developer"
    }
  },
  {
    id: "future",
    title: "Future Careers",
    icon: Sparkles,
    gradient: "from-red-500 via-pink-500 to-purple-500",
    content: {
      headline: "Interdisciplinary Engineering & Green Energy",
      description: "Tomorrow's engineering challenges lie at intersection points: Electric Vehicles (EV), bioinformatics, green hydrogen grid systems, and computational health. Specialized branches like Biomedical and Chemical Engineering are adapting to smart automation technologies.",
      stats: "Green tech jobs expected to rise 30% by 2028",
      careers: "EV Specialist, Bioinformatician, Smart Grid Manager, Biotech Researcher"
    }
  }
];

export default function Courses() {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Software", "Circuit", "Core", "Emerging"];

  // Filter courses based on search & category chip
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.careers.some((career) => career.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeFilter === "All" || course.category === activeFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="hero-glow-red top-40 left-1/3" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Explore Engineering Branches
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Understand curriculum scopes, popular career routes, and future scopes before making your choice.
          </p>
        </div>

        {/* Stories Banner */}
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center sm:text-left">
            Trending Engineering Trends (Click to view)
          </h2>
          <div className="flex items-center space-x-6 overflow-x-auto py-4 px-2 no-scrollbar justify-start sm:justify-center">
            {stories.map((story) => {
              const Icon = story.icon;
              return (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="flex flex-col items-center space-y-2 cursor-pointer focus:outline-none flex-shrink-0 group"
                >
                  <div className={`p-[3px] rounded-full bg-gradient-to-tr ${story.gradient} group-hover:scale-105 transition-all shadow-md`}>
                    <div className="p-3 bg-white dark:bg-black rounded-full text-gray-800 dark:text-white">
                      <Icon className="h-6 w-6 text-tnred dark:text-red-400" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 group-hover:text-tnred dark:group-hover:text-red-400 transition-colors">
                    {story.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeFilter === filter
                    ? "bg-tnred border-tnred text-white shadow-md shadow-tnred/10"
                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 h-4 w-4 text-gray-400 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search branch name or careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-tnred dark:focus:ring-red-400"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-6 rounded-3xl flex flex-col justify-between hover-glow"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-tnred/5 text-tnred dark:text-red-400 text-[10px] font-bold border border-tnred/10">
                      {course.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[10px] font-bold">
                      {course.scope}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">
                    {course.name}
                  </h3>
                  <span className="block text-xs text-gray-400 font-semibold mt-1">
                    {course.degree} &bull; {course.duration}
                  </span>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/10">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Popular Careers:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.careers.map((career, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-[10px] text-gray-600 dark:text-gray-400 font-medium"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No courses match your query</h3>
            <p className="text-xs text-gray-500 mt-1">Try modifying your filters or search keywords.</p>
          </div>
        )}

        {/* Stories Modal */}
        <AnimatePresence>
          {selectedStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#120e0f] border border-gray-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 relative overflow-hidden shadow-2xl"
              >
                {/* Decorative background gradient indicator */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${selectedStory.gradient}`} />

                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-tnred/10 text-tnred dark:text-red-400">
                      {React.createElement(selectedStory.icon, { className: "h-6 w-6" })}
                    </div>
                    <span className="text-xs font-bold text-tnred dark:text-red-400 uppercase tracking-widest">
                      {selectedStory.title}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {selectedStory.content.headline}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {selectedStory.content.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                      <Award className="h-4 w-4 text-tnred dark:text-red-400" />
                      <span>{selectedStory.content.stats}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <Briefcase className="h-3.5 w-3.5 mr-1" /> Key Career Positions:
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                      {selectedStory.content.careers}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="px-6 py-2 rounded-xl bg-tnred hover:bg-tnred-light text-white text-xs font-bold shadow-md shadow-tnred/20"
                  >
                    Close
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
