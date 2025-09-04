import { ApiResponse, PaginatedResponse, Service, Appointment, DashboardStats } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;
        const token = localStorage.getItem('r-beauty-token');

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Auth methods
    async login(email: string, password: string) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async register(userData: {
        name: string;
        email: string;
        password: string;
        phone?: string;
    }) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async getProfile() {
        return this.request('/auth/me');
    }

    // Services methods
    async getServices(): Promise<ApiResponse<{ services: Record<string, Service[]> }>> {
        return this.request('/services');
    }

    async getService(id: string): Promise<ApiResponse<Service>> {
        return this.request(`/services/${id}`);
    }

    async createService(serviceData: {
        name: string;
        category: string;
        description?: string;
        price: number;
        duration: number;
    }) {
        return this.request('/services', {
            method: 'POST',
            body: JSON.stringify(serviceData),
        });
    }

    async updateService(id: string, serviceData: Partial<Service>) {
        return this.request(`/services/${id}`, {
            method: 'PUT',
            body: JSON.stringify(serviceData),
        });
    }

    async deleteService(serviceId: string) {
        return this.request(`/services/${serviceId}`, {
            method: 'DELETE',
        });
    }

    // Appointments methods
    async getAvailableSlots(date: string, serviceId: string) {
        return this.request(`/appointments/available-slots/${date}?serviceId=${serviceId}`);
    }

    async createAppointment(appointmentData: {
        serviceId: string;
        date: string;
        startTime: string;
        notes?: string;
    }) {
        return this.request('/appointments', {
            method: 'POST',
            body: JSON.stringify(appointmentData),
        });
    }

    async getUserAppointments(page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
        return this.request(`/appointments/my-appointments?page=${page}&limit=${limit}`);
    }

    async cancelAppointment(appointmentId: string) {
        return this.request(`/appointments/${appointmentId}/cancel`, {
            method: 'PATCH',
        });
    }

    // Admin methods
    async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
        return this.request('/admin/dashboard');
    }

    async getAllAppointments(params?: {
        page?: number;
        limit?: number;
        date?: string;
        status?: string;
    }): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
        const queryString = params ? new URLSearchParams(params as any).toString() : '';
        return this.request(`/admin/appointments?${queryString}`);
    }

    async updateAppointmentStatus(id: string, status: string) {
        return this.request(`/admin/appointments/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
    }

    async getAllClients() {
        return this.request('/admin/clients');
    }

    async getBusinessSettings() {
        return this.request('/admin/settings');
    }

    async updateBusinessSettings(settings: any) {
        return this.request('/admin/settings', {
            method: 'PUT',
            body: JSON.stringify(settings),
        });
    }
}

export const apiClient = new ApiClient();