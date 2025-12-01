"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SubmitProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    faculty: "",
    department: "",
    year: new Date().getFullYear(),
    technologies: "",
    githubLink: "",
    liveDemoLink: "",
    documentUrl: "",
    teamMembers: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(",").map((t) => t.trim()),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to submit project")
        return
      }

      router.push("/dashboard/student")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center text-primary-foreground/90 hover:text-primary-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Submit New Project</h1>
          <p className="text-primary-foreground/90 mt-1">Share your innovation with the UCU community</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Fill in the information about your project. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-200">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Smart Agriculture Monitoring System"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed description of your project..."
                  rows={5}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Mobile App, Web Platform, IoT"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty">Faculty *</Label>
                  <Select
                    value={formData.faculty}
                    onValueChange={(value) => setFormData({ ...formData, faculty: value })}
                  >
                    <SelectTrigger id="faculty">
                      <SelectValue placeholder="Select faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering, Design and Technology">
                        Engineering, Design and Technology
                      </SelectItem>
                      <SelectItem value="Health Sciences">Health Sciences</SelectItem>
                      <SelectItem value="Business and Administration">Business and Administration</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Law">Law</SelectItem>
                      <SelectItem value="Theology">Theology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used *</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                  required
                />
                <p className="text-sm text-muted-foreground">Separate multiple technologies with commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Repository Link</Label>
                <Input
                  id="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  placeholder="https://github.com/username/repository"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveDemoLink">Live Demo Link</Label>
                <Input
                  id="liveDemoLink"
                  type="url"
                  value={formData.liveDemoLink}
                  onChange={(e) => setFormData({ ...formData, liveDemoLink: e.target.value })}
                  placeholder="https://your-demo-site.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentUrl">Project Document (PDF URL)</Label>
                <Input
                  id="documentUrl"
                  type="url"
                  value={formData.documentUrl}
                  onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                  placeholder="https://your-document-url.com/project.pdf"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamMembers">Team Members</Label>
                <Textarea
                  id="teamMembers"
                  value={formData.teamMembers}
                  onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                  placeholder="List team member names (one per line)"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Submitting..." : "Submit Project"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/student">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
