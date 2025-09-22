import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { Search, Filter, Grid, List, Sparkles, Trophy, Zap } from "lucide-react";
import type { Game, Category } from "@shared/schema";

export default function Games() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "popular" | "title-z-a">("popular");

  const { data: allGames = [] } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Filter and sort games
  const filteredGames = [...allGames]
    .filter((game) => {
      const matchesSearch = searchQuery === "" || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeTab === "all" || game.category === activeTab;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "popular":
          return (b.playCount || 0) - (a.playCount || 0);
        case "title-z-a":
          return b.title.localeCompare(a.title); // Z to A sorting
        default:
          return 0;
      }
    });

  const categoryTabs = [
    { id: "all", name: "All" },
    ...categories.map(cat => ({ id: cat.id, name: cat.name }))
  ];

  return (
    <div className="py-24 px-4 min-h-screen bg-gradient-to-b from-background via-muted/30 to-background" data-testid="games-page">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Trophy className="w-5 h-5 text-gaming-primary" />
            <span className="text-gaming-primary font-display font-medium">🎮 {filteredGames.length} Epic Learning Adventures</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="games-title">
            All Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your next favorite learning adventure from our growing collection of educational games
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="mb-16">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-border/50">
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gaming-primary transition-colors duration-[250ms]" />
                  <Input
                    type="text"
                    placeholder="Search for your next adventure..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-3xl border-2 border-border/50 focus:border-gaming-primary bg-background/80 backdrop-blur-sm shadow-sm focus:shadow-lg transition-all duration-[250ms]"
                    data-testid="input-search"
                  />
                </div>
              </div>
              
              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                
                <Select value={sortBy} onValueChange={(value: "name" | "popular" | "title-z-a") => setSortBy(value)}>
                  <SelectTrigger className="w-full sm:w-40 py-4 rounded-3xl border-2 border-border/50 bg-background/80 backdrop-blur-sm" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="title-z-a">Title Z-A</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* View Mode Toggle */}
                <div className="flex rounded-3xl border-2 border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none px-4 py-4"
                    data-testid="view-grid"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none px-4 py-4"
                    data-testid="view-list"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3">
              {categoryTabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "gaming" : "outline"}
                  className={`rounded-2xl font-display font-medium transition-all duration-[250ms] ${
                    activeTab === tab.id 
                      ? 'shadow-lg hover:shadow-xl scale-105' 
                      : 'hover:scale-105 hover:border-gaming-primary/50'
                  }`}
                  data-testid={`tab-${tab.id}`}
                >
                  {tab.name}
                  {activeTab === tab.id && <Sparkles className="w-4 h-4 ml-2 animate-pulse" />}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Results Summary */}
          {(searchQuery || activeTab !== "all") && (
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gaming-primary/5 backdrop-blur-sm rounded-2xl p-4 mb-8">
              <div className="flex items-center space-x-2 text-gaming-primary font-medium">
                <Zap className="w-5 h-5" />
                <span>Found {filteredGames.length} games matching your criteria</span>
              </div>
              <Button
                onClick={() => {
                  setSearchQuery("");

                  setActiveTab("all");
                }}
                variant="ghost"
                size="sm"
                className="text-gaming-primary hover:text-gaming-primary/80"
                data-testid="button-clear-filters"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Games Grid/List */}
        <div className="mb-16">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8" data-testid="games-grid">
              {filteredGames.map((game) => (
                <div key={game.id} className="group">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4" data-testid="games-list">
              {filteredGames.map((game) => (
                <div key={game.id} className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-[250ms] border border-border/50 hover:border-gaming-primary/30 group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gaming-primary/10 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-[250ms]">
                        {/* Icon placeholder - would use game.icon */}
                        <Zap className="w-10 h-10 text-gaming-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-display font-bold mb-2 group-hover:text-gaming-primary transition-colors duration-[250ms]">
                        {game.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {game.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gaming-primary/10 text-gaming-primary">
                          {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
                        </span>
                        <Button variant="gaming" size="sm" className="font-display font-bold">
                          Play Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-20" data-testid="no-games-found">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gaming-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gaming-primary/60" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">
                {searchQuery || activeTab !== "all" 
                  ? "No games found"
                  : "No games available"
                }
              </h3>
              <p className="text-muted-foreground mb-8">
                {searchQuery || activeTab !== "all" 
                  ? "Try adjusting your search criteria or browse all available games."
                  : "Check back soon for new educational adventures!"
                }
              </p>
              {(searchQuery || activeTab !== "all") && (
                <div className="space-y-4">
                  <Button
                    onClick={() => {
                      setSearchQuery("");
    
                      setActiveTab("all");
                    }}
                    variant="gaming"
                    className="font-display font-bold"
                    data-testid="button-clear-filters-empty"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Pagination */}
        {filteredGames.length > 12 && (
          <div className="flex flex-col items-center mt-16" data-testid="pagination">
            <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-border/50">
              <Button variant="outline" size="sm" disabled className="rounded-xl">
                Previous
              </Button>
              <Button variant="gaming" size="sm" className="rounded-xl font-display font-bold">
                1
              </Button>
              <Button variant="outline" size="sm" disabled className="rounded-xl">
                Next
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Showing {filteredGames.length} games
            </p>
          </div>
        )}
        
        {/* Load More for large collections */}
        {filteredGames.length > 0 && filteredGames.length <= 12 && allGames.length > filteredGames.length && (
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Showing {filteredGames.length} of {allGames.length} total games
            </p>
            <Button variant="outline" size="lg" className="font-display font-medium px-8 py-4 rounded-2xl border-2">
              Load More Games
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
