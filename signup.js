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
            signupSection.style.display = 'block';
            signupContainer.classList.add('visible');
        }, 1200);
    }, Math.max(0, minLoaderTime - (Date.now() - startTime)));

    // Removed dynamic year since footer is static

    // Form Validation with Toast
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !password || !confirmPassword) {
            showToast('Please fill in all fields.');
            return;
        }
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            showToast('Passwords do not match!');
            return;
        }
        if (password.length < 6) {
            showToast('Password must be at least 6 characters.');
            return;
        }

        // Simulate successful signup (replace with backend fetch if available)
        showToast('Sign up successful! Welcome to Taahirah Modelling Agency.');
        signupForm.reset();
        Optionally: window.location.href = '/index.html'; // Redirect to homepage
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300); // Fade out time
        }, 3000);
    }
});