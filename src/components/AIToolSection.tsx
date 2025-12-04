import { useState } from "react";
import { ProductSelector } from "./ProductSelector";
import { ImageUploader } from "./ImageUploader";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, RotateCcw, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

export const AIToolSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [clothingImageUrl, setClothingImageUrl] = useState<string | null>(null);
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { toast } = useToast();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const convertUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleProductSelect = (productId: string, productImage: string) => {
    setSelectedProduct(productId);
    setClothingImageUrl(productImage);
  };

  const handleGenerate = async () => {
    if (!clothingImageUrl || !personImage) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Silakan pilih pakaian dan upload foto Anda",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Converting images to base64...");
      const clothingBase64 = await convertUrlToBase64(clothingImageUrl);
      const personBase64 = await convertFileToBase64(personImage);
      
      console.log("Calling edge function...");
      const { data, error } = await supabase.functions.invoke('apply-batik-pattern', {
        body: {
          clothingImage: clothingBase64,
          personImage: personBase64
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.image) {
        setResultImage(data.image);
        toast({
          title: "Berhasil!",
          description: "Preview virtual try-on Anda telah dibuat"
        });
      } else {
        throw new Error("No image returned from AI");
      }
    } catch (error) {
      console.error("Error generating preview:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat membuat preview",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'versia-vton-preview.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setClothingImageUrl(null);
    setSelectedProduct(null);
    setPersonImage(null);
    setResultImage("");
  };

  return (
    <section id="ai-tool" className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wider">TEKNOLOGI AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Coba <span className="text-primary">Virtual Try-On</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat bagaimana pakaian kami terlihat pada Anda dengan teknologi AI
          </p>
        </div>

        {!resultImage ? (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <ProductSelector
                selectedProduct={selectedProduct}
                onSelect={handleProductSelect}
              />

              <ImageUploader
                label="Upload Foto Anda"
                description="Upload foto full body atau setengah badan untuk hasil terbaik"
                onImageSelect={setPersonImage}
                image={personImage}
                onClear={() => setPersonImage(null)}
              />
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isProcessing || !clothingImageUrl || !personImage}
                className="gold-glow-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sedang Memproses...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Buat Preview
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <Card className="overflow-hidden border-primary/20">
              <div className="bg-gradient-to-b from-card/50 to-card p-8">
                <div className="max-w-2xl mx-auto">
                  <img
                    src={resultImage}
                    alt="Preview Result"
                    className="w-full h-auto rounded-lg shadow-gold-lg"
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={handleDownload} className="gold-glow">
                <Download className="w-5 h-5 mr-2" />
                Download Hasil
              </Button>
              <Button size="lg" variant="outline" onClick={handleReset}>
                <RotateCcw className="w-5 h-5 mr-2" />
                Coba Lagi
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
