"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/Card";
import { services } from "@/data/portfolio";

export function ServicesSection() {
  const { language, direction, translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{translations.services.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{translations.services.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <Card className="p-8 h-full" glow>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-500 p-4 mb-6">
                  <service.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "ar" ? service.titleAr : service.title}
                </h3>
                <p className="text-foreground/60 mb-4">
                  {language === "ar" ? service.descriptionAr : service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {feature}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
