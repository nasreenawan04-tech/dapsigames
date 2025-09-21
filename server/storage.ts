import { 
  type User, 
  type InsertUser, 
  type Game, 
  type InsertGame,
  type Category,
  type InsertCategory,
  type LeaderboardEntry,
  type InsertLeaderboardEntry,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Games
  getGames(): Promise<Game[]>;
  getGame(id: string): Promise<Game | undefined>;
  getGamesByCategory(category: string): Promise<Game[]>;
  searchGames(query: string): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  incrementGamePlayCount(gameId: string): Promise<void>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Leaderboard
  getLeaderboard(category?: string, period?: string): Promise<LeaderboardEntry[]>;
  createLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
  
  // Contact
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private games: Map<string, Game>;
  private categories: Map<string, Category>;
  private leaderboardEntries: Map<string, LeaderboardEntry>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.categories = new Map();
    this.leaderboardEntries = new Map();
    this.contactMessages = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample categories
    const sampleCategories: Category[] = [
      {
        id: "math",
        name: "Mathematics",
        description: "Arithmetic, algebra, geometry, and problem-solving games",
        icon: "calculator",
        gameCount: 25,
        color: "primary"
      },
      {
        id: "vocabulary",
        name: "Vocabulary",
        description: "Word games, spelling challenges, and language skills",
        icon: "book-open",
        gameCount: 30,
        color: "secondary"
      },
      {
        id: "memory",
        name: "Memory",
        description: "Pattern recognition, recall exercises, and brain training",
        icon: "brain",
        gameCount: 20,
        color: "accent"
      },
      {
        id: "logic",
        name: "Logic",
        description: "Critical thinking, reasoning, and problem-solving puzzles",
        icon: "puzzle",
        gameCount: 35,
        color: "primary"
      },
      {
        id: "language",
        name: "Language",
        description: "Foreign language learning and communication skills",
        icon: "globe",
        gameCount: 40,
        color: "secondary"
      },
      {
        id: "science",
        name: "Science",
        description: "Physics, chemistry, biology, and scientific method games",
        icon: "atom",
        gameCount: 15,
        color: "accent"
      }
    ];

    sampleCategories.forEach(category => {
      this.categories.set(category.id, category);
    });

    // Sample games
    const sampleGames: Game[] = [
      {
        id: "math-master",
        title: "Math Master",
        description: "Challenge your arithmetic skills with fun number puzzles and equations. This game helps improve calculation speed and mental math abilities through engaging gameplay.",
        category: "math",
        icon: "calculator",
        difficulty: "Beginner",
        ageGroup: "Ages 8+",
        learningBenefits: [
          "Improves arithmetic calculation speed",
          "Enhances mental math abilities",
          "Builds number sense and pattern recognition"
        ],
        instructions: [
          "Choose your difficulty level (Easy, Medium, or Hard)",
          "Solve the math problems as quickly as possible",
          "Use the number pad or keyboard to enter answers",
          "Earn points for correct answers and speed",
          "Try to beat your high score!"
        ],
        playCount: 15420
      },
      {
        id: "word-wizard",
        title: "Word Wizard",
        description: "Expand your vocabulary with engaging word games and spelling challenges.",
        category: "vocabulary",
        icon: "book-open",
        difficulty: "Intermediate",
        ageGroup: "Ages 10+",
        learningBenefits: [
          "Expands vocabulary knowledge",
          "Improves spelling accuracy",
          "Enhances reading comprehension"
        ],
        instructions: [
          "Read the definition or context clue",
          "Choose the correct word from multiple options",
          "Complete word puzzles and anagrams",
          "Progress through increasing difficulty levels"
        ],
        playCount: 12890
      },
      {
        id: "memory-quest",
        title: "Memory Quest",
        description: "Boost your memory with pattern recognition and recall exercises.",
        category: "memory",
        icon: "brain",
        difficulty: "Beginner",
        ageGroup: "Ages 6+",
        learningBenefits: [
          "Strengthens working memory",
          "Improves pattern recognition",
          "Enhances concentration skills"
        ],
        instructions: [
          "Watch the sequence of patterns or colors",
          "Repeat the sequence in the correct order",
          "Sequences become longer as you progress",
          "Stay focused and remember the patterns"
        ],
        playCount: 9650
      },
      {
        id: "logic-puzzle",
        title: "Logic Puzzle",
        description: "Test your logical thinking with mind-bending puzzles.",
        category: "logic",
        icon: "puzzle",
        difficulty: "Advanced",
        ageGroup: "Ages 12+",
        learningBenefits: [
          "Develops critical thinking",
          "Improves problem-solving skills",
          "Enhances logical reasoning"
        ],
        instructions: [
          "Analyze the given puzzle or riddle",
          "Use logical deduction to find the solution",
          "Consider all possible outcomes",
          "Work step by step through complex problems"
        ],
        playCount: 8730
      },
      {
        id: "language-builder",
        title: "Language Builder",
        description: "Learn new languages through interactive exercises.",
        category: "language",
        icon: "globe",
        difficulty: "Beginner",
        ageGroup: "Ages 8+",
        learningBenefits: [
          "Builds foreign language vocabulary",
          "Improves pronunciation",
          "Develops cultural awareness"
        ],
        instructions: [
          "Listen to native speaker pronunciations",
          "Practice speaking with voice recognition",
          "Complete translation exercises",
          "Learn common phrases and expressions"
        ],
        playCount: 11250
      },
      {
        id: "speed-math",
        title: "Speed Math",
        description: "Race against time in rapid math challenges.",
        category: "math",
        icon: "zap",
        difficulty: "Intermediate",
        ageGroup: "Ages 10+",
        learningBenefits: [
          "Increases calculation speed",
          "Builds mental math confidence",
          "Improves number fluency"
        ],
        instructions: [
          "Solve as many problems as possible before time runs out",
          "Use mental math strategies for speed",
          "Compete against your previous best times",
          "Unlock new difficulty levels"
        ],
        playCount: 7890
      }
    ];

    sampleGames.forEach(game => {
      this.games.set(game.id, game);
    });

    // Sample users and leaderboard entries
    const sampleUsers: User[] = [
      {
        id: "user1",
        username: "alexchen",
        email: "alex@example.com",
        password: "hashed_password",
        fullName: "Alex Chen",
        ageGroup: "High School (15-18)",
        totalScore: 25840,
        level: 45,
        createdAt: new Date()
      },
      {
        id: "user2",
        username: "sarahjohnson",
        email: "sarah@example.com",
        password: "hashed_password",
        fullName: "Sarah Johnson",
        ageGroup: "College (18+)",
        totalScore: 23210,
        level: 42,
        createdAt: new Date()
      },
      {
        id: "user3",
        username: "michaelkim",
        email: "michael@example.com",
        password: "hashed_password",
        fullName: "Michael Kim",
        ageGroup: "Middle School (12-14)",
        totalScore: 21650,
        level: 40,
        createdAt: new Date()
      }
    ];

    sampleUsers.forEach(user => {
      this.users.set(user.id, user);
    });

    // Sample leaderboard entries
    const sampleEntries: LeaderboardEntry[] = [
      { id: "entry1", userId: "user1", gameId: null, category: null, score: 25840, rank: 1, period: "all-time", createdAt: new Date() },
      { id: "entry2", userId: "user2", gameId: null, category: null, score: 23210, rank: 2, period: "all-time", createdAt: new Date() },
      { id: "entry3", userId: "user3", gameId: null, category: null, score: 21650, rank: 3, period: "all-time", createdAt: new Date() }
    ];

    sampleEntries.forEach(entry => {
      this.leaderboardEntries.set(entry.id, entry);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      totalScore: 0, 
      level: 1, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGame(id: string): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async getGamesByCategory(category: string): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => game.category === category);
  }

  async searchGames(query: string): Promise<Game[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.games.values()).filter(game =>
      game.title.toLowerCase().includes(lowercaseQuery) ||
      game.description.toLowerCase().includes(lowercaseQuery) ||
      game.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const game: Game = { 
      ...insertGame, 
      playCount: 0,
      learningBenefits: insertGame.learningBenefits || null,
      instructions: insertGame.instructions || null
    };
    this.games.set(game.id, game);
    return game;
  }

  async incrementGamePlayCount(gameId: string): Promise<void> {
    const game = this.games.get(gameId);
    if (game) {
      game.playCount = (game.playCount || 0) + 1;
      this.games.set(gameId, game);
    }
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = { ...insertCategory, gameCount: 0 };
    this.categories.set(category.id, category);
    return category;
  }

  async getLeaderboard(category?: string, period = "all-time"): Promise<LeaderboardEntry[]> {
    let entries = Array.from(this.leaderboardEntries.values()).filter(entry => entry.period === period);
    
    if (category) {
      entries = entries.filter(entry => entry.category === category);
    } else {
      entries = entries.filter(entry => !entry.category);
    }
    
    return entries.sort((a, b) => b.score - a.score);
  }

  async createLeaderboardEntry(insertEntry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const id = randomUUID();
    const entry: LeaderboardEntry = { 
      ...insertEntry, 
      id, 
      rank: 0, 
      category: insertEntry.category || null,
      createdAt: new Date() 
    };
    this.leaderboardEntries.set(id, entry);
    return entry;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
