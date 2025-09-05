import React from 'react';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

interface HomeProps {
    onNavigate: (view: ViewType) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Benvenuto in R Beauty
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        onClick={() => onNavigate('services')}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            I Nostri Servizi
                        </h2>
                        <p className="text-gray-600">
                            Scopri tutti i trattamenti di bellezza disponibili
                        </p>
                    </div>

                    <div
                        onClick={() => onNavigate('booking')}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Prenota Appuntamento
                        </h2>
                        <p className="text-gray-600">
                            Prenota il tuo prossimo trattamento
                        </p>
                    </div>

                    <div
                        onClick={() => onNavigate('appointments')}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            I Miei Appuntamenti
                        </h2>
                        <p className="text-gray-600">
                            Visualizza e gestisci i tuoi appuntamenti
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;