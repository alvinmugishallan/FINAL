import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>UCU Innovators</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/projects" className="text-sm font-medium hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
