import React from 'react';

type ViewType = 'home' | 'services' | 'booking' | 'appointments' | 'admin' | 'profile';

interface HomeProps {
    onNavigate: (view: ViewType) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    const services = [
        {
            icon: '✨',
            title: 'Trattamenti Viso',
            description: 'Pulizie profonde, massaggi rilassanti e cura della pelle',
            color: 'from-rose-400 to-pink-300'
        },
        {
            icon: '💆‍♀️',
            title: 'Trattamenti Corpo',
            description: 'Massaggi rilassanti e trattamenti benessere',
            color: 'from-amber-400 to-orange-300'
        },
        {
            icon: '💅',
            title: 'Manicure & Pedicure',
            description: 'Cura delle unghie con prodotti di qualità',
            color: 'from-purple-400 to-pink-300'
        },
        {
            icon: '👁️',
            title: 'Ciglia & Sopracciglia',
            description: 'Trattamenti per valorizzare il tuo sguardo',
            color: 'from-emerald-400 to-teal-300'
        }
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6" style={{
                        background: 'linear-gradient(45deg, #a4817a, #c9a876)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: 'serif'
                    }}>
                        Benvenuta in R Beauty
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Dove la bellezza incontra l'eleganza. Scopri i nostri trattamenti esclusivi
                        pensati per valorizzare la tua naturale bellezza.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div
                        onClick={() => onNavigate('services')}
                        className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-rose-100 hover:border-rose-200 transform hover:-translate-y-2"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl" style={{
                                background: 'linear-gradient(135deg, #a4817a, #c9a876)',
                                boxShadow: '0 8px 25px rgba(164, 129, 122, 0.3)'
                            }}>
                                <span className="text-white">💫</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3" style={{ color: '#a4817a' }}>
                                I Nostri Servizi
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Scopri tutti i trattamenti di bellezza disponibili
                            </p>
                            <div className="inline-flex items-center text-sm font-medium group-hover:text-rose-600 transition-colors">
                                Esplora <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => onNavigate('booking')}
                        className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-rose-100 hover:border-rose-200 transform hover:-translate-y-2"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl" style={{
                                background: 'linear-gradient(135deg, #c9a876, #e6d5a8)',
                                boxShadow: '0 8px 25px rgba(201, 168, 118, 0.3)'
                            }}>
                                <span className="text-white">🗓️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3" style={{ color: '#a4817a' }}>
                                Prenota Appuntamento
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Prenota il tuo prossimo trattamento di bellezza
                            </p>
                            <div className="inline-flex items-center text-sm font-medium group-hover:text-rose-600 transition-colors">
                                Prenota ora <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => onNavigate('appointments')}
                        className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-rose-100 hover:border-rose-200 transform hover:-translate-y-2"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl" style={{
                                background: 'linear-gradient(135deg, #d4a574, #a4817a)',
                                boxShadow: '0 8px 25px rgba(212, 165, 116, 0.3)'
                            }}>
                                <span className="text-white">📋</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3" style={{ color: '#a4817a' }}>
                                I Miei Appuntamenti
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Visualizza e gestisci i tuoi appuntamenti
                            </p>
                            <div className="inline-flex items-center text-sm font-medium group-hover:text-rose-600 transition-colors">
                                Visualizza <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Preview */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#a4817a' }}>
                        I Nostri Trattamenti Signature
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100 hover:border-rose-200 group">
                                <div className="text-center">
                                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="font-semibold mb-2" style={{ color: '#a4817a' }}>
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-white/60 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-rose-100">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: '#a4817a' }}>
                        Pronta per il tuo momento di bellezza?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Prenota il tuo appuntamento e lasciati coccolare dalle nostre esperte.
                        La tua bellezza merita il meglio.
                    </p>
                    <button
                        onClick={() => onNavigate('booking')}
                        className="px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        style={{
                            background: 'linear-gradient(135deg, #a4817a, #c9a876)',
                        }}
                    >
                        Prenota Ora ✨
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;