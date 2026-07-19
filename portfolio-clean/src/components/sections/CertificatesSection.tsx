"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card } from "@/components/ui/Card";

export function CertificatesSection() {
  const { language, translations } = useLanguage();
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Default certificates
  const defaultCertificates = [
    {
      id: 1,
      title: "C# and .NET Development",
      titleAr: "تطوير C# و .NET",
      issuer: "Microsoft",
      date: "2023-11-15",
      image: "",
      credentialUrl: "#"
    },
    {
      id: 2,
      title: "SQL Server Database Design",
      titleAr: "تصميم قواعد بيانات SQL Server",
      issuer: "Oracle",
      date: "2023-09-20",
      image: "",
      credentialUrl: "#"
    },
    {
      id: 3,
      title: "DevExpress UI Components",
      titleAr: "مكونات DevExpress UI",
      issuer: "DevExpress",
      date: "2023-07-10",
      image: "",
      credentialUrl: "#"
    },
    {
      id: 4,
      title: "React & Next.js Fundamentals",
      titleAr: "أساسيات React و Next.js",
      issuer: "Udemy",
      date: "2024-01-05",
      image: "",
      credentialUrl: "#"
    },
  ];

  const certificates = data?.certificates?.length ? data.certificates : defaultCertificates;

  return (
    <section id="certificates" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{language === "ar" ? "إنجازاتي" : "My Achievements"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{language === "ar" ? "شهاداتي" : "Certificates"}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden h-full" hover={false}>
                {/* Certificate Image Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTCA0MCAwIEwgMCAwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                  <Award className="w-16 h-16 text-white/80" />
                </div>

                {/* Certificate Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {language === "ar" ? (cert as any).titleAr || cert.title : cert.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {cert.issuer}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {language === "ar" ? "عرض الشهادة" : "View Certificate"}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
