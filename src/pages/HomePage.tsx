import React from 'react';
import { BRAND_COLORS } from '@/utils/constants.ts';
import { Home, BookOpen, Camera, MapPin, Phone } from 'lucide-react';

interface HomePageProps {
    onNavigate: (view: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Benvenuta da R Beauty</h2>
                <p className="text-gray-600">Il tuo centro di bellezza e benessere</p>
            </div>

            <div
                className="p-6 rounded-xl"
                style={{background: 'linear-gradient(to right, rgba(180, 147, 138, 0.1), rgba(164, 129, 122, 0.1))'}}
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Orari di Apertura</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Lunedì - Venerdì</span>
                        <span>9:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Sabato</span>
                        <span>9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Domenica</span>
                        <span>Chiuso</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    className="bg-white p-4 rounded-xl shadow-md border flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors"
                    style={{borderColor: '#d4b5a3'}}
                    onClick={() => onNavigate('services')}
                >
                    <BookOpen style={{color: BRAND_COLORS.primary}} size={24} />
                    <span className="text-sm font-medium">Listino</span>
                </button>

                <button
                    className="bg-white p-4 rounded-xl shadow-md border flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors"
                    style={{borderColor: '#d4b5a3'}}
                >
                    <Camera style={{color: BRAND_COLORS.primary}} size={24} />
                    <span className="text-sm font-medium">Galleria</span>
                </button>

                <button
                    className="bg-white p-4 rounded-xl shadow-md border flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors"
                    style={{borderColor: '#d4b5a3'}}
                >
                    <MapPin style={{color: BRAND_COLORS.primary}} size={24} />
                    <span className="text-sm font-medium">Indicazioni</span>
                </button>

                <button
                    className="bg-white p-4 rounded-xl shadow-md border flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors"
                    style={{borderColor: '#d4b5a3'}}
                >
                    <Phone style={{color: BRAND_COLORS.primary}} size={24} />
                    <span className="text-sm font-medium">Chiama</span>
                </button>
            </div>

            <button
                onClick={() => onNavigate('booking')}
                className="w-full text-white p-4 rounded-xl font-medium hover:opacity-90 transition-colors"
                style={{backgroundColor: BRAND_COLORS.primary}}
            >
                Prenota Ora
            </button>
        </div>
    );
};

export default HomePage;