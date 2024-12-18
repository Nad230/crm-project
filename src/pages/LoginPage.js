import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, IconButton, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      const { token, teamMember } = response.data; // Destructure the response
      const { role, fullName } = teamMember; // Extract role and fullName

      // Save token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Call login function from AuthContext and pass the role and fullName
      login(role, fullName); // Pass role and fullName to context

      alert(`${fullName} has logged in as: ${role}`); // Show alert with fullName and role

      navigate('/home'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '50px auto',
        padding: '30px 20px',
        borderRadius: 3,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
      }}
    >
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: '#000',
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Quicksand',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        Admin Login
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2, borderRadius: '4px' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2, borderRadius: '4px' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          borderRadius: '20px',
          padding: '10px',
          backgroundColor: '#3f51b5',
          '&:hover': {
            backgroundColor: '#303f9f',
          },
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
