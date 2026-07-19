"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect if already logged in
  if (session?.user) {
    const role = (session.user as any)?.role;
    window.location.href = (role === "admin" || role === "seller") ? "/admin" : "/";
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed. Please try again.");
      } else {
        toast.success("Welcome back! Redirecting...");
        
        // Redirect based on role
        const role = (data.user as any)?.role;
        if (role === "seller" || role === "admin") {
          setTimeout(() => { window.location.href = "/admin"; }, 1000);
        } else {
          setTimeout(() => { window.location.href = "/"; }, 1000);
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-[400px] animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Enter your credentials to access your account.</p>
        </div>

        <div className="card-base p-6 md:p-8 relative overflow-hidden bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-[40px] pointer-events-none" />

          <form onSubmit={handleLogin} className="relative z-10 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-base !pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                <Link href="#" className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base !pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="relative z-10 my-6 flex items-center">
            <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
            <span className="flex-shrink-0 px-3 text-xs font-medium text-neutral-400">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3">
            <button type="button" className="btn-outline w-full !py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center gap-2 text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button type="button" className="btn-outline w-full !py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center gap-2 text-sm">
              <Github size={16} />
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-neutral-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-neutral-900 dark:text-white hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
