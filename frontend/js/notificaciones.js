/* Obtenemos las solicitudes de amistad de un usuario */
const obtenerNotificacion = async () => {
  try {
      const response = await fetch(`http://localhost:3000/solicitud`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
          'Content-Type': 'application/json'           
        },
      });
      response.json().then(data => {
        console.log(data);
          data.forEach(solicitud => {
            renderSolicitud(solicitud);
          });
      });
  } catch (err) {
      console.log(err);
  }
}

/* Desplegamos en pantalla cada solicitud */
const renderSolicitud = (solicitud) => {
  const contNotificaciones = document.getElementById('contNotificaciones');
  const card = document.createElement('div');
  card.className = 'card-notificacion'

  const img = document.createElement('img');
  img.src = `./assets/profile-img/${solicitud.foto}`;
  img.className = 'img-notificacion';
  card.appendChild(img);

  const h5 = document.createElement('h5');
  h5.innerHTML = solicitud.nombre + ' ' + solicitud.apellido
  card.appendChild(h5);

  const divBotones = document.createElement('div');

  const aceptarBtn = document.createElement('button');
  aceptarBtn.innerHTML = 'Aceptar';
  aceptarBtn.className = 'btn btn-success';
  aceptarBtn.setAttribute('onclick', `aceptarAmistad(${solicitud.id})`);
  divBotones.appendChild(aceptarBtn);

  const rechazarBtn = document.createElement('button');
  rechazarBtn.innerHTML = 'Rechazar';
  rechazarBtn.className = 'btn btn-danger';
  rechazarBtn.setAttribute('onclick', `rechazarAmistad(${solicitud.id})`);
  divBotones.appendChild(rechazarBtn);

  card.appendChild(divBotones);

  contNotificaciones.appendChild(card);
}

/* El usuario acepta una solicitud */
const aceptarAmistad = async (id_solicitante) => {
  console.log(id_solicitante);
  const data = { id_solicitante };
  try {
      const response = await fetch('http://localhost:3000/amistad', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
          'Content-Type': 'application/json'           
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
          window.location.reload(true);
      } else {
          response.json().then(json => {
              alert(json);
              return;
          });
      }
  } catch (err) {
      console.log(err);
  }
}

/* El usuario rechaza una solicitud */
const rechazarAmistad = async (id_solicitante) => {
  try {
      const response = await fetch(`http://localhost:3000/amistad/${id_solicitante}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
          'Content-Type': 'application/json'           
        },
      });
      if (response.status === 200) {
          window.location.reload(true);
      } else {
          response.json().then(json => {
              alert(json);
              return;
          });
      }
  } catch (err) {
      console.log(err);
  }
}

obtenerNotificacion();