import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import AppHeader from "@/components/app-header";
import PdfUpload from "@/components/pdf-upload";
import PdfViewer from "@/components/pdf-viewer";
import ChatInterface from "@/components/chat-interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText } from "lucide-react";
import type { Document } from "@shared/schema";

type ViewState = 'upload' | 'uploading' | 'ready' | 'chat';

export default function Home() {
  const [match, params] = useRoute("/document/:id");
  const [currentView, setCurrentView] = useState<ViewState>('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // If we have a document ID in the URL, fetch it and go to chat view
  const { data: document } = useQuery({
    queryKey: ["/api/documents", params?.id],
    enabled: !!params?.id,
  });

  // Update document and view when data changes
  if (document && document !== currentDocument) {
    setCurrentDocument(document as Document);
    setCurrentView('chat');
  }

  const handleUploadStart = () => {
    setCurrentView('uploading');
    setUploadProgress(0);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadComplete = (document: Document) => {
    setCurrentDocument(document);
    setCurrentView('ready');
  };

  const handleStartChat = () => {
    setCurrentView('chat');
  };

  const handleSampleQuestion = (question: string) => {
    setCurrentView('chat');
    // The chat interface will handle the sample question
  };

  const handlePageNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const sampleQuestions = [
    "What is the main topic of this document?",
    "Can you summarize the key points?",
    "What are the conclusions or recommendations?"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      
      <main className="h-[calc(100vh-73px)]">
        {currentView === 'upload' && (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-md w-full mx-4">
              <PdfUpload
                onUploadStart={handleUploadStart}
                onUploadProgress={handleUploadProgress}
                onUploadComplete={handleUploadComplete}
              />
              <p className="text-xs text-slate-500 text-center mt-4">
                Supports PDF files up to 50MB
              </p>
            </div>
          </div>
        )}

        {currentView === 'uploading' && (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-md w-full mx-4">
              <Card>
                <CardContent className="pt-8 pb-8">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-primary text-xl" />
                    </div>
                    <h3 className="font-medium text-slate-800">Uploading PDF</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">{currentDocument?.originalName || 'document.pdf'}</span>
                      <span className="text-primary font-medium">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentView === 'ready' && currentDocument && (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-2xl w-full mx-4">
              <Card>
                <CardContent className="pt-8 pb-8">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-600 text-xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                      <FileText className="text-primary mr-2 inline" />
                      Your document is ready!
                    </h2>
                    <p className="text-slate-600">You can now ask questions about your document. For example:</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {sampleQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left p-4 h-auto justify-start hover:border-primary hover:bg-primary/5"
                        onClick={() => handleSampleQuestion(question)}
                      >
                        <span className="text-primary font-medium">• "{question}"</span>
                      </Button>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      className="bg-primary hover:bg-purple-600"
                      onClick={handleStartChat}
                    >
                      Start Chatting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentView === 'chat' && currentDocument && (
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            <PdfViewer document={currentDocument} currentPage={currentPage} />
            <ChatInterface document={currentDocument} onPageNavigation={handlePageNavigation} />
          </div>
        )}
      </main>
    </div>
  );
}
