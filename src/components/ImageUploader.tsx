import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Camera } from "lucide-react";
import { toast } from "sonner";
import { WebcamCapture } from "./WebcamCapture";

interface ImageUploaderProps {
  label: string;
  description: string;
  onImageSelect: (file: File) => void;
  image: File | null;
  onClear: () => void;
}

export const ImageUploader = ({ 
  label, 
  description, 
  onImageSelect, 
  image, 
  onClear 
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onImageSelect(file);
    toast.success("Image uploaded successfully");
  };

  const handleClear = () => {
    setPreview(null);
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleWebcamCapture = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">{label}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {!preview ? (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="camera">
                <Camera className="w-4 h-4 mr-2" />
                Camera
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id={`upload-${label.replace(/\s/g, '-').toLowerCase()}`}
              />
              <label 
                htmlFor={`upload-${label.replace(/\s/g, '-').toLowerCase()}`}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/60 transition-colors duration-300 bg-muted/20"
              >
                <Upload className="w-12 h-12 text-primary mb-4" />
                <span className="text-sm text-muted-foreground">Click to upload image</span>
                <span className="text-xs text-muted-foreground mt-2">Max size: 10MB</span>
              </label>
            </TabsContent>
            
            <TabsContent value="camera" className="mt-4">
              <WebcamCapture onCapture={handleWebcamCapture} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="relative group">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
