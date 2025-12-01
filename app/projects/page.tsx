"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import Link from "next/link"

const FACULTIES = [
  "All Faculties",
  "Engineering, Design and Technology",
  "Health Sciences",
  "Business and Administration",
  "Education",
  "Law",
  "Theology",
]

const YEARS = ["All Years", "2024", "2023", "2022", "2021", "2020"]

const CATEGORIES = [
  "All Categories",
  "Mobile App",
  "Web Platform",
  "IoT",
  "AI/ML",
  "Healthcare",
  "Education",
  "E-Commerce",
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("All Faculties")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchQuery, selectedFaculty, selectedYear, selectedCategory, projects])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
        setFilteredProjects(data.projects || [])
      }
    } catch (error) {
      console.error("[v0] Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...projects]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies?.some((tech: string) => tech.toLowerCase().includes(query)),
      )
    }

    // Faculty filter
    if (selectedFaculty !== "All Faculties") {
      filtered = filtered.filter((project) => project.faculty === selectedFaculty)
    }

    // Year filter
    if (selectedYear !== "All Years") {
      filtered = filtered.filter((project) => project.year === Number.parseInt(selectedYear))
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    setFilteredProjects(filtered)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedFaculty("All Faculties")
    setSelectedYear("All Years")
    setSelectedCategory("All Categories")
  }

  const hasActiveFilters =
    searchQuery ||
    selectedFaculty !== "All Faculties" ||
    selectedYear !== "All Years" ||
    selectedCategory !== "All Categories"

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Gallery</h1>
          <p className="text-xl text-primary-foreground/90">
            Explore innovative projects from UCU students across all faculties
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, technologies, or keywords..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Controls */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Faculty</label>
                  <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FACULTIES.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1">
                        Search: {searchQuery}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                      </Badge>
                    )}
                    {selectedFaculty !== "All Faculties" && (
                      <Badge variant="secondary" className="gap-1">
                        {selectedFaculty}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedFaculty("All Faculties")} />
                      </Badge>
                    )}
                    {selectedYear !== "All Years" && (
                      <Badge variant="secondary" className="gap-1">
                        {selectedYear}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedYear("All Years")} />
                      </Badge>
                    )}
                    {selectedCategory !== "All Categories" && (
                      <Badge variant="secondary" className="gap-1">
                        {selectedCategory}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All Categories")} />
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="whitespace-nowrap">
                    Clear All
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{project.faculty}</Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies?.slice(0, 3).map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href={`/projects/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
