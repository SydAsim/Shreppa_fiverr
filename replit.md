# SHERPA - AI-Powered Vulnerability Management Platform

## Overview

SHERPA is a comprehensive cybersecurity vulnerability management platform that combines AI-powered analysis with real-time monitoring and automated remediation capabilities. The application features a modern, responsive frontend built with React and TypeScript, designed to help security teams identify, prioritize, and resolve security threats efficiently.

The platform includes an engaging landing page with animated components, a fully functional dashboard with vulnerability management, AI chat assistance, team collaboration tools, and comprehensive reporting features. The application is designed as a frontend-only MVP with mock data and simulated API interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with a custom design system featuring SHERPA-specific color palette and theming
- **Animations**: Framer Motion for smooth animations and page transitions throughout the application
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface elements
- **State Management**: React Context API for global state management including authentication, theme, and application data
- **Routing**: Wouter for lightweight client-side routing between landing page, login, and dashboard

### Backend Simulation
- **Mock API**: Custom mock API layer simulating real backend interactions with Promise-based delays
- **Data Storage**: In-memory storage using Map collections with localStorage persistence for user sessions
- **Authentication**: Mock authentication system with hardcoded credentials (admin/password123)
- **Data Models**: Zod schemas for type-safe data validation and TypeScript interface generation

### Component Structure
- **Landing Page**: Multi-section animated landing page with hero, features, how-it-works, vulnerability feed, testimonials, and CTA sections
- **Dashboard**: Modular dashboard with sidebar navigation supporting multiple pages (overview, vulnerabilities, AI chat, reports, analytics, team, settings)
- **UI Components**: Reusable component library with cards, buttons, forms, modals, and specialized components like animated counters

### Data Management
- **Vulnerability Management**: CRUD operations for security vulnerabilities with status tracking, severity levels, and assignment workflows
- **Team Management**: Team member profiles with status indicators and role-based information
- **AI Chat**: Conversational interface with mock AI responses for security assistance and guidance
- **Analytics**: Mock data visualization for security metrics and performance tracking

### Responsive Design
- **Mobile-First**: Responsive design patterns ensuring functionality across mobile, tablet, and desktop devices
- **Adaptive UI**: Dynamic sidebar behavior and component layouts that adjust based on screen size
- **Touch-Friendly**: Interface elements optimized for touch interactions on mobile devices

### Development Workflow
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled
- **Code Organization**: Clear separation between client, server, and shared code with path aliases for clean imports
- **Hot Reload**: Development server with hot module replacement for rapid iteration

## External Dependencies

### Core Framework Dependencies
- **React & React DOM**: Frontend framework and rendering
- **TypeScript**: Type safety and enhanced development experience
- **Vite**: Build tool and development server with hot reload capabilities

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom SHERPA theme configuration
- **Radix UI**: Headless UI primitives for accessible component foundation
- **Framer Motion**: Animation library for smooth transitions and interactive elements
- **Lucide React**: Modern icon library for consistent iconography

### State and Data Management
- **TanStack React Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing solution for single-page application navigation
- **Zod**: Schema validation for runtime type checking and data validation

### Development and Database
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect configuration
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **ESBuild**: Fast bundler for server-side code compilation

### Utility Libraries
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **clsx & tailwind-merge**: Conditional className utilities for dynamic styling
- **date-fns**: Date manipulation and formatting utilities
- **nanoid**: Unique ID generation for various application needs

The application is configured for easy deployment on platforms like Vercel or Netlify, with separate build processes for client and server code. The mock data approach allows for immediate functionality demonstration without requiring database setup.