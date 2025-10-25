import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  href: string;
}

export const ProductCard = ({ title, titleEn, description, descriptionEn, image, href }: ProductCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden shadow-card hover-scale group">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={t(title, titleEn)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{t(title, titleEn)}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{t(description, descriptionEn)}</p>
        <Button
          variant="ghost"
          className="p-0 h-auto hover:text-primary"
          asChild
        >
          <a href={href}>
            {t("Pelajari Lebih Lanjut", "Learn More")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </Card>
  );
};
