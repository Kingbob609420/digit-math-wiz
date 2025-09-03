import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, Upload, X, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onImageCapture: (imageUrl: string) => void;
}

export const CameraUpload = ({ isOpen, onClose, onImageCapture }: CameraUploadProps) => {
  const [isCamera, setIsCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCamera(false);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setCapturedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleUseImage = useCallback(() => {
    if (capturedImage) {
      onImageCapture(capturedImage);
      handleClose();
    }
  }, [capturedImage, onImageCapture]);

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  }, [stopCamera, onClose]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Capture or Upload Math Problem</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isCamera && !capturedImage && (
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={startCamera}
                className="h-32 flex-col space-y-2"
                variant="outline"
              >
                <Camera className="h-8 w-8" />
                <span>Take Photo</span>
              </Button>
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="h-32 flex-col space-y-2"
                variant="outline"
              >
                <Upload className="h-8 w-8" />
                <span>Upload Image</span>
              </Button>
            </div>
          )}

          {isCamera && !capturedImage && (
            <div className="space-y-4">
              <Card className="relative overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <Button onClick={capturePhoto} size="lg" className="rounded-full">
                    <Camera className="h-6 w-6" />
                  </Button>
                  <Button onClick={stopCamera} variant="outline" size="lg" className="rounded-full">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {capturedImage && (
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <img 
                  src={capturedImage} 
                  alt="Captured math problem"
                  className="w-full h-80 object-cover"
                />
              </Card>
              
              <div className="flex justify-center space-x-4">
                <Button onClick={retakePhoto} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={handleUseImage}>
                  Use This Image
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  );
};