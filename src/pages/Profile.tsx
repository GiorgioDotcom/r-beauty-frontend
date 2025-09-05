import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Profilo</h2>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-4">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{backgroundColor: 'rgba(180, 147, 138, 0.2)'}}
                    >
                        <User style={{color: '#a4817a'}} size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                        <p className="text-xs" style={{ color: '#a4817a' }}>
                            {user?.role === 'admin' ? 'Amministratore' : 'Cliente'}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border transition-colors"
                        style={{borderColor: '#d4b5a3'}}
                    >
                        Modifica Profilo
                    </button>
                    <button
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border transition-colors"
                        style={{borderColor: '#d4b5a3'}}
                    >
                        Notifiche
                    </button>
                    <button
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border transition-colors"
                        style={{borderColor: '#d4b5a3'}}
                    >
                        Privacy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;