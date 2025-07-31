import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Document } from "@shared/schema";

interface PdfUploadProps {
  onUploadStart: () => void;
  onUploadProgress: (progress: number) => void;
  onUploadComplete: (document: Document) => void;
}

export default function PdfUpload({ 
  onUploadStart, 
  onUploadProgress, 
  onUploadComplete 
}: PdfUploadProps) {
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    onUploadStart();

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      // Simulate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        onUploadProgress(progress);
      }, 200);

      const response = await apiRequest('POST', '/api/documents/upload', formData);
      const document = await response.json() as Document;

      clearInterval(progressInterval);
      onUploadProgress(100);

      setTimeout(() => {
        onUploadComplete(document);
      }, 500);

    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload PDF",
        variant: "destructive",
      });
      onUploadProgress(0);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      uploadFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  return (
    <div 
      {...getRootProps()} 
      className={`upload-zone bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center cursor-pointer ${
        isDragActive ? 'drag-over' : ''
      }`}
    >
      <input {...getInputProps()} />
      <div className="mb-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CloudUpload className="text-slate-400 text-2xl" />
        </div>
        <h2 className="text-lg font-medium text-slate-800 mb-2">
          {isDragActive ? 'Drop PDF files here' : 'Drop PDF files here'}
        </h2>
        <p className="text-sm text-slate-500 mb-6">or click to browse</p>
      </div>
      <Button 
        type="button"
        className="bg-secondary hover:bg-blue-600"
      >
        Choose Files
      </Button>
    </div>
  );
}
