import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import Login from '@/components/Login';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Booking from '@/pages/Booking';
import MyAppointments from '@/pages/MyAppointments';
import AdminDashboard from '@/pages/AdminDashboard';
import Profile from '@/pages/Profile';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

const AppContent = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const [currentView, setCurrentView] = useState<ViewType>('home');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-pulse">
                    <div className="text-2xl font-bold" style={{ color: '#a4817a' }}>
                        R Beauty
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    const renderCurrentView = () => {
        switch (currentView) {
            case 'home':
                return <Home onNavigate={setCurrentView} />;
            case 'services':
                return <Services />;
            case 'booking':
                return <Booking onComplete={() => setCurrentView('appointments')} />;
            case 'appointments':
                return <MyAppointments />;
            case 'admin':
                return user?.role === 'admin' ? <AdminDashboard /> : <Home onNavigate={setCurrentView} />;
            case 'profile':
                return <Profile />;
            default:
                return <Home onNavigate={setCurrentView} />;
        }
    };

    return (
        <Layout currentView={currentView} onNavigate={setCurrentView} user={user}>
            {renderCurrentView()}
        </Layout>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <div className="App">
                <AppContent />
            </div>
        </AuthProvider>
    );
};

export default App;