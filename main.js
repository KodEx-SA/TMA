
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

function animateMasonry() {
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

// Sign Up Button Click
const signupBtn = document.querySelector('.btn-signup');
signupBtn.addEventListener('click', function () {
    // You can replace this with actual signup functionality
});

// Modal opening and closing functionality for model information
const modelCards = document.querySelectorAll('.model-card');
const modelModal = document.querySelector('.model-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalImg = document.querySelector('.modal-img');
const modalName = document.querySelector('.modal-name');
const modalBio = document.querySelector('.modal-bio');
const modalStats = document.querySelectorAll('.modal-stats p');

// Sample model data (you can store this in a JSON file or API)
const modelData = {
    1: {
        name: 'Amahle Dlamini',
        bio: 'Amahle is a versatile fashion and runway model with experience in international campaigns.',
        height: '5\'9"',
        measurements: '32-24-34',
        shoeSize: '8',
        hairEyes: 'Black/Brown'
    },
    2: {
        name: 'Lerato Moloi',
        bio: 'Lerato specializes in commercial and editorial modeling with a vibrant personality.',
        height: '5\'7"',
        measurements: '34-26-36',
        shoeSize: '7',
        hairEyes: 'Brown/Hazel'
    },
    // Add more model data as needed
};

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
        }
    });
});

closeModalBtn.addEventListener('click', () => {
    modelModal.classList.remove('active');
});

// Close modal when clicking outside content
modelModal.addEventListener('click', (e) => {
    if (e.target === modelModal) {
        modelModal.classList.remove('active');
    }
});



// Add intersection observer for footer animation
const footerContainer = document.querySelector('.footer-container');

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            footerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

footerObserver.observe(footerContainer);
