# Gvozdi

> A practice, not an app.

Gvozdi is a minimalist PWA companion for Sadhu nail board practice — helping you build resilience through deliberate discomfort, track your sessions, and layer in complementary practices like breathwork, cold exposure, and meditation.

---

## Screenshots

<!-- screenshot: Home screen with mood check-in -->
<!-- screenshot: Practice session timer (Nails) -->
<!-- screenshot: Progress screen with weekly chart -->
<!-- screenshot: Achievements overlay -->

---

## Features

- **Mood check-in** — log how you feel before each session (Tense, Neutral, Settled, Open)
- **6 practice types** — Nail board, Breathwork, Cold exposure, Meditation, Mindful walks, Journaling
- **Session timer** — guided active session screen for each practice type
- **Streak tracking** — stay consistent with daily and weekly streaks
- **Achievements** — unlock milestones as your practice deepens
- **Progress visualization** — weekly charts and full session history
- **Offline-capable PWA** — installable on iOS and Android, works without a connection

---

## Tech Stack

| Layer     | Technology          |
| --------- | ------------------- |
| Framework | React 18 + Vite 5   |
| Styling   | Tailwind CSS 3      |
| State     | Zustand + IndexedDB |
| Auth      | Clerk               |
| PWA       | vite-plugin-pwa     |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Set up a `.env` file with your Clerk publishable key:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_...
```

---

## License

MIT
