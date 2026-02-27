import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  image?: string;
  badge?: string;
}

const ServiceCard = ({ icon: Icon, title, description, link, image, badge }: ServiceCardProps) => {
  return (
    <Link to={link} className="group block">
      <div className="glass-card-hover rounded-2xl overflow-hidden">
        {image && (
          <div className="h-48 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            {badge && (
              <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full gradient-urgent text-destructive-foreground">
                {badge}
              </span>
            )}
          </div>
        )}
        <div className="p-6">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
            Learn More <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
