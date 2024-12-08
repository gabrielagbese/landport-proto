import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center bg-gray-950 text-3xl font-extrabold text-white p-4 top-0 w-full z-10 shadow-lg">
            <div className="text-xl">LandPort</div>
            {user && (
                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700">
                    Logout
                </Button>
            )}
        </div>
    );
};
