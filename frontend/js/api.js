class API {
    constructor (token, url) {
        this.token = token;
        this.url = url;
    }

    fetchPost = async (callback, data, ruta) => {
        try {
            const response = await fetch(`${this.url}/${ruta}`, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
                'Content-Type': 'application/json'           
                },
                body: JSON.stringify(data)
            });
            if (response.status === 201) {
                callback();
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

    /* Interactua con el server para traer la informacion de un usuario */
    fetchGet = async (ruta) => {
        try {
            const response = await fetch(`${this.url}/${ruta}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`, //Mandamos el token para que el server lo valide
                    'Content-Type': 'application/json'
                },
            });
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    /* Interactua con el server para eliminar una cuenta */
    fetchDelete = async (ruta) => {
        const token = document.cookie.split('=')[1];
        try {
            await fetch(`${this.url}/${ruta}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    fetchPut = async (callback = '', data, ruta) => {
        try {
            const response = await fetch(`${this.url}/${ruta}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'           
            },
            body: JSON.stringify(data)
            });
            if (response.status === 200) {
                response.json().then(json => {
                    alert(json);
                    return;
                });
                // callback();
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
}

token = document.cookie.split('=')[1];
const api = new API(token, 'http://localhost:3000' );