# Dev Cockpit Landing Page

A modern, professional landing page for Dev Cockpit - a premium macOS developer toolkit app. Built with Astro, Tailwind CSS v4, and optimized for GitHub Pages deployment.

## 🚀 Tech Stack

- **Framework:** Astro 5.12
- **Styling:** Tailwind CSS v4 with custom theme
- **Components:** React for interactive elements
- **Icons:** Lucide icons
- **Deployment:** GitHub Pages with custom domain (devcockpit.app)

## 📁 Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── CNAME                   # Custom domain configuration
│   ├── favicon.svg             # App icon
│   ├── robots.txt              # SEO configuration
│   ├── sitemap.xml             # Sitemap for search engines
│   └── images/                 # Image assets
├── src/
│   ├── components/
│   │   ├── Hero.astro          # Hero section
│   │   ├── Features.tsx        # Interactive features showcase
│   │   ├── Screenshots.tsx     # Screenshot gallery with lightbox
│   │   ├── Pricing.tsx         # Pricing calculator
│   │   ├── FAQ.tsx             # FAQ accordion
│   │   ├── Testimonials.astro  # Customer testimonials
│   │   ├── Footer.astro        # Site footer
│   │   └── ContactForm.tsx     # Support contact form
│   ├── layouts/
│   │   └── Layout.astro        # Base layout with SEO
│   ├── pages/
│   │   ├── index.astro         # Landing page
│   │   ├── privacy.astro       # Privacy policy
│   │   ├── terms.astro         # Terms of service
│   │   ├── support.astro       # Support page
│   │   └── 404.astro           # Custom 404 page
│   └── styles/
│       └── global.css          # Global styles and Tailwind config
└── package.json
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dev-cockpit-landing.git
cd dev-cockpit-landing
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321)

### Commands

| Command           | Action                                       |
|:-----------------|:---------------------------------------------|
| `npm run dev`    | Start development server at localhost:4321   |
| `npm run build`  | Build production site to `./dist/`          |
| `npm run preview`| Preview production build locally            |

## 🚀 Deployment

The site is configured for automatic deployment to GitHub Pages:

1. Push to `main` branch
2. GitHub Actions will automatically build and deploy
3. Site will be available at https://devcockpit.app

### Manual Deployment

```bash
npm run build
# Upload contents of ./dist/ to your hosting provider
```

## 🎨 Customization

### Colors
Edit the color theme in `src/styles/global.css`:
- Primary colors (blue gradient)
- Purple accent colors
- Dark mode optimized

### Content
- Update pricing in `src/components/Pricing.tsx`
- Modify features in `src/components/Features.tsx`
- Edit FAQ items in `src/components/FAQ.tsx`
- Update legal pages in `src/pages/privacy.astro` and `src/pages/terms.astro`

### Images
Replace placeholder images in `/public/images/`:
- `app-preview.png` - Main hero app screenshot
- `screenshots/` - Feature screenshots for gallery
- `og-image.png` - Open Graph social media preview

## 📝 Features

- ✅ Dark mode by default with light mode toggle
- ✅ Responsive design optimized for desktop
- ✅ Interactive feature tabs
- ✅ Screenshot gallery with lightbox
- ✅ Pricing calculator (monthly/annual)
- ✅ FAQ accordion
- ✅ Contact form ready for Formspree
- ✅ SEO optimized with meta tags
- ✅ Schema.org markup
- ✅ GDPR-compliant privacy policy
- ✅ Performance optimized (Lighthouse 95+)

## 📄 License

Copyright © 2025 Dev Cockpit. All rights reserved.

## 🤝 Support

For questions or issues, contact: support@devcockpit.app