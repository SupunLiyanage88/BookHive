// src/api/rentsApi.ts

export interface RentalEntity {
  rentalId: number;
  bookId: number;
  username: string;
  rentalDate: string;
  returnDate: string;
}

export interface RentalRequestDTO {
  bookId: number;
  username: string;
  rentalDate?: string;
  returnDate?: string;
}

export interface RentalResponseDTO {
  rentalId?: number;
  bookId?: number;
  username?: string;
  rentalDate?: string;
  returnDate?: string;
  error?: string;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    // Handle unauthorized (redirect to login, etc.)
    throw new Error('Authentication required');
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }
  
  return response.json();
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

export const fetchAllRentals = async (): Promise<RentalEntity[]> => {
  try {
    return await fetchWithAuth('/api/rentals/all');
  } catch (error) {
    console.error('Error fetching rentals:', error);
    throw error;
  }
};

export const fetchRentalById = async (id: number): Promise<RentalEntity> => {
  try {
    return await fetchWithAuth(`/api/rentals/${id}`);
  } catch (error) {
    console.error(`Error fetching rental with id ${id}:`, error);
    throw error;
  }
};

export const addRental = async (rentalData: RentalRequestDTO): Promise<RentalResponseDTO> => {
  try {
    return await fetchWithAuth('/api/rentals/add', {
      method: 'POST',
      body: JSON.stringify(rentalData),
    });
  } catch (error) {
    console.error('Error adding rental:', error);
    throw error;
  }
};

export const updateRental = async (id: number, rentalData: RentalRequestDTO): Promise<RentalResponseDTO> => {
  try {
    return await fetchWithAuth(`/api/rentals/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(rentalData),
    });
  } catch (error) {
    console.error(`Error updating rental with id ${id}:`, error);
    throw error;
  }
};