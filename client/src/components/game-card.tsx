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
    <Card className="game-card shadow-lg border border-border transition-all duration-300 hover:shadow-xl" data-testid={`game-card-${game.id}`}>
      <CardContent className="p-6">
        <div className={`w-16 h-16 ${getIconBg(game.category)} rounded-2xl flex items-center justify-center mb-4`}>
          {IconComponent && <IconComponent className={`w-8 h-8 ${getIconColor(game.category)}`} />}
        </div>
        <h3 className="text-lg font-semibold mb-2" data-testid={`game-title-${game.id}`}>
          {game.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`game-description-${game.id}`}>
          {game.description}
        </p>
        <div className="flex justify-between items-center">
          <Badge className={`text-xs ${getColorClasses(game.category)}`} data-testid={`game-category-${game.id}`}>
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </Badge>
          <Link href={`/game/${game.id}`}>
            <Button 
              size="sm" 
              className={`text-sm ${getButtonColor(game.category)}`}
              data-testid={`button-play-${game.id}`}
            >
              Play
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
