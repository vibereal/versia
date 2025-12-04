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
import heroLoop from "@/assets/hero-loop.mp4";

const Index = () => {
  const handleGetStarted = () => {
    window.open("https://wa.me/message/CSDILBKEKRUNI1", "_blank");
  };

  return (
    <div className="min-h-screen relative">
      {/* Global Sticky Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 w-full h-full object-cover brightness-[0.3]"
      >
        <source src={heroLoop} type="video/mp4" />
      </video>

      {/* Global Shimmer Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animate-shimmer opacity-30" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <Hero onGetStarted={handleGetStarted} />
        <WhySection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        {/* <GuaranteeSection /> */}
        <ContactSection />
        <AIToolSection />
        <Footer />
        <FloatingWhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
