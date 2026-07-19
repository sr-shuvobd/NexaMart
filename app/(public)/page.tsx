import Link from "next/link";
import { Sparkles, ArrowRight, ShoppingBag, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-32 pb-12 md:pb-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-primary-200/50 dark:bg-primary-900/20 blur-[80px]" />
          <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-secondary-200/50 dark:bg-secondary-900/20 blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-2">
                <Sparkles size={16} />
                <span>AI-Powered Shopping Experience</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark-900 dark:text-white leading-tight">
                Discover Products <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  Tailored For You
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the future of e-commerce. Let our AI assistant find exactly what you need, write perfect descriptions, and recommend products you'll love.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/explore"
                  className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white rounded-full font-bold text-lg hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag size={20} />
                  Start Shopping
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/about"
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-dark-900 text-dark-900 dark:text-white border border-gray-200 dark:border-dark-800 rounded-full font-bold text-lg hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-500 transition-colors flex items-center justify-center"
                >
                  How it works
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-3xl font-extrabold text-dark-900 dark:text-white">10k+</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Products</span>
                </div>
                <div className="w-px h-12 bg-gray-200 dark:bg-dark-800" />
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-3xl font-extrabold text-dark-900 dark:text-white">98%</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Happy Customers</span>
                </div>
                <div className="w-px h-12 bg-gray-200 dark:bg-dark-800" />
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-3xl font-extrabold text-dark-900 dark:text-white">24/7</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
              {/* Decorative elements for the image placeholder */}
              <div className="aspect-square bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl relative p-4 lg:p-8">
                <div className="w-full h-full bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden relative border border-gray-100 dark:border-dark-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                  
                  {/* Floating AI Widget UI */}
                  <div className="absolute bottom-6 left-6 right-6 glassmorphism rounded-xl p-4 flex items-center gap-4 animate-bounce duration-3000">
                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white shrink-0">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark-900 dark:text-white">Nexa AI Assistant</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">"I found 3 items matching your style!"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center gap-4 group hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-dark-900 dark:text-white">Lightning Fast</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Experience zero-lag browsing and instant checkout processes powered by modern edge infrastructure.
            </p>
          </div>
          <div className="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center gap-4 group hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-secondary-50 dark:bg-secondary-900/30 text-secondary-500 flex items-center justify-center group-hover:bg-secondary-500 group-hover:text-white transition-colors">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-dark-900 dark:text-white">AI Recommendations</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Our smart algorithms analyze your preferences to show you exactly what you'll love.
            </p>
          </div>
          <div className="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center gap-4 group hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-dark-50 dark:bg-dark-800 text-dark-900 dark:text-white flex items-center justify-center group-hover:bg-dark-900 group-hover:text-white transition-colors border border-gray-100 dark:border-dark-700">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-dark-900 dark:text-white">Secure Payments</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Shop with confidence knowing your data and transactions are protected by bank-level security.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
