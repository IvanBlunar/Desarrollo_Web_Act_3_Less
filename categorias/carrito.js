document.addEventListener('DOMContentLoaded', function() {
    // Obtener el correo electrónico del usuario desde sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');

    let cartCounter = localStorage.getItem(`${userEmail}_cartCounter`) || 0;
    cartCounter = parseInt(cartCounter);
    updateCartCounter(cartCounter);

    let cartItems = JSON.parse(localStorage.getItem(`${userEmail}_cartItems`)) || [];
    updateCartContent(cartItems);

    const comprarButtons = document.querySelectorAll('.comprar-btn');
    comprarButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const itemName = button.parentElement.querySelector('.cards-title').textContent;
            const itemPrice = button.parentElement.querySelector('.cards-text').textContent;
            const itemImgSrc = button.parentElement.parentElement.querySelector('img').src;

            const existingItemIndex = cartItems.findIndex(item => item.name === itemName);

            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].qty++;
            } else {
                const item = {
                    name: itemName,
                    price: itemPrice,
                    imgSrc: itemImgSrc,
                    qty: 1
                };
                cartItems.push(item);
            }

            // Guardar los datos actualizados en localStorage
            localStorage.setItem(`${userEmail}_cartItems`, JSON.stringify(cartItems));
            cartCounter = cartItems.reduce((total, item) => total + item.qty, 0);
            localStorage.setItem(`${userEmail}_cartCounter`, cartCounter);
            updateCartCounter(cartCounter);
            updateCartContent(cartItems);
        });
    });

    function updateCartCounter(count) {
        const cartCounterElements = document.querySelectorAll('#cart-counter, #cart-counter-mobile');
        cartCounterElements.forEach(counter => {
            counter.textContent = count;
        });
    }

    function updateCartContent(items) {
        const cartContentWrapers = document.querySelectorAll('#cart-content-wraper, #cart-content-wraper-mobile');
        cartContentWrapers.forEach(wrapper => {
            wrapper.innerHTML = '';
            let subtotal = 0;
            items.forEach(item => {
                subtotal += parseFloat(item.price.replace('$', '')) * item.qty;
                wrapper.innerHTML += `
                    <div class="cart-single-wraper">
                        <div class="cart-img">
                            <a href="#"><img src="${item.imgSrc}" alt=""></a>
                        </div>
                        <div class="cart-content">
                            <div class="cart-name"> <a href="#">${item.name}</a> </div>
                            <div class="cart-price"> ${item.price} </div>
                            <div class="cart-qty">
                                Cantidad: <input type="number" min="1" value="${item.qty}" onchange="updateCartItemQuantity(${items.indexOf(item)}, this.value)">
                            </div>
                        </div>
                        <div class="remove"> <a href="#"><i class="zmdi zmdi-close"></i></a> </div>
                    </div>`;
            });
            const currentPath = window.location.pathname;
            const cartPage = currentPath.includes('index.html') ? 'categorias/cart.html' : 'cart.html';

            wrapper.innerHTML += `
                <div class="cart-subtotal"> Subtotal: <span>$${subtotal.toFixed(2)}</span> </div>
                <div class="cart-check-btn">
                    <div class="view-cart"> <a class="btn btn-primary" href="${cartPage}">Ir al Carrito</a> </div>
                    <!--<div class="check-btn"> <a class="btn btn-success" href="checkout.html">Checkout</a> </div>-->
                </div>`;
        });
    }

    // Función para actualizar la cantidad de un artículo en el carrito
    window.updateCartItemQuantity = function(index, quantity) {
        cartItems[index].qty = parseInt(quantity);
        localStorage.setItem(`${userEmail}_cartItems`, JSON.stringify(cartItems));

        // Actualizar contador y contenido del carrito
        cartCounter = cartItems.reduce((total, item) => total + item.qty, 0);
        localStorage.setItem(`${userEmail}_cartCounter`, cartCounter);
        updateCartCounter(cartCounter);
        updateCartContent(cartItems);
    };



    document.querySelectorAll('.header-cart').forEach(cart => {
        cart.addEventListener('mouseenter', function() {
            this.querySelector('.cart-content-wraper').style.display = 'block';
        });
        cart.addEventListener('mouseleave', function() {
            this.querySelector('.cart-content-wraper').style.display = 'none';
        });
    });
});
