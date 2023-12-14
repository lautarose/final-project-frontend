import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { grey, green } from '@mui/material/colors';

const cookies = new Cookies();

const Navbar = () => {
  
  const userToken = cookies.get('user');

  const handleLogout = () => {
    cookies.remove('user'); // Eliminar la cookie 'user'
    window.location.replace('/'); // Redirigir al home
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Anotador
        </Typography>
        {userToken ? (
          // Elementos que se mostrarán si el usuario está logueado
          <div>
             <Button onClick={handleLogout} sx={{ color: 'black',  display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100px', backgroundColor: 'white', border: `2px solid blue`, borderRadius: '4px', textDecoration: 'none', padding: '8px 16px', transition: 'transform 0.3s', '&:hover': { backgroundColor: 'green',color: grey[300], borderColor: green[500], transform: 'scale(1.02)' }}}>
              LOGOUT
            </Button>
          </div>
        ) : (
          // Elementos que se mostrarán si el usuario no está logueado
          <>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'black',  display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100px', backgroundColor: 'white', border: `2px solid blue`, borderRadius: '4px', textDecoration: 'none', padding: '8px 16px', transition: 'transform 0.3s', '&:hover': { backgroundColor: 'green',color: grey[300], borderColor: green[500], transform: 'scale(1.02)' }}}>
              LOGIN
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'black',  display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100px', backgroundColor: 'white', border: `2px solid blue`, borderRadius: '4px', textDecoration: 'none', padding: '8px 16px', transition: 'transform 0.3s', '&:hover': { backgroundColor: 'green',color: grey[300], borderColor: green[500], transform: 'scale(1.02)' }}}>
              SIGNUP
            </Button>
          </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  </Box>
  );
};

export default Navbar;