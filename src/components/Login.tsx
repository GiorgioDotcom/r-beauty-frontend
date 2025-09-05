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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">R Beauty</h1>
                    <p className="text-gray-600">Il tuo centro di bellezza</p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-center text-gray-800">
                            {isLogin ? 'Accedi al tuo account' : 'Crea un account'}
                        </h2>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={isLogin ? handleLogin : handleRegister}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome completo
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    placeholder="Il tuo nome"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                placeholder="cviao@gmail.com"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        {!isLogin && (
                            <div className="mb-6">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefono (opzionale)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    placeholder="+39 123 456 7890"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
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
                                isLogin ? 'Accedi' : 'Registrati'
                            )}
                        </button>
                    </form>

                    {/* Toggle between login/register */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="ml-2 text-rose-600 hover:text-rose-700 font-medium"
                            >
                                {isLogin ? 'Registrati' : 'Accedi'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Demo credentials */}
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Credenziali di test:</h3>
                    <div className="text-sm text-blue-700">
                        <p><strong>Admin:</strong> admin@rbeauty.it / admin123</p>
                        <p><strong>Cliente:</strong> maria@esempio.it / client123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;