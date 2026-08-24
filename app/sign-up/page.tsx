"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from "@/lib/auth-context";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function SignUpPage() {
  const { signUp, user, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/tasks");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    const { error: err } = await signUp(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mx-auto mb-6">
            <UserPlus size={28} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Check your email</h2>
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
            We sent a confirmation link to <strong className="text-[var(--foreground)]">{email}</strong>. Click it to activate your account.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 mt-6 text-[var(--primary)] hover:text-[var(--accent)] text-sm font-medium transition-colors"
          >
            Back to sign in <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/5 blur-[120px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-medium mb-6">
            <UserPlus size={12} />
            Create account
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-2">
            Get started
          </h1>
          <p className="text-[var(--muted-foreground)] text-sm">
            Create your account to manage tasks and projects
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.48)]"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200"
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[var(--primary)] hover:bg-[var(--accent)] text-white font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_var(--glow-primary)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create account <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-[var(--primary)] hover:text-[var(--accent)] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
