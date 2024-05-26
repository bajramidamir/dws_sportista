import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const login = async (formData) => {
        try {
            const response = await fetch("http://localhost:8000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const user = await response.json();
                const decodedToken = jwtDecode(user.access_token);
                setIsLoggedIn(true);
                setUserData(decodedToken);
                return true;
            } else {
                console.log("Login failed");
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    
    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null);
    };

    return(
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
