import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';
import { apiClient } from '@/services/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('r-beauty-token');
    };

    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.getProfile();
            if (response.success && response.data) {
                // @ts-ignore
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('r-beauty-token');
        if (storedToken) {
            setToken(storedToken);
            fetchUserProfile();
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await apiClient.login(email, password);
            if (response.success && response.data) {
                // @ts-ignore
                const { token: authToken, user: userData } = response.data;
                setToken(authToken);
                setUser(userData);
                localStorage.setItem('r-beauty-token', authToken);
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};