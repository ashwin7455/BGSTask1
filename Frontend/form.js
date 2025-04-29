// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const fields = {
        name: {
            regex: /^[a-zA-Z\s]{2,50}$/,
            error: 'Please enter a valid name (2-50 characters, letters only)'
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            error: 'Please enter a valid email address'
        },
        phone: {
            regex: /^\+?[\d\s-]{10,}$/,
            error: 'Please enter a valid phone number (minimum 10 digits)'
        },
        subject: {
            regex: /^.{5,100}$/,
            error: 'Subject must be between 5 and 100 characters'
        },
        message: {
            regex: /^[\s\S]{10,500}$/,
            error: 'Message must be between 10 and 500 characters'
        }
    };

    // Real-time validation
    Object.keys(fields).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}Error`);

        input.addEventListener('input', function() {
            validateField(fieldName, input, errorElement);
        });

        input.addEventListener('blur', function() {
            validateField(fieldName, input, errorElement);
        });
    });

    function validateField(fieldName, input, errorElement) {
        const field = fields[fieldName];
        const value = input.value.trim();
        
        if (!value) {
            showError(errorElement, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            input.classList.add('border-red-500');
            return false;
        }

        if (!field.regex.test(value)) {
            showError(errorElement, field.error);
            input.classList.add('border-red-500');
            return false;
        }

        hideError(errorElement);
        input.classList.remove('border-red-500');
        input.classList.add('border-green-500');
        return true;
    }

    function showError(element, message) {
        element.textContent = message;
        element.classList.remove('hidden');
    }

    function hideError(element) {
        element.classList.add('hidden');
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        Object.keys(fields).forEach(fieldName => {
            const input = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}Error`);
            if (!validateField(fieldName, input, errorElement)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Create form data object
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Show success message
            alert('Form submitted successfully! We will contact you soon.');
            
            // Reset form
            form.reset();
            
            // Remove success indicators
            Object.keys(fields).forEach(fieldName => {
                const input = document.getElementById(fieldName);
                input.classList.remove('border-green-500');
            });
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');

        // Switch icon
        if (isMenuOpen) {
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
        } else {
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target) && isMenuOpen) {
            toggleMenu();
        }
    });

    // Close menu when window is resized to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
}); 



