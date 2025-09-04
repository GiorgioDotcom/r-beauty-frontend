import React, {useState, useEffect} from 'react';
import {useAppointments} from '@/hooks/useAppointments.ts';
import {Service} from '@/types';
import {BRAND_COLORS} from '@/utils/constants.ts';
import {Calendar, Clock, CheckCircle} from 'lucide-react';
import ServicesPage from './ServicesPage.tsx';
import {format, addDays, isAfter, isBefore, startOfDay} from 'date-fns';
import {it} from 'date-fns/locale';

interface BookingPageProps {
    onNavigate: (view: string) => void,
    onComplete?: () => void
}

const BookingPage: React.FC<BookingPageProps> = ({onNavigate, onComplete}) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [bookingStep, setBookingStep] = useState<'service' | 'date' | 'time' | 'confirm'>('service');
    const [notes, setNotes] = useState<string>('');

    const {
        createAppointment,
        getAvailableSlots,
        loading,
        error
    } = useAppointments();

    // Carica gli slot disponibili quando cambia la data o il servizio
    useEffect(() => {
        const loadAvailableSlots = async () => {
            if (selectedDate && selectedService) {
                try {
                    const slots = await getAvailableSlots(selectedDate, selectedService._id);
                    setAvailableSlots(slots);
                } catch (err) {
                    console.error('Errore nel caricamento degli slot:', err);
                    setAvailableSlots([]);
                }
            }
        };

        loadAvailableSlots();
    }, [selectedDate, selectedService, getAvailableSlots]);

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        setBookingStep('date');
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setSelectedTime('');
        setBookingStep('time');
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setBookingStep('confirm');
    };

    const handleConfirmBooking = async () => {
        if (!selectedService || !selectedDate || !selectedTime) return;

        try {
            await createAppointment({
                serviceId: selectedService._id,
                date: selectedDate,
                startTime: selectedTime,
                notes: notes.trim() || undefined,
            });

            // Reset form and navigate to appointments
            resetBookingForm();
            onNavigate('appointments');
        } catch (err) {
            console.error('Errore nella prenotazione:', err);
        }
    };

    const resetBookingForm = () => {
        setSelectedService(null);
        setSelectedDate('');
        setSelectedTime('');
        setAvailableSlots([]);
        setNotes('');
        setBookingStep('service');
    };

    const goBack = () => {
        switch (bookingStep) {
            case 'date':
                setBookingStep('service');
                setSelectedService(null);
                break;
            case 'time':
                setBookingStep('date');
                setSelectedTime('');
                break;
            case 'confirm':
                setBookingStep('time');
                break;
        }
    };

    // Genera le date disponibili (prossimi 30 giorni)
    const getAvailableDates = () => {
        const dates = [];
        const today = startOfDay(new Date());

        for (let i = 1; i <= 30; i++) {
            const date = addDays(today, i);
            // Esclude le domeniche per ora (logica business da personalizzare)
            if (date.getDay() !== 0) {
                dates.push(date);
            }
        }

        return dates;
    };

    if (bookingStep === 'service') {
        return (
            <div className="space-y-4">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Prenota il tuo Servizio</h2>
                    <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{backgroundColor: BRAND_COLORS.primary}}
                            >
                                1
                            </div>
                            <span className="ml-2 text-sm font-medium">Servizio</span>
                        </div>
                        <div className="flex items-center opacity-50">
                            <div
                                className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold">
                                2
                            </div>
                            <span className="ml-2 text-sm">Data</span>
                        </div>
                        <div className="flex items-center opacity-50">
                            <div
                                className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold">
                                3
                            </div>
                            <span className="ml-2 text-sm">Orario</span>
                        </div>
                    </div>
                </div>

                <ServicesPage
                    onSelectService={handleServiceSelect}
                    selectedService={selectedService}
                    showSelection={true}
                />
            </div>
        );
    }

    if (bookingStep === 'date') {
        return (
            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Seleziona Data</h2>
                    <button
                        onClick={goBack}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        ← Indietro
                    </button>
                </div>

                <div
                    className="p-4 rounded-lg"
                    style={{backgroundColor: 'rgba(180, 147, 138, 0.1)'}}
                >
                    <h3 className="font-medium text-gray-800">{selectedService?.name}</h3>
                    <p className="text-sm text-gray-600">€{selectedService?.price} - {selectedService?.duration} min</p>
                </div>

                <div className="space-y-3">
                    {getAvailableDates().map(date => (
                        <button
                            key={date.toISOString()}
                            onClick={() => handleDateSelect(format(date, 'yyyy-MM-dd'))}
                            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                            style={{borderColor: '#d4b5a3'}}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">
                                        {format(date, 'EEEE d MMMM', {locale: it})}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {format(date, 'yyyy')}
                                    </div>
                                </div>
                                <Calendar size={20} style={{color: BRAND_COLORS.primary}}/>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (bookingStep === 'time') {
        return (
            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Seleziona Orario</h2>
                    <button
                        onClick={goBack}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        ← Indietro
                    </button>
                </div>

                <div
                    className="p-4 rounded-lg"
                    style={{backgroundColor: 'rgba(180, 147, 138, 0.1)'}}
                >
                    <h3 className="font-medium text-gray-800">{selectedService?.name}</h3>
                    <p className="text-sm text-gray-600">
                        {format(new Date(selectedDate), 'EEEE d MMMM yyyy', {locale: it})}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Orari Disponibili</h3>
                    {availableSlots.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                            Nessun orario disponibile per questa data
                        </p>
                    ) : (
                        <div className="grid grid-cols-3 gap-2">
                            {availableSlots.map(time => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    className="p-3 border rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
                                    style={{borderColor: '#d4b5a3'}}
                                >
                                    <Clock size={16} className="inline mr-2"/>
                                    {time}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (bookingStep === 'confirm') {
        return (
            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Conferma Prenotazione</h2>
                    <button
                        onClick={goBack}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        ← Indietro
                    </button>
                </div>

                <div
                    className="p-4 rounded-lg border-2"
                    style={{
                        backgroundColor: 'rgba(180, 147, 138, 0.1)',
                        borderColor: BRAND_COLORS.primary
                    }}
                >
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <CheckCircle size={20} className="mr-2" style={{color: BRAND_COLORS.primary}}/>
                        Riepilogo Prenotazione
                    </h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Servizio:</span>
                            <span className="font-medium">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Data:</span>
                            <span className="font-medium">
                {format(new Date(selectedDate), 'EEEE d MMMM yyyy', {locale: it})}
              </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Orario:</span>
                            <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Durata:</span>
                            <span className="font-medium">{selectedService?.duration} min</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                            <span>Prezzo:</span>
                            <span
                                className="font-bold text-lg"
                                style={{color: BRAND_COLORS.primary}}
                            >
                €{selectedService?.price}
              </span>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note aggiuntive (opzionale)
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Inserisci eventuali note o richieste specifiche..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                        style={{borderColor: '#d4b5a3'}}
                        rows={3}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <button
                    onClick={handleConfirmBooking}
                    disabled={loading}
                    className="w-full text-white p-4 rounded-xl font-medium hover:opacity-90 transition-colors disabled:opacity-50"
                    style={{backgroundColor: BRAND_COLORS.primary}}
                >
                    {loading ? 'Prenotazione in corso...' : 'Conferma Prenotazione'}
                </button>
            </div>
        );
    }

    return null;
};

export default BookingPage;