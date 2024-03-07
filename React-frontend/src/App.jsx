import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import SignUp from './components/Signup'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
