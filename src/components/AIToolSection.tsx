import { useState } from "react";
import { ProductSelector } from "./ProductSelector";
import { ImageUploader } from "./ImageUploader";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, RotateCcw, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

export const AIToolSection = () => {
  const [clothingImage, setClothingImage] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { toast } = useToast();

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleProductSelect = (productId: string, productImage: string) => {
    setSelectedProduct(productId);
    fetch(productImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `${productId}.png`, { type: 'image/png' });
        setClothingImage(file);
      })
      .catch(error => {
        console.error("Error loading product:", error);
        toast({
          title: "Error",
          description: "Gagal memuat produk",
          variant: "destructive"
        });
      });
  };

  const handleGenerate = async () => {
    if (!clothingImage || !personImage) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Silakan pilih pakaian dan upload foto Anda",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const clothingBase64 = await convertImageToBase64(clothingImage);
      const personBase64 = await convertImageToBase64(personImage);

      const { data, error } = await supabase.functions.invoke('apply-batik-pattern', {
        body: {
          clothingImage: clothingBase64,
          personImage: personBase64
        }
      });

      if (error) throw error;

      if (data?.image) {
        setResultImage(data.image);
        toast({
          title: "Berhasil!",
          description: "Preview virtual try-on Anda telah dibuat"
        });
      }
    } catch (error) {
      console.error("Error generating preview:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat preview",
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
    setClothingImage(null);
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
                disabled={isProcessing || !clothingImage || !personImage}
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
