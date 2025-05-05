// Framer Motion animations for portfolio

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create the Intersection Observer with default options
  const createObserver = (options = {}) => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        // When an element enters the viewport
        if (entry.isIntersecting) {
          // Add animation classes with staggered delay
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 150); // 150ms staggered delay between each element
          
          // Unobserve after animation is applied
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: options.threshold || 0.2, // Trigger when 20% of the element is visible
      rootMargin: options.rootMargin || '0px 0px -100px 0px' // Adjust based on when you want animations to trigger
    });
  };
  
  // Create observers
  const observer = createObserver();
  const heroObserver = createObserver({ threshold: 0.1, rootMargin: '0px' });
  
  // Hero section animations
  const heroElements = document.querySelectorAll('.w-11/12.max-w-3xl > *');
  heroElements.forEach((element, index) => {
    element.classList.add('hero-animate');
    // Add staggered delay
    element.style.transitionDelay = `${index * 0.15}s`;
    heroObserver.observe(element);
  });
  
  // Services section animations
  const serviceCards = document.querySelectorAll('#services .grid > div');
  serviceCards.forEach(card => {
    // Add initial state class
    card.classList.add('animate-ready');
    // Start observing
    observer.observe(card);
  });
  
  // Projects section animations
  const projectCards = document.querySelectorAll('#work .grid > a');
  projectCards.forEach(card => {
    // Add initial state class
    card.classList.add('scale-up');
    // Start observing
    observer.observe(card);
  });
  
  // About section animations
  const aboutTitle = document.querySelector('#about h2');
  const aboutContent = document.querySelector('#about p');
  
  if (aboutTitle) {
    aboutTitle.classList.add('fade-in-left');
    observer.observe(aboutTitle);
  }
  
  if (aboutContent) {
    aboutContent.classList.add('fade-in-right');
    observer.observe(aboutContent);
  }
  
  // Contact section animations
  const contactTitle = document.querySelector('#contact h2');
  const contactDesc = document.querySelector('#contact p');
  const contactForm = document.querySelector('#contact form');
  
  if (contactTitle) {
    contactTitle.classList.add('fade-in-left');
    observer.observe(contactTitle);
  }
  
  if (contactDesc) {
    contactDesc.classList.add('fade-in-right');
    observer.observe(contactDesc);
  }
  
  if (contactForm) {
    contactForm.classList.add('scale-up');
    observer.observe(contactForm);
  }
  
  // Add subtle hover animations to navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
});