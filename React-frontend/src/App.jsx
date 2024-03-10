import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./components/HomeDashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/dashboard"
                element={
                    // <PrivateRoute>
                        <Dashboard />
                    // </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
