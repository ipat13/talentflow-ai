# TalentsFlow.ai

> AI-Powered Technical Interview Platform Landing Page

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B&style=flat-square&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel)

## Overview

TalentsFlow.ai is a modern landing page for an AI-powered technical interview platform. Built with Next.js 16, TypeScript, and Tailwind CSS, featuring a dark theme with glassmorphism effects.

**Live Demo**: [https://talentflow-ai-phi.vercel.app](https://talentflow-ai-phi.vercel.app)

## Features

- Dark Theme - Navy/Black (#020617) background with cyan/violet accents
- Glassmorphism - Modern glass effects with backdrop blur
- Responsive - Mobile-first design, works on all devices
- Performance - Optimized with Next.js best practices
- SEO Ready - Meta tags, Open Graph, sitemap, robots.txt
- PWA - Installable as an app
- Accessible - WCAG 2.1 AA compliant
- Animations - Smooth fade-in and hover effects

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vercel | Deployment |
| Resend | Email service |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ipat13/talentflow-ai.git
cd talentflow-ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env.local` file with:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Resend Email API (optional)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Contact email (receives form submissions)
CONTACT_EMAIL=your@email.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Getting API Keys

- Google Analytics: [analytics.google.com](https://analytics.google.com)
- Resend: [resend.com](https://resend.com) (Free tier available)

## Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Spec Kit Documentation

This project follows the Spec-Driven Development workflow:

| Document | Description |
|---------|-------------|
| docs/constitution.md | Project rules and principles |
| docs/spec.md | Feature specifications |
| docs/plan.md | Technical architecture |
| docs/tasks.md | Development tasks |

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Background | #020617 | Main background |
| Accent Cyan | #00D2FF | Primary accent |
| Accent Violet | #7c3aed | Secondary accent |
| Text Primary | #FFFFFF | Headlines |
| Text Secondary | #94a3b8 | Body text |

### Typography

- Font: Poppins (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

## Deployment

### Vercel (Recommended)

1. Fork or import this repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ipat13/talentflow-ai)

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## License

MIT License

---

Built with by [ipat13](https://github.com/ipat13)
