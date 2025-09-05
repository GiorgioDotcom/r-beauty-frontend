import {useEffect, useState} from "react";
import {Appointment} from "@/types";
import {
    AlertCircle,
    Calendar,
    CheckCircle, ChevronLeft, ChevronRight,
    Clock,
    Edit,
    Euro,
    Eye,
    Filter,
    Package,
    Plus, Trash2,
    User,
    XCircle
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [stats, setStats] = useState({
        todayAppointments: 0,
        thisMonthAppointments: 0,
        totalClients: 0,
        totalServices: 0,
        monthlyRevenue: 0
    });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Simuliamo fetchAllAppointments dall'hook useAppointments
    const fetchAllAppointments = async (params?: any) => {
        setLoading(true);
        // Simulazione fetch
        setTimeout(() => {
            setAppointments([]);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        fetchAllAppointments();
    }, [currentPage]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'text-green-600';
            case 'pending': return 'text-yellow-600';
            case 'cancelled': return 'text-red-600';
            case 'completed': return 'text-gray-600';
            default: return 'text-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <AlertCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Oggi</p>
                            <p className="text-2xl font-bold">{stats.todayAppointments}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Questo Mese</p>
                            <p className="text-2xl font-bold">{stats.thisMonthAppointments}</p>
                        </div>
                        <Clock className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Clienti</p>
                            <p className="text-2xl font-bold">{stats.totalClients}</p>
                        </div>
                        <User className="w-8 h-8 text-purple-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Servizi</p>
                            <p className="text-2xl font-bold">{stats.totalServices}</p>
                        </div>
                        <Package className="w-8 h-8 text-orange-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Incasso Mese</p>
                            <p className="text-2xl font-bold">€{stats.monthlyRevenue}</p>
                        </div>
                        <Euro className="w-8 h-8 text-green-600" />
                    </div>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Appuntamenti</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Nuovo
                            </button>
                            <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filtra
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Cliente</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Servizio</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Orario</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stato</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Prezzo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Azioni</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y">
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                    Nessun appuntamento trovato
                                </td>
                            </tr>
                        ) : (
                            appointments.map(appointment => (
                                <tr key={appointment._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm">
                                        {new Date(appointment.date).toLocaleDateString('it-IT')}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {typeof appointment.client === 'object' ? appointment.client.name : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {typeof appointment.service === 'object' ? appointment.service.name : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {appointment.startTime} - {appointment.endTime}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                            <span className={`flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                                                {getStatusIcon(appointment.status)}
                                                {appointment.status}
                                            </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold">
                                        €{appointment.price}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-yellow-600 hover:text-yellow-800">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        Pagina {currentPage} di 1
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => p + 1)}
                            disabled={appointments.length === 0}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};