import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: t("Beranda", "Home") },
    { path: "/about", label: t("Tentang", "About") },
    // { path: "/sample", label: t("Portofolio", "Sample") },
    { path: "/products", label: t("Produk", "Products") },
    { path: "/testimoni", label: t("Testimoni", "Testimonials") },
    { path: "/contact", label: t("Kontak", "Contact") },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-card" : "md:bg-transparent bg-background shadow-sm"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
          >
            <img
              src="/img/digiat.png"
              alt="DiGiat Logo"
              className="h-8 w-auto md:h-10 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "inline";
              }}
            />
            <span className="text-2xl font-bold text-gradient">DiGiat</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-smooth ${location.pathname === link.path ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={t("Ubah tema", "Toggle theme")}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              className="rounded-full font-semibold"
            >
              {language === "id" ? "EN" : "ID"}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t("Menu", "Menu")}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-smooth ${location.pathname === link.path ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
