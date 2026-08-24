# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a modern portfolio website with dark mode

## Goal
Build a modern dark-mode portfolio website with animated hero, projects showcase, about, and contact pages using Next.js 14 App Router and Tailwind CSS.

## Project type
portfolio

## Design system — match this exactly
- Color tokens: `--background: #0A0A0A`, `--card: #141414`, `--border: #2A2A2A`, `--foreground: #F2F2F2`, `--muted-foreground: #888888`, `--primary: #A855F7`, `--accent: #C084FC`, `--glow-primary: rgba(168, 85, 247, 0.15)`, `--glow-accent: rgba(192, 132, 252, 0.1)`, `--accent-fg: #ffffff`, `--accent-hover: #d8b4fe`, `--brand-accent: #A855F7`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `contact`, `home`, `nav`, `projects`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
