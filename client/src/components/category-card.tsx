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
    <Card className="category-card shadow-lg border border-border hover:shadow-xl transition-all duration-300" data-testid={`category-card-${category.id}`}>
      <CardContent className="p-8 text-center">
        <div className={`w-20 h-20 ${colors.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
          {IconComponent && <IconComponent className={`w-10 h-10 ${colors.iconColor}`} />}
        </div>
        <h3 className="text-xl font-bold mb-3" data-testid={`category-title-${category.id}`}>
          {category.name}
        </h3>
        <p className="text-muted-foreground mb-4" data-testid={`category-description-${category.id}`}>
          {category.description}
        </p>
        <div className="text-center mb-6">
          <span className={`text-2xl font-bold ${colors.count}`} data-testid={`category-count-${category.id}`}>
            {category.gameCount}+
          </span>
          <span className="text-muted-foreground ml-1">Games</span>
        </div>
        <Link href="/games">
          <Button 
            className={`w-full font-semibold ${colors.button}`}
            data-testid={`button-explore-${category.id}`}
          >
            Explore Games
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
