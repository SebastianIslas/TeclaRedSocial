
crearAmistad = async (id_solicitante) => {
  const data = { id_solicitante };
  api.fetchPost(window.location.reload(true), data, 'amistad');
}

const obtenerSolicitudes = async () => {
  const response = await api.fetchGet('solicitud');
  response.json().then(data => {
    if (data.length > 0) {
      document.getElementById('contNotificaciones').innerHTML = '';
      data.forEach(solicitud => {
          renderSolicitud(solicitud);
      });            
    }   
  });
}

/* Desplegamos en pantalla cada solicitud */
const renderSolicitud = (solicitud) => {
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
  aceptarBtn.setAttribute('onclick', `crearAmistad(${solicitud.id})`);
  divBotones.appendChild(aceptarBtn);

  const rechazarBtn = document.createElement('button');
  rechazarBtn.innerHTML = 'Rechazar';
  rechazarBtn.className = 'btn btn-danger';
  rechazarBtn.setAttribute('onclick', `rechazarSolicitud(${solicitud.id})`);
  divBotones.appendChild(rechazarBtn);

  card.appendChild(divBotones);

  contNotificaciones.appendChild(card);
}

const rechazarSolicitud = (id) => {
  api.fetchDelete(`solicitud/rechazar/${id}`);
  window.location.reload(true);
}

obtenerSolicitudes();
