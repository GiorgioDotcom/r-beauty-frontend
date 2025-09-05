import React from 'react';
import { Settings, Plus, Ban } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Gestione Centro</h2>
                <div className="flex space-x-2">
                    <button
                        className="text-white px-3 py-2 rounded-lg text-sm hover:opacity-90 transition-colors"
                        style={{backgroundColor: '#a4817a'}}
                    >
                        <Plus size={16} className="inline mr-1" />
                        Servizio
                    </button>
                    <button
                        className="text-white px-3 py-2 rounded-lg text-sm hover:opacity-90 transition-colors"
                        style={{backgroundColor: '#6b7280'}}
                    >
                        <Ban size={16} className="inline mr-1" />
                        Chiudi
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-3">Dashboard Amministratore</h3>
                <p className="text-gray-600 mb-4">
                    Pannello di controllo per gestire servizi e prenotazioni.
                </p>
                <p className="text-sm" style={{ color: '#a4817a' }}>
                    Componente in sviluppo...
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;