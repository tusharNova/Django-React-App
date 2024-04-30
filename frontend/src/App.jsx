import React from "react"
import { BrowserRouter , Route, Router ,Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/home"
import Notfound from "./pages/Notfound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
    </>
  )
}

export default App
