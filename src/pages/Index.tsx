import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [showUploader, setShowUploader] = useState(false);
  const [fabricImage, setFabricImage] = useState<File | null>(null);
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGetStarted = () => {
    setShowUploader(true);
    // Scroll to uploader section
    setTimeout(() => {
      document.getElementById('uploader-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = async () => {
    if (!fabricImage || !personImage) {
      toast.error("Please upload both images");
      return;
    }

    setIsProcessing(true);
    setResultImage(null);

    try {
      // Convert images to base64
      const fabricBase64 = await convertImageToBase64(fabricImage);
      const personBase64 = await convertImageToBase64(personImage);

      // Call edge function
      const { data, error } = await supabase.functions.invoke('apply-batik-pattern', {
        body: {
          fabricImage: fabricBase64,
          personImage: personBase64
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data?.image) {
        setResultImage(data.image);
        toast.success("Pattern applied successfully!");
        
        // Scroll to result
        setTimeout(() => {
          document.getElementById('result-section')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      } else {
        throw new Error("No image returned from AI");
      }
    } catch (error: any) {
      console.error('Error generating image:', error);
      toast.error(error.message || "Failed to generate image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `versia-result-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setFabricImage(null);
    setPersonImage(null);
    setResultImage(null);
    setShowUploader(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />

      {showUploader && (
        <section id="uploader-section" className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Upload Your Images
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose a batik pattern and your photo to see the magic
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <ImageUploader
                label="Batik Pattern"
                description="Upload an image of fabric or clothing with batik pattern"
                onImageSelect={setFabricImage}
                image={fabricImage}
                onClear={() => setFabricImage(null)}
              />

              <ImageUploader
                label="Your Photo"
                description="Upload a clear photo of your face or full body"
                onImageSelect={setPersonImage}
                image={personImage}
                onClear={() => setPersonImage(null)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="luxury"
                size="xl"
                onClick={handleGenerate}
                disabled={!fabricImage || !personImage || isProcessing}
                className="gold-glow"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Preview
                  </>
                )}
              </Button>

              {(fabricImage || personImage) && (
                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleReset}
                >
                  Start Over
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {resultImage && (
        <section id="result-section" className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Your Result
              </h2>
              <p className="text-muted-foreground text-lg">
                Here's how the batik pattern looks on you
              </p>
            </div>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm gold-glow-lg">
              <img
                src={resultImage}
                alt="Result"
                className="w-full rounded-lg"
              />
              
              <div className="flex gap-4 justify-center mt-6">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleDownload}
                  className="gold-glow"
                >
                  <Download className="w-5 h-5" />
                  Download Image
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                >
                  Try Another Pattern
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
