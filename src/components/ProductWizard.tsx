import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

interface ProductWizardProps {
  product: any;
  onClose: () => void;
}

export const ProductWizard = ({ product, onClose }: ProductWizardProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    deliveryType: "zip",
    customDesign: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const deliveryText = formData.deliveryType === "zip" ? "Template ZIP" : "Hosting + Domain";
    const designText = formData.customDesign ? "Dengan Custom Desain" : "Tanpa Custom Desain (pakai template)";

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "e00dccbb-6fcc-4c90-839a-5f843b33f7df");
    formDataToSend.append("productId", product?.id || "");
    formDataToSend.append("productName", product?.title || "");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("deliveryType", deliveryText);
    formDataToSend.append("customDesign", designText);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(t("Pesanan berhasil dikirim!", "Order submitted successfully!"), {
          description: t("Kami akan menghubungi Anda untuk konfirmasi detail dan pembayaran.", "We’ll contact you for confirmation and payment details."),
        });

        setFormData({
          name: "",
          phone: "",
          email: "",
          description: "",
          deliveryType: "zip",
          customDesign: false,
        });
        setStep(1);
        onClose();
      } else {
        toast.error(t("Terjadi kesalahan. Silakan coba lagi.", "An error occurred. Please try again."));
      }
    } catch (error) {
      toast.error(t("Terjadi kesalahan. Silakan coba lagi.", "An error occurred. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={!!product}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold">
            {t("Form Pemesanan", "Order Form")} — {product?.title || "Custom Project"}
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="relative flex items-center justify-between mb-6 px-6">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500"
            style={{
              width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
            }}
          />
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="relative flex flex-col items-center flex-1 z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 transition-all ${step >= num ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-secondary"}`}
              >
                {step > num ? <Check className="h-5 w-5" /> : num}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 px-6 pb-6"
        >
          {/* STEP 1 - Kontak */}
          {step === 1 && (
            <div className="space-y-4">
              <Label>{t("Nama Lengkap", "Full Name")}</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Label>{t("Nomor Telepon", "Phone Number")}</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <Label>{t("Email", "Email")}</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Label>{t("Deskripsi Proyek (opsional)", "Project Description (optional)")}</Label>
              <Textarea
                placeholder={t("Ceritakan singkat kebutuhan Anda...", "Describe your needs briefly...")}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <div className="flex justify-end">
                <Button
                  variant="hero"
                  onClick={() => setStep(2)}
                >
                  {t("Lanjut", "Next")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 - Pilih metode deliver */}
          {step === 2 && (
            <div className="space-y-6">
              <Label className="text-base mb-2 block">{t("Pilih Jenis Produk", "Choose Delivery Type")}</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: "zip",
                    title: t("Template ZIP", "Template ZIP"),
                    desc: t("File siap pakai yang bisa Anda upload sendiri.", "Ready-to-use file for self-hosting."),
                  },
                  {
                    id: "hosting",
                    title: t("Hosting + Domain", "Hosting + Domain"),
                    desc: t("Kami bantu deploy dan sediakan domain Anda.", "We handle hosting and domain setup."),
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: opt.id })}
                    className={`p-5 rounded-lg border-2 text-left transition ${formData.deliveryType === opt.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  >
                    <p className="font-semibold">{opt.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("Kembali", "Back")}
                </Button>
                <Button
                  variant="hero"
                  onClick={() => setStep(3)}
                >
                  {t("Lanjut", "Next")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 - Pilih custom desain */}
          {step === 3 && (
            <div className="space-y-6">
              <Label className="text-base mb-2 block">{t("Apakah ingin Custom Desain?", "Do you want a Custom Design?")}</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, customDesign: true })}
                  className={`p-5 rounded-lg border-2 text-left transition ${formData.customDesign ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                >
                  <p className="font-semibold">{t("Ya, saya ingin Custom Desain", "Yes, I want Custom Design")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("Desain dan fitur dibuat sesuai kebutuhan Anda.", "Design and features tailored to your needs.")}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, customDesign: false })}
                  className={`p-5 rounded-lg border-2 text-left transition ${!formData.customDesign ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                >
                  <p className="font-semibold">{t("Tidak, pakai template saja", "No, use existing template")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("Langsung gunakan template tanpa perubahan desain.", "Use template as-is without changes.")}</p>
                </button>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("Kembali", "Back")}
                </Button>

                <Button
                  type="submit"
                  variant="hero"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("Mengirim...", "Submitting...") : t("Kirim Pesanan", "Submit Order")}
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
