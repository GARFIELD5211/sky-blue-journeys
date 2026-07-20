import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoWide from "@/assets/logo-wide.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/hajj", label: "Hajj Packages" },
  { to: "/umrah", label: "Umrah Packages" },
  { to: "/tours", label: "Tours" },
  { to: "/visas", label: "Visa Services" },
  // { to: "/flights", label: "Flights" },
  { to: "/contact", label: "Contact" },
];

const menuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const, when: "afterChildren" as const },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const, when: "beforeChildren" as const, staggerChildren: 0.05 },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoWide} alt="Lancer Travel & Tours" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                location.pathname === l.to
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
              {location.pathname === l.to && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" /> Track Visa
          </Button>
          <a href="https://crm-lancer-9gl5.vercel.app" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-2 gradient-primary border-0 text-primary-foreground hover:opacity-90">
              <LogIn className="w-4 h-4" /> Login
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden bg-card border-b border-border overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <motion.div key={l.to} variants={linkVariants}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === l.to
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={linkVariants} className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Search className="w-4 h-4" /> Track Visa
                </Button>
                <a href="https://crm-lancer-9gl5.vercel.app" target="_blank" rel="noopener noreferrer" className="flex-1" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full gap-2 gradient-primary border-0 text-primary-foreground">
                    <LogIn className="w-4 h-4" /> Login
                  </Button>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
