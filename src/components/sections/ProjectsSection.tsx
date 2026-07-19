"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Star, Globe, FolderCode, Laptop, Code, Brain, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Icons map
const iconMap: Record<string, any> = {
  desktop: Laptop,
  web: Globe,
  ai: Brain,
  mobile: Smartphone,
  default: Code,
};

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

  const categories = [
    { id: "all", label: translations?.projects?.filterAll || "All", icon: FolderCode },
    { id: "desktop", label: translations?.projects?.filterDesktop || "Desktop", icon: Laptop },
    { id: "web", label: translations?.projects?.filterWeb || "Web", icon: Globe },
    { id: "ai", label: translations?.projects?.filterAI || "AI", icon: Brain },
  ];

  // Get projects with fallback
  const projects = data?.projects || [];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary font-medium mb-4 block text-sm sm:text-base">{translations.projects.subtitle}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{translations.projects.title}</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-8 sm:mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-sm sm:text-base ${
                selectedCategory === cat.id 
                  ? "bg-primary text-white shadow-lg" 
                  : "glass hover:bg-white/20"
              }`}
            >
              <cat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <p className="text-muted-foreground text-base sm:text-lg px-4">
              {language === "ar" ? "لا توجد مشاريع بعد. أضف مشاريع من لوحة التحكم!" : "No projects yet. Add some from the admin dashboard!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => {
              const IconComponent = iconMap[project.category] || iconMap.default;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full" glow>
                    {/* Project Image/Gradient */}
                    <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${projectGradients[project.category] || projectGradients.default}`}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/20 to-black/40">
                        <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 text-white/60 mb-2" />
                        <span className="text-2xl sm:text-3xl font-bold text-white/80">{project.title.charAt(0)}</span>
                      </div>
                      {project.featured && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {translations.projects.featured}
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-1">
                        {language === "ar" ? (project as any).titleAr || project.title : project.title}
                      </h3>
                      <p className="text-foreground/60 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {language === "ar" ? (project as any).descriptionAr || project.description : project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
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

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" className="text-xs sm:text-sm flex-1" leftIcon={<Globe className="w-3 h-3 sm:w-4 sm:h-4" />}>
                          {language === "ar" ? "التفاصيل" : "Details"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
