"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, Users, TrendingUp, Award } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const COLORS = ["#1a5632", "#e67e22", "#3498db", "#9b59b6", "#e74c3c", "#95a5a6"]

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)

    if (parsedUser.role !== "admin") {
      router.push("/dashboard/student")
      return
    }

    setUser(parsedUser)
    fetchAnalytics(token)
  }, [router])

  const fetchAnalytics = async (token: string) => {
    try {
      const response = await fetch("/api/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user || loading) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-foreground/90 mt-1">Analytics and insights for UCU Innovators Hub</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-3xl font-bold">{analytics?.overview.totalProjects}</p>
                </div>
                <FileText className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold">{analytics?.overview.pendingReview}</p>
                </div>
                <Clock className="h-10 w-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold">{analytics?.overview.approvedProjects}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{analytics?.overview.totalStudents}</p>
                </div>
                <Users className="h-10 w-10 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Projects by Faculty */}
          <Card>
            <CardHeader>
              <CardTitle>Projects by Faculty</CardTitle>
              <CardDescription>Distribution across faculties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.projectsByFaculty}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="faculty" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1a5632" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Projects by Year */}
          <Card>
            <CardHeader>
              <CardTitle>Projects Over Time</CardTitle>
              <CardDescription>Yearly submission trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.projectsByYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#1a5632"
                    strokeWidth={2}
                    dot={{ fill: "#1a5632", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second Row of Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Faculty Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Faculty Distribution</CardTitle>
              <CardDescription>Percentage breakdown by faculty</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.projectsByFaculty}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ faculty, percentage }) => `${faculty.split(" ")[0]}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics?.projectsByFaculty.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Approval Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Approval Rates</CardTitle>
              <CardDescription>Monthly review outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.approvalRates}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" fill="#10b981" name="Approved" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trending Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Technologies
              </CardTitle>
              <CardDescription>Most used technologies and their trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.trendingTechnologies.slice(0, 6).map((tech: any) => (
                  <div key={tech.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="font-medium">{tech.name}</span>
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-[200px]">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${(tech.count / 82) * 100}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{tech.count}</span>
                      <Badge variant={tech.trend > 0 ? "default" : "secondary"} className="text-xs">
                        {tech.trend > 0 ? "+" : ""}
                        {tech.trend}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Innovators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Innovators
              </CardTitle>
              <CardDescription>Students with most projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.topInnovators.map((innovator: any, index: number) => (
                  <div key={innovator.name} className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{innovator.name}</p>
                      <p className="text-sm text-muted-foreground">{innovator.faculty}</p>
                    </div>
                    <Badge variant="secondary">
                      {innovator.projects} {innovator.projects === 1 ? "project" : "projects"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
