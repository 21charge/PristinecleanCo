// Initialize EmailJS with your public API key
emailjs.init('HFrTW31on5VXmTsEX'); // Add your public API key here

// Variables for cart items
let cart = [];

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.dataset.product; // Get product name from data attribute
        const price = button.dataset.price; // Get product price from data attribute
        const scentSelect = button.previousElementSibling; // Get the scent select dropdown

        const scent = scentSelect.value; // Get selected scent

        // Check if the product with the selected scent is already in the cart
        const existingProduct = cart.find(item => item.product === product && item.scent === scent);

        if (existingProduct) {
            // If it exists, increment the quantity
            existingProduct.quantity += 1;
        } else {
            // If it's not in the cart, add it with quantity 1
            cart.push({ product, price, scent, quantity: 1 });
        }

        // Update Cart Display
        updateCartDisplay();
    });
});

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items'); // Find cart items container
    cartItems.innerHTML = ''; // Clear the current cart display

    // Add each item in the cart to the display with quantity and scent
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} (${item.scent}) - R${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
    });

    // Enable or disable the Submit Order button based on cart status
    const submitButton = document.getElementById('submit-cart');
    submitButton.disabled = cart.length === 0;
}

// Show modal when Submit Order button is clicked
document.getElementById('submit-cart').addEventListener('click', () => {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'flex'; // Show modal
    
    // Reset the submit button to normal state when modal is reopened
    const submitButtonModal = document.querySelector('#contact-modal button[type="submit"]');
    submitButtonModal.disabled = false;  // Enable submit button
    submitButtonModal.textContent = 'Submit Order';  // Reset text to "Submit Order"
});

// Close modal when Cancel button is clicked
document.getElementById('close-modal').addEventListener('click', () => {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'none'; // Hide modal

    // Reset the submit button text and enabled state
    const submitButtonModal = document.querySelector('#contact-modal button[type="submit"]');
    submitButtonModal.disabled = false;
    submitButtonModal.textContent = 'Submit Order'; // Reset text
});

// Handle form submission and send email
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get contact details from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value || 'Not Provided';

    if (!name || !email) {
        alert('Please provide both your name and email.');
        return;
    }

    // Prepare cart details for email
    const cartDetails = cart.map(item => `${item.product} (${item.scent}) - $${item.price} x ${item.quantity}`).join('\n');

    // Disable the submit button inside the modal and change the text to "Processing..."
    const submitButtonModal = document.querySelector('#contact-modal button[type="submit"]');
    submitButtonModal.disabled = true;
    submitButtonModal.textContent = 'Processing...';

    // Send email via Email.js using the updated Service ID and Template ID
    emailjs.send('service_1obxdwm', 'template_4clgfc6', {
        user_name: name,
        user_email: email,
        user_phone: phone,
        cart_details: cartDetails
    }).then(() => {
        alert('Your order has been submitted! We will contact you shortly.');
        cart = []; // Clear cart
        updateCartDisplay(); // Reset cart display

        // Close modal
        document.getElementById('contact-modal').style.display = 'none';
    }).catch(error => {
        console.error('Email.js Error:', error);
        alert('Failed to send order. Please try again.');

        // Re-enable submit button and reset text inside modal
        submitButtonModal.disabled = false;
        submitButtonModal.textContent = 'Submit Order';
    });
});


