import React from 'react';

const MyAppointments: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">I Miei Appuntamenti</h2>

            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Non hai ancora prenotazioni</p>
                <button
                    className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors"
                    style={{backgroundColor: '#a4817a'}}
                >
                    Prenota Ora
                </button>
            </div>
        </div>
    );
};

export default MyAppointments;