import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { CategoryCard } from "@/components/category-card";
import { StatsCounter } from "@/components/stats-counter";
import { FAQAccordion } from "@/components/faq-accordion";
import { GraduationCap, Brain, Zap, Globe, Target, Eye, Heart, Play, Sparkles, Trophy, Users, Star } from "lucide-react";
import type { Game, Category } from "@shared/schema";
import { useSEO } from "@/hooks/use-seo";

export default function Home() {
  useSEO({
    title: "Learn Through Play - Free Educational Games",
    description: "Transform learning into an adventure with DapsiGames' collection of free educational games. Join 500,000+ students worldwide in making education fun and effective.",
    canonical: "https://dapsigames.com"
  });

  const { data: games = [] } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Get popular games (top 3 by play count)
  const popularGames = [...games]
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
      {/* Simple Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-24 px-4" data-testid="hero-section">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="hero-title">
            Learn Through Play
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="hero-subtitle">
            Transform your education with interactive games that make learning fun and effective
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold"
              data-testid="button-start-playing"
            >
              <Link href="/games">
                <Play className="w-5 h-5 mr-2" />
                Start Playing
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              data-testid="button-browse-categories"
            >
              <Link href="/categories">
                Browse Games
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-r from-muted/50 to-card/50 border-y border-border/20" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Trusted by Students Worldwide</h2>
            <p className="text-muted-foreground text-lg">Join millions of learners who have transformed their education through gaming</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gaming-primary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-[250ms]">
                <Users className="w-10 h-10 text-white" />
              </div>
              <StatsCounter target={500} label="K+ Learners" color="primary" />
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-[250ms]">
                <Play className="w-10 h-10 text-white" />
              </div>
              <StatsCounter target={5} label="M+ Game Plays" color="secondary" />
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-[250ms]">
                <Zap className="w-10 h-10 text-accent-foreground" />
              </div>
              <StatsCounter target={150} label="+ Study Games" color="accent" />
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gaming-primary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-[250ms]">
                <Star className="w-10 h-10 text-white" />
              </div>
              <StatsCounter target={95} label="% Success Rate" color="primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games Showcase */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30" data-testid="popular-games-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Trophy className="w-5 h-5 text-gaming-primary" />
              <span className="text-gaming-primary font-display font-medium">Most Loved by Students</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="popular-games-title">
              Popular Games
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the games that are transforming how students learn around the world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {popularGames.length === 0 && (
            <div className="text-center text-muted-foreground" data-testid="no-popular-games">
              No popular games available at the moment.
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/games">
              <Button variant="gaming" size="lg" className="font-display font-bold px-8 py-4">
                View All Games
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-gradient-to-br from-muted/50 via-card/30 to-accent/5 px-4" data-testid="categories-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="categories-title">
              Game Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your learning adventure from our diverse collection of educational game categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {categories.slice(0, 5).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/categories">
              <Button variant="outline" size="lg" className="font-display font-bold px-8 py-4 border-2">
                Explore All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose DapsiGames */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-gaming-primary/5" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="features-title">
              Why Choose DapsiGames?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of education with our innovative approach to learning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group" data-testid="feature-learn-faster">
              <div className="w-20 h-20 bg-gaming-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:bg-gaming-primary/20 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                <GraduationCap className="w-10 h-10 text-gaming-primary group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-gaming-primary transition-colors duration-[250ms]">Learn Faster</h3>
              <p className="text-muted-foreground leading-relaxed">Gamified learning accelerates knowledge retention and understanding through interactive experiences.</p>
            </div>

            <div className="text-center group" data-testid="feature-train-memory">
              <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                <Brain className="w-10 h-10 text-secondary group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-secondary transition-colors duration-[250ms]">Train Memory</h3>
              <p className="text-muted-foreground leading-relaxed">Improve cognitive abilities through targeted memory exercises and brain training challenges.</p>
            </div>

            <div className="text-center group" data-testid="feature-stay-motivated">
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                <Zap className="w-10 h-10 text-accent group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent transition-colors duration-[250ms]">Stay Motivated</h3>
              <p className="text-muted-foreground leading-relaxed">Achievements and progress tracking keep you engaged and motivated throughout your learning journey.</p>
            </div>

            <div className="text-center group" data-testid="feature-free-accessible">
              <div className="w-20 h-20 bg-gaming-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:bg-gaming-primary/20 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                <Globe className="w-10 h-10 text-gaming-primary group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-gaming-primary transition-colors duration-[250ms]">Free & Accessible</h3>
              <p className="text-muted-foreground leading-relaxed">Quality education should be free and available to everyone worldwide, breaking down barriers to learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gaming-primary/5 via-muted/50 to-accent/5 px-4" data-testid="how-it-works-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="how-it-works-title">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start your learning adventure in just three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group" data-testid="step-1">
              <div className="w-24 h-24 bg-gaming-primary rounded-3xl flex items-center justify-center mx-auto mb-6 text-white font-display font-bold text-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:bg-gaming-primary/90 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                1
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-gaming-primary transition-colors duration-[250ms]">Choose Your Game</h3>
              <p className="text-muted-foreground leading-relaxed">Browse our extensive library and pick games that match your learning goals and interests.</p>
            </div>

            <div className="text-center group" data-testid="step-2">
              <div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 text-white font-display font-bold text-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:bg-secondary/90 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                2
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-secondary transition-colors duration-[250ms]">Play & Learn</h3>
              <p className="text-muted-foreground leading-relaxed">Engage with interactive content designed to make learning fun, effective, and memorable.</p>
            </div>

            <div className="text-center group" data-testid="step-3">
              <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-6 text-accent-foreground font-display font-bold text-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:bg-accent/90 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                3
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent transition-colors duration-[250ms]">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">Monitor your improvement and unlock achievements as you advance through your learning journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30" data-testid="faq-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about DapsiGames and start your learning adventure
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
