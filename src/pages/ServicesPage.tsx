import {useState} from "react";
import {Service} from "@/types";

export const ServicesPage: React.FC = () => {
    // Simuliamo l'hook useServices
    const [services, setServices] = useState<Record<string, Service[]>>({
        'Trattamenti Viso': [],
        'Trattamenti Corpo': [],
        'Manicure': [],
        'Pedicure': []
    });
    const [loading, setLoading] = useState(false);

    // Helper functions che verrebbero dall'hook
    const getAllServicesFlat = (): Service[] => {
        return Object.values(services).flat();
    };

    const getTotalServicesCount = (): number => {
        return Object.values(services).reduce((total, categoryServices) => {
            return total + categoryServices.length;
        }, 0);
    };

    const totalCount = getTotalServicesCount();
    const allServices = getAllServicesFlat();

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">I Nostri Servizi</h1>
                <p className="text-gray-600 mt-1">
                    Scopri tutti i nostri trattamenti ({totalCount} servizi disponibili)
                </p>
            </div>

            {Object.entries(services).map(([category, categoryServices]) => (
                <div key={category} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#a4817a' }}>
                        {category}
                    </h2>
                    {categoryServices.length === 0 ? (
                        <p className="text-gray-500 italic">Nessun servizio in questa categoria</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryServices.map(service => (
                                <div key={service._id} className="bg-white rounded-lg shadow p-4">
                                    <h3 className="font-semibold">{service.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                                    <div className="flex justify-between mt-3">
                                        <span className="text-green-600 font-semibold">€{service.price}</span>
                                        <span className="text-gray-500 text-sm">{service.duration} min</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
export default class Services {
}