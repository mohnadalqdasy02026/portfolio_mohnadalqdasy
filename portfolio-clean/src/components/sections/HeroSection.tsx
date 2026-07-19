"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Mail, ChevronDown, Globe, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export function HeroSection() {
  const { language, direction, translations } = useLanguage();
  const { data } = useData();
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Memoize derived values to prevent unnecessary re-renders
  const heroName = useMemo(() => {
    if (!data) return "";
    return language === "ar" 
      ? (data.content.hero.nameAr || data.content.hero.name)
      : data.content.hero.name;
  }, [data, language]);

  const heroTitles = useMemo(() => {
    if (!data) return [];
    return language === "ar" 
      ? (data.content.hero.titlesAr || data.content.hero.titles)
      : data.content.hero.titles;
  }, [data, language]);

  const heroDescription = useMemo(() => {
    if (!data) return "";
    return language === "ar" 
      ? (data.content.hero.descriptionAr || data.content.hero.description)
      : data.content.hero.description;
  }, [data, language]);

  const socialLinks = useMemo(() => {
    if (!data) return [];
    return [
      { icon: Globe, href: data.content.social.github, label: "GitHub" },
      { icon: Globe, href: data.content.social.linkedin, label: "LinkedIn" },
      { icon: Globe, href: data.content.social.facebook, label: "Facebook" },
      { icon: Smartphone, href: data.content.social.instagram, label: "Instagram" },
    ];
  }, [data]);

  useEffect(() => {
    if (!heroTitles || heroTitles.length === 0) return;
    
    const currentTitle = heroTitles[currentTitleIndex] || heroTitles[0];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedText("");

    const typeInterval = setInterval(() => {
      if (charIndex <= currentTitle.length) {
        setDisplayedText(currentTitle.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % heroTitles.length);
          }, 2000);
        }, 100);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentTitleIndex, heroTitles]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Show loading state while data loads
  if (!data) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-16 bg-muted rounded w-96 mx-auto mb-4"></div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${direction === "rtl" ? "lg:flex-row-reverse" : ""}`}>
          <motion.div
            className="flex-1 text-center lg:text-start"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary mb-4"
            >
              {translations.hero.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gradient">{heroName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="h-12 mb-6"
            >
                <span className="text-2xl md:text-3xl font-semibold text-foreground/80">
                  {displayedText}
                  <span className={`inline-block w-0.5 h-8 bg-primary ml-1 ${isTyping ? "cursor-blink" : "opacity-0"}`} />
                </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12"
            >
              <Button leftIcon={<Download className="w-5 h-5" />} onClick={() => scrollToSection("contact")}>
                {translations.hero.downloadCV}
              </Button>
              <Button variant="outline" leftIcon={<Eye className="w-5 h-5" />} onClick={() => scrollToSection("projects")}>
                {translations.hero.viewProjects}
              </Button>
              <Button variant="secondary" leftIcon={<Mail className="w-5 h-5" />} onClick={() => scrollToSection("contact")}>
                {translations.hero.contactMe}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="p-3 rounded-full glass hover:bg-primary/20 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 blur-3xl opacity-30"
              />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 glow-effect"
              >
                <div className="w-full h-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-6xl md:text-8xl font-bold text-white/90">MA</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-foreground/50">{translations.hero.scrollIndicator}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
