import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Sample() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("website");

  const portfolioData = {
    website: [
      {
        title: t("E-Commerce Fashion", "Fashion E-Commerce"),
        description: t("Platform jual beli fashion online dengan sistem pembayaran terintegrasi", "Online fashion marketplace with integrated payment system"),
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop",
        link: "#",
      },
      {
        title: t("Portofolio Kreatif", "Creative Portfolio"),
        description: t("Website portofolio untuk profesional kreatif dengan galeri interaktif", "Portfolio website for creative professionals with interactive gallery"),
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop",
        link: "#",
      },
      {
        title: t("Sistem Manajemen Hotel", "Hotel Management System"),
        description: t("Platform manajemen reservasi dan operasional hotel", "Hotel reservation and operations management platform"),
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
        link: "#",
      },
    ],
    mobile: [
      {
        title: t("Aplikasi Delivery Makanan", "Food Delivery App"),
        description: t("Aplikasi pemesanan dan pengantaran makanan real-time", "Real-time food ordering and delivery application"),
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
        link: "#",
      },
      {
        title: t("Fitness Tracker", "Fitness Tracker"),
        description: t("Aplikasi pelacak aktivitas dan kesehatan harian", "Daily activity and health tracking application"),
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
        link: "#",
      },
      {
        title: t("Aplikasi Edukasi Anak", "Kids Education App"),
        description: t("Platform pembelajaran interaktif untuk anak-anak", "Interactive learning platform for children"),
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
        link: "#",
      },
    ],
    system: [
      {
        title: t("Sistem Informasi Akademik", "Academic Information System"),
        description: t("Platform manajemen data akademik universitas", "University academic data management platform"),
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop",
        link: "#",
      },
      {
        title: t("ERP Manufaktur", "Manufacturing ERP"),
        description: t("Sistem perencanaan sumber daya perusahaan manufaktur", "Manufacturing enterprise resource planning system"),
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
        link: "#",
      },
      {
        title: t("Sistem Inventory", "Inventory System"),
        description: t("Platform manajemen stok dan pergudangan", "Stock and warehouse management platform"),
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
        link: "#",
      },
    ],
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("Portofolio Kami", "Our Portfolio")}</h1>
            <p className="text-lg text-muted-foreground">{t("Jelajahi proyek-proyek yang telah kami selesaikan dengan hasil yang memuaskan", "Explore projects we have completed with satisfying results")}</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="website">{t("Website", "Website")}</TabsTrigger>
              <TabsTrigger value="mobile">{t("Mobile App", "Mobile App")}</TabsTrigger>
              <TabsTrigger value="system">{t("Sistem", "System")}</TabsTrigger>
            </TabsList>

            {Object.entries(portfolioData).map(([key, projects]) => (
              <TabsContent
                key={key}
                value={key}
                className="mt-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden shadow-card hover-scale group"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t("Lihat Demo", "View Demo")}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
