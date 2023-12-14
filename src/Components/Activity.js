import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cookies from 'universal-cookie'; // Importa la librería de cookies que estés utilizando

const Cookie = new Cookies();

export default function Activity({ Id, Title, Description }) {
  const token = Cookie.get('user');

  const reload = () => {
    window.location.reload();
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://project-activities-backend-ycwl2yaekq-rj.a.run.app/activity/${Id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        console.log('Actividad eliminada correctamente');
        reload();
      } else {
        console.error('Hubo un problema al eliminar la actividad');
        // Manejar situaciones de error aquí
      }
    } catch (error) {
      console.error('Error al intentar eliminar la actividad:', error);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {Title}
        </Typography>
        <Typography variant="body2">
          {Description}
        </Typography>        
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={handleDeleteClick}
          style={{
            backgroundColor: '#ff5d3b',
            color: 'white', // Cambia el color del texto a negro
          }}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
}


