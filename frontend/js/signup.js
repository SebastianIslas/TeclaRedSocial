const registro = (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const residencia = document.getElementById('residencia').value;
    const edad = document.getElementById('edad').value;						
    const estudios = document.getElementById('estudios').value;						
    const idiomas = document.getElementById('idiomas').value;						
    const linkedin = document.getElementById('linkedin').value;						
    const hobbies = document.getElementById('hobbies').value;
    validarSignIn(nombre, apellido, email, password, residencia, edad, estudios, idiomas, linkedin, hobbies);
    console.log(nombre, apellido, email, password, residencia, edad, estudios, idiomas, linkedin, hobbies);
  
}