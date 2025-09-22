import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Crown, Sparkles, Medal, Star } from "lucide-react";
import type { LeaderboardEntry, Category } from "@shared/schema";

interface LeaderboardEntryWithUser extends LeaderboardEntry {
  user: {
    id: string;
    username: string;
    fullName: string;
    level: number;
  } | null;
}

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("global");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all-time");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: leaderboardEntries = [], isLoading } = useQuery<LeaderboardEntryWithUser[]>({
    queryKey: ["/api/leaderboard", { category: selectedCategory === "global" ? undefined : selectedCategory, period: selectedPeriod }],
  });

  const categoryTabs = [
    { id: "global", name: "Global" },
    ...categories.map(cat => ({ id: cat.id, name: cat.name }))
  ];

  const periodTabs = [
    { id: "all-time", name: "All Time" },
    { id: "weekly", name: "This Week" },
    { id: "daily", name: "Today" }
  ];

  const topThree = leaderboardEntries.slice(0, 3);
  const restOfEntries = leaderboardEntries.slice(3);

  const getInitials = (fullName: string) => {
    return fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = ["bg-primary", "bg-secondary", "bg-accent"];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="py-24 px-4 min-h-screen bg-gradient-to-b from-background via-muted/30 to-background" data-testid="leaderboard-loading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gaming-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Trophy className="w-8 h-8 text-gaming-primary" />
            </div>
            <div className="text-xl text-muted-foreground">Loading leaderboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 min-h-screen bg-gradient-to-b from-background via-gaming-primary/5 to-background" data-testid="leaderboard-page">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Crown className="w-5 h-5 text-gaming-primary" />
            <span className="text-gaming-primary font-display font-medium">🎆 Hall of Fame</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center mb-6 text-gaming-gradient" data-testid="leaderboard-title">
            Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="leaderboard-description">
            See how you stack up against other learners worldwide! Compete, achieve, and celebrate your learning milestones.
          </p>
        </div>

        {/* Enhanced Filter Controls */}
        <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-border/50 mb-12">
          {/* Category Tabs */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-display font-bold mb-4">Choose Category</h3>
            <div className="flex flex-wrap justify-center gap-3" data-testid="category-tabs">
              {categoryTabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  variant={selectedCategory === tab.id ? "gaming" : "outline"}
                  className={`rounded-2xl font-display font-medium transition-all duration-[250ms] ${
                    selectedCategory === tab.id 
                      ? 'shadow-lg hover:shadow-xl scale-105' 
                      : 'hover:scale-105 hover:border-gaming-primary/50'
                  }`}
                  data-testid={`category-tab-${tab.id}`}
                >
                  {tab.name}
                  {selectedCategory === tab.id && <Sparkles className="w-4 h-4 ml-2 animate-pulse" />}
                </Button>
              ))}
            </div>
          </div>

          {/* Period Tabs */}
          <div className="text-center">
            <h3 className="text-lg font-display font-bold mb-4">Time Period</h3>
            <div className="flex justify-center gap-3" data-testid="period-tabs">
              {periodTabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setSelectedPeriod(tab.id)}
                  variant={selectedPeriod === tab.id ? "gaming" : "outline"}
                  size="sm"
                  className={`rounded-xl font-display font-medium transition-all duration-[250ms] ${
                    selectedPeriod === tab.id 
                      ? 'shadow-md hover:shadow-lg scale-105' 
                      : 'hover:scale-105'
                  }`}
                  data-testid={`period-tab-${tab.id}`}
                >
                  {tab.name}
                  {selectedPeriod === tab.id && <Star className="w-3 h-3 ml-1 animate-pulse" />}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Leaderboard */}
        <Card className="shadow-xl border-2 border-border/50 hover:border-gaming-primary/30 overflow-hidden" elevation="3">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Trophy className="w-8 h-8 text-gaming-primary" />
              <h2 className="text-2xl font-display font-bold text-gaming-gradient" data-testid="leaderboard-subtitle">
                Top Players - {periodTabs.find(t => t.id === selectedPeriod)?.name}
              </h2>
              <Medal className="w-8 h-8 text-accent" />
            </div>

            {leaderboardEntries.length === 0 ? (
              <div className="text-center py-16" data-testid="no-leaderboard-data">
                <div className="w-20 h-20 bg-gaming-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-gaming-primary/60" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">No Rankings Yet</h3>
                <p className="text-muted-foreground">Be the first to compete and claim your spot on the leaderboard!</p>
              </div>
            ) : (
              <>
                {/* Enhanced Top 3 Podium */}
                {topThree.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-testid="top-three">
                    {topThree.map((entry, index) => {
                      const medals = ["🥇", "🥈", "🥉"];
                      const gradients = [
                        "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600",
                        "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
                        "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800"
                      ];
                      const textColors = ["text-yellow-100", "text-gray-100", "text-amber-100"];

                      return (
                        <div
                          key={entry.id}
                          className={`${gradients[index]} rounded-3xl p-8 text-center text-white shadow-xl hover:shadow-2xl transition-all duration-[250ms] hover:scale-105 relative overflow-hidden group`}
                          data-testid={`top-player-${index + 1}`}
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" />
                          <div className="relative z-10">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-[250ms]">
                              <span className="text-3xl font-bold">{medals[index]}</span>
                            </div>
                            <h3 className="font-display font-bold text-xl mb-2" data-testid={`top-player-name-${index + 1}`}>
                              {entry.user?.fullName || "Unknown Player"}
                            </h3>
                            <p className={`${textColors[index]} text-lg font-bold`} data-testid={`top-player-score-${index + 1}`}>
                              {entry.score.toLocaleString()} points
                            </p>
                            <div className="mt-4 text-sm opacity-90">
                              Rank #{index + 1}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Rest of leaderboard */}
                {restOfEntries.length > 0 && (
                  <div className="space-y-3" data-testid="rest-of-leaderboard">
                    {restOfEntries.map((entry, index) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-2xl"
                        data-testid={`leaderboard-entry-${index + 4}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {index + 4}
                          </div>
                          <Avatar className={`w-10 h-10 ${getAvatarColor(index)}`}>
                            <AvatarFallback className="text-white font-semibold">
                              {entry.user ? getInitials(entry.user.fullName) : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold" data-testid={`player-name-${index + 4}`}>
                              {entry.user?.fullName || "Unknown Player"}
                            </h4>
                            <p className="text-sm text-muted-foreground" data-testid={`player-level-${index + 4}`}>
                              Level {entry.user?.level || 0}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold" data-testid={`player-score-${index + 4}`}>
                            {entry.score.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
