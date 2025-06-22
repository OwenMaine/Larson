// Initialize WOW.js for reveal animations
new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 100,
    mobile: true,
    live: true,
}).init();

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // Dynamically update the copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- ADDED: Header scroll effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    // --- END: Header scroll effect ---

    // MOBILE NAVIGATION TOGGLE SCRIPT
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');
    const body = document.body;

    if (menuButton && mobileMenu && openIcon && closeIcon) {
        menuButton.addEventListener('click', () => {
            // Toggle the menu's visibility class
            mobileMenu.classList.toggle('menu-open');

            // Toggle the open/close icons
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');

            // Prevent scrolling of the background content when the menu is open
            if (mobileMenu.classList.contains('menu-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
});

/* =========================================== */
/* ===   SERVICES ACCORDION SCRIPT         === */
/* =========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.service-accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const question = item.querySelector('.service-accordion-question');
            const answer = item.querySelector('.service-accordion-answer');

            question.addEventListener('click', () => {
                const isActive = question.classList.contains('active');

                // Close all other items for a clean accordion
                accordionItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.service-accordion-question');
                    const otherAnswer = otherItem.querySelector('.service-accordion-answer');
                    otherQuestion.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                });

                // Toggle the clicked item
                if (!isActive) {
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }
});
