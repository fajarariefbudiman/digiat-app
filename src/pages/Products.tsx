import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Carousel } from "react-responsive-carousel";
import { ProductWizard } from "../components/ProductWizard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: "all", label: t("Semua", "All") },
    { id: "website", label: t("Website", "Website") },
    { id: "mobile", label: t("Mobile App", "Mobile App") },
    { id: "system", label: t("Sistem / API", "System / API") },
    { id: "design", label: t("Desain", "Design") },
  ];

  const products = [
    {
      id: "p1",
      category: "website",
      title: t("Website Motoshop", "Motoshop Website"),
      description: t("Website e-commerce mini untuk jualan motor dengan sistem admin dan checkout.", "Mini e-commerce website for motorcycle sales with admin and checkout system."),
      price: t("Mulai dari Rp 3.000.000", "Starting from Rp 3,000,000"),
      tech: ["Laravel", "MySQL", "Tailwind", "Pusher"],
      image: "/img/motoshop.png",
      liveDemo: "https://motoshop-demo.example.com",
    },
    {
      id: "p2",
      category: "website",
      title: t("Vutsal Store", "Vutsal Store App"),
      description: t("Aplikasi mobile e-commerce untuk jualan sepatu futsal dengan integrasi notifikasi dan API.", "Mobile e-commerce app for futsal shoes with notifications and API integration."),
      price: t("Mulai dari Rp 5.000.000", "Starting from Rp 5,000,000"),
      tech: ["Laravel", "MySQL", "Tailwind", "Pusher"],
      image: "/img/vutsal.png",
      liveDemo: "https://motoshop-demo.example.com",
    },
    {
      id: "p3",
      category: "website",
      title: t("Luxe Stay", "Luxe Stay Booking System"),
      description: t("Template sistem booking kamar hotel dengan role admin, pelanggan, dan laporan pendapatan.", "Hotel room booking system template with admin, customer, and revenue reports."),
      price: t("Mulai dari Rp 7.000.000", "Starting from Rp 7,000,000"),
      tech: ["Laravel", "MySQL", "Tailwind", "Pusher"],
      image: "/img/luxe-stay.png",
      liveDemo: "https://motoshop-demo.example.com",
    },
    {
      id: "p4",
      category: "system",
      title: t("RESTful API CRUD User", "RESTful API CRUD User"),
      description: t("Template API user lengkap dengan autentikasi JWT dan dokumentasi Swagger.", "Complete user API template with JWT authentication and Swagger documentation."),
      price: t("Mulai dari Rp 2.500.000", "Starting from Rp 2,500,000"),
      tech: ["Go", "PHP", "Python", "C++"],
      screenshots: ["/img/api.jpeg"],
    },
    {
      id: "p5",
      category: "website",
      title: t("Personal Web Dark Theme", "Personal Web Dark Theme"),
      description: t("Template website pribadi dengan tema gelap minimalis untuk portofolio modern.", "Dark-themed personal portfolio website template."),
      price: t("Mulai dari Rp 2.000.000", "Starting from Rp 2,000,000"),
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      image: "/img/personal.png",
      liveDemo: "https://personalweb-demo.example.com",
    },
    {
      id: "p6",
      category: "design",
      title: t("Poster Tema Tahun Baru", "New Year Poster Template"),
      description: t("Template poster bertema tahun baru yang siap disesuaikan dengan brand Anda.", "Editable New Year poster template for your brand."),
      price: t("Mulai dari Rp 500.000", "Starting from Rp 500,000"),
      tech: ["Figma", "Canva"],
      screenshots: ["/images/products/newyear1.png", "/images/products/newyear2.png"],
    },
  ];

  const filteredProducts = selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* ============ HERO SECTION ============ */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("Produk Kami", "Our Products")}</h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("Temukan berbagai produk digital unik, siap pakai, dan bisa disesuaikan sesuai kebutuhan Anda.", "Explore unique, ready-to-use digital products customizable for your needs.")}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "hero" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-5 py-2 text-sm md:text-base"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS GRID ============ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card"
              >
                <div className="mb-4">
                  {/* Image or Carousel */}
                  {product.category === "website" ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
                    />
                  ) : (
                    <div className="rounded-xl overflow-hidden shadow-sm mb-4">
                      <Carousel
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop
                        autoPlay
                        interval={3500}
                        emulateTouch
                      >
                        {product.screenshots?.map((src, i) => (
                          <div key={i}>
                            <img
                              src={src}
                              alt={`${product.title} screenshot ${i + 1}`}
                              className="h-48 w-full object-cover"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  )}

                  {/* Title & Description */}
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">{product.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{product.description}</p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tech.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-primary mb-5">{product.price}</div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    {product.category === "website" ? (
                      <Button
                        asChild
                        variant="outline"
                        className="w-1/2 text-sm font-medium"
                      >
                        <a
                          href={product.liveDemo}
                          target="_blank"
                        >
                          Live Demo
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        disabled
                        className="w-1/2 opacity-60 cursor-not-allowed text-sm"
                      >
                        Preview Only
                      </Button>
                    )}
                    <Button
                      className="w-1/2 text-sm font-medium"
                      variant="hero"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {t("Pesan Sekarang", "Order Now")}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("Butuh Sesuatu yang Lebih Spesifik?", "Need Something More Custom?")}</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t("Kami juga menyediakan layanan pembuatan sistem atau aplikasi custom sesuai kebutuhan Anda.", "We also build fully custom systems and applications tailored to your needs.")}
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/contact")}
          >
            {t("Konsultasi Gratis", "Free Consultation")}
          </Button>
        </div>
      </section>

      {/* ============ PRODUCT WIZARD MODAL ============ */}
      {selectedProduct && (
        <ProductWizard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
