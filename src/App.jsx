import SideBar from "./components/SideBar.jsx"
import BottomNav from "./components/BottomNav.jsx"
import ThemeSwitcher from "./theme/ThemeSwitcher.jsx"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Admin from "./pages/Admin.jsx"

function App() {
  return (
    <>
      <ThemeSwitcher />
      <SideBar />
      <BottomNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App