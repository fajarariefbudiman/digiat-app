import { Button } from '../components/ui/button';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const heroImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80',
];

export const Hero = () => {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in space-y-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            {t('hero.greeting')}{' '}
            <span className="text-primary">{t('hero.name')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            {t('hero.role')}
          </p>
          <Button
            size="lg"
            onClick={scrollToPortfolio}
            className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-lg"
          >
            {t('hero.cta')}
          </Button>
        </div>

        <button
          onClick={scrollToPortfolio}
          className="absolute bottom-8 animate-bounce"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentImage ? 'w-8 bg-primary' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
