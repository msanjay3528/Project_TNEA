"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot, Loader2, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const chipPrompts = [
  "Suggest colleges for 185 cutoff",
  "Compare CSE vs AI&DS",
  "Top colleges in Chennai",
  "Career scope of ECE"
];

// Context-aware answers mapping
const responseDatabase: Record<string, string> = {
  "suggest colleges for 185 cutoff": `For a cutoff score of **185 (BC/OC)**, you have excellent options in top-tier private autonomous colleges and government colleges:
  
1. **Sona College of Technology, Salem** (Autonomous, NIRF #120) — High probability for ECE, EEE, and Biotech.
2. **K C G College of Technology, Chennai** (Autonomous, NIRF #175) — Very strong chance for ECE, EEE, and IT.
3. **Excel Engineering College, Namakkal** (Autonomous, NIRF #155) — Guaranteed seat in CSE, AIDS, and IT.
4. **K S R College of Engineering, Namakkal** — Guaranteed seat in CSE and Circuit branches.
5. **Government College of Engineering, Salem** — Safe option for EEE, Mechanical, and Civil.

*Recommendation:* Put Sona College and KCG Chennai as your top choices for circuit branches, and Excel/KSR as 100% safe back-ups for CSE!`,

  "compare cse vs ai&ds": `Here is a structured comparison to guide your choice filling:

*   **Computer Science and Engineering (CSE):**
    *   **Scope:** Broad coverage of algorithms, systems engineering, computer architecture, compilers, databases, and software dev.
    *   **Job flexibility:** Highest. Eligible for any software, cloud, devops, or cyber job.
    *   **Higher studies:** Widest options for MS or PhD programs.

*   **Artificial Intelligence and Data Science (AI&DS):**
    *   **Scope:** Focused specialization in mathematical modeling, machine learning, data mining, business intelligence, and statistics.
    *   **Job flexibility:** Specialized. Best for Data Scientist, AI Developer, or Data Engineer roles.
    
*   **Advising Rule:** If you want general coding and flexible options, choose **CSE**. If you love mathematics, stats, and want to specialize strictly in AI developments, choose **AI&DS**.`,

  "top colleges in chennai": `Here are the top-ranked TNEA colleges in the Chennai/Chengalpattu/Kanchipuram region:

1.  **CEG Campus, Anna University** (Guindy, Code: 0001) — The absolute premier choice.
2.  **MIT Campus, Anna University** (Chromepet, Code: 0004) — Highly prestigious, known for avionics and IT.
3.  **SSN College of Engineering** (Kalavakkam, Code: 1315) — Top private autonomous college on OMR.
4.  **Sri Sairam Engineering College** (West Tambaram, Code: 1419) — High placements and discipline.
5.  **Loyola-ICAM College (LICET)** (Nungambakkam, Code: 1124) — Excellent central location.
6.  **K C G College of Technology** (Karapakkam, Code: 1311) — Known for aviation and robotics labs.`,

  "career scope of ece": `**Electronics and Communication Engineering (ECE)** offers excellent dual-career flexibility:

1.  **Semiconductor & Hardware (Core):** Under the India Semiconductor Mission (ISM), massive opportunities are emerging in VLSI design, chip verification, embedded system design, and IoT system architecture.
2.  **Software & IT:** Over 90% of IT and software services companies allow ECE graduates to sit for placements.
3.  **Telecom & space tech:** High-paying recruitments in 5G/6G communication design, satellite electronics, and radar systems.

*Verdict:* Highly recommended if you want to keep options open in both electronics hardware and software sectors.`
};

export default function AskAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am your CLGMTE AI Counselling assistant. Ask me anything about TNEA cutoffs, college comparisons, placements, or choice filling tips!",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // User message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Formulate answer
    setTimeout(() => {
      const normalizedQuery = text.trim().toLowerCase().replace(/[?.]/g, "");
      let botResponse = "";

      // Check DB first
      if (responseDatabase[normalizedQuery]) {
        botResponse = responseDatabase[normalizedQuery];
      } else {
        // Simple NLP routing
        if (normalizedQuery.includes("cutoff") || normalizedQuery.includes("mark")) {
          botResponse = "For TNEA cutoffs, it is best to target colleges where your cutoff score is within 2-3 marks of the 2025 closing cutoff. Government seats in CEG/MIT usually close at >195, while top private autonomous institutions are accessible in the 180-195 range. Try asking me: 'Suggest colleges for 185 cutoff'!";
        } else if (normalizedQuery.includes("chennai")) {
          botResponse = responseDatabase["top colleges in chennai"];
        } else if (normalizedQuery.includes("ece") || normalizedQuery.includes("electronics")) {
          botResponse = responseDatabase["career scope of ece"];
        } else if (normalizedQuery.includes("cse") || normalizedQuery.includes("ai")) {
          botResponse = responseDatabase["compare cse vs ai&ds"];
        } else if (normalizedQuery.includes("coimbatore")) {
          botResponse = "In Coimbatore region, the premier options are **PSG College of Technology** (Code: 2006), **Coimbatore Institute of Technology (CIT)** (Code: 2007), **PSG iTech** (Code: 2018), and **Government College of Technology (GCT)** (Code: 2005). These are top choice filling selections!";
        } else if (normalizedQuery.includes("salem")) {
          botResponse = "In Salem region, the top TNEA choices are **Government College of Engineering, Salem** (Code: 2603) and **Sona College of Technology** (Code: 2618). Both offer autonomous curriculum models and solid local placement drives.";
        } else {
          botResponse = "I hear you! As a mock AI counselling agent, I advise you to look into TNEA cutoff lists. Try selecting one of my pre-programmed chips above, or search for colleges like 'PSG' or 'SSN' in our Colleges page to inspect cutoff tables!";
        }
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500); // 1.5s typing delay
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col h-[calc(100vh-140px)] relative">
        <div className="hero-glow-red top-10 left-10" />

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 flex-shrink-0">
          <div className="p-2.5 bg-tnred rounded-2xl text-white shadow-md shadow-tnred/10">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">
              CLGMTE AI Counselling Advisor
            </h1>
            <span className="block text-xs text-gray-400 font-semibold">
              Powered by simulated Gemini API & TNEA cutoff database
            </span>
          </div>
        </div>

        {/* Chat window panel */}
        <div className="flex-grow glass-panel rounded-3xl border border-gray-200/50 dark:border-white/5 shadow-xl flex flex-col overflow-hidden mb-4">
          
          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2.5 max-w-[85%] ${
                    msg.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`p-2 rounded-xl flex-shrink-0 ${
                      msg.sender === "user"
                        ? "bg-tnred/10 text-tnred dark:text-red-400"
                        : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-tnred text-white"
                        : "bg-white dark:bg-[#181314] border border-gray-200/50 dark:border-white/5 text-gray-800 dark:text-gray-200 whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2.5">
                  <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#181314] border border-gray-200/50 dark:border-white/5 text-gray-500 flex items-center space-x-1.5">
                    <Loader2 className="h-4 w-4 animate-spin text-tnred dark:text-red-400" />
                    <span className="text-xs font-semibold">Counsellor is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick chip Prompts */}
          <div className="px-6 py-3 border-t border-gray-200/10 flex flex-wrap gap-2 items-center bg-gray-50/50 dark:bg-black/20">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-1">
              Suggestions:
            </span>
            {chipPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-tnred/5 hover:border-tnred dark:hover:border-red-400/50 text-[10px] text-gray-600 dark:text-gray-300 font-bold transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat input box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-4 border-t border-gray-200/10 bg-white dark:bg-[#0d090a] flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask anything about TNEA (e.g. Compare SSN vs Sairam, VLSI jobs, PSG cutoff)..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-grow pl-4 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-tnred"
            />
            <button
              type="submit"
              className="p-3 rounded-xl bg-tnred hover:bg-tnred-light text-white transition-all shadow-md shadow-tnred/20 flex items-center justify-center"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
