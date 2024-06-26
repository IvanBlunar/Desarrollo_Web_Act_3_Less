document.addEventListener('DOMContentLoaded', function(){
    //EventListener al formulario de Registro 
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event){
            event.preventDefault();
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            const user = {
                email:email,
                password: pass,
            };
            const json = JSON.stringify(user);
            localStorage.setItem(email, json);
            console.log('usuario ok');
            alert('Usuario Registrado Correctamente');
            window.location.href = 'login.html';
        })
    }

});


document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario de inicio de sesión si existe
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;

            // Validación básica de correo electrónico
            if (!isValidEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            //Se añade para traer los datos del localStorage
            const user = localStorage.getItem(email);
            const data = JSON.parse(user);
            console.log(data);

            if (user == null) {
                console.log('Email incorrecto');
            } else if (email == data.email && pass == data.password) {
                console.log('Inicio OK')
                sessionStorage.setItem('userEmail', email);

            // Redireccionar a otra página (p. ej., la página principal)
            window.location.href = '../index.html';
            }else{
                console.log('Contraseña incorrecta');
            }

            // Simulación de inicio de sesión exitoso
            // Guardar el correo en sessionStorage
            
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

