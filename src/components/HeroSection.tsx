import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImg from "@/assets/hero-hajj.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [packageType, setPackageType] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("to", destination);
    if (packageType) params.set("type", packageType);
    if (travelDate) params.set("date", travelDate);

    if (packageType === "hajj") navigate(`/hajj`);
    else if (packageType === "umrah") navigate(`/umrah`);
    else if (packageType === "visa") navigate(`/visas`);
    else navigate(`/flights?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Kaaba during Hajj at golden hour" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm border border-primary-foreground/20 mb-6">
            ✦ Govt Licensed # 2421
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6">
            Your Sacred
            <span className="text-gradient-primary block" style={{ WebkitTextFillColor: 'unset', color: 'hsl(200 80% 65%)' }}> Journey </span>
            Starts Here
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10">
            Premium Hajj & Umrah packages, hassle-free visa processing, and complete travel solutions — all under one roof.
          </p>
        </div>

        {/* Quick Search Bar */}
        <div className="glass-card rounded-2xl p-4 md:p-6 max-w-4xl w-full animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Destination
              </label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="bg-background/50"><SelectValue placeholder="Where to?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="makkah">Makkah</SelectItem>
                  <SelectItem value="madinah">Madinah</SelectItem>
                  <SelectItem value="dubai">Dubai</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="istanbul">Istanbul</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Package Type
              </label>
              <Select value={packageType} onValueChange={setPackageType}>
                <SelectTrigger className="bg-background/50"><SelectValue placeholder="Service" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hajj">Hajj Package</SelectItem>
                  <SelectItem value="umrah">Umrah Package</SelectItem>
                  <SelectItem value="visa">Visa Service</SelectItem>
                  <SelectItem value="flight">Flight Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Travel Date
              </label>
              <Input type="date" className="bg-background/50" value={travelDate} onChange={e => setTravelDate(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full h-10 gradient-primary border-0 text-primary-foreground hover:opacity-90 gap-2 font-semibold">
                <Search className="w-4 h-4" /> Search
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { num: "15+", label: "Years Experience" },
            { num: "50K+", label: "Happy Pilgrims" },
            { num: "99%", label: "Visa Success" },
            { num: "24/7", label: "Support" },
          ].map((s) => (
            <div key={s.label} className="text-primary-foreground/90">
              <span className="text-2xl font-bold">{s.num}</span>
              <p className="text-xs text-primary-foreground/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
