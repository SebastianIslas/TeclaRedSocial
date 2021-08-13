const login = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = { email, password };
    fetchLogin(data);



}

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
                document.cookie = `token=${data}`;
            });
            window.location.replace("./index.html");
        } else {
            response.json().then(data => {
                alert(data);
                return;
            });
        }
    } catch (err) {
        console.log(err);
    }
}