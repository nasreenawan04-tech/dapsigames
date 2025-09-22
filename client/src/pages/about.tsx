import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Sparkles, Users, Trophy, Rocket } from "lucide-react";

export default function About() {
  const timelineItems = [
    {
      year: "2020",
      title: "The Beginning",
      description: "DapsiGames was founded with a mission to revolutionize education through gaming.",
      color: "bg-primary"
    },
    {
      year: "2021",
      title: "First 50 Games",
      description: "Launched our first collection of educational games across multiple subjects.",
      color: "bg-secondary"
    },
    {
      year: "2022",
      title: "100K Users",
      description: "Reached our first major milestone with 100,000 registered learners.",
      color: "bg-accent"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to serve students in over 50 countries with localized content.",
      color: "bg-primary"
    },
    {
      year: "2024",
      title: "500K Community",
      description: "Celebrating over 500,000 learners and 150+ educational games.",
      color: "bg-secondary"
    }
  ];

  return (
    <div className="py-24 px-4 min-h-screen bg-gradient-to-b from-background via-muted/30 to-background" data-testid="about-page">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Heart className="w-5 h-5 text-gaming-primary animate-pulse" />
            <span className="text-gaming-primary font-display font-medium">❤️ Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center mb-8 text-gaming-gradient" data-testid="about-title">
            About DapsiGames
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed" data-testid="about-subtitle">
            Making learning fun for students worldwide through innovative educational games that combine entertainment with effective learning strategies.
          </p>
        </div>

        {/* Enhanced Story Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Students studying together"
                className="rounded-2xl shadow-lg w-full h-auto"
                data-testid="about-image"
              />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gaming-primary/10 rounded-2xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-gaming-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gaming-gradient" data-testid="our-story-title">
                  Our Story
                </h2>
              </div>
              <p className="text-muted-foreground mb-4" data-testid="story-paragraph-1">
                DapsiGames was born from a simple observation: students learn better when they're engaged and having fun. Our founder, a former educator, noticed that traditional learning methods often failed to capture students' attention in our digital age.
              </p>
              <p className="text-muted-foreground mb-4" data-testid="story-paragraph-2">
                In 2020, we set out to bridge the gap between gaming and education, creating interactive experiences that make learning as addictive as playing your favorite game. Today, we're proud to serve over 500,000 learners worldwide.
              </p>
              <p className="text-muted-foreground" data-testid="story-paragraph-3">
                Our mission remains the same: to democratize quality education by making it accessible, engaging, and free for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24" data-testid="mission-vision-values">
          <div className="text-center" data-testid="mission-section">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Mission</h3>
            <p className="text-muted-foreground">
              To make quality education accessible to every student worldwide through innovative, engaging, and free educational games.
            </p>
          </div>

          <div className="text-center" data-testid="vision-section">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Vision</h3>
            <p className="text-muted-foreground">
              A world where learning is as enjoyable as playing, and every student has the tools to reach their full potential.
            </p>
          </div>

          <div className="text-center" data-testid="values-section">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-4">Values</h3>
            <p className="text-muted-foreground">
              Innovation, accessibility, engagement, and the belief that every student deserves a fun and effective learning experience.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" data-testid="timeline-title">
            Our Journey
          </h2>
          <div className="space-y-8" data-testid="timeline">
            {timelineItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6" data-testid={`timeline-item-${index}`}>
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {item.year}
                </div>
                <Card className="shadow-md border border-border flex-1">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2" data-testid={`timeline-title-${index}`}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`timeline-description-${index}`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="team-title">
            Built by Educators, for Students
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="team-description">
            Our team combines expertise in education, game design, and technology to create experiences that truly make a difference in how students learn.
          </p>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="px-8 py-3 rounded-2xl font-semibold"
              data-testid="button-get-in-touch"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
