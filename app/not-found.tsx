import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>The page you're looking for doesn't exist or has been moved.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-6xl font-bold text-muted-foreground/20">404</div>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">Browse Projects</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
