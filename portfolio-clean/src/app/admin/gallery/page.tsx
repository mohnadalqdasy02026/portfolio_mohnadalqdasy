"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Search, Grid, List, Trash2, Star, Image as ImageIcon, Plus, X, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";

export default function GalleryPage() {
  const { language } = useLanguage();
  const { data, addGalleryImage, deleteGalleryImage, updateGalleryImage } = useData();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDragging, setIsDragging] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImage, setNewImage] = useState({ 
    title: "", 
    category: "desktop", 
    url: "" 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCategoryRef = useRef("desktop");

  // Show loading state while data loads
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">
          {language === "ar" ? "جاري تحميل البيانات..." : "Loading data..."}
        </div>
      </div>
    );
  }

  const categories = [
    { id: "all", name: language === "ar" ? "الكل" : "All", icon: "📁" },
    { id: "desktop", name: language === "ar" ? "تطبيقات سطح المكتب" : "Desktop Apps", icon: "🖥️" },
    { id: "web", name: language === "ar" ? "تطوير الويب" : "Web Dev", icon: "🌐" },
    { id: "uiux", name: "UI/UX", icon: "🎨" },
    { id: "ai", name: language === "ar" ? "ذكاء اصطناعي" : "AI", icon: "🤖" },
    { id: "certificates", name: language === "ar" ? "الشهادات" : "Certificates", icon: "📜" },
    { id: "events", name: language === "ar" ? "الفعاليات" : "Events", icon: "🎪" },
    { id: "personal", name: language === "ar" ? "شخصي" : "Personal", icon: "👤" },
  ];

  const filteredImages = data.gallery.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files, dragCategoryRef.current);
  };

  const handleFiles = (files: File[], category: string = "desktop") => {
    files.forEach((file) => {
      addGalleryImage({
        title: file.name.replace(/\.[^/.]+$/, ""),
        category: category,
        url: URL.createObjectURL(file),
        featured: false,
        date: new Date().toISOString().split("T")[0],
      });
    });
  };

  const handleAddImage = () => {
    if (!newImage.title || !newImage.url) {
      alert(language === "ar" ? "املأ كل الحقول" : "Please fill all fields");
      return;
    }
    addGalleryImage({
      title: newImage.title,
      category: newImage.category,
      url: newImage.url,
      featured: false,
      date: new Date().toISOString().split("T")[0],
    });
    setNewImage({ title: "", category: "desktop", url: "" });
    setShowAddModal(false);
    alert(language === "ar" ? "تمت إضافة الصورة بنجاح!" : "Image added successfully!");
  };

  const handleUrlAdd = (category: string = "desktop") => {
    const url = prompt(language === "ar" ? "أدخل رابط الصورة:" : "Enter image URL:");
    const title = prompt(language === "ar" ? "أدخل عنوان الصورة:" : "Enter image title:");
    if (url && title) {
      addGalleryImage({
        title,
        category: category,
        url,
        featured: false,
        date: new Date().toISOString().split("T")[0],
      });
      alert(language === "ar" ? "تمت إضافة الصورة بنجاح!" : "Image added successfully!");
    }
  };

  const handleFileUploadWithCategory = (category: string) => {
    dragCategoryRef.current = category;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{language === "ar" ? "إدارة المعرض" : "Gallery Management"}</h1>
          <p className="text-muted-foreground">{language === "ar" ? "ارفع وأدر صور موقعك" : "Upload and manage your portfolio images"}</p>
        </div>
        
        {/* Add Image Button */}
        <Button onClick={() => setShowAddModal(true)} leftIcon={<Plus className="w-5 h-5" />} className="bg-gradient-to-r from-primary to-purple-500">
          {language === "ar" ? "إضافة صورة جديدة" : "Add New Image"}
        </Button>
      </motion.div>

      {/* Add Image Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card p-8 max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {language === "ar" ? "إضافة صورة جديدة" : "Add New Image"}
                </h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-secondary rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-foreground/80 mb-2 text-sm font-medium">
                    {language === "ar" ? "اختر التصنيف" : "Select Category"} *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {categories.filter(c => c.id !== "all").map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setNewImage({ ...newImage, category: cat.id })}
                        className={`p-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                          newImage.category === cat.id 
                            ? "bg-primary/20 border-2 border-primary text-primary" 
                            : "bg-secondary/50 border-2 border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="text-xs">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-foreground/80 mb-2 text-sm font-medium">
                    {language === "ar" ? "عنوان الصورة" : "Image Title"} *
                  </label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder={language === "ar" ? "مثال: لوحة ERP" : "Example: ERP Dashboard"}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-foreground/80 mb-2 text-sm font-medium">
                    {language === "ar" ? "رابط الصورة" : "Image URL"} *
                  </label>
                  <input
                    type="url"
                    value={newImage.url}
                    onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                    placeholder={language === "ar" ? "https://example.com/image.jpg" : "https://example.com/image.jpg"}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Image Preview */}
                {newImage.url && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">{language === "ar" ? "معاينة:" : "Preview:"}</p>
                    <img 
                      src={newImage.url} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-xl"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={handleAddImage} 
                    className="flex-1 bg-gradient-to-r from-primary to-purple-500"
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    {language === "ar" ? "إضافة الصورة" : "Add Image"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddModal(false)}
                  >
                    {language === "ar" ? "إلغاء" : "Cancel"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-primary" />
          {language === "ar" ? "اختر التصنيف ثم ارفع الصور" : "Select category then upload images"}
        </h3>
        
        {/* Category Selection for Upload */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
          {categories.filter(c => c.id !== "all").map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFileUploadWithCategory(cat.id)}
              className="p-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 bg-secondary/30 hover:bg-secondary/60 border-2 border-transparent hover:border-primary/50"
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-xs text-center">{cat.name}</span>
            </button>
          ))}
        </div>
        
        {/* Hidden File Input */}
        <input 
          ref={fileInputRef} 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => handleFiles(Array.from(e.target.files || []), dragCategoryRef.current)} 
        />
        
        {/* Drag and Drop */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
          }`}
          onClick={() => handleFileUploadWithCategory(dragCategoryRef.current)}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {language === "ar" ? "اسحب وأفلت الصور هنا" : "Drag and drop images here"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {language === "ar" 
              ? `التصنيف الحالي: ${categories.find(c => c.id === dragCategoryRef.current)?.name}`
              : `Current category: ${categories.find(c => c.id === dragCategoryRef.current)?.name}`
            }
          </p>
        </div>
      </motion.div>

      {/* Search and View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={language === "ar" ? "ابحث في الصور..." : "Search images..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex gap-2 p-1 rounded-xl bg-secondary/50">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}>
            <Grid className="w-5 h-5" />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}>
            <List className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              selectedCategory === cat.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Images Grid/List */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">{language === "ar" ? "لا توجد صور. ارفع بعض الصور للبدء!" : "No images found. Upload some images to get started!"}</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden card"
                >
                  <img src={image.url} alt={image.title} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => updateGalleryImage(image.id, { featured: !image.featured })} className={`p-2 rounded-full ${image.featured ? "bg-yellow-500 text-black" : "bg-white/20 text-white"} hover:scale-110 transition-transform`}>
                      <Star className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteGalleryImage(image.id)} className="p-2 rounded-full bg-red-500/80 text-white hover:scale-110 transition-transform">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium truncate">{image.title}</p>
                    <p className="text-white/60 text-sm flex items-center gap-1">
                      <span>{categories.find(c => c.id === image.category)?.icon}</span>
                      <span>{categories.find(c => c.id === image.category)?.name}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl card"
                >
                  <img src={image.url} alt={image.title} className="w-20 h-20 rounded-xl object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="flex-1">
                    <h4 className="text-foreground font-medium">{image.title}</h4>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <span>{categories.find(c => c.id === image.category)?.icon}</span>
                      <span>{categories.find(c => c.id === image.category)?.name}</span>
                      <span>•</span>
                      <span>{image.date}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateGalleryImage(image.id, { featured: !image.featured })} className={`p-2 rounded-lg ${image.featured ? "bg-yellow-500 text-black" : "bg-secondary text-muted-foreground"}`}>
                      <Star className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteGalleryImage(image.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
