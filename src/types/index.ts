// Mantieni consistenza con il backend
export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'client' | 'admin';
    isActive: boolean;
    preferences: {
        notifications: {
            email: boolean;
            sms: boolean;
        };
        language: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Service {
    _id: string;
    name: string;
    category: ServiceCategory;
    description?: string;
    price: number;
    duration: number; // minutes
    isActive: boolean;
    images: string[];
    requirements: string[];
    aftercare: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Appointment {
    _id: string;
    client: User | string;
    service: Service | string;
    date: string;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    notes?: string;
    price: number;
    reminderSent: boolean;
    createdBy: User | string;
    createdAt: string;
    updatedAt: string;
}

export enum ServiceCategory {
    FACIAL = 'Trattamenti Viso',
    BODY = 'Trattamenti Corpo',
    MANICURE = 'Manicure',
    PEDICURE = 'Pedicure',
    LASHES = 'Ciglia',
    WAXING = 'Ceretta'
}

export enum AppointmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    NO_SHOW = 'no_show'
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    totalPages: number;
    currentPage: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
}