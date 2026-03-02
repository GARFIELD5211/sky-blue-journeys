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
          <PackageComparison title="Compare Umrah Packages" packages={packages} />
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
