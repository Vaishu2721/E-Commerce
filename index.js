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


// Initialize an empty array to hold cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart and update cart display
function addToCart(event) {
    // Find the closest product div from the button clicked
    const productElement = event.target.closest('.product');
    
    // Get product details
    const productName = productElement.querySelector('.productName').innerText;
    const productPrice = productElement.querySelector('.productPrice').innerText;
    const quantityInput = productElement.querySelector('.productQuantity');
    const productQuantity = parseInt(quantityInput.value) || 1; 
    const productImage = productElement.querySelector('.productImg').src;// default to 1 if empty
    
    // Create an object for the product
    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImage
    };

    // Add the item to the cart array
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update the cart display
    updateCartDisplay();
}

// Function to display items in the cart
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
    
    // Update the cart count in the navbar
    const cartCount = document.querySelector('.count sup');
    cartCount.textContent = cart.length;
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


function updateCartDisplay() {
    const cartCount = document.querySelector('.count sup');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
}

// Call updateCartDisplay on page load to set the initial count
updateCartDisplay();



