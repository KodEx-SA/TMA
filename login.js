'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const forgotModal = document.getElementById('forgotModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const forgotForm = document.getElementById('forgotForm');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;

        const icon = this.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    // Email validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Real-time validation
    const emailInput = document.getElementById('email');

    emailInput.addEventListener('blur', function () {
        if (this.value && !validateEmail(this.value)) {
            this.classList.add('error');
            this.classList.remove('success');
        } else if (this.value) {
            this.classList.remove('error');
            this.classList.add('success');
        }
    });

    emailInput.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            if (validateEmail(this.value)) {
                this.classList.remove('error');
                this.classList.add('success');
            }
        }
    });

    passwordInput.addEventListener('input', function () {
        if (this.value.length >= 8) {
            this.classList.remove('error');
            this.classList.add('success');
        } else if (this.classList.contains('error')) {
            if (this.value.length >= 8) {
                this.classList.remove('error');
            }
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        // Validation
        let isValid = true;

        if (!validateEmail(email)) {
            emailInput.classList.add('error');
            isValid = false;
        }

        if (password.length < 8) {
            passwordInput.classList.add('error');
            isValid = false;
        }

        if (!isValid) {
            showToast('Please enter valid credentials', 'error');
            return;
        }

        // Show loading state
        const submitBtn = loginForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            // For demo purposes - in production, validate against backend
            console.log('Login attempt:', { email, password, remember });

            // Success scenario
            showToast('Login successful! Redirecting...', 'success');

            // Save remember me preference
            if (remember) {
                localStorage.setItem('tma_remember', email);
            }

            // Redirect to dashboard (or index for now)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        }, 1500);
    });

    // Forgot password modal
    forgotPasswordLink.addEventListener('click', function (e) {
        e.preventDefault();
        forgotModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeModalBtn.addEventListener('click', function () {
        forgotModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal on outside click
    forgotModal.addEventListener('click', function (e) {
        if (e.target === forgotModal) {
            forgotModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && forgotModal.classList.contains('active')) {
            forgotModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Forgot password form submission
    forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const resetEmail = document.getElementById('resetEmail').value.trim();

        if (!validateEmail(resetEmail)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        const submitBtn = this.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            console.log('Password reset requested for:', resetEmail);

            showToast('Password reset link sent to your email', 'success');

            // Close modal and reset form
            setTimeout(() => {
                forgotModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                forgotForm.reset();
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }, 2000);

        }, 1500);
    });

    // Social login buttons
    const googleBtn = document.querySelector('.btn-google');
    const facebookBtn = document.querySelector('.btn-facebook');

    googleBtn.addEventListener('click', function () {
        showToast('Google login - Coming soon!', 'error');
        // In production, implement OAuth flow
        console.log('Google login clicked');
    });

    facebookBtn.addEventListener('click', function () {
        showToast('Facebook login - Coming soon!', 'error');
        // In production, implement OAuth flow
        console.log('Facebook login clicked');
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

    // Check for remembered email
    const rememberedEmail = localStorage.getItem('tma_remember');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }

    // Auto-focus on email field
    emailInput.focus();

    // Handle Enter key to move between fields
    emailInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });
});