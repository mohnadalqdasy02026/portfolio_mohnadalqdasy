"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Palette, Globe, Search, Moon, Sun, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const colorThemes = [
  { id: "aurora", name: "Aurora", color: "from-indigo-500 to-purple-500" },
  { id: "ocean", name: "Ocean", color: "from-blue-500 to-cyan-500" },
  { id: "sunset", name: "Sunset", color: "from-orange-500 to-red-500" },
  { id: "forest", name: "Forest", color: "from-green-500 to-emerald-500" },
  { id: "rose", name: "Rose", color: "from-pink-500 to-rose-500" },
  { id: "midnight", name: "Midnight", color: "from-slate-700 to-purple-500" },
  { id: "emerald", name: "Emerald", color: "from-emerald-500 to-teal-500" },
  { id: "amber", name: "Amber", color: "from-amber-500 to-orange-500" },
  { id: "cyan", name: "Cyan", color: "from-cyan-500 to-blue-500" },
  { id: "violet", name: "Violet", color: "from-violet-500 to-purple-500" },
];

export default function SettingsPage() {
  const { language } = useLanguage();
  const { colorTheme, setColorTheme, theme, toggleTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Password validation
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return language === "ar" ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return language === "ar" ? "يجب أن تحتوي على حرف كبير واحد على الأقل" : "Must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return language === "ar" ? "يجب أن تحتوي على حرف صغير واحد على الأقل" : "Must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return language === "ar" ? "يجب أن تحتوي على رقم واحد على الأقل" : "Must contain at least one number";
    }
    return "";
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    // Trim passwords to remove whitespace
    const trimmedCurrent = currentPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    // Validate current password
    if (!trimmedCurrent) {
      setPasswordError(language === "ar" ? "أدخل كلمة المرور الحالية" : "Enter current password");
      return;
    }

    // Validate new password
    const validationError = validatePassword(trimmedNew);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    // Check password match
    if (trimmedNew !== trimmedConfirm) {
      setPasswordError(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match");
      return;
    }

    // Check if new password is same as current
    if (trimmedCurrent === trimmedNew) {
      setPasswordError(language === "ar" ? "كلمة المرور الجديدة يجب أن تكون مختلفة" : "New password must be different");
      return;
    }

    setIsChangingPassword(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsChangingPassword(false);
    setPasswordSuccess(language === "ar" ? "تم تغيير كلمة المرور بنجاح!" : "Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert(language === "ar" ? "تم حفظ الإعدادات!" : "Settings saved!");
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-foreground mb-2">{language === "ar" ? "الإعدادات" : "Settings"}</h1>
        <p className="text-muted-foreground">{language === "ar" ? "خصص مظهر موقعك وأمان حسابك" : "Customize your portfolio and account security"}</p>
      </motion.div>

      {/* Password Change Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-8 border-2 border-primary/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 p-2.5">
            <Lock className="w-full h-full text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{language === "ar" ? "تغيير كلمة المرور" : "Change Password"}</h2>
            <p className="text-sm text-muted-foreground">{language === "ar" ? "تحديث كلمة مرور حساب المسؤول" : "Update your admin account password"}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">
              {language === "ar" ? "كلمة المرور الحالية" : "Current Password"}
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none"
                placeholder={language === "ar" ? "أدخل كلمة المرور الحالية" : "Enter current password"}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">
              {language === "ar" ? "كلمة المرور الجديدة" : "New Password"}
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none"
                placeholder={language === "ar" ? "أدخل كلمة المرور الجديدة" : "Enter new password"}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {language === "ar" ? "8 أحرف على الأقل، حرف كبير وصغير ورقم" : "At least 8 chars, uppercase, lowercase, and number"}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">
              {language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none"
                placeholder={language === "ar" ? "أعد إدخال كلمة المرور الجديدة" : "Re-enter new password"}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error/Success Messages */}
          {passwordError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{passwordError}</span>
            </div>
          )}
          
          {passwordSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{passwordSuccess}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              onClick={handleChangePassword}
              isLoading={isChangingPassword}
              leftIcon={<Lock className="w-4 h-4" />}
              variant={passwordSuccess ? "outline" : "primary"}
              className={passwordSuccess ? "border-green-500 text-green-400" : ""}
            >
              {language === "ar" ? "تغيير كلمة المرور" : "Change Password"}
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-bg p-2">
              <Palette className="w-full h-full text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{language === "ar" ? "إعدادات المظهر" : "Theme Settings"}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-foreground/80 mb-4 text-sm font-medium">{language === "ar" ? "لون المظهر" : "Color Theme"}</label>
              <div className="grid grid-cols-5 gap-3">
                {colorThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setColorTheme(t.id as any)}
                    className={`w-full aspect-square rounded-xl bg-gradient-to-br ${t.color} transition-all ${
                      colorTheme === t.id ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    title={t.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-foreground/80 mb-4 text-sm font-medium">{language === "ar" ? "الوضع" : "Mode"}</label>
              <div className="flex gap-4">
                <button
                  onClick={toggleTheme}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl transition-all ${
                    theme === "dark" ? "bg-primary/20 border-2 border-primary text-primary" : "bg-secondary border border-border text-muted-foreground"
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <span>{language === "ar" ? "داكن" : "Dark"}</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl transition-all ${
                    theme === "light" ? "bg-primary/20 border-2 border-primary text-primary" : "bg-secondary border border-border text-muted-foreground"
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <span>{language === "ar" ? "فاتح" : "Light"}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2">
              <Search className="w-full h-full text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{language === "ar" ? "إعدادات SEO" : "SEO Settings"}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">{language === "ar" ? "عنوان الموقع" : "Site Title"}</label>
              <input type="text" defaultValue={language === "ar" ? "مهند القدسي | مهندس برمجيات" : "Mohannad Al-Qudsi | Software Engineer"} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">{language === "ar" ? "وصف Meta" : "Meta Description"}</label>
              <textarea rows={3} defaultValue="Professional portfolio of Mohannad Mohammed Al-Qudsi - Software Engineer specializing in Desktop Application Development, ERP Systems, and Full Stack Development." className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
            </div>
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">{language === "ar" ? "الكلمات المفتاحية" : "Keywords"}</label>
              <input type="text" defaultValue="Software Engineer, Full Stack Developer, C#, .NET, DevExpress, SQL Server, Portfolio, Yemen" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-2">
              <Globe className="w-full h-full text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{language === "ar" ? "روابط التواصل" : "Social Links"}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">GitHub URL</label>
              <input type="url" defaultValue="https://github.com/mohannad-alqudsi" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">LinkedIn URL</label>
              <input type="url" defaultValue="https://linkedin.com/in/mohannad-alqudsi" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">Facebook URL</label>
              <input type="url" defaultValue="https://facebook.com/mohannad.alqudsi" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-foreground/80 mb-2 text-sm font-medium">Instagram URL</label>
              <input type="url" defaultValue="https://instagram.com/mohannad.alqudsi" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <div className="flex justify-end">
          <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-5 h-5" />}>
            {language === "ar" ? "حفظ كل الإعدادات" : "Save All Settings"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
