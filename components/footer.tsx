import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">UCU Innovators Hub</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Complete Education for A Complete Person. Founded by the Province of the Church of Uganda.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-foreground transition-colors">
                  Submit Project
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/guidelines" className="hover:text-foreground transition-colors">
                  Submission Guidelines
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="https://ucu.ac.ug" className="hover:text-foreground transition-colors" target="_blank">
                  UCU Website
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Uganda Christian University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
