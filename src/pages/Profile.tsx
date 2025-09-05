import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Il Mio Profilo
                </h1>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-gray-600 mb-4">
                        Qui potrai modificare i dati del tuo profilo.
                    </p>
                    <p className="text-sm text-gray-500">
                        Componente in sviluppo...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;