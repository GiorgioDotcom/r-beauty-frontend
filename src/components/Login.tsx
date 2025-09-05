import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/services/api';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
        } catch (error: any) {
            setError(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await apiClient.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone || undefined
            });

            // After successful registration, login automatically
            await login(formData.email, formData.password);
        } catch (error: any) {
            setError(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            name: '',
            email: '',
            password: '',
            phone: ''
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{
            background: 'linear-gradient(135deg, #f5f1f0 0%, #e8ddd9 30%, #d4c4bf 70%, #c9a876 100%)'
        }}>
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{
                            background: 'linear-gradient(45deg, #c9a876, #e6d5a8)',
                            boxShadow: '0 8px 30px rgba(201, 168, 118, 0.4)'
                        }}>
                            <span className="text-3xl text-white">🦋</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-3" style={{
                        background: 'linear-gradient(45deg, #a4817a, #c9a876)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: 'serif'
                    }}>
                        R Beauty
                    </h1>
                    <p className="text-gray-600 text-lg">Il tuo centro di bellezza</p>
                </div>

                {/* Form Container */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-rose-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-center" style={{ color: '#a4817a' }}>
                            {isLogin ? 'Bentornata' : 'Unisciti a noi'}
                        </h2>
                        <p className="text-center text-gray-600 mt-2">
                            {isLogin ? 'Accedi al tuo account' : 'Crea il tuo account'}
                        </p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-rose-300 to-amber-200 mx-auto mt-4"></div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={isLogin ? handleLogin : handleRegister}>
                        {!isLogin && (
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#a4817a' }}>
                                    Nome completo
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                                    placeholder="Il tuo nome"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                />
                            </div>
                        )}

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#a4817a' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                                placeholder="cviao@gmail.com"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#a4817a' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                            />
                        </div>

                        {!isLogin && (
                            <div className="mb-8">
                                <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#a4817a' }}>
                                    Telefono (opzionale)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200"
                                    placeholder="+39 123 456 7890"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 px-6 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
                            style={{
                                background: isLoading
                                    ? 'linear-gradient(135deg, #d1d5db, #9ca3af)'
                                    : 'linear-gradient(135deg, #a4817a, #c9a876)',
                            }}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isLogin ? 'Accedendo...' : 'Registrando...'}
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    {isLogin ? 'Accedi ✨' : 'Registrati 🦋'}
                                </span>
                            )}
                        </button>
                    </form>

                    {/* Toggle between login/register */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            {isLogin ? 'Non hai ancora un account?' : 'Hai già un account?'}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="ml-2 font-medium transition-all duration-200 hover:underline"
                                style={{ color: '#a4817a' }}
                            >
                                {isLogin ? 'Registrati qui' : 'Accedi qui'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Demo credentials */}
                <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-rose-100">
                    <h3 className="text-sm font-medium mb-4 text-center" style={{ color: '#a4817a' }}>
                        🔑 Credenziali di test
                    </h3>
                    <div className="text-sm text-gray-700 space-y-2">
                        <div className="bg-white/50 p-3 rounded-lg">
                            <p><span className="font-medium">Admin:</span> admin@rbeauty.it</p>
                            <p><span className="font-medium">Password:</span> admin123</p>
                        </div>
                        <div className="bg-white/50 p-3 rounded-lg">
                            <p><span className="font-medium">Cliente:</span> maria@esempio.it</p>
                            <p><span className="font-medium">Password:</span> client123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;