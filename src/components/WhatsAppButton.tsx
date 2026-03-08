import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923331113882";

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=923331113882&text=Assalam%20o%20Alaikum%2C%20I%20would%20like%20to%20inquire%20about%20your%20Hajj%2FUmrah%20packages.%20Can%20you%20help%20me%3F&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="text-sm font-semibold hidden sm:inline group-hover:inline">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
