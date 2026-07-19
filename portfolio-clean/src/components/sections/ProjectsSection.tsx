"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Star, Globe, FolderCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Gradient backgrounds for projects based on category
const projectGradients: Record<string, string> = {
  desktop: "from-blue-600 to-purple-600",
  web: "from-green-600 to-cyan-600",
  ai: "from-orange-500 to-pink-500",
  mobile: "from-red-500 to-yellow-500",
  default: "from-primary to-purple-600"
};

export function ProjectsSection() {
  const { language, translations } = useLanguage();
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const categories = [
    { id: "all", label: translations?.projects?.filterAll || "All" },
    { id: "desktop", label: translations?.projects?.filterDesktop || "Desktop" },
    { id: "web", label: translations?.projects?.filterWeb || "Web" },
    { id: "ai", label: translations?.projects?.filterAI || "AI" },
  ];

  // Get projects with fallback
  const projects = data?.projects || [];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{translations.projects.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{translations.projects.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === cat.id ? "bg-primary text-white shadow-lg" : "glass hover:bg-white/20"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {language === "ar" ? "لا توجد مشاريع بعد. أضف مشاريع من لوحة التحكم!" : "No projects yet. Add some from the admin dashboard!"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden h-full" glow>
                  <div className={`relative h-48 bg-gradient-to-br ${projectGradients[project.category] || projectGradients.default}`}>
                    {!imageErrors[project.id] && project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => setImageErrors(prev => ({ ...prev, [project.id]: true }))}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 to-purple-500/30">
                        <FolderCode className="w-16 h-16 text-white/60 mb-2" />
                        <span className="text-2xl font-bold text-white/80">{project.title.charAt(0)}</span>
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {translations.projects.featured}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {language === "ar" ? (project as any).titleAr || project.title : project.title}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                      {language === "ar" ? (project as any).descriptionAr || project.description : project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs rounded-full glass">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full glass">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/20 transition-colors text-sm"
                      >
                        <Globe className="w-4 h-4" />
                        {language === "ar" ? "التفاصيل" : "Details"}
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
