import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Clock, Globe, Twitter, Facebook, Instagram, Linkedin, Sparkles, Heart, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import type { InsertContactMessage } from "@shared/schema";

const formSchema = insertContactMessageSchema;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="py-24 px-4 min-h-screen bg-gradient-to-b from-background via-muted/30 to-background" data-testid="contact-page">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Heart className="w-5 h-5 text-gaming-primary animate-pulse" />
            <span className="text-gaming-primary font-display font-medium">💬 Let's Connect</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center mb-8 text-gaming-gradient" data-testid="contact-title">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed" data-testid="contact-subtitle">
            Have questions, feedback, or suggestions? We'd love to hear from you! Our team is here to help make your learning experience even better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Form */}
          <Card className="shadow-xl border-2 border-border/50 hover:border-gaming-primary/30 transition-all duration-[250ms]" elevation="3">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gaming-primary/10 rounded-2xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-gaming-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-gaming-gradient" data-testid="contact-form-title">
                  Send us a Message
                </h2>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="rounded-2xl" 
                            data-testid="input-name"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            className="rounded-2xl"
                            data-testid="input-email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-2xl" data-testid="select-subject">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                            <SelectItem value="Bug Report">Bug Report</SelectItem>
                            <SelectItem value="Feature Request">Feature Request</SelectItem>
                            <SelectItem value="Partnership">Partnership</SelectItem>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={6} 
                            placeholder="Tell us how we can help you..." 
                            className="rounded-2xl resize-none"
                            data-testid="textarea-message"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    variant="gaming"
                    className="w-full py-4 rounded-3xl font-display font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                        <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-xl border-2 border-border/50 hover:border-gaming-primary/30 transition-all duration-[250ms] hover:shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-display font-bold mb-6 text-gaming-gradient" data-testid="contact-info-title">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3" data-testid="contact-email">
                    <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">support@dapsigames.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3" data-testid="contact-response-time">
                    <div className="w-10 h-10 bg-secondary/10 rounded-2xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3" data-testid="contact-global-support">
                    <div className="w-10 h-10 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Global Support</p>
                      <p className="text-muted-foreground">Available worldwide</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-2 border-border/50 hover:border-gaming-primary/30 transition-all duration-[250ms] hover:shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-display font-bold mb-6 text-gaming-gradient" data-testid="social-media-title">
                  Follow Us
                </h3>
                <div className="flex space-x-4" data-testid="social-media-links">
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-testid="social-twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center hover:bg-secondary hover:text-primary-foreground transition-colors"
                    data-testid="social-facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-testid="social-instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-testid="social-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gaming-primary text-white shadow-2xl border-2 border-gaming-primary/30 hover:shadow-3xl transition-all duration-[250ms] hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                  <h3 className="text-xl font-display font-bold" data-testid="join-community-title">
                    Join Our Community
                  </h3>
                </div>
                <p className="mb-6 text-white/90 leading-relaxed" data-testid="join-community-description">
                  Stay updated with new games, features, and educational content. Join thousands of learners worldwide!
                </p>
                <Link href="/signup">
                  <Button 
                    variant="secondary" 
                    className="bg-white text-gaming-primary font-display font-bold hover:bg-white/90 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    data-testid="button-join-now"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
