/* Funcion llamada cuando un usuario se quiere registrar */
const registro = async (event) => {
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
    await api.fetchPost(alert('Usuario creado con exito'), data, 'usuarios'); //Hacemos la solicitud al backend
    const login = new Login(data.email, data.password);
    login.iniciarSesion(); //Loggeamos al usuario
}