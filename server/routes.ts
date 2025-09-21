import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Games routes
  app.get("/api/games", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let games;
      if (search) {
        games = await storage.searchGames(search as string);
      } else if (category) {
        games = await storage.getGamesByCategory(category as string);
      } else {
        games = await storage.getGames();
      }
      
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games" });
    }
  });

  app.get("/api/games/:id", async (req, res) => {
    try {
      const game = await storage.getGame(req.params.id);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game" });
    }
  });

  app.post("/api/games/:id/play", async (req, res) => {
    try {
      await storage.incrementGamePlayCount(req.params.id);
      res.json({ message: "Play count incremented" });
    } catch (error) {
      res.status(500).json({ message: "Failed to increment play count" });
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Leaderboard routes
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const { category, period } = req.query;
      const entries = await storage.getLeaderboard(
        category as string, 
        period as string
      );
      
      // Populate user data
      const entriesWithUsers = await Promise.all(
        entries.map(async (entry) => {
          const user = await storage.getUser(entry.userId!);
          return {
            ...entry,
            user: user ? {
              id: user.id,
              username: user.username,
              fullName: user.fullName,
              level: user.level
            } : null
          };
        })
      );
      
      res.json(entriesWithUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data" });
    }
  });

  // User routes (placeholder for auth)
  app.post("/api/auth/register", async (req, res) => {
    // Placeholder for user registration
    res.status(501).json({ message: "Registration not yet implemented" });
  });

  app.post("/api/auth/login", async (req, res) => {
    // Placeholder for user login
    res.status(501).json({ message: "Login not yet implemented" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
