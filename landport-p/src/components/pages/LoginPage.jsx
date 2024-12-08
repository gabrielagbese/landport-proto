import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Lock, User, LogIn } from 'lucide-react';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = login(username, password);

        if (user) {
            // Route based on role
            switch (user.role) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'seller':
                    navigate('/seller');
                    break;
                case 'customer':
                    navigate('/customer');
                    break;
                default:
                    navigate('/');
            }
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 w-[100vw]">
            <Card className="w-full max-w-md shadow-2xl border-none">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-3xl font-bold text-gray-800">
                        LandPort
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-2">
                        Sign in to manage your properties
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <User
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <Input
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-10 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 flex items-center justify-center gap-2"
                        >
                            <LogIn size={20} />
                            Login
                        </Button>
                        <div className="text-center">
                            <a
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;