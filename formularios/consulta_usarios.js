function cargarUsuarios() {
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var lista = document.getElementById('listaUsuarios');
    lista.innerHTML = ''; // Limpiar lista anterior

    usuarios.forEach((user, index) => {
        var li = document.createElement('li');
        li.innerHTML = `
            <div class="campo"><span class="label">Nombre:</span> ${user.nombre}</div>
            <div class="campo"><span class="label">Correo:</span> ${user.correo}</div>
            <div class="campo"><span class="label">Dirección:</span> ${user.direccion}</div>
            <div class="campo"><span class="label">Teléfono:</span> ${user.telefono}</div>
            <div class="campo"><span class="label">País:</span> ${user.pais}</div>
            <div class="campo"><span class="label">Ciudad:</span> ${user.ciudad}</div>
            <div class="campo"><span class="label">Código Postal:</span> ${user.codigoPostal}</div>
            <div class="campo"><span class="label">Comentario:</span> ${user.comentario}</div>
            <button class="boton-despachar" onclick="despacharUsuario(${index})">Despachar</button>
        `;
        lista.appendChild(li);
    });
}

function despacharUsuario(index) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cargarUsuarios();
    alert('Usuario despachado correctamente.');
}