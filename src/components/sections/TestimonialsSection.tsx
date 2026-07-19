"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";

export function TestimonialsSection() {
  const { language } = useLanguage();
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
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <span className="text-primary font-medium mb-4 block text-sm sm:text-base">{translations?.testimonials?.subtitle || "Client Feedback"}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{translations?.testimonials?.title || "Testimonials"}</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="p-6 sm:p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 opacity-10">
                <Quote className="w-16 h-16 sm:w-24 sm:h-24 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-6 sm:mb-8 leading-relaxed text-foreground/80 italic px-2">
                  "{language === "ar" ? testimonials[activeIndex].textAr || testimonials[activeIndex].text : testimonials[activeIndex].text}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-3 sm:mb-4">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold">{testimonials[activeIndex].name}</h4>
                  <p className="text-foreground/60 text-sm sm:text-base">{testimonials[activeIndex].company}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
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
