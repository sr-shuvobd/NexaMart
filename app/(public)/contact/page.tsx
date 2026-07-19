"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { Mail, Phone, MapPin, Send, CheckCircle, Plus, Minus } from "lucide-react";

const contactInfo = [
  { icon: Mail, title: "Sales & Support", value: "support@nexamart.ai" },
  { icon: Phone, title: "Phone", value: "+1 (800) 123-4567" },
  { icon: MapPin, title: "Headquarters", value: "123 AI Boulevard, SF, CA" },
];

const faqs = [
  { q: "How do I track my order?", a: "Go to your Orders page in the dashboard to see real-time status updates for all your orders." },
  { q: "What is the return policy?", a: "We offer a 30-day hassle-free return policy on all items. Simply raise a return request from your order history." },
  { q: "How does the AI recommendation work?", a: "Our AI analyses your browsing history, purchase patterns, and preferences to surface products most relevant to you." },
  { q: "Is my payment information secure?", a: "Yes. All transactions are encrypted with TLS 1.3 and processed through PCI-DSS certified payment gateways." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/messages", form);
      if (res.data.success) {
        setSubmitted(true);
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-black min-h-screen">
      <div className="max-w-[1024px] mx-auto px-6 w-full pt-32 pb-24">
        
        {/* ── Header ── */}
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">Contact our team</h1>
          <p className="text-neutral-500 text-lg">We are here to help and answer any question you might have.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-16 md:gap-8">
          
          {/* ── Info ── */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">Get in touch</h2>
              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, title, value }) => (
                  <div key={title} className="flex gap-4">
                    <div className="mt-0.5">
                      <Icon size={18} className="text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">{title}</p>
                      <p className="text-sm text-neutral-500">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">Frequently asked</h2>
              <div className="border-t border-neutral-200 dark:border-neutral-800">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-neutral-200 dark:border-neutral-800">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="text-sm font-medium text-neutral-900 dark:text-white pr-4">{faq.q}</span>
                      <span className="text-neutral-400">
                        {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="md:col-span-3">
            <div className="card-base p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Message sent successfully</h3>
                  <p className="text-sm text-neutral-500 mb-8 max-w-sm">
                    Thank you for reaching out. A member of our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="btn-outline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                      <input
                        required type="text"
                        placeholder="Jane Doe"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-base"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                      <input
                        required type="email"
                        placeholder="jane@example.com"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Subject</label>
                    <select
                      required
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="input-base cursor-pointer"
                    >
                      <option value="" disabled>Select a topic</option>
                      <option value="support">Support</option>
                      <option value="sales">Sales</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Message</label>
                    <textarea
                      required rows={5}
                      placeholder="How can we help you?"
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-base resize-none"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={15} /> Send message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
