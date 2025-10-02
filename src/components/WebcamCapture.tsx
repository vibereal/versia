import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface WebcamCaptureProps {
  onCapture: (file: File) => void;
}

export const WebcamCapture = ({ onCapture }: WebcamCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startWebcam();
    return () => {
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      toast.error("Failed to access webcam. Please check permissions.");
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `webcam-capture-${Date.now()}.jpg`, {
            type: "image/jpeg"
          });
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);
          stopWebcam();
          onCapture(file);
          toast.success("Photo captured successfully");
        }
      }, "image/jpeg", 0.95);
    }
  };

  const retake = () => {
    setCapturedImage(null);
    startWebcam();
  };

  return (
    <div className="space-y-4">
      {!capturedImage ? (
        <>
          <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            onClick={capturePhoto}
            variant="luxury"
            className="w-full"
            disabled={!stream}
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Photo
          </Button>
        </>
      ) : (
        <>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            onClick={retake}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Photo
          </Button>
        </>
      )}
    </div>
  );
};
