import { useQuery } from "@tanstack/react-query";
import { CategoryCard } from "@/components/category-card";
import type { Category } from "@shared/schema";

export default function Categories() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="py-20 px-4" data-testid="categories-loading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4" data-testid="categories-page">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8" data-testid="categories-title">
          Game Categories
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" data-testid="categories-description">
          Explore our diverse collection of educational games organized by subject. Each category is designed to target specific learning skills and cognitive abilities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-16" data-testid="no-categories">
            <div className="text-muted-foreground">
              No categories available at the moment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
