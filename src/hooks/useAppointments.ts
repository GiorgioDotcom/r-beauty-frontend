import { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus } from '@/types';
import { apiClient } from '@/services/api';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return {
        appointments,
        loading,
        error,
        cancelAppointment,
        refetch: fetchUserAppointments,
        fetchUserAppointments, // Esporto anche con il nome specifico per compatibilità
    };
};