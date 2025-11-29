'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Loader Animation
    const loaderContainer = document.querySelector('.loader-container');
    const loaderLogo = document.querySelector('.loader-logo');
    const signupSection = document.querySelector('.signup');
    const signupContainer = document.querySelector('.signup-container');
    const minLoaderTime = 1500;
    const startTime = Date.now();

    setTimeout(() => {
        loaderContainer.classList.add('doors-open');
        loaderLogo.classList.add('fade-out');
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            signupSection.style.display = 'flex';
            signupContainer.classList.add('visible');
        }, 1200);
    }, Math.max(0, minLoaderTime - (Date.now() - startTime)));

    // Password Toggle for both password fields
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const passwordInput = document.getElementById(targetId);
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;

            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // Password Strength Indicator
    const passwordInput = document.getElementById('password');
    const strengthContainer = document.querySelector('.password-strength');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', function () {
        const password = this.value;

        if (password.length === 0) {
            strengthContainer.classList.remove('visible');
            return;
        }

        strengthContainer.classList.add('visible');
        const strength = calculatePasswordStrength(password);

        strengthBar.className = 'strength-bar';

        if (strength.score < 3) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak password';
            strengthText.style.color = '#ff6b6b';
        } else if (strength.score < 5) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium password';
            strengthText.style.color = '#ffa500';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong password';
            strengthText.style.color = '#51cf66';
        }
    });

    function calculatePasswordStrength(password) {
        let score = 0;

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        return { score };
    }

    // Form Validation with Enhanced Checks
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsChecked = document.getElementById('terms').checked;

        // Validation checks
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s+()-]+$/;

        if (!name || !email || !phone || !password || !confirmPassword) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        if (name.length < 2) {
            showToast('Please enter your full name.', 'error');
            return;
        }

        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
            showToast('Please enter a valid phone number.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match!', 'error');
            return;
        }

        if (password.length < 8) {
            showToast('Password must be at least 8 characters.', 'error');
            return;
        }

        const strength = calculatePasswordStrength(password);
        if (strength.score < 3) {
            showToast('Please use a stronger password.', 'error');
            return;
        }

        if (!termsChecked) {
            showToast('Please accept the Terms & Conditions.', 'error');
            return;
        }

        // Simulate account creation
        simulateSignup(name, email, phone);
    });

    // Simulate signup process
    function simulateSignup(name, email, phone) {
        const submitBtn = signupForm.querySelector('.btn-signup');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            showToast('Account created successfully! Welcome to TMA.', 'success');

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Reset form
            signupForm.reset();
            strengthContainer.classList.remove('visible');

            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    }

    // Social Signup Buttons
    const googleBtn = document.querySelector('.btn-google');
    const facebookBtn = document.querySelector('.btn-facebook');

    googleBtn.addEventListener('click', function () {
        showToast('Google signup coming soon!', 'info');
        // Implement Google OAuth here
    });

    facebookBtn.addEventListener('click', function () {
        showToast('Facebook signup coming soon!', 'info');
        // Implement Facebook OAuth here
    });

    // Terms & Conditions Link
    const termsLinks = document.querySelectorAll('.terms-link');
    termsLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Terms & Conditions page coming soon!', 'info');
            // Link to actual terms page when available
        });
    });

    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger reflow to enable transition
        toast.offsetHeight;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});