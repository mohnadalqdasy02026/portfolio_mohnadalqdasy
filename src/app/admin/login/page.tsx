"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAdminUser } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const t = {
    title: language === "ar" ? "لوحة التحكم" : "Admin Dashboard",
    subtitle: language === "ar" ? "سجل دخول لإدارة موقعك" : "Sign in to manage your portfolio",
    emailLabel: language === "ar" ? "البريد الإلكتروني" : "Email",
    passwordLabel: language === "ar" ? "كلمة المرور" : "Password",
    emailPlaceholder: language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email",
    passwordPlaceholder: language === "ar" ? "أدخل كلمة المرور" : "Enter your password",
    signIn: language === "ar" ? "تسجيل الدخول" : "Sign In",
    signing: language === "ar" ? "جاري الدخول..." : "Signing in...",
    backToPortfolio: language === "ar" ? "← العودة للموقع" : "← Back to Portfolio",
    invalidCreds: language === "ar" ? "بيانات الدخول غير صحيحة. حاول مرة أخرى." : "Invalid credentials. Please try again.",
    noUsers: language === "ar" ? "لا يوجد مستخدمون. أضف مستخدم من Supabase." : "No users found. Add a user from Supabase.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Try to get user from Supabase
      const user = await getAdminUser(email);
      
      if (user) {
        // Check password (simple comparison - in production use hashed passwords)
        if (user.password_hash === password) {
          localStorage.setItem("adminAuth", "true");
          localStorage.setItem("adminEmail", email);
          localStorage.setItem("adminName", user.name || email);
          router.push("/admin/dashboard");
        } else {
          setError(t.invalidCreds);
        }
      } else {
        setError(t.invalidCreds);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(t.invalidCreds);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center glow-effect">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">{t.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                  placeholder={t.emailPlaceholder} 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">{t.passwordLabel}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                  placeholder={t.passwordPlaceholder} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl gradient-bg text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t.signing}
                </span>
              ) : (
                t.signIn
              )}
            </motion.button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t.backToPortfolio}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
