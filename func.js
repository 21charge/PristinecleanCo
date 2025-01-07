// Initialize EmailJS with your public key
emailjs.init("HFrTW31on5VXmTsEX");

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");

    // Event listener for form submission
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from reloading the page

        // Collect form data
        const formData = {
            user_name: document.getElementById("name").value, // Match EmailJS template variable
            user_email: document.getElementById("email").value, // Match EmailJS template variable
            user_phone: document.getElementById("phone").value, // Match EmailJS template variable
            message: document.getElementById("message").value, // Match EmailJS template variable
        };

        // Send email using EmailJS
        emailjs
            .send("service_1obxdwm", "template_q642oro", formData)
            .then(function (response) {
                alert("Message sent successfully! Thank you for reaching out.");
                contactForm.reset(); // Reset the form
            })
            .catch(function (error) {
                alert("Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error);
            });
    });
});




