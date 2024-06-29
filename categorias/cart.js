document.addEventListener('DOMContentLoaded', function() {
    const userEmail = sessionStorage.getItem('userEmail');
    let cartItems = JSON.parse(localStorage.getItem(`${userEmail}_cartItems`)) || [];
    displayCartItems(cartItems);
    displayCartTotal(cartItems);

    function displayCartItems(items) {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        items.forEach(item => {
            const itemRow = document.createElement('tr');
            itemRow.innerHTML = `
                <td><img src="${item.imgSrc}" class="img-thumbnail" alt="${item.name}" style="width: 100px;"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" class="form-control qty-input" value="${item.qty}" min="1" data-name="${item.name}">
                </td>
                <td class="item-total">${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger remove-btn" data-name="${item.name}">Eliminar</button>
                </td>`;
            cartItemsContainer.appendChild(itemRow);
        });

        const qtyInputs = document.querySelectorAll('.qty-input');
        qtyInputs.forEach(input => {
            input.addEventListener('change', function() {
                const itemName = input.getAttribute('data-name');
                const newQty = parseInt(input.value);
                const item = cartItems.find(item => item.name === itemName);
                item.qty = newQty;
                localStorage.setItem(`${userEmail}_cartItems`, JSON.stringify(cartItems));
                updateCartTotalAndDisplay(cartItems);
            });
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = button.getAttribute('data-name');
                cartItems = cartItems.filter(item => item.name !== itemName);
                localStorage.setItem(`${userEmail}_cartItems`, JSON.stringify(cartItems));
                displayCartItems(cartItems);
                displayCartTotal(cartItems);
                updateCartCounter(cartItems);
            });
        });
    }

    function displayCartTotal(items) {
        const cartTotalContainer = document.getElementById('cart-total');
        let subtotal = items.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.qty, 0);
        cartTotalContainer.innerHTML = `<h3>Total: $${subtotal.toFixed(2)}</h3>`;
    }

    function updateCartTotalAndDisplay(items) {
        const itemTotals = document.querySelectorAll('.item-total');
        items.forEach((item, index) => {
            itemTotals[index].textContent = (parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2);
        });
        displayCartTotal(items);
    }

    function updateCartCounter(items) {
        const cartCounterElements = document.querySelectorAll('#cart-counter, #cart-counter-mobile');
        const cartCounter = items.reduce((total, item) => total + item.qty, 0);
        localStorage.setItem(`${userEmail}_cartCounter`, cartCounter);
        cartCounterElements.forEach(counter => {
            counter.textContent = cartCounter;
        });
    }
});
