# Stone Compass Website

Official website for Stone Compass — a modern music band showcasing music, events, media, and connecting with fans across streaming platforms.

## Overview

Stone Compass Website is a React-based promotional site for a music band. It provides visitors with direct links to music streaming platforms, upcoming events information, media galleries, and social media connectivity. The site features a responsive design with smooth animations and a dark/light theme toggle.

## Prerequisites

- Node.js 20+ (LTS recommended)
- Bun 1.0+ (or npm/yarn/pnpm as alternatives)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/stone-compass-website.git
cd stone-compass-website
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_ADMIN_PASSWORD` | Yes | (none) | Password for the admin panel at `/admin` |

The admin route is accessible at `/admin` once authenticated.

## Usage

The site has the following routes:

| Route | Description |
|-------|-------------|
| `/` | Home page with hero section and platform links |
| `/admin` | Admin panel for managing content (password protected) |

### Home Page Features

- **Hero Section**: Interactive parallax scrolling with band branding
- **Listen Now Button**: Expands to show all streaming platform links (Spotify, Apple Music, Amazon Music, TIDAL, YouTube Music, Bandcamp, Deezer)
- **Social Links**: Direct links to Instagram and TikTok
- **Events Preview**: Upcoming shows and performances
- **Media Gallery**: Visual content and band highlights

## Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Main router configuration
├── index.css            # Global Tailwind styles
├── components/
│   ├── SideBar.jsx       # Navigation sidebar
│   ├── admin/
│   │   ├── ReleaseManager.jsx
│   │   └── GalleryManager.jsx
│   └── ui/               # Reusable UI components
├── pages/
│   ├── Home.jsx          # Landing page
│   ├── Admin.jsx         # Admin panel
│   ├── Events.jsx       # Events calendar
│   ├── Highlights.jsx   # Band highlights
│   └── Media.jsx         # Media gallery
├── hooks/                # Custom React hooks
├── theme/                 # Theme provider and switcher
├── constants/            # Platform configuration
└── lib/                  # Utility functions
```

## Development

Run the development server:

```bash
bun dev
```

Build for production:

```bash
bun build
```

Preview production build:

```bash
bun preview
```

Run linting:

```bash
bun lint
```

## Deployment

1. Build the production assets:

```bash
bun build
```

2. The output in `dist/` can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.)

## License

This project is currently unlicensed.