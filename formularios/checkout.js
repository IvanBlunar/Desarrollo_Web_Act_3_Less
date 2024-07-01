document.addEventListener('DOMContentLoaded', function() {
    const userEmail = sessionStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem(userEmail));

    // Mostrar detalles del usuario
    const userDetailsDiv = document.getElementById('user-details');
    if (userData) {
        userDetailsDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${userData.firstName} </p>
            <p><strong>Correo Electrónico:</strong> ${userData.email}</p>
            
        `;
    } else {
        userDetailsDiv.innerHTML = `<p>No se encontraron detalles del usuario.</p>`;
    }

    // Mostrar resumen del carrito
    let cartItems = JSON.parse(localStorage.getItem(`${userEmail}_cartItems`)) || [];
    const cartSummaryDiv = document.getElementById('cart-summary');
    const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.qty, 0);
    cartSummaryDiv.innerHTML = `

    <ul class="list-group">

        <li class="list-group-item" style="font-weight:bold">
            <div class="row">
                <div class="col" style="bold">Articulo</div>
                <div class="col">Cantidad</div>
                <div class="col">Precio</div>
                <div class="col">Total</div>
                
            </div>
        </li>
        ${cartItems.map(item => `
            
            <li class="list-group-item">
                <div class="row">
                    <div class="col">${item.name}</div>
                    <div class="col">${item.qty}</div>
                    <div class="col">${item.price}</div>
                    <div class="col">$${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}</div>
                    
                </div>
            </li>`
        ).join('')}
        <li class="list-group-item active">
            <div class="row">
                <div class="col"  >TOTAL:</div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">$${subtotal.toFixed(2)}</div>
            </div>
        </li>
    </ul>

    `;

    const shippingForm = document.getElementById('shipping-details-form');
    shippingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const shippingDetails = {
            fullName: document.getElementById('full-name').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postal-code').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phone').value
        };
        localStorage.setItem(`${userEmail}_shippingDetails`, JSON.stringify(shippingDetails));
        window.location.href = 'delivery.html';
    });
});
// API GITHUB NOMBRE DE PAISES
const apiUrl = 'https://restcountries.com/v3.1/all';


async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los países.');
        }
        const data = await response.json();
        populateCountries(data);
    } catch (error) {
        console.error('Error:', error);
    }
}


function populateCountries(countries) {
    const selectCountry = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.textContent = country.name.common;
        selectCountry.appendChild(option);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    fetchCountries();
});
