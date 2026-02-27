import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plane, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/hajj", label: "Hajj Packages" },
  { to: "/umrah", label: "Umrah Packages" },
  { to: "/visas", label: "Visa Services" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
            <Plane className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-foreground">Lancer</span>
            <span className="text-[10px] font-medium text-muted-foreground -mt-1">Travel & Tours</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" /> Track Visa
          </Button>
          <Link to="/contact">
            <Button size="sm" className="gap-2 gradient-primary border-0 text-primary-foreground hover:opacity-90">
              <Phone className="w-4 h-4" /> Book Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-card border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === l.to
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Search className="w-4 h-4" /> Track Visa
              </Button>
              <Link to="/contact" className="flex-1" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full gap-2 gradient-primary border-0 text-primary-foreground">
                  <Phone className="w-4 h-4" /> Consult
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
