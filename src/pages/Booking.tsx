import React from 'react';

interface BookingProps {
    onComplete: () => void;
}

const Booking: React.FC<BookingProps> = ({ onComplete }) => {
    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Prenota il tuo Servizio</h2>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 mb-4">
                    Sistema di prenotazione in arrivo.
                </p>
                <button
                    onClick={onComplete}
                    className="w-full text-white p-4 rounded-xl font-medium hover:opacity-90 transition-colors"
                    style={{backgroundColor: '#a4817a'}}
                >
                    Torna ai miei appuntamenti
                </button>
                <p className="text-sm mt-4" style={{ color: '#a4817a' }}>
                    Componente in sviluppo...
                </p>
            </div>
        </div>
    );
};

export default Booking;