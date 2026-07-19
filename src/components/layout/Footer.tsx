"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { personalInfo } from "@/data/portfolio";

export function Footer() {
  const { language, direction, translations } = useLanguage();

  const socialLinks = [
    { icon: Globe, href: personalInfo.social.github, label: "GitHub" },
    { icon: Globe, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Globe, href: personalInfo.social.facebook, label: "Facebook" },
    { icon: Smartphone, href: personalInfo.social.instagram, label: "Instagram" },
  ];

  const quickLinks = [
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
    }
  };

  return (
    <footer className="relative py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-3xl font-bold text-gradient mb-4">م.مهند</div>
            <p className="text-foreground/60">
              {language === "ar" ? "مهندس برمجيات شغوف يبني حلولاً تقنية مبتكرة" : "Passionate software engineer building innovative tech solutions"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold mb-4">{translations.footer.quickLinks}</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button key={link.id} onClick={() => scrollToSection(link.id)} className="block text-foreground/60 hover:text-primary transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold mb-4">{translations.footer.followMe}</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 text-center text-foreground/60"
        >
          <p>{new Date().getFullYear()} {personalInfo.name}. {translations.footer.rights}.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            {translations.footer.madeWith} <Heart className="w-4 h-4 text-red-500 animate-pulse" /> {language === "ar" ? "في اليمن" : "in Yemen"}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
