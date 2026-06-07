import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setFilter, resetFilters, selectFilters } from "./coursesSlice"
import { cn } from "../../lib/utils"

const LANGUAGES = ["Spanish", "French", "Japanese", "Arabic", "German", "English", "Chinese"]
const LEVELS = ["Beginner", "Intermediate", "Advanced"]
const FORMATS = ["Live", "Recorded", "Live + Recorded"]
const SCHEDULES = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "self-paced", label: "Self-paced" },
]

function FilterSection({ label, children }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
        {label}
      </p>
      {children}
    </div>
  )
}

function PillGroup({ options, active, onToggle }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const value = typeof opt === "string" ? opt : opt.value
        const label = typeof opt === "string" ? opt : opt.label
        const isActive = active === value
        return (
          <button
            key={value}
            onClick={() => onToggle(isActive ? "" : value)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default function Filters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)

  function handleFilter(key, value) {
    dispatch(setFilter({ key, value }))
  }

  const hasActiveFilters =
    filters.language ||
    filters.level ||
    filters.format ||
    filters.schedule ||
    filters.priceRange[1] < 500

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">Filters</p>
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-xs text-primary hover:underline"
          >
            Reset all
          </button>
        )}
      </div>

      <FilterSection label="Language">
        <PillGroup
          options={LANGUAGES}
          active={filters.language}
          onToggle={(v) => handleFilter("language", v)}
        />
      </FilterSection>

      <FilterSection label="Level">
        <PillGroup
          options={LEVELS}
          active={filters.level}
          onToggle={(v) => handleFilter("level", v)}
        />
      </FilterSection>

      <FilterSection label="Format">
        <PillGroup
          options={FORMATS}
          active={filters.format}
          onToggle={(v) => handleFilter("format", v)}
        />
      </FilterSection>

      <FilterSection label="Schedule">
        <PillGroup
          options={SCHEDULES}
          active={filters.schedule}
          onToggle={(v) => handleFilter("schedule", v)}
        />
      </FilterSection>

      <FilterSection label={`Max price — $${filters.priceRange[1]}`}>
        <input
          type="range"
          min="0"
          max="500"
          step="25"
          value={filters.priceRange[1]}
          onChange={(e) =>
            handleFilter("priceRange", [0, parseInt(e.target.value)])
          }
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>$0</span>
          <span>$500</span>
        </div>
      </FilterSection>
    </div>
  )
}
