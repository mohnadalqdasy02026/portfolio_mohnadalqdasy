"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/supabase";

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

// Default data
const defaultData: DataState = {
  projects: [
    {
      id: 1,
      title: "Building Materials ERP",
      titleAr: "نظام إدارة مواد البناء",
      description: "Comprehensive ERP system for building materials management.",
      descriptionAr: "نظام ERP شامل لإدارة مواد البناء.",
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
      description: "Complete hospital management system.",
      descriptionAr: "نظام إدارة مستشفى متكامل.",
      category: "desktop",
      technologies: ["C#", "WinForms", "SQL Server"],
      image: "",
      featured: true,
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Portfolio Website",
      titleAr: "موقع البورتفوليو",
      description: "Modern responsive portfolio with admin dashboard.",
      descriptionAr: "موقع بورتفوليو عصري مع لوحة تحكم.",
      category: "web",
      technologies: ["Next.js", "React", "TypeScript"],
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
    { id: 3, title: "Portfolio Website", titleAr: "موقع بورتفوليو", category: "web", url: "", featured: true, date: "2024-01-05" }
  ],
  testimonials: [
    {
      id: 1,
      name: "Ahmed Mohammed",
      company: "Tech Solutions",
      rating: 5,
      text: "Excellent work on our ERP system.",
      textAr: "عمل ممتاز في نظام ERP.",
      avatar: ""
    },
    {
      id: 2,
      name: "Sara Al-Mahdi",
      company: "Hospital Group",
      rating: 5,
      text: "The hospital management system exceeded our expectations.",
      textAr: "نظام إدارة المستشفى تجاوز توقعاتنا.",
      avatar: ""
    }
  ],
  content: {
    hero: {
      name: "Mohannad Mohammed Al-Qudsi",
      nameAr: "مهند محمد القدسي",
      titles: ["Software Engineer", "Desktop App Developer", "Full Stack Developer"],
      titlesAr: ["مهندس برمجيات", "مطور تطبيقات سطح المكتب", "مطور Full Stack"],
      description: "Passionate about building intelligent software.",
      descriptionAr: "شغوف ببناء برامج ذكية تجمع بين الأداء والبساطة."
    },
    about: {
      biography: "I am a passionate software engineer.",
      biographyAr: "أنا مهندس برمجيات شغوف.",
      mission: "Building intelligent software.",
      missionAr: "بناء برامج ذكية.",
      vision: "To be a leader in the Arab world.",
      visionAr: "أن أكون رائداً في العالم العربي.",
      goals: "Contributing to digital transformation.",
      goalsAr: "المساهمة في التحول الرقمي."
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

const hasSupabase = 
  typeof window !== 'undefined' && 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataState | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try Supabase first
        if (hasSupabase) {
          const supabaseData = await getPortfolioData();
          if (supabaseData) {
            setData(supabaseData);
            setLoading(false);
            return;
          }
        }
        
        // Fallback to localStorage
        const stored = localStorage.getItem("portfolio_data_v1");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.projects) {
            setData(parsed);
            setLoading(false);
            return;
          }
        }
        
        // Use default
        setData(defaultData);
        localStorage.setItem("portfolio_data_v1", JSON.stringify(defaultData));
      } catch (e) {
        console.error("Failed to load data", e);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Save data
  const saveData = async (newData: DataState) => {
    try {
      // Save to Supabase
      if (hasSupabase) {
        await savePortfolioData(newData);
      }
      
      // Always save to localStorage as backup
      localStorage.setItem("portfolio_data_v1", JSON.stringify(newData));
      setData(newData);
    } catch (e) {
      console.error("Failed to save data", e);
      localStorage.setItem("portfolio_data_v1", JSON.stringify(newData));
      setData(newData);
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

  const refresh = async () => {
    if (hasSupabase) {
      const supabaseData = await getPortfolioData();
      if (supabaseData) {
        setData(supabaseData);
      }
    }
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
