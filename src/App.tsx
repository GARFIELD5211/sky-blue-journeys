import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CRMProvider } from "@/context/CRMContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import LiveTrafficWidget from "@/components/LiveTrafficWidget";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import HajjPackages from "./pages/HajjPackages";
import UmrahPackages from "./pages/UmrahPackages";
import Tours from "./pages/Tours";
import VisaServices from "./pages/VisaServices";
import Contact from "./pages/Contact";
import FlightSearch from "./pages/FlightSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/hajj" element={<PageTransition><HajjPackages /></PageTransition>} />
        <Route path="/umrah" element={<PageTransition><UmrahPackages /></PageTransition>} />
        <Route path="/tours" element={<PageTransition><Tours /></PageTransition>} />
        <Route path="/visas" element={<PageTransition><VisaServices /></PageTransition>} />
        <Route path="/flights" element={<PageTransition><FlightSearch /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CRMProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <WhatsAppButton />
          <LiveTrafficWidget />
        </BrowserRouter>
      </CRMProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
