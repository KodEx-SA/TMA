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
if (window.innerWidth > 768) {
    masonryGrid.addEventListener('mouseenter', () => {
        isAnimating = false;
    });

    masonryGrid.addEventListener('mouseleave', () => {
        isAnimating = true;
    });
}

// Modal opening and closing functionality for model information
const modelCards = document.querySelectorAll('.model-card');
const modelModal = document.querySelector('.model-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalImg = document.querySelector('.modal-img');
const modalName = document.querySelector('.modal-name');
const modalBio = document.querySelector('.modal-bio');

let modelData = {};

// Fetch model data from external JSON file
fetch('models.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load models data');
        }
        return response.json();
    })
    .then(data => {
        modelData = data.reduce((acc, model) => {
            acc[model.id] = model;
            return acc;
        }, {});
    })
    .catch(error => {
        console.error('Error loading models:', error);
        showToast('Failed to load model information. Please refresh the page.');
    });

modelCards.forEach(card => {
    card.addEventListener('click', () => {
        const modelId = parseInt(card.dataset.model);
        const data = modelData[modelId];

        if (data) {
            modalImg.src = card.querySelector('img').src;
            modalImg.alt = `${data.name} profile photo`;
            modalName.textContent = data.name;
            modalBio.textContent = data.bio;

            // Fixed: Use correct selectors for stat items
            document.querySelector('.stat-height').textContent = data.height;
            document.querySelector('.stat-measurements').textContent = data.measurements;
            document.querySelector('.stat-shoes').textContent = data.shoeSize;
            document.querySelector('.stat-hair-eyes').textContent = data.hairEyes;

            modelModal.classList.add('active');

            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            showToast('Model information not available.');
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

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
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
    // Re-enable hover pause when resizing to desktop
    if (window.innerWidth > 768) {
        masonryGrid.removeEventListener('mouseenter', pauseAnimation);
        masonryGrid.removeEventListener('mouseleave', resumeAnimation);
        masonryGrid.addEventListener('mouseenter', pauseAnimation);
        masonryGrid.addEventListener('mouseleave', resumeAnimation);
    }
}

function pauseAnimation() {
    isAnimating = false;
}

function resumeAnimation() {
    isAnimating = true;
    animateMasonry();
}

window.addEventListener('resize', handleResize);
handleResize();