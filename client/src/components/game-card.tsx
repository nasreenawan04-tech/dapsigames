import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  // Get the icon component dynamically
  const IconComponent = LucideIcons[game.icon as keyof typeof LucideIcons] as any;
  
  const getColorClasses = (category: string) => {
    switch (category) {
      case "math":
        return "bg-primary/10 text-primary";
      case "vocabulary":
        return "bg-secondary/10 text-secondary";
      case "memory":
        return "bg-accent/10 text-accent";
      case "logic":
        return "bg-primary/10 text-primary";
      case "language":
        return "bg-secondary/10 text-secondary";
      case "science":
        return "bg-accent/10 text-accent";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getIconBg = (category: string) => {
    switch (category) {
      case "math":
        return "bg-primary/10";
      case "vocabulary":
        return "bg-secondary/10";
      case "memory":
        return "bg-accent/10";
      case "logic":
        return "bg-primary/10";
      case "language":
        return "bg-secondary/10";
      case "science":
        return "bg-accent/10";
      default:
        return "bg-primary/10";
    }
  };

  const getIconColor = (category: string) => {
    switch (category) {
      case "math":
        return "text-primary";
      case "vocabulary":
        return "text-secondary";
      case "memory":
        return "text-accent";
      case "logic":
        return "text-primary";
      case "language":
        return "text-secondary";
      case "science":
        return "text-accent";
      default:
        return "text-primary";
    }
  };

  const getButtonColor = (category: string) => {
    switch (category) {
      case "vocabulary":
        return "bg-secondary hover:bg-secondary/90";
      case "memory":
        return "bg-accent hover:bg-accent/90 text-accent-foreground";
      case "language":
        return "bg-secondary hover:bg-secondary/90";
      case "science":
        return "bg-accent hover:bg-accent/90 text-accent-foreground";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  return (
    <Card className="game-card group shadow-lg border-2 border-border/50 hover:border-primary/30 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:shadow-game hover:-translate-y-2 hover:scale-[1.02] overflow-hidden relative" elevation="2" interactive data-testid={`game-card-${game.id}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" />
      <CardContent className="p-6 relative z-10">
        <div className={`w-20 h-20 ${getIconBg(game.category)} rounded-3xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]`}>
          {IconComponent && <IconComponent className={`w-10 h-10 ${getIconColor(game.category)} group-hover:animate-pulse`} />}
        </div>
        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-[250ms]" data-testid={`game-title-${game.id}`}>
          {game.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed" data-testid={`game-description-${game.id}`}>
          {game.description}
        </p>
        <div className="flex justify-between items-center">
          <Badge variant="gaming" className={`text-xs font-bold ${getColorClasses(game.category)} group-hover:scale-110 transition-transform duration-[250ms]`} data-testid={`game-category-${game.id}`}>
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </Badge>
          <Link href={`/game/${game.id}`}>
            <Button 
              variant="gaming"
              size="sm" 
              className={`text-sm font-display font-bold shadow-md hover:shadow-glow transform hover:scale-105 active:scale-95`}
              data-testid={`button-play-${game.id}`}
            >
              Play Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
