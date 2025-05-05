// Advanced Animations for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initParallaxEffects();
    initScrollAnimations();
    initCustomCursor();
    init3DCardEffects();
    initTypewriterEffect();
    initSkillsAnimation();
});

// Custom cursor implementation
function initCustomCursor() {
    const cursorInner = document.createElement('div');
    const cursorOuter = document.createElement('div');
    
    cursorInner.classList.add('cursor-inner');
    cursorOuter.classList.add('cursor-outer');
    
    document.body.appendChild(cursorInner);
    document.body.appendChild(cursorOuter);
    
    document.addEventListener('mousemove', function(e) {
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
        
        cursorOuter.style.left = e.clientX + 'px';
        cursorOuter.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to all clickable elements
    const clickables = document.querySelectorAll('a, button, .cursor-pointer');
    clickables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorInner.classList.add('cursor-hover');
            cursorOuter.classList.add('cursor-hover');
        });
        
        item.addEventListener('mouseleave', () => {
            cursorInner.classList.remove('cursor-hover');
            cursorOuter.classList.remove('cursor-hover');
        });
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for header section
        const header = document.querySelector('.h-screen');
        if (header) {
            header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        // Parallax for personal image
        const personalImage = document.querySelector('#about img');
        if (personalImage) {
            personalImage.style.transform = `translateY(${scrollPosition * 0.03}px) rotate(${scrollPosition * 0.01}deg)`;
        }
    });
}

// 3D card hover effects for projects and services
function init3DCardEffects() {
    const cards = document.querySelectorAll('#services .grid > div, #work .grid > a');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMove);
        card.addEventListener('mouseleave', handleCardLeave);
    });
    
    function handleCardMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        card.style.transition = 'transform 0.1s ease';
        
        // Add shine effect
        const shine = card.querySelector('.shine') || createShineElement(card);
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
    }
    
    function createShineElement(parent) {
        const shine = document.createElement('div');
        shine.classList.add('shine');
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.pointerEvents = 'none';
        shine.style.zIndex = '1';
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        parent.appendChild(shine);
        return shine;
    }
    
    function handleCardLeave() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        this.style.transition = 'transform 0.5s ease';
        
        const shine = this.querySelector('.shine');
        if (shine) {
            shine.style.background = 'none';
        }
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-ready, .fade-in-left, .fade-in-right, .scale-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to elements that don't have them yet
    document.querySelectorAll('#about h2, #services h2, #work h2, #contact h2').forEach(heading => {
        if (!heading.classList.contains('animate-ready')) {
            heading.classList.add('animate-ready');
            observer.observe(heading);
        }
    });
    
    // Add staggered animations to services and projects
    document.querySelectorAll('#services .grid > div').forEach((item, index) => {
        if (!item.classList.contains('fade-in-up')) {
            item.classList.add('fade-in-up', 'animate-ready');
            item.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
            observer.observe(item);
        }
    });
    
    document.querySelectorAll('#work .grid > a').forEach((item, index) => {
        if (!item.classList.contains('scale-up')) {
            item.classList.add('scale-up', 'animate-ready');
            item.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
            observer.observe(item);
        }
    });
}

// Typewriter effect for the main heading
function initTypewriterEffect() {
    const heading = document.querySelector('h1');
    if (!heading) return;
    
    const originalText = heading.textContent;
    heading.textContent = '';
    heading.style.borderRight = '0.1em solid #3B82F6';
    heading.style.animation = 'blink-caret 0.75s step-end infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heading.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove the blinking cursor after typing is complete
            setTimeout(() => {
                heading.style.borderRight = 'none';
                heading.style.animation = 'none';
            }, 1500);
        }
    };
    
    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 500);
}

// Skills animation for the tools section
function initSkillsAnimation() {
    const tools = document.querySelectorAll('#about ul:last-of-type li');
    
    tools.forEach((tool, index) => {
        tool.style.opacity = '0';
        tool.style.transform = 'translateY(20px)';
        tool.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        tool.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
        
        setTimeout(() => {
            tool.style.opacity = '1';
            tool.style.transform = 'translateY(0)';
        }, 500);
    });
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active-link');
            });
            this.classList.add('active-link');
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('div[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active-link');
        }
    });
});