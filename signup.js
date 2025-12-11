'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const submitBtn = form.querySelector('.btn-submit');

    // Form validation
    const validators = {
        firstName: (value) => value.trim().length >= 2,
        lastName: (value) => value.trim().length >= 2,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^[+]?[\d\s()-]{10,}$/.test(value),
        dateOfBirth: (value) => {
            if (!value) return false;
            const age = calculateAge(value);
            return age >= 5 && age <= 100;
        },
        gender: (value) => value !== '',
        city: (value) => value.trim().length >= 2,
        province: (value) => value !== '',
        category: (value) => value !== '',
        experience: (value) => value !== '',
        height: (value) => {
            const h = parseInt(value);
            return h >= 120 && h <= 250;
        },
        password: (value) => value.length >= 8,
        confirmPassword: (value) => value === form.password.value,
        terms: (checked) => checked === true
    };

    // Calculate age from date of birth
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    // Real-time validation
    Object.keys(validators).forEach(fieldName => {
        const field = form[fieldName];
        if (!field) return;

        const eventType = field.type === 'checkbox' ? 'change' : 'blur';

        field.addEventListener(eventType, function () {
            validateField(fieldName, field);
        });

        // Also validate on input for immediate feedback
        if (field.type !== 'checkbox') {
            field.addEventListener('input', function () {
                if (field.classList.contains('error')) {
                    validateField(fieldName, field);
                }
            });
        }
    });

    // Validate individual field
    function validateField(fieldName, field) {
        const validator = validators[fieldName];
        if (!validator) return true;

        const value = field.type === 'checkbox' ? field.checked : field.value;
        const isValid = validator(value);

        // Remove previous error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            return true;
        } else {
            field.classList.remove('success');
            field.classList.add('error');

            // Add error message
            const errorMsg = getErrorMessage(fieldName);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMsg;
            field.parentElement.appendChild(errorDiv);

            return false;
        }
    }

    // Get error messages
    function getErrorMessage(fieldName) {
        const messages = {
            firstName: 'First name must be at least 2 characters',
            lastName: 'Last name must be at least 2 characters',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            dateOfBirth: 'Please enter a valid date of birth (age 5-100)',
            gender: 'Please select your gender',
            city: 'City must be at least 2 characters',
            province: 'Please select your province',
            category: 'Please select an interest category',
            experience: 'Please select your experience level',
            height: 'Height must be between 120-250 cm',
            password: 'Password must be at least 8 characters',
            confirmPassword: 'Passwords do not match',
            terms: 'You must agree to the terms and conditions'
        };

        return messages[fieldName] || 'This field is invalid';
    }

    // Password strength indicator
    const passwordInput = form.password;
    passwordInput.addEventListener('input', function () {
        const strength = checkPasswordStrength(this.value);
        updatePasswordStrength(strength);
    });

    function checkPasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        return strength;
    }

    function updatePasswordStrength(strength) {
        const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const small = passwordInput.parentElement.querySelector('small');

        if (strength > 0) {
            small.textContent = `Password Strength: ${strengthText[strength - 1]}`;
            small.style.color = strength >= 3 ? '#2e7d32' : strength >= 2 ? '#f57c00' : '#d32f2f';
        } else {
            small.textContent = 'Must be at least 8 characters';
            small.style.color = '#666666';
        }
    }

    // Confirm password matching
    const confirmPasswordInput = form.confirmPassword;
    confirmPasswordInput.addEventListener('input', function () {
        if (this.value) {
            validateField('confirmPassword', this);
        }
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        Object.keys(validators).forEach(fieldName => {
            const field = form[fieldName];
            if (field && !validateField(fieldName, field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showToast('Please fill in all required fields correctly', 'error');

            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            if (key === 'terms' || key === 'newsletter') {
                data[key] = form[key].checked;
            } else {
                data[key] = value;
            }
        });

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', data);

            // Success
            showToast('Account created successfully! Redirecting...', 'success');

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    });

    // Toast notification
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;

        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // Age warning for date of birth
    const dobInput = form.dateOfBirth;
    dobInput.addEventListener('change', function () {
        const age = calculateAge(this.value);

        if (age < 18 && age >= 5) {
            showToast('Applicants under 18 require parental consent', 'error');
        }
    });

    // Phone number formatting
    const phoneInput = form.phone;
    phoneInput.addEventListener('input', function () {
        // Auto-add +27 for SA numbers if not present
        if (this.value && !this.value.startsWith('+')) {
            if (this.value.startsWith('0')) {
                this.value = '+27 ' + this.value.substring(1);
            }
        }
    });

    // Prevent form submission on Enter key (except on submit button)
    form.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && e.target.type !== 'submit') {
            e.preventDefault();

            // Move to next input
            const inputs = Array.from(form.querySelectorAll('input, select'));
            const index = inputs.indexOf(e.target);
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });
});