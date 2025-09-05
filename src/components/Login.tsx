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
        <div className="min-h-screen flex items-center justify-center p-4 r-beauty-gradient">
            <div className="mobile-container">
                <div className="r-beauty-card glass-effect p-8 slide-up">
                    <div className="text-center mb-8">
                        <div className="text-5xl font-bold r-beauty-text-gradient mb-2 font-serif">
                            R
                        </div>
                        <div className="text-2xl font-light text-gray-700 tracking-wider">
                            BEAUTY
                        </div>
                        <p className="text-gray-600 mt-3 font-medium">Il tuo centro benessere</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 error-state rounded-xl text-sm font-medium slide-up">
                            {error}
                        </div>
                    )}

                    <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required={!isLogin}
                                placeholder="Nome completo"
                                className="w-full r-beauty-input"
                            />
                        )}

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Email"
                            className="w-full r-beauty-input"
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Password"
                            className="w-full r-beauty-input"
                        />

                        {!isLogin && (
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Telefono (opzionale)"
                                className="w-full r-beauty-input"
                            />
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full r-beauty-button"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <div className="r-beauty-spinner mr-3"></div>
                                    {isLogin ? 'Accedendo...' : 'Registrando...'}
                                </span>
                            ) : (
                                isLogin ? 'Accedi' : 'Registrati'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            {isLogin ? 'Non hai ancora un account?' : 'Hai già un account?'}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="ml-2 font-medium text-gray-800 hover:text-gray-900 transition-colors hover:underline"
                            >
                                {isLogin ? 'Registrati qui' : 'Accedi qui'}
                            </button>
                        </p>
                    </div>

                    <div className="mt-8 p-5 bg-gray-50/80 rounded-xl border border-gray-200/50">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                            Credenziali di test
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="bg-white/70 p-3 rounded-lg border border-gray-200/30">
                                <p className="font-medium text-gray-800">Admin</p>
                                <p className="text-gray-600">admin@rbeauty.it / admin123</p>
                            </div>
                            <div className="bg-white/70 p-3 rounded-lg border border-gray-200/30">
                                <p className="font-medium text-gray-800">Cliente</p>
                                <p className="text-gray-600">maria@esempio.it / client123</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login