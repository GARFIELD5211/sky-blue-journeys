import PackageComparison from "@/components/PackageComparison";
import LeadForm from "@/components/LeadForm";
import umrahImg from "@/assets/umrah-bg.jpg";
import { Landmark, Hotel, Bus, BookOpen, Calendar } from "lucide-react";
import { usePackages } from "@/hooks/useGoogleSheets";
import type { PackageData } from "@/lib/googleSheets";

const fallbackPackages: PackageData[] = [
  {
    name: "Economy", price: "$1,800", duration: "10 Days", highlight: false,
    features: [
      { label: "Return Flights (Economy)", included: true },
      { label: "Umrah Visa", included: true },
      { label: "3-Star Hotel Makkah", included: true },
      { label: "3-Star Hotel Madinah", included: true },
      { label: "Shared Transport", included: true },
      { label: "Group Ziyarat", included: true },
      { label: "Full Board Meals", included: false },
      { label: "Private Guide", included: false },
    ],
  },
  {
    name: "Premium", price: "$4,500", duration: "14 Days", highlight: true,
    features: [
      { label: "Return Flights (Business)", included: true },
      { label: "Umrah Visa", included: true },
      { label: "5-Star Hotel Makkah (Haram View)", included: true },
      { label: "5-Star Hotel Madinah", included: true },
      { label: "Private Luxury Transport", included: true },
      { label: "Private Guided Ziyarat", included: true },
      { label: "Full Board Gourmet Meals", included: true },
      { label: "24/7 Personal Concierge", included: true },
    ],
  },
];

const UmrahPackages = () => {
  const packages = usePackages("Umrah", fallbackPackages);

  return (
    <main className="pt-20">
      <section className="relative h-72 md:h-96 flex items-center">
        <div className="absolute inset-0">
          <img src={umrahImg} alt="Madinah mosque" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <span className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-wider">Year Round</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mt-2">Umrah Packages</h1>
          <p className="text-lg text-primary-foreground/80 mt-3 max-w-lg">Flexible Umrah packages available throughout the year. 7 to 21 day options with complete support.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Package Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Landmark, label: "Visa" },
              { icon: Hotel, label: "Hotels" },
              { icon: Bus, label: "Transport" },
              { icon: BookOpen, label: "Ziyarat" },
              { icon: Calendar, label: "Flexible Dates" },
            ].map((i) => (
              <div key={i.label} className="glass-card rounded-xl p-4 text-center">
                <i.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <span className="text-sm font-semibold text-foreground">{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Compare Umrah Packages</h2>
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6" style={{ minWidth: "max-content" }}>
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`w-80 shrink-0 rounded-2xl overflow-hidden ${
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
                            <span className="w-4 h-4 text-primary shrink-0">✓</span>
                          ) : (
                            <span className="w-4 h-4 text-muted-foreground/40 shrink-0">✕</span>
                          )}
                          <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>{f.label}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="/contact">
                      <button className={`w-full py-2.5 rounded-lg font-semibold text-sm ${
                        pkg.highlight
                          ? "gradient-urgent text-destructive-foreground"
                          : "gradient-primary text-primary-foreground"
                      }`}>
                        Book Now
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Book Your Umrah</h2>
              <p className="text-muted-foreground mt-2">Packages available for immediate departure.</p>
            </div>
            <LeadForm defaultService="umrah" defaultDestination="saudi-arabia" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default UmrahPackages;
