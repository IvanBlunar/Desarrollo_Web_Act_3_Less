function guardarDatosFormulario() {
    var nombre = document.getElementById('nombre').value;
    var correo = document.getElementById('correo').value;
    var direccion = document.getElementById('direccion').value;
    var telefono = document.getElementById('telefono').value;
    var pais = document.getElementById('pais').value;
    var ciudad = document.getElementById('ciudad').value;
    var codigoPostal = document.getElementById('codigoPostal').value;
    var comentario = document.getElementById('comentario').value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return false;
    }

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({ nombre, correo, direccion, telefono, pais, ciudad, codigoPostal, comentario });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Datos guardados correctamente.');
    return false; // Evitar envío del formulario
}
function cargarUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            var lista = document.getElementById('listaUsuarios');
            lista.innerHTML = ''; // Limpiar lista anterior

            data.forEach(user => {
                var li = document.createElement('li');
                li.textContent = `${user.name} - ${user.email}`;
                lista.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
}