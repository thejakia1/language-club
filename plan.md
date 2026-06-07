# Fluento — Engineering Plan

**What it is:** A language course discovery platform where users find and explore courses, and an AI tutor (OpenAI GPT-4o) helps them practice between sessions.

**What this project is for:** A portfolio piece. No real courses, instructors, or payments — realistic mock data throughout. AI features are real (live OpenAI streaming). The goal: show product thinking, clean UI, and meaningful AI integration.

---

## Engineering Principles

These apply to every line of code written in this project.

**1. Feature-first folder structure**
Code is organized by feature (`auth/`, `courses/`, `ai/`), not by type (`components/`, `services/`, `utils/`). Related code lives together. A new engineer should be able to find everything about a feature in one place.

**2. Redux Toolkit is the single source of truth**
All application state lives in the Redux store. `localStorage` is a persistence side-effect, not a data source. State is initialized from the store; `localStorage` is read once on startup to rehydrate it.

**3. Thin components**
Components render and dispatch. Business logic, derived data, and async operations live in slices and thunks — never in JSX. A component should be boring to read.

**4. No premature abstraction**
Write the component. Extract only when you need it a second time. Three similar lines beats a premature abstraction. Don't design for hypothetical future requirements.

**5. Explicit async states**
Every async operation has a `status` field: `'idle' | 'loading' | 'succeeded' | 'failed'` plus an `error` field. No boolean flags like `isLoading`. This is standard RTK pattern.

**6. Naming conventions**
- Booleans: `isX`, `hasX` (e.g., `isLoggedIn`, `hasAccess`)
- Event handlers: `handleX` (e.g., `handleSubmit`, `handleFilterChange`)
- Selectors: `selectX` (e.g., `selectUser`, `selectFilteredCourses`)
- Slice files export the slice default and named selectors/thunks

**7. Selectors live in their slice**
`selectUser`, `selectFilteredCourses`, `selectAIAccessStatus` — all defined in their slice file with `createSelector` where memoization matters. No selector logic in components.

**8. No comments explaining what the code does**
Name things well. Write a comment only when the *why* is non-obvious — a constraint, a workaround, an invariant. Never narrate the code.

**9. Validate at boundaries only**
Validate user input and API responses. Trust internal Redux state and typed data. No defensive checks on things that can't be null.

**10. Colocation**
A slice's selectors live in the slice file. Component-specific hooks live next to the component. Only extract to `hooks/` or `components/ui/` when shared across features.

---

## User Journey

```
Homepage → Browse Courses → Course Detail → Sign Up → Dashboard → Request AI Access → AI Tutor
```

---

## State Architecture

Three Redux slices. Each slice owns its domain completely.

### `authSlice`
```
{
  user: null | { id, name, email, language },
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null | string
}
```
Persisted to `localStorage` on change. Rehydrated on app init via store preloaded state.

### `coursesSlice`
```
{
  items: Course[],          // loaded once from local JSON
  filters: {
    language: '',
    level: '',
    format: '',
    priceRange: [0, 500],
    schedule: ''
  },
  search: '',
  sort: 'popular'           // 'popular' | 'price-asc' | 'newest'
}
```
Not persisted. Loaded from `courses.json` synchronously on app start.

### `aiSlice`
```
{
  accessStatus: 'idle' | 'requested' | 'granted',
  mode: 'conversation' | 'writing' | 'match',
  language: 'es',
  messages: Message[],      // { role: 'user'|'assistant', content: string }
  streamingContent: '',     // partial response while streaming
  status: 'idle' | 'loading' | 'failed',
  error: null | string
}
```
`accessStatus` persisted to `localStorage`. Messages are session-only (cleared on reset).

---

## Folder Structure

```
src/
  app/
    store.js              # configureStore, preloaded state from localStorage
    hooks.js              # typed useAppDispatch, useAppSelector
  features/
    auth/
      authSlice.js        # reducers, thunks (login, register, logout), selectors
      LoginPage.jsx
      SignUpPage.jsx
      ProtectedRoute.jsx
    courses/
      coursesSlice.js     # reducers, selectors (selectFilteredCourses uses createSelector)
      data/
        courses.json      # mock course catalog
      BrowsePage.jsx
      CourseDetailPage.jsx
      CourseCard.jsx
      Filters.jsx
    ai/
      aiSlice.js          # reducers, streamMessage thunk (SSE), selectors
      aiService.js        # raw OpenAI fetch call — returns a ReadableStream
      AITutorPage.jsx
      AccessRequestPage.jsx
      ChatWindow.jsx
      ModeSelector.jsx
    dashboard/
      DashboardPage.jsx
      EnrolledCourseCard.jsx
    profile/
      ProfilePage.jsx
  pages/
    HomePage.jsx
  components/
    Navbar.jsx
    Footer.jsx
    ui/                   # Button, Badge, Modal, Spinner — only if used 2+ places
  styles/
    index.css
```

---

## Pages & Features

### 1. Homepage
First impression. Answers "what is this" in under 5 seconds.

- Hero: headline, short description, search bar
- Language tiles: Spanish, French, Japanese, Arabic — each links to filtered browse
- How it works: 3 steps (Browse → Pick → Learn)
- AI teaser section with "Request Early Access" CTA — visible to all
- 3–4 featured course cards
- Footer

### 2. Browse Courses
Full catalog exploration.

- Course cards in a responsive grid: flag, title, level badge, format, price, star rating
- Filters: language, level, format, price range, schedule — all wired to `coursesSlice`
- Search input: filters by title/keyword
- Sort: Most Popular, Price Low→High, Newest
- Filter state lives in Redux (shareable, bookmarkable later)

### 3. Course Detail Page
Single course, full detail.

- Title, language, level, format, description
- What's included: session count, materials, certificate
- Instructor card (mock)
- Schedule: days, times, start date
- Price
- 3–4 mock student reviews
- Enroll button: dispatches enroll action → redirects to sign-up if not logged in

### 4. Auth — Sign Up & Log In
Simple. No backend. Simulated cleanly with Redux + localStorage.

**Sign Up:**
- Fields: name, email, password, language you want to learn
- On submit: dispatches `register` thunk → saves user to localStorage → auto-logs in → redirects to dashboard

**Log In:**
- Fields: email, password
- On submit: dispatches `login` thunk → validates against stored users → sets `user` in state → redirects

**Log Out:**
- Dispatches `logout` → clears `user` from state + localStorage session

**Protected routes:**
- `<ProtectedRoute>` wraps dashboard, profile, AI tutor — redirects to `/login` if `user` is null

No forgot password page. This is a portfolio demo — a dead-end UI-only flow adds noise, not value.

### 5. Student Dashboard
Logged-in home base.

- Enrolled courses with progress bars ("3 of 8 sessions")
- Upcoming session card
- Mock certificates with a download button
- AI access card at top: shows current status and CTA

### 6. User Profile
- Edit name, email, profile photo (avatar upload is UI-only — no real storage)
- Learning goal freeform text
- Notification toggle (UI-only)

---

## AI Feature — Fluento AI Tutor

The standout feature. Gated behind an access request to feel intentional.

### What the AI can do

**1. Conversation Practice**
Pick a language + topic (e.g., "Order food in Japanese"). AI plays a native speaker. User types back and forth. AI responds naturally and corrects grammar/vocabulary mistakes inline.

**2. Writing Feedback**
User types a paragraph in their target language. AI returns: what was good, what to improve, corrected version with short notes per change.

**3. Smart Course Match**
User describes their goals in plain text. AI reads the course catalog (injected as context) and recommends specific courses with a reason per pick.

### Access Request Flow

**Step 1 — Teaser (everyone sees this on homepage)**
"Meet Fluento AI" section with a short preview and "Request Early Access" CTA.

**Step 2 — Request Form**
Short form (modal or dedicated page):
- Name + email (pre-filled if logged in)
- Which language are you learning?
- What's your main goal? (freeform)
- Hours per week

Submit → confirmation state. `aiSlice.accessStatus` → `'requested'`. Saved to localStorage.

**Step 3 — Pending State**
On revisit: status card "Your access request is under review."

**Step 4 — Auto-Approval**
On next visit to AI section while status is `'requested'`: 5-second simulated delay, then `accessStatus` → `'granted'`. Smooth for demos.

**Step 5 — AI Tutor Interface**
- Mode selector: Conversation Practice / Writing Feedback / Course Match
- Language selector
- Chat window: user right, AI left
- Real streaming responses from OpenAI (GPT-4o) via `ReadableStream`
- `streamingContent` in Redux updated character-by-character, committed to `messages` on completion
- Reset button clears `messages`

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 | Already in place |
| Routing | React Router v6 | Standard, outlet-based layouts |
| Styling | Tailwind CSS | Fast, consistent, great for portfolios |
| State | Redux Toolkit | Single source of truth, devtools, scales cleanly |
| Persistence | localStorage | No backend needed — rehydrated into Redux on init |
| Course data | Local JSON | Mock catalog, loaded synchronously |
| AI | OpenAI API (GPT-4o) | Real integration, streaming via `ReadableStream` |
| Deployment | Vercel | Free, instant, great DX |

---

## Build Order

### Phase 1 — Foundation
- Install: React Router v6, Redux Toolkit, Tailwind CSS
- Configure store (`app/store.js`) with localStorage rehydration
- Set up routing shell: `App.js` with all routes declared (pages can be stubs)
- Create `Navbar`, `Footer`, layout wrapper
- Add mock `courses.json`

### Phase 2 — Courses
- `coursesSlice`: load items, filters, search, sort, `selectFilteredCourses`
- `BrowsePage` with `Filters` and `CourseCard`
- `CourseDetailPage`
- `HomePage` (hero, language tiles, how it works, featured courses)

### Phase 3 — Auth
- `authSlice`: register, login, logout thunks + localStorage persistence
- `SignUpPage`, `LoginPage`
- `ProtectedRoute`
- Enroll action on course detail (requires login)

### Phase 4 — Dashboard & Profile
- `DashboardPage`: enrolled courses, progress, AI status card
- `ProfilePage`: edit name, email, goal, notifications

### Phase 5 — AI Tutor
- `aiSlice`: access status, messages, streaming state
- `AccessRequestPage`: form + confirmation + pending state + auto-approval
- `aiService.js`: OpenAI fetch with `ReadableStream`
- `AITutorPage`: mode selector + language selector + `ChatWindow`
- Wire streaming: thunk dispatches `streamingContent` updates, commits on done

---

## What makes this portfolio-worthy

- Complete product with a clear user journey — not a tutorial clone
- Redux architecture that shows you understand state management at scale
- Real AI integration: live GPT-4o streaming, not a fake chatbot
- Access request flow shows product thinking (gating, onboarding, rollout UX)
- Course catalog shows data modeling, filtering, and derived state with selectors
- Clean code structure a hiring engineer can read and respect