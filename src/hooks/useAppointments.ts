import { useState, useEffect } from 'react';
import { Appointment } from '@/types';
import { apiClient } from '@/services/api';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await apiClient.getUserAppointments();
            if (response.success) {
                setAppointments(response.data.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId: string) => {
        try {
            const response = await apiClient.cancelAppointment(appointmentId);
            if (response.success) {
                setAppointments(prev =>
                    prev.map(app =>
                        app._id === appointmentId
                            ? { ...app, status: 'cancelled' as any }
                            : app
                    )
                );
            }
        } catch (err) {
            console.error('Failed to cancel appointment:', err);
            throw err;
        }
    };

    return {
        appointments,
        loading,
        error,
        cancelAppointment,
        refetch: fetchAppointments,
    };
};