import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getJWTCookie } from "../util/jwtCookieUtil";
import UnauthorizedPage from "./UnauthorizedPage";

const ManagerRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [code, setCode] = useState(0);
    useEffect(() => {
        const fetchAuthStatus = async () => {
          try {
            const response = await fetch('http://localhost:8080/home/admin', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${getJWTCookie()}`,
              },  
            });
            if (response.status === 200) {
              setIsAuthenticated(true);
            } else {
              if (response.status === 403) {
                setCode(403);
              }
              if (response.status === 401) {
                setCode(401);
              }
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error('Error fetching authentication status:', error);
            // Handle error gracefully, e.g., redirect to login or display an error message
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAuthStatus();
      }, []);
      if (isLoading) {
        return <div>Loading...</div>; // Or display a loading indicator
      }
    return isAuthenticated ? children : <UnauthorizedPage code={code} />;
};

export default ManagerRoute;
