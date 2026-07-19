"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Project {
  id: number;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  category: string;
  technologies: string[];
  image: string;
  featured: boolean;
  date: string;
}

export interface Certificate {
  id: number;
  title: string;
  titleAr?: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  titleAr?: string;
  category: string;
  url: string;
  featured: boolean;
  date: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  rating: number;
  text: string;
  textAr?: string;
  avatar: string;
}

export interface SiteContent {
  hero: {
    name: string;
    nameAr?: string;
    titles: string[];
    titlesAr?: string[];
    description: string;
    descriptionAr?: string;
  };
  about: {
    biography: string;
    biographyAr?: string;
    mission: string;
    missionAr?: string;
    vision: string;
    visionAr?: string;
    goals: string;
    goalsAr?: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    locationAr?: string;
    whatsapp: string;
  };
  social: {
    github: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
}

export interface DataState {
  projects: Project[];
  certificates: Certificate[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  content: SiteContent;
}

// This is only used before data loads from server - using gradient backgrounds instead of external images
const initialData: DataState = {
  projects: [
    {
      id: 1,
      title: "Building Materials ERP",
      titleAr: "نظام إدارة مواد البناء",
      description: "Comprehensive ERP system for building materials management with inventory, sales, and accounting modules.",
      descriptionAr: "نظام ERP شامل لإدارة مواد البناء مع وحدات المخزون والمبيعات والمحاسبة.",
      category: "desktop",
      technologies: ["C#", ".NET", "DevExpress", "SQL Server"],
      image: "",
      featured: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Hospital Management System",
      titleAr: "نظام إدارة المستشفى",
      description: "Complete hospital management with patients, appointments, billing, and medical records.",
      descriptionAr: "إدارة مستشفى متكاملة مع المرضى والمواعيد والفواتير والسجلات الطبية.",
      category: "desktop",
      technologies: ["C#", "WinForms", "SQL Server", "DevExpress"],
      image: "",
      featured: true,
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Pharmacy Management",
      titleAr: "نظام إدارة الصيدلية",
      description: "Pharmacy inventory and sales management with expiry tracking and reports.",
      descriptionAr: "إدارة مخزون ومبيعات الصيدلية مع تتبع انتهاء الصلاحية والتقارير.",
      category: "desktop",
      technologies: ["C#", "DevExpress", "SQL Server"],
      image: "",
      featured: false,
      date: "2023-12-20"
    },
    {
      id: 4,
      title: "Portfolio Website",
      titleAr: "موقع البورتفوليو",
      description: "Modern responsive portfolio with admin dashboard and bilingual support.",
      descriptionAr: "موقع بورتفوليو عصري متجاوب مع لوحة تحكم ودعم ثنائي اللغة.",
      category: "web",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind"],
      image: "",
      featured: true,
      date: "2024-01-05"
    }
  ],
  certificates: [
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
    }
  ],
  gallery: [
    { id: 1, title: "ERP Dashboard", titleAr: "لوحة ERP", category: "desktop", url: "", featured: true, date: "2024-01-15" },
    { id: 2, title: "Hospital Interface", titleAr: "واجهة مستشفى", category: "desktop", url: "", featured: true, date: "2024-01-10" },
    { id: 3, title: "Portfolio Website", titleAr: "موقع بورتفوليو", category: "web", url: "", featured: true, date: "2024-01-05" },
    { id: 4, title: "UI Design", titleAr: "تصميم UI", category: "uiux", url: "", featured: false, date: "2024-01-01" },
    { id: 5, title: "Certificate 2024", titleAr: "شهادة 2024", category: "certificates", url: "", featured: false, date: "2023-12-20" }
  ],
  testimonials: [
    {
      id: 1,
      name: "Ahmed Mohammed",
      company: "Tech Solutions",
      rating: 5,
      text: "Excellent work on our ERP system. Very professional and delivered on time.",
      textAr: "عمل ممتاز في نظام ERP. احترافي جداً وسلم في الوقت المحدد.",
      avatar: ""
    },
    {
      id: 2,
      name: "Sara Al-Mahdi",
      company: "Hospital Group",
      rating: 5,
      text: "The hospital management system exceeded our expectations. Highly recommended.",
      textAr: "نظام إدارة المستشفى تجاوز توقعاتنا. أنصح به بشدة.",
      avatar: ""
    }
  ],
  content: {
    hero: {
      name: "Mohannad Mohammed Al-Qudsi",
      nameAr: "مهند محمد القدسي",
      titles: ["Software Engineer", "Desktop App Developer", "Full Stack Developer", "UI/UX Designer", "Database Specialist"],
      titlesAr: ["مهندس برمجيات", "مطور تطبيقات سطح المكتب", "مطور Full Stack", "مصمم UI/UX", "متخصص في قواعد البيانات"],
      description: "Passionate about building intelligent software that combines performance, simplicity, elegance, and innovation.",
      descriptionAr: "شغوف ببناء برامج ذكية تجمع بين الأداء والبساطة والأناقة والابتكار."
    },
    about: {
      biography: "I am a passionate software engineer specializing in desktop application development using C#, DevExpress, and SQL Server.",
      biographyAr: "أنا مهندس برمجيات شغوف متخصص في تطوير تطبيقات سطح المكتب باستخدام C# و DevExpress و SQL Server.",
      mission: "Building intelligent software that combines high performance and elegant design.",
      missionAr: "بناء برامج ذكية تجمع بين الأداء العالي والتصميم الأنيق.",
      vision: "To be a leader in software development in the Arab world.",
      visionAr: "أن أكون رائداً في مجال تطوير البرمجيات في المنطقة العربية.",
      goals: "Contributing to digital transformation and building innovative software solutions.",
      goalsAr: "المساهمة في التحول الرقمي وبناء حلول برمجية مبتكرة."
    },
    contact: {
      email: "mohannad@qudsi.dev",
      phone: "+967 783737425",
      location: "Sana'a, Yemen",
      locationAr: "صنعاء، اليمن",
      whatsapp: "+967 783737425"
    },
    social: {
      github: "https://github.com/mohannad-alqudsi",
      linkedin: "https://linkedin.com/in/mohannad-alqudsi",
      facebook: "https://facebook.com/mohannad.alqudsi",
      instagram: "https://instagram.com/mohannad.alqudsi"
    }
  }
};

interface DataContextType {
  data: DataState | null;
  loading: boolean;
  saveData: (newData: DataState) => Promise<void>;
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: number, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  addCertificate: (certificate: Omit<Certificate, "id">) => Promise<void>;
  updateCertificate: (id: number, certificate: Partial<Certificate>) => Promise<void>;
  deleteCertificate: (id: number) => Promise<void>;
  addGalleryImage: (image: Omit<GalleryImage, "id">) => Promise<void>;
  updateGalleryImage: (id: number, image: Partial<GalleryImage>) => Promise<void>;
  deleteGalleryImage: (id: number) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => Promise<void>;
  updateTestimonial: (id: number, testimonial: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: number) => Promise<void>;
  updateContent: (content: Partial<SiteContent>) => Promise<void>;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataState | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  const refresh = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/data", { cache: "no-store" });
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && serverData.projects) {
          setData(serverData);
        } else {
          setData(initialData);
        }
      } else {
        setData(initialData);
      }
    } catch (e) {
      console.error("Failed to load data", e);
      setData(initialData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  // Save data to server
  const saveData = async (newData: DataState) => {
    try {
      setData(newData); // Update local state immediately
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) {
        console.error("Failed to save to server");
      }
    } catch (e) {
      console.error("Failed to save data", e);
    }
  };

  const addProject = async (project: Omit<Project, "id">) => {
    if (!data) return;
    const newData = {
      ...data,
      projects: [...data.projects, { ...project, id: Date.now() }]
    };
    await saveData(newData);
  };

  const updateProject = async (id: number, project: Partial<Project>) => {
    if (!data) return;
    const newData = {
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, ...project } : p)
    };
    await saveData(newData);
  };

  const deleteProject = async (id: number) => {
    if (!data) return;
    const newData = {
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    };
    await saveData(newData);
  };

  const addCertificate = async (certificate: Omit<Certificate, "id">) => {
    if (!data) return;
    const newData = {
      ...data,
      certificates: [...data.certificates, { ...certificate, id: Date.now() }]
    };
    await saveData(newData);
  };

  const updateCertificate = async (id: number, certificate: Partial<Certificate>) => {
    if (!data) return;
    const newData = {
      ...data,
      certificates: data.certificates.map(c => c.id === id ? { ...c, ...certificate } : c)
    };
    await saveData(newData);
  };

  const deleteCertificate = async (id: number) => {
    if (!data) return;
    const newData = {
      ...data,
      certificates: data.certificates.filter(c => c.id !== id)
    };
    await saveData(newData);
  };

  const addGalleryImage = async (image: Omit<GalleryImage, "id">) => {
    if (!data) return;
    const newData = {
      ...data,
      gallery: [...data.gallery, { ...image, id: Date.now() }]
    };
    await saveData(newData);
  };

  const updateGalleryImage = async (id: number, image: Partial<GalleryImage>) => {
    if (!data) return;
    const newData = {
      ...data,
      gallery: data.gallery.map(g => g.id === id ? { ...g, ...image } : g)
    };
    await saveData(newData);
  };

  const deleteGalleryImage = async (id: number) => {
    if (!data) return;
    const newData = {
      ...data,
      gallery: data.gallery.filter(g => g.id !== id)
    };
    await saveData(newData);
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, "id">) => {
    if (!data) return;
    const newData = {
      ...data,
      testimonials: [...data.testimonials, { ...testimonial, id: Date.now() }]
    };
    await saveData(newData);
  };

  const updateTestimonial = async (id: number, testimonial: Partial<Testimonial>) => {
    if (!data) return;
    const newData = {
      ...data,
      testimonials: data.testimonials.map(t => t.id === id ? { ...t, ...testimonial } : t)
    };
    await saveData(newData);
  };

  const deleteTestimonial = async (id: number) => {
    if (!data) return;
    const newData = {
      ...data,
      testimonials: data.testimonials.filter(t => t.id !== id)
    };
    await saveData(newData);
  };

  const updateContent = async (content: Partial<SiteContent>) => {
    if (!data) return;
    const newData = {
      ...data,
      content: {
        ...data.content,
        ...content,
        hero: { ...data.content.hero, ...(content.hero || {}) },
        about: { ...data.content.about, ...(content.about || {}) },
        contact: { ...data.content.contact, ...(content.contact || {}) },
        social: { ...data.content.social, ...(content.social || {}) }
      }
    };
    await saveData(newData);
  };

  return (
    <DataContext.Provider value={{
      data,
      loading,
      saveData,
      addProject,
      updateProject,
      deleteProject,
      addCertificate,
      updateCertificate,
      deleteCertificate,
      addGalleryImage,
      updateGalleryImage,
      deleteGalleryImage,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      updateContent,
      refresh
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
