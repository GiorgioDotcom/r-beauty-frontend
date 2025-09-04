import { useState, useEffect } from 'react';
import { Service } from '@/types';
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
            if (response.success && response.data) {
                setServices(response.data.services);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const createService = async (serviceData: {
        name: string;
        category: string;
        description?: string;
        price: number;
        duration: number;
    }) => {
        try {
            const response = await apiClient.createService(serviceData);
            if (response.success) {
                await fetchServices();
            }
            return response;
        } catch (err) {
            throw err;
        }
    };

    const updateService = async (id: string, serviceData: Partial<Service>) => {
        try {
            const response = await apiClient.updateService(id, serviceData);
            if (response.success) {
                await fetchServices();
            }
            return response;
        } catch (err) {
            throw err;
        }
    };

    const deleteService = async (id: string) => {
        try {
            const response = await apiClient.deleteService(id);
            if (response.success) {
                await fetchServices();
            }
            return response;
        } catch (err) {
            throw err;
        }
    };

    return {
        services,
        loading,
        error,
        refetch: fetchServices,
        createService,
        updateService,
        deleteService,
    };
};