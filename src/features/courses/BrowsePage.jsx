import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setFilter,
  setSearch,
  setSort,
  resetFilters,
  selectFilteredCourses,
  selectSearch,
  selectSort,
  selectFilters,
} from "./coursesSlice"
import CourseCard from "./CourseCard"
import Filters from "./Filters"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "newest", label: "Newest" },
]

export default function BrowsePage() {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const courses = useAppSelector(selectFilteredCourses)
  const search = useAppSelector(selectSearch)
  const sort = useAppSelector(selectSort)
  const filters = useAppSelector(selectFilters)

  useEffect(() => {
    dispatch(resetFilters())
    const lang = searchParams.get("language")
    const q = searchParams.get("q")
    if (lang) dispatch(setFilter({ key: "language", value: lang }))
    if (q) dispatch(setSearch(q))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeFilterCount = [
    filters.language,
    filters.level,
    filters.format,
    filters.schedule,
    filters.priceRange[1] < 500 ? "price" : "",
  ].filter(Boolean).length

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Browse Courses</h1>
          <p className="text-muted-foreground text-sm">
            {courses.length} {courses.length === 1 ? "course" : "courses"} available
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Search + sort toolbar */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="pl-9"
            />
          </div>

          <Select value={sort} onValueChange={(v) => dispatch(setSort(v))}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters((v) => !v)}
            className="lg:hidden gap-1.5"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile filter panel */}
        {showMobileFilters && (
          <div className="lg:hidden mb-6 rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-end mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
                className="h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Filters />
          </div>
        )}

        {/* Main layout */}
        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24">
              <Filters />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-semibold text-lg mb-2">No courses found</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <Button variant="link" className="p-0 h-auto" onClick={() => dispatch(resetFilters())}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
