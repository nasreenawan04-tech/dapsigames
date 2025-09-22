import { useQuery } from "@tanstack/react-query";
import { CategoryCard } from "@/components/category-card";
import { Trophy, Sparkles } from "lucide-react";
import type { Category } from "@shared/schema";

export default function Categories() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="py-24 px-4 min-h-screen bg-gradient-to-b from-background via-muted/30 to-background" data-testid="categories-loading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gaming-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Trophy className="w-8 h-8 text-gaming-primary" />
            </div>
            <div className="text-xl text-muted-foreground">Loading categories...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 min-h-screen bg-gradient-to-b from-background via-muted/30 to-background" data-testid="categories-page">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Trophy className="w-5 h-5 text-gaming-primary" />
            <span className="text-gaming-primary font-display font-medium">🎯 {categories.length} Learning Categories</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="categories-title">
            Game Categories
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed" data-testid="categories-description">
            Explore our diverse collection of educational games organized by subject. Each category is designed to target specific learning skills and cognitive abilities, making learning both effective and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-20" data-testid="no-categories">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gaming-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-gaming-primary/60" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">No Categories Available</h3>
              <p className="text-muted-foreground">
                Check back soon for new learning categories and educational adventures!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
