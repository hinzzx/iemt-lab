# iEMT Lab - Electric Motor Technology Laboratory

A modern, responsive website for iEMT Lab showcasing electric vehicle conversion services and products.

## Features

- **Modern Design**: Clean, dark-themed UI with smooth animations
- **Responsive**: Fully responsive design for all devices
- **Product Showcases**: Electric ATV, KangoZE Enhanced, and Converted Vehicles pages
- **Contact Form**: Integrated contact section for inquiries
- **Optimized Performance**: Built with Next.js 16 for optimal performance

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Animations**: CSS animations with custom hooks

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/iemt-lab.git
cd iemt-lab
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
iemt-lab/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── converted-atv/
│   │   ├── kangoze-enhanced/
│   │   └── converted-vehicles/
│   ├── components/
│   │   ├── layout/      # Header, Footer
│   │   ├── sections/    # Page sections (Hero, Products, About, Contact)
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── netlify.toml         # Netlify deployment configuration
└── next.config.ts       # Next.js configuration
```

## Deployment on Netlify

### Option 1: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/iemt-lab)

### Option 2: Manual Deployment

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository.

2. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings** (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

4. **Deploy**: Click "Deploy site"

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod
```

## Environment Variables

For production deployment, you may want to set these environment variables in Netlify:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Your site URL (e.g., https://iemt-lab.com) |

## Performance Optimizations

- Image optimization with Next.js Image component
- CSS optimization enabled
- Static asset caching headers configured
- Gzip compression enabled

## License

This project is proprietary software for iEMT Lab.

## Contact

- Website: [iemt-lab.com](https://www.iemt-lab.com)
- Email: contact@iemt-lab.com
- Phone: +359 89 354 2287
