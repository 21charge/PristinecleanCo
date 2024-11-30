// Initialize EmailJS with your public API key
emailjs.init('HFrTW31on5VXmTsEX');

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get contact details from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value || 'Not Provided';
    const message = document.getElementById('message').value;

    // Disable the submit button to prevent multiple submissions
    const submitButton = document.getElementById('submit-contact');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    // Send email via Email.js
    emailjs.send('service_1obxdwm', 'template_q642oro', {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_message: message
    }).then(() => {
        // Show success message and hide the form
        document.getElementById('contact-form').style.display = 'none';
        document.getElementById('contact-success').style.display = 'block';
    }).catch(error => {
        console.error('Email.js Error:', error);
        alert('Failed to send message. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    });
});
