import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Users, TrendingUp, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="font-bold text-5xl md:text-6xl mb-6 leading-tight text-balance">UCU Innovators Hub</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              A centralized platform to showcase student innovations, research projects, and prototypes from Uganda
              Christian University.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/projects">
                  Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/auth/login">Submit Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Projects Showcased</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8</div>
              <div className="text-muted-foreground">Faculties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Student Innovators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Approval Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Empowering Innovation at UCU</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            The platform for rapid progress. Let students focus on innovation while we handle the showcase
            infrastructure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Project Repository</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Comprehensive digital library of student innovations, research, and prototypes accessible to everyone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tools for students, supervisors, and stakeholders to share feedback and iterate faster.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Real-time insights into project submissions, trending technologies, and faculty contributions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Recognition</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Showcase your work to the university community, investors, and potential collaborators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to showcase your innovation?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join hundreds of UCU students sharing their groundbreaking projects and research.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
