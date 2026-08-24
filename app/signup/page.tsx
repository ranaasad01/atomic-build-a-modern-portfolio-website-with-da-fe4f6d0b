"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden bg-[var(--background)]">
      {/* Decorative glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <motion.div
          variants={fadeInUp}
          className="card-surface rounded-2xl p-8 md:p-10"
        >
          {success ? (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center gap-5 py-6"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/15 flex items-center justify-center">
                <CheckCircle size={32} className="text-[var(--primary)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                Check your email
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                We sent a confirmation link to{" "}
                <span className="text-[var(--accent)]">{email}</span>. Click it
                to activate your account.
              </p>
              <Link
                href="/login"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-200 shadow-[0_0_20px_var(--glow-primary)]"
              >
                Go to Login <ArrowRight size={16} />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <motion.div variants={fadeInUp} className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-medium mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                  Join the community
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="gradient-text">Create account</span>
                </h1>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  Already have one?{" "}
                  <Link
                    href="/login"
                    className="text-[var(--primary)] hover:text-[var(--accent)] font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Full name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
                    />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
                  >
                    Email
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
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
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all duration-200"
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

                {/* Confirm password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
                    />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                    boxShadow: "0 0 24px var(--glow-primary)",
                  }}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
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
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </motion.form>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-center text-xs text-[var(--muted-foreground)]"
              >
                By signing up you agree to our{" "}
                <span className="text-[var(--primary)]">Terms of Service</span>{" "}
                and{" "}
                <span className="text-[var(--primary)]">Privacy Policy</span>.
              </motion.p>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
