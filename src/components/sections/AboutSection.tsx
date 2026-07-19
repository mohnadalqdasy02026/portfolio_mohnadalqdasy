"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Target, Eye, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { stats } from "@/data/portfolio";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-gradient">
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const { language, direction, translations } = useLanguage();
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get data with fallback to initialData
  const aboutData = data?.content?.about || {
    biography: translations.about.biography,
    biographyAr: translations.about.biography,
    mission: translations.about.missionText,
    missionAr: translations.about.missionText,
    vision: translations.about.visionText,
    visionAr: translations.about.visionText,
    goals: translations.about.goalsText,
    goalsAr: translations.about.goalsText,
  };

  const biography = language === "ar" 
    ? (aboutData.biographyAr || aboutData.biography)
    : (aboutData.biography || "");
  const mission = language === "ar" 
    ? (aboutData.missionAr || aboutData.mission)
    : (aboutData.mission || "");
  const vision = language === "ar" 
    ? (aboutData.visionAr || aboutData.vision)
    : (aboutData.vision || "");
  const goals = language === "ar" 
    ? (aboutData.goalsAr || aboutData.goals)
    : (aboutData.goals || "");

  const timeline = [
    {
      icon: GraduationCap,
      title: translations.about.mission,
      text: mission,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Eye,
      title: translations.about.vision,
      text: vision,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Target,
      title: translations.about.goals,
      text: goals,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      title: translations.stats.yearsExperience,
      text: `${stats[0].value}${stats[0].suffix} ${language === "ar" ? "سنوات" : "Years"}`,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{translations.about.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{translations.about.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-12 items-center ${direction === "rtl" ? "" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: direction === "rtl" ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-2xl" />
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-6 text-gradient">{language === "ar" ? "قصتي" : "My Story"}</h3>
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-line">
                    {translations.about.biography}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: direction === "rtl" ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Card className="p-6 h-full text-center" hover={false}>
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} p-3`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-foreground/60">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-foreground/60 mt-2">{language === "ar" ? stat.labelAr : stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
