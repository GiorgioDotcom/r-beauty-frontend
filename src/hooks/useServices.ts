import { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '@/types';
import { apiClient } from '@/services/api';

export const useServices = () => {
    const [services, setServices] = useState<Record<string, Service[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await apiClient.getServices();
            if (response.success) {
                setServices(response.data.services);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    return {
        services,
        loading,
        error,
        refetch: fetchServices,
    };
};