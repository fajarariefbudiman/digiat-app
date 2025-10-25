import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

type UserType = "student" | "professional" | null;

interface FormData {
  userType: UserType;
  addon: string;
  services: string[];
  fullName: string;
  phone: string;
  address: string;
  university: string;
  taskDescription: string;
  file: File | null;
  notes: string;
  deadline: string;
  agreedToContact: boolean;
}

export const OrderWizard = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    userType: null,
    services: [],
    addon: "",
    fullName: "",
    phone: "",
    address: "",
    university: "",
    taskDescription: "",
    file: null,
    notes: "",
    deadline: "",
    agreedToContact: false,
  });

  const serviceOptions = {
    student: [
      { id: "college-web", label: t("Proyek Kuliah (Website)", "College Project (Website)"), price: "Rp 499.000 – Rp 999.000" },
      { id: "college-mobile", label: t("Proyek Kuliah (Mobile)", "College Project (Mobile)"), price: "Rp 599.000 – Rp 1.299.000" },
      { id: "simple-app", label: t("Aplikasi Sederhana", "Simple App"), price: "Rp 99.000 – Rp 299.000" },
      { id: "academic-system", label: t("Sistem Akademik (Dasar)", "Academic System (Basic)"), price: "Rp 499.000 – Rp 1.199.000" },
      { id: "design-graphic", label: t("Desain Grafis / Poster", "Graphic Design / Poster"), price: "Rp 99.000 – Rp 499.000" },
      { id: "design-uiux", label: t("Desain UI/UX", "UI/UX Design"), price: "Rp 299.000 – Rp 899.000" },
      { id: "ml-project", label: t("Proyek Machine Learning (Dasar)", "Machine Learning Project (Basic)"), price: "Rp 199.000 – Rp 699.000" },
      { id: "data-analysis", label: t("Analisis Data / AI Dasar", "Data Analysis / Basic AI"), price: "Rp 99.000 – Rp 499.000" },
    ],

    professional: [
      { id: "company-web", label: t("Website Perusahaan / Portofolio", "Company Website / Portfolio"), price: "Rp 3.000.000 – Rp 6.000.000" },
      { id: "mobile-app", label: t("Aplikasi Mobile (Bisnis)", "Mobile App (Business)"), price: "Rp 3.000.000 – Rp 10.000.000" },
      { id: "landing-page", label: t("Landing Page", "Landing Page"), price: "Rp 1.000.000 – Rp 3.000.000" },
      { id: "custom-system", label: t("Sistem Custom", "Custom System"), price: "Rp 5.000.000 – Rp 15.000.000" },
      { id: "design-branding", label: t("Desain Brand / Identitas Visual", "Brand / Visual Identity Design"), price: "Rp 800.000 – Rp 2.500.000" },
      { id: "design-uiux-pro", label: t("Desain UI/UX", "UI/UX Design"), price: "Rp 1.000.000 – Rp 4.000.000" },
    ],
  };

  const addonOptions = {
    student: [
      {
        id: "hosting",
        label: t("Hosting (Online)", "Hosting (Online)"),
        price: "Tambah Rp 99.000 – Rp 300.000",
        note: t(
          "Untuk demo online (maks. 6 bulan), cocok untuk tugas kuliah berbasis web. Harga menyesuaikan kebutuhan aplikasi seperti ukuran database dan traffic pengguna.",
          "For online demo (up to 6 months), suitable for web-based university projects. Price depends on app needs such as database size and user traffic."
        ),
      },
      {
        id: "local",
        label: t("Local / Offline", "Local / Offline"),
        price: "Gratis",
        note: t("Dijalankan di localhost tanpa biaya tambahan. Tidak memerlukan koneksi internet atau domain.", "Runs locally (XAMPP, Laragon, etc.) with no extra cost. No internet or domain required."),
      },
    ],

    professional: [
      {
        id: "hosting",
        label: t("Hosting", "Hosting"),
        price: "Tambah Rp 300.000 – Rp 600.000 / tahun",
        note: t(
          "Server online dengan durasi tahunan untuk publikasi website atau sistem. Harga menyesuaikan kebutuhan aplikasi seperti resource server, database, dan keamanan.",
          "Annual online server for website or system publication. Price depends on app requirements such as server resources, database, and security."
        ),
      },
      {
        id: "domain",
        label: t("Domain (.com / .id)", "Domain (.com / .id)"),
        price: "Tambah Rp 150.000 – Rp 300.000 / tahun",
        note: t("Nama domain kustom tahunan seperti perusahaananda.com. Harga dapat bervariasi tergantung ekstensi dan registrar.", "Annual custom domain like yourcompany.com. Price may vary depending on extension and registrar."),
      },
    ],
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId) ? prev.services.filter((s) => s !== serviceId) : [...prev.services, serviceId],
    }));
  };

  const handleAddonToggle = (addonId: string) => {
    setFormData((prev) => ({
      ...prev,
      addon: prev.addon === addonId ? "" : addonId,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error(t("Hanya file PDF yang diperbolehkan", "Only PDF files are allowed"));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(t("Ukuran file maksimal 10MB", "Maximum file size is 10MB"));
        return;
      }
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "");
    formDataToSend.append("userType", formData.userType || "");
    formDataToSend.append("services", formData.services.join(", "));
    formDataToSend.append("addon", formData.addon);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    if (formData.userType === "student") {
      formDataToSend.append("university", formData.university);
    }
    formDataToSend.append("taskDescription", formData.taskDescription);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }
    formDataToSend.append("notes", formData.notes);
    formDataToSend.append("deadline", formData.deadline);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(t("Terima kasih — pesanan Anda sudah diterima. Tim DiGiat akan segera menghubungi Anda.", "Thank you — your order has been received. The DiGiat team will contact you shortly."));
        // Reset form
        setFormData({
          userType: null,
          services: [],
          addon: "",
          fullName: "",
          phone: "",
          address: "",
          university: "",
          taskDescription: "",
          file: null,
          notes: "",
          deadline: "",
          agreedToContact: false,
        });
        setStep(1);
      } else {
        toast.error(t("Terjadi kesalahan. Silakan coba lagi.", "An error occurred. Please try again."));
      }
    } catch (error) {
      toast.error(t("Terjadi kesalahan. Silakan coba lagi.", "An error occurred. Please try again."));
    }
  };

  const canProceedStep1 = formData.userType && formData.services.length > 0;
  const canProceedStep2 = formData.fullName && formData.phone && formData.address && (formData.userType !== "student" || formData.university);
  const canSubmit = formData.taskDescription && formData.deadline && formData.agreedToContact && (formData.userType !== "student" || formData.file);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="p-6 md:p-8 shadow-card">
        <div className="mb-8">
          {/* Wrapper progress stepper */}
          <div className="relative flex items-center justify-between mb-4">
            {/* Garis utama (background) */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary -translate-y-1/2" />

            {/* Garis aktif dinamis */}
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500"
              style={{
                width: step === 1 ? "0%" : step === 2 ? "50%" : step === 3 ? "100%" : "0%",
              }}
            />

            {/* Step circles */}
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

          {/* Step label */}
          <p className="text-center text-sm text-muted-foreground">
            {step === 1 && t("Kategori & Jenis Layanan", "Category & Service Type")}
            {step === 2 && t("Detail Kontak", "Contact Details")}
            {step === 3 && t("Detail Tugas", "Task Details")}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Category & Service Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">{t("Pilih Kategori Anda", "Select Your Category")}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, userType: "student", services: [] }))}
                    className={`p-6 rounded-lg border-2 transition-smooth text-left ${formData.userType === "student" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  >
                    <h3 className="font-semibold text-lg mb-2">{t("Mahasiswa", "Student")}</h3>
                    <p className="text-sm text-muted-foreground">{t("Untuk proyek kuliah dan tugas akademik", "For college projects and academic tasks")}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, userType: "professional", services: [] }))}
                    className={`p-6 rounded-lg border-2 transition-smooth text-left ${formData.userType === "professional" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  >
                    <h3 className="font-semibold text-lg mb-2">{t("Non-Mahasiswa", "Organization / Professional")}</h3>
                    <p className="text-sm text-muted-foreground">{t("Untuk bisnis dan organisasi", "For business and organizations")}</p>
                  </button>
                </div>
              </div>

              {formData.userType && (
                <>
                  <div>
                    <Label className="text-base mb-4 block">{t("Pilih Layanan (bisa lebih dari satu)", "Select Services (multiple allowed)")}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOptions[formData.userType].map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleServiceToggle(service.id)}
                          className={`p-4 rounded-lg border-2 transition-smooth text-left ${formData.services.includes(service.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                        >
                          <div>
                            <p className="font-medium">{service.label}</p>
                            <p className="text-sm text-muted-foreground mt-1">{service.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 🔧 Add-ons */}
                  <div className="mt-8">
                    <Label className="text-base mb-4 block">{t("Tambahan Opsional", "Optional Add-ons")}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {addonOptions[formData.userType].map((addon) => (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => handleAddonToggle(addon.id)}
                          className={`p-4 rounded-lg border-2 transition-smooth text-left ${formData.addon?.includes(addon.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                        >
                          <div>
                            <p className="font-medium">{addon.label}</p>
                            <p className="text-sm text-muted-foreground">{addon.price}</p>
                            <p className="text-xs text-muted-foreground mt-1 italic">{addon.note}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  variant="hero"
                >
                  {t("Lanjut", "Next")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">{t("Nama Lengkap", "Full Name")} *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">{t("Nomor Telepon", "Phone Number")} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">{t("Alamat", "Address")} *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>

              {formData.userType === "student" && (
                <div>
                  <Label htmlFor="university">{t("Universitas", "University")} *</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => setFormData((prev) => ({ ...prev, university: e.target.value }))}
                    required
                  />
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("Kembali", "Back")}
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  variant="hero"
                >
                  {t("Lanjut", "Next")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Task Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskDescription">{t("Deskripsi Tugas", "Task Description")} *</Label>
                <Textarea
                  id="taskDescription"
                  value={formData.taskDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, taskDescription: e.target.value }))}
                  rows={5}
                  required
                />
              </div>

              {formData.userType === "student" && (
                <div>
                  <Label htmlFor="file">{t("Upload File (PDF, Max 10MB)", "Upload File (PDF, Max 10MB)")} *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  {formData.file && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {t("File dipilih:", "File selected:")} {formData.file.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="notes">{t("Catatan (Opsional)", "Notes (Optional)")}</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="deadline">{t("Tenggat Waktu", "Deadline")} *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreedToContact"
                  checked={formData.agreedToContact}
                  onChange={(e) => setFormData((prev) => ({ ...prev, agreedToContact: e.target.checked }))}
                  className="mt-1"
                  required
                />
                <Label
                  htmlFor="agreedToContact"
                  className="font-normal cursor-pointer"
                >
                  {t("Saya setuju untuk dihubungi via WhatsApp/Email.", "I agree to be contacted via WhatsApp/Email.")}
                </Label>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("Kembali", "Back")}
                </Button>
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  variant="hero"
                >
                  {t("Kirim Pesanan", "Submit Order")}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};
