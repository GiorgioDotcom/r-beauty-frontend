import React from 'react';
import { User } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { BRAND_COLORS } from '@/utils/constants';
import {
    Home,
    Calendar,
    Scissors,
    User as UserIcon,
    LogOut,
    Shield,
    BookOpen
} from 'lucide-react';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

interface LayoutProps {
    children: React.ReactNode;
    currentView: ViewType;
    onNavigate: (view: ViewType) => void;
    user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user }) => {
    const { logout } = useAuth();

    // Mobile-optimized navigation items
    const navigationItems = [
        { key: 'home', label: 'Home', icon: Home },
        { key: 'booking', label: 'Prenota', icon: Calendar },
        { key: 'appointments', label: 'Le Mie', icon: BookOpen },
        ...(user?.role === 'admin' ? [{ key: 'admin', label: 'Admin', icon: Shield }] : []),
        { key: 'profile', label: 'Profilo', icon: UserIcon },
    ] as const;

    return (
        <div className="min-h-screen bg-gray-100 max-w-md mx-auto">
            {/* Mobile Header */}
            <header
                className="text-white p-4 shadow-lg"
                style={{background: 'linear-gradient(to right, #b5938a, #a4817a)'}}
            >
                <div className="flex items-center justify-between">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => onNavigate('home')}
                    >
                        <div className="text-2xl font-bold">R</div>
                        <div className="text-lg font-light">BEAUTY</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm truncate max-w-20">{user?.name}</span>
                        <button
                            onClick={logout}
                            className="px-3 py-1 rounded-full text-sm transition-colors hover:opacity-80"
                            style={{backgroundColor: 'rgba(255,255,255,0.2)'}}
                        >
                            Esci
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pb-20">
                {children}
            </main>

            {/* Bottom Navigation - Mobile */}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
                <nav className="bg-white border-t border-gray-200 p-2">
                    <div className="flex justify-around">
                        {navigationItems.map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => onNavigate(key as ViewType)}
                                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                                    currentView === key
                                        ? 'text-current'
                                        : 'text-gray-500'
                                }`}
                                style={currentView === key ? {
                                    color: BRAND_COLORS.primary,
                                    backgroundColor: 'rgba(164, 129, 122, 0.1)'
                                } : {}}
                            >
                                <Icon size={20} />
                                <span className="text-xs mt-1">{label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Layout;