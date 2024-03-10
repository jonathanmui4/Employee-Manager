import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./components/HomeDashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ManagerDash from "./components/ManagerDashboard/ManagerDash";
import ManagerRoute from "./components/ManagerRoute";
import RedirectComponent from "./components/RedirectComponent";

function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [userName, setUserName] = useState("");

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute setFirstName={setFirstName} setLastName={setLastName} setRole={setRole} setUserName={setUserName}>
                        <Dashboard firstName={firstName} lastName={lastName} role={role} username={userName} />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard/manager"
                element={
                    <ManagerRoute>
                        <ManagerDash />
                    </ManagerRoute>
                }
            />
            <Route path="/" element={<RedirectComponent />} />
        </Routes>
    );
}

export default App;
