import React from 'react';
import { User } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { Home, Calendar, BookOpen, Settings, User as UserIcon } from 'lucide-react';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

interface LayoutProps {
    children: React.ReactNode;
    currentView: ViewType;
    onNavigate: (view: ViewType) => void;
    user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, user }) => {
    const { logout } = useAuth();

    const navigationItems: Array<{ id: ViewType; label: string; icon: any }> = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'booking', label: 'Prenota', icon: Calendar },
        ...(user?.role !== 'admin' ? [{ id: 'appointments' as ViewType, label: 'Le Mie', icon: BookOpen }] : []),
        ...(user?.role === 'admin' ? [{ id: 'admin' as ViewType, label: 'Gestione', icon: Settings }] : []),
        { id: 'profile', label: 'Profilo', icon: UserIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-100 max-w-md mx-auto">
            {/* Header */}
            <div
                className="text-white p-4 shadow-lg"
                style={{background: 'linear-gradient(to right, #b5938a, #a4817a)'}}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">R</div>
                        <div className="text-lg font-light">BEAUTY</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">{user?.name}</span>
                        <button
                            onClick={logout}
                            className="px-3 py-1 rounded-full text-sm transition-colors hover:opacity-80"
                            style={{backgroundColor: 'rgba(255,255,255,0.2)'}}
                        >
                            Esci
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="pb-20">
                {children}
            </main>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
                <div className="bg-white border-t border-gray-200 p-4">
                    <div className="flex justify-around">
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = currentView === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                                        isActive ? '' : 'text-gray-500'
                                    }`}
                                    style={isActive ? {
                                        color: '#a4817a',
                                        backgroundColor: 'rgba(164, 129, 122, 0.1)'
                                    } : {}}
                                >
                                    <IconComponent size={20} />
                                    <span className="text-xs mt-1">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;