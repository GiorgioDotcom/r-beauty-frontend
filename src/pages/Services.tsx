import React from 'react';

const Services: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">I Nostri Servizi</h2>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 mb-4">
                    Qui troverai tutti i nostri trattamenti di bellezza.
                </p>
                <p className="text-sm" style={{ color: '#a4817a' }}>
                    Componente in sviluppo - i servizi verranno caricati dal database...
                </p>
            </div>
        </div>
    );
};

export default Services;