import React, { useState } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !email || !password) {
            setError('Please fill out all fields.');
            setSuccess(null);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/admin/register', {
                username,
                email,
                password,
            });

            setSuccess('Registration successful! Please log in.');
            setError(null);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            // Enhanced error handling
            const errorMessage = err.response ? err.response.data.message : 'Error occurred. Please try again.';
            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '50px 20px' }}>
            <Typography variant="h5" style={{ fontFamily: 'Quicksand', marginBottom: '20px' }}>Admin Register</Typography>

            {error && <Alert severity="error" style={{ marginBottom: '15px' }}>{error}</Alert>}
            {success && <Alert severity="success" style={{ marginBottom: '15px' }}>{success}</Alert>}

            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '15px' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '15px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '15px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ borderRadius: '20px', padding: '10px' }}
                onClick={handleRegister}
            >
                Register
            </Button>
        </div>
    );
};

export default Register;
