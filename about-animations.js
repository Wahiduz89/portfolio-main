// About section animations
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate
    const aboutTitle = document.querySelector('#about h2');
    const aboutIntro = document.querySelector('#about h4');
    const aboutImage = document.querySelector('#about .float');
    const aboutText = document.querySelector('#about p');
    const skillCards = document.querySelectorAll('#about ul li');
    const toolsTitle = document.querySelector('#about h4:last-of-type');
    const toolsIcons = document.querySelectorAll('#about ul:last-of-type li');
    
    // Add initial animation classes
    if (aboutTitle) aboutTitle.classList.add('fade-in-left', 'animate-ready');
    if (aboutIntro) aboutIntro.classList.add('fade-in-right', 'animate-ready');
    if (aboutImage) {
        aboutImage.classList.add('scale-up', 'animate-ready');
        // Enhanced floating effect
        aboutImage.style.transformStyle = 'preserve-3d';
    }
    if (aboutText) aboutText.classList.add('fade-in-left', 'animate-ready');
    
    // Add staggered animation to skill cards
    skillCards.forEach((card, index) => {
        card.classList.add('scale-up', 'animate-ready');
        card.style.transitionDelay = `${0.1 + (index * 0.15)}s`;
        
        // Add 3D tilt effect to cards
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = 20 * ((y - rect.height / 2) / rect.height);
            const yRotation = -20 * ((x - rect.width / 2) / rect.width);
            
            this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    if (toolsTitle) toolsTitle.classList.add('fade-in-right', 'animate-ready');
    
    // Add staggered animation to tools icons
    toolsIcons.forEach((icon, index) => {
        icon.classList.add('scale-up', 'animate-ready');
        icon.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.animate-ready');
        
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate-in')) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // Run once on load
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
});