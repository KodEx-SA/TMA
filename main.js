'use strict'
document.addEventListener('DOMContentLoaded', function () {
    const loaderContainer = document.querySelector('.loader-container');
    const loaderLogo = document.querySelector('.loader-logo');
    const doorLeft = document.querySelector('.door-left');
    const doorRight = document.querySelector('.door-right');
    const heroSection = document.querySelector('.hero');

    // Minimum loader display time (1.2 seconds)
    const minLoaderTime = 1200;
    const startTime = Date.now();

    // Start the loader animation sequence
    setTimeout(() => {
        // Add class to open doors
        loaderContainer.classList.add('doors-open');

        // Fade out logo
        loaderLogo.classList.add('fade-out');

        // After doors have opened, hide loader and show hero
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            heroSection.style.display = 'block';
        }, 1000); // Match this with the door transition duration
    }, Math.max(0, minLoaderTime - (Date.now() - startTime)));
});

// Masonry Carousel Effect
const masonryGrid = document.querySelector('.masonry-grid');
let position = 0;
const speed = 0.05; // Adjust speed here (lower = slower)
let isAnimating = true;

function animateMasonry() {
    if (!isAnimating) return;
    
    position -= speed;

    // Reset position when it goes too far
    if (position < -66.66) {
        position = 0;
    }

    masonryGrid.style.transform = `translateX(${position}%)`;
    requestAnimationFrame(animateMasonry);
}

// Start animation after loader is gone
setTimeout(() => {
    animateMasonry();
}, 3000);

// Pause animation on hover (desktop only)
// if (window.innerWidth > 768) {
//     masonryGrid.addEventListener('mouseenter', () => {
//         isAnimating = true;
//     });

//     masonryGrid.addEventListener('mouseleave', () => {
//         isAnimating = true;
//     });
// }

// Sign Up Button Click
const signupBtn = document.querySelector('.btn-signup');
if (signupBtn) {
    signupBtn.addEventListener('click', function () {
        // You can replace this with actual signup functionality
    });
}

// Modal opening and closing functionality for model information
const modelCards = document.querySelectorAll('.model-card');
const modelModal = document.querySelector('.model-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalImg = document.querySelector('.modal-img');
const modalName = document.querySelector('.modal-name');
const modalBio = document.querySelector('.modal-bio');
const modalStats = document.querySelectorAll('.modal-stats p');

let modelData = {};

// Fetch model data from external JSON file
fetch('models.json')
    .then(response => response.json())
    .then(data => {
        modelData = data.reduce((acc, model) => {
            acc[model.id] = model;
            return acc;
        }, {});
    })
    .catch(error => console.error('Error loading models:', error));

modelCards.forEach(card => {
    card.addEventListener('click', () => {
        const modelId = card.dataset.model;
        const data = modelData[modelId];
        if (data) {
            modalImg.src = card.querySelector('img').src;
            modalName.textContent = data.name;
            modalBio.textContent = data.bio;
            modalStats[0].textContent = data.height;
            modalStats[1].textContent = data.measurements;
            modalStats[2].textContent = data.shoeSize;
            modalStats[3].textContent = data.hairEyes;
            modelModal.classList.add('active');
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeModal() {
    modelModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside content
modelModal.addEventListener('click', (e) => {
    if (e.target === modelModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modelModal.classList.contains('active')) {
        closeModal();
    }
});

// Add intersection observer for animations
const observerElements = document.querySelectorAll('.about-content, .models-container, .footer-container');

const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            contentObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

observerElements.forEach(el => {
    if (el) contentObserver.observe(el);
});

// Handle responsive behavior
function handleResize() {
    // Adjust speeds based on screen size
    if (window.innerWidth < 768) {
        // Disable hover pause on mobile
        // isAnimating = false;
    }
}

window.addEventListener('resize', handleResize);
handleResize();