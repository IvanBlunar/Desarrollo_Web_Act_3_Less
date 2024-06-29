document.addEventListener('DOMContentLoaded', function() {
    const userEmail = sessionStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem(userEmail));

    // Mostrar detalles del usuario
    const userDetailsDiv = document.getElementById('user-details');
    if (userData) {
        userDetailsDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${userData.firstName} ${userData.lastName}</p>
            <p><strong>Correo Electrónico:</strong> ${userData.email}</p>
            <!-- Añadir más detalles según lo almacenado -->
        `;
    } else {
        userDetailsDiv.innerHTML = `<p>No se encontraron detalles del usuario.</p>`;
    }

    // Mostrar resumen del carrito
    let cartItems = JSON.parse(localStorage.getItem(`${userEmail}_cartItems`)) || [];
    const cartSummaryDiv = document.getElementById('cart-summary');
    cartSummaryDiv.innerHTML = `
        <ul>
            ${cartItems.map(item => `<li>${item.name} - ${item.price} - Cantidad: ${item.qty}</li>`).join('')}
        </ul>
    `;

    // Event listener para el formulario de pago
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Aquí puedes añadir la lógica para procesar el pago
        alert('¡Pago procesado con éxito!');
        // Redirigir a una página de confirmación o de gracias
        window.location.href = 'confirmation.html';
    });
});
