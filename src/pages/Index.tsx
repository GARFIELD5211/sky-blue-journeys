import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import LeadForm from "@/components/LeadForm";
import { Landmark, BookOpen, Globe, PlaneTakeoff, Hotel, Shield, Star, Users } from "lucide-react";
import umrahImg from "@/assets/umrah-bg.jpg";
import visaImg from "@/assets/visa-dubai.jpg";
import hajjImg from "@/assets/hajj-packages.jpg";
import flightImg from "@/assets/flight-ticketing.jpg";

const Index = () => {
  return (
    <main>
      <HeroSection />

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Complete Travel Solutions</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">From sacred pilgrimages to worldwide visa processing — we handle everything so you can focus on the journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard icon={Landmark} title="Hajj Packages" description="Premium & Economy Hajj packages with 5-star hotels near Haram, guided Ziyarat, and full-board meals." link="/hajj" badge="2026 Open" />
            <ServiceCard icon={BookOpen} title="Umrah Packages" description="Year-round Umrah packages starting from 7 days. Visa, flights, hotels, and transport included." link="/umrah" image={umrahImg} />
            <ServiceCard icon={Globe} title="Visa Services" description="Tourist, Business & Work visas for UAE, UK, Turkey, Malaysia and 50+ countries. 99% success rate." link="/visas" image={visaImg} />
            <ServiceCard icon={PlaneTakeoff} title="Flight Ticketing" description="Best rates on domestic and international flights. Group bookings and corporate deals available." link="/contact" />
            <ServiceCard icon={Hotel} title="Hotel Reservations" description="Curated hotel partnerships worldwide. From budget-friendly to luxury 5-star accommodations." link="/contact" />
            <ServiceCard icon={Shield} title="Travel Insurance" description="Comprehensive travel insurance covering medical emergencies, trip cancellation, and baggage loss." link="/contact" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Lancer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Trusted by 50,000+ Travelers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Govt Licensed", desc: "Authorized travel agency — Licence # 2421" },
              { icon: Star, title: "Premium Quality", desc: "Handpicked hotels & services for the best experience" },
              { icon: Users, title: "Expert Guides", desc: "Experienced multilingual tour guides and scholars" },
              { icon: Globe, title: "Global Network", desc: "Partnerships with airlines and hotels in 50+ countries" },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Free Consultation</span>
              <h2 className="text-3xl font-bold text-foreground mt-2">Get a Free Quote Today</h2>
              <p className="text-muted-foreground mt-2">Tell us about your travel plans and our experts will craft the perfect package for you.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
