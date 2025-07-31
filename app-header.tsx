import { Book, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Book className="text-white text-sm" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800">NotebookLM</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <UserCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
