import React from 'react';
import { Calendar, Star, Heart, Clock } from 'lucide-react';
import { ViewType } from '@/types';

interface HomePageProps {
    onNavigate: (view: ViewType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const features = [
        {
            icon: <Calendar className="w-6 h-6" />,
            title: 'Prenota Online',
            description: 'Prenota i tuoi appuntamenti in pochi click',
            action: () => onNavigate('booking'),
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: 'I Nostri Servizi',
            description: 'Scopri tutti i nostri trattamenti di bellezza',
            action: () => onNavigate('services'),
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: 'I Miei Appuntamenti',
            description: 'Visualizza e gestisci le tue prenotazioni',
            action: () => onNavigate('appointments'),
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: 'Chi Siamo',
            description: 'Scopri il nostro centro e la nostra filosofia',
            action: () => console.log('About'),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#a4817a' }}>
                    Benvenuta in R Beauty
                </h1>
                <p className="text-gray-600">
                    Il tuo centro di bellezza e benessere
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        onClick={feature.action}
                        className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="flex items-start space-x-4">
                            <div
                                className="p-3 rounded-lg"
                                style={{ backgroundColor: 'rgba(164, 129, 122, 0.1)' }}
                            >
                                <div style={{ color: '#a4817a' }}>
                                    {feature.icon}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="mt-12 p-6 rounded-xl text-center"
                style={{ backgroundColor: 'rgba(164, 129, 122, 0.05)' }}
            >
                <h2 className="text-xl font-semibold mb-3" style={{ color: '#a4817a' }}>
                    Offerta Speciale
                </h2>
                <p className="text-gray-700 mb-4">
                    Prenota il tuo primo trattamento e ricevi uno sconto del 20%!
                </p>
                <button
                    onClick={() => onNavigate('booking')}
                    className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: '#a4817a' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8a6b5e'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#a4817a'}
                >
                    Prenota Ora
                </button>
            </div>
        </div>
    );
};

export default HomePage;