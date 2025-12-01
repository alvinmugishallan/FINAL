"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Github, ExternalLink, FileText, Calendar, Users, Award } from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data.project)
      } else {
        router.push("/projects")
      }
    } catch (error) {
      console.error("[v0] Failed to fetch project:", error)
      router.push("/projects")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center text-primary-foreground/90 hover:text-primary-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-3">
                {project.faculty}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{project.title}</h1>
              <p className="text-lg text-primary-foreground/90">{project.department}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.category && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Category</h3>
                      <Badge>{project.category}</Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Links Section */}
            {(project.githubLink || project.liveDemoLink || project.documentUrl) && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Resources</CardTitle>
                  <CardDescription>Access the code, demo, and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.githubLink && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                        <ExternalLink className="ml-auto h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.liveDemoLink && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                        <ExternalLink className="ml-auto h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.documentUrl && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={project.documentUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        Project Documentation
                        <ExternalLink className="ml-auto h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Year</p>
                    <p className="text-muted-foreground">{project.year}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Status</p>
                    <Badge
                      variant={
                        project.status === "approved"
                          ? "default"
                          : project.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className="mt-1"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Department</p>
                    <p className="text-muted-foreground">{project.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                  }}
                >
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
