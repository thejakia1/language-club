import { Link } from "react-router-dom"
import { Globe } from "lucide-react"
import { useState, useEffect } from "react"

function LiveClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span>
      {time.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      })}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Fluento</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-4">
              A place to find language courses from real instructors — and keep practicing between sessions with a tutor that's always there.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/browse" className="hover:text-foreground transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/ai" className="hover:text-foreground transition-colors">
                  Practice Tutor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Account</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/login" className="hover:text-foreground transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-foreground transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Fluento — a portfolio project by Jakia A.</span>
          <LiveClock />
        </div>
      </div>
    </footer>
  )
}
