import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import SignUp from './components/Signup'
import Dashboard from './components/HomeDashboard/Dashboard'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
