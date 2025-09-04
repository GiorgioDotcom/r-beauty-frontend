import React, { useEffect, useState } from 'react';
import { useAppointments } from '@/hooks/useAppointments.ts';
import { Appointment } from '@/types';
import { BRAND_COLORS } from '@/utils/constants.ts';
import { Calendar, Clock, Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface AppointmentsPageProps {
    onNavigate: (view: string) => void;
}

const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ onNavigate }) => {
    const {
        appointments,
        loading,
        error,
        fetchUserAppointments,
        cancelAppointment
    } = useAppointments();

    const [cancellingId, setCancellingId] = useState<string | null>(null);

    useEffect(() => {
        fetchUserAppointments();
    }, [fetchUserAppointments]);

    const handleCancelAppointment = async (appointmentId: string) => {
        if (!confirm('Sei sicura di voler cancellare questa prenotazione?')) {
            return;
        }

        setCancellingId(appointmentId);
        try {
            await cancelAppointment(appointmentId);
        } catch (err) {
            console.error('Errore nella cancellazione:', err);
        } finally {
            setCancellingId(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'text-green-600 bg-green-50';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50';
            case 'cancelled':
                return 'text-red-600 bg-red-50';
            case 'completed':
                return 'text-blue-600 bg-blue-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'Confermato';
            case 'pending':
                return 'In attesa';
            case 'cancelled':
                return 'Cancellato';
            case 'completed':
                return 'Completato';
            default:
                return status;
        }
    };

    const canCancelAppointment = (appointment: Appointment) => {
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
        const now = new Date();
        const hoursDiff = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

        return appointment.status === 'confirmed' && hoursDiff > 24; // Può cancellare solo 24h prima
    };

    if (loading && appointments.length === 0) {
        return (
            <div className="p-4 flex items-center justify-center min-h-64">
                <RefreshCw className="animate-spin" size={32} style={{ color: BRAND_COLORS.primary }} />
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Le Mie Prenotazioni</h2>
                <button
                    onClick={() => fetchUserAppointments()}
                    disabled={loading}
                    className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
                >
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle size={20} className="text-red-600 mr-3 flex-shrink-0" />
                    <div>
                        <p className="text-red-800 font-medium">Errore nel caricamento</p>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {appointments.length === 0 && !loading ? (
                <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Non hai ancora prenotazioni
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Prenota il tuo primo appuntamento per iniziare
                    </p>
                    <button
                        onClick={() => onNavigate('booking')}
                        className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
                        style={{backgroundColor: BRAND_COLORS.primary}}
                    >
                        Prenota Ora
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map(appointment => (
                        <div
                            key={appointment._id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-800">
                                            {typeof appointment.service === 'object'
                                                ? appointment.service.name
                                                : 'Servizio non disponibile'}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                                        >
                      {getStatusText(appointment.status)}
                    </span>
                                    </div>

                                    <div className="space-y-1 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Calendar size={16} className="mr-2" />
                                            <span>
                        {format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: it })}
                      </span>
                                        </div>

                                        <div className="flex items-center">
                                            <Clock size={16} className="mr-2" />
                                            <span>alle {appointment.startTime}</span>
                                            {appointment.endTime && (
                                                <span> - {appointment.endTime}</span>
                                            )}
                                        </div>

                                        {typeof appointment.service === 'object' && (
                                            <div className="text-xs text-gray-500">
                                                Durata: {appointment.service.duration} min
                                            </div>
                                        )}
                                    </div>

                                    {appointment.notes && (
                                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                            <span className="text-gray-500">Note: </span>
                                            <span>{appointment.notes}</span>
                                        </div>
                                    )}

                                    <div className="mt-2">
                    <span
                        className="font-bold text-lg"
                        style={{color: BRAND_COLORS.primary}}
                    >
                      €{typeof appointment.service === 'object'
                        ? appointment.service.price
                        : appointment.price || 0}
                    </span>
                                    </div>
                                </div>

                                {canCancelAppointment(appointment) && (
                                    <button
                                        onClick={() => handleCancelAppointment(appointment._id)}
                                        disabled={cancellingId === appointment._id}
                                        className="ml-4 text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 disabled:opacity-50"
                                        title="Cancella prenotazione"
                                    >
                                        {cancellingId === appointment._id ? (
                                            <RefreshCw size={18} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>
                                )}
                            </div>

                            {!canCancelAppointment(appointment) && appointment.status === 'confirmed' && (
                                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                                    <AlertCircle size={16} className="inline mr-2 text-yellow-600" />
                                    <span className="text-yellow-800">
                    Puoi cancellare fino a 24 ore prima dell'appuntamento
                  </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="pt-4">
                <button
                    onClick={() => onNavigate('booking')}
                    className="w-full text-white p-3 rounded-xl font-medium hover:opacity-90 transition-colors"
                    style={{backgroundColor: BRAND_COLORS.primary}}
                >
                    Prenota Nuovo Appuntamento
                </button>
            </div>
        </div>
    );
};

export default AppointmentsPage;