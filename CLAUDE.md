# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

**Development**:
- `npm start` - Start development server with live reload (runs `dev:clean` and `dev:11ty`)
- `npm run dev:11ty` - Start Eleventy development server only
- `npm run dev:clean` - Clean og-images directory

**Build & Deploy**:
- `npm run build` - Production build (cleans and builds for production)
- `npm run clean` - Remove `_site`, CSS, and script includes
- `./commit.sh` - Custom script to commit and push changes with GitHub Actions info

**Asset Generation**:
- `npm run favicons` - Generate favicon files using Sharp

## Architecture Overview

**Tech Stack**:
- **Eleventy 3.0** - Static site generator with Nunjucks templating
- **TailwindCSS** - Utility-first CSS with custom design tokens
- **PostCSS** - CSS processing with plugins
- **esbuild** - JavaScript bundling
- **Sharp** - Image optimization via eleventy-img
- **WebC** - Web components for custom elements

**Site Structure**:
```
src/
├── _config/          # Eleventy configuration modules
│   ├── collections.js # Blog posts, tags, markdown collections  
│   ├── filters.js     # Date, markdown, string manipulation
│   ├── plugins.js     # HTML/CSS/JS processing, markdown, RSS
│   └── shortcodes.js  # Image and SVG shortcodes
├── _data/            # Site metadata and design tokens
│   ├── designTokens/ # Colors, fonts, spacing, text sizes (JSON)
│   ├── meta.js       # Site info, author, blog configuration
│   └── navigation.js # Menu structure
├── _includes/        # Templates and components
│   ├── partials/     # Header, footer, navigation, cards
│   ├── css/         # Component-specific styles
│   ├── scripts/     # JavaScript components
│   └── webc/        # Custom web components
├── assets/          # Processed static assets
├── pages/           # Main site pages (about, blog, etc.)
├── posts/           # Blog posts organized by year
└── common/          # Generated files (sitemap, feeds, etc.)
```

**Content Management**:
- Content structured as newsletters in `src/posts/YYYY/` with markdown frontmatter (changed from traditional blog posts concept)
- Posts use `posts.json` for shared layout and permalink structure
- Collections defined in `_config/collections.js` for posts, tags, and sitemap
- Design tokens in `_data/designTokens/` control theming and spacing

**Styling System**:
- Custom TailwindCSS configuration with design tokens
- Fluid typography and spacing using Utopia generators
- CSS custom properties for theme variables
- CUBE CSS methodology with composition classes
- Light/dark theme support with persistent selection

**Key Features**:
- Image optimization with `eleventy-img` and responsive images
- Syntax highlighting for code blocks
- RSS and JSON feeds
- Open Graph image generation
- SVG icon system
- WebC custom components for YouTube embeds and galleries
- Accessible navigation and theme switching
- SEO optimization with meta tags and sitemap

**Deployment**:
- Builds to `_site` directory
- Netlify deployment with security headers
- GitHub Actions workflow for automated builds
- Asset caching and optimization for production

**Development Notes**:
- Configuration split across `src/_config/` modules for maintainability  
- Writing style guidelines in `writing_style.md` for blog content
- Cursor rules in `.cursorrules` define coding standards and component structure
- Environment variables via dotenv for production builds
- No traditional linting configured - follows Eleventy and TailwindCSS conventions