import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleLogin from '../service/handleLogin';
import { useAuth } from './AuthContext';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const signin = async ({ username, password }) => {
    try {
      const response = await handleLogin({ username, password });
  
      if (!response.ok) {
        // Check for different response status codes
        if (response.status === 401) {
          throw new Error('Unauthorized: Incorrect username or password');
        } else {
          throw new Error(`Login failed with status: ${response.status}`);
        }
      }
  
      const data = await response.json(); // Parse JSON only if the request was successful
      const token = data.accessToken;
      const roles = data.roles;
  
      // Use AuthContext login method
      login(token, roles);
  
      // Redirect to /coursehub
      navigate('/coursehub');
      console.log('Login successful');
    } catch (error) {
      console.error('Error during login:', error.message);
      setError(error.message); // Display appropriate error message
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box
          component="form"
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => signin({username, password})}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
