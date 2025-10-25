import { useLanguage } from "../contexts/LanguageContext";
import { HeroCarousel } from "../components/HeroCarousel";
import { OrderWizard } from "../components/OrderWizard";
import { TestimonialCard } from "../components/TestimonialCard";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  const sampleProducts = [
    {
      title: "Pengembangan Website",
      titleEn: "Website Development",
      description: "Website profesional yang responsif dan modern untuk bisnis Anda",
      descriptionEn: "Professional, responsive, and modern websites for your business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      href: "/products",
      tech: ["PHP", "Golang", "React", "Tailwind CSS", "MySQL","PostgreSQL", "TypeScript", "Bootstrap 5", "Vite", "Nginx", "Docker"],
      techEn: ["PHP", "Golang", "React", "Tailwind CSS", "MySQL","PostgreSQL", "TypeScript", "Bootstrap 5", "Vite", "Nginx", "Docker"],
    },
//     "Next.js",
// "Next.js",
    {
      title: "Aplikasi Mobile",
      titleEn: "Mobile Applications",
      description: "Aplikasi mobile iOS dan Android yang user-friendly",
      descriptionEn: "User-friendly iOS and Android mobile applications",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      href: "/products",
      tech: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "GraphQL"],
      techEn: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "GraphQL"],
    },
//     "Supabase",
// "Supabase",
//  "Expo", "Appwrite"
//  "Expo", "Appwrite"
    {
      title: "Sistem Custom",
      titleEn: "Custom Systems",
      description: "Solusi sistem yang disesuaikan dengan kebutuhan bisnis Anda",
      descriptionEn: "Customized system solutions tailored to your business needs",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      href: "/products",
      tech: ["Laravel", "Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "Docker", "RabbitMQ", "REST API", "Microservices"],
      techEn: ["Laravel", "Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "Docker", "RabbitMQ", "REST API", "Microservices"],
    },
    {
      title: "UI/UX Design",
      titleEn: "UI/UX Design",
      description: "Desain antarmuka yang menarik dan pengalaman pengguna yang optimal",
      descriptionEn: "Attractive interface design and optimal user experience",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
      href: "/products",
      tech: ["Figma","Adobe XD", "Sketch", "Zeplin", "ProtoPie", "Miro"],
      techEn: ["Figma","Adobe XD", "Sketch", "Zeplin", "ProtoPie", "Miro"],
//       "LottieFiles"
// "LottieFiles"
//       "Framer", 
// "Framer", 
// "Blender (3D UI)",
// "Blender (3D UI)",
    },
    // {
    //   title: "Maintenance & Support",
    //   titleEn: "Maintenance & Support",
    //   description: "Dukungan berkelanjutan untuk aplikasi dan website Anda",
    //   descriptionEn: "Ongoing support for your applications and websites",
    //   image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop",
    //   href: "/products",
    //   tech: ["AWS", "DigitalOcean", "GitHub Actions", "Docker", "CI/CD", "Sentry", "Prometheus", "Grafana", "Cloudflare", "Nginx"],
    //   techEn: ["AWS", "DigitalOcean", "GitHub Actions", "Docker", "CI/CD", "Sentry", "Prometheus", "Grafana", "Cloudflare", "Nginx"],
    // },
    {
      title: "Desain Grafis",
      titleEn: "Graphic Design",
      description: "Konsultasi profesional untuk solusi teknologi bisnis Anda",
      descriptionEn: "Professional consultation for your business technology solutions",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
      href: "/products",
      tech: ["Photoshop", "Illustrator", "Canva", "CorelDRAW", "Midjourney (AI)", "DALL·E"],
      techEn: ["Photoshop", "Illustrator", "Canva", "CorelDRAW", "Midjourney (AI)", "DALL·E"],
//       "Affinity Designer", "InDesign", "Procreate",
// "Affinity Designer", "InDesign", "Procreate",
    },
  ];

  const testimonials = [
    // {
    //   name: "Budi Santoso",
    //   title: "CEO, TechStartup Indonesia",
    //   testimonial: "DiGiat sangat profesional dan memahami kebutuhan kami. Website yang dibuat sangat memuaskan!",
    //   rating: 5,
    // },
    // {
    //   name: "Sarah Williams",
    //   title: "Product Manager, GlobalCorp",
    //   testimonial: "Excellent service and outstanding results. The mobile app exceeded our expectations!",
    //   rating: 5,
    // },
    // {
    //   name: "Ahmad Yani",
    //   title: "Mahasiswa Teknik Informatika",
    //   testimonial: "Membantu saya menyelesaikan tugas akhir dengan hasil yang memuaskan. Terima kasih DiGiat!",
    //   rating: 5,
    // },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <HeroCarousel />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">{t("Halo, Kami DiGiat", "Hello, We're DiGiat")}</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in opacity-90">{t("Penyedia layanan pembuatan website, mobile app, dan sistem.", "Provider of web, mobile app, and system development services.")}</p>
          {/* <Button
            variant="hero"
            size="lg"
            asChild
            className="animate-fade-in"
          >
            <a href="/products">
              {t("Lihat Produk", "View Products")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button> */}
        </div>
      </section>

      {/* Order Wizard Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("Mulai Proyek Anda", "Start Your Project")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda", "Fill out the form below and our team will contact you shortly")}</p>
          </div>
          <OrderWizard />
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("Layanan Kami", "Our Services")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("Solusi digital yang komprehensif untuk kebutuhan bisnis Anda", "Comprehensive digital solutions for your business needs")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map((product, index) => (
              <Card
                key={index}
                className="p-6 shadow-card hover-scale flex flex-col"
              >
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={t(product.title, product.titleEn)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-3">{t(product.title, product.titleEn)}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{t(product.description, product.descriptionEn)}</p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(product.tech || []).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button
                  className="w-full mt-auto"
                  variant="outline"
                  asChild
                >
                  {/* <a href={product.href}>{t("Selengkapnya", "Learn More")}</a> */}
                </Button>
              </Card>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <a href="/products">
                {t("Lihat Semua Produk", "View All Products")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div> */}
        </div>
      </section>

      {/* Testimonials Preview Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("Apa Kata Mereka", "What They Say")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("Testimoni dari klien yang puas dengan layanan kami", "Testimonials from clients satisfied with our services")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <a href="/testimoni">
                {t("Lihat Semua Testimoni", "View All Testimonials")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
