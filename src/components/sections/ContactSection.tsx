"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Globe, Smartphone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  const { language, direction, translations } = useLanguage();
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get data with fallback to translations
  const contactData = data?.content?.contact || {
    email: "mohannad@qudsi.dev",
    phone: "+967 783737425",
    location: "Sana'a, Yemen",
    locationAr: "صنعاء، اليمن",
    whatsapp: "+967 783737425",
  };
  const socialData = data?.content?.social || {
    github: "https://github.com/mohannad-alqudsi",
    linkedin: "https://linkedin.com/in/mohannad-alqudsi",
    facebook: "https://facebook.com/mohannad.alqudsi",
    instagram: "https://instagram.com/mohannad.alqudsi",
  };

  const location = language === "ar" ? contactData.locationAr : contactData.location;

  const socialLinks = [
    { icon: Globe, href: socialData.github, label: "GitHub" },
    { icon: Globe, href: socialData.linkedin, label: "LinkedIn" },
    { icon: Globe, href: socialData.facebook, label: "Facebook" },
    { icon: Smartphone, href: socialData.instagram, label: "Instagram" },
    { icon: MessageCircle, href: `https://wa.me/${contactData.whatsapp.replace(/\D/g, "")}`, label: "WhatsApp" },
  ];

  const contactInfo = [
    { icon: Mail, label: translations.contact.emailLabel, value: contactData.email, href: `mailto:${contactData.email}` },
    { icon: Phone, label: translations.contact.phone, value: contactData.phone, href: `tel:${contactData.phone}` },
    { icon: MapPin, label: translations.contact.location, value: location, href: "#" },
  ];

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{translations.contact.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{translations.contact.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: direction === "rtl" ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">{language === "ar" ? "معلومات التواصل" : "Contact Info"}</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 p-3">
                      <info.icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: direction === "rtl" ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">{language === "ar" ? "أرسل رسالة" : "Send Message"}</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{translations.contact.name}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-colors"
                    placeholder={language === "ar" ? "أدخل اسمك" : "Enter your name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations.contact.email}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-colors"
                    placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations.contact.subject}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-colors"
                    placeholder={language === "ar" ? "أدخل الموضوع" : "Enter subject"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{translations.contact.message}</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder={language === "ar" ? "أدخل رسالتك" : "Enter your message"}
                  />
                </div>
                <Button className="w-full" rightIcon={<Send className="w-5 h-5" />}>
                  {translations.contact.send}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
