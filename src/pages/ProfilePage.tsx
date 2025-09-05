import {useState} from "react";
import {ServicesPage} from "@/pages/ServicesPage.tsx";
import {BookingPage} from "@/pages/BookingPage.tsx";
import {AdminDashboard} from "@/pages/AdminPage.tsx";
import {MyAppointments} from "@/pages/AppointmentsPage.tsx";

export const Profile: React.FC = () => {
    // Simuliamo i dati utente
    const user = {
        name: 'Maria Rossi',
        email: 'maria.rossi@example.com',
        phone: '+39 333 1234567',
        role: 'client',
        preferences: {
            notifications: {
                email: true,
                sms: false
            }
        }
    };

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    const handleSave = () => {
        // Simulazione salvataggio
        setEditing(false);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Il Mio Profilo</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Informazioni Personali</h2>
                    <button
                        onClick={() => editing ? handleSave() : setEditing(true)}
                        className="px-4 py-2 rounded-lg text-white"
                        style={{ backgroundColor: '#a4817a' }}
                    >
                        {editing ? 'Salva' : 'Modifica'}
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            disabled={!editing}
                            className="w-full p-2 border rounded-lg disabled:bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={!editing}
                            className="w-full p-2 border rounded-lg disabled:bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefono
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            disabled={!editing}
                            className="w-full p-2 border rounded-lg disabled:bg-gray-50"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Preferenze Notifiche</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.preferences.notifications.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    preferences: {
                                        ...formData.preferences,
                                        notifications: {
                                            ...formData.preferences.notifications,
                                            email: e.target.checked
                                        }
                                    }
                                })}
                                disabled={!editing}
                            />
                            <span>Ricevi notifiche via email</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.preferences.notifications.sms}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    preferences: {
                                        ...formData.preferences,
                                        notifications: {
                                            ...formData.preferences.notifications,
                                            sms: e.target.checked
                                        }
                                    }
                                })}
                                disabled={!editing}
                            />
                            <span>Ricevi notifiche via SMS</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export default per test
export default function App() {
    const [currentPage, setCurrentPage] = useState<'services' | 'booking' | 'admin' | 'appointments' | 'profile'>('services');

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow mb-4">
                <div className="p-4 flex gap-4">
                    <button onClick={() => setCurrentPage('services')}>Servizi</button>
                    <button onClick={() => setCurrentPage('booking')}>Prenota</button>
                    <button onClick={() => setCurrentPage('admin')}>Admin</button>
                    <button onClick={() => setCurrentPage('appointments')}>Appuntamenti</button>
                    <button onClick={() => setCurrentPage('profile')}>Profilo</button>
                </div>
            </nav>

            {currentPage === 'services' && <ServicesPage />}
            {currentPage === 'booking' && <BookingPage onComplete={() => setCurrentPage('appointments')} />}
            {currentPage === 'admin' && <AdminDashboard />}
            {currentPage === 'appointments' && <MyAppointments />}
            {currentPage === 'profile' && <Profile />}
        </div>
    );
}