import { useState } from "react";
import { X } from "lucide-react";
import LeadForm from "./LeadForm";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  service?: string;
  destination?: string;
  title?: string;
}

const LeadModal = ({ open, onClose, service, destination, title }: LeadModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 animate-fade-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-foreground mb-1">{title || "Get a Free Quote"}</h3>
        <p className="text-sm text-muted-foreground mb-6">Fill in your details and we'll contact you within 24 hours.</p>
        <LeadForm defaultService={service} defaultDestination={destination} />
      </div>
    </div>
  );
};

export default LeadModal;
