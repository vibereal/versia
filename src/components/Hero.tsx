import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-batik.jpg";

interface HeroProps {
  onGetStarted: () => void;
  onTryAI?: () => void;
}

export const Hero = ({ onGetStarted, onTryAI }: HeroProps) => {
  const handleTryAI = () => {
    const aiToolSection = document.getElementById('ai-tool');
    aiToolSection?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 z-0 animate-shimmer opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Brand */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wider">AI-POWERED FASHION PREVIEW</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">
              Tampil Percaya Diri dengan Pakaian yang
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Dijahit Khusus Untukmu
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Jasa jahit custom pria untuk jas, kemeja, batik, dan celana. 
            Bawa desainmu sendiri atau konsultasikan dengan kami.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGetStarted}
              className="gold-glow-lg"
            >
              Konsultasi via WhatsApp
              <Sparkles className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={handleTryAI}
              className="border-primary/30 hover:bg-primary/10"
            >
              Coba AI Preview Batik
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            {[
              { title: "Jahitan Presisi", desc: "Setiap detail disesuaikan dengan ukuran tubuh Anda" },
              { title: "Custom Model", desc: "Bawa desain sendiri atau konsultasi dengan kami" },
              { title: "Garansi Revisi", desc: "Kami jamin pas di badan atau gratis revisi" }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-6 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
