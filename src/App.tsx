import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppointmentProvider } from '@/contexts/AppointmentContext';
import { ServiceProvider } from '@/contexts/ServiceContext';

// Components
import Login from '@/components/Login.tsx';
import Layout from '@/components/Layout.tsx';

// Pages
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import BookingPage from '@/pages/BookingPage';
import AppointmentsPage from '@/pages/AppointmentsPage';
import AdminPage from '@/pages/AdminPage';
import ProfilePage from '@/pages/ProfilePage';

import { User } from '@/types';
import '@/styles/globals.css';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

const AppContent: React.FC = () => {
    const { user, loading } = useAuth();
    const [currentView, setCurrentView] = useState<ViewType>('home');

    // Handle navigation
    const handleNavigate = (view: ViewType) => {
        setCurrentView(view);
    };

    // Show loading screen while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
                        style={{ borderColor: '#a4817a' }}
                    ></div>
                    <p className="text-gray-600">Caricamento...</p>
                </div>
            </div>
        );
    }

    // Show login if user is not authenticated
    if (!user) {
        return <Login />;
    }

    // Render main app content
    const renderCurrentView = () => {
        switch (currentView) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;

            case 'services':
                return <ServicesPage />;

            case 'booking':
                return <BookingPage onNavigate={handleNavigate} />;

            case 'appointments':
                return <AppointmentsPage onNavigate={handleNavigate} />;

            case 'admin':
                return user.role === 'admin' ? <AdminPage /> : <HomePage onNavigate={handleNavigate} />;

            case 'profile':
                return <ProfilePage />;

            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <Layout
            currentView={currentView}
            onNavigate={handleNavigate}
            user={user}
        >
            {renderCurrentView()}
        </Layout>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ServiceProvider>
                <AppointmentProvider>
                    <div className="min-h-screen bg-gray-100">
                        <AppContent />
                    </div>
                </AppointmentProvider>
            </ServiceProvider>
        </AuthProvider>
    );
};

export default App;