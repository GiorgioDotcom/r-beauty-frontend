import React from 'react';

interface BookingProps {
    onComplete: () => void;
}

const Booking: React.FC<BookingProps> = ({ onComplete }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Prenota Appuntamento
                </h1>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-gray-600 mb-4">
                        Qui potrai prenotare il tuo appuntamento.
                    </p>
                    <button
                        onClick={onComplete}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
                    >
                        Torna ai miei appuntamenti
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        Componente in sviluppo...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Booking;