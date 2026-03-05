import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFlights } from "@/hooks/useGoogleSheets";
import { PlaneTakeoff, Clock, Search, ArrowRightLeft, Users, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const FlightSearch = () => {
  const [searchParams] = useSearchParams();
  const { flights, isLoading } = useFlights();

  // Search state
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [flightClass, setFlightClass] = useState("economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Sidebar filters
  const [filterStops, setFilterStops] = useState<string>("all");
  const [filterSort, setFilterSort] = useState<string>("");
  const [filterAirlines, setFilterAirlines] = useState<string[]>([]);

  const uniqueFroms = useMemo(() => [...new Set(flights.map(f => f.from))], [flights]);
  const uniqueTos = useMemo(() => [...new Set(flights.map(f => f.to))], [flights]);
  const uniqueAirlines = useMemo(() => [...new Set(flights.map(f => f.airline))], [flights]);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const filtered = useMemo(() => {
    let results = flights.filter(f => {
      if (from && f.from !== from) return false;
      if (to && f.to !== to) return false;
      if (date && f.departDate !== date) return false;
      if (filterStops === "nonstop" && f.stops.toLowerCase() !== "direct") return false;
      if (filterStops === "1stop" && !f.stops.toLowerCase().includes("1")) return false;
      if (filterStops === "2stop" && !f.stops.toLowerCase().includes("2")) return false;
      if (filterAirlines.length > 0 && !filterAirlines.includes(f.airline)) return false;
      return true;
    });

    if (filterSort === "cheapest") {
      results = [...results].sort((a, b) => {
        const pa = parseInt(a.price.replace(/[^0-9]/g, "")) || 0;
        const pb = parseInt(b.price.replace(/[^0-9]/g, "")) || 0;
        return pa - pb;
      });
    }

    return results;
  }, [flights, from, to, date, filterStops, filterAirlines, filterSort]);

  const toggleAirline = (airline: string) => {
    setFilterAirlines(prev =>
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Search Bar - inspired by reference */}
        <div className="glass-card rounded-2xl p-5 md:p-6 mb-8">
          {/* Trip type + class row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {[
              { value: "oneway", label: "One Way" },
              { value: "return", label: "Return Trip" },
              { value: "multi", label: "Multi City" },
            ].map(t => (
              <label key={t.value} className="flex items-center gap-1.5 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="tripType"
                  value={t.value}
                  checked={tripType === t.value}
                  onChange={() => setTripType(t.value)}
                  className="accent-primary"
                />
                <span className={tripType === t.value ? "font-semibold text-foreground" : "text-muted-foreground"}>{t.label}</span>
              </label>
            ))}
            <Select value={flightClass} onValueChange={setFlightClass}>
              <SelectTrigger className="w-32 bg-background/50 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main search fields */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* Flying From */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <PlaneTakeoff className="w-3.5 h-3.5" /> Flying From
              </label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="bg-accent/40 h-11"><SelectValue placeholder="Select origin" /></SelectTrigger>
                <SelectContent>
                  {uniqueFroms.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Swap button */}
            <div className="md:col-span-1 flex justify-center">
              <Button variant="outline" size="icon" onClick={swapCities} className="rounded-full h-9 w-9 border-primary/30">
                <ArrowRightLeft className="w-4 h-4 text-primary" />
              </Button>
            </div>

            {/* Flying To */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <PlaneTakeoff className="w-3.5 h-3.5 rotate-90" /> Flying To
              </label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="bg-accent/40 h-11"><SelectValue placeholder="Select destination" /></SelectTrigger>
                <SelectContent>
                  {uniqueTos.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Departure */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Departure</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-accent/40 h-11" />
            </div>

            {/* Travellers */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Travellers
              </label>
              <div className="bg-accent/40 rounded-md h-11 flex items-center px-3 text-sm text-foreground">
                {adults} adult{adults !== 1 ? "s" : ""} · {children} child · {infants} infant
              </div>
            </div>

            {/* Search */}
            <div className="md:col-span-1">
              <Button className="w-full h-11 gradient-primary border-0 text-primary-foreground hover:opacity-90">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Traveller counters */}
          <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-border/50">
            {[
              { label: "Adults", value: adults, set: setAdults, min: 1 },
              { label: "Children", value: children, set: setChildren, min: 0 },
              { label: "Infants", value: infants, set: setInfants, min: 0 },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-14">{t.label}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => t.set(Math.max(t.min, t.value - 1))} disabled={t.value <= t.min}>
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-sm font-semibold w-4 text-center text-foreground">{t.value}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => t.set(t.value + 1)}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Results with sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0 space-y-6">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-3">Airlines</h3>
              <label className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                <Checkbox
                  checked={filterAirlines.length === 0}
                  onCheckedChange={() => setFilterAirlines([])}
                />
                <span className="text-foreground">All</span>
              </label>
              {uniqueAirlines.map(a => (
                <label key={a} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={filterAirlines.includes(a)}
                    onCheckedChange={() => toggleAirline(a)}
                  />
                  <span className="text-foreground">{a}</span>
                </label>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-3">Filter</h3>
              {["cheapest", "fastest"].map(s => (
                <label key={s} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={filterSort === s}
                    onCheckedChange={() => setFilterSort(filterSort === s ? "" : s)}
                  />
                  <span className="text-foreground capitalize">{s}</span>
                </label>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-3">Stops</h3>
              {[
                { value: "all", label: "All" },
                { value: "nonstop", label: "Non-Stop" },
                { value: "1stop", label: "1-Stop" },
                { value: "2stop", label: "2-Stop" },
              ].map(s => (
                <label key={s.value} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={filterStops === s.value}
                    onCheckedChange={() => setFilterStops(s.value)}
                  />
                  <span className="text-foreground">{s.label}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Flight Results */}
          <div className="flex-1 space-y-4">
            <h2 className="text-lg font-bold text-foreground">{filtered.length} Flight{filtered.length !== 1 ? "s" : ""} Found</h2>

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
                  <div className="md:w-28 shrink-0 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-1">
                      <PlaneTakeoff className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">{flight.airline}</p>
                  </div>

                  {/* Route */}
                  <div className="flex-1 flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-muted-foreground">{flight.from.split("(")[0].trim()}</p>
                      <p className="text-xl font-bold text-foreground">{flight.departTime}</p>
                      <p className="text-xs text-muted-foreground">{flight.departDate}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-0.5">
                      <p className="text-xs text-muted-foreground">{flight.stops}</p>
                      <div className="w-full flex items-center gap-1">
                        <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                        <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-muted-foreground">{flight.to.split("(")[0].trim()}</p>
                      <p className="text-xl font-bold text-foreground">{flight.arriveTime}</p>
                      <p className="text-xs text-muted-foreground">{flight.arriveDate}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center md:text-right md:w-36 shrink-0">
                    <p className="text-2xl font-extrabold text-foreground">{flight.price}</p>
                    <Button size="sm" className="mt-2 gradient-primary border-0 text-primary-foreground hover:opacity-90 text-xs px-6">
                      Select Now
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FlightSearch;
