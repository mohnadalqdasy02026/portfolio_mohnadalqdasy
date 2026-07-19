"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Palette, Sun, Moon } from "lucide-react";

const themes = [
  { id: "aurora", name: "Aurora", color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
  { id: "ocean", name: "Ocean", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "sunset", name: "Sunset", color: "bg-gradient-to-r from-orange-500 to-red-500" },
  { id: "forest", name: "Forest", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "rose", name: "Rose", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
  { id: "midnight", name: "Midnight", color: "bg-gradient-to-r from-slate-600 to-indigo-600" },
  { id: "emerald", name: "Emerald", color: "bg-gradient-to-r from-teal-500 to-green-500" },
  { id: "amber", name: "Amber", color: "bg-gradient-to-r from-amber-500 to-yellow-500" },
  { id: "cyan", name: "Cyan", color: "bg-gradient-to-r from-cyan-500 to-blue-500" },
  { id: "violet", name: "Violet", color: "bg-gradient-to-r from-violet-500 to-purple-500" },
];

export function Navigation() {
  const { language, direction, translations, toggleLanguage } = useLanguage();
  const { theme, colorTheme, setColorTheme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: translations.nav.home },
    { id: "about", label: translations.nav.about },
    { id: "skills", label: translations.nav.skills },
    { id: "projects", label: translations.nav.projects },
    { id: "services", label: translations.nav.services },
    { id: "contact", label: translations.nav.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5"}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: direction === "rtl" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gradient"
          >
            {language === "ar" ? "م.مهند" : "MA"}
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
                title="Change Theme"
              >
                <Palette className="w-5 h-5" />
              </motion.button>
              
              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className={`absolute ${direction === "rtl" ? "left-0" : "right-0"} top-12 w-64 bg-card/95 backdrop-blur-xl rounded-2xl p-4 border border-border shadow-xl`}
                  >
                    <h3 className="text-sm font-bold mb-4 text-foreground">🎨 {language === "ar" ? "اختر الثيم" : "Choose Theme"}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setColorTheme(t.id as any);
                            setThemeMenuOpen(false);
                          }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105 ${
                            colorTheme === t.id 
                              ? "bg-primary/20 ring-2 ring-primary" 
                              : "bg-secondary/50 hover:bg-secondary"
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full ${t.color} flex-shrink-0`} />
                          <span className="text-sm font-medium text-foreground">{t.name}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <button
                        onClick={() => {
                          toggleTheme();
                          setThemeMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-secondary hover:bg-primary/10 hover:border-primary transition-colors text-sm font-medium"
                      >
                        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        {theme === "dark" ? (language === "ar" ? "الوضع الفاتح" : "Light Mode") : (language === "ar" ? "الوضع الداكن" : "Dark Mode")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/20 transition-colors"
            >
              {language === "ar" ? "EN" : "عربي"}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="md:hidden p-2 rounded-lg glass"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: direction === "rtl" ? "100%" : "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === "rtl" ? "100%" : "-100%" }}
          className="fixed inset-0 z-40 md:hidden glass"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: direction === "rtl" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
