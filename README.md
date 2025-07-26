# Secure Sight Dashboard

A comprehensive security monitoring dashboard built with Next.js and modern web technologies.

## Project Structure

This is a monorepo containing:

- **`frontend/`** - Next.js 15 application with React 19 and Tailwind CSS
- **`backend/`** - Prisma-based backend with SQLite database

## Quick Start

### Development

```bash
# Install all dependencies
npm run install:all

# Start frontend development server
npm run dev

# Or start individual services
cd frontend && npm run dev
cd backend && npm run seed
```

### Production Build

```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment with the following setup:

- **Root `vercel.json`** - Configures deployment from the `frontend/` directory
- **Frontend `vercel.json`** - Additional frontend-specific configuration
- **Monorepo structure** - Properly organized for deployment

#### Deployment Steps:

1. **Push to GitHub** - Ensure your code is in a GitHub repository
2. **Connect to Vercel** - Import your repository in Vercel
3. **Automatic Detection** - Vercel will detect Next.js and use the root `vercel.json`
4. **Deploy** - Vercel will build and deploy from the `frontend/` directory

#### Configuration Details:

- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/.next`
- **Framework**: Next.js
- **Install Command**: `cd frontend && npm install`

### Environment Variables

No environment variables are required for the current setup as the frontend uses mock data.

## Features

- 🎥 Real-time security incident monitoring
- 📊 Interactive dashboard with incident timeline
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast performance with Next.js 15
- 🎯 TypeScript for type safety
- 🔧 Mock API for development and demo

## Tech Stack

### Frontend
- **Framework**: Next.js 15.4.3
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Language**: TypeScript

### Backend
- **Database**: SQLite with Prisma
- **Language**: TypeScript
- **ORM**: Prisma Client

## License

MIT
