// Scroll Progress Indicator

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll progress indicator
    initScrollProgress();
    
    // Add animation classes to elements if not already added by other scripts
    initAnimationClasses();
});

function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            // Calculate scroll progress percentage
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            // Update progress bar width
            scrollProgress.style.width = scrollPercentage + '%';
        });
    }
}

function initAnimationClasses() {
    // Add animation classes to elements that should be animated
    const sections = [
        { selector: '#about h2', animation: 'animate-ready' },
        { selector: '#services h2', animation: 'animate-ready' },
        { selector: '#work h2', animation: 'animate-ready' },
        { selector: '#contact h2', animation: 'animate-ready' },
        { selector: '#about p', animation: 'fade-in-left' },
        { selector: '#services .grid > div', animation: 'fade-in-up' },
        { selector: '#work .grid > a', animation: 'scale-up' }
    ];
    
    sections.forEach(section => {
        document.querySelectorAll(section.selector).forEach(element => {
            if (!element.classList.contains(section.animation)) {
                element.classList.add(section.animation);
            }
        });
    });
    
    // Initialize intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-ready, .fade-in-left, .fade-in-right, .scale-up, .fade-in-up').forEach(element => {
        observer.observe(element);
    });
}

// Add gradient animation class to buttons if not already added
document.querySelectorAll('a[href="#contact"]').forEach(button => {
    if (!button.classList.contains('gradient-animation')) {
        button.classList.add('gradient-animation');
    }
});

// Ensure the morph background effect is applied to the circular element in about section
const circularElement = document.querySelector('#about .rounded-full.translate-x-1\/4');
if (circularElement && !circularElement.classList.contains('morph-bg')) {
    circularElement.classList.add('morph-bg');
}