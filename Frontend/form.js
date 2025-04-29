document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');

    // Validation rules
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

        input.addEventListener('input', function () {
            validateField(fieldName, input, errorElement);
        });

        input.addEventListener('blur', function () {
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

    // Form Submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        let isValid = true;

        Object.keys(fields).forEach(fieldName => {
            const input = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}Error`);
            if (!validateField(fieldName, input, errorElement)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(this);
            
            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                result.textContent = 'Message sent successfully!';
                result.className = 'text-base text-center text-green-500';
                
                // Clear form data
                form.reset();
                
                // Remove validation styling
                Object.keys(fields).forEach(fieldName => {
                    const input = document.getElementById(fieldName);
                    input.classList.remove('border-green-500');
                });
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            result.textContent = 'Error sending message. Please try again.';
            result.className = 'text-base text-center text-red-500';
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');

        menuIcon.innerHTML = isMenuOpen
            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', function (event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target) && isMenuOpen) {
            toggleMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
});
