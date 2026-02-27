import { Link } from "react-router-dom";
import { Plane, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold">Lancer</span>
                <p className="text-xs text-primary-foreground/60 -mt-0.5">Travel & Tours</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-3">
              Your trusted partner for Hajj, Umrah & Visa services. Govt Licence # 2421.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {[
                { to: "/hajj", label: "Hajj Packages" },
                { to: "/umrah", label: "Umrah Packages" },
                { to: "/visas", label: "Visa Services" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Tourist Visas", "Business Visas", "Work Visas", "Flight Booking", "Hotel Reservations"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                Main Office, Islamabad, Pakistan
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                +92 300 1234567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                info@lancertravels.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© 2026 Lancer Travel & Tours. All rights reserved. Govt Licence # 2421</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground/80">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground/80">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
