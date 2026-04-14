# Airframe Works

A modern React and TypeScript web app for exploring commercial aircraft with real aviation photography, rich filtering, and side-by-side comparison.

## Highlights

- Real airplane imagery integrated directly in the catalog data
- Clean, responsive UI across mobile and desktop
- Multi-filter catalog with search experience
- Detailed aircraft profile pages
- Aircraft comparison screen for quick evaluation

## Preview

Main sections included in the app:

- Home: visual hero and featured aircraft
- Catalog: searchable and filterable aircraft grid
- Detail: specs, highlights, operators, and gallery
- Compare: two-aircraft side-by-side metrics view

## Tech Stack

- React 19
- TypeScript
- React Router 6
- Vite 8
- ESLint 9

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Run lint checks

```bash
npm run lint
```

### 5) Preview production build

```bash
npm run preview
```

## Available Scripts

- npm run dev: starts local development server
- npm run build: runs TypeScript build and Vite bundle
- npm run lint: runs ESLint across project files
- npm run preview: serves built assets locally

## Project Structure

```text
src/
	components/
		common/
	context/
	data/
	pages/
	types/
	utils/
```

Key files:

- src/data/airplanes.json: aircraft catalog and image sources
- src/pages/Catalog.tsx: filtering and list UI
- src/pages/AirplaneDetail.tsx: full aircraft profile view
- src/pages/Comparison.tsx: side-by-side aircraft comparison
- src/context/airplaneStore.ts: reducer and shared airplane state

## Design Notes

- The UI uses expressive typography, layered backgrounds, and subtle motion.
- Accessibility-aware reduced-motion behavior is included.
- The interface is optimized for both dense desktop browsing and mobile touch layouts.

## Data and Images

- Aircraft data is currently stored in src/data/airplanes.json.
- Images are linked from public photo CDNs.
- Replace URLs in the JSON file if you want self-hosted or licensed local assets.

## Deployment

Because this is a Vite static app, deployment is straightforward:

1. Run npm run build
2. Upload the dist folder to your hosting platform

Works well on platforms like Netlify, Vercel, GitHub Pages, and static object storage.

## License

This project is currently unlicensed. Add a LICENSE file if you plan to publish or distribute it.
