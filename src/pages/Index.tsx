import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CheckCircle, Zap, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-math.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Scan Math Problems,
                  <span className="text-primary"> Get Instant Feedback</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Upload a photo of math problems and get AI-powered corrections and explanations in seconds. Perfect for students, teachers, and parents.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-3">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Scanning
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Math problems being scanned and analyzed"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose MathScan AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered math scanner makes learning and teaching math more efficient and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-0 bg-card/50 hover:bg-card transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Results</h3>
              <p className="text-muted-foreground">
                Get feedback on math problems in under 10 seconds. No waiting, no hassle.
              </p>
            </Card>
            
            <Card className="p-8 text-center border-0 bg-card/50 hover:bg-card transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">High Accuracy</h3>
              <p className="text-muted-foreground">
                80%+ accuracy for K-12 math problems including arithmetic, algebra, and geometry.
              </p>
            </Card>
            
            <Card className="p-8 text-center border-0 bg-card/50 hover:bg-card transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Learn & Improve</h3>
              <p className="text-muted-foreground">
                Get detailed explanations for wrong answers to understand and learn from mistakes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Ready to Transform Your Math Learning?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students and teachers who are already using MathScan AI to make math easier.
            </p>
            <Button size="lg" className="text-lg px-12 py-4">
              <Camera className="mr-2 h-6 w-6" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
