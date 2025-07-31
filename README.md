# MindNote - AI-Powered Document Analysis

An intelligent document analysis platform inspired by Google NotebookLM. Upload PDF documents and interact with them through an AI-powered chat interface to extract insights, summaries, and answers.

## Features

- 📄 PDF document upload with drag-and-drop support
- 💬 AI-powered chat interface for document analysis
- 🔍 Citation system with page references
- 📱 Responsive design for mobile and desktop
- ⚡ Real-time message updates
- 🔧 Built with modern web technologies

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- Shadcn/ui component library
- TanStack Query for state management
- Wouter for routing

### Backend
- Node.js with Express
- TypeScript
- Multer for file uploads
- In-memory storage for development

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mohanviswa7/mindnote.git
cd mindnote
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route pages
│   │   ├── hooks/        # Custom hooks
│   │   └── lib/          # Utilities
├── server/               # Express backend
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage
│   └── index.ts          # Server entry
├── shared/               # Shared types
└── uploads/              # File storage
```

## Usage

1. **Upload a PDF**: Drag and drop or select a PDF document
2. **Wait for Processing**: The document will be processed and ready for chat
3. **Ask Questions**: Type questions about your document content
4. **View Citations**: Click citation buttons to navigate to referenced pages
5. **Download**: Save the PDF to your device if needed

## API Endpoints

- `POST /api/documents/upload` - Upload PDF document
- `GET /api/documents/:id` - Get document details
- `GET /api/documents/:id/pdf` - Serve PDF file
- `POST /api/messages` - Send chat message
- `GET /api/documents/:id/messages` - Get chat history

## Deployment

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Environment Variables

For production deployment, set up these environment variables:
- `NODE_ENV=production`
- `DATABASE_URL` (if using external database)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Inspired by Google NotebookLM
- Built with modern React and TypeScript best practices
- Uses Shadcn/ui for consistent design system