import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme , ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const SignupForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      last_name: lastName,
      email,
      user_name: userName,
      password,
    };

    // Aquí puedes hacer la llamada POST a tu backend
    // utilizando fetch, axios u otra librería de tu elección

    fetch('https://project-users-backend-ycwl2yaekq-rj.a.run.app/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Usuario registrado correctamente.',
            icon: 'success'
          }).then(() => {
            // Redirigir al home después de hacer clic en el botón "OK"
            window.location.replace("/");
          });
        } else {
          // Error en el registro
          Swal.fire('Error', 'No se pudo registrar el usuario.', 'error');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Hubo un problema al realizar el registro.', 'error');
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                    label="Nombre"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Apellido"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nombre de usuario"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
            </Grid >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleFormSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;