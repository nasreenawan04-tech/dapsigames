import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { CategoryCard } from "@/components/category-card";
import { StatsCounter } from "@/components/stats-counter";
import { FAQAccordion } from "@/components/faq-accordion";
import { GraduationCap, Brain, Zap, Globe, Target, Eye, Heart } from "lucide-react";
import type { Game, Category } from "@shared/schema";

export default function Home() {
  const { data: games = [] } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Get popular games (top 3 by play count)
  const popularGames = games
    .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
    .slice(0, 3);

  const faqItems = [
    {
      question: "Are all games really free?",
      answer: "Yes! All our study games are completely free to play. We believe quality education should be accessible to everyone."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required to play! However, creating an account lets you track progress, earn achievements, and save your favorite games."
    },
    {
      question: "What age groups are these games for?",
      answer: "Our games are designed for students of all ages, from elementary school through college. Each game includes difficulty levels to match your skill level."
    }
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4" data-testid="hero-section">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 fade-in-up" data-testid="hero-title">
            Learn Through Play
            <span className="block text-accent">150+ Free Study Games</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto fade-in-up" data-testid="hero-subtitle">
            Boost learning, memory, and problem-solving with fun, interactive games designed for students worldwide.
          </p>
          <Link href="/games">
            <Button 
              size="lg" 
              className="bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105 fade-in-up"
              data-testid="button-start-playing"
            >
              Start Playing Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-16 bg-muted" data-testid="stats-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter target={500} label="K+ Learners" color="primary" />
            <StatsCounter target={5} label="M+ Game Plays" color="secondary" />
            <StatsCounter target={150} label="+ Study Games" color="accent" />
            <StatsCounter target={95} label="% Success Rate" color="primary" />
          </div>
        </div>
      </section>

      {/* Popular Games Showcase */}
      <section className="py-20 px-4" data-testid="popular-games-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="popular-games-title">
            Popular Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {popularGames.length === 0 && (
            <div className="text-center text-muted-foreground" data-testid="no-popular-games">
              No popular games available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-muted px-4" data-testid="categories-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="categories-title">
            Game Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.slice(0, 5).map((category) => (
              <div
                key={category.id}
                className="category-card bg-card rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = "/categories"}
                data-testid={`category-preview-${category.id}`}
              >
                <div className={`w-12 h-12 ${
                  category.color === "primary" ? "bg-primary/10" :
                  category.color === "secondary" ? "bg-secondary/10" :
                  "bg-accent/10"
                } rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <div className={`w-6 h-6 ${
                    category.color === "primary" ? "text-primary" :
                    category.color === "secondary" ? "text-secondary" :
                    "text-accent"
                  }`} />
                </div>
                <h3 className="font-semibold mb-1" data-testid={`category-preview-name-${category.id}`}>
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`category-preview-count-${category.id}`}>
                  {category.gameCount}+ Games
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose DapsiGames */}
      <section className="py-20 px-4" data-testid="features-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="features-title">
            Why Choose DapsiGames?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="feature-learn-faster">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Faster</h3>
              <p className="text-muted-foreground">Gamified learning accelerates knowledge retention and understanding.</p>
            </div>

            <div className="text-center" data-testid="feature-train-memory">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Train Memory</h3>
              <p className="text-muted-foreground">Improve cognitive abilities through targeted memory exercises.</p>
            </div>

            <div className="text-center" data-testid="feature-stay-motivated">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Motivated</h3>
              <p className="text-muted-foreground">Achievements and progress tracking keep you engaged and motivated.</p>
            </div>

            <div className="text-center" data-testid="feature-free-accessible">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free & Accessible</h3>
              <p className="text-muted-foreground">Quality education should be free and available to everyone worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted px-4" data-testid="how-it-works-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="how-it-works-title">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="step-1">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Game</h3>
              <p className="text-muted-foreground">Browse our extensive library and pick games that match your learning goals.</p>
            </div>

            <div className="text-center" data-testid="step-2">
              <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Play & Learn</h3>
              <p className="text-muted-foreground">Engage with interactive content designed to make learning fun and effective.</p>
            </div>

            <div className="text-center" data-testid="step-3">
              <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-black font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">Monitor your improvement and unlock achievements as you advance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4" data-testid="faq-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="faq-title">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
