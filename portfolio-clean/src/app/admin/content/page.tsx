"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Code, Folder, Award, FileText, MessageSquare, Briefcase, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export default function ContentPage() {
  const { language } = useLanguage();
  const { data, updateContent, updateProject, addProject, deleteProject, addTestimonial, deleteTestimonial, addCertificate, deleteCertificate } = useData();
  const [activeSection, setActiveSection] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);

  // Show loading state while data loads
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">
          {language === "ar" ? "جاري تحميل البيانات..." : "Loading data..."}
        </div>
      </div>
    );
  }

  const sections = [
    { id: "hero", icon: User, label: language === "ar" ? "القسم الرئيسي" : "Hero Section" },
    { id: "about", icon: User, label: language === "ar" ? "نبذة عني" : "About Me" },
    { id: "contact", icon: Mail, label: language === "ar" ? "معلومات التواصل" : "Contact Info" },
    { id: "skills", icon: Code, label: language === "ar" ? "المهارات" : "Skills" },
    { id: "projects", icon: Folder, label: language === "ar" ? "المشاريع" : "Projects" },
    { id: "certificates", icon: Award, label: language === "ar" ? "الشهادات" : "Certificates" },
    { id: "testimonials", icon: MessageSquare, label: language === "ar" ? "آراء العملاء" : "Testimonials" },
    { id: "blog", icon: FileText, label: language === "ar" ? "المقالات" : "Blog Posts" },
  ];

  const handleSaveContent = async (updates: any) => {
    setIsSaving(true);
    await updateContent(updates);
    setIsSaving(false);
    alert(language === "ar" ? "تم الحفظ بنجاح!" : "Saved successfully!");
  };

  // Hero Section
  const HeroEditor = () => {
    const [name, setName] = useState(data.content.hero.name);
    const [nameAr, setNameAr] = useState(data.content.hero.nameAr || "");
    const [desc, setDesc] = useState(data.content.hero.description);
    const [descAr, setDescAr] = useState(data.content.hero.descriptionAr || "");
    const [titlesText, setTitlesText] = useState(data.content.hero.titles.join("\n"));
    const [titlesArText, setTitlesArText] = useState((data.content.hero.titlesAr || []).join("\n"));

    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">Name (English)</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">الاسم (عربي)</label>
            <input type="text" value={nameAr} onChange={(e) => setNameAr(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">Description (English)</label>
            <textarea rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">الوصف (عربي)</label>
            <textarea rows={4} value={descAr} onChange={(e) => setDescAr(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">Titles (English, one per line)</label>
            <textarea rows={4} value={titlesText} onChange={(e) => setTitlesText(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">المسميات (عربي، واحد في كل سطر)</label>
            <textarea rows={4} value={titlesArText} onChange={(e) => setTitlesArText(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
        </div>
        <Button onClick={() => handleSaveContent({ 
          hero: { 
            name, 
            nameAr, 
            description: desc, 
            descriptionAr: descAr, 
            titles: titlesText.split("\n").filter(t => t.trim()),
            titlesAr: titlesArText.split("\n").filter(t => t.trim())
          } 
        })} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
          {language === "ar" ? "حفظ القسم الرئيسي" : "Save Hero Section"}
        </Button>
      </div>
    );
  };

  // About Section
  const AboutEditor = () => {
    const [biography, setBiography] = useState(data.content.about.biography);
    const [biographyAr, setBiographyAr] = useState(data.content.about.biographyAr || "");
    const [mission, setMission] = useState(data.content.about.mission);
    const [missionAr, setMissionAr] = useState(data.content.about.missionAr || "");
    const [vision, setVision] = useState(data.content.about.vision);
    const [visionAr, setVisionAr] = useState(data.content.about.visionAr || "");
    const [goals, setGoals] = useState(data.content.about.goals);
    const [goalsAr, setGoalsAr] = useState(data.content.about.goalsAr || "");

    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">Biography (English)</label>
            <textarea rows={4} value={biography} onChange={(e) => setBiography(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">السيرة (عربي)</label>
            <textarea rows={4} value={biographyAr} onChange={(e) => setBiographyAr(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">Mission (English)</label>
            <textarea rows={2} value={mission} onChange={(e) => setMission(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">المهمة (عربي)</label>
            <textarea rows={2} value={missionAr} onChange={(e) => setMissionAr(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">Vision (English)</label>
            <textarea rows={2} value={vision} onChange={(e) => setVision(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">الرؤية (عربي)</label>
            <textarea rows={2} value={visionAr} onChange={(e) => setVisionAr(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">Goals (English)</label>
            <textarea rows={2} value={goals} onChange={(e) => setGoals(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-foreground/80 mb-2 text-sm font-medium">الأهداف (عربي)</label>
            <textarea rows={2} value={goalsAr} onChange={(e) => setGoalsAr(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none resize-none" />
          </div>
        </div>
        <Button onClick={() => handleSaveContent({ 
          about: { 
            biography, biographyAr, mission, missionAr, vision, visionAr, goals, goalsAr
          } 
        })} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
          {language === "ar" ? "حفظ نبذة عني" : "Save About Section"}
        </Button>
      </div>
    );
  };

  // Projects Editor
  const ProjectsEditor = () => {
    const [title, setTitle] = useState("");
    const [titleAr, setTitleAr] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [category, setCategory] = useState("desktop");
    const [image, setImage] = useState("");
    const [techs, setTechs] = useState("");

    const handleAdd = async () => {
      if (!title) {
        alert(language === "ar" ? "أدخل العنوان" : "Enter title");
        return;
      }
      await addProject({
        title,
        titleAr,
        description,
        descriptionAr,
        category,
        image,
        technologies: techs.split(",").map(t => t.trim()).filter(t => t),
        featured: false,
        date: new Date().toISOString().split("T")[0]
      });
      setTitle("");
      setTitleAr("");
      setDescription("");
      setDescriptionAr("");
      setImage("");
      setTechs("");
      alert(language === "ar" ? "تمت إضافة المشروع!" : "Project added!");
    };

    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">{language === "ar" ? "إضافة مشروع جديد" : "Add New Project"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Title (English)" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <input type="text" placeholder="العنوان (عربي)" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <textarea rows={2} placeholder="Description (English)" value={description} onChange={(e) => setDescription(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground resize-none" />
            <textarea rows={2} placeholder="الوصف (عربي)" value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground resize-none" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground">
              <option value="desktop">Desktop</option>
              <option value="web">Web</option>
              <option value="ai">AI</option>
              <option value="erp">ERP</option>
            </select>
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <input type="text" placeholder="Technologies (comma separated: C#, .NET, SQL)" value={techs} onChange={(e) => setTechs(e.target.value)} className="md:col-span-2 px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
          </div>
          <Button onClick={handleAdd} className="mt-4" leftIcon={<Folder className="w-4 h-4" />}>
            {language === "ar" ? "إضافة المشروع" : "Add Project"}
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">{language === "ar" ? "المشاريع الحالية" : "Current Projects"}</h3>
          {data.projects.map(p => (
            <div key={p.id} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.category} • {p.technologies.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateProject(p.id, { featured: !p.featured })} className={`px-3 py-1 rounded-lg text-xs ${p.featured ? "bg-yellow-500 text-black" : "bg-secondary text-muted-foreground"}`}>
                  {p.featured ? "★" : "☆"}
                </button>
                <button onClick={() => deleteProject(p.id)} className="px-3 py-1 rounded-lg text-xs bg-red-500/20 text-red-400">
                  {language === "ar" ? "حذف" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Certificates Editor
  const CertificatesEditor = () => {
    const [title, setTitle] = useState("");
    const [titleAr, setTitleAr] = useState("");
    const [issuer, setIssuer] = useState("");
    const [image, setImage] = useState("");

    const handleAdd = async () => {
      if (!title) {
        alert(language === "ar" ? "أدخل العنوان" : "Enter title");
        return;
      }
      await addCertificate({
        title,
        titleAr,
        issuer,
        image,
        date: new Date().toISOString().split("T")[0],
        credentialUrl: "#"
      });
      setTitle("");
      setTitleAr("");
      setIssuer("");
      setImage("");
      alert(language === "ar" ? "تمت إضافة الشهادة!" : "Certificate added!");
    };

    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">{language === "ar" ? "إضافة شهادة" : "Add Certificate"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Title (English)" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <input type="text" placeholder="العنوان (عربي)" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <input type="text" placeholder="Issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
          </div>
          <Button onClick={handleAdd} className="mt-4" leftIcon={<Award className="w-4 h-4" />}>
            {language === "ar" ? "إضافة الشهادة" : "Add Certificate"}
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">{language === "ar" ? "الشهادات الحالية" : "Current Certificates"}</h3>
          {data.certificates.map(c => (
            <div key={c.id} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{c.title}</p>
                <p className="text-sm text-muted-foreground">{c.issuer} • {c.date}</p>
              </div>
              <button onClick={() => deleteCertificate(c.id)} className="px-3 py-1 rounded-lg text-xs bg-red-500/20 text-red-400">
                {language === "ar" ? "حذف" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Testimonials Editor
  const TestimonialsEditor = () => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [text, setText] = useState("");
    const [textAr, setTextAr] = useState("");

    const handleAdd = async () => {
      if (!name || !text) {
        alert(language === "ar" ? "املأ الحقول" : "Fill fields");
        return;
      }
      await addTestimonial({
        name,
        company,
        text,
        textAr,
        rating: 5,
        avatar: "/images/avatars/default.jpg"
      });
      setName("");
      setCompany("");
      setText("");
      setTextAr("");
      alert(language === "ar" ? "تمت الإضافة!" : "Added!");
    };

    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">{language === "ar" ? "إضافة رأي" : "Add Testimonial"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            <textarea rows={3} placeholder="Text (English)" value={text} onChange={(e) => setText(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground resize-none" />
            <textarea rows={3} placeholder="النص (عربي)" value={textAr} onChange={(e) => setTextAr(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border text-foreground resize-none" />
          </div>
          <Button onClick={handleAdd} className="mt-4" leftIcon={<MessageSquare className="w-4 h-4" />}>
            {language === "ar" ? "إضافة" : "Add"}
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">{language === "ar" ? "الآراء الحالية" : "Current Testimonials"}</h3>
          {data.testimonials.map(t => (
            <div key={t.id} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.company} • {t.text.substring(0, 50)}...</p>
              </div>
              <button onClick={() => deleteTestimonial(t.id)} className="px-3 py-1 rounded-lg text-xs bg-red-500/20 text-red-400">
                {language === "ar" ? "حذف" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Contact Editor
  const ContactEditor = () => {
    const [email, setEmail] = useState(data.content.contact.email);
    const [phone, setPhone] = useState(data.content.contact.phone);
    const [location, setLocation] = useState(data.content.contact.location);
    const [locationAr, setLocationAr] = useState(data.content.contact.locationAr || "");
    const [whatsapp, setWhatsapp] = useState(data.content.contact.whatsapp);
    const [github, setGithub] = useState(data.content.social.github);
    const [linkedin, setLinkedin] = useState(data.content.social.linkedin);
    const [facebook, setFacebook] = useState(data.content.social.facebook);
    const [instagram, setInstagram] = useState(data.content.social.instagram);

    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">{language === "ar" ? "معلومات التواصل" : "Contact Info"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Location (English)</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">الموقع (عربي)</label>
              <input type="text" value={locationAr} onChange={(e) => setLocationAr(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-foreground/80">WhatsApp</label>
              <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">{language === "ar" ? "روابط التواصل" : "Social Links"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">GitHub</label>
              <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">LinkedIn</label>
              <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Facebook</label>
              <input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Instagram</label>
              <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground" />
            </div>
          </div>
        </div>

        <Button onClick={() => handleSaveContent({ 
          contact: { email, phone, location, locationAr, whatsapp },
          social: { github, linkedin, facebook, instagram }
        })} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
          {language === "ar" ? "حفظ معلومات التواصل" : "Save Contact Info"}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-foreground mb-2">{language === "ar" ? "إدارة المحتوى" : "Content Management"}</h1>
        <p className="text-muted-foreground">{language === "ar" ? "عدل كل محتوى موقعك من هنا - التعديلات تنحفظ وتظهر للزوار" : "Edit all your portfolio content here - changes save and appear to visitors"}</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 card p-4"
        >
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeSection === section.id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 card p-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {sections.find((s) => s.id === activeSection)?.label}
          </h2>

          {activeSection === "hero" && <HeroEditor />}
          {activeSection === "about" && <AboutEditor />}
          {activeSection === "projects" && <ProjectsEditor />}
          {activeSection === "certificates" && <CertificatesEditor />}
          {activeSection === "testimonials" && <TestimonialsEditor />}
          {activeSection === "contact" && <ContactEditor />}
          {activeSection === "skills" && (
            <div className="card p-6 text-center">
              <p className="text-muted-foreground">
                {language === "ar" ? "المهارات يتم تعديلها من خلال ملف البيانات" : "Skills are managed through the data file"}
              </p>
            </div>
          )}
          {activeSection === "blog" && (
            <div className="card p-6 text-center">
              <p className="text-muted-foreground">
                {language === "ar" ? "المقالات قريباً!" : "Blog posts coming soon!"}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
