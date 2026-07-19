import Link from "next/link";
import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-dark-950 pt-16 pb-8 border-t border-gray-200 dark:border-dark-800 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary-500 text-white p-1.5 rounded-xl">
                <Sparkles size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-dark-900 dark:text-white">
                Nexa<span className="text-primary-500">Mart</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              The first AI-powered e-commerce platform designed to make shopping smarter, personalized, and delightful.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white dark:bg-dark-900 flex items-center justify-center text-gray-400 hover:text-primary-500 hover:shadow-md transition-all border border-gray-200 dark:border-dark-800"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Explore Products', 'About Us', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {['My Account', 'Order Tracking', 'Wishlist', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 mt-0.5 shrink-0" />
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  123 AI Boulevard, Tech Park, San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  +1 (800) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  support@nexamart.ai
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} NexaMart. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="h-8 w-12 bg-white dark:bg-dark-900 rounded border border-gray-200 dark:border-dark-800 flex items-center justify-center text-[10px] font-bold text-gray-400">VISA</div>
            <div className="h-8 w-12 bg-white dark:bg-dark-900 rounded border border-gray-200 dark:border-dark-800 flex items-center justify-center text-[10px] font-bold text-gray-400">MC</div>
            <div className="h-8 w-12 bg-white dark:bg-dark-900 rounded border border-gray-200 dark:border-dark-800 flex items-center justify-center text-[10px] font-bold text-gray-400">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
