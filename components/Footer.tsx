"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks, BRAND, socialLinks } from "@/lib/data";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Heart } from 'lucide-react';
import { staggerContainer, fadeInUp } from "@/lib/motion";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <Github size={18} aria-hidden="true" />,
  LinkedIn: <Linkedin size={18} aria-hidden="true" />,
  "Twitter / X": <Twitter size={18} aria-hidden="true" />,
  Twitter: <Twitter size={18} aria-hidden="true" />,
  Dribbble: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </svg>
  ),
};

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = t.raw("nav") as Record<string, string>;

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]/40">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-bold tracking-tight mb-3"
            >
              <span className="gradient-text">{BRAND.name.split(" ")[0]}</span>
              <span className="text-[var(--muted-foreground)] font-light">
                .dev
              </span>
            </Link>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-xs">
              {BRAND.tagline}
            </p>
            <p className="text-[var(--muted-foreground)] text-xs mt-3">
              {BRAND.location}
            </p>
          </motion.div>

          {/* Nav column */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social column */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-5">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200 group"
                  >
                    <span className="group-hover:text-[var(--primary)] transition-colors">
                      {socialIcons[social.platform] ?? (
                        <Github size={18} aria-hidden="true" />
                      )}
                    </span>
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
            Built with{" "}
            <Heart
              size={12}
              className="text-[var(--primary)] fill-[var(--primary)]"
              aria-hidden="true"
            />{" "}
            in San Francisco
          </p>
        </motion.div>
      </div>
    </footer>
  );
}