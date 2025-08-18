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

    // Dynamic Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Form Validation
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (name && email && password.length >= 6) {
            alert('Sign up successful! Welcome to Taahirah Modelling Agency.');
            signupForm.reset();
            // Optionally redirect to another page
            // window.location.href = '/dashboard';
        } else {
            alert('Please fill in all fields correctly. Password must be at least 6 characters.');
        }
    });
});