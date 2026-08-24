"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { fadeInUp } from "@/lib/motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push("/todos");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-medium mb-6">
            <Sparkles size={12} />
            <span>Welcome back</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">Sign in</span>
          </h1>
          <p className="text-[var(--muted-foreground)] text-sm">
            Access your portfolio dashboard and tasks.
          </p>
        </div>

        {/* Card */}
        <div className="card-surface rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/40 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/40 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <span className="mt-0.5 shrink-0">⚠</span>
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-semibold text-sm shadow-[0_0_24px_var(--glow-primary)] hover:shadow-[0_0_32px_var(--glow-primary)] hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[var(--card)] text-[var(--muted-foreground)] text-xs">
                New here?
              </span>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[var(--primary)] hover:text-[var(--accent)] font-medium transition-colors duration-200"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Back to site */}
        <p className="text-center mt-6 text-xs text-[var(--muted-foreground)]">
          <Link
            href="/"
            className="hover:text-[var(--foreground)] transition-colors duration-200"
          >
            ← Back to portfolio
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
