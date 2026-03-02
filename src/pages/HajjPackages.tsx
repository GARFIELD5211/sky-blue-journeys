import PackageComparison from "@/components/PackageComparison";
import LeadForm from "@/components/LeadForm";
import heroImg from "@/assets/hero-hajj.jpg";
import { Landmark, Hotel, UtensilsCrossed, Bus, BookOpen } from "lucide-react";
import { usePackages } from "@/hooks/useGoogleSheets";
import type { PackageData } from "@/lib/googleSheets";

const fallbackPackages: PackageData[] = [
  {
    name: "Economy", price: "$4,500", duration: "21 Days", highlight: false,
    features: [
      { label: "Return Flights", included: true },
      { label: "Hajj Visa Processing", included: true },
      { label: "Mina & Arafat Tent", included: true },
      { label: "Guided Ziyarat", included: true },
      { label: "3-Star Hotel Makkah", included: true },
      { label: "3-Star Hotel Madinah", included: true },
      { label: "Full Board Meals", included: false },
      { label: "VIP Transport", included: false },
      { label: "5-Star Hotels", included: false },
    ],
  },
  {
    name: "Standard", price: "$6,500", duration: "21 Days", highlight: true,
    features: [
      { label: "Return Flights", included: true },
      { label: "Hajj Visa Processing", included: true },
      { label: "Standard Mina Tent", included: true },
      { label: "Group Ziyarat", included: true },
      { label: "4-Star Hotel Makkah", included: true },
      { label: "4-Star Hotel Madinah", included: true },
      { label: "Breakfast & Dinner", included: true },
      { label: "Shared Transport", included: true },
      { label: "24/7 Concierge Support", included: false },
    ],
  },
  {
    name: "Premium", price: "$12,000", duration: "25 Days", highlight: false,
    features: [
      { label: "Return Flights (Business)", included: true },
      { label: "Hajj Visa Processing", included: true },
      { label: "VIP Mina & Arafat Tent", included: true },
      { label: "Private Guided Ziyarat", included: true },
      { label: "5-Star Hotel Makkah (Haram View)", included: true },
      { label: "5-Star Hotel Madinah", included: true },
      { label: "Full Board Gourmet Meals", included: true },
      { label: "VIP Private Transport", included: true },
      { label: "24/7 Concierge Support", included: true },
    ],
  },
];

const HajjPackages = () => {
  const packages = usePackages("Hajj", fallbackPackages);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Hajj pilgrimage" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <span className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-wider">Sacred Journey</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mt-2">Hajj Packages 2026</h1>
          <p className="text-lg text-primary-foreground/80 mt-3 max-w-lg">Choose from Economy, Standard, or Premium packages — all with complete support from departure to return.</p>
        </div>
      </section>

      {/* Inclusions */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">What's Included</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Landmark, label: "Visa" },
              { icon: Hotel, label: "Hotels" },
              { icon: UtensilsCrossed, label: "Meals" },
              { icon: Bus, label: "Transport" },
              { icon: BookOpen, label: "Ziyarat" },
            ].map((i) => (
              <div key={i.label} className="glass-card rounded-xl p-4 text-center">
                <i.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <span className="text-sm font-semibold text-foreground">{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto">
          <PackageComparison title="Compare Hajj Packages" packages={packages} />
        </div>
      </section>

      {/* CTA Form */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Book Your Hajj Package</h2>
              <p className="text-muted-foreground mt-2">Limited seats available for Hajj 2026. Reserve yours now!</p>
            </div>
            <LeadForm defaultService="hajj" defaultDestination="saudi-arabia" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HajjPackages;
