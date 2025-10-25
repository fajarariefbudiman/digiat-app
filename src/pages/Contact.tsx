import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Linkedin, Github, Instagram, MessageCircle } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "e00dccbb-6fcc-4c90-839a-5f843b33f7df");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(t("Pesan berhasil dikirim — tim kami akan segera menghubungi Anda.", "Message sent successfully — our team will contact you soon."));
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(t("Terjadi kesalahan. Silakan coba lagi.", "An error occurred. Please try again."));
      }
    } catch (error) {
      toast.error(t("Terjadi kesalahan. Silakan coba lagi.", "An error occurred. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/digiatid", label: "Instagram", color: "hover:text-[#E4405F]" },
    { icon: MessageCircle, href: "https://wa.me/6283873630760", label: "WhatsApp", color: "hover:text-[#25D366]" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("Hubungi Kami", "Contact Us")}</h1>
            <p className="text-lg text-muted-foreground">{t("Ada pertanyaan atau ingin memulai proyek? Kami siap membantu Anda", "Have questions or want to start a project? We are ready to help you")}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 shadow-card">
              <h2 className="text-2xl font-bold mb-6">{t("Kirim Pesan", "Send Message")}</h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="name">{t("Nama", "Name")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("Email", "Email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">{t("Subjek", "Subject")} *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t("Pesan", "Message")} *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  variant="hero"
                >
                  {isSubmitting ? t("Mengirim...", "Sending...") : t("Kirim Pesan", "Send Message")}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("Informasi Kontak", "Contact Information")}</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t("Telepon", "Phone")}</h3>
                      <p className="text-muted-foreground">+62 838-7363-0760</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">{t("Ikuti Kami", "Follow Us")}</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
