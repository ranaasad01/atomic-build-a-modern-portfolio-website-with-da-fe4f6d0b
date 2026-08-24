"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Code2, Database, Globe, Layers, Palette, Server, Smartphone, Terminal, ArrowRight, MapPin, Mail } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, scaleIn } from "@/lib/motion";

const EXPERTISE = [
  { icon: Code2, label: "TypeScript" },
  { icon: Globe, label: "Next.js" },
  { icon: Server, label: "Node.js" },
  { icon: Database, label: "PostgreSQL" },
  { icon: Layers, label: "React" },
  { icon: Terminal, label: "Linux / DevOps" },
  { icon: Smartphone, label: "React Native" },
  { icon: Palette, label: "Figma / UI" },
  { icon: Code2, label: "GraphQL" },
  { icon: Globe, label: "REST APIs" },
  { icon: Server, label: "AWS / GCP" },
  { icon: Database, label: "Redis" },
];

const TIMELINE = [
  {
    year: "2024",
    side: "right",
    title: "Senior Full-Stack Engineer",
    org: "Vercel",
    type: "work",
    description:
      "Leading product engineering for the platform's developer experience layer. Shipped the new dashboard redesign, reducing time-to-deploy by 40% for teams of all sizes.",
  },
  {
    year: "2022",
    side: "left",
    title: "M.S. Computer Science",
    org: "Stanford University",
    type: "education",
    description:
      "Specialized in human-computer interaction and distributed systems. Thesis on adaptive UI rendering in low-bandwidth environments.",
  },
  {
    year: "2021",
    side: "right",
    title: "Full-Stack Engineer",
    org: "Linear",
    type: "work",
    description:
      "Built real-time collaboration features powering thousands of engineering teams. Owned the notification system and the public API surface.",
  },
  {
    year: "2019",
    side: "left",
    title: "Frontend Engineer",
    org: "Stripe",
    type: "work",
    description:
      "Contributed to the Stripe Dashboard and the Elements component library. Improved accessibility across the checkout flow to meet WCAG 2.1 AA.",
  },
  {
    year: "2018",
    side: "right",
    title: "B.S. Computer Science",
    org: "UC Berkeley",
    type: "education",
    description:
      "Graduated with honors. Co-founded the Open Source Club and led a team of 12 students building civic-tech tools for the Bay Area.",
  },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── 1. Editorial Bio Split ── */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-white/10 py-24 md:py-32">
          {/* Subtle mesh glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--brand-accent)]/10 blur-[120px]"
          />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
              {/* Left — stylized avatar */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  {/* Outer decorative ring */}
                  <div className="absolute -inset-4 rounded-3xl border border-[var(--brand-accent)]/20" />
                  {/* Accent corner accent */}
                  <div className="absolute -bottom-3 -right-3 h-24 w-24 rounded-2xl bg-[var(--brand-accent)]/15 blur-sm" />

                  <div className="relative h-80 w-72 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--brand-accent)]/20 via-purple-900/30 to-slate-900 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                    {/* Stylized avatar placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="h-28 w-28 rounded-full bg-gradient-to-br from-[var(--brand-accent)]/60 to-purple-600/40 ring-4 ring-[var(--brand-accent)]/30" />
                      <div className="space-y-2 text-center">
                        <div className="h-3 w-32 rounded-full bg-white/20" />
                        <div className="h-2 w-24 rounded-full bg-white/10" />
                      </div>
                    </div>
                    {/* Grid overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full border border-white/10 bg-[var(--card)] px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                    <MapPin className="h-3.5 w-3.5 text-[var(--brand-accent)]" aria-hidden="true" />
                    <span className="text-xs font-medium text-[var(--foreground)]/80">
                      {t("about.location")}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right — personal story */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <span className="inline-block rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                    {t("about.eyebrow")}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance md:text-5xl lg:text-6xl"
                >
                  {t("about.headline")}
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg leading-relaxed text-[var(--foreground)]/70"
                >
                  {t("about.bio1")}
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-base leading-relaxed text-[var(--foreground)]/60"
                >
                  {t("about.bio2")}
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-[var(--foreground)]/80 transition-all duration-300 hover:border-[var(--brand-accent)]/40 hover:bg-[var(--brand-accent)]/10 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {t("about.emailCta")}
                  </a>
                  <a
                    href={BRAND.readcv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-[var(--foreground)]/80 transition-all duration-300 hover:border-[var(--brand-accent)]/40 hover:bg-[var(--brand-accent)]/10 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                  >
                    {t("about.resumeCta")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── 2. Horizontal Expertise Strip ── */}
      <Reveal>
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
                {t("about.expertiseTitle")}
              </h2>
              <p className="mt-2 text-sm text-[var(--foreground)]/50">
                {t("about.expertiseSubtitle")}
              </p>
            </div>

            {/* Scrollable strip */}
            <div className="relative">
              {/* Fade edges */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[var(--background)] to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[var(--background)] to-transparent"
              />

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {EXPERTISE.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-white/8 bg-white/4 px-6 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_16px_-4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[var(--brand-accent)]/30 hover:bg-[var(--brand-accent)]/8"
                  >
                    <item.icon
                      className="h-6 w-6 text-[var(--brand-accent)]"
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap text-xs font-semibold text-[var(--foreground)]/70">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── 3. Career Timeline ── */}
      <Reveal>
        <section className="border-b border-white/10 py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                {t("about.timelineTitle")}
              </h2>
              <p className="mt-3 text-[var(--foreground)]/50">
                {t("about.timelineSubtitle")}
              </p>
            </div>

            <div className="relative">
              {/* Vertical connector line */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--brand-accent)]/40 to-transparent"
              />

              <div className="space-y-12">
                {TIMELINE.map((entry, i) => (
                  <Reveal key={`${entry.year}-${entry.org}`} delay={i * 0.08}>
                    <div
                      className={`relative flex items-start gap-8 ${
                        entry.side === "left"
                          ? "flex-row-reverse text-right"
                          : "flex-row text-left"
                      }`}
                    >
                      {/* Content card */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="w-[calc(50%-2rem)] rounded-2xl border border-white/8 bg-white/3 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[var(--brand-accent)]/25 hover:bg-white/5"
                      >
                        <div
                          className={`mb-1 flex items-center gap-2 ${
                            entry.side === "left" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span className="rounded-full bg-[var(--brand-accent)]/15 px-2.5 py-0.5 text-xs font-bold text-[var(--brand-accent)]">
                            {entry.year}
                          </span>
                          <span className="text-xs font-medium uppercase tracking-wider text-[var(--foreground)]/40">
                            {entry.type === "education"
                              ? t("about.timelineEducation")
                              : t("about.timelineWork")}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--foreground)]">
                          {entry.title}
                        </h3>
                        <p className="mb-2 text-sm font-semibold text-[var(--brand-accent)]/80">
                          {entry.org}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--foreground)]/60">
                          {entry.description}
                        </p>
                      </motion.div>

                      {/* Center dot */}
                      <div className="absolute left-1/2 top-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center">
                        <div className="h-3 w-3 rounded-full border-2 border-[var(--brand-accent)] bg-[var(--background)] shadow-[0_0_8px_var(--brand-accent)]" />
                      </div>

                      {/* Spacer for opposite side */}
                      <div className="w-[calc(50%-2rem)]" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── 4. Full-Bleed CTA Banner ── */}
      <Reveal>
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Background gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[var(--brand-accent)]/15 via-purple-900/10 to-[var(--background)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-accent)]/10 blur-[100px]"
          />

          <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]"
              >
                {t("about.ctaEyebrow")}
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="mb-6 text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance md:text-5xl"
              >
                {t("about.ctaHeadline")}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mb-10 text-lg leading-relaxed text-[var(--foreground)]/60"
              >
                {t("about.ctaBody")}
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-8 py-4 text-sm font-bold text-[var(--brand-accent-foreground)] shadow-[0_0_24px_var(--brand-accent-glow)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_36px_var(--brand-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  {t("about.ctaButton")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}