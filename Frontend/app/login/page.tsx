"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AnimatedNav from "@/components/sections/AnimatedNav";
import AnimatedFooter from "@/components/sections/AnimatedFooter";

type Mode = "login" | "register";

export default function LoginPage() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email, password }
          : {
              fullName,
              email,
              password,
              organization: organization || undefined,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      // Store token & user info
      localStorage.setItem("sf_token", data.token);
      localStorage.setItem("sf_user", JSON.stringify(data.user));

      // Dispatch a custom event so other components can react
      window.dispatchEvent(new Event("sf_auth_change"));

      // Redirect: if came from download page, go back to download
      const redirect = new URLSearchParams(window.location.search).get(
        "redirect",
      );
      window.location.href = redirect || "/#download";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const fadeVariants = {
    initial: reduceMotion ? {} : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? {} : { opacity: 0, y: -12 },
  };

  return (
    <main className="min-h-screen bg-dark-base">
      <AnimatedNav />

      <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-6 py-20">
        <motion.div
          className="w-full max-w-md"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Card */}
          <div className="rounded-2xl border border-dark-border bg-dark-card p-8">
            {/* Tab switcher */}
            <div className="mb-8 flex rounded-xl bg-dark-base p-1">
              {(["login", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setError("");
                  }}
                  className={`relative flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    mode === m
                      ? "text-black"
                      : "text-content-secondary hover:text-content-primary"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="auth-tab"
                      className="absolute inset-0 rounded-lg bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {m === "login" ? "Sign In" : "Create Account"}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {mode === "register" && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-content-secondary">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-lg border border-dark-border bg-dark-base px-4 py-2.5 text-sm text-content-primary placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-content-secondary">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full rounded-lg border border-dark-border bg-dark-base px-4 py-2.5 text-sm text-content-primary placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="Company / University (optional)"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-content-secondary">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-dark-border bg-dark-base px-4 py-2.5 text-sm text-content-primary placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-content-secondary">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-dark-border bg-dark-base px-4 py-2.5 text-sm text-content-primary placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.p
                    className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-black transition hover:bg-accent-dark disabled:opacity-50"
                >
                  {loading
                    ? "Please wait…"
                    : mode === "login"
                      ? "Sign In"
                      : "Create Account"}
                </button>
              </motion.form>
            </AnimatePresence>

            <p className="mt-6 text-center text-xs text-content-muted">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                }}
                className="text-accent hover:underline"
              >
                {mode === "login" ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Why sign up info */}
          <div className="mt-6 rounded-2xl border border-dark-border bg-black p-6 text-center">
            <p className="mb-2 text-sm font-semibold text-content-primary">
              Why create an account?
            </p>
            <ul className="space-y-1 text-xs text-content-secondary">
              <li>Download the SpringForge IntelliJ Plugin</li>
              <li>Authenticate within the plugin for full access</li>
              <li>Share feedback to help us improve</li>
            </ul>
          </div>
        </motion.div>
      </div>

      <AnimatedFooter />
    </main>
  );
}
