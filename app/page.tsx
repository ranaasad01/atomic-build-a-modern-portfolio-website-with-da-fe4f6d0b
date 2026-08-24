"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Code2 as Github, Star, Zap, Code, Layers, Terminal, Activity, GitBranch, Sparkles, Eye, Heart } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    id: "fp1",
    title: "Luminary Design System",
    description:
      "A comprehensive component library powering 12 production apps. Built with React, TypeScript, and Storybook. Reduced design-to-code time by 60%.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/4a7d8f52bf6c4b4a9822dd7db3c568f0.png",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    link: "/projects",
    stat: "12 apps",
  },
  {
    id: "fp2",
    title: "Meridian Analytics",
    description:
      "Real-time data visualization platform processing 2M+ events per day. Built on Next.js, Supabase, and D3.js with a custom WebSocket layer.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f911d3ae99ac49d6aa993caa25a2b141.png",
    tags: ["Next.js", "Supabase", "D3.js", "WebSockets"],
    link: "/projects",
    stat: "2M+ events/day",
  },
  {
    id: "fp3",
    title: "Orbit CMS",
    description:
      "Headless content management system with a visual block editor, multi-tenant support, and a GraphQL API used by editorial teams worldwide.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f800318f8d124a6fb79ece5fdf2736aa.jpg",
    tags: ["GraphQL", "Node.js", "PostgreSQL", "React"],
    link: "/projects",
    stat: "40+ teams",
  },
];

const SKILLS = [
  { id: "s1", icon: Code, label: "Frontend", detail: "React · Next.js · TypeScript · Tailwind" },
  { id: "s2", icon: Terminal, label: "Backend", detail: "Node.js · PostgreSQL · GraphQL · Redis" },
  { id: "s3", icon: Layers, label: "Design", detail: "Figma · Design Systems · Motion · A11y" },
  { id: "s4", icon: GitBranch, label: "DevOps", detail: "Vercel · Docker · CI/CD · Monitoring" },
];

const STATS = [
  { id: "st1", value: "8+", label: "Years building" },
  { id: "st2", value: "60+", label: "Projects shipped" },
  { id: "st3", value: "12", label: "Open-source repos" },
  { id: "st4", value: "4", label: "Startups advised" },
];

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Alex rewrote our entire frontend in six weeks. The codebase is cleaner, the performance is night-and-day, and the team actually enjoys working in it now.",
    name: "Priya Nair",
    role: "CTO, Meridian Labs",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20Nair",
  },
  {
    id: "t2",
    quote:
      "The design system Alex built became the backbone of our product. It scaled from 3 engineers to 30 without a single breaking change.",
    name: "Jordan Osei",
    role: "Head of Product, Luminary",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan%20Osei",
  },
  {
    id: "t3",
    quote:
      "Rare combination of strong engineering instincts and genuine design taste. Alex ships things that look as good as they perform.",
    name: "Sofia Marchetti",
    role: "Founder, Orbit Studio",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Marchetti",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 4px 16px -4px rgba(0,0,0,0.12)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.12), 0 20px 40px -8px rgba(0,0,0,0.28)" },
};

function ProjectCard({ project }: { project: (typeof FEATURED_PROJECTS)[number] }) {
  const t = useTranslations();
  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-1)]/80 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-[var(--accent)]/90 px-3 py-1 text-xs font-semibold text-[var(--accent-fg)] backdrop-blur-sm">
          {project.stat}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/6 px-2.5 py-0.5 text-xs text-[var(--muted-foreground)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={project.link}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
        >
          {t("home.projects.viewProject")} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function SkillCard({ skill }: { skill: (typeof SKILLS)[number] }) {
  const Icon = skill.icon;
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/12 ring-1 ring-[var(--accent)]/20">
        <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold tracking-tight text-[var(--foreground)]">{skill.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">{skill.detail}</p>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <motion.figure
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm"
    >
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
        />
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">{testimonial.name}</p>
          <p className="text-xs text-[var(--muted-foreground)]">{testimonial.role}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="relative overflow-x-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--accent)]/6 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[var(--accent)]/4 blur-[100px]" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="hero"
          className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-32 text-center"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("home.hero.badge")}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-balance text-5xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl md:text-7xl"
            >
              {t("home.hero.headline1")}{" "}
              <span className="relative inline-block text-[var(--accent)]">
                {t("home.hero.headlineAccent")}
              </span>
              {" "}{t("home.hero.headline2")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]"
            >
              {t("home.hero.subheadline")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-fg)] shadow-[0_0_24px_-4px_var(--accent)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_32px_-4px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                {t("home.hero.ctaPrimary")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                {t("home.hero.ctaSecondary")}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--muted-foreground)]"
            >
              <span className="flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                {t("home.hero.availableNow")}
              </span>
              <span className="flex items-center gap-1.5">
                <Github className="h-4 w-4" aria-hidden="true" />
                {t("home.hero.openSource")}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                {t("home.hero.fastDelivery")}
              </span>
            </motion.div>
          </motion.div>
        </section>
      </Reveal>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          aria-label={t("home.stats.ariaLabel")}
          className="border-y border-white/8 bg-white/3 px-6 py-12 backdrop-blur-sm"
        >
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.id} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-4xl font-bold tracking-tight text-[var(--accent)]">
                    {stat.value}
                  </span>
                  <span className="text-sm text-[var(--muted-foreground)]">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <Reveal>
        <section id="projects" className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                  {t("home.projects.eyebrow")}
                </p>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  {t("home.projects.heading")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                {t("home.projects.viewAll")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {FEATURED_PROJECTS.map((project, i) => (
                <motion.div key={project.id} variants={scaleIn} custom={i}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Skills / Expertise ───────────────────────────────────────────── */}
      <Reveal>
        <section
          id="about"
          className="relative overflow-hidden px-6 py-24 md:py-32"
        >
          {/* Subtle tinted background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent"
          />
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              {/* Left: copy */}
              <div className="flex flex-col gap-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                  {t("home.skills.eyebrow")}
                </p>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  {t("home.skills.heading")}
                </h2>
                <p className="max-w-md text-pretty leading-relaxed text-[var(--muted-foreground)]">
                  {t("home.skills.body")}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {["Next.js", "TypeScript", "Figma", "Node.js", "PostgreSQL", "GraphQL", "Tailwind", "Framer"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-[var(--foreground)]"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
                <Link
                  href="/about"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  {t("home.skills.cta")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Right: skill cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-2 gap-4"
              >
                {SKILLS.map((skill, i) => (
                  <motion.div key={skill.id} variants={fadeInUp} custom={i}>
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("home.testimonials.eyebrow")}
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {t("home.testimonials.heading")}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div key={testimonial.id} variants={fadeInUp} custom={i}>
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="contact" className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent p-10 text-center md:p-16">
              {/* Decorative glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, var(--accent, #6366f1) 0%, transparent 70%)",
                  opacity: 0.12,
                }}
              />

              <div className="relative flex flex-col items-center gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/25">
                  <Heart className="h-6 w-6 text-[var(--accent)]" aria-hidden="true" />
                </div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  {t("home.cta.heading")}
                </h2>
                <p className="max-w-md text-pretty leading-relaxed text-[var(--muted-foreground)]">
                  {t("home.cta.body")}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[var(--accent-fg)] shadow-[0_0_24px_-4px_var(--accent)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_36px_-4px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    {t("home.cta.primary")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={BRAND.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-7 py-3 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    {t("home.cta.secondary")}
                  </a>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("home.cta.footnote")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}