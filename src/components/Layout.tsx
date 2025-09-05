import React from 'react';
import { User } from '@/types';
import { useAuth } from '@/hooks/useAuth';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

interface LayoutProps {
    children: React.ReactNode;
    currentView: ViewType;
    onNavigate: (view: ViewType) => void;
    user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user }) => {
    const { logout } = useAuth();

    const navigationItems: Array<{ id: ViewType; label: string; icon: string }> = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'services', label: 'Servizi', icon: '💫' },
        { id: 'booking', label: 'Prenota', icon: '🗓️' },
        { id: 'appointments', label: 'Appuntamenti', icon: '📋' },
        ...(user?.role === 'admin' ? [{ id: 'admin' as ViewType, label: 'Dashboard', icon: '👑' }] : []),
        { id: 'profile', label: 'Profilo', icon: '👤' },
    ];

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f1f0 0%, #e8ddd9 50%, #d4c4bf 100%)' }}>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-rose-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                {/* Butterfly Icon */}
                                <div className="w-10 h-10 flex items-center justify-center" style={{
                                    background: 'linear-gradient(45deg, #c9a876, #e6d5a8)',
                                    borderRadius: '50%',
                                    boxShadow: '0 4px 15px rgba(201, 168, 118, 0.3)'
                                }}>
                                    <span className="text-white text-lg">🦋</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-wide" style={{
                                    background: 'linear-gradient(45deg, #a4817a, #c9a876)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontFamily: 'serif'
                                }}>
                                    R Beauty
                                </h1>
                                <p className="text-xs text-gray-500 italic">Il tuo centro di bellezza</p>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-sm font-medium" style={{ color: '#a4817a' }}>
                                    Benvenuta, {user?.name}
                                </p>
                                <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Amministratore' : 'Cliente'}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-sm rounded-lg transition-all duration-200 border border-rose-200 hover:bg-rose-50"
                                style={{ color: '#a4817a' }}
                            >
                                Esci
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar Navigation */}
                <nav className="w-72 bg-white/70 backdrop-blur-sm shadow-xl min-h-screen border-r border-rose-100">
                    <div className="p-6">
                        {/* Navigation Header */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Menu</h2>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-rose-300 to-amber-200"></div>
                        </div>

                        {/* Navigation Items */}
                        <ul className="space-y-3">
                            {navigationItems.map((item) => {
                                const isActive = currentView === item.id;
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => onNavigate(item.id)}
                                            className={`w-full flex items-center px-6 py-4 text-left rounded-xl transition-all duration-300 group ${
                                                isActive
                                                    ? 'shadow-lg transform scale-[1.02]'
                                                    : 'hover:transform hover:scale-[1.01] hover:shadow-md'
                                            }`}
                                            style={{
                                                background: isActive
                                                    ? 'linear-gradient(135deg, #a4817a, #c9a876)'
                                                    : 'transparent',
                                                color: isActive ? 'white' : '#6b7280'
                                            }}
                                        >
                                            <span className={`mr-4 text-lg transition-transform duration-300 ${
                                                isActive ? 'scale-110' : 'group-hover:scale-110'
                                            }`}>
                                                {item.icon}
                                            </span>
                                            <span className={`font-medium ${
                                                isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
                                            }`}>
                                                {item.label}
                                            </span>
                                            {isActive && (
                                                <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Decorative Element */}
                        <div className="mt-12 p-6 rounded-xl" style={{
                            background: 'linear-gradient(135deg, rgba(164, 129, 122, 0.1), rgba(201, 168, 118, 0.1))',
                            border: '1px solid rgba(164, 129, 122, 0.2)'
                        }}>
                            <div className="text-center">
                                <div className="text-2xl mb-2">✨</div>
                                <p className="text-sm font-medium" style={{ color: '#a4817a' }}>
                                    La tua bellezza
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    è la nostra passione
                                </p>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;