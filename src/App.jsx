import SideBar from "./components/SideBar.jsx"
import { Routes, Route } from "react-router-dom"
import Home from "../src/pages/Home.jsx"

function App() {

  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </>
  )
}

export default App
