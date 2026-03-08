import { useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923331113882";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I'm interested in your travel services. Can you help me?");

const WhatsAppButton = () => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setDisabled(true);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, "_blank", "noopener,noreferrer");
    setTimeout(() => setDisabled(false), 3000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group disabled:opacity-70 disabled:cursor-not-allowed"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="text-sm font-semibold hidden sm:inline group-hover:inline">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
