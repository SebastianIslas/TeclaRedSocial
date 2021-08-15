/* Funcion encargada de loggera a un usuario */
const login = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = { email, password };
    fetchLogin(data);
}

/* Funcion que interactua con el servidor para loggear a un usuario*/
const fetchLogin = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
           
          },
          body: JSON.stringify(data)
        });
        if (response.status === 200) {
            response.json().then(data => {
                document.cookie = `token=${data}`; //Si el inicio de sesion fue exitoso, guardamos el token en una cookie
            });
            window.location.replace("./mi-perfil.html");
        } else {
            response.json().then(data => {
                alert(data); //Si el inicio de sesion fracaso, mostramos la alerta en pantalla
                return;
            });
        }
    } catch (err) {
        console.log(err);
    }
}