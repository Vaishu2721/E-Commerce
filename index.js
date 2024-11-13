let index = 0;
let images = document.querySelectorAll('.slideimage');

//function to slide images in the home page
function slideImages() {
    images.forEach((image) => {
        image.classList.remove("active");
    });

    index = (index + 1) % images.length;
    images[index].classList.add("active");
}
setInterval(slideImages, 1000);
 
function showContact(){
    let contactDetails = document.getElementById('contactDetails');

    if (contactDetails.style.display === "none" || contactDetails.style.display === "") {
        contactDetails.style.display = "block"; // Show the contact info
    } else {
        contactDetails.style.display = "none"; // Hide the contact info
    }
}
// Get cart items from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productName = productElement.querySelector('.productName').innerText;
    const productPrice = productElement.querySelector('.productPrice').innerText;
    const quantityInput = productElement.querySelector('.productQuantity');
    const productQuantity = parseInt(quantityInput.value) || 1;
    const productImage = productElement.querySelector('.productImg').src; // Get the product image URL

    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImage  // Store the image URL
    };

    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart in localStorage
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-container');
    
    // Clear the cart display first
    cartContainer.innerHTML = '';
    
    // Display each item in the cart
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name} - ${item.price} x ${item.quantity}</p>
        `;
        cartContainer.appendChild(cartItemElement);
    });
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.addProduct').forEach(button => {
    button.addEventListener('click', addToCart);
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear the container

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
                <div class="cart-item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Clear cart in localStorage after displaying items
    localStorage.removeItem('cart');
}

// Display cart items on page load
displayCartItems();
