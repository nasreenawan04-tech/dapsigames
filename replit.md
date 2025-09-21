# DapsiGames - Educational Gaming Platform

## Overview

DapsiGames is a modern web application that combines education and gaming to create an engaging learning platform for students. The platform features a comprehensive collection of educational games across multiple categories (Math, Vocabulary, Memory, Logic, Language, Science), user management with leaderboards, and a responsive design built with React and TypeScript.

The application follows a full-stack architecture with a React frontend, Express.js backend, and PostgreSQL database, designed to provide an interactive and gamified learning experience for students of all ages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom design tokens for responsive, mobile-first design
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Pattern**: Repository pattern with in-memory storage for development and PostgreSQL for production
- **API Design**: RESTful endpoints for games, categories, users, leaderboards, and contact management
- **Error Handling**: Centralized error handling middleware with structured error responses

### Database Design
- **Primary Database**: PostgreSQL with connection pooling via Neon serverless
- **Schema Management**: Drizzle migrations for version-controlled database changes
- **Core Entities**: 
  - Users (authentication, profiles, scoring)
  - Games (content, metadata, play tracking)
  - Categories (organization, game grouping)
  - Leaderboard entries (competitive scoring)
  - Contact messages (user communication)

### Authentication & Authorization
- Session-based authentication using PostgreSQL session store
- User roles and permissions for content access
- Secure password handling with proper validation
- Age-group based content filtering

### Development Environment
- **Development Server**: Vite dev server with HMR for frontend
- **API Development**: tsx for TypeScript execution in development
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Asset Management**: Static asset serving with proper caching headers

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migration and schema management tooling

### UI & Styling Dependencies
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Class Variance Authority**: Dynamic component styling with TypeScript support

### Development & Build Tools
- **Vite**: Build tool with development server and production optimization
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript/TypeScript bundling for production
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

### Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation and formatting utilities

### Platform Integration
- **Replit Plugins**: Development environment integration for Replit platform
- **Connect PG Simple**: PostgreSQL session store for Express sessions
- **Express Session**: Session management middleware for user authentication