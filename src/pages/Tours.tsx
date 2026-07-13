import { useTours } from "@/hooks/useGoogleSheets";
import LeadForm from "@/components/LeadForm";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Clock, Rs , Plane, Hotel, Users, UtensilsCrossed, Bus, UserCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TourGridSkeleton } from "@/components/LoadingSkeletons";

const Tours = () => {
  const { tours, isLoading } = useTours();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center bg-gradient-to-br from-primary/20 to-accent/30">
        <div className="relative z-10 container mx-auto px-4">
          <ScrollReveal>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Explore the World</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Tours & Packages</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-lg">
              Discover curated tour packages to breathtaking destinations worldwide.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Available Tours</h2>
          </ScrollReveal>

          {isLoading && <TourGridSkeleton count={3} />}

          {!isLoading && tours.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No tours available at the moment. Check back soon!</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tours.map((tour, idx) => (
              <ScrollReveal key={tour.name + tour.from} delay={idx * 0.1}>
                <div className="glass-card rounded-2xl overflow-hidden group h-full border border-border transition-all duration-300 hover:border-primary">
                  {tour.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">{tour.name}</h3>
                      {tour.packageType && (
                        <Badge variant="secondary" className="text-xs">{tour.packageType}</Badge>
                      )}
                    </div>

                    {(tour.from || tour.to) && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                        <Plane className="w-4 h-4 text-primary" />
                        {tour.from}{tour.from && tour.to && " → "}{tour.to}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      {tour.duration && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-primary" /> {tour.duration}
                        </div>
                      )}
                      {tour.days && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 text-primary" /> {tour.days} Days
                        </div>
                      )}
                      {tour.hotel && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Hotel className="w-3.5 h-3.5 text-primary" /> {tour.hotel}
                        </div>
                      )}
                      {tour.roomSharing && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="w-3.5 h-3.5 text-primary" /> {tour.roomSharing}
                        </div>
                      )}
                      {tour.meals && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-primary" /> {tour.meals}
                        </div>
                      )}
                      {tour.transport && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Bus className="w-3.5 h-3.5 text-primary" /> {tour.transport}
                        </div>
                      )}
                      {tour.guide && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <UserCheck className="w-3.5 h-3.5 text-primary" /> {tour.guide}
                        </div>
                      )}
                    </div>

                    {tour.price && (
                      <div className="flex items-center gap-1 text-lg font-bold text-foreground mb-4">
                        <Rs className="w-5 h-5 text-primary" /> {tour.price}
                      </div>
                    )}

                    <Link to="/contact">
                      <Button className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                        Enquire Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto max-w-2xl">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground">Plan Your Tour</h2>
                <p className="text-muted-foreground mt-2">Tell us your dream destination and we'll craft the perfect itinerary.</p>
              </div>
              <LeadForm defaultService="tour" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Tours;
