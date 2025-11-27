import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const FloatingWhatsAppButton = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/6281234567890?text=Halo%20Versia,%20saya%20tertarik%20dengan%20jasa%20jahit%20custom", "_blank");
  };

  return (
    <Button
      size="lg"
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-2xl gold-glow-lg z-50 hover:scale-110 transition-transform"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </Button>
  );
};
