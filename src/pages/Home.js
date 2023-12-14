import React, { useState, useEffect , useNavigate } from 'react';
import { Box, Grid, Button, TextField } from "@mui/material";
import Activity from '../Components/Activity'
import Navbar from '../Components/NavBar';
import Cookies from "universal-cookie";

const Cookie = new Cookies();

const Home = () => {
  const userToken = Cookie.get('user');
  const url = "https://project-activities-backend-ycwl2yaekq-rj.a.run.app/activities/user";
  const activityPostUrl = "https://project-activities-backend-ycwl2yaekq-rj.a.run.app/activity";
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewActivity({
      ...newActivity,
      [name]: value
    });
  };

  const reload = () => {
    window.location.reload()
  };

  const handleCreateActivity = () => {
    fetch(activityPostUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newActivity.title,
        description: newActivity.description
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      reload();
      return response.json();
    })
    .catch(error => {
      console.error('Error creating activity:', error);
    });
    setShowForm(false);
  };
  
  

  

  const fetchActivities = () => {
    if (!userToken) {
      console.error('Token not found');
      return;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data === null) {
        setActivities([]);
      } else {
        setActivities(data);
      }
    })
    .catch(error => {
      console.error('Error fetching activities:', error);
    });
  };

  useEffect(() => {
    fetchActivities(); // Realiza la primera llamada al cargar la página
  }, [userToken]); // Dependencia de useEffect

  return (
    <div>
      <Navbar />
      <br />
      <Box sx={{ margin: '0 auto', maxWidth: 1000 }}>
        {activities === null ? (
          <h2>Hubo un problema al cargar las actividades</h2>
        ) : activities.length === 0 ? (
          <h2>No hay actividades</h2>
        ) : (
          <Grid container spacing={2}>
            {activities.map(activity => (
              <Grid item xs={12} sm={6} key={activity.ActivityID}>
                <Activity
                  Id={activity.ActivityID}
                  Title={activity.Title}
                  Description={activity.Description}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <br/>

        {Cookie.get('user') !== '' && (
          <div>
            <Button onClick={() => setShowForm(true)}>
              Nueva Tarea
            </Button>
            {showForm && (
            <form>
              <TextField
                name="title"
                label="Título"
                value={newActivity.title}
                onChange={handleInputChange}
              />
              <br />
              <TextField
                name="description"
                label="Descripción"
                value={newActivity.description}
                onChange={handleInputChange}
              />
              <br />
              <Button onClick={handleCreateActivity}>Crear</Button>
              {showForm && (
                <Button onClick={() => setShowForm(false)}>Cancelar</Button>
              )}
            </form>
          )}

          </div>
        )}
      </Box>
    </div>
  );
};

export default Home;

