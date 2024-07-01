document.addEventListener('DOMContentLoaded', function() {
    const userEmail = sessionStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem(userEmail));
    const shippingData = JSON.parse(localStorage.getItem(`${userEmail}_shippingDetails`));
    const cartItems = JSON.parse(localStorage.getItem(`${userEmail}_cartItems`)) || [];
    const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.qty, 0);


    const userInfoDiv = document.getElementById('user-info');
    if (userData) {
        userInfoDiv.innerHTML = `
            <div class="card-body">
                ${userData ? `
                    <h5>Detalles del Usuario</h5>
                    <p><strong>Nombre:</strong> ${userData.firstName}</p>
                    <p><strong>Correo Electrónico:</strong> ${userData.email}</p>
                ` : `<p>No se encontraron detalles del usuario.</p>`}
            </div>
        `;
    } else {
        userInfoDiv.innerHTML = `<p>No se encontraron detalles del usuario.</p>`;
    }

 
    const shippingInfoDiv = document.getElementById('shipping-info');
    if (shippingData) {
        shippingInfoDiv.innerHTML = `
            <div class="card-body">
                ${shippingData ? `
                    <h5>Detalles de Envío</h5>
                    <p><strong>Nombre completo:</strong> ${shippingData.fullName}</p>
                    <p><strong>Dirección:</strong> ${shippingData.address}</p>
                    <p><strong>Ciudad:</strong> ${shippingData.city}</p>
                    <p><strong>Código Postal:</strong> ${shippingData.postalCode}</p>
                    <p><strong>País:</strong> ${shippingData.country}</p>
                    <p><strong>Teléfono:</strong> ${shippingData.phone}</p>
                ` : `<p>No se encontraron detalles de envío.</p>`}
            </div>
        `;
    } else {
        shippingInfoDiv.innerHTML = `<p>No se encontraron detalles de envío.</p>`;
    }


    const cartTotalDiv = document.getElementById('cart-total');
    cartTotalDiv.innerHTML = `<h5>Total del Carrito: $${subtotal.toFixed(2)}</h5>`;

   
    const editShippingInfoButton = document.getElementById('edit-shipping-info');
    editShippingInfoButton.addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });

   
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const cardHolderName = document.getElementById('card-holder-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
            alert('Por favor complete todos los campos de información de pago.');
            return;
        }
        alert('Pago realizado con éxito. ¡Gracias por tu compra!');
        localStorage.removeItem(`${userEmail}_cartItems`);
        window.location.href = '../index.html';
    });
});
