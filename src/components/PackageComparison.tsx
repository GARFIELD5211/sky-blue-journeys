import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PackageTier {
  name: string;
  price: string;
  duration: string;
  features: { label: string; included: boolean }[];
  highlight?: boolean;
}

interface PackageComparisonProps {
  title: string;
  packages: PackageTier[];
}

const PackageComparison = ({ title, packages }: PackageComparisonProps) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-2xl overflow-hidden ${
              pkg.highlight
                ? "ring-2 ring-primary shadow-xl shadow-primary/10 glass-card"
                : "glass-card"
            }`}
          >
            {pkg.highlight && (
              <div className="gradient-primary text-primary-foreground text-center text-xs font-bold py-1.5 tracking-wider uppercase">
                Most Popular
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{pkg.duration}</p>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-foreground">{pkg.price}</span>
                <span className="text-sm text-muted-foreground"> / person</span>
              </div>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2.5 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>{f.label}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button
                  className={`w-full font-semibold ${
                    pkg.highlight
                      ? "gradient-urgent border-0 text-destructive-foreground hover:opacity-90"
                      : "gradient-primary border-0 text-primary-foreground hover:opacity-90"
                  }`}
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageComparison;
