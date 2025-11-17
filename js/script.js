// Initialize EmailJS at the very top
emailjs.init("BEHx6iEMI7PaNjAKO"); // Replace with your actual public key from EmailJS

// Get DOM elements
const modal = document.getElementById('appointmentModal');
const bookAppointmentBtn = document.querySelector('.hero .btn-primary');
const closeBtn = document.querySelector('.close');

// Function to open appointment form
function openAppointmentForm() {
    modal.style.display = 'block';
}

// Function to close appointment form
function closeAppointmentForm() {
    modal.style.display = 'none';
}

// Event listeners
closeBtn.addEventListener('click', closeAppointmentForm);
bookAppointmentBtn.addEventListener('click', openAppointmentForm);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeAppointmentForm();
    }
});

// Validation patterns
const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[\d\s-]{10,}$/,
    date: /^\d{4}-\d{2}-\d{2}$/
};

// Validation messages
const errorMessages = {
    name: "Please enter a valid name (2-50 characters, letters only)",
    email: "Please enter a valid email address",
    phone: "Please enter a valid phone number (minimum 10 digits)",
    date: "Please select a valid date",
    service: "Please select a service"
};

// Function to validate input
function validateInput(input, pattern) {
    if (!pattern) return true;
    return pattern.test(input.value);
}

// Function to show error message
function showError(input, message) {
    const existingError = input.nextElementSibling;
    if (existingError?.classList.contains('error-message')) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.textContent = message;
    input.after(errorDiv);
    input.style.borderColor = 'red';
}

// Function to remove error message
function removeError(input) {
    const existingError = input.nextElementSibling;
    if (existingError?.classList.contains('error-message')) {
        existingError.remove();
    }
    input.style.borderColor = '#ddd';
}

// Send confirmation email via EmailJS
async function sendConfirmationEmail(formData) {
    try {
        const templateParams = {
            to_email: formData.email,
            to_name: formData.name,
            user_email: formData.email,
            appointment_date: new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            appointment_time: new Date(formData.date).toLocaleTimeString(),
            appointment_service: formData.service,
            phone: formData.phone
        };

        console.log('Sending email with params:', templateParams);

        const response = await emailjs.send(
            'service_fp2z9b4',
            'template_wdid14t',
            templateParams
        );

        console.log('Email sent successfully:', response);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        alert('Email notification could not be sent, but your appointment has been recorded.');
        return true; // Continue even if email fails
    }
}

// Update form submission handler
document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inputs = {
        name: e.target.elements[0],
        email: e.target.elements[1],
        phone: e.target.elements[2],
        date: e.target.elements[3],
        service: e.target.elements[4]
    };

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => error.remove());

    // Validate each input
    for (const [field, input] of Object.entries(inputs)) {
        removeError(input);
        
        if (field === 'service') {
            if (!input.value) {
                showError(input, errorMessages[field]);
                isValid = false;
            }
        } else {
            if (!validateInput(input, patterns[field])) {
                showError(input, errorMessages[field]);
                isValid = false;
            }
        }
    }

    // Additional date validation for future dates only
    const selectedDate = new Date(inputs.date.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError(inputs.date, "Please select a future date");
        isValid = false;
    }

    if (isValid) {
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span> Processing...';

            const formData = {
                name: inputs.name.value,
                email: inputs.email.value,
                phone: inputs.phone.value,
                date: inputs.date.value,
                service: inputs.service.value
            };

            // Send confirmation email
            await sendConfirmationEmail(formData);

            // Store booking details in localStorage
            localStorage.setItem('bookingDetails', JSON.stringify(formData));
            
            // Redirect to confirmation page
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            
            // Show error message
            const errorAlert = document.createElement('div');
            errorAlert.className = 'error-alert';
            errorAlert.style.display = 'block';
            errorAlert.textContent = 'There was an error processing your appointment. Please try again.';
            submitButton.parentElement.insertBefore(errorAlert, submitButton);
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Remove error message after 5 seconds
            setTimeout(() => errorAlert.remove(), 5000);
        }
    }
});

// Add input event listeners for real-time validation
document.querySelectorAll('#appointmentForm input').forEach(input => {
    input.addEventListener('input', function() {
        const fieldIndex = Array.from(this.parentElement.children).indexOf(this);
        const fieldNames = ['name', 'email', 'phone', 'date'];
        const fieldName = fieldNames[fieldIndex];
        
        if (patterns[fieldName]) {
            if (validateInput(this, patterns[fieldName])) {
                removeError(this);
            }
        }
    });
});

// Handle confirmation page display
if (window.location.pathname.includes('confirmation.html')) {
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    const detailsContainer = document.getElementById('bookingDetails');
    
    if (bookingDetails && detailsContainer) {
        detailsContainer.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span>${bookingDetails.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span>${bookingDetails.email}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span>${bookingDetails.phone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span>${new Date(bookingDetails.date).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span>${bookingDetails.service}</span>
            </div>
        `;
        
        // Clear the stored data after displaying
        localStorage.removeItem('bookingDetails');
    }
}

// Add click handler for Appointments nav link
document.querySelector('a[href="#appointments"]').addEventListener('click', (e) => {
    e.preventDefault();
    openAppointmentForm();
});

// Add this function to scroll to appointment form
function scrollToAppointment() {
    openAppointmentForm();
    modal.scrollIntoView({ behavior: 'smooth' });
}

// Add this function to scroll to home when clicking logo
function scrollToHome() {
    window.location.href = '#home';
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Alternative: Make logo scroll smoothly to home without page reload
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Close modal if open
            if (modal.style.display === 'block') {
                closeAppointmentForm();
            }
        });
    }
});

// Footer link smooth scrolling
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                closeAppointmentForm(); // Close modal if open
            }
        }
    });
});

// Add scroll-to-top button functionality (optional)
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        // You can add a scroll-to-top button here if desired
    }
});