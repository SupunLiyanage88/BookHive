export interface Book {
  bookId: number;
  title: string;
  author: string;
  genre: string;
  status: string;
}

export interface BookRequestDTO {
  title: string;
  author: string;
  genre: string;
  status: string;
}

export interface BookResponseDTO {
  bookId?: number;
  title?: string;
  author?: string;
  genre?: string;
  status?: string;
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

export const fetchAllBooks = async (): Promise<Book[]> => {
  try {
    return await fetchWithAuth('/api/books/all');
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookById = async (id: number): Promise<Book> => {
  try {
    return await fetchWithAuth(`/api/books/${id}`);
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

export const addBook = async (bookData: BookRequestDTO): Promise<BookResponseDTO> => {
  try {
    return await fetchWithAuth('/api/books/add', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (id: number, bookData: BookRequestDTO): Promise<BookResponseDTO> => {
  try {
    return await fetchWithAuth(`/api/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id: number): Promise<BookResponseDTO> => {
  try {
    return await fetchWithAuth(`/api/books/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};

export const updateBookStatus = async (bookId: number, status: string): Promise<BookResponseDTO> => {
  try {
    return await fetchWithAuth(`/api/books/${bookId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    console.error(`Error updating status for book with id ${bookId}:`, error);
    throw error;
  }
};