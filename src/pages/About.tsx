import { useLanguage } from "../contexts/LanguageContext";
import { Code, Palette, Zap, Shield } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Zap,
      title: t("Kreatif", "Creative"),
      description: t("Kami menghadirkan ide dan solusi yang segar untuk setiap proyek", "We bring fresh ideas and creative solutions to every project"),
    },

    {
      icon: Shield,
      title: t("Efisien", "Efficient"),
      description: t("Pengerjaan cepat tanpa mengorbankan kualitas", "Fast execution without compromising quality"),
    },
    {
      icon: Palette,
      title: t("Custom-tailored", "Custom-tailored"),
      description: t("Solusi yang disesuaikan dengan kebutuhan Anda", "Solutions tailored to your needs"),
    },
    {
      icon: Code,
      title: t("Terjangkau", "Affordable"),
      description: t("Harga kompetitif dengan hasil maksimal", "Competitive pricing with maximum results"),
    },
  ];

  const technologies = [
    { name: "HTML5", category: "Web" },
    { name: "CSS3", category: "Web" },
    { name: "JavaScript", category: "Web" },
    { name: "TypeScript", category: "Web" },
    { name: "React", category: "Web" },
    { name: "Next.js", category: "Web" },
    { name: "Vite", category: "Web" },
    { name: "Tailwind CSS", category: "Web" },
    { name: "Bootstrap 5", category: "Web" },
    { name: "Laravel", category: "Web" },
    { name: "Node.js", category: "Web" },
    { name: "Express", category: "Web" },
    { name: "FastAPI", category: "Web" },
    { name: "Golang", category: "Web" },
    { name: "REST API", category: "Web" },
    { name: "GraphQL", category: "Web" },
    { name: "Microservices", category: "Web" },

    { name: "Flutter", category: "Mobile" },
    { name: "React Native", category: "Mobile" },
    { name: "Kotlin", category: "Mobile" },
    { name: "Swift", category: "Mobile" },
    // { name: "Expo", category: "Mobile" },
    // { name: "Appwrite", category: "Mobile" },

    { name: "Python", category: "Machine Learning" },
    { name: "TensorFlow", category: "Machine Learning" },
    { name: "TFX", category: "Machine Learning" },
    { name: "MLOps", category: "Machine Learning" },

    { name: "MySQL", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Firebase", category: "Database" },
    // { name: "Supabase", category: "Database" },
    { name: "Redis", category: "Database" },

    { name: "Docker", category: "DevOps" },
    { name: "Nginx", category: "DevOps" },
    { name: "RabbitMQ", category: "DevOps" },
    { name: "Git", category: "DevOps" },
    { name: "GitHub Actions", category: "DevOps" },

    { name: "Figma", category: "Web" },
    // { name: "Framer", category: "Web" },
    { name: "Adobe XD", category: "Web" },
    { name: "Sketch", category: "Web" },
    { name: "Zeplin", category: "Web" },
    // { name: "ProtoPie", category: "Web" },
    { name: "Miro", category: "Web" },
    // { name: "Blender (3D UI)", category: "Web" },
    // { name: "LottieFiles", category: "Web" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("Tentang DiGiat", "About DiGiat")}</h1>
            <p className="text-lg text-muted-foreground">
              {t(
                "DiGiat adalah penyedia solusi digital yang mengkhususkan diri dalam pengembangan website, aplikasi mobile, dan sistem. Kami menggabungkan kreativitas, teknologi, dan strategi untuk membantu klien mewujudkan ide mereka.",
                "DiGiat is a digital solution provider specializing in website, mobile app, and system development. We combine creativity, technology, and strategy to help clients bring their ideas to life."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("Nilai-Nilai Kami", "Our Values")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card shadow-card hover-scale"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("Teknologi & Keahlian", "Technologies & Skills")}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-lg shadow-card text-center hover-scale"
                >
                  <div className="text-sm text-muted-foreground mb-1">{tech.category}</div>
                  <div className="font-semibold">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Kolom kiri — logo */}
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-8">
                <div className="text-center">
                  <img
                    src="/img/digiat.png"
                    alt="DiGiat Logo"
                    className="mx-auto mb-4 w-48 h-48 object-contain"
                  />
                  <p className="text-lg font-semibold">{t("Tim Kami", "Our Team")}</p>
                </div>
              </div>

              {/* Kolom kanan — deskripsi */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{t("Berpengalaman & Berdedikasi", "Experienced & Dedicated")}</h3>
                <p className="text-muted-foreground mb-4">
                  {t(
                    "Tim DiGiat adalah kumpulan developer, designer, dan project manager yang antusias, siap membantu Anda mewujudkan ide digital menjadi nyata.",
                    "The DiGiat team is a group of enthusiastic developers, designers, and project managers ready to help bring your digital ideas to life."
                  )}
                </p>
                <p className="text-muted-foreground">
                  {t(
                    "Kami selalu belajar dan mengikuti perkembangan teknologi terbaru untuk memberikan solusi yang praktis dan bermanfaat bagi proyek Anda.",
                    "We’re always learning and keeping up with the latest technologies to provide practical, helpful solutions for your projects."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
