// Plik: js/main.js
document.addEventListener('DOMContentLoaded', function() {
    
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const sideMenu = document.getElementById('side-menu');
    const backdrop = document.getElementById('backdrop');

    function toggleMenu() {
        hamburgerToggle.classList.toggle('active');
        sideMenu.classList.toggle('side-menu-open');
        backdrop.classList.toggle('backdrop-open');
    }

    hamburgerToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    backdrop.addEventListener('click', function() {
        toggleMenu();
    });
});

// Plik: js/main.js (wersja 2.0 - z koszykiem)

function getCart() {
    const cart = localStorage.getItem('eShopCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('eShopCart', JSON.stringify(cart));
}

function updateCartBadge() {
    const cart = getCart();
    let totalItems = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = totalItems;
    }
}

function addItemToCart(productId, productName, productPrice) {
    const cart = getCart();
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartBadge();
    
    alert(productName + ' został dodany do koszyka!');
}

function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const totalCostElement = document.getElementById('cart-total-cost');
    const cart = getCart();

    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Twój koszyk jest pusty.</p>';
        totalCostElement.textContent = '$0.00';
        return;
    }
    
    let totalCost = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <strong>${item.name}</strong>
                <p>Ilość: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">
                $${itemTotal.toFixed(2)}
            </div>
        `;
        container.appendChild(itemElement);
    });
    
    totalCostElement.textContent = '$' + totalCost.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    
    updateCartBadge();

    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const sideMenu = document.getElementById('side-menu');
    const backdrop = document.getElementById('backdrop');

    if (hamburgerToggle && sideMenu && backdrop) {
        function toggleMenu() {
            hamburgerToggle.classList.toggle('active');
            sideMenu.classList.toggle('side-menu-open');
            backdrop.classList.toggle('backdrop-open');
        }

        hamburgerToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        backdrop.addEventListener('click', function() {
            toggleMenu();
        });
    }

    const addToCartButton = document.getElementById('add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = parseFloat(this.dataset.productPrice);

            addItemToCart(productId, productName, productPrice);
        });
    }
    
    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }
    
});