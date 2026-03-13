import HeroSection from "@/components/HeroSection";

import ServiceCard from "@/components/ServiceCard";
import LeadForm from "@/components/LeadForm";
import ScrollReveal from "@/components/ScrollReveal";
import { Landmark, BookOpen, Globe, PlaneTakeoff, Hotel, Shield, Star, Users } from "lucide-react";
import umrahImg from "@/assets/umrah-bg.jpg";
import visaImg from "@/assets/visa-dubai.jpg";
import hajjImg from "@/assets/hajj-packages.jpg";
import flightImg from "@/assets/flight-ticketing.jpg";

const services = [
  { icon: Landmark, title: "Hajj Packages", description: "Premium & Economy Hajj packages with 5-star hotels near Haram, guided Ziyarat, and full-board meals.", link: "/hajj", badge: "2026 Open", image: hajjImg },
  { icon: BookOpen, title: "Umrah Packages", description: "Year-round Umrah packages starting from 7 days. Visa, flights, hotels, and transport included.", link: "/umrah", image: umrahImg },
  { icon: Globe, title: "Visa Services", description: "Tourist, Business & Work visas for UAE, UK, Turkey, Malaysia and 50+ countries. 99% success rate.", link: "/visas", image: visaImg },
  { icon: PlaneTakeoff, title: "Flight Ticketing", description: "Best rates on domestic and international flights. Group bookings and corporate deals available.", link: "/flights", image: flightImg },
  { icon: Hotel, title: "Hotel Reservations", description: "Curated hotel partnerships worldwide. From budget-friendly to luxury 5-star accommodations.", link: "/contact" },
  { icon: Shield, title: "Travel Insurance", description: "Comprehensive travel insurance covering medical emergencies, trip cancellation, and baggage loss.", link: "/contact" },
];

const whyUs = [
  { icon: Shield, title: "Govt Licensed", desc: "Authorized travel agency — Licence # 2421" },
  { icon: Star, title: "Premium Quality", desc: "Handpicked hotels & services for the best experience" },
  { icon: Users, title: "Expert Guides", desc: "Experienced multilingual tour guides and scholars" },
  { icon: Globe, title: "Global Network", desc: "Partnerships with airlines and hotels in 50+ countries" },
];

const Index = () => {
  return (
    <main>
      <HeroSection />

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Complete Travel Solutions</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">From sacred pilgrimages to worldwide visa processing — we handle everything so you can focus on the journey.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1} direction={i % 2 === 0 ? "up" : "up"}>
                <ServiceCard {...s} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Lancer</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Trusted by 50,000+ Travelers</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Free Consultation</span>
                <h2 className="text-3xl font-bold text-foreground mt-2">Get a Free Quote Today</h2>
                <p className="text-muted-foreground mt-2">Tell us about your travel plans and our experts will craft the perfect package for you.</p>
              </div>
              <LeadForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Index;
