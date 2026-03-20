# TalentsFlow.ai - Technical Implementation Plan

## 1. Project Structure

```
talentflow-ai/
├── src/
│   └── app/
│       ├── components/
│       │   ├── HeroSection.tsx
│       │   ├── FeaturesSection.tsx
│       │   ├── ContactForm.tsx
│       │   ├── Footer.tsx
│       │   └── ClientComponents.tsx
│       ├── api/
│       │   ├── contact/route.ts
│       │   └── vitals/route.ts
│       ├── layout.tsx
│       ├── page.tsx
│       ├── globals.css
│       ├── error.tsx
│       └── loading.tsx
├── public/
│   ├── logo.png
│   ├── favicon.ico
│   ├── manifest.json
│   ├── sw.js
│   ├── robots.txt
│   └── sitemap.xml
├── docs/
│   ├── constitution.md
│   ├── spec.md
│   ├── plan.md
│   └── tasks.md
├── vercel.json
└── package.json
```

## 2. Technology Stack

### 2.1 Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | Latest | Styling |
| React | 19.x | UI library |

### 2.2 Fonts
```typescript
Poppins({
  weights: [300, 400, 500, 600, 700, 800],
  subsets: ['latin']
})
```

### 2.3 Dependencies
- `next/font/google` - Font optimization
- `lucide-react` - Icons (via inline SVG)
- `@vercel/analytics` - Optional analytics

## 3. Component Architecture

### 3.1 HeroSection.tsx
```
State:
- isVisible: boolean (animation trigger)
- isMobileMenuOpen: boolean

Props: None (standalone)

Dependencies:
- Logo image
- Google Fonts (Poppins)
```

### 3.2 FeaturesSection.tsx
```
State:
- isVisible: boolean (scroll animation)

Props: None (standalone)

Dependencies:
- Feature data (static array)
- SVG icons (inline)
- IntersectionObserver (animation)
```

### 3.3 ContactForm.tsx
```
State:
- formData: { name, email, company, role, message, hiringNeeds }
- errors: validation errors
- isSubmitting: boolean
- isSubmitted: boolean
- focusedField: string | null

Props: None

API: POST /api/contact
```

### 3.4 Footer.tsx
```
Props: None (standalone)

Content:
- Company info
- Navigation links
- Social icons
- Copyright
```

## 4. API Design

### 4.1 Contact Form API
```
POST /api/contact
Request:
{
  name: string,
  email: string,
  company: string,
  role?: string,
  message: string,
  hiringNeeds?: string
}

Response (200):
{ success: true, message: "Form submitted successfully" }

Response (400):
{ error: "Missing required fields" }
```

### 4.2 Vitals API
```
POST /api/vitals
Request:
{
  name: string,
  value: number,
  id: string
}

Response (200):
{ success: true }
```

## 5. Styling Strategy

### 5.1 CSS Architecture
1. **Tailwind Config** - Extended with custom colors
2. **globals.css** - CSS variables, resets, custom styles
3. **Inline Styles** - Dynamic values only (gradients, animations)

### 5.2 Custom Colors (Tailwind)
```javascript
colors: {
  navy: '#020617',
  darkBlue: '#0a192f',
  cyan: '#00D2FF',
  violet: '#7c3aed',
  gray: {
    primary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  }
}
```

### 5.3 Animation Classes
```css
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-glow {
  background: linear-gradient(135deg, #00D2FF, #7c3aed);
}
```

## 6. Performance Optimizations

### 6.1 Next.js Config
```javascript
// next.config.js
{
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: ['images.unsplash.com']
  }
}
```

### 6.2 Font Optimization
- Use `next/font/google` for automatic font optimization
- Preload critical fonts
- Font display: swap

### 6.3 Image Optimization
- Lazy loading for below-fold images
- Eager loading for hero image
- WebP/AVIF format when supported

## 7. SEO Implementation

### 7.1 Metadata
```typescript
export const metadata = {
  title: 'TalentsFlow.ai | AI-Powered Technical Interviews',
  description: '...',
  openGraph: { ... },
  twitter: { ... }
}
```

### 7.2 Additional SEO Files
- `robots.txt` - Crawler instructions
- `sitemap.xml` - Site structure
- `manifest.json` - PWA manifest

## 8. PWA Configuration

### 8.1 Service Worker Features
- Cache static assets
- Offline fallback page
- Push notification support (future)

### 8.2 Manifest
```json
{
  "name": "TalentsFlow.ai",
  "short_name": "TalentsFlow",
  "theme_color": "#00D2FF",
  "background_color": "#020617",
  "display": "standalone"
}
```

## 9. Accessibility Implementation

### 9.1 ARIA Labels
- All buttons have aria-label
- Form inputs have associated labels
- Navigation has role="navigation"

### 9.2 Keyboard Support
- Tab navigation works throughout
- ESC closes mobile menu
- Enter/Space activates buttons

### 9.3 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 10. Deployment

### 10.1 Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs"
}
```

### 10.2 Environment Variables
- `NEXT_PUBLIC_GA_ID` - Google Analytics
- `RESEND_API_KEY` - Email service (optional)

### 10.3 Deployment URL
- Production: https://talentflow-ai-phi.vercel.app
- Repository: https://github.com/ipat13/talentflow-ai

---

**Related Documents**:
- `constitution.md` - Project rules
- `spec.md` - Feature specifications
- `tasks.md` - Development tasks

**Version**: 1.0.0
**Last Updated**: 2026-03-20
