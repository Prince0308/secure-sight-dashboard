# Secure Sight Dashboard - Frontend

A modern security dashboard built with Next.js 15, React 19, and Tailwind CSS.

## Features

- 🎥 Real-time incident monitoring
- 📊 Security dashboard with incident timeline
- 🎨 Modern, responsive UI
- ⚡ Fast performance with Next.js 15
- 🎯 TypeScript for type safety

## Tech Stack

- **Framework**: Next.js 15.4.3
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy
4. The `vercel.json` file is already configured

### Environment Variables

No environment variables are required for the current setup as it uses mock data.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── Components/        # React components
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
│   ├── thumbnails/       # Incident thumbnails
│   └── MANDLACX.png      # Logo
├── lib/                  # Utility functions
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment config
```

## API Endpoints

- `GET /api/incidents` - Fetch unresolved incidents
- `PATCH /api/incidents` - Resolve an incident

## License

MIT 