import { useState } from "react";
import { BatikPatternSelector } from "./BatikPatternSelector";
import { ImageUploader } from "./ImageUploader";
import { ClothingSelector, type ClothingConfig } from "./ClothingSelector";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, RotateCcw, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

export const AIToolSection = () => {
  const [fabricImage, setFabricImage] = useState<File | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [clothingConfig, setClothingConfig] = useState<ClothingConfig>({
    type: "formal-tshirt",
    sleeveType: "short",
    collarType: "ordinary"
  });

  const { toast } = useToast();

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handlePatternSelect = (patternId: string, patternImage: string) => {
    setSelectedPattern(patternId);
    fetch(patternImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `${patternId}.jpg`, { type: 'image/jpeg' });
        setFabricImage(file);
      })
      .catch(error => {
        console.error("Error loading pattern:", error);
        toast({
          title: "Error",
          description: "Gagal memuat pattern batik",
          variant: "destructive"
        });
      });
  };

  const handleGenerate = async () => {
    if (!fabricImage || !personImage) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Silakan pilih pattern batik dan upload foto Anda",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const fabricBase64 = await convertImageToBase64(fabricImage);
      const personBase64 = await convertImageToBase64(personImage);

      const { data, error } = await supabase.functions.invoke('apply-batik-pattern', {
        body: {
          fabricImage: fabricBase64,
          personImage: personBase64,
          clothingConfig
        }
      });

      if (error) throw error;

      if (data?.image) {
        setResultImage(data.image);
        toast({
          title: "Berhasil!",
          description: "Preview batik Anda telah dibuat"
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
      link.download = 'versia-batik-preview.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setFabricImage(null);
    setSelectedPattern(null);
    setPersonImage(null);
    setResultImage("");
    setClothingConfig({
      type: "formal-tshirt",
      sleeveType: "short",
      collarType: "ordinary"
    });
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
            Coba <span className="text-primary">AI Preview Batik</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat bagaimana pattern batik akan terlihat pada pakaian Anda dengan teknologi AI
          </p>
        </div>

        {!resultImage ? (
          <div className="space-y-8">
            <BatikPatternSelector 
              selectedPattern={selectedPattern}
              onSelect={handlePatternSelect}
              customPattern={fabricImage && !selectedPattern ? fabricImage : null}
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <ImageUploader
                label="Upload Foto Anda"
                description="Upload foto Anda dengan jelas untuk hasil terbaik"
                onImageSelect={setPersonImage}
                image={personImage}
                onClear={() => setPersonImage(null)}
              />
              <ClothingSelector
                config={clothingConfig}
                onChange={setClothingConfig}
              />
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isProcessing || !fabricImage || !personImage}
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
