import { Link } from "react-router-dom"
import { Star, Clock } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-3.5 w-3.5 ${
              s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{rating}</span>
      <span className="text-xs text-muted-foreground">({count.toLocaleString()})</span>
    </div>
  )
}

export default function CourseCard({ course }) {
  const minPrice = Math.min(...course.packages.map((p) => p.price))

  return (
    <Link to={`/course/${course.id}`} className="group block h-full">
      <Card className="h-full flex flex-col hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl leading-none">{course.flag}</span>
            <Badge variant="secondary" className="text-xs font-medium shrink-0">
              {course.level}
            </Badge>
          </div>

          <h3 className="font-semibold text-sm leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-muted-foreground mb-3 line-clamp-1 flex-1">
            {course.instructor.name}
          </p>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="outline" className="text-xs">{course.format}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {course.sessionCount} sessions
            </div>
          </div>

          <StarRating rating={course.rating} count={course.reviewCount} />

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div>
              <span className="text-xs text-muted-foreground">From </span>
              <span className="text-lg font-bold">${minPrice}</span>
            </div>
            <Button size="sm" variant="outline" className="text-xs h-8 px-3 pointer-events-none">
              View Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
