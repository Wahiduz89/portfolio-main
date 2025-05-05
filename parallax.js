// Parallax scrolling effects for modern website feel

document.addEventListener('DOMContentLoaded', () => {
  // Parallax effect for hero section
  const heroSection = document.querySelector('.w-11/12.max-w-3xl');
  const heroImage = document.querySelector('.w-11/12.max-w-3xl img');
  
  // Smooth scroll progress tracker
  let lastScrollTop = 0;
  let ticking = false;
  
  // Handle scroll events with requestAnimationFrame for performance
  window.addEventListener('scroll', () => {
    lastScrollTop = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        applyParallaxEffects(lastScrollTop);
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Apply parallax effects based on scroll position
  function applyParallaxEffects(scrollPos) {
    // Hero section parallax
    if (heroSection && scrollPos <= window.innerHeight) {
      const translateY = scrollPos * 0.3;
      heroSection.style.transform = `translateY(${translateY}px)`;
      
      // Rotate hero image slightly for dynamic effect
      if (heroImage) {
        const rotate = scrollPos * 0.05;
        heroImage.style.transform = `rotate(${rotate}deg)`;
      }
    }
    
    // Subtle background parallax
    document.body.style.backgroundPositionY = `-${scrollPos * 0.05}px`;
    
    // Add subtle scale effect to visible sections
    const sections = document.querySelectorAll('div[id]');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = 
        rect.top < window.innerHeight && 
        rect.bottom > 0;
      
      if (isVisible) {
        const distanceFromCenter = Math.abs(rect.top + rect.height/2 - window.innerHeight/2);
        const scale = 1 - Math.min(distanceFromCenter / window.innerHeight * 0.05, 0.05);
        section.style.transform = `scale(${scale})`;
      }
    });
  }
  
  // Add smooth mouse-follow effect to CTA buttons
  const ctaButtons = document.querySelectorAll('.px-10.py-3');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Apply subtle tilt effect
      const tiltX = (y - centerY) / 10;
      const tiltY = (centerX - x) / 10;
      
      button.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
    });
  });
});