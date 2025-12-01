import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Target, Users, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About UCU Innovators Hub</h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            Empowering student innovation through a centralized platform for showcasing research and creative work
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide a comprehensive digital platform that showcases student innovations, promotes collaboration,
                and connects innovators with opportunities across Uganda Christian University.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading university innovation repository in Uganda, inspiring creativity and
                entrepreneurship among students while making their work accessible to the global community.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Why UCU Innovators Hub?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Showcase Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  Provide students with a professional platform to showcase their academic and creative achievements
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Foster Collaboration</h3>
                <p className="text-muted-foreground text-sm">
                  Connect students across faculties and create opportunities for interdisciplinary collaboration
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Drive Innovation</h3>
                <p className="text-muted-foreground text-sm">
                  Inspire future innovations by making past projects easily accessible and searchable
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">About Uganda Christian University</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Uganda Christian University (UCU) is a private university in Uganda that offers undergraduate and
              postgraduate programs in various fields. Founded by the Province of the Church of Uganda, UCU is committed
              to providing a complete education for a complete person.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The UCU Innovators Hub aligns with the university's mission to foster academic excellence, innovation, and
              the practical application of knowledge to address real-world challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
