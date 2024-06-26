
document.addEventListener('DOMContentLoaded', function() {
    const logoutButtons = document.querySelectorAll('.logout-btn');

    logoutButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Limpiar sessionStorage y redireccionar al login
            sessionStorage.removeItem('userEmail');
            window.location.href = '../login/login.html';
        });
    });
});

