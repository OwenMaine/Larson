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

    // Header scroll effect
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

    // MOBILE NAVIGATION TOGGLE SCRIPT
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');
    const body = document.body;

    if (menuButton && mobileMenu && openIcon && closeIcon) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-open');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            if (mobileMenu.classList.contains('menu-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // --- 3D FOIL BACKGROUND SCRIPT ---
    const container = document.getElementById('foil-canvas-container');
    if (container && typeof THREE !== 'undefined') {
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Plane Geometry
        const geometry = new THREE.PlaneGeometry(20, 12, 100, 100);

        // Material with foil-like properties
        const material = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            metalness: 0.9,
            roughness: 0.3,
            displacementScale: 0.3,
            side: THREE.DoubleSide
        });

        // Add a displacement map for the crinkled effect
        const textureLoader = new THREE.TextureLoader();
        const displacementMap = textureLoader.load('https://placehold.co/1024x1024/777777/777777?text=.'); // Simple placeholder as texture source
        material.displacementMap = displacementMap;

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffd300, 1.5); // Brand yellow light
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);
        
        camera.position.z = 5;

        // Animate the displacement over time
        const clock = new THREE.Clock();
        
        function animate() {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            // Slowly move the displacement texture to create a shimmering effect
            if(material.displacementMap) {
               material.displacementMap.offset.x = elapsedTime * 0.05;
               material.displacementMap.offset.y = elapsedTime * 0.03;
            }
            
            // Gently rotate the plane
            plane.rotation.y = elapsedTime * 0.02;
            plane.rotation.x = elapsedTime * 0.01;

            renderer.render(scene, camera);
        }
        
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
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
