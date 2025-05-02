document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');

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

    // Real-time field validation
    Object.keys(fields).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}Error`);

        input.addEventListener('input', () => validateField(fieldName, input, errorElement));
        input.addEventListener('blur', () => validateField(fieldName, input, errorElement));
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
        element.textContent = '';
    }

    // Final form submit handler
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        Object.keys(fields).forEach(fieldName => {
            const input = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}Error`);
            if (!validateField(fieldName, input, errorElement)) {
                isValid = false;
            }
        });

        if (isValid) {
            const formData = new FormData(form);
            formData.append('access_key', '1043e2fc-3eed-4c29-9b81-db0628674964'); // ✅ Replace with your Web3Forms access key

            result.innerHTML = "Submitting...";
            result.className = "text-gray-500";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                .then(async (response) => {
                    const json = await response.json();
                    if (response.status === 200) {
                        result.innerHTML = json.message;
                        result.className = "text-green-500";
                        form.reset();
                        Object.keys(fields).forEach(fieldName => {
                            document.getElementById(fieldName).classList.remove('border-green-500');
                        });
                    } else {
                        result.innerHTML = json.message;
                        result.className = "text-red-500";
                    }
                })
                .catch((error) => {
                    console.error(error);
                    result.innerHTML = "Something went wrong!";
                    result.className = "text-red-500";
                })
                .finally(() => {
                    setTimeout(() => {
                        result.innerHTML = '';
                    }, 6000);
                });
        }
    });
});