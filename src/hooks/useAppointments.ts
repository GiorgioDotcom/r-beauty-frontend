import { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus } from '@/types';
import { apiClient } from '@/services/api';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);

    useEffect(() => {
        fetchUserAppointments();
    }, []);

    const fetchUserAppointments = async () => {
        try {
            setLoading(true);
            const response = await apiClient.getUserAppointments();
            if (response.success && response.data) {
                setAppointments(response.data.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllAppointments = async (params?: {
        page?: number;
        limit?: number;
        date?: string;
        status?: string;
    }) => {
        try {
            setLoading(true);
            const response = await apiClient.getAllAppointments(params);
            if (response.success && response.data) {
                setAppointments(response.data.data);
                return response.data;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch all appointments');
        } finally {
            setLoading(false);
        }
    };

    const getAvailableSlots = async (date: string, serviceId: string) => {
        try {
            const response = await apiClient.getAvailableSlots(date, serviceId);
            if (response.success && response.data) {
                // @ts-ignore
                const slots = response.data.availableSlots || [];
                setAvailableSlots(slots);
                return slots;
            }
            return [];
        } catch (err) {
            console.error('Failed to fetch available slots:', err);
            throw err;
        }
    };

    const createAppointment = async (appointmentData: {
        serviceId: string;
        date: string;
        startTime: string;
        notes?: string;
    }) => {
        try {
            const response = await apiClient.createAppointment(appointmentData);
            if (response.success) {
                await fetchUserAppointments();
                return response;
            }
        } catch (err) {
            console.error('Failed to create appointment:', err);
            throw err;
        }
    };

    const cancelAppointment = async (appointmentId: string) => {
        try {
            const response = await apiClient.cancelAppointment(appointmentId);
            if (response.success) {
                setAppointments(prev =>
                    prev.map(app =>
                        app._id === appointmentId
                            ? { ...app, status: AppointmentStatus.CANCELLED }
                            : app
                    )
                );
            }
        } catch (err) {
            console.error('Failed to cancel appointment:', err);
            throw err;
        }
    };

    const updateAppointmentStatus = async (appointmentId: string, status: string) => {
        try {
            const response = await apiClient.updateAppointmentStatus(appointmentId, status);
            if (response.success) {
                setAppointments(prev =>
                    prev.map(app =>
                        app._id === appointmentId
                            ? { ...app, status: status as AppointmentStatus }
                            : app
                    )
                );
            }
            return response;
        } catch (err) {
            console.error('Failed to update appointment status:', err);
            throw err;
        }
    };

    return {
        appointments,
        loading,
        error,
        availableSlots,
        cancelAppointment,
        refetch: fetchUserAppointments,
        fetchUserAppointments,
        fetchAllAppointments,
        getAvailableSlots,
        createAppointment,
        updateAppointmentStatus,
    };
};