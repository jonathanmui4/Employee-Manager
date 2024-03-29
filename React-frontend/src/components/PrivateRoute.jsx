import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getJWTCookie } from "../util/jwtCookieUtil";

const PrivateRoute = ({ children, setFirstName, setLastName, setRole, setUserName }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchAuthStatus = async () => {
        try {
          const response = await fetch('http://localhost:8080/home', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getJWTCookie()}`,
            },  
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
            const data = await response.json();
            setFirstName(data.userFirstName);
            setLastName(data.userLastName);
            setRole(data.userRole);
            setUserName(data.username);
          } else {
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
  
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };
  
  export default PrivateRoute;
