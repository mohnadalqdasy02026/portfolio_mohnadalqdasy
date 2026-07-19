"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Image, FileText, Settings, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

const sidebarItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { id: "gallery", icon: Image, label: "Gallery", href: "/admin/gallery" },
  { id: "content", icon: FileText, label: "Content", href: "/admin/content" },
  { id: "settings", icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

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

  return (
    <div className="min-h-screen bg-background flex">
      <motion.aside 
        initial={{ x: -280 }} 
        animate={{ x: sidebarOpen ? 0 : -280 }} 
        className="fixed lg:relative z-50 h-screen admin-sidebar w-72"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h2 className="font-bold text-foreground">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">Portfolio Manager</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <a 
                key={item.id} 
                href={item.href} 
                className={`admin-nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  pathname === item.href ? "active" : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10" 
              leftIcon={<LogOut className="w-5 h-5" />} 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back to Portfolio
            </a>
          </div>
          <span className="text-sm text-muted-foreground">Welcome, Admin</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
