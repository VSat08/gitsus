"use client";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Music2,
  Twitch,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full text-gray-400">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <Image src="/Logo.svg" alt="GitSus" width={40} height={40} />
              <h2 className="text-2xl font-semibold text-white">GitSus</h2>
            </div>
            <p className="mb-4 text-sm">
              Experience seamless development workflows where AI enhances every
              collaboration.
            </p>
            <Button className="border-gray-600 text-white hover:border-white">
              Try Gitsus
            </Button>
          </div>

          {/* Product Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 font-semibold text-white">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Copilot
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Compare GitSus
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 font-semibold text-white">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Developer API
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Education
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  GitSus CLI
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  GitSus Desktop
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  GitSus Mobile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 font-semibold text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Professional Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Premium Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Status
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact GitSus
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Customer stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  The ReadME Project
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Inclusion
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Social Impact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 text-xs md:flex-row">
            <span>© 2025 GitSus, Inc.</span>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link href="#" className="hover:text-white">
                Terms
              </Link>
              <Link href="#" className="hover:text-white">
                Privacy (Updated 02/2024)
              </Link>
              <Link href="#" className="hover:text-white">
                Sitemap
              </Link>
              <Link href="#" className="hover:text-white">
                What is Git?
              </Link>
              <button className="text-left hover:text-white">
                Manage cookies
              </button>
              <Link href="#" className="hover:text-white">
                Do not share my personal information
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">X (Twitter)</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Music2 className="h-5 w-5" />
              <span className="sr-only">TikTok</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitch className="h-5 w-5" />
              <span className="sr-only">Twitch</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitSus</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
