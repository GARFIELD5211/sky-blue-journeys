import { useState } from "react";
import { z } from "zod";
import { useCRM } from "@/context/CRMContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Enter a valid WhatsApp number").max(20),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  travelDate: z.string().min(1, "Select a travel date"),
  serviceType: z.string().min(1, "Select a service type"),
  destination: z.string().optional(),
  message: z.string().max(500).optional(),
});

interface LeadFormProps {
  defaultService?: string;
  defaultDestination?: string;
  compact?: boolean;
}

const LeadForm = ({ defaultService, defaultDestination, compact }: LeadFormProps) => {
  const { submitLead, isSubmitting } = useCRM();
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    travelDate: "",
    serviceType: defaultService || "",
    destination: defaultDestination || "",
    message: "",
  });

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    const ok = await submitLead(result.data as import("@/context/CRMContext").LeadData);
    if (ok) {
      setSuccess(true);
      toast({ title: "Request Submitted!", description: "Our team will contact you within 24 hours." });
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 animate-fade-up">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">Our travel consultant will reach you within 24 hours on WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" placeholder="Muhammad Ali" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">WhatsApp Number *</Label>
          <Input id="phone" placeholder="+92 300 1234567" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        {!compact && (
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="ali@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="travelDate">Travel Date *</Label>
          <Input id="travelDate" type="date" value={form.travelDate} onChange={(e) => update("travelDate", e.target.value)} />
          {errors.travelDate && <p className="text-xs text-destructive">{errors.travelDate}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Service Type *</Label>
          <Select value={form.serviceType} onValueChange={(v) => update("serviceType", v)}>
            <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="hajj">Hajj Package</SelectItem>
              <SelectItem value="umrah">Umrah Package</SelectItem>
              <SelectItem value="tourist-visa">Tourist Visa</SelectItem>
              <SelectItem value="business-visa">Business Visa</SelectItem>
              <SelectItem value="work-visa">Work Visa</SelectItem>
              <SelectItem value="flight">Flight Ticketing</SelectItem>
              <SelectItem value="hotel">Hotel Booking</SelectItem>
            </SelectContent>
          </Select>
          {errors.serviceType && <p className="text-xs text-destructive">{errors.serviceType}</p>}
        </div>
        {!compact && (
          <div className="space-y-1.5">
            <Label>Destination</Label>
            <Select value={form.destination} onValueChange={(v) => update("destination", v)}>
              <SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                <SelectItem value="dubai">Dubai / UAE</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="turkey">Turkey</SelectItem>
                <SelectItem value="malaysia">Malaysia</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {!compact && (
        <div className="space-y-1.5">
          <Label htmlFor="message">Additional Details</Label>
          <Textarea id="message" placeholder="Number of travelers, special requirements..." rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} />
        </div>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full gradient-urgent border-0 text-destructive-foreground hover:opacity-90 h-12 text-base font-semibold gap-2">
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        {isSubmitting ? "Submitting..." : "Get Free Quote"}
      </Button>
    </form>
  );
};

export default LeadForm;
