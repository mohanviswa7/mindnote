import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, Paperclip, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Document, Message } from "@shared/schema";

interface ChatInterfaceProps {
  document: Document;
  onPageNavigation?: (page: string) => void;
}

export default function ChatInterface({ document, onPageNavigation }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch messages for this document
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/documents", document.id, "messages"],
    refetchInterval: 2000, // Poll for new AI responses
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest('POST', '/api/messages', {
        documentId: document.id,
        content,
        role: 'user'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents", document.id, "messages"] });
      setInputValue("");
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate(inputValue.trim());
    }
  };

  const handleCitationClick = (page: string) => {
    console.log('Navigate to PDF page:', page);
    if (onPageNavigation) {
      onPageNavigation(page);
      toast({
        title: "Page Navigation",
        description: `Navigated to page ${page}`,
      });
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white flex flex-col">
      <div className="border-b border-slate-200 p-4">
        <h2 className="font-semibold text-slate-800">Chat with your document</h2>
        <p className="text-sm text-slate-500">Ask questions about the content</p>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-slate-500">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-slate-500">
              Start a conversation by asking a question about the document.
            </div>
          ) : (
            messages.map((message: Message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl p-3 ${
                    message.role === 'user'
                      ? 'chat-message-user rounded-br-md'
                      : 'chat-message-assistant rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.citations && message.citations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.citations.map((citation, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="inline-flex items-center px-2 py-1 text-xs rounded-md"
                          onClick={() => handleCitationClick(citation)}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Page {citation}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {sendMessageMutation.isPending && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md bg-slate-100 text-slate-800 rounded-2xl rounded-bl-md p-3">
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse">Thinking...</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-slate-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Ask about the document..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pr-12"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>
          <Button
            type="submit"
            className="bg-primary hover:bg-purple-600 p-3"
            disabled={!inputValue.trim() || sendMessageMutation.isPending}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-slate-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
