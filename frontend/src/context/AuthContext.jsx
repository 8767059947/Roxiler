import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const token = localStorage.getItem('user_token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token on load, removing it.");
                localStorage.removeItem('user_token');
            }
        }
        setLoading(false);

    }, []);

    const login = (token) => {
        localStorage.setItem('user_token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
    }

    const logout = () => {
        localStorage.removeItem('user_token');
        setUser(null);
    };

     if (loading) {
        return <div>Loading...</div>; // Ya aap yahan ek sundar spinner dikha sakte hain
    }

     return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}