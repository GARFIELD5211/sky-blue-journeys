import React, { createContext, useContext, useState, useCallback } from "react";

export interface LeadData {
  fullName: string;
  phone: string;
  email?: string;
  travelDate: string;
  serviceType: string;
  destination?: string;
  packageTier?: string;
  message?: string;
  submittedAt?: string;
}

interface CRMContextType {
  leads: LeadData[];
  isSubmitting: boolean;
  submitLead: (data: LeadData) => Promise<boolean>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = useCallback(async (data: LeadData): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      // Simulate POST to /api/leads
      const payload = { ...data, submittedAt: new Date().toISOString() };
      console.log("CRM Lead Submitted:", JSON.stringify(payload, null, 2));

      // Simulate API delay
      await new Promise((r) => setTimeout(r, 1000));

      setLeads((prev) => [...prev, payload]);
      return true;
    } catch {
      console.error("Failed to submit lead");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <CRMContext.Provider value={{ leads, isSubmitting, submitLead }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const ctx = useContext(CRMContext);
  if (!ctx) throw new Error("useCRM must be used within CRMProvider");
  return ctx;
};
