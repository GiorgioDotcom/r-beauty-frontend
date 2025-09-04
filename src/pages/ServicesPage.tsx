import React, { useState, useEffect } from 'react';
import { useServices } from '@/hooks/useServices.ts';
import { Service } from '@/types';
import { BRAND_COLORS } from '@/utils/constants.ts';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface ServicesPageProps {
    onSelectService?: (service: Service) => void;
    selectedService?: Service | null;
    showSelection?: boolean;
}

const ServicesPage: React.FC<ServicesPageProps> = ({
                                                       onSelectService,
                                                       selectedService,
                                                       showSelection = false
                                                   }) => {
    const { services, loading, error } = useServices();
    const [expandedCategory, setExpandedCategory] = useState<string>('');

    // Raggruppa i servizi per categoria
    const groupedServices = services.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {} as Record<string, Service[]>);

    if (loading) {
        return (
            <div className="p-4 flex items-center justify-center min-h-64">
                <Loader2 className="animate-spin" size={32} style={{ color: BRAND_COLORS.primary }} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Errore nel caricamento dei servizi</p>
                    <p className="text-gray-500 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">
                {showSelection ? 'Seleziona Servizio' : 'I Nostri Servizi'}
            </h2>

            <div className="space-y-2">
                {Object.keys(groupedServices).map(category => (
                    <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setExpandedCategory(expandedCategory === category ? '' : category)}
                            className="w-full p-3 bg-gray-50 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                        >
                            <span className="font-medium">{category}</span>
                            {expandedCategory === category ?
                                <ChevronUp size={20} /> :
                                <ChevronDown size={20} />
                            }
                        </button>

                        {expandedCategory === category && (
                            <div className="divide-y divide-gray-200">
                                {groupedServices[category].map((service: Service) => (
                                    <div
                                        key={service._id}
                                        className={`p-3 hover:bg-gray-50 transition-colors ${
                                            showSelection ? 'cursor-pointer' : ''
                                        } ${
                                            selectedService?._id === service._id ? 'border-l-4' : ''
                                        }`}
                                        style={
                                            selectedService?._id === service._id
                                                ? {backgroundColor: 'rgba(180, 147, 138, 0.1)', borderLeftColor: BRAND_COLORS.primary}
                                                : {}
                                        }
                                        onClick={() => showSelection && onSelectService?.(service)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">{service.name}</h3>
                                                {service.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                                )}
                                                <div className="mt-2 text-sm text-gray-500">
                                                    <span>Durata: {service.duration} min</span>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <div
                                                    className="font-bold text-lg"
                                                    style={{ color: BRAND_COLORS.primary }}
                                                >
                                                    €{service.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {Object.keys(groupedServices).length === 0 && !loading && (
                <div className="text-center py-8">
                    <p className="text-gray-500">Nessun servizio disponibile al momento</p>
                </div>
            )}
        </div>
    );
};

export default ServicesPage;