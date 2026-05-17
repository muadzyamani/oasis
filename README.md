# Oasis 🌴

> *A calm focus app where your sessions grow a living sanctuary.*

Oasis is a Pomodoro-based productivity app where every focus session tends to a beautiful, growing desert oasis. The emotional goal is calmness, serenity, and gentle motivation — not hustle culture.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Animations | Framer Motion |
| State | Zustand (with localStorage persistence) |
| Fonts | Cormorant Garamond · Plus Jakarta Sans · DM Mono |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source with Prettier |

## Project Structure

```
src/
├── assets/          # SVG scene layers, element sprites, icons
├── components/
│   ├── scene/       # Oasis scene composition (layers, elements)
│   ├── timer/       # Timer widget and controls
│   ├── overlays/    # Stats panel, settings drawer, onboarding
│   └── ui/          # Primitive components (AppShell, GlassPanel, etc.)
├── stores/          # Zustand state (timer, sessions, oasis, settings, stats)
├── engines/         # Pure logic: growth engine, ambient engine, audio manager
├── hooks/           # Custom React hooks
├── types/           # TypeScript interfaces and type definitions
├── constants/       # Growth milestones, soundscapes, theme tokens
├── utils/           # Formatters, time utils, streak utils
└── styles/          # tokens.css, globals.css
```

## Design Philosophy

- **No punishment mechanics** — the oasis never wilts or dies
- **Growth only moves forward** — every minute of focus is permanent
- **Layers, not pages** — the living scene is always present
- **Whisper, don't shout** — all feedback is gentle and atmospheric

## Phase Roadmap

- **Phase 1** ✅ — Project foundations, design system, store architecture
- **Phase 2** 🔜 — Live animated Oasis scene + functional Pomodoro timer
- **Phase 3** — Audio system, overlays, onboarding, streaks
- **Phase 4** — Cloud sync, themes, seasonal events
- **Phase 5** — Shared focus rooms, companion, AI environments