import { Link } from "wouter";
import { Gamepad2, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">DapsiGames</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Making learning fun through innovative educational games for students worldwide.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-muted rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-muted rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-muted rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Games</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors" data-testid="footer-link-math">
                  Math Games
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors" data-testid="footer-link-vocabulary">
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors" data-testid="footer-link-memory">
                  Memory Games
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors" data-testid="footer-link-logic">
                  Logic Puzzles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors" data-testid="footer-link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors" data-testid="footer-link-contact">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-careers">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-help">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-terms">
                  Terms of Service
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors" data-testid="footer-link-bug-report">
                  Report a Bug
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 DapsiGames. All rights reserved. Made with ❤️ for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
