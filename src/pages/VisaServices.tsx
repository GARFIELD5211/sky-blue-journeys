import { useState } from "react";
import { Globe, Briefcase, Wrench, ArrowRight } from "lucide-react";
import LeadModal from "@/components/LeadModal";
import ScrollReveal from "@/components/ScrollReveal";
import visaImg from "@/assets/visa-dubai.jpg";
import { useVisas } from "@/hooks/useGoogleSheets";

const visaTypes = [
  { icon: Globe, title: "Tourist Visa", desc: "Hassle-free tourist visas for leisure and family travel to 50+ destinations." },
  { icon: Briefcase, title: "Business Visa", desc: "Fast-track business visas for conferences, meetings, and corporate travel." },
  { icon: Wrench, title: "Work Visa", desc: "Complete work visa processing including document attestation and embassy coordination." },
];

const VisaServices = () => {
  const [modal, setModal] = useState<{ open: boolean; country?: string }>({ open: false });
  const { visas: countries, isLoading } = useVisas();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center">
        <div className="absolute inset-0">
          <img src={visaImg} alt="Dubai skyline" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <ScrollReveal>
            <span className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-wider">99% Success Rate</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mt-2">Visa Services</h1>
            <p className="text-lg text-primary-foreground/80 mt-3 max-w-lg">Tourist, Business & Work visas for 50+ countries. Fast processing, expert guidance, guaranteed results.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Visa Types */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Visa Categories</h2>
              <p className="text-muted-foreground mt-2">Expert processing for all visa types</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {visaTypes.map((v, idx) => (
              <ScrollReveal key={v.title} delay={idx * 0.1}>
                <div className="glass-card-hover rounded-2xl p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Country Cards */}
      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Country-Specific Visas</h2>
              <p className="text-muted-foreground mt-2">Click any country to start your application</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((c, idx) => (
              <ScrollReveal key={c.country} delay={idx * 0.08}>
                <button
                  onClick={() => setModal({ open: true, country: c.country })}
                  className="glass-card-hover rounded-2xl p-6 text-left w-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{c.flag}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{c.country}</h3>
                      <p className="text-xs text-muted-foreground">{c.processingTime} processing</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.types.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent text-accent-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">{c.successRate} Success Rate</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <LeadModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        service="tourist-visa"
        destination={modal.country}
        title={modal.country ? `${modal.country} Visa Application` : "Visa Application"}
      />
    </main>
  );
};

export default VisaServices;
