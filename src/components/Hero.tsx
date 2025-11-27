import { Button } from "@/components/ui/button";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import produkJas from "@/assets/produk-jas.png";
import produkBatik1 from "@/assets/produk-batik1.png";
import produkBatik2 from "@/assets/produk-batik2.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface HeroProps {
  onGetStarted: () => void;
  onTryAI?: () => void;
}

export const Hero = ({ onGetStarted, onTryAI }: HeroProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const products = [
    { image: produkJas, label: "JAS" },
    { image: produkBatik1, label: "BATIK" },
    { image: produkBatik2, label: "BATIK" },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const handleTryAI = () => {
    const aiToolSection = document.getElementById('ai-tool');
    aiToolSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 from-background/90 via-background/80 to-background/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Logo/Brand */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mx-auto lg:mx-0">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-wider">Penjahit PRIA No. 1 di Tuban</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-tight">
              <span className="text-foreground">
                Versia Tuban
              </span>
            </h1>

            <p className="text-xl md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Jasa jahit custom pria untuk jas, kemeja, batik, dan celana.
              Bawa kain Anda sendiri atau konsultasikan dengan kami.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
              <Button
                variant="hero"
                size="xl"
                onClick={onGetStarted}
                className="gold-glow-lg w-full sm:w-auto"
              >
                Konsultasi via WhatsApp
                <Sparkles className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={handleTryAI}
                className="border-primary/30 hover:bg-primary/90 w-full sm:w-auto"
              >
                Coba AI Preview Batik
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              {[
                { title: "Jahitan Presisi", desc: "Pas di badan" },
                { title: "Terpercaya", desc: "Sejak 1990" },
                { title: "Cepat", desc: "7 hari jadi" }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 text-center lg:text-left"
                >
                  <h3 className="text-base font-semibold text-primary mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Slideshow */}
          <div className="hidden lg:block relative h-[600px] flex items-center justify-center">
            <div className="relative z-10 w-full h-full flex items-center justify-center">

              <Carousel
                setApi={setApi}
                className="w-full h-full flex items-center justify-center"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent className="h-full items-center">
                  {products.map((product, index) => (
                    <CarouselItem key={index} className="flex items-center justify-center h-full">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.label}
                          className="drop-shadow-2xl max-h-[120%] object-contain scale-150 origin-center translate-y-10"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom Navigation */}
                <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => api?.scrollPrev()}
                    className="z-20 p-2 text-primary hover:text-primary/80 transition-colors transform hover:scale-110 pointer-events-auto"
                  >
                    <ChevronLeft className="w-16 h-16" />
                  </button>
                  <button
                    onClick={() => api?.scrollNext()}
                    className="z-20 p-2 text-primary hover:text-primary/80 transition-colors transform hover:scale-110 pointer-events-auto"
                  >
                    <ChevronRight className="w-16 h-16" />
                  </button>
                </div>
              </Carousel>

              {/* Label */}
              <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 z-30 w-[120px] text-center">
                <div className="bg-black/80 backdrop-blur-sm border border-primary/30 py-3 rounded-lg shadow-gold-lg w-[120px] flex items-center justify-center">
                  <span className="text-lg font-bold text-primary uppercase">
                    {products[current].label}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative elements behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/20 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
