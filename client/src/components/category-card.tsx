import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import type { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Get the icon component dynamically
  const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as any;
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          button: "bg-primary hover:bg-primary/90",
          count: "text-primary"
        };
      case "secondary":
        return {
          iconBg: "bg-secondary/10",
          iconColor: "text-secondary",
          button: "bg-secondary hover:bg-secondary/90",
          count: "text-secondary"
        };
      case "accent":
        return {
          iconBg: "bg-accent/10",
          iconColor: "text-accent",
          button: "bg-accent hover:bg-accent/90 text-accent-foreground",
          count: "text-accent"
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          button: "bg-primary hover:bg-primary/90",
          count: "text-primary"
        };
    }
  };

  const colors = getColorClasses(category.color);

  return (
    <Card className="category-card group shadow-xl border-2 border-border/50 hover:border-primary/30 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:shadow-game hover:-translate-y-3 hover:scale-105 overflow-hidden relative" elevation="3" interactive data-testid={`category-card-${category.id}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" />
      <CardContent className="p-8 text-center relative z-10">
        <div className={`w-24 h-24 ${colors.iconBg} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl group-hover:scale-125 group-hover:rotate-3 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]`}>
          {IconComponent && <IconComponent className={`w-12 h-12 ${colors.iconColor} group-hover:animate-bounce`} />}
        </div>
        <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-gaming-gradient transition-colors duration-[250ms]" data-testid={`category-title-${category.id}`}>
          {category.name}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`category-description-${category.id}`}>
          {category.description}
        </p>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <span className={`text-3xl font-display font-bold ${colors.count} group-hover:scale-110 transition-transform duration-[250ms]`} data-testid={`category-count-${category.id}`}>
              {category.gameCount}+
            </span>
            <span className="text-muted-foreground text-lg font-medium">Games</span>
          </div>
        </div>
        <Link href="/games">
          <Button 
            variant="gaming"
            className={`w-full font-display font-bold text-base py-3 shadow-lg hover:shadow-glow transform hover:scale-105 active:scale-95`}
            data-testid={`button-explore-${category.id}`}
          >
            Explore Games
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
