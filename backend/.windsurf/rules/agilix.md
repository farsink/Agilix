---
trigger: manual
---

# General Code Style & Formatting
- Use TypeScript for all frontend and backend code to enforce type safety.  
- Name React component files in PascalCase (e.g., `WorkoutPreferences.tsx`).  
- Always include the `"use client"` directive at the top of client‑side Next.js components.  
- Prefer named exports over default exports for all components and services.  

# Project Structure & Architecture
- Build on Next.js v15 using the App Router and organize routes under `src/app/`.  
- Maintain a dual‑database setup: PostgreSQL via Prisma for structured models and MongoDB via Mongoose for flexible documents.  
- Implement the backend API in Express.js with security middleware (Helmet, CORS) and version all routes under `/api/v1/`.  

# Styling & UI
- Style exclusively with Tailwind CSS (utility‑first, mobile‑first, purge unused classes).  
- Compose accessible UI primitives using Radix UI.  
- Ensure responsive layouts by using Tailwind’s breakpoint utilities.  
- Standardize icon use with Lucide React components.  

# Data Fetching & Forms
- Fetch data in React via TanStack Query with sensible cache and retry policies.  
- Handle forms with React Hook Form, persisting multi‑step flows in `sessionStorage`.  
- Validate all input schemas on both client and server using Zod.  

# State Management & Logic
- Use `sessionStorage` for temporary onboarding state and React Context or React Router DOM for complex client routing.  
- Show explicit loading and error states in every data‑driven component.  

# Authentication & Security
- Centralize auth via StackAuth with automatic token injection in HTTP clients.  
- Secure server with Helmet headers, CORS configuration, and verify incoming webhooks using Svix.  

# Backend & Database
- Define schemas and run migrations with Prisma for PostgreSQL.  
- Use Mongoose models for MongoDB collections.  
- Handle file uploads with FormData in the frontend and validate size/type server‑side.  

# External Integrations
- Configure Axios as the universal HTTP client with interceptors for base URLs and auth headers.  
- Orchestrate automation workflows using n8n webhooks.  
- Manage environment variables securely with dotenv and exclude secrets from source control.  
