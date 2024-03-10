import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getJWTCookie } from "../util/jwtCookieUtil";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {});
    useEffect(() => {
        const token = getJWTCookie();
        console.log("Token in private route: ", token);
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
