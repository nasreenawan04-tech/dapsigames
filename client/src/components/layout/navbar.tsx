import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Gamepad2, Menu, Sparkles } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: "Categories", path: "/categories" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-lg" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" data-testid="logo-link">
            <div className="w-12 h-12 bg-gaming-primary rounded-2xl flex items-center justify-center shadow-game group-hover:shadow-glow transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-display font-bold text-gaming-gradient">DapsiGames</span>
              <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-display font-medium transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-105 focus-gaming ${
                  isActivePath(item.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } ${isActivePath(item.path) ? 'after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-gaming-primary after:rounded-full' : ''}`}
                data-testid={`nav-link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" className="font-display" data-testid="button-login">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="gaming" className="font-display" data-testid="button-signup">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors ${
                      isActivePath(item.path)
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary"
                    }`}
                    data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start" data-testid="mobile-button-login">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full" data-testid="mobile-button-signup">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
