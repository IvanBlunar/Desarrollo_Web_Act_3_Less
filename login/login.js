document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario de inicio de sesión si existe
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validación básica de correo electrónico
            if (!isValidEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Simulación de inicio de sesión exitoso
            // Guardar el correo en sessionStorage
            sessionStorage.setItem('userEmail', email);

            // Redireccionar a otra página (p. ej., la página principal)
            window.location.href = '../index.html';
        });
    } else {
        console.error('Elemento loginForm no encontrado en la página.');
    }

    // Agregar event listener al botón de cerrar sesión si existe
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();

            // Limpiar sessionStorage y redireccionar al login
            sessionStorage.removeItem('userEmail');
            window.location.href = '../login/login.html';
        });
    } else {
        console.error('Elemento logoutBtn no encontrado en la página.');
    }

    // Función para validar el correo electrónico
    function isValidEmail(email) {
        // Expresión regular para validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

