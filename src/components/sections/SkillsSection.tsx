"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Monitor, Globe, Database, Brain, Palette, Network } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/Card";
import { skills } from "@/data/portfolio";

const categoryIcons: Record<string, React.ElementType> = {
  programming: Code,
  desktop: Monitor,
  web: Globe,
  databases: Database,
  ai: Brain,
  design: Palette,
  networking: Network,
};

export function SkillsSection() {
  const { language, direction, translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "programming", label: translations.skills.categories.programming },
    { id: "desktop", label: translations.skills.categories.desktop },
    { id: "web", label: translations.skills.categories.web },
    { id: "databases", label: translations.skills.categories.databases },
    { id: "ai", label: translations.skills.categories.ai },
    { id: "design", label: translations.skills.categories.design },
  ];

  const filteredSkills = selectedCategory
    ? skills.filter((skill) => skill.category === selectedCategory)
    : skills;

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{translations.skills.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{translations.skills.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === null ? "bg-primary text-white shadow-lg" : "glass hover:bg-white/20"
            }`}
          >
            {language === "ar" ? "الكل" : "All"}
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat.id ? "bg-primary text-white shadow-lg" : "glass hover:bg-white/20"
              }`}
            >
              {React.createElement(categoryIcons[cat.id], { className: "w-5 h-5" })}
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <Card className="p-6 text-center h-full" glow>
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)` }}
                >
                  {skill.name.slice(0, 2)}
                </div>
                <h4 className="font-bold mb-3">{skill.name}</h4>
                <div className="relative w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
                  />
                </div>
                <span className="text-sm text-foreground/60 mt-2 block">{skill.level}%</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
