"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard as DashboardIcon, Image, FileText, TrendingUp, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminDashboard() {
  const { language } = useLanguage();

  const stats = [
    { 
      title: language === "ar" ? "إجمالي الزيارات" : "Total Views", 
      value: "12,345", 
      icon: TrendingUp, 
      change: "+12%", 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      title: language === "ar" ? "عناصر المعرض" : "Gallery Items", 
      value: "48", 
      icon: Image, 
      change: "+5", 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      title: language === "ar" ? "المقالات" : "Blog Posts", 
      value: "12", 
      icon: FileText, 
      change: "+2", 
      color: "from-purple-500 to-pink-500" 
    },
    { 
      title: language === "ar" ? "متوسط الجلسة" : "Avg. Session", 
      value: "4m 32s", 
      icon: Clock, 
      change: "+8%", 
      color: "from-orange-500 to-red-500" 
    },
  ];

  const recentActivity = [
    { id: 1, action: language === "ar" ? "تم إضافة مشروع جديد" : "New project added", item: language === "ar" ? "نظام إدارة مواد البناء" : "Building Materials ERP", time: language === "ar" ? "منذ ساعتين" : "2 hours ago" },
    { id: 2, action: language === "ar" ? "تم تحديث المعرض" : "Gallery updated", item: language === "ar" ? "5 صور جديدة" : "5 new images", time: language === "ar" ? "منذ 5 ساعات" : "5 hours ago" },
    { id: 3, action: language === "ar" ? "تم نشر مقال" : "Blog published", item: language === "ar" ? "الذكاء الاصطناعي في المؤسسات" : "AI in Enterprise", time: language === "ar" ? "منذ يوم" : "1 day ago" },
    { id: 4, action: language === "ar" ? "تم تحديث الإعدادات" : "Settings updated", item: language === "ar" ? "ألوان المظهر" : "Theme colors", time: language === "ar" ? "منذ يومين" : "2 days ago" },
  ];

  const quickActions = [
    { label: language === "ar" ? "إضافة مشروع" : "Add Project", href: "/admin/content", color: "from-purple-500 to-pink-500" },
    { label: language === "ar" ? "رفع صور" : "Upload Images", href: "/admin/gallery", color: "from-blue-500 to-cyan-500" },
    { label: language === "ar" ? "كتابة مقال" : "Write Blog", href: "/admin/content", color: "from-green-500 to-emerald-500" },
    { label: language === "ar" ? "الإعدادات" : "Edit Settings", href: "/admin/settings", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-foreground mb-2">{language === "ar" ? "لوحة التحكم" : "Dashboard"}</h1>
        <p className="text-muted-foreground">{language === "ar" ? "أهلاً بعودتك! إليك نظرة عامة على موقعك." : "Welcome back! Here's your portfolio overview."}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3`}>
                <stat.icon className="w-full h-full text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
            <p className="text-muted-foreground text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-6">{language === "ar" ? "النشاط الأخير" : "Recent Activity"}</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <DashboardIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{activity.action}</p>
                  <p className="text-muted-foreground text-sm">{activity.item}</p>
                </div>
                <span className="text-muted-foreground text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-6">{language === "ar" ? "إجراءات سريعة" : "Quick Actions"}</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`p-6 rounded-xl bg-gradient-to-br ${action.color} text-white font-medium text-center hover:opacity-90 transition-opacity`}
              >
                {action.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
