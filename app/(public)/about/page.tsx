import { Users, Target, Shield, Zap, Globe, Cpu, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "$50M+", label: "In Processed Sales" },
  { value: "120+", label: "Countries Served" },
  { value: "500k", label: "Happy Shoppers" },
  { value: "0ms", label: "AI Latency" },
];

const values = [
  { icon: Cpu, title: "AI-First Approach", desc: "We don't just use AI; we are built on it. Every interaction is optimized for precision and speed." },
  { icon: Shield, title: "Uncompromising Trust", desc: "Enterprise-grade security, strict seller vetting, and guaranteed data privacy for every user." },
  { icon: Globe, title: "Global Accessibility", desc: "Breaking down borders. We ensure anyone, anywhere can access world-class products instantly." },
  { icon: HeartHandshake, title: "Community First", desc: "We build tools that empower local sellers to reach global audiences sustainably." },
];

export const metadata = {
  title: "About Us | NexaMart",
  description: "Learn about NexaMart's mission to revolutionize e-commerce with AI.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white dark:bg-black overflow-hidden">
      
      {/* ── STUNNING HERO ── */}
      <section className="relative min-h-[85vh] pt-32 pb-20 flex items-center justify-center border-b border-neutral-200 dark:border-neutral-900">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop" alt="Office" className="w-full h-full object-cover opacity-[0.03] dark:opacity-[0.1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-black/80 dark:to-black" />
        </div>
        
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
        
        <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md mb-8 animate-slide-up">
            <Target size={14} className="text-primary-500" />
            <span className="text-sm font-medium">Our Mission</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            We're building the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-teal-400">nervous system</span> of commerce.
          </h1>
          
          <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
            NexaMart started with a simple belief: the shopping experience is broken. There's too much noise, too much friction, and not enough personalization. We are fixing it with design and AI.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <span className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">{s.value}</span>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CORE VALUES ── */}
      <section className="py-32 bg-neutral-50 dark:bg-[#050505]">
        <div className="section-container !py-0">
          <div className="mb-16 md:mb-24 md:flex items-end justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">Our DNA</h2>
              <p className="text-xl text-neutral-500 dark:text-neutral-400">The core values that guide our product decisions, hiring, and how we treat our customers every single day.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="group relative p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-500">
                    <Icon size={24} className="text-neutral-900 dark:text-white group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">{title}</h3>
                  <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM TEAM SECTION ── */}
      <section className="py-32 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900">
        <div className="section-container !py-0">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">The minds behind Nexa</h2>
            <p className="text-xl text-neutral-500 dark:text-neutral-400">A global team of engineers, designers, and AI researchers obsessed with building perfect products.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "Chief Executive Officer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
              { name: "David Chen", role: "Chief Technology Officer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
              { name: "Aisha Malik", role: "VP of Artificial Intelligence", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" },
              { name: "Marcus Reed", role: "Head of Product Design", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" }
            ].map((member, i) => (
              <div key={member.name} className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-neutral-100 dark:bg-neutral-900">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight size={18} className="text-black" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{member.name}</h3>
                <p className="text-neutral-500 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
