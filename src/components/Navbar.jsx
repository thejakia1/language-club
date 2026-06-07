import { useState } from "react"
import { Link } from "react-router-dom"
import { Globe, Menu, X } from "lucide-react"
import { Button } from "./ui/button"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-display">Fluento</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/browse"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            to="/ai"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Practice Tutor
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Sign Up Free</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background/98">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/browse"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              to="/ai"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted transition-colors"
            >
              Practice Tutor
            </Link>
            <div className="pt-3 mt-2 border-t flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1" asChild>
                <Link to="/login" onClick={() => setOpen(false)}>Log In</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link to="/signup" onClick={() => setOpen(false)}>Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
