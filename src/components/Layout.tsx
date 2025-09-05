import React from 'react';
import {User, ViewType} from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
    children: React.ReactNode;
    currentView: string;
    onNavigate: (view: string) => void;
    user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user }) => {
    const { logout } = useAuth();

    const navigationItems = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'services', label: 'Servizi', icon: '💄' },
        { id: 'booking', label: 'Prenota', icon: '📅' },
        { id: 'appointments', label: 'Appuntamenti', icon: '📋' },
        ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: '⚙️' }] : []),
        { id: 'profile', label: 'Profilo', icon: '👤' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold" style={{ color: '#a4817a' }}>
                                R Beauty
                            </h1>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">
                                Ciao, {user?.name}
                            </span>
                            <button
                                onClick={logout}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Esci
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar Navigation */}
                <nav className="w-64 bg-white shadow-sm h-screen">
                    <div className="p-4">
                        <ul className="space-y-2">
                            {navigationItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => onNavigate(item.id as ViewType)}
                                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                                            currentView === item.id
                                                ? 'bg-rose-100 text-rose-800'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;