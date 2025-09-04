import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import Login from '@/components/Login';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import Services from '@/pages/ServicesPage';
import Booking from '@/pages/BookingPage';
import MyAppointments from '@/pages/AppointmentsPage';
import AdminDashboard from '@/pages/AdminPage';
import Profile from '@/pages/ProfilePage';
import { ViewType } from '@/types';

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
                return <HomePage onNavigate={setCurrentView} />;
            case 'services':
                return <Services />;
            case 'booking':
                return <Booking onComplete={() => setCurrentView('appointments')}
                                onNavigate={function (view: string): void {
                                    throw new Error('Function not implemented.');
                                }} />;
            case 'appointments':
                return <MyAppointments onNavigate={function(view: string): void {
                    throw new Error('Function not implemented.');
                } } />;
            case 'admin':
                return user?.role === 'admin' ? <AdminDashboard /> : <HomePage onNavigate={setCurrentView} />;
            case 'profile':
                return <Profile />;
            default:
                return <HomePage onNavigate={setCurrentView} />;
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