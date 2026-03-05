import { useTours } from "@/hooks/useGoogleSheets";
import LeadForm from "@/components/LeadForm";
import { MapPin, Clock, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Tours = () => {
  const { tours, isLoading } = useTours();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center bg-gradient-to-br from-primary/20 to-accent/30">
        <div className="relative z-10 container mx-auto px-4">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Explore the World</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Tours & Packages</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-lg">
            Discover curated tour packages to breathtaking destinations worldwide.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Available Tours</h2>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading tours...</span>
            </div>
          )}

          {!isLoading && tours.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No tours available at the moment. Check back soon!</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div key={tour.name} className="glass-card rounded-2xl overflow-hidden group">
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
                  <h3 className="text-xl font-bold text-foreground mb-1">{tour.name}</h3>
                  {tour.destination && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {tour.destination}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-3">
                    {tour.duration && (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" /> {tour.duration}
                      </span>
                    )}
                    {tour.price && (
                      <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                        <DollarSign className="w-4 h-4 text-primary" /> {tour.price}
                      </span>
                    )}
                  </div>
                  {tour.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{tour.description}</p>
                  )}
                  {tour.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tour.highlights.map((h) => (
                        <span key={h} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link to="/contact">
                    <Button className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                      Enquire Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Plan Your Tour</h2>
              <p className="text-muted-foreground mt-2">Tell us your dream destination and we'll craft the perfect itinerary.</p>
            </div>
            <LeadForm defaultService="tour" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tours;
