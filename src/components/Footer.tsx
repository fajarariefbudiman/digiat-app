import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border bg-background">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground">
          © {currentYear} {t('hero.name')}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
