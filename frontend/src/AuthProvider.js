import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

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
                setIsLoggedIn(true);
                setUsername(formData.username);
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
        setUsername('');
      };

    return(
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }
