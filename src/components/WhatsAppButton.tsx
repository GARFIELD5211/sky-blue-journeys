import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923001234567"; // Replace with actual number
const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I'm interested in your travel services. Can you help me?");

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="text-sm font-semibold hidden sm:inline group-hover:inline">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
