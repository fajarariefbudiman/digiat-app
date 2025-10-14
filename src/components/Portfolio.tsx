import { useState } from "react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import { ExternalLink, Download, Clock } from "lucide-react";

const websiteProjects = [
  {
    id: 1,
    name: "ERP Dokterhub",
    description:
      "Comprehensive Enterprise Resource Planning system for clinic management at PT Gerin Mitra Husada, Jakarta. Developed as a Fullstack Developer using Laravel and Bootstrap 5. Includes modules for patient management, appointment scheduling, inventory tracking, billing, and chat via Pusher. Used internally by clinic staff and administrators.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80",
  },
  {
    id: 2,
    name: "Web EFO (Esports Football One)",
    description: "Frontend development for EFO – an esports organization platform. Designed a responsive and interactive UI with Bootstrap and Laravel for real-time team management and match tracking. Used internally by EFO’s admin and players.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

const websiteSampleProjects = [
  {
    id: 1,
    name: "MotoShop Template",
    description: "Template for a modern motorcycle e-commerce website built with React and Tailwind CSS.",
    image: "/img/motoshop.png",
    url: "https://motoshop-five.vercel.app/",
  },
  {
    id: 2,
    name: "Vutsal Store Template",
    description: "Landing page concept for a sports gear store with clean, green modern aesthetics.",
    image: "/img/vutsal.png",
    url: "#",
  },
];

const mobileProjects = [
  {
    id: 1,
    name: "Hemoku",
    description: "Backend development for Hemoku mobile app in collaboration with Stikes Widya Dharma Husada. Developed secure RESTful API with Laravel, focused on anemia screening and patient management. Available soon on Play Store.",
    image: "/img/hemoku.jpeg",
    downloadUrl: "soon",
  },
  {
    id: 2,
    name: "M-Diabetic Care",
    description: "Backend system for M-Diabetic Care — a mobile app for diabetes screening and management. Built using Laravel with focus on performance and security. Coming soon on Play Store.",
    image: "/img/diabetic.jpeg",
    downloadUrl: "soon",
  },
  {
    id: 3,
    name: "Gunita",
    description: "Fullstack mobile app for herbal plant management in Desa Gunaksa, Bali. Built with Flutter (frontend) and Go (backend). Features include plant database, consultation, and e-commerce. Available for download.",
    image: "/img/gunita.jpeg",
    downloadUrl: "#",
  },
];

const mobileSampleProjects = [
  {
    id: 1,
    name: "Sample Todo App",
    description: "A simple Todo mobile app built with Flutter, demonstrating basic state management.",
    image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=400&q=80",
    downloadUrl: "#",
  },
  {
    id: 2,
    name: "Sample E-commerce App",
    description: "Starter kit for a mobile shopping app built with Flutter and REST API integration.",
    image: "https://images.unsplash.com/photo-1598300052201-43c52924652b?w=400&q=80",
    downloadUrl: "#",
  },
];

export const Portfolio = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"website" | "websiteSample" | "mobile" | "mobileSample">("website");

  const tabs = [
    { id: "website", label: t("portfolio.website") },
    { id: "websiteSample", label: "Sample Website" },
    { id: "mobile", label: t("portfolio.mobile") },
    { id: "mobileSample", label: "Sample Mobile" },
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
                  <p className="text-muted-foreground text-justify">{project.description}</p>
                </div>

                {/* Button Section - Always at bottom */}
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
                        Coming Soon on Play Store
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

                  {/* ✅ Added for Sample Mobile */}
                  {activeTab === "mobileSample" &&
                    (project.downloadUrl === "#" ? (
                      <Button
                        variant="outline"
                        disabled
                        className="w-full gap-2 border-muted-foreground text-muted-foreground cursor-not-allowed"
                      >
                        <Clock className="h-4 w-4" />
                        Coming Soon
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
