# TalentsFlow.ai - Project Constitution

## 1. Core Principles (Non-Negotiable)

### 1.1 Design System
- [x] **Dark Theme Primary** - Navy/Black (#020617) background
- [x] **Accent Colors** - Cyan (#00D2FF) and Violet (#7c3aed) gradients
- [x] **Typography** - Poppins font family
- [x] **Glassmorphism** - Cards with backdrop-blur effects
- [x] **Responsive Design** - Mobile-first approach

### 1.2 Technical Stack
- [x] **Framework** - Next.js 16 with TypeScript
- [x] **Styling** - Tailwind CSS
- [x] **Deployment** - Vercel
- [x] **Version Control** - GitHub

### 1.3 Code Quality
- [x] **TypeScript** - Strict typing required
- [x] **Component Structure** - One component per file
- [x] **Naming Convention** - PascalCase for components, camelCase for functions
- [x] **No Console Logs** - In production code (except for errors)

## 2. Workflow Rules

### 2.1 Development Process (Spec-Driven Development)
1. **SPECIFY** → Write feature description in `spec.md`
2. **PLAN** → Create technical architecture in `plan.md`
3. **TASKS** → Break down into tasks in `tasks.md`
4. **IMPLEMENT** → Write code following the plan

### 2.2 Git Workflow
- [x] **Commit Messages** - Clear, descriptive (e.g., "Add hero section with dark theme")
- [x] **Branch Strategy** - Main branch for production
- [x] **Auto-Deploy** - Vercel auto-deploys on push to main

## 3. Design Specifications

### 3.1 Color Palette
```
Primary Background:  #020617 (Deep Navy)
Secondary Background: #0a192f (Dark Blue)
Accent Primary:     #00D2FF (Cyan)
Accent Secondary:   #7c3aed (Violet)
Text Primary:      #FFFFFF (White)
Text Secondary:    #94a3b8 (Gray)
Border:             rgba(255, 255, 255, 0.08)
```

### 3.2 Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Fallback**: system-ui, sans-serif

### 3.3 Spacing System
- **Base unit**: 4px (Tailwind default)
- **Section spacing**: py-24 (96px) mobile, py-32 (128px) desktop
- **Card gap**: 1.5rem (24px)

## 4. Component Requirements

### 4.1 Required Components
- [x] HeroSection - Landing banner
- [x] FeaturesSection - Bento grid layout
- [x] ContactForm - Functional form
- [x] Footer - Site footer
- [x] Header - Sticky navigation

### 4.2 Component Guidelines
- Use React functional components with "use client" directive
- Props interfaces defined with TypeScript
- CSS-in-JS using Tailwind classes
- Inline styles for dynamic values only

## 5. Accessibility Requirements
- [x] Skip to content link
- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Focus states visible
- [x] Color contrast WCAG AA compliant

## 6. Performance Requirements
- [x] Lighthouse Performance > 90
- [x] First Contentful Paint < 1.5s
- [x] Lazy loading for images
- [x] Optimized fonts (next/font)

## 7. SEO Requirements
- [x] Meta title and description
- [x] Open Graph tags
- [x] Twitter cards
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URL

---

**Last Updated**: 2026-03-20
**Version**: 1.0.0
