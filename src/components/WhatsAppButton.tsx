import { useMemo, useState, type MouseEvent } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923331113882";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I'm interested in your travel services. Can you help me?");

const WhatsAppButton = () => {
  const [disabled, setDisabled] = useState(false);

  const whatsappLink = useMemo(() => {
    const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
    }

    return `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_MESSAGE}`;
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    setDisabled(true);
    setTimeout(() => setDisabled(false), 2000);
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="text-sm font-semibold hidden sm:inline group-hover:inline">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
