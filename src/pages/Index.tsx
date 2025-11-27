import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { ContactSection } from "@/components/ContactSection";
import { AIToolSection } from "@/components/AIToolSection";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";

const Index = () => {
  const handleGetStarted = () => {
    window.open("https://wa.me/6281234567890?text=Halo%20Versia,%20saya%20tertarik%20dengan%20jasa%20jahit%20custom", "_blank");
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      <WhySection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <GuaranteeSection />
      <ContactSection />
      <AIToolSection />
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Index;
