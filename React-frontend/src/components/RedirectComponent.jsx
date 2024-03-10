import React, { useState, useEffect } from "react";
import { getJWTCookie } from "../util/jwtCookieUtil";

const RedirectComponent = () => {
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
        return <div>Loading...</div>;
      }
    
      if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        window.location.href = '/login'; // Adjust this URL as per your routing setup
        return null;
      }
    
      // Redirect to dashboard if authenticated
      window.location.href = '/dashboard'; // Adjust this URL as per your routing setup
      return null;
};

export default RedirectComponent;
