"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"

// Mock projects for supervisor review
const mockPendingProjects = [
  {
    id: 4,
    title: "AI-Powered Student Assessment Tool",
    description: "Machine learning system for automated grading and feedback generation.",
    faculty: "Education",
    department: "Educational Technology",
    technologies: ["Python", "TensorFlow", "Flask"],
    submittedBy: "David Miller",
    submittedAt: "2024-01-20",
  },
  {
    id: 5,
    title: "Community Health Tracker",
    description: "Mobile app for tracking community health metrics and disease prevention.",
    faculty: "Health Sciences",
    department: "Public Health",
    technologies: ["React Native", "Node.js", "MongoDB"],
    submittedBy: "Emma Davis",
    submittedAt: "2024-01-22",
  },
]

export default function SupervisorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [pendingProjects, setPendingProjects] = useState(mockPendingProjects)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)

    if (parsedUser.role !== "supervisor") {
      router.push("/dashboard/student")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleApprove = (projectId: number) => {
    setPendingProjects((prev) => prev.filter((p) => p.id !== projectId))
    // In production, call API to approve project
  }

  const handleReject = (projectId: number) => {
    setPendingProjects((prev) => prev.filter((p) => p.id !== projectId))
    // In production, call API to reject project
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
              <p className="text-primary-foreground/90 mt-1">Review and manage student project submissions</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold">{pendingProjects.length}</p>
                </div>
                <Clock className="h-10 w-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reviewed</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <FileText className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold">22</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Project Reviews</CardTitle>
            <CardDescription>Review student project submissions and provide feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending ({pendingProjects.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No pending projects</p>
                  </div>
                ) : (
                  pendingProjects.map((project) => (
                    <Card key={project.id} className="border-2">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg">{project.title}</h3>
                              <Badge variant="secondary">Pending</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Faculty:</span>
                              <p className="font-medium">{project.faculty}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Department:</span>
                              <p className="font-medium">{project.department}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Submitted by:</span>
                              <p className="font-medium">{project.submittedBy}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Submitted on:</span>
                              <p className="font-medium">{new Date(project.submittedAt).toLocaleDateString()}</p>
                            </div>
                          </div>

                          <div>
                            <span className="text-sm text-muted-foreground">Technologies:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <Button className="flex-1" onClick={() => handleApprove(project.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                            <Button variant="destructive" className="flex-1" onClick={() => handleReject(project.id)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                            <Button variant="outline">View Details</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="approved" className="mt-6">
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <p className="text-muted-foreground">Approved projects will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                <div className="text-center py-12">
                  <XCircle className="h-12 w-12 mx-auto text-red-600 mb-4" />
                  <p className="text-muted-foreground">Rejected projects will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
