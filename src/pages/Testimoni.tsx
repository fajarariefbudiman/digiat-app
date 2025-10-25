import { useLanguage } from "../contexts/LanguageContext";
import { TestimonialCard } from "../components/TestimonialCard";
import { Button } from "../components/ui/button";

export default function Testimoni() {
  const { t } = useLanguage();

  const testimonials = [
    // {
    //   name: "Budi Santoso",
    //   title: "CEO, TechStartup Indonesia",
    //   testimonial: t(
    //     "DiGiat sangat profesional dan memahami kebutuhan kami. Website yang dibuat sangat memuaskan dan meningkatkan kredibilitas perusahaan kami!",
    //     "DiGiat is very professional and understands our needs. The website they created is very satisfying and has increased our company's credibility!"
    //   ),
    //   rating: 5,
    // },
    // {
    //   name: "Sarah Williams",
    //   title: "Product Manager, GlobalCorp",
    //   testimonial: t("Pelayanan yang luar biasa dan hasil yang melampaui ekspektasi. Aplikasi mobile yang dibuat sangat user-friendly!", "Excellent service and outstanding results. The mobile app exceeded our expectations and is very user-friendly!"),
    //   rating: 5,
    // },
    // {
    //   name: "Ahmad Yani",
    //   title: t("Mahasiswa Teknik Informatika", "Computer Science Student"),
    //   testimonial: t(
    //     "Membantu saya menyelesaikan tugas akhir dengan hasil yang memuaskan. Tim sangat responsif dan supportive. Terima kasih DiGiat!",
    //     "Helped me complete my thesis with satisfying results. The team was very responsive and supportive. Thank you DiGiat!"
    //   ),
    //   rating: 5,
    // },
    // {
    //   name: "Linda Wijaya",
    //   title: t("Pemilik Butik Online", "Online Boutique Owner"),
    //   testimonial: t(
    //     "Website e-commerce yang dibuat DiGiat sangat membantu meningkatkan penjualan kami. Fitur-fiturnya lengkap dan mudah digunakan.",
    //     "The e-commerce website created by DiGiat has greatly helped increase our sales. The features are complete and easy to use."
    //   ),
    //   rating: 5,
    // },
    // {
    //   name: "Michael Chen",
    //   title: "CTO, StartupXYZ",
    //   testimonial: t("Kualitas kode yang bersih dan well-documented. Sistem yang dibuat scalable dan mudah untuk dikembangkan lebih lanjut.", "Clean and well-documented code quality. The system is scalable and easy to develop further."),
    //   rating: 5,
    // },
    // {
    //   name: "Siti Nurhaliza",
    //   title: t("Dosen Universitas", "University Lecturer"),
    //   testimonial: t(
    //     "Sistem informasi akademik yang dibuat sangat membantu administrasi kampus. Interface-nya intuitif dan mudah digunakan oleh staff.",
    //     "The academic information system created is very helpful for campus administration. The interface is intuitive and easy for staff to use."
    //   ),
    //   rating: 5,
    // },
    // {
    //   name: "David Anderson",
    //   title: "Marketing Director",
    //   testimonial: t(
    //     "Desain UI/UX yang modern dan menarik. DiGiat benar-benar memahami target market kami dan menciptakan experience yang tepat.",
    //     "Modern and attractive UI/UX design. DiGiat really understands our target market and creates the right experience."
    //   ),
    //   rating: 5,
    // },
    // {
    //   name: "Rina Permata",
    //   title: t("Pengusaha UMKM", "SME Entrepreneur"),
    //   testimonial: t(
    //     "Harga yang sangat terjangkau untuk kualitas yang didapat. Aplikasi mobile untuk bisnis saya sangat membantu menjangkau lebih banyak pelanggan.",
    //     "Very affordable price for the quality received. The mobile app for my business really helps reach more customers."
    //   ),
    //   rating: 5,
    // },
    // {
    //   name: "Thomas Gunawan",
    //   title: t("Manajer IT", "IT Manager"),
    //   testimonial: t(
    //     "Tim yang responsif dan komunikatif. Setiap update progress disampaikan dengan jelas. Maintenance support juga sangat baik.",
    //     "Responsive and communicative team. Every progress update is clearly communicated. Maintenance support is also very good."
    //   ),
    //   rating: 5,
    // },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("Testimoni Klien", "Client Testimonials")}</h1>
            <p className="text-lg text-muted-foreground">{t("Dengar langsung dari klien yang puas dengan layanan kami", "Hear directly from clients satisfied with our services")}</p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("Ingin Menjadi Klien Kami Selanjutnya?", "Want to Be Our Next Client?")}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t("Bergabunglah dengan ratusan klien yang puas dengan layanan kami", "Join hundreds of clients satisfied with our services")}</p>
            <Button
              variant="hero"
              size="lg"
              asChild
            >
              <a href="/contact">{t("Hubungi Kami Sekarang", "Contact Us Now")}</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
