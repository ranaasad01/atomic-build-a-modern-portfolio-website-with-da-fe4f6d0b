"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Calendar, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, ArrowRight, CheckCircle, AlertCircle, Send, Clock } from 'lucide-react';
import { useTranslations } from "next-intl";
import { BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

const FAQ_ITEMS = [
  {
    q: "What types of projects do you take on?",
    a: "I work on full-stack web applications, design systems, developer tooling, and creative tech experiments. I'm especially drawn to products at the intersection of engineering and design — things that need to be both technically solid and visually refined.",
  },
  {
    q: "What does your typical engagement look like?",
    a: "Most collaborations start with a scoping call to understand your goals, timeline, and budget. From there I'll propose a structure — whether that's a fixed-scope project, a retainer, or a short-term sprint. I keep communication async-friendly and ship iteratively.",
  },
  {
    q: "How far out are you booked?",
    a: "I take on a limited number of projects at a time to keep quality high. Currently I have availability starting in about 3–4 weeks. Reach out early if you have a specific start date in mind.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — some of my favorite work has been with early-stage teams moving fast. I'm comfortable with ambiguity, can help shape product direction, and know how to build things that are extensible without over-engineering them.",
  },
  {
    q: "What's your rate?",
    a: "Rates depend on scope, timeline, and the nature of the work. Project-based work typically starts at $8,000. Retainers are available for ongoing collaboration. I'm happy to discuss what makes sense for your situation on a call.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Absolutely. I'm comfortable signing standard NDAs before we discuss sensitive details. Just send it over and I'll review promptly.",
  },
];

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-5 w-5" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  Twitter: <Twitter className="h-5 w-5" aria-hidden="true" />,
  Dribbble: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0 1 12 3.475zm-3.633.803a53.896 53.896 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 0 1-2.19-5.705zM12 20.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 0 1 1.823 6.475 8.4 8.4 0 0 1-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715z" />
    </svg>
  ),
  "Read.cv": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-6-6H8zm0 2h7v5h5v11H8V4zm2 8v2h4v-2h-4zm0 4v2h4v-2h-4z" />
    </svg>
  ),
};

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const t = useTranslations();
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const validate = (data: FormState): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = t("contact.form.errors.nameRequired");
    if (!data.email.trim()) errs.email = t("contact.form.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = t("contact.form.errors.emailInvalid");
    if (!data.subject.trim()) errs.subject = t("contact.form.errors.subjectRequired");
    if (!data.message.trim()) errs.message = t("contact.form.errors.messageRequired");
    else if (data.message.trim().length < 20) errs.message = t("contact.form.errors.messageTooShort");
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name as keyof FormState]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  const fieldClass = (field: keyof FormState) =>
    cn(
      "w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none transition-all duration-200",
      "focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]",
      touched[field] && errors[field]
        ? "border-red-500/60 focus:ring-red-500/20 focus:border-red-500"
        : "border-[var(--color-border)] hover:border-[var(--color-accent)]/40"
    );

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
          <CheckCircle className="h-8 w-8 text-[var(--color-accent)]" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text)]">{t("contact.form.success.title")}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">{t("contact.form.success.body")}</p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); setTouched({}); setErrors({}); }}
          className="mt-2 text-sm font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
        >
          {t("contact.form.success.reset")}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            {t("contact.form.nameLabel")} <span className="text-[var(--color-accent)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("contact.form.namePlaceholder")}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("name")}
          />
          <AnimatePresence>
            {touched.name && errors.name && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            {t("contact.form.emailLabel")} <span className="text-[var(--color-accent)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("contact.form.emailPlaceholder")}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("email")}
          />
          <AnimatePresence>
            {touched.email && errors.email && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {t("contact.form.subjectLabel")} <span className="text-[var(--color-accent)]">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(fieldClass("subject"), "cursor-pointer")}
        >
          <option value="">{t("contact.form.subjectPlaceholder")}</option>
          <option value="new-project">{t("contact.form.subjectOptions.newProject")}</option>
          <option value="consulting">{t("contact.form.subjectOptions.consulting")}</option>
          <option value="collaboration">{t("contact.form.subjectOptions.collaboration")}</option>
          <option value="speaking">{t("contact.form.subjectOptions.speaking")}</option>
          <option value="other">{t("contact.form.subjectOptions.other")}</option>
        </select>
        <AnimatePresence>
          {touched.subject && errors.subject && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1 text-xs text-red-400">
              <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.subject}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {t("contact.form.messageLabel")} <span className="text-[var(--color-accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={t("contact.form.messagePlaceholder")}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(fieldClass("message"), "resize-none leading-relaxed")}
        />
        <div className="flex items-start justify-between">
          <AnimatePresence>
            {touched.message && errors.message && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
          <span className={cn("ml-auto text-xs tabular-nums", form.message.length > 800 ? "text-red-400" : "text-[var(--color-muted)]")}>
            {form.message.length}/1000
          </span>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
        whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
        className={cn(
          "group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300",
          "bg-[var(--color-accent)] text-[var(--color-accent-fg)]",
          "shadow-[0_4px_24px_-4px_var(--color-accent-glow)] hover:shadow-[0_8px_32px_-4px_var(--color-accent-glow)]",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {status === "submitting" ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
            />
            {t("contact.form.submitting")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            {t("contact.form.submit")}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </motion.button>
    </form>
  );
}

function FaqAccordion() {
  const t = useTranslations();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)]">
      {FAQ_ITEMS.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-[var(--color-surface)]"
            aria-expanded={open === i}
          >
            <span className="font-medium text-[var(--color-text)]">{item.q}</span>
            <ChevronDown
              className={cn("h-4 w-4 shrink-0 text-[var(--color-muted)] transition-transform duration-300", open === i && "rotate-180")}
              aria-hidden="true"
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-muted)]">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero / Heading */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-[var(--color-border)] px-6 py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-accent-glow),transparent)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              </span>
              <span className="text-xs font-medium text-[var(--color-accent)]">{t("contact.hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-4 text-5xl font-bold tracking-tight text-[var(--color-text)] md:text-6xl lg:text-7xl"
            >
              {t("contact.hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="max-w-xl text-lg leading-relaxed text-[var(--color-muted)]"
            >
              {t("contact.hero.subtitle")}
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Two-column: Form + Sidebar */}
      <Reveal>
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_340px]">
            {/* Left: Contact Form */}
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-[var(--color-text)]">{t("contact.form.heading")}</h2>
              <p className="mb-8 text-sm leading-relaxed text-[var(--color-muted)]">{t("contact.form.subheading")}</p>
              <ContactForm />
            </div>

            {/* Right: Sidebar */}
            <aside className="flex flex-col gap-8">
              {/* Direct contact */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]">{t("contact.sidebar.directHeading")}</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm font-medium text-[var(--color-text)] transition-all duration-200 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span className="truncate">{BRAND.email}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-[var(--color-muted)] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://cal.com/alexmorrow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm font-medium text-[var(--color-text)] transition-all duration-200 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5"
                  >
                    <Calendar className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span>{t("contact.sidebar.bookCall")}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-[var(--color-muted)] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{t("contact.sidebar.responseTime")}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-muted)]">{t("contact.sidebar.responseDetail")}</p>
                </div>
              </div>

              {/* Social links */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]">{t("contact.sidebar.socialHeading")}</h3>
                <ul className="flex flex-col gap-2">
                  {socialLinks.map((link) => (
                    <li key={link.key}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.platform} — ${link.handle}`}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--color-text)] transition-all duration-200 hover:bg-[var(--color-accent)]/8"
                      >
                        <span className="text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                          {SOCIAL_ICON_MAP[link.platform] ?? <ArrowRight className="h-5 w-5" aria-hidden="true" />}
                        </span>
                        <span className="font-medium">{link.platform}</span>
                        <span className="ml-auto text-xs text-[var(--color-muted)]">{link.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">{t("contact.faq.heading")}</h2>
              <p className="text-[var(--color-muted)]">{t("contact.faq.subheading")}</p>
            </div>
            <FaqAccordion />
            <p className="mt-8 text-center text-sm text-[var(--color-muted)]">
              {t("contact.faq.footer")}{" "}
              <a href={`mailto:${BRAND.email}`} className="font-medium text-[var(--color-accent)] underline-offset-4 hover:underline">
                {BRAND.email}
              </a>
            </p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}