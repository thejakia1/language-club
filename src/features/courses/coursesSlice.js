import { createSlice, createSelector } from "@reduxjs/toolkit"
import courses from "./data/courses.json"

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: courses,
    filters: {
      language: "",
      level: "",
      format: "",
      priceRange: [0, 500],
      schedule: "",
    },
    search: "",
    sort: "popular",
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload
      state.filters[key] = value
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    resetFilters(state) {
      state.filters = {
        language: "",
        level: "",
        format: "",
        priceRange: [0, 500],
        schedule: "",
      }
      state.search = ""
    },
  },
})

export const { setFilter, setSearch, setSort, resetFilters } = coursesSlice.actions

const selectItems = (state) => state.courses.items
const selectFilters = (state) => state.courses.filters
const selectSearch = (state) => state.courses.search
const selectSort = (state) => state.courses.sort

export { selectFilters, selectSearch, selectSort }

export const selectAllCourses = selectItems

export const selectFeaturedCourses = createSelector(
  selectItems,
  (items) => items.filter((c) => c.featured)
)

export const selectFilteredCourses = createSelector(
  selectItems,
  selectFilters,
  selectSearch,
  selectSort,
  (items, filters, search, sort) => {
    let result = items

    if (filters.language) result = result.filter((c) => c.language === filters.language)
    if (filters.level) result = result.filter((c) => c.level === filters.level)
    if (filters.format) result = result.filter((c) => c.format === filters.format)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) => c.title.toLowerCase().includes(q) || c.language.toLowerCase().includes(q)
      )
    }
    result = result.filter(
      (c) => c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1]
    )
    if (filters.schedule === "self-paced") result = result.filter((c) => c.schedule.days.length === 0)
    else if (filters.schedule === "weekdays")
      result = result.filter((c) => c.schedule.days.some((d) => ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(d)))
    else if (filters.schedule === "weekends")
      result = result.filter((c) => c.schedule.days.some((d) => ["Sat", "Sun"].includes(d)))

    if (sort === "popular") return [...result].sort((a, b) => b.reviewCount - a.reviewCount)
    if (sort === "price-asc") return [...result].sort((a, b) => a.price - b.price)
    if (sort === "newest") return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return result
  }
)

export default coursesSlice.reducer
