"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2 as Github } from 'lucide-react';
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

const PROJECTS = [
  {
    id: "1",
    title: "Meridian Design System",
    description:
      "A comprehensive component library and design token system built for scale. Ships with Figma integration, automated accessibility audits, and a live Storybook environment.",
    image: "https://s3-alpha.figma.com/hub/file/2387880917543138556/4f605806-959e-4625-8a0c-088db073060b-cover.png",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    category: "Design",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: true,
  },
  {
    id: "2",
    title: "Pulse Analytics",
    description:
      "Real-time web analytics platform with custom event tracking, funnel visualization, and privacy-first architecture. No cookies, no fingerprinting.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/38deffc81c844d4d8aa18ccd6734a8c8.png",
    tags: ["Next.js", "PostgreSQL", "Clickhouse", "tRPC"],
    category: "Web",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: true,
  },
  {
    id: "3",
    title: "Folio — Read Tracker",
    description:
      "A minimal iOS app for tracking reading habits, annotating highlights, and discovering your next book through a curated recommendation engine.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/673c95b6b52b4e5086daaf1fdd84904f.jpg",
    tags: ["Swift", "SwiftUI", "CoreData", "CloudKit"],
    category: "Mobile",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: false,
  },
  {
    id: "4",
    title: "Openblocks",
    description:
      "An open-source low-code platform for building internal tools. Drag-and-drop UI builder with SQL, REST, and GraphQL connectors out of the box.",
    image: "https://picsum.photos/seed/8adf60026af0/800/600",
    tags: ["React", "Node.js", "MongoDB", "Docker"],
    category: "OSS",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: true,
  },
  {
    id: "5",
    title: "Terrain — 3D Maps",
    description:
      "Interactive 3D terrain visualization built on MapLibre GL and custom WebGL shaders. Supports real-time elevation data and satellite imagery overlays.",
    image: "https://picsum.photos/seed/babe3986985f/800/600",
    tags: ["WebGL", "MapLibre", "GLSL", "TypeScript"],
    category: "Web",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: false,
  },
  {
    id: "6",
    title: "Capsule — Time Vault",
    description:
      "A cross-platform mobile app for creating encrypted digital time capsules. Schedule messages, photos, and voice notes to be delivered years in the future.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/28b93651b57443f088e625c68f7943c3.jpg",
    tags: ["React Native", "Expo", "Supabase", "E2E Encryption"],
    category: "Mobile",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: false,
  },
  {
    id: "7",
    title: "Inkwell CMS",
    description:
      "A headless CMS built for developers who write. Markdown-first, Git-backed, with a beautiful editor and a GraphQL API that deploys in under 60 seconds.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/1d781579fe204d04b8824b3c51548818.png",
    tags: ["Go", "GraphQL", "React", "SQLite"],
    category: "OSS",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: false,
  },
  {
    id: "8",
    title: "Hue — Color Studio",
    description:
      "A professional color palette generator and accessibility checker. Export to CSS variables, Tailwind config, Figma tokens, or Swift color assets.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/03cbe6c443164b14b95cc3b1dc67e85f.png",
    tags: ["Vue 3", "Canvas API", "WCAG", "Design Tokens"],
    category: "Design",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: false,
  },
  {
    id: "9",
    title: "Relay — P2P File Share",
    description:
      "Serverless peer-to-peer file transfer using WebRTC. No uploads, no storage, no size limits. Files travel directly between browsers with end-to-end encryption.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/7b8ef73152d541c3902359f7f3c01900.png",
    tags: ["WebRTC", "TypeScript", "Vite", "Tailwind"],
    category: "OSS",
    link: "https://github.com/alexmorrow",
    github: "https://github.com/alexmorrow",
    featured: false,
  },
];

const CATEGORIES = ["All", "Web", "Mobile", "Design", "OSS"] as const;
type Category = (typeof CATEGORIES)[number];

export default function ProjectsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-[hsl(var(--border))] px-6 pb-16 pt-24 md:px-12 md:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-[120px]" />
          </div>
          <div className="mx-auto max-w-5xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-4 inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]"
            >
              {t("projects.badge")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="text-balance text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-6xl"
            >
              {t("projects.heading")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
              className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg"
            >
              {t("projects.subheading")}
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Filter Bar */}
      <Reveal>
        <section className="sticky top-0 z-20 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 px-6 py-4 backdrop-blur-md md:px-12">
          <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto pb-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  activeCategory === cat
                    ? "text-[hsl(var(--foreground))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                )}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/40"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
            <span className="ml-auto shrink-0 text-xs text-[hsl(var(--muted-foreground))]">
              {filtered.length} {t("projects.count")}
            </span>
          </div>
        </section>
      </Reveal>

      {/* Project Grid */}
      <section className="px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  custom={i}
                  layout
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12),0_20px_40px_-12px_rgba(0,0,0,0.28)]",
                    project.featured && "sm:col-span-2 lg:col-span-1"
                  )}
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[hsl(var(--muted))]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.background =
                            "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--card)) 100%)";
                        }
                      }}
                    />
                    {project.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black">
                        {t("projects.featured")}
                      </span>
                    )}
                    <span className="absolute right-3 top-3 rounded-full border border-[hsl(var(--border))]/60 bg-[hsl(var(--background))]/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h2 className="text-base font-semibold leading-snug tracking-tight text-[hsl(var(--foreground))]">
                      {project.title}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/60 px-2.5 py-0.5 text-[11px] font-medium text-[hsl(var(--muted-foreground))]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-1 flex items-center gap-3 border-t border-[hsl(var(--border))] pt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] transition-opacity hover:opacity-75"
                      >
                        {t("projects.viewProject")}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source on GitHub`}
                        className="ml-auto flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("projects.source")}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <p className="text-lg font-medium text-[hsl(var(--foreground))]">
                {t("projects.empty.title")}
              </p>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                {t("projects.empty.body")}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Strip */}
      <Reveal>
        <section className="border-t border-[hsl(var(--border))] px-6 py-20 md:px-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
              {t("projects.cta.heading")}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {t("projects.cta.body")}
            </p>
            <a
              href="mailto:hello@alexmorrow.dev"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              {t("projects.cta.button")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}