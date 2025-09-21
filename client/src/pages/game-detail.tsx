import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/game-card";
import { Check } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Game } from "@shared/schema";

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: game, isLoading, error } = useQuery<Game>({
    queryKey: ["/api/games", id],
    enabled: !!id,
  });

  const { data: allGames = [] } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const playGameMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/games/${id}/play`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/games", id] });
      queryClient.invalidateQueries({ queryKey: ["/api/games"] });
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 px-4" data-testid="game-detail-loading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading game details...</div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="py-20 px-4" data-testid="game-detail-error">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
            <p className="text-muted-foreground">The game you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

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

  // Get related games (same category, excluding current game)
  const relatedGames = allGames
    .filter((g) => g.category === game.category && g.id !== game.id)
    .slice(0, 3);

  const handlePlayGame = () => {
    playGameMutation.mutate();
    // In a real app, this would redirect to the actual game
    alert("Starting game! (This would redirect to the actual game interface)");
  };

  return (
    <div className="py-20 px-4" data-testid="game-detail-page">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border border-border">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className={`w-32 h-32 ${getIconBg(game.category)} rounded-2xl flex items-center justify-center mx-auto`}>
                  {IconComponent && <IconComponent className={`w-16 h-16 ${getIconColor(game.category)}`} />}
                </div>
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-4" data-testid="game-detail-title">
                  {game.title}
                </h1>
                <p className="text-muted-foreground mb-6" data-testid="game-detail-description">
                  {game.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className={getColorClasses(game.category)} data-testid="game-detail-category">
                    {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
                  </Badge>
                  <Badge variant="outline" data-testid="game-detail-age-group">
                    {game.ageGroup}
                  </Badge>
                  <Badge variant="outline" data-testid="game-detail-difficulty">
                    {game.difficulty}
                  </Badge>
                </div>

                <div className="mb-4" data-testid="game-detail-play-count">
                  <span className="text-sm text-muted-foreground">
                    Played {game.playCount?.toLocaleString() || 0} times
                  </span>
                </div>

                <Button
                  onClick={handlePlayGame}
                  disabled={playGameMutation.isPending}
                  className="px-8 py-3 rounded-2xl font-semibold"
                  data-testid="button-play-game"
                >
                  {playGameMutation.isPending ? "Starting..." : "Play Now"}
                </Button>
              </div>
            </div>

            <div className="mt-12">
              {game.learningBenefits && game.learningBenefits.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4" data-testid="learning-benefits-title">
                    Learning Benefits
                  </h2>
                  <ul className="space-y-2 text-muted-foreground mb-8" data-testid="learning-benefits-list">
                    {game.learningBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center" data-testid={`learning-benefit-${index}`}>
                        <Check className="w-5 h-5 text-secondary mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {game.instructions && game.instructions.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4" data-testid="instructions-title">
                    How to Play
                  </h2>
                  <Card className="bg-muted mb-8">
                    <CardContent className="p-6">
                      <ol className="space-y-2 text-muted-foreground" data-testid="instructions-list">
                        {game.instructions.map((instruction, index) => (
                          <li key={index} data-testid={`instruction-${index}`}>
                            {index + 1}. {instruction}
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </>
              )}

              {relatedGames.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4" data-testid="related-games-title">
                    Related Games
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="related-games-grid">
                    {relatedGames.map((relatedGame) => (
                      <GameCard key={relatedGame.id} game={relatedGame} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
