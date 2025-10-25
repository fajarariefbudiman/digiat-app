import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-20">
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-bold text-gradient">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">{t("Halaman Tidak Ditemukan", "Page Not Found")}</h2>
        <p className="mb-8 text-xl text-muted-foreground max-w-md mx-auto">{t("Maaf, halaman yang Anda cari tidak dapat ditemukan.", "Sorry, the page you are looking for could not be found.")}</p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <a href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t("Kembali", "Go Back")}
            </a>
          </Button>
          <Button
            variant="hero"
            size="lg"
            asChild
          >
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              {t("Ke Beranda", "Go Home")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
