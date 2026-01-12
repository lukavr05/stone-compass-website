# Stone Compass Website

Official website for Stone Compass - a modern music band showcasing their music, events, and media presence.

## About Stone Compass

Stone Compass is a dynamic musical group that creates immersive experiences through their unique sound and performances. This website serves as the central hub for fans to discover music, stay updated on events, and connect with the band across various platforms.

## Features

- **Responsive Design**: Optimized for all devices - mobile, tablet, and desktop
- **Interactive Hero Section**: Parallax scrolling effects with smooth animations
- **Music Platform Integration**: Direct links to Spotify, Apple Music, Amazon Music, TIDAL, YouTube Music, Bandcamp, and Deezer
- **Social Media Connectivity**: Seamless integration with Instagram and TikTok
- **Events Calendar**: Stay updated with upcoming performances and shows
- **Media Gallery**: Visual content and band highlights
- **Modern UI/UX**: Built with Material-UI and Framer Motion for smooth interactions

## Tech Stack

- **Frontend**: React 19 with Vite for fast development
- **UI Framework**: Material-UI (MUI) v7 for component library
- **Animations**: Framer Motion for smooth, performant animations
- **Routing**: React Router DOM for navigation
- **Icons**: Simple Icons for brand platform icons
- **Typography**: Multiple font sources including Cascadia Code, Caprasimo, and more
- **Build Tool**: Vite for lightning-fast development and building

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

## Available Scripts

- `bun dev` - Start the development server with hot reload
- `bun build` - Build the production version of the website
- `bun preview` - Preview the production build locally
- `bun lint` - Run ESLint to check for code issues

## Design Highlights

### Interactive Listen Now Button
- Expands on hover to reveal all music streaming platforms
- Smooth animations with platform-specific colors
- Touch-friendly for mobile devices
- Direct links to official Stone Compass music

### Responsive Layout
- Mobile-first approach with breakpoints for all screen sizes
- Optimized scroll behavior and snap points
- Adaptive typography and spacing

### Performance Optimizations
- Lazy loading for images
- Optimized animations with GPU acceleration
- Minimal bundle size with tree shaking

## Platform Links

The website integrates with the following platforms:

**Music Streaming:**
- [Spotify](https://open.spotify.com/artist/3wUFlvi969GemCVnpuF7eG)
- [Apple Music](https://music.apple.com/artist/stone-compass/1738926067)
- [Amazon Music](https://music.amazon.com/artists/B0BB8M6B8V/stone-compass)
- [TIDAL](https://tidal.com/artist/46884128)
- [YouTube Music](https://www.youtube.com/channel/UCDxrFlpeL4LB40u27yVfXjg)
- [Bandcamp](https://stonecompass.bandcamp.com/)
- [Deezer](https://www.deezer.com/en/artist/stone-compass)

**Social Media:**
- [Instagram](https://www.instagram.com/stonecompassmusic/)
- [TikTok](https://tiktok.com/@stonecompassmusic)

## Project Structure

```
stone-compass-website/
├── src/
│   ├── components/
│   │   └── SideBar.jsx          # Navigation sidebar
│   ├── constants/
│   │   └── platforms.jsx        # Music platform configurations
│   ├── pages/
│   │   ├── Home.jsx             # Main landing page
│   │   ├── Events.jsx           # Events page
│   │   ├── Highlights.jsx       # Band highlights
│   │   └── Media.jsx            # Media gallery
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── public/
│   └── images/                  # Static images and assets
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Connect with Stone Compass

- **Website**: [stonecompassmusic.com](https://stonecompassmusic.com)
- **Instagram**: [@stonecompassmusic](https://www.instagram.com/stonecompassmusic/)
- **TikTok**: [@stonecompassmusic](https://tiktok.com/@stonecompassmusic)

---

Built with care for Stone Compass and their fans.