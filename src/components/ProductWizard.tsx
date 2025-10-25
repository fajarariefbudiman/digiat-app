import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

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
    language: "",
    database: "",
    frontend: "",
    backend: "",
    framework: "",
    hosting: false,
    domain: false,
  });

  const languages = ["PHP", "Python", "Go", "C++", "JavaScript", "TypeScript"];
  const databases = ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"];
  const frontends = ["React", "Next.js", "Vue", "Angular", "Tailwind"];
  const backends = ["Laravel", "Express.js", "Django", "FastAPI", "Spring Boot"];
  const frameworks = ["Flutter", "React Native", "Bootstrap", "Framer Motion"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order data:", { productId: product.id, ...formData });
    alert("Pesanan berhasil dikirim!");
    onClose();
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
          {/* STEP 1 - Informasi Kontak */}
          {step === 1 && (
            <div className="space-y-4">
              <Label className="block">{t("Nama Lengkap", "Full Name")}</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Label className="block">{t("Nomor Telepon", "Phone Number")}</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <Label className="block">{t("Email", "Email")}</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
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

          {/* STEP 2 - Detail Pesanan */}
          {step === 2 && (
            <div className="space-y-4">
              <Label className="block">{t("Deskripsi Pesanan", "Order Description")}</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t("Bahasa Pemrograman", "Programming Language")}</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    required
                  >
                    <option value="">-- Pilih --</option>
                    {languages.map((lang) => (
                      <option
                        key={lang}
                        value={lang}
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>{t("Database", "Database")}</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={formData.database}
                    onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                    required
                  >
                    <option value="">-- Pilih --</option>
                    {databases.map((db) => (
                      <option
                        key={db}
                        value={db}
                      >
                        {db}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>{t("Frontend", "Frontend")}</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={formData.frontend}
                    onChange={(e) => setFormData({ ...formData, frontend: e.target.value })}
                  >
                    <option value="">-- Pilih (Opsional) --</option>
                    {frontends.map((fe) => (
                      <option
                        key={fe}
                        value={fe}
                      >
                        {fe}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>{t("Backend", "Backend")}</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={formData.backend}
                    onChange={(e) => setFormData({ ...formData, backend: e.target.value })}
                  >
                    <option value="">-- Pilih (Opsional) --</option>
                    {backends.map((be) => (
                      <option
                        key={be}
                        value={be}
                      >
                        {be}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>{t("Framework Tambahan", "Additional Framework")}</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={formData.framework}
                    onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
                  >
                    <option value="">-- Pilih (Opsional) --</option>
                    {frameworks.map((fw) => (
                      <option
                        key={fw}
                        value={fw}
                      >
                        {fw}
                      </option>
                    ))}
                  </select>
                </div>
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

          {/* STEP 3 - Hosting & Domain */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hosting"
                  checked={formData.hosting}
                  onChange={(e) => setFormData({ ...formData, hosting: e.target.checked })}
                />
                <Label htmlFor="hosting">{t("Butuh hosting dari kami?", "Need hosting from us?")}</Label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="domain"
                  checked={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.checked })}
                />
                <Label htmlFor="domain">{t("Butuh domain (.com / .id)?", "Need a domain (.com / .id)?")}</Label>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("Kembali", "Back")}
                </Button>
                <Button
                  type="submit"
                  variant="hero"
                >
                  {t("Kirim Pesanan", "Submit Order")}
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
