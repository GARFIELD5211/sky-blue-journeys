import LeadForm from "@/components/LeadForm";
import umrahImg from "@/assets/umrah-bg.jpg";
import { Landmark, Hotel, Bus, BookOpen, Calendar, Check, X, Loader2, MapPin, BedDouble, UtensilsCrossed, Users } from "lucide-react";
import { usePackages } from "@/hooks/useGoogleSheets";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UmrahPackages = () => {
  const { packages, isLoading } = usePackages("Umrah");

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

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading packages...</span>
            </div>
          )}

          {!isLoading && packages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No packages available at the moment. Check back soon!</p>
            </div>
          )}

          {packages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {packages.map((pkg) => (
                <div key={pkg.name} className={`rounded-2xl overflow-hidden h-full ${
                  pkg.highlight ? "ring-2 ring-primary shadow-xl shadow-primary/10 glass-card" : "glass-card"
                }`}>
                  {pkg.highlight && (
                    <div className="gradient-primary text-primary-foreground text-center text-xs font-bold py-1.5 tracking-wider uppercase">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.duration}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-extrabold text-foreground">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground"> / person</span>
                    </div>

                    {/* Detail fields */}
                    <div className="space-y-2 mb-4 text-sm">
                      {pkg.hotel && (
                        <div className="flex items-center gap-2 text-foreground">
                          <Hotel className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">Hotel:</span>
                          <span className="font-medium">{pkg.hotel}</span>
                        </div>
                      )}
                      {pkg.distanceFromHaram && (
                        <div className="flex items-center gap-2 text-foreground">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">Distance:</span>
                          <span className="font-medium">{pkg.distanceFromHaram}</span>
                        </div>
                      )}
                      {pkg.roomSharing && (
                        <div className="flex items-center gap-2 text-foreground">
                          <BedDouble className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">Room:</span>
                          <span className="font-medium">{pkg.roomSharing}</span>
                        </div>
                      )}
                      {pkg.meals && (
                        <div className="flex items-center gap-2 text-foreground">
                          <UtensilsCrossed className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">Meals:</span>
                          <span className="font-medium">{pkg.meals}</span>
                        </div>
                      )}
                      {pkg.transport && (
                        <div className="flex items-center gap-2 text-foreground">
                          <Bus className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">Transport:</span>
                          <span className="font-medium">{pkg.transport}</span>
                        </div>
                      )}
                      {pkg.guide && (
                        <div className="flex items-center gap-2 text-foreground">
                          <Users className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">Guide:</span>
                          <span className="font-medium">{pkg.guide}</span>
                        </div>
                      )}
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
                      <Button className={`w-full font-semibold ${
                        pkg.highlight
                          ? "gradient-urgent border-0 text-destructive-foreground hover:opacity-90"
                          : "gradient-primary border-0 text-primary-foreground hover:opacity-90"
                      }`}>
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
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
