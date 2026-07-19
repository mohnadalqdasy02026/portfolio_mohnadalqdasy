"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Image, Filter, X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";

export function GallerySection() {
  const { language, translations } = useLanguage();
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Default gallery items
  const defaultGallery = [
    { id: 1, title: "ERP Dashboard", titleAr: "لوحة ERP", category: "desktop", url: "", featured: true, date: "2024-01-15" },
    { id: 2, title: "Hospital Interface", titleAr: "واجهة مستشفى", category: "desktop", url: "", featured: true, date: "2024-01-10" },
    { id: 3, title: "Portfolio Website", titleAr: "موقع بورتفوليو", category: "web", url: "", featured: true, date: "2024-01-05" },
    { id: 4, title: "UI Design", titleAr: "تصميم UI", category: "uiux", url: "", featured: false, date: "2024-01-01" },
    { id: 5, title: "Mobile App", titleAr: "تطبيق موبايل", category: "mobile", url: "", featured: false, date: "2023-12-20" },
    { id: 6, title: "Database Schema", titleAr: "مخطط قاعدة البيانات", category: "desktop", url: "", featured: false, date: "2023-12-15" },
  ];

  const gallery = data?.gallery?.length ? data.gallery : defaultGallery;

  const categories = [
    { id: "all", label: language === "ar" ? "الكل" : "All" },
    { id: "desktop", label: language === "ar" ? "تطبيقات سطح المكتب" : "Desktop" },
    { id: "web", label: language === "ar" ? "ويب" : "Web" },
    { id: "uiux", label: language === "ar" ? "تصميم UI/UX" : "UI/UX" },
    { id: "mobile", label: language === "ar" ? "موبايل" : "Mobile" },
  ];

  const filteredGallery = selectedCategory === "all"
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  // Gradient colors for each category
  const categoryGradients: Record<string, string> = {
    desktop: "from-blue-600 to-indigo-600",
    web: "from-green-600 to-teal-600",
    uiux: "from-purple-600 to-pink-600",
    mobile: "from-orange-600 to-red-600",
    certificates: "from-yellow-500 to-amber-500",
    default: "from-primary to-purple-600",
  };

  return (
    <section id="gallery" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{language === "ar" ? "أعمالي" : "My Work"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{language === "ar" ? "معرض الصور" : "Gallery"}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "glass hover:bg-white/20"
              }`}
            >
              {selectedCategory === cat.id && <Filter className="w-4 h-4" />}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(item.url || "")}
            >
              <Card className="overflow-hidden aspect-square" hover={false}>
                <div className={`relative w-full h-full bg-gradient-to-br ${categoryGradients[item.category] || categoryGradients.default}`}>
                  {/* Placeholder Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Image className="w-12 h-12 text-white/40 mb-2" />
                    <span className="text-white/60 text-sm font-medium">
                      {language === "ar" ? (item as any).titleAr || item.title : item.title}
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
                      {language === "ar" ? "مميز" : "Featured"}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-20">
            <Image className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === "ar" ? "لا توجد صور في هذا التصنيف" : "No images in this category"}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-4xl w-full">
            <div className={`aspect-video bg-gradient-to-br ${categoryGradients.default} rounded-xl flex items-center justify-center`}>
              <Image className="w-24 h-24 text-white/40" />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
