import React, { useState, useEffect } from 'react';
import { useServices } from '@/hooks/useServices.ts';
import { useAppointments } from '@/hooks/useAppointments.ts';
import { Service, ServiceCategory, Appointment } from '@/types';
import { BRAND_COLORS } from '@/utils/constants.ts';
import {
    Plus,
    Trash2,
    Ban,
    X,
    Calendar,
    Clock,
    Users,
    DollarSign,
    TrendingUp,
    RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'services' | 'settings'>('dashboard');

    // Modals state
    const [showAddService, setShowAddService] = useState(false);
    const [showBlockDays, setShowBlockDays] = useState(false);

    // Form states
    const [newService, setNewService] = useState({
        name: '',
        category: '' as ServiceCategory | '',
        description: '',
        price: '',
        duration: ''
    });
    const [blockDate, setBlockDate] = useState('');
    const [closedDays, setClosedDays] = useState<string[]>(['2025-01-01', '2025-12-25']);

    const { services, loading: servicesLoading, createService, deleteService } = useServices();
    const { appointments, loading: appointmentsLoading, fetchAllAppointments } = useAppointments();

    useEffect(() => {
        if (activeTab === 'appointments') {
            fetchAllAppointments();
        }
    }, [activeTab, fetchAllAppointments]);

    // Dashboard stats
    const dashboardStats = {
        totalAppointments: appointments.length,
        todayAppointments: appointments.filter(apt => {
            const today = format(new Date(), 'yyyy-MM-dd');
            return apt.date === today;
        }).length,
        totalRevenue: appointments
            .filter(apt => apt.status === 'completed')
            .reduce((sum, apt) => sum + (typeof apt.service === 'object' ? apt.service.price : apt.price || 0), 0),
        activeServices: services.filter(s => s.isActive).length
    };

    const handleAddService = async () => {
        if (!newService.name || !newService.category || !newService.price || !newService.duration) {
            return;
        }

        try {
            await createService({
                name: newService.name,
                category: newService.category as ServiceCategory,
                description: newService.description || undefined,
                price: parseFloat(newService.price),
                duration: parseInt(newService.duration),
            });

            setNewService({ name: '', category: '', description: '', price: '', duration: '' });
            setShowAddService(false);
        } catch (error) {
            console.error('Errore nella creazione del servizio:', error);
        }
    };

    const handleDeleteService = async (serviceId: string) => {
        if (!confirm('Sei sicuro di voler eliminare questo servizio?')) {
            return;
        }

        try {
            await deleteService(serviceId);
        } catch (error) {
            console.error('Errore nell\'eliminazione del servizio:', error);
        }
    };

    const handleBlockDay = () => {
        if (!blockDate) return;
        setClosedDays([...closedDays, blockDate]);
        setBlockDate('');
        setShowBlockDays(false);
    };

    const handleUnblockDay = (date: string) => {
        setClosedDays(closedDays.filter(d => d !== date));
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

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Pannello Admin</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowAddService(true)}
                        className="text-white px-3 py-2 rounded-lg text-sm hover:opacity-90 transition-colors"
                        style={{backgroundColor: BRAND_COLORS.primary}}
                    >
                        <Plus size={16} className="inline mr-1" />
                        Servizio
                    </button>
                    <button
                        onClick={() => setShowBlockDays(true)}
                        className="text-white px-3 py-2 rounded-lg text-sm hover:opacity-90 transition-colors"
                        style={{backgroundColor: '#6b7280'}}
                    >
                        <Ban size={16} className="inline mr-1" />
                        Chiudi
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {[
                        { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                        { key: 'appointments', label: 'Appuntamenti', icon: Calendar },
                        { key: 'services', label: 'Servizi', icon: Users },
                        { key: 'settings', label: 'Impostazioni', icon: Ban }
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as any)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === key
                                    ? 'border-current text-current'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            style={activeTab === key ? { color: BRAND_COLORS.primary, borderColor: BRAND_COLORS.primary } : {}}
                        >
                            <Icon size={16} className="inline mr-2" />
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center">
                                <Calendar size={24} style={{ color: BRAND_COLORS.primary }} />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-600">Appuntamenti Totali</p>
                                    <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalAppointments}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center">
                                <Clock size={24} style={{ color: BRAND_COLORS.primary }} />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-600">Oggi</p>
                                    <p className="text-2xl font-semibold text-gray-900">{dashboardStats.todayAppointments}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center">
                                <DollarSign size={24} style={{ color: BRAND_COLORS.primary }} />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-600">Ricavi</p>
                                    <p className="text-2xl font-semibold text-gray-900">€{dashboardStats.totalRevenue}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center">
                                <Users size={24} style={{ color: BRAND_COLORS.primary }} />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-600">Servizi Attivi</p>
                                    <p className="text-2xl font-semibold text-gray-900">{dashboardStats.activeServices}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Gestione Appuntamenti</h3>
                        <button
                            onClick={fetchAllAppointments}
                            disabled={appointmentsLoading}
                            className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
                        >
                            <RefreshCw size={20} className={appointmentsLoading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {appointmentsLoading ? (
                        <div className="text-center py-8">
                            <RefreshCw className="animate-spin mx-auto" size={32} style={{ color: BRAND_COLORS.primary }} />
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Nessun appuntamento trovato
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {appointments
                                .sort((a, b) => new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime())
                                .map(appointment => (
                                    <div key={appointment._id} className="bg-white border rounded-lg p-4 shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-800">
                                                        {typeof appointment.service === 'object'
                                                            ? appointment.service.name
                                                            : 'Servizio non disponibile'}
                                                    </h4>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                                                    >
                          {getStatusText(appointment.status)}
                        </span>
                                                </div>

                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p>
                                                        Cliente: {typeof appointment.client === 'object'
                                                        ? appointment.client.name
                                                        : 'Cliente non disponibile'}
                                                    </p>
                                                    <p>
                                                        {format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: it })}
                                                        alle {appointment.startTime}
                                                        {appointment.endTime && ` - ${appointment.endTime}`}
                                                    </p>
                                                    {typeof appointment.service === 'object' && (
                                                        <p>Durata: {appointment.service.duration} min</p>
                                                    )}
                                                    {appointment.notes && (
                                                        <p className="text-gray-500">Note: {appointment.notes}</p>
                                                    )}
                                                </div>

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
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Gestione Servizi</h3>

                    {servicesLoading ? (
                        <div className="text-center py-8">
                            <RefreshCw className="animate-spin mx-auto" size={32} style={{ color: BRAND_COLORS.primary }} />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(
                                services.reduce((acc, service) => {
                                    if (!acc[service.category]) acc[service.category] = [];
                                    acc[service.category].push(service);
                                    return acc;
                                }, {} as Record<string, Service[]>)
                            ).map(([category, categoryServices]) => (
                                <div key={category} className="bg-white border rounded-lg p-4">
                                    <h4 className="font-medium text-gray-800 mb-3">{category}</h4>
                                    <div className="space-y-2">
                                        {categoryServices.map(service => (
                                            <div key={service._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                <div className="flex-1">
                                                    <span className="font-medium">{service.name}</span>
                                                    <div className="text-sm text-gray-500">
                                                        €{service.price} - {service.duration} min
                                                        {service.description && ` - ${service.description}`}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteService(service._id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-700 mb-3">Giorni Chiusi</h3>
                        {closedDays.length === 0 ? (
                            <p className="text-gray-500 text-sm">Nessun giorno chiuso</p>
                        ) : (
                            <div className="space-y-2">
                                {closedDays.map(date => (
                                    <div key={date} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span>{format(new Date(date), 'dd/MM/yyyy')}</span>
                                        <button
                                            onClick={() => handleUnblockDay(date)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal Aggiungi Servizio */}
            {showAddService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Aggiungi Nuovo Servizio</h3>
                        <div className="space-y-3">
                            <select
                                value={newService.category}
                                onChange={(e) => setNewService({...newService, category: e.target.value as ServiceCategory})}
                                className="w-full p-3 border rounded-lg"
                                style={{borderColor: '#d4b5a3'}}
                            >
                                <option value="">Seleziona Categoria</option>
                                {Object.values(ServiceCategory).map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Nome servizio"
                                value={newService.name}
                                onChange={(e) => setNewService({...newService, name: e.target.value})}
                                className="w-full p-3 border rounded-lg"
                                style={{borderColor: '#d4b5a3'}}
                            />

                            <textarea
                                placeholder="Descrizione (opzionale)"
                                value={newService.description}
                                onChange={(e) => setNewService({...newService, description: e.target.value})}
                                className="w-full p-3 border rounded-lg"
                                style={{borderColor: '#d4b5a3'}}
                                rows={2}
                            />

                            <input
                                type="number"
                                placeholder="Prezzo (€)"
                                value={newService.price}
                                onChange={(e) => setNewService({...newService, price: e.target.value})}
                                className="w-full p-3 border rounded-lg"
                                style={{borderColor: '#d4b5a3'}}
                            />

                            <input
                                type="number"
                                placeholder="Durata (minuti)"
                                value={newService.duration}
                                onChange={(e) => setNewService({...newService, duration: e.target.value})}
                                className="w-full p-3 border rounded-lg"
                                style={{borderColor: '#d4b5a3'}}
                            />
                        </div>

                        <div className="flex space-x-2 mt-4">
                            <button
                                onClick={handleAddService}
                                className="flex-1 text-white p-3 rounded-lg hover:opacity-90 transition-colors"
                                style={{backgroundColor: BRAND_COLORS.primary}}
                            >
                                Aggiungi
                            </button>
                            <button
                                onClick={() => setShowAddService(false)}
                                className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Annulla
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Blocca Giorni */}
            {showBlockDays && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Chiudi per Giornata</h3>
                        <input
                            type="date"
                            value={blockDate}
                            onChange={(e) => setBlockDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border rounded-lg mb-4"
                            style={{borderColor: '#d4b5a3'}}
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={handleBlockDay}
                                className="flex-1 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Chiudi Giornata
                            </button>
                            <button
                                onClick={() => setShowBlockDays(false)}
                                className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Annulla
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;