"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-tnred text-white rounded-lg">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-tnred dark:text-red-400">CLGMTE</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Smart TNEA counselling guidance assistant helping students explore colleges, branch courses, and plan their future career paths.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-sm text-gray-500 dark:text-gray-400 hover:text-tnred dark:hover:text-red-400 transition-colors">
                  Engineering Courses
                </Link>
              </li>
              <li>
                <Link href="/colleges" className="text-sm text-gray-500 dark:text-gray-400 hover:text-tnred dark:hover:text-red-400 transition-colors">
                  College Profiles
                </Link>
              </li>
              <li>
                <Link href="/choices" className="text-sm text-gray-500 dark:text-gray-400 hover:text-tnred dark:hover:text-red-400 transition-colors">
                  Choice Matching
                </Link>
              </li>
              <li>
                <Link href="/ask-ai" className="text-sm text-gray-500 dark:text-gray-400 hover:text-tnred dark:hover:text-red-400 transition-colors">
                  Ask CLGMTE AI
                </Link>
              </li>
            </ul>
          </div>

          {/* External Portals */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Official TNEA Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.tneaonline.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-tnred dark:hover:text-red-400 transition-colors"
                >
                  TNEA Portal <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.dte.tn.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-tnred dark:hover:text-red-400 transition-colors"
                >
                  DoTE website <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.annauniv.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-tnred dark:hover:text-red-400 transition-colors"
                >
                  Anna University <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-tnred dark:text-red-400" />
                <span>support@clgmte.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-tnred dark:text-red-400" />
                <span>+91 44 2235 7354</span>
              </li>
              <li className="mt-4 pt-4 border-t border-gray-200/20 dark:border-white/10 text-xs">
                <span>Created for AI Bootcamp & Hackathon Demonstrations.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>&copy; {new Date().getFullYear()} CLGMTE. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Made with passion in Tamil Nadu</span>
            <span className="text-red-500">&hearts;</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
