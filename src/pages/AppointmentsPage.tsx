import React, {useEffect, useState} from "react";
import {Appointment} from "@/types";
import {Calendar, Clock, Package} from "lucide-react";

interface MyAppointmentsProps {
    onNavigate?: (view: string) => void
}

export const MyAppointments: React.FC = ({onNavigate}: MyAppointmentsProps) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    // Simuliamo i metodi dell'hook
    const fetchUserAppointments = async () => {
        setLoading(true);
        setTimeout(() => {
            setAppointments([]);
            setLoading(false);
        }, 500);
    };

    const cancelAppointment = async (id: string) => {
        if (confirm('Sei sicura di voler cancellare questo appuntamento?')) {
            // Simulazione cancellazione
            setAppointments(prev => prev.filter(a => a._id !== id));
        }
    };

    useEffect(() => {
        fetchUserAppointments();
    }, []);

    const upcomingAppointments = appointments.filter(a =>
        new Date(a.date) >= new Date() && a.status !== 'cancelled'
    );
    const pastAppointments = appointments.filter(a =>
        new Date(a.date) < new Date() || a.status === 'cancelled'
    );

    const displayedAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">I Miei Appuntamenti</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`pb-2 px-1 ${
                        activeTab === 'upcoming'
                            ? 'border-b-2 font-semibold'
                            : 'text-gray-600'
                    }`}
                    style={{borderColor: activeTab === 'upcoming' ? '#a4817a' : 'transparent'}}
                >
                    Prossimi ({upcomingAppointments.length})
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`pb-2 px-1 ${
                        activeTab === 'past'
                            ? 'border-b-2 font-semibold'
                            : 'text-gray-600'
                    }`}
                    style={{borderColor: activeTab === 'past' ? '#a4817a' : 'transparent'}}
                >
                    Passati ({pastAppointments.length})
                </button>
            </div>

            {/* Appointments List */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="animate-pulse">Caricamento...</div>
                </div>
            ) : displayedAppointments.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                        {activeTab === 'upcoming'
                            ? 'Non hai appuntamenti in programma'
                            : 'Non hai appuntamenti passati'}
                    </p>
                    {activeTab === 'upcoming' && (
                        <button
                            className="px-6 py-2 rounded-lg text-white"
                            style={{backgroundColor: '#a4817a'}}
                        >
                            Prenota Ora
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid gap-4">
                    {displayedAppointments.map(appointment => (
                        <div key={appointment._id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-gray-500"/>
                                        <span className="font-semibold">
                                            {new Date(appointment.date).toLocaleDateString('it-IT', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-gray-500"/>
                                        <span>{appointment.startTime} - {appointment.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="w-4 h-4 text-gray-500"/>
                                        <span>
                                            {typeof appointment.service === 'object'
                                                ? appointment.service.name
                                                : 'Servizio'}
                                        </span>
                                    </div>
                                    {appointment.notes && (
                                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                                            {appointment.notes}
                                        </div>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-600 mb-2">
                                        €{appointment.price}
                                    </p>
                                    {activeTab === 'upcoming' && appointment.status !== 'cancelled' && (
                                        <button
                                            onClick={() => cancelAppointment(appointment._id)}
                                            className="text-red-600 text-sm hover:text-red-800"
                                        >
                                            Cancella
                                        </button>
                                    )}
                                    {appointment.status === 'cancelled' && (
                                        <span className="text-red-600 text-sm">Cancellato</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};