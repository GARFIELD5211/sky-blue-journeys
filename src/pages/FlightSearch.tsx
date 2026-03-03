import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFlights } from "@/hooks/useGoogleSheets";
import { PlaneTakeoff, Clock, ArrowRight, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FlightData } from "@/lib/googleSheets";

const fallbackFlights: FlightData[] = [
  { from: "Lahore", to: "Jeddah", airline: "PIA", departDate: "2026-03-15", arriveDate: "2026-03-15", departTime: "08:00", arriveTime: "12:30", price: "$450", class: "Economy", stops: "Direct" },
  { from: "Karachi", to: "Dubai", airline: "Emirates", departDate: "2026-03-20", arriveDate: "2026-03-20", departTime: "14:00", arriveTime: "16:00", price: "$380", class: "Economy", stops: "Direct" },
  { from: "Islamabad", to: "Madinah", airline: "Saudi Airlines", departDate: "2026-04-01", arriveDate: "2026-04-01", departTime: "10:00", arriveTime: "14:00", price: "$520", class: "Economy", stops: "1 Stop" },
  { from: "Lahore", to: "Istanbul", airline: "Turkish Airlines", departDate: "2026-04-10", arriveDate: "2026-04-10", departTime: "06:00", arriveTime: "12:00", price: "$650", class: "Business", stops: "Direct" },
  { from: "Karachi", to: "London", airline: "PIA", departDate: "2026-04-15", arriveDate: "2026-04-15", departTime: "22:00", arriveTime: "06:00", price: "$780", class: "Economy", stops: "1 Stop" },
];

const FlightSearch = () => {
  const [searchParams] = useSearchParams();
  const flights = useFlights(fallbackFlights);

  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [flightClass, setFlightClass] = useState(searchParams.get("class") || "all");

  const uniqueFroms = useMemo(() => [...new Set(flights.map(f => f.from))], [flights]);
  const uniqueTos = useMemo(() => [...new Set(flights.map(f => f.to))], [flights]);

  const filtered = useMemo(() => {
    return flights.filter(f => {
      if (from && f.from.toLowerCase() !== from.toLowerCase()) return false;
      if (to && f.to.toLowerCase() !== to.toLowerCase()) return false;
      if (date && f.departDate !== date) return false;
      if (flightClass && flightClass !== "all" && f.class.toLowerCase() !== flightClass.toLowerCase()) return false;
      return true;
    });
  }, [flights, from, to, date, flightClass]);

  const clearFilters = () => {
    setFrom("");
    setTo("");
    setDate("");
    setFlightClass("all");
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Flight Search</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mt-2">Find Your Flight</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Search available flights managed by Lancer Travel & Tours.</p>
        </div>

        {/* Search Filters */}
        <div className="glass-card rounded-2xl p-4 md:p-6 max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">From</label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="bg-background/50"><SelectValue placeholder="Origin" /></SelectTrigger>
                <SelectContent>
                  {uniqueFroms.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">To</label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="bg-background/50"><SelectValue placeholder="Destination" /></SelectTrigger>
                <SelectContent>
                  {uniqueTos.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Date</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-background/50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Class</label>
              <Select value={flightClass} onValueChange={setFlightClass}>
                <SelectTrigger className="bg-background/50"><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" size="icon" onClick={clearFilters} className="h-10 w-10 shrink-0">
                <Filter className="w-4 h-4" />
              </Button>
              <Button className="flex-1 h-10 gradient-primary border-0 text-primary-foreground hover:opacity-90 gap-2 font-semibold">
                <Search className="w-4 h-4" /> Search
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-sm text-muted-foreground">{filtered.length} flight{filtered.length !== 1 ? "s" : ""} found</p>
          
          {filtered.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <PlaneTakeoff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No flights found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters or contact us for custom bookings.</p>
            </div>
          ) : (
            filtered.map((flight, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:shadow-lg transition-shadow">
                {/* Airline */}
                <div className="md:w-32 shrink-0">
                  <p className="font-bold text-foreground">{flight.airline}</p>
                  <p className="text-xs text-muted-foreground">{flight.stops}</p>
                </div>
                
                {/* Route & Time */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{flight.departTime}</p>
                    <p className="text-xs text-muted-foreground">{flight.from}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
                    <PlaneTakeoff className="w-4 h-4 text-primary shrink-0" />
                    <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{flight.arriveTime}</p>
                    <p className="text-xs text-muted-foreground">{flight.to}</p>
                  </div>
                </div>
                
                {/* Date & Class */}
                <div className="text-center md:text-right md:w-28 shrink-0">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center md:justify-end">
                    <Clock className="w-3 h-3" /> {flight.departDate}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{flight.class}</p>
                </div>

                {/* Price & CTA */}
                <div className="text-center md:text-right md:w-28 shrink-0">
                  <p className="text-2xl font-extrabold text-primary">{flight.price}</p>
                  <Button size="sm" className="mt-2 gradient-primary border-0 text-primary-foreground hover:opacity-90 text-xs">
                    Book Now
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default FlightSearch;
