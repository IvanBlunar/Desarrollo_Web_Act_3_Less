document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logOut');
    const loginButton = document.getElementById('loggIn');
    const msg = document.getElementById('mensaje');

    if (sessionStorage.getItem('loggedIn')) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';

        const userEmail = sessionStorage.getItem('userEmail');
        const userData = JSON.parse(localStorage.getItem(userEmail));
        if (userData) {
            if (msg) {
                msg.innerHTML = 'Bienvenid@ ' + userData.firstName;
                msg.style.display = 'block';
            }
        } else {
            console.log('No se encontraron datos de usuario en localStorage.');
        }
    }

    if(loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = '../login/login.html';
        });
    }
    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('editShipping');
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            if (msg) {
                msg.style.display = 'none';
            }
            
            if (window.location.pathname.includes('index.html')) {
                window.location.href = 'login/login.html';
            }else {
                window.location.href = '../login/login.html';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function(){
    //EventListener al formulario de Registro 
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event){
            event.preventDefault();
            const email = document.getElementById('email').value;
            const firstName = document.getElementById('firstName').value;
            const pass = document.getElementById('password').value;
            const user = {
                firstName: firstName,
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

            if (user == null) {
                console.log('Email incorrecto');
                alert("Ese correo no existe, intente con otro");
            } else if (email == data.email && pass == data.password) {
                console.log(data.firstName);
                alert('Inicio OK')
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('loggedIn', true);
                // Redireccionar a otra página (p. ej., la página principal)
                window.location.href = '../index.html';
            }else{
                alert("Contraseña Incorrecta");
                console.log('Contraseña incorrecta');
                
            }

            // Simulación de inicio de sesión exitoso
            // Guardar el correo en sessionStorage
            
        });
    } else {
        console.error('Elemento loginForm no encontrado en la página.');
    }

    // Función para validar el correo electrónico
    function isValidEmail(email) {
        // Expresión regular para validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

