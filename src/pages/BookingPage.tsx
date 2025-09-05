import {useState} from "react";

export const BookingPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [selectedService, setSelectedService] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Simuliamo i metodi dell'hook useAppointments
    const getAvailableSlots = async (date: string, serviceId: string) => {
        // Simulazione
        setAvailableSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']);
        return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    };

    const createAppointment = async (data: any) => {
        setLoading(true);
        // Simulazione creazione appuntamento
        setTimeout(() => {
            setLoading(false);
            onComplete();
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createAppointment({
            serviceId: selectedService,
            date: selectedDate,
            startTime: selectedTime,
            notes
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Prenota un Appuntamento</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Servizio
                    </label>
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="">Seleziona un servizio</option>
                        <option value="1">Pulizia Viso - €50</option>
                        <option value="2">Massaggio Rilassante - €70</option>
                        <option value="3">Manicure - €30</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            if (selectedService) {
                                getAvailableSlots(e.target.value, selectedService);
                            }
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>

                {availableSlots.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Orario
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {availableSlots.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedTime(slot)}
                                    className={`p-2 rounded-lg border ${
                                        selectedTime === slot
                                            ? 'bg-rose-100 border-rose-400'
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note (opzionale)
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Aggiungi eventuali note..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !selectedService || !selectedDate || !selectedTime}
                    className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50"
                    style={{ backgroundColor: '#a4817a' }}
                >
                    {loading ? 'Prenotazione in corso...' : 'Conferma Prenotazione'}
                </button>
            </form>
        </div>
    );
};
export default class Booking {
}