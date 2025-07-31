# MindNote - AI-Powered Document Analysis Platform

## Overview

This is a full-stack web application that replicates Google NotebookLM functionality, allowing users to upload PDF documents and interact with them through an AI-powered chat interface. The application provides PDF viewing capabilities, intelligent document analysis, and citation-based responses that reference specific pages within uploaded documents.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **File Handling**: React Dropzone for drag-and-drop PDF uploads

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **File Upload**: Multer middleware for handling multipart/form-data
- **Development**: Hot reload with Vite integration for full-stack development

### Build System
- **Frontend Build**: Vite with React plugin and TypeScript support
- **Backend Build**: ESBuild for server-side bundling
- **Development**: Single command runs both frontend and backend with hot reload
- **Production**: Static frontend build served by Express with API routes

## Key Components

### PDF Management System
- **Upload Handler**: Supports large PDF files (up to 50MB) with validation
- **Storage**: File system storage with metadata tracking in database
- **Viewer Integration**: Placeholder for PDF.js integration (currently shows mockup)
- **Progress Tracking**: Real-time upload progress indication

### Chat Interface
- **Message Management**: Persistent chat history stored per document
- **Real-time Updates**: Polling mechanism for AI response updates
- **Citation System**: Placeholder for clickable page references in responses
- **Input Handling**: Form-based message submission with validation

### Database Schema
- **Documents Table**: Stores file metadata (filename, size, upload date)
- **Messages Table**: Chat history with document association and role-based content
- **Foreign Keys**: Proper relationships between documents and their messages

### UI/UX Design
- **Responsive Layout**: Mobile-first design with adaptive breakpoints
- **Component System**: Consistent design language using shadcn/ui
- **State Management**: Multiple view states (upload, uploading, ready, chat)
- **Error Handling**: Toast notifications for user feedback

## Data Flow

1. **PDF Upload Flow**:
   - User drags/drops or selects PDF file
   - Frontend validates file type and size
   - Multer processes upload on backend
   - File metadata saved to database
   - Document ID returned to frontend

2. **Chat Interaction Flow**:
   - User types message in chat interface
   - Message saved with 'user' role in database
   - AI processing placeholder (needs implementation)
   - AI response saved with 'assistant' role
   - Frontend polls for new messages and updates UI

3. **Document Navigation**:
   - URL routing supports direct document access
   - Document data fetched on page load
   - Chat history loaded for existing documents

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Backend**: Express.js, Multer for file uploads
- **Database**: In-memory storage for development (MemStorage class)
- **Validation**: Zod for schema validation and type safety

### UI and Styling
- **Component Library**: Extensive Radix UI primitives collection
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography
- **Utilities**: Class Variance Authority for component variants

### Development Tools
- **Build Tools**: Vite, ESBuild, TypeScript compiler
- **Development**: TSX for TypeScript execution, Replit integration
- **Deployment**: Serverless-http for Netlify Functions

### Deployment Configuration
- **GitHub**: Ready for version control and collaboration
- **Netlify**: Configured with serverless functions and automatic deployments
- **Build Process**: Optimized for static site generation with API functions
- **File Storage**: In-memory for development, cloud storage recommended for production

### AI Integration Status
- **Current**: Rule-based responses for common document queries
- **Future**: Integration ready for OpenAI, Anthropic, or other AI services
- **PDF Processing**: Object element for viewing, ready for PDF.js or cloud processing
- **Citation System**: Implemented with page navigation functionality

## Deployment Strategy

### Development Environment
- **Single Command Setup**: `npm run dev` starts both frontend and backend
- **Hot Reload**: Vite handles frontend changes, TSX handles backend changes
- **Storage**: In-memory storage for rapid development iteration

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles Netlify Functions to `netlify/functions/server.js`
- **Deployment**: Serverless architecture with automatic scaling

### GitHub Integration
- **Repository**: Deployed to https://github.com/mohanviswa7/mindnote
- **Version Control**: Complete Git setup with proper .gitignore
- **Collaboration**: README.md with setup and contribution guidelines

### Netlify Deployment
- **Automatic Builds**: Connected to GitHub for continuous deployment
- **Serverless Functions**: API routes handled by Netlify Functions
- **Static Hosting**: Frontend served via global CDN
- **Custom Domain**: Ready for custom domain configuration

### Environment Requirements
- **Runtime**: Node.js 18+ for Netlify Functions
- **Storage**: In-memory for demo, cloud storage recommended for production
- **File Uploads**: Currently memory-based, suitable for demonstration

### Scaling Considerations
- **File Storage**: Recommend AWS S3, Cloudinary, or similar for production
- **Database**: Ready for PostgreSQL, MongoDB, or other persistent storage
- **AI Processing**: Architecture supports external AI service integration
- **Performance**: CDN distribution and serverless auto-scaling included