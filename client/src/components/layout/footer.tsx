import { Link } from "wouter";
import { Gamepad2, Twitter, Facebook, Instagram, Github, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gaming-primary text-white relative overflow-hidden" data-testid="footer">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/20 to-accent/30" />
      <div className="relative z-10 max-w-6xl mx-auto py-12 sm:py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-display font-bold text-white">DapsiGames</span>
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Making learning fun through innovative educational games for students worldwide. Join millions of learners discovering the joy of gamified education.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-lg hover:shadow-xl"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-lg hover:shadow-xl"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-lg hover:shadow-xl"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-lg hover:shadow-xl"
                data-testid="social-github"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6 text-lg">Games</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/categories" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-math">
                  Math Games
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors" data-testid="footer-link-vocabulary">
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-memory">
                  Memory Games
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-logic">
                  Logic Puzzles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6 text-lg">Company</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/about" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-contact">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-careers">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6 text-lg">Support</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a href="#" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-help">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-terms">
                  Terms of Service
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent hover:translate-x-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] block" data-testid="footer-link-bug-report">
                  Report a Bug
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <p>&copy; 2024 DapsiGames. All rights reserved. Made with</p>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <p>for learners worldwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
