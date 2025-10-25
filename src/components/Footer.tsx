import { useLanguage } from '../contexts/LanguageContext';
import { Linkedin, Github, Instagram, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://wa.me/6281234567890', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">DiGiat</h3>
            <p className="text-muted-foreground">
              {t(
                'Penyedia layanan pembuatan website, mobile app, dan sistem. Mengubah ide Anda menjadi kenyataan.',
                'Provider of web, mobile app, and system development services. Transform your ideas into reality.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('Tautan Cepat', 'Quick Links')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-smooth">{t('Beranda', 'Home')}</a></li>
              <li><a href="/about" className="hover:text-primary transition-smooth">{t('Tentang', 'About')}</a></li>
              <li><a href="/sample" className="hover:text-primary transition-smooth">{t('Portofolio', 'Sample')}</a></li>
              <li><a href="/products" className="hover:text-primary transition-smooth">{t('Produk', 'Products')}</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('Ikuti Kami', 'Follow Us')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DiGiat. {t('Hak Cipta Dilindungi.', 'All Rights Reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};
