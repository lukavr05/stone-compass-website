import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "../src/pages/Home.jsx"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </>
  )
}

export default App
