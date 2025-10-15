import { useState } from "react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import { ExternalLink, Download, Clock } from "lucide-react";

const websiteProjects = [
  {
    id: 1,
    name: "ERP Dokterhub",
    description: {
      id: "Sistem ERP (Enterprise Resource Planning) untuk manajemen klinik di PT Gerin Mitra Husada, Jakarta. Dikembangkan sebagai Fullstack Developer menggunakan Laravel dan Bootstrap 5. Termasuk modul manajemen pasien, jadwal janji temu, inventori, tagihan, dan chat melalui Pusher. Digunakan secara internal oleh staf dan admin klinik.",
      en: "Comprehensive ERP (Enterprise Resource Planning) system for clinic management at PT Gerin Mitra Husada, Jakarta. Developed as a Fullstack Developer using Laravel and Bootstrap 5. Includes modules for patient management, appointment scheduling, inventory tracking, billing, and chat via Pusher. Used internally by clinic staff and administrators.",
    },
    image: "",
  },
  {
    id: 2,
    name: "Web EFO (Esports Football One)",
    description: {
      id: "Frontend untuk EFO — platform organisasi esports. Merancang antarmuka responsif dan interaktif menggunakan Bootstrap dan Laravel untuk manajemen tim serta pelacakan pertandingan secara real-time. Digunakan secara internal oleh admin dan pemain EFO.",
      en: "Frontend development for EFO – an esports organization platform. Designed a responsive and interactive UI with Bootstrap and Laravel for real-time team management and match tracking. Used internally by EFO’s admin and players.",
    },
    image: "",
  },
];

const websiteSampleProjects = [
  {
    id: 1,
    name: "MotoShop Template",
    description: {
      id: "Template e-commerce modern bertema motor dengan desain gelap, dibangun menggunakan React dan Tailwind CSS.",
      en: "Template for a modern motorcycle e-commerce website built with React and Tailwind CSS.",
    },
    image: "/img/motoshop.png",
    url: "https://motoshop-five.vercel.app/",
  },
  {
    id: 2,
    name: "Vutsal Store Template",
    description: {
      id: "Konsep landing page untuk toko perlengkapan olahraga dengan desain hijau yang modern dan bersih.",
      en: "Landing page concept for a sports gear store with clean, green modern aesthetics.",
    },
    image: "/img/vutsal.png",
    url: "https://vutsal-store.vercel.app/",
  },
];

const mobileProjects = [
  {
    id: 1,
    name: "Hemoku",
    description: {
      id: "Pengembangan backend untuk aplikasi Hemoku bekerja sama dengan Stikes Widya Dharma Husada dan dosen Universitas Pamulang. Fokus saya adalah membangun backend menggunakan Laravel untuk skrining anemia dan manajemen pasien. Segera hadir di Play Store.",
      en: "Backend development for Hemoku mobile app in collaboration with Stikes Widya Dharma Husada and lecturers from Universitas Pamulang. My role focused on building the backend with Laravel for anemia screening and patient management. Available soon on Play Store.",
    },
    image: "/img/hemoku.jpeg",
    downloadUrl: "soon",
  },
  {
    id: 2,
    name: "M-Diabetic Care",
    description: {
      id: "Sistem backend untuk aplikasi M-Diabetic Care bekerja sama dengan Stikes Widya Dharma Husada dan dosen Universitas Pamulang — alat bantu skrining dan manajemen diabetes. Fokus saya adalah membangun backend menggunakan Laravel dengan performa dan keamanan tinggi. Segera hadir di Play Store.",
      en: "Backend system for M-Diabetic Care mobile app in collaboration with Stikes Widya Dharma Husada and lecturers from Universitas Pamulang — a tool for diabetes screening and management. My role focused on building the backend with Laravel with emphasis on performance and security. Coming soon on Play Store.",
    },
    image: "/img/diabetic.jpeg",
    downloadUrl: "soon",
  },
  {
    id: 3,
    name: "Gunita",
    description: {
      id: "Aplikasi mobile fullstack untuk manajemen tanaman herbal di Desa Gunaksa, Bali. Dikembangkan bekerja sama dengan mahasiswa dan dosen Universitas Udayana serta pemerintah daerah setempat. Saya membangun backend dengan Go dan berkontribusi sebagian pada tampilan menggunakan Flutter. Fitur mencakup database tanaman, konsultasi, dan e-commerce.",
      en: "Fullstack mobile app for herbal plant management in Desa Gunaksa, Bali. Developed in collaboration with students and lecturers from Universitas Udayana and local government. I built the backend with Go and contributed partially to the frontend using Flutter. Features include plant database, consultation, and e-commerce.",
    },
    image: "/img/gunita.jpeg",
    downloadUrl: "soon",
  },
];

const mobileSampleProjects = [
  {
    id: 1,
    name: "Sample Todo App",
    description: {
      id: "Aplikasi Todo sederhana berbasis Flutter yang mendemonstrasikan manajemen state dasar.",
      en: "A simple Todo mobile app built with Flutter, demonstrating basic state management.",
    },
    image: "https://images.unsplash.com/photo-1590608897129-79da98d159d9?w=400&q=80",
    downloadUrl: "#",
  },
  {
    id: 2,
    name: "Sample E-commerce App",
    description: {
      id: "Starter kit aplikasi belanja mobile dengan integrasi REST API dan Flutter.",
      en: "Starter kit for a mobile shopping app built with Flutter and REST API integration.",
    },
    image: "https://images.unsplash.com/photo-1607083206968-13611e3fbb0a?w=400&q=80",
    downloadUrl: "#",
  },
];

export const Portfolio = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"website" | "websiteSample" | "mobile" | "mobileSample">("website");

  const tabs = [
    { id: "website", label: t("portfolio.website") },
    { id: "websiteSample", label: language === "id" ? "Contoh Website" : "Sample Website" },
    { id: "mobile", label: t("portfolio.mobile") },
    { id: "mobileSample", label: language === "id" ? "Contoh Mobile" : "Sample Mobile" },
  ];

  const getProjects = () => {
    switch (activeTab) {
      case "website":
        return websiteProjects;
      case "websiteSample":
        return websiteSampleProjects;
      case "mobile":
        return mobileProjects;
      case "mobileSample":
        return mobileSampleProjects;
    }
  };

  const isWebsiteTab = activeTab === "website" || activeTab === "websiteSample";

  return (
    <section
      id="portfolio"
      className="py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">{t("portfolio.title")}</h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-6"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getProjects().map((project) => (
            <div
              key={project.id}
              className="group animate-fade-in bg-card rounded-xl overflow-hidden border border-border hover:border-primary transition-all hover:scale-105 shadow-lg flex flex-col"
            >
              <div className={`overflow-hidden ${isWebsiteTab ? "aspect-video" : "aspect-[9/16] bg-muted flex items-center justify-center"}`}>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                  <p className="text-muted-foreground text-justify">{project.description[language]}</p>
                </div>

                {/* Buttons */}
                <div className="mt-4">
                  {activeTab === "websiteSample" && (
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(project.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("portfolio.liveDemo")}
                    </Button>
                  )}

                  {activeTab === "mobile" &&
                    (project.downloadUrl === "soon" ? (
                      <Button
                        variant="outline"
                        disabled
                        className="w-full gap-2 border-muted-foreground text-muted-foreground cursor-not-allowed"
                      >
                        <Clock className="h-4 w-4" />
                        {language === "id" ? "Segera Hadir di Play Store" : "Coming Soon on Play Store"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => window.open(project.downloadUrl, "_blank")}
                      >
                        <Download className="h-4 w-4" />
                        {t("portfolio.download")}
                      </Button>
                    ))}

                  {activeTab === "mobileSample" &&
                    (project.downloadUrl === "#" ? (
                      <Button
                        variant="outline"
                        disabled
                        className="w-full gap-2 border-muted-foreground text-muted-foreground cursor-not-allowed"
                      >
                        <Clock className="h-4 w-4" />
                        {language === "id" ? "Segera Hadir" : "Coming Soon"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => window.open(project.downloadUrl, "_blank")}
                      >
                        <Download className="h-4 w-4" />
                        {t("portfolio.download")}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
