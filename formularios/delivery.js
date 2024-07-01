document.addEventListener('DOMContentLoaded', function() {
    const userEmail = sessionStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem(userEmail));
    const shippingData = JSON.parse(localStorage.getItem(`${userEmail}_shippingDetails`));
    const cartItems = JSON.parse(localStorage.getItem(`${userEmail}_cartItems`)) || [];
    const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.qty, 0);

    // Mostrar detalles del usuario
    const userInfoDiv = document.getElementById('user-info');
    if (userData) {
        userInfoDiv.innerHTML = `
            
            <div class="card-body">
                ${userData ? `
                    <h5>Detalles del Usuario</h5>
                    <p><strong>Nombre:</strong> ${userData.firstName}</p>
                    <p><strong>Correo Electrónico:</strong> ${userData.email}</p>
                ` : `<p>No se encontraron detalles del usuario.</p>`}
        `;
    } else {
        userInfoDiv.innerHTML = `<p>No se encontraron detalles del usuario.</p>`;
    }

   
    const shippingInfoDiv = document.getElementById('shipping-info');
    if (shippingData) {
        shippingInfoDiv.innerHTML = `
            
            <div class="card-body">
             ${userData ? `
            <html
            <h5>Detalles de Envío</h5>
            <p><strong>Nombre completo:</strong> ${shippingData.fullName}</p>
            <p><strong>Dirección:</strong> ${shippingData.address}</p>
            <p><strong>Ciudad:</strong> ${shippingData.city}</p>
            <p><strong>Código Postal:</strong> ${shippingData.postalCode}</p>
            <p><strong>País:</strong> ${shippingData.country}</p>
            <p><strong>Teléfono:</strong> ${shippingData.phone}</p>
        ` : ` <p>No se encontro detalles del Usuario.</p>` }
            </div>
            </div>
        
         `;

    } else {
        shippingInfoDiv.innerHTML = `<p>No se encontraron detalles de envío.</p>`;
    }

    // Mostrar total del carrito
    const cartTotalDiv = document.getElementById('cart-total');
    cartTotalDiv.innerHTML = `
        
            <div class="card-body">
                <h5>Total de la Compra</h5>
                <p><strong>Total:</strong> $${subtotal.toFixed(2)}</p>
            </div>

        
        
    `;
});