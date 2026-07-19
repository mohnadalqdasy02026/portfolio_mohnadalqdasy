"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";

export function TestimonialsSection() {
  const { language, translations } = useLanguage();
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  // Default testimonials if none in data
  const defaultTestimonials = [
    {
      id: 1,
      name: "Ahmed Mohammed",
      company: "Tech Solutions",
      rating: 5,
      text: "Excellent work on our ERP system. Very professional and delivered on time.",
      textAr: "عمل ممتاز في نظام ERP. احترافي جداً وسلم في الوقت المحدد.",
      avatar: "",
    },
    {
      id: 2,
      name: "Sara Al-Mahdi",
      company: "Hospital Group",
      rating: 5,
      text: "The hospital management system exceeded our expectations. Highly recommended.",
      textAr: "نظام إدارة المستشفى تجاوز توقعاتنا. أنصح به بشدة.",
      avatar: "",
    },
  ];

  const testimonials = data?.testimonials?.length ? data.testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{translations?.testimonials?.subtitle || "Client Feedback"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{translations?.testimonials?.title || "Testimonials"}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-4 left-4 opacity-10">
                <Quote className="w-24 h-24 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-center mb-8 leading-relaxed text-foreground/80 italic">
                  "{language === "ar" ? testimonials[activeIndex].textAr || testimonials[activeIndex].text : testimonials[activeIndex].text}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold">{testimonials[activeIndex].name}</h4>
                  <p className="text-foreground/60">{testimonials[activeIndex].company}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? "bg-primary scale-125" : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
