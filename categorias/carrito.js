document.addEventListener('DOMContentLoaded', function() {
    let cartCounter = localStorage.getItem('cartCounter') || 0;
    cartCounter = parseInt(cartCounter);
    updateCartCounter(cartCounter);

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
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

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            cartCounter = cartItems.reduce((total, item) => total + item.qty, 0);
            localStorage.setItem('cartCounter', cartCounter);
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
            if (items.length === 0) {
                cartContentWrapper.innerHTML = '<p>Tu carrito está vacío.</p>';
                return;
            }
            let subtotal = 0;
            items.forEach(item => {
                subtotal += parseFloat(item.price.replace('$', '')) * item.qty;
                wrapper.innerHTML += `
                    <div class="cart-single-wraper">
                       <div class="row">
                            <div class="col-4">
                                <img src="${item.imgSrc}" class="img-thumbnail" alt="${item.name}" style="width: 50px;">
                            </div>
                            <div class="col-8">
                                <p>${item.name}</p>
                                <p>${item.price} x ${item.qty}</p>
                            </div>
                        </div>
                        <div class="remove"> <a href="#"><i class="zmdi zmdi-close"></i></a> </div>
                    </div>`;
            });
            wrapper.innerHTML += `
                <div class="cart-subtotal"> Subtotal: <span>$${subtotal.toFixed(2)}</span> </div>
                <div class="cart-check-btn">
                    <div class="view-cart"> <a class="btn btn-primary" href="cart.html">Ir al Carrito</a> </div>
                    <div class="check-btn"> <a class="btn-def" href="checkout.html">Checkout</a> </div>
                </div>`;
        });
    }

    document.querySelectorAll('.header-cart').forEach(cart => {
        cart.addEventListener('mouseenter', function() {
            this.querySelector('.cart-content-wraper').style.display = 'block';
        });
        cart.addEventListener('mouseleave', function() {
            this.querySelector('.cart-content-wraper').style.display = 'none';
        });
    });
});
