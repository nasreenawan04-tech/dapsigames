import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
      <div className="py-20 px-4" data-testid="leaderboard-loading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4" data-testid="leaderboard-page">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8" data-testid="leaderboard-title">
          Leaderboard
        </h1>
        <p className="text-center text-muted-foreground mb-12" data-testid="leaderboard-description">
          See how you stack up against other learners worldwide!
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" data-testid="category-tabs">
          {categoryTabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              variant={selectedCategory === tab.id ? "default" : "secondary"}
              className="rounded-2xl"
              data-testid={`category-tab-${tab.id}`}
            >
              {tab.name}
            </Button>
          ))}
        </div>

        {/* Period Tabs */}
        <div className="flex justify-center gap-2 mb-8" data-testid="period-tabs">
          {periodTabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setSelectedPeriod(tab.id)}
              variant={selectedPeriod === tab.id ? "default" : "secondary"}
              size="sm"
              className="rounded-xl"
              data-testid={`period-tab-${tab.id}`}
            >
              {tab.name}
            </Button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <Card className="shadow-lg border border-border overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4" data-testid="leaderboard-subtitle">
              Top Players - {periodTabs.find(t => t.id === selectedPeriod)?.name}
            </h2>

            {leaderboardEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground" data-testid="no-leaderboard-data">
                No leaderboard data available for the selected criteria.
              </div>
            ) : (
              <>
                {/* Top 3 Special Cards */}
                {topThree.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" data-testid="top-three">
                    {topThree.map((entry, index) => {
                      const medals = ["🥇", "🥈", "🥉"];
                      const gradients = [
                        "bg-gradient-to-br from-yellow-400 to-yellow-600",
                        "bg-gradient-to-br from-gray-300 to-gray-500",
                        "bg-gradient-to-br from-amber-600 to-amber-800"
                      ];
                      const textColors = ["text-yellow-100", "text-gray-100", "text-amber-100"];

                      return (
                        <div
                          key={entry.id}
                          className={`${gradients[index]} rounded-2xl p-6 text-center text-white`}
                          data-testid={`top-player-${index + 1}`}
                        >
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold">{medals[index]}</span>
                          </div>
                          <h3 className="font-bold text-lg" data-testid={`top-player-name-${index + 1}`}>
                            {entry.user?.fullName || "Unknown Player"}
                          </h3>
                          <p className={textColors[index]} data-testid={`top-player-score-${index + 1}`}>
                            {entry.score.toLocaleString()} points
                          </p>
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
