import React, { useState } from 'react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UserApi from '../api/userApi';
import { useNavigate } from 'react-router-dom'; // For navigation after login

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState(''); // Changed from email to username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (username === '' || password === '') {
            setError('Please enter both username and password.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await UserApi.login({
                username,
                password
            });

            if (response.error) {
                setError(response.error || 'Login failed. Please try again.');
            } else {
                // Login successful
                // Store the token (you might want to use context or state management)
                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                }
                
                // Redirect to dashboard or home page
                navigate('/dashboard');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            p: 2
        }}>
            <Paper elevation={3} sx={{
                width: '100%',
                maxWidth: 400,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 2
            }}>
                <Typography variant="h4" component="h1" sx={{ 
                    mb: 2,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'center'
                }}>
                    BookHive
                </Typography>
                
                <Typography variant="h6" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
                    Welcome back! Please login
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Username" // Changed from Email to Username
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        error={!!error}
                        disabled={isLoading}
                    />
                    
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={!!error}
                        disabled={isLoading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 2, py: 1.5 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href="/register" variant="body2" underline="hover">
                            Create account
                        </Link>
                        <Link href="/forgot-password" variant="body2" underline="hover">
                            Forgot password?
                        </Link>
                    </Box>
                    
                    <Divider sx={{ my: 2 }}>or</Divider>
                    
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ py: 1.5 }}
                        onClick={() => alert('Google login coming soon')}
                        disabled={isLoading}
                    >
                        Continue with Google
                    </Button>
                </Box>
            </Paper>
            
            <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
                © {new Date().getFullYear()} BookHive. All rights reserved.
            </Typography>
        </Box>
    );
};

export default LoginPage;