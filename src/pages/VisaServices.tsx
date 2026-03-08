import { useState } from "react";
import { Globe, Briefcase, Wrench, ArrowRight, X, Clock, CheckCircle, FileText, ChevronRight } from "lucide-react";
import LeadModal from "@/components/LeadModal";
import ScrollReveal from "@/components/ScrollReveal";
import visaImg from "@/assets/visa-dubai.jpg";
import { useVisas } from "@/hooks/useGoogleSheets";
import { VisaGridSkeleton } from "@/components/LoadingSkeletons";
import type { VisaData } from "@/lib/googleSheets";
import { AnimatePresence, motion } from "framer-motion";

const visaTypes = [
  { icon: Globe, title: "Tourist Visa", desc: "Hassle-free tourist visas for leisure and family travel to 50+ destinations." },
  { icon: Briefcase, title: "Business Visa", desc: "Fast-track business visas for conferences, meetings, and corporate travel." },
  { icon: Wrench, title: "Work Visa", desc: "Complete work visa processing including document attestation and embassy coordination." },
];

const VisaServices = () => {
  const [leadModal, setLeadModal] = useState<{ open: boolean; country?: string }>({ open: false });
  const [selectedVisa, setSelectedVisa] = useState<VisaData | null>(null);
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

      {/* Country Cards Grid */}
      <section className="section-padding" style={{ background: "hsl(var(--section-alt))" }}>
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Available Visas</h2>
              <p className="text-muted-foreground mt-2">Click any visa to see full details & requirements</p>
            </div>
          </ScrollReveal>
          {isLoading && <VisaGridSkeleton count={6} />}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((c, idx) => (
              <ScrollReveal key={`${c.country}-${c.visaType}-${idx}`} delay={idx * 0.05}>
                <button
                  onClick={() => setSelectedVisa(c)}
                  className="glass-card-hover rounded-2xl p-4 md:p-5 text-left w-full group transition-all duration-300 hover:scale-[1.02] border border-border hover:border-primary"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-3xl md:text-4xl">{c.flag}</span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground text-sm md:text-base truncate">{c.country}</h3>
                      {c.visaType && (
                        <p className="text-xs text-muted-foreground truncate">{c.visaType}</p>
                      )}
                    </div>
                  </div>
                  {c.price && (
                    <p className="text-sm font-bold text-primary mb-1">Rs. {c.price}</p>
                  )}
                  {c.processingTime && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{c.processingTime}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    {c.successRate && (
                      <span className="text-xs font-semibold text-primary">{c.successRate}</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Detail Modal */}
      <AnimatePresence>
        {selectedVisa && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedVisa(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Content */}
            <motion.div
              className="relative bg-card border border-border rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="gradient-primary p-6 rounded-t-3xl relative">
                <button
                  onClick={() => setSelectedVisa(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                >
                  <X className="w-4 h-4 text-primary-foreground" />
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedVisa.flag}</span>
                  <div>
                    <h3 className="text-2xl font-extrabold text-primary-foreground">{selectedVisa.country}</h3>
                    {selectedVisa.visaType && (
                      <p className="text-primary-foreground/80 font-medium">{selectedVisa.visaType}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-5">
                {/* Quick Info Row */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedVisa.price && (
                    <div className="bg-accent/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-lg font-bold text-foreground">Rs. {selectedVisa.price}</p>
                    </div>
                  )}
                  {selectedVisa.processingTime && (
                    <div className="bg-accent/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground">Processing</p>
                      <p className="text-lg font-bold text-foreground">{selectedVisa.processingTime}</p>
                    </div>
                  )}
                  {selectedVisa.duration && (
                    <div className="bg-accent/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-lg font-bold text-foreground">{selectedVisa.duration}</p>
                    </div>
                  )}
                  {selectedVisa.successRate && (
                    <div className="bg-accent/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                      <p className="text-lg font-bold text-foreground">{selectedVisa.successRate}</p>
                    </div>
                  )}
                </div>

                {/* Visa Types */}
                {selectedVisa.types.length > 0 && (
                  <div>
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" /> Visa Types
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVisa.types.map((t) => (
                        <span key={t} className="px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {selectedVisa.requirements.length > 0 && (
                  <div>
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" /> Requirements
                    </h4>
                    <ul className="space-y-2">
                      {selectedVisa.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Apply Button */}
                <button
                  onClick={() => {
                    setSelectedVisa(null);
                    setLeadModal({ open: true, country: selectedVisa.country });
                  }}
                  className="w-full gradient-primary text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadModal
        open={leadModal.open}
        onClose={() => setLeadModal({ open: false })}
        service="tourist-visa"
        destination={leadModal.country}
        title={leadModal.country ? `${leadModal.country} Visa Application` : "Visa Application"}
      />
    </main>
  );
};

export default VisaServices;
