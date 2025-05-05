// Smooth scroll animation for navigation links

document.addEventListener('DOMContentLoaded', () => {
  // Get all navigation links that point to page sections
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  // Add click event listener to each navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only if the link points to an element on the page
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Get the target's position with offset for fixed header
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Smooth scroll with easing
      smoothScrollTo(offsetPosition, 800); // 800ms duration
    });
  });
  
  // Smooth scroll function with easing
  function smoothScrollTo(to, duration) {
    const start = window.pageYOffset;
    const change = to - start;
    const increment = 20; // Update interval in ms
    let currentTime = 0;
    
    // Easing function: easeInOutQuad
    const easeInOutQuad = (t, b, c, d) => {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };
    
    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      window.scrollTo(0, val);
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    
    animateScroll();
  }
  
  // Add active state to navigation links based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll('div[id]');
    let scrollPosition = window.pageYOffset + 100; // Offset for better accuracy
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active-link');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active-link');
        }
      }
    });
  }
  
  // Update active link on scroll
  window.addEventListener('scroll', setActiveNavLink);
  
  // Set active link on page load
  setActiveNavLink();
});