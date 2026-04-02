# ConnectX Frontend

A modern social networking platform UI built with React 18, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Runs at: `http://localhost:5173`

## 🔐 Demo Login

Any email + any password will log you in (mock auth).

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Zustand | State Management |
| React Router v6 | Routing |
| Lucide React | Icons |

## 📁 Project Structure

```
src/
├── features/
│   ├── auth/          # Login page
│   ├── feed/          # Home feed, post cards, widgets
│   ├── posts/         # Post creation modal
│   ├── profile/       # User profile page
│   └── notifications/ # Notifications + Settings
├── components/
│   ├── ui/            # Avatar, Button
│   └── layout/        # Sidebar, Topbar, AppLayout
├── store/             # Zustand stores (auth, ui)
├── types/             # TypeScript interfaces
├── constants/         # Mock data
└── router/            # Route definitions
```

## 🎨 Pages

- `/auth` — Login page with Google/GitHub OAuth buttons
- `/feed` — Home feed with posts, trending, and "who to follow"
- `/profile` — User profile with posts/replies/media tabs
- `/notifications` — Notification feed with type icons
- `/settings` — Settings panel with dark mode toggle

## 🌙 Dark Mode

Click the moon/sun icon in the topbar to toggle dark mode.

## 📦 Build for Production

```bash
npm run build
npm run preview
```
