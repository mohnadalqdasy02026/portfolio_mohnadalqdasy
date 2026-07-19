"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Image, FileText, Settings, LogOut, Menu, X, ChevronLeft, Globe, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { language, toggleLanguage, translations } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const t = translations.admin;

  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: t.dashboard, href: "/admin/dashboard" },
    { id: "gallery", icon: Image, label: t.gallery, href: "/admin/gallery" },
    { id: "content", icon: FileText, label: t.content, href: "/admin/content" },
    { id: "settings", icon: Settings, label: t.settings, href: "/admin/settings" },
  ];

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }
    
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isRTL = language === "ar";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Toggle Button (shown when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 z-50 p-3 rounded-lg gradient-bg shadow-lg hover:opacity-90 transition-opacity"
          style={{ [isRTL ? "right" : "left"]: "1rem" }}
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : (isRTL ? 320 : -320),
          opacity: sidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed lg:relative z-50 h-screen admin-sidebar w-80 ${sidebarOpen ? "lg:w-80" : "w-80 lg:w-0 lg:overflow-hidden"}`}
        style={{ [isRTL ? "right" : "left"]: 0 }}
      >
        <div className="flex flex-col h-full w-80">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h2 className="font-bold text-foreground">{language === "ar" ? "لوحة التحكم" : "Admin Panel"}</h2>
                  <p className="text-xs text-muted-foreground">{language === "ar" ? "مدير الموقع" : "Portfolio Manager"}</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-secondary">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`admin-nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  pathname === item.href ? "active bg-primary/10 text-primary" : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-border space-y-2">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass hover:bg-primary/10 hover:text-primary transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              {language === "ar" ? "English" : "العربية"}
            </button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
              leftIcon={<LogOut className="w-5 h-5" />}
              onClick={handleLogout}
            >
              {t.logout}
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? "lg:ml-0" : ""}`}>
        <header className="h-16 glass border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a
              href="/"
              className="gradient-bg px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
              {language === "ar" ? "العودة للموقع" : "Back to Site"}
            </a>
          </div>
          <span className="text-sm text-muted-foreground hidden sm:block">
            {language === "ar" ? "أهلاً، المدير" : "Welcome, Admin"}
          </span>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

// Floating Admin Button Component - Shows on main site
function FloatingAdminButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    setIsAuthenticated(!!auth);
  }, []);

  if (!isAuthenticated) return null;

  const adminLinks = [
    { href: "/admin/dashboard", label: language === "ar" ? "لوحة التحكم" : "Dashboard", icon: LayoutDashboard },
    { href: "/admin/gallery", label: language === "ar" ? "المعرض" : "Gallery", icon: Image },
    { href: "/admin/content", label: language === "ar" ? "المحتوى" : "Content", icon: FileText },
    { href: "/admin/settings", label: language === "ar" ? "الإعدادات" : "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-bg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        title={language === "ar" ? "لوحة التحكم" : "Admin Panel"}
      >
        <Settings2 className="w-6 h-6 text-white" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 card p-2 min-w-[200px]"
          >
            <div className="p-3 border-b border-border mb-2">
              <p className="font-bold text-foreground text-sm">{language === "ar" ? "لوحة التحكم" : "Admin Panel"}</p>
              <p className="text-xs text-muted-foreground">{language === "ar" ? "إدارة الموقع" : "Manage Site"}</p>
            </div>
            <div className="space-y-1">
              {adminLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
            </div>
            <div className="border-t border-border mt-2 pt-2">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">{language === "ar" ? "العودة للموقع" : "Back to Site"}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function AdminShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  
  return (
    <>
      {children}
      {!isAdminPage && <FloatingAdminButton />}
    </>
  );
}
