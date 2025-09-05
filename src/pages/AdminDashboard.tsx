import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Dashboard Amministratore
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Appuntamenti Oggi
                        </h2>
                        <p className="text-3xl font-bold text-rose-600">0</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Clienti Totali
                        </h2>
                        <p className="text-3xl font-bold text-rose-600">0</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Servizi Attivi
                        </h2>
                        <p className="text-3xl font-bold text-rose-600">0</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md mt-6">
                    <p className="text-gray-600 mb-4">
                        Dashboard amministratore completa in arrivo.
                    </p>
                    <p className="text-sm text-gray-500">
                        Componente in sviluppo...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;