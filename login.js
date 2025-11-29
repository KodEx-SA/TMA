'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Loader Animation
    const loaderContainer = document.querySelector('.loader-container');
    const loaderLogo = document.querySelector('.loader-logo');
    const loginSection = document.querySelector('.login');
    const loginContainer = document.querySelector('.login-container');
    const minLoaderTime = 1500;
    const startTime = Date.now();

    setTimeout(() => {
        loaderContainer.classList.add('doors-open');
        loaderLogo.classList.add('fade-out');
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            loginSection.style.display = 'flex';
            loginContainer.classList.add('visible');
        }, 1200);
    }, Math.max(0, minLoaderTime - (Date.now() - startTime)));

    // Password Toggle
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;

        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form Validation
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters.', 'error');
            return;
        }

        // Simulate login process
        // In production, this would be an API call to your backend
        simulateLogin(email, password, rememberMe);
    });

    // Simulate login (replace with actual authentication)
    function simulateLogin(email, password, rememberMe) {
        // Show loading state
        const submitBtn = loginForm.querySelector('.btn-login');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            // For demo purposes, accept any valid credentials
            // In production, verify against your backend
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            }

            showToast('Login successful! Welcome back.', 'success');

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Redirect to homepage after successful login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    }

    // Social Login Buttons
    const googleBtn = document.querySelector('.btn-google');
    const facebookBtn = document.querySelector('.btn-facebook');

    googleBtn.addEventListener('click', function () {
        showToast('Google login coming soon!', 'info');
        // Implement Google OAuth here
    });

    facebookBtn.addEventListener('click', function () {
        showToast('Facebook login coming soon!', 'info');
        // Implement Facebook OAuth here
    });

    // Forgot Password
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();

        if (!email) {
            showToast('Please enter your email address first.', 'error');
            document.getElementById('email').focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate password reset
        showToast(`Password reset link sent to ${email}`, 'success');
    });

    // Pre-fill email if remembered
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }

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