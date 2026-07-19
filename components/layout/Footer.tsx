import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Explore", href: "/explore" },
      { name: "Categories", href: "#" },
      { name: "Deals", href: "#" },
      { name: "Pricing", href: "#" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "/contact" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ]
  }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black pt-16 pb-8">
      <div className="section-container !py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Nexa<span className="text-primary-500">Mart</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm mb-6">
              The AI-powered e-commerce platform designed to make shopping smarter, faster, and tailored to you.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            © {year} NexaMart Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
