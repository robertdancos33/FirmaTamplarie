let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.product}: $${item.price}`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total;
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    alert('Checkout not implemented yet');
}