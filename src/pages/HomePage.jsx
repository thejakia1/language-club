import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectFeaturedCourses } from "../features/courses/coursesSlice"
import { Search, BookOpen, Star, ArrowRight, GraduationCap } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"

const languages = [
  { name: "Spanish", flag: "🇪🇸", learners: "12,400+", code: "Spanish", bg: "from-amber-50 to-orange-100/80", border: "border-orange-200", accent: "text-orange-600" },
  { name: "French", flag: "🇫🇷", learners: "9,800+", code: "French", bg: "from-sky-50 to-blue-100/80", border: "border-blue-200", accent: "text-blue-600" },
  { name: "German", flag: "🇩🇪", learners: "8,100+", code: "German", bg: "from-yellow-50 to-amber-100/80", border: "border-amber-200", accent: "text-amber-700" },
  { name: "English", flag: "🇬🇧", learners: "18,600+", code: "English", bg: "from-indigo-50 to-violet-100/80", border: "border-violet-200", accent: "text-violet-600" },
  { name: "Chinese", flag: "🇨🇳", learners: "6,900+", code: "Chinese", bg: "from-red-50 to-rose-100/80", border: "border-red-200", accent: "text-red-600" },
  { name: "Japanese", flag: "🇯🇵", learners: "7,200+", code: "Japanese", bg: "from-rose-50 to-pink-100/80", border: "border-rose-200", accent: "text-rose-600" },
  { name: "Arabic", flag: "🇸🇦", learners: "5,600+", code: "Arabic", bg: "from-emerald-50 to-teal-100/80", border: "border-emerald-200", accent: "text-emerald-600" },
]

const stats = [
  { value: "55,000+", label: "Active learners" },
  { value: "200+", label: "Courses" },
  { value: "4.8★", label: "Avg rating" },
  { value: "7", label: "Languages" },
]

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse",
    description: "Explore courses filtered by language, level, format, and schedule to find what fits your life.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Pick",
    description: "Compare instructors, read real reviews, and enroll with confidence.",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Learn",
    description: "Attend live or recorded sessions and keep practicing between them whenever you have time.",
  },
]

const aiFeatures = [
  {
    emoji: "💬",
    title: "Conversation Practice",
    desc: "AI plays a native speaker. You respond. It corrects grammar and vocab inline, naturally.",
  },
  {
    emoji: "✍️",
    title: "Writing Feedback",
    desc: "Paste a paragraph in your target language. Get back corrections with notes per change.",
  },
  {
    emoji: "🎯",
    title: "Course Match",
    desc: "Describe your goals in plain text. AI reads the catalog and recommends the right course.",
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${
            s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          }`}
        />
      ))}
      <span className="text-xs font-medium ml-1">{rating}</span>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl">{course.flag}</span>
          <Badge variant="secondary" className="text-xs font-medium">
            {course.level}
          </Badge>
        </div>

        <h3 className="font-semibold text-base leading-snug mb-1.5 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">{course.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {course.format}
          </Badge>
        </div>

        <StarRating rating={course.rating} />
        <span className="text-xs text-muted-foreground mt-1">({course.reviewCount} reviews)</span>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-xl font-bold">${course.price}</span>
          <Button size="sm" variant="outline" asChild>
            <Link to={`/course/${course.id}`}>View Course</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const featuredCourses = useAppSelector(selectFeaturedCourses)

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/browse?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
              Find your perfect<br />
              <span className="text-primary">language course</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Curated courses from expert instructors — and an AI tutor to help you practice between sessions.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by language or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-12"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6 font-semibold">
                Search
              </Button>
            </form>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-t pt-10">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Language tiles */}
      <section className="border-t py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-2">Choose your language</h2>
            <p className="text-muted-foreground">Join thousands of learners already making progress</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <Link
                key={lang.name}
                to={`/browse?language=${lang.code}`}
                className={`group bg-gradient-to-br ${lang.bg} border ${lang.border} rounded-2xl p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
              >
                <div className="text-5xl mb-3">{lang.flag}</div>
                <div className="text-base font-semibold">{lang.name}</div>
                <div className={`text-xs font-medium mt-1 ${lang.accent}`}>{lang.learners} learners</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold mb-2">How it works</h2>
            <p className="text-muted-foreground">Three steps to speaking with confidence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="text-center">
                  <div className="inline-flex flex-col items-center mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary tracking-widest">STEP {step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="border-t py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-semibold mb-1">Featured courses</h2>
              <p className="text-muted-foreground">Handpicked for quality and student impact</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse" className="flex items-center gap-2">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* AI teaser */}
      <section className="py-24 bg-[hsl(24,10%,10%)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">
              Practice Tutor
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight text-white">
              Practice whenever<br />it clicks
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Conversations, writing feedback, and course recommendations — all grounded in what you're actually learning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
              {aiFeatures.map((item) => (
                <div
                  key={item.title}
                  className="border border-white/10 bg-white/5 rounded-xl p-5 hover:border-white/20 hover:bg-white/10 transition-colors"
                >
                  <div className="text-2xl mb-3">{item.emoji}</div>
                  <div className="font-semibold text-sm mb-1.5 text-white">{item.title}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="font-semibold px-8 bg-white text-[hsl(24,10%,10%)] hover:bg-white/90"
              asChild
            >
              <Link to="/ai/request">Start practicing free</Link>
            </Button>
            <p className="text-xs text-white/40 mt-4">
              Free to get started. No credit card needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}