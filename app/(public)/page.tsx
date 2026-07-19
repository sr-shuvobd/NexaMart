import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Search, TrendingUp, Users, ShoppingBag, Star, Package, Smile } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

async function getAdminStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/admin`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.stats : null;
  } catch (e) {
    return null;
  }
}

async function getFeaturedProduct() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=1`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success && data.products.length > 0 ? data.products[0] : null;
  } catch (e) {
    return null;
  }
}

export default async function HomePage() {
  const stats = await getAdminStats();
  const featuredProduct = await getFeaturedProduct();
  const session = await auth.api.getSession({ headers: headers() });

  return (
    <div className="flex flex-col overflow-hidden">
      {/* ── STUNNING HERO SECTION ── */}
      <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center bg-white dark:bg-black overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-gradient-to-br from-primary-400/20 to-emerald-600/20 blur-[120px] dark:from-primary-500/10 dark:to-emerald-700/10 mix-blend-multiply dark:mix-blend-screen animate-pulse-slow pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-gradient-to-tl from-teal-400/20 to-primary-600/20 blur-[120px] dark:from-teal-500/10 dark:to-primary-700/10 mix-blend-multiply dark:mix-blend-screen animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="section-container relative z-10 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-black/60 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-md shadow-sm mb-8 animate-slide-up hover:scale-105 transition-transform cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Introducing Nexa AI 2.0</span>
              <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold ml-2">New</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.05] mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              The future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-teal-400 dark:from-primary-400 dark:to-teal-300">
                intelligent
              </span> shopping.
            </h1>

            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
              Experience a hyper-personalized e-commerce platform. Let our AI curate exactly what you need with semantic search and instant checkouts.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Link href="/explore" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-base font-medium rounded-full overflow-hidden transition-transform active:scale-95 shadow-lg shadow-neutral-900/20 dark:shadow-white/10 hover:shadow-xl hover:shadow-neutral-900/30 dark:hover:shadow-white/20">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 group-hover:text-white">
                  <ShoppingBag size={18} />
                  Start Shopping
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-base font-medium rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 backdrop-blur-sm transition-all active:scale-95">
                How it works
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-black object-cover" />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-sm text-neutral-500 font-medium mt-0.5">from 50,000+ customers</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Premium Floating Composition */}
          <div className="flex-1 w-full relative animate-slide-up lg:mt-0 mt-10" style={{ animationDelay: '500ms' }}>
            <div className="relative w-full aspect-[4/3] max-w-lg mx-auto lg:max-w-none">
              
              {/* Main Image Layer */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 shadow-2xl bg-white dark:bg-neutral-900 transform rotate-1 hover:rotate-0 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop" alt="Shopping Experience" className="w-full h-full object-cover opacity-90 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Glass Card 1 - AI Badge */}
              <div className="absolute -bottom-6 -left-6 lg:-left-12 glass rounded-2xl p-5 border border-white/40 dark:border-white/10 shadow-xl animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">AI Match Found</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">99% tailored to you</p>
                  </div>
                </div>
              </div>

              {/* Floating Glass Card 2 - Mini Product */}
              <div className="absolute -top-6 -right-6 lg:-right-8 glass rounded-2xl p-3 border border-white/40 dark:border-white/10 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img src={featuredProduct?.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80"} alt="Featured Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="pr-2">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white max-w-[120px] truncate">
                      {featuredProduct?.name || "Premium Sneakers"}
                    </p>
                    <p className="text-xs font-semibold text-primary-500 mt-0.5">
                      ${featuredProduct?.price || "129.00"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── BENTO BOX FEATURES ── */}
      <section className="py-24 bg-neutral-50 dark:bg-[#0a0a0a]">
        <div className="section-container !py-0">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">A seamless experience.</h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">Everything is designed to get you from discovery to checkout in seconds, powered by intelligent infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 (Large) */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 p-10 flex flex-col justify-between min-h-[360px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6">
                  <Search size={28} className="text-primary-500" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Semantic AI Search</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-md leading-relaxed">
                  Describe what you want naturally. "A warm jacket for skiing" or "Minimalist desk setup". Our AI understands intent, not just keywords.
                </p>
              </div>
            </div>

            {/* Feature 2 (Small) */}
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 p-8 flex flex-col justify-between min-h-[360px]">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6">
                  <Zap size={24} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Edge Performance</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Built on modern edge infrastructure. Pages load in milliseconds worldwide.
                </p>
              </div>
            </div>

            {/* Feature 3 (Small) */}
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 p-8 flex flex-col justify-between min-h-[360px]">
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6">
                  <Shield size={24} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Bank-Grade Security</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Every transaction is encrypted with TLS 1.3 and monitored by AI for fraud prevention.
                </p>
              </div>
            </div>

            {/* Feature 4 (Large) */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 p-10 flex flex-col justify-between min-h-[360px] bg-[url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
              <div className="absolute inset-0 bg-neutral-900/60 dark:bg-black/70 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mb-6 text-white">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Smart Recommendations</h3>
                <p className="text-neutral-200 text-lg max-w-md leading-relaxed">
                  Our recommendation engine learns your style to show you products you'll instantly fall in love with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREMIUM STATS & TRUST ── */}
      <section className="py-24 bg-white dark:bg-black border-y border-neutral-200 dark:border-neutral-900">
        <div className="section-container !py-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: stats?.totalOrders > 0 ? `${Math.max(10, stats.totalOrders * 2)}+` : "50K+", label: "Active Shoppers", color: "text-blue-500" },
              { icon: Package, value: stats?.totalOrders ? `${stats.totalOrders}` : "100K+", label: "Products Shipped", color: "text-primary-500" },
              { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-amber-500" },
              { icon: Smile, value: "99.8%", label: "Satisfaction Rate", color: "text-pink-500" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 group">
                <div className={`w-12 h-12 rounded-full bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <h4 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">{stat.value}</h4>
                <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FULL WIDTH ── */}
      {!session?.user && (
        <section className="relative py-32 overflow-hidden bg-neutral-900 dark:bg-neutral-900">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
          </div>
          
          <div className="relative z-10 section-container !py-0 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 max-w-3xl mx-auto">
              Ready to upgrade your shopping experience?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Join the platform that combines luxury design with artificial intelligence. Create your free account today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="btn-primary-green px-10 py-4 text-lg rounded-full shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)]">
                Create Free Account
              </Link>
              <Link href="/explore" className="btn-outline border-white/20 text-white hover:bg-white/10 px-10 py-4 text-lg rounded-full">
                Explore Catalog
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
