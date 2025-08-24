import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-headline font-bold text-foreground">
            Wall Pilates Quiz
          </h1>
          <nav>
            {/* Future navigation links can go here */}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-in fade-in duration-700">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold tracking-tight">
                Discover Your Inner Strength with Wall Pilates
              </h2>
              <p className="text-lg text-foreground/80">
                Ready to explore the benefits of wall pilates? Take our interactive quiz to find the perfect routine for your body and goals. It's quick, easy, and tailored just for you.
              </p>
              <Link href="/quiz" passHref>
                <Button size="lg" className="text-lg py-7 px-8 shadow-lg hover:shadow-xl transition-shadow">
                  Start the Quiz
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://placehold.co/400x500.png"
                alt="Woman doing wall pilates"
                width={400}
                height={500}
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                data-ai-hint="pilates yoga"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-card py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h3 className="text-3xl sm:text-4xl font-headline font-bold">Why Take the Quiz?</h3>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                Our quiz is designed to understand your unique needs and guide you to a more balanced and stronger you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="Personalized Routines"
                description="Get workout plans that are tailored to your fitness level, goals, and available time."
              />
              <FeatureCard
                icon={<Dumbbell className="h-10 w-10 text-primary" />}
                title="Improve Strength & Flexibility"
                description="Discover exercises that target key muscle groups, enhance your flexibility, and improve posture."
              />
              <FeatureCard
                icon={<Leaf className="h-10 w-10 text-primary" />}
                title="Mindful Movement"
                description="Connect your mind and body with routines that promote wellness, reduce stress, and boost energy."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-foreground/60">
        <p>&copy; {new Date().getFullYear()} Wall Pilates Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string; }) {
  return (
    <Card className="text-center p-6 border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-background">
      <CardHeader className="items-center p-4">
        <div className="bg-primary/10 p-4 rounded-full">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{description}</p>
      </CardContent>
    </Card>
  );
}
