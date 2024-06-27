document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logOut');
    const loginButton = document.getElementById('loggIn');

    if (sessionStorage.getItem('loggedIn')) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    }

    logoutButton.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Limpiar sessionStorage y redireccionar al login
            sessionStorage.removeItem('userEmail');
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            window.location.href = 'login/login.html'; 
            //cambie  en la [linea 10] ..login/login.html la ruta relativa estaba mal 
        });
    });
});
