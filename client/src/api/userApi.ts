import axios from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    username: string;
  };
  error?: string;
  message?: string;
}

const UserApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, 
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        return { 
          error: error.response?.data?.message || 'Login failed',
          ...error.response?.data
        };
      }
      // Handle other errors
      return { error: 'An unexpected error occurred' };
    }
  },
};

export default UserApi;