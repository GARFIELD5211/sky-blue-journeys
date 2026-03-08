import LeadForm from "@/components/LeadForm";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Office Address", info: "Office # 07-B, Mezzanine Floor\nMuzaffar Chamber Plaza,\nFazal-e-Haq Road, Blue Area,\nIslamabad" },
  { icon: Phone, title: "Phone / WhatsApp", info: "Muhammad Taha: 0333-1113882\nNaveed Anwar: 0334-5555316 / 0316-5061665" },
  { icon: Mail, title: "Email", info: "Lancertravel2022@gmail.com" },
  { icon: Clock, title: "Working Hours", info: "Mon - Sat: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 4:00 PM" },
];

const Contact = () => {
  return (
    <main className="pt-20">
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get In Touch</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Contact Us</h1>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Have questions? Our travel experts are here to help you plan the perfect journey.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((item, idx) => (
                <ScrollReveal key={item.title} delay={idx * 0.1} direction="left">
                  <div className="glass-card rounded-xl p-5 flex gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line mt-0.5">{item.info}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <div className="glass-card rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-1">Get a Free Quote</h2>
                  <p className="text-sm text-muted-foreground mb-6">Fill the form below and our expert will contact you within 24 hours.</p>
                  <LeadForm />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
