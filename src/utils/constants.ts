export const BRAND_COLORS = {
    primary: '#a4817a',
    primaryLight: '#b5938a',
    primaryDark: '#8a6b5e',
    background: '#f9f9f9',
    white: '#ffffff',
} as const;

export const APPOINTMENT_STATUS_COLORS = {
    pending: '#f59e0b',
    confirmed: '#10b981',
    completed: '#6b7280',
    cancelled: '#ef4444',
    no_show: '#ef4444',
} as const;

export const APPOINTMENT_STATUS_LABELS = {
    pending: 'In Attesa',
    confirmed: 'Confermata',
    completed: 'Completata',
    cancelled: 'Cancellata',
    no_show: 'Non Presentato',
} as const;