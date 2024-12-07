import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Hardcoded login function
    const login = (username, password) => {
        const accounts = {
            'admin': { password: 'admin', role: 'admin' },
            'seller': { password: 'seller', role: 'seller' },
            'customer': { password: 'customer', role: 'customer' }
        };

        if (accounts[username] && accounts[username].password === password) {
            const userInfo = {
                username,
                role: accounts[username].role
            };
            setUser(userInfo);
            return userInfo;
        }
        return null;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);