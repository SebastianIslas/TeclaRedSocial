/* Funcion llamada cuando un usuario se quiere registrar */
const registro = (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;
    const categoria = document.getElementById('categoria').value;						
    const rol = document.getElementById('rol').value;						
    const edad = document.getElementById('edad').value;						
    const estudios = document.getElementById('estudios').value;						
    const idiomas = document.getElementById('idiomas').value;						
    const linkedin = document.getElementById('linkedin').value;						
    const hobbies = document.getElementById('hobbies').value;
    let data = { 
        nombre, 
        apellido, 
        email, 
        password, 
        ciudad, 
        pais, 
        categoria, 
        rol, 
        edad, 
        estudios, 
        idiomas, 
        linkedin, 
        hobbies
    };    
    validarSignIn(data); //Verifica que los datos insertados sean correctos. 
    fetchRegistro(data);    
}

/* Interactua con el servidor para registrar un usuario */
const fetchRegistro = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'           
          },
          body: JSON.stringify(data)
        });
        if (response.status === 200) {
            response.json().then(json => {
                alert('Usuario creado con exito');
                fetchLogin(data);
            });
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