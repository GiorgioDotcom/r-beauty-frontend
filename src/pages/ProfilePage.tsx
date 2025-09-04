import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import { BRAND_COLORS } from '@/utils/constants.ts';
import {
    User,
    Mail,
    Phone,
    Bell,
    Shield,
    Edit3,
    Save,
    X,
    Camera,
    Settings,
    LogOut
} from 'lucide-react';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    const handleSave = () => {
        // TODO: Implementare l'aggiornamento del profilo
        console.log('Aggiornamento profilo:', editForm);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditForm({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Il Mio Profilo</h2>

            {/* Profile Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center"
                        style={{backgroundColor: 'rgba(180, 147, 138, 0.2)'}}
                    >
                        <User style={{color: BRAND_COLORS.primary}} size={32} />
                        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-white rounded-full flex items-center justify-center shadow-md">
                            <Camera size={16} style={{color: BRAND_COLORS.primary}} />
                        </button>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
                                <p className="text-sm text-gray-600">{user?.email}</p>
                                {user?.role === 'admin' && (
                                    <span
                                        className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-opacity-20 rounded-full"
                                        style={{
                                            backgroundColor: `${BRAND_COLORS.primary}20`,
                                            color: BRAND_COLORS.primary
                                        }}
                                    >
                    Administrator
                  </span>
                                )}
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
                            >
                                <Edit3 size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome
                            </label>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                                style={{borderColor: '#d4b5a3'}}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                                style={{borderColor: '#d4b5a3'}}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Telefono
                            </label>
                            <input
                                type="tel"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                placeholder="Inserisci il tuo numero di telefono"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                                style={{borderColor: '#d4b5a3'}}
                            />
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                onClick={handleSave}
                                className="flex-1 text-white p-3 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center"
                                style={{backgroundColor: BRAND_COLORS.primary}}
                            >
                                <Save size={16} className="mr-2" />
                                Salva
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                            >
                                <X size={16} className="mr-2" />
                                Annulla
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Profile Info */
                    <div className="space-y-3">
                        <div className="flex items-center py-2">
                            <Mail size={18} className="text-gray-400 mr-3" />
                            <span className="text-gray-700">{user?.email}</span>
                        </div>

                        <div className="flex items-center py-2">
                            <Phone size={18} className="text-gray-400 mr-3" />
                            <span className="text-gray-700">
                {user?.phone || 'Nessun numero inserito'}
              </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Settings Sections */}
            <div className="space-y-3">
                {/* Notifications */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <Bell size={20} className="text-gray-600 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-800">Notifiche</h4>
                                <p className="text-sm text-gray-600">Gestisci le tue preferenze di notifica</p>
                            </div>
                        </div>
                        <div className="text-gray-400">
                            <span className="text-sm">›</span>
                        </div>
                    </button>
                </div>

                {/* Privacy */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <Shield size={20} className="text-gray-600 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-800">Privacy e Sicurezza</h4>
                                <p className="text-sm text-gray-600">Gestisci la privacy del tuo account</p>
                            </div>
                        </div>
                        <div className="text-gray-400">
                            <span className="text-sm">›</span>
                        </div>
                    </button>
                </div>

                {/* General Settings */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <Settings size={20} className="text-gray-600 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-800">Impostazioni Generali</h4>
                                <p className="text-sm text-gray-600">Personalizza l'esperienza dell'app</p>
                            </div>
                        </div>
                        <div className="text-gray-400">
                            <span className="text-sm">›</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Account Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-3">Informazioni Account</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tipo di account:</span>
                        <span className="font-medium text-gray-800">
              {user?.role === 'admin' ? 'Administrator' : 'Cliente'}
            </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Membro dal:</span>
                        <span className="font-medium text-gray-800">
              {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('it-IT')
                  : 'Non disponibile'
              }
            </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Stato:</span>
                        <span className="font-medium text-green-600">Attivo</span>
                    </div>
                </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-3">Aiuto e Supporto</h3>
                <div className="space-y-2">
                    <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm text-gray-700">
                        Centro Assistenza
                    </button>
                    <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm text-gray-700">
                        Contatta il Supporto
                    </button>
                    <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm text-gray-700">
                        Termini di Servizio
                    </button>
                    <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm text-gray-700">
                        Privacy Policy
                    </button>
                </div>
            </div>

            {/* App Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-3">Informazioni App</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Versione:</span>
                        <span className="font-medium text-gray-800">1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Ultimo aggiornamento:</span>
                        <span className="font-medium text-gray-800">Settembre 2025</span>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="pt-4">
                <button
                    onClick={() => {
                        if (confirm('Sei sicura di voler uscire?')) {
                            logout();
                        }
                    }}
                    className="w-full bg-red-500 text-white p-4 rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                    <LogOut size={20} className="mr-2" />
                    Esci dall'account
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;