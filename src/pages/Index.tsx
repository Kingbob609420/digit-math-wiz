import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CheckCircle, Zap, BookOpen, Menu } from "lucide-react";
import heroImage from "@/assets/hero-math.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary text-foreground">
      {/* Navigation */}
      <nav className="relative z-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-foreground">
              MathScan AI
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-8">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Elevate Your Math Learning
                <br />
                <span className="text-primary">with AI-Driven Accuracy</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Scan math problems instantly and get AI-powered corrections with detailed explanations. 
                Perfect for students, teachers, and parents seeking efficient math assistance.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="pt-8">
              <Button size="lg" className="text-lg px-12 py-4 bg-primary hover:bg-primary/90 shadow-glow">
                <Camera className="mr-3 h-6 w-6" />
                Start Scanning Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Dashboard Mockup */}
        <div className="relative mt-20 px-4">
          <div className="container mx-auto">
            <div className="relative max-w-5xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-elegant bg-gradient-secondary backdrop-blur-sm border border-border/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <img 
                  src={heroImage} 
                  alt="Math scanning interface showing problem recognition and AI feedback"
                  className="w-full h-auto relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-20"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 hidden lg:block">
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/20 shadow-elegant">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">95% Accuracy</span>
                  </div>
                </Card>
              </div>
              
              <div className="absolute -bottom-6 -right-6 hidden lg:block">
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/20 shadow-elegant">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Instant Results</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Why Choose MathScan AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of math learning with our cutting-edge AI technology 
              that makes problem-solving faster and more accurate than ever.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/70 transition-all duration-300 hover:shadow-glow">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Instant Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get feedback on math problems in under 10 seconds. 
                No waiting, no hassle, just immediate AI-powered analysis.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/70 transition-all duration-300 hover:shadow-glow">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">High Accuracy</h3>
              <p className="text-muted-foreground leading-relaxed">
                95%+ accuracy for K-12 math problems including arithmetic, 
                algebra, geometry, and more advanced topics.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/70 transition-all duration-300 hover:shadow-glow">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Learn & Improve</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get detailed step-by-step explanations for wrong answers 
                to understand concepts and learn from mistakes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-secondary"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground">
              Ready to Transform Your Math Experience?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students and teachers who are already using MathScan AI 
              to make math learning more efficient and effective.
            </p>
            <div className="pt-4">
              <Button size="lg" className="text-lg px-12 py-4 bg-primary hover:bg-primary/90 shadow-glow">
                <Camera className="mr-3 h-6 w-6" />
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
