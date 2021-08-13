window.onload = function() {
    const log = document.getElementById('log');
    const cookie = document.cookie.split('=');
    if (cookie[0] === 'token') {
        const log = document.getElementById('log');
        log.innerHTML = 'Logout'
        log.setAttribute('href', './login.html');
        log.addEventListener('click', function() {
            document.cookie = "token=; max-age=0";
        })
    }
    console.log(cookie[0]);
};