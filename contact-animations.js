// Contact Section Animation Logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for contact form elements
    const contactSection = document.getElementById('contact');
    const formElements = document.querySelectorAll('.form-element');
    const emailContainer = document.querySelector('.email-container');
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        // Animate form elements when they come into view
        formElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate-in')) {
                element.classList.add('animate-in');
            }
        });
        
        // Animate email container
        if (emailContainer && isInViewport(emailContainer) && !emailContainer.classList.contains('animate-in')) {
            emailContainer.classList.add('animate-in');
        }
    }
    
    // Add hover effects for footer links
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#6366F1';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add subtle parallax effect to contact section background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (contactSection) {
            const contactSectionTop = contactSection.offsetTop;
            const distance = scrollPosition - contactSectionTop;
            
            if (distance > -window.innerHeight && distance < contactSection.offsetHeight) {
                // Apply parallax effect to background
                contactSection.style.backgroundPositionY = (50 + (distance * 0.05)) + '%';
            }
        }
    });
});