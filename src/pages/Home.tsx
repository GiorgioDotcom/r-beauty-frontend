import React from 'react';
import { BookOpen, Camera, MapPin, Phone } from 'lucide-react';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

interface HomeProps {
    onNavigate: (view: ViewType) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="p-6 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold r-beauty-text-gradient mb-3 font-serif">
                    Benvenuta da R Beauty
                </h1>
                <p className="text-gray-600 text-lg">Il tuo centro di bellezza e benessere</p>
            </div>

            <div className="r-beauty-card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 font-serif">
                    Orari di Apertura
                </h2>
                <div className="space-y-3 text-base">
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Lunedì - Venerdì</span>
                        <span className="text-gray-600">9:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Sabato</span>
                        <span className="text-gray-600">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Domenica</span>
                        <span className="text-red-500 font-medium">Chiuso</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => onNavigate('services')}
                    className="r-beauty-card p-5 text-center hover:scale-105 transition-transform duration-200"
                >
                    <BookOpen className="mx-auto mb-3 text-2xl" style={{color: 'var(--r-beauty-primary)'}} size={28} />
                    <span className="font-medium text-gray-800">Listino</span>
                </button>

                <button
                    className="r-beauty-card p-5 text-center hover:scale-105 transition-transform duration-200"
                >
                    <Camera className="mx-auto mb-3 text-2xl" style={{color: 'var(--r-beauty-primary)'}} size={28} />
                    <span className="font-medium text-gray-800">Galleria</span>
                </button>

                <button
                    className="r-beauty-card p-5 text-center hover:scale-105 transition-transform duration-200"
                >
                    <MapPin className="mx-auto mb-3 text-2xl" style={{color: 'var(--r-beauty-primary)'}} size={28} />
                    <span className="font-medium text-gray-800">Indicazioni</span>
                </button>

                <button
                    className="r-beauty-card p-5 text-center hover:scale-105 transition-transform duration-200"
                >
                    <Phone className="mx-auto mb-3 text-2xl" style={{color: 'var(--r-beauty-primary)'}} size={28} />
                    <span className="font-medium text-gray-800">Chiama</span>
                </button>
            </div>

            <button
                onClick={() => onNavigate('booking')}
                className="w-full r-beauty-button text-lg py-4"
            >
                Prenota Ora
            </button>

            <div className="r-beauty-card p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 font-serif">
                    La tua bellezza è la nostra passione
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Scopri i nostri trattamenti personalizzati pensati per valorizzare
                    la tua naturale bellezza in un ambiente elegante e rilassante.
                </p>
            </div>
        </div>
    );
};

export default Home;