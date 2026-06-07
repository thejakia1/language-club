import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"

function ComingSoon({ label }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground text-sm">{label} — coming soon</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<ComingSoon label="Browse Courses" />} />
            <Route path="/course/:id" element={<ComingSoon label="Course Detail" />} />
            <Route path="/login" element={<ComingSoon label="Log In" />} />
            <Route path="/signup" element={<ComingSoon label="Sign Up" />} />
            <Route path="/dashboard" element={<ComingSoon label="Dashboard" />} />
            <Route path="/profile" element={<ComingSoon label="Profile" />} />
            <Route path="/ai" element={<ComingSoon label="AI Tutor" />} />
            <Route path="/ai/request" element={<ComingSoon label="Request Access" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
