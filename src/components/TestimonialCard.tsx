import { Card } from "../components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  title: string;
  testimonial: string;
  rating: number;
  image?: string;
}

export const TestimonialCard = ({ name, title, testimonial, rating, image }: TestimonialCardProps) => {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center space-x-4 mb-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">{name.charAt(0)}</span>
          </div>
        )}
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`}
          />
        ))}
      </div>
      <p className="text-muted-foreground italic">"{testimonial}"</p>
    </Card>
  );
};
