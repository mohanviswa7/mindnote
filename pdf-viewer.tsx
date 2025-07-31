import { useState, useEffect } from "react";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import type { Document } from "@shared/schema";

interface PdfViewerProps {
  document: Document;
  currentPage?: string | null;
}

export default function PdfViewer({ document, currentPage }: PdfViewerProps) {
  const [scale, setScale] = useState(100);
  const [currentPageNum, setCurrentPageNum] = useState(1);

  useEffect(() => {
    if (currentPage && parseInt(currentPage) !== currentPageNum) {
      setCurrentPageNum(parseInt(currentPage));
    }
  }, [currentPage, currentPageNum]);

  const zoomIn = () => {
    setScale(Math.min(scale + 25, 200));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 25, 50));
  };

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = `/api/documents/${document.id}/pdf`;
    link.download = document.originalName;
    link.click();
  };

  const refreshPdf = () => {
    // Force refresh of the PDF by updating a timestamp
    window.location.reload();
  };
  return (
    <div className="bg-white border-r border-slate-200 flex flex-col">
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="text-primary text-lg" />
            <span className="font-medium text-slate-800">{document.originalName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2" onClick={zoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-slate-600 px-2">{scale}%</span>
            <Button variant="ghost" size="sm" className="p-2" onClick={zoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" onClick={refreshPdf} title="Refresh PDF">
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" onClick={downloadPdf} title="Download PDF">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {currentPage && (
        <div className="border-b p-3" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', borderColor: 'hsl(var(--primary) / 0.2)' }}>
          <p className="text-primary font-medium text-center text-sm">
            📄 Citation: Viewing Page {currentPage}
          </p>
        </div>
      )}

      <div className="flex-1 bg-slate-50 overflow-auto">
        <div className="p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-4xl">
            <object
              data={`/api/documents/${document.id}/pdf#page=${currentPageNum}&zoom=${scale}`}
              type="application/pdf"
              className="w-full h-[800px]"
              style={{ minHeight: '600px' }}
              aria-label={`PDF Viewer - ${document.originalName}`}
            >
              <div className="w-full h-[800px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded">
                <div className="text-center p-8">
                  <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">PDF Viewer</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {document.originalName}
                  </p>
                  
                  {currentPage && (
                    <div className="mb-6 p-4 rounded-lg border bg-blue-50 border-blue-200">
                      <p className="text-blue-700 font-medium">📄 Referenced Page {currentPage}</p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 mb-4">
                      Your browser doesn't support embedded PDFs. Use the options below:
                    </p>
                    <Button 
                      onClick={() => window.open(`/api/documents/${document.id}/pdf`, '_blank')} 
                      variant="default" 
                      size="sm" 
                      className="w-full"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open PDF in New Tab
                    </Button>
                    <Button onClick={downloadPdf} variant="outline" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}
