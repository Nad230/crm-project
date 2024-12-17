import React, { useState } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  // Import useAuth hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();  // Get the login function from context

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Call login function from AuthContext
      login(); // Set logged-in state to true

      navigate('/home'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '50px 20px' }}>
      <Typography variant="h5" style={{ fontFamily: 'Quicksand', marginBottom: '20px' }}>
        Admin Login
      </Typography>

      {error && <Alert severity="error" style={{ marginBottom: '15px' }}>{error}</Alert>}

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
        onClick={handleLogin}
      >
        Login
      </Button>

      <Typography
        variant="body2"
        style={{
          marginTop: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          color: 'blue',
          textDecoration: 'underline',
        }}
        onClick={() => navigate('/register')}
      >
        Don't have an account? Register here
      </Typography>
    </div>
  );
};

export default Login;
