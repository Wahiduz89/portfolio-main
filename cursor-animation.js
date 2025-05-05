// Modern cursor animation effect

document.addEventListener('DOMContentLoaded', () => {
  // Create cursor elements if they don't already exist
  if (!document.querySelector('.cursor-inner')) {
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    // Add classes for styling
    cursorOuter.classList.add('cursor-outer');
    cursorInner.classList.add('cursor-inner');
    
    // Append to body
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
  }
  
  const cursorInner = document.querySelector('.cursor-inner');
  const cursorOuter = document.querySelector('.cursor-outer');
  
  // Set initial position off-screen
  let mouseX = -100;
  let mouseY = -100;
  let innerX = -100;
  let innerY = -100;
  let outerX = -100;
  let outerY = -100;
  
  // Track cursor position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Handle cursor leaving the window
  document.addEventListener('mouseout', () => {
    mouseX = -100;
    mouseY = -100;
  });
  
  // Animate cursor with smooth follow effect
  function animateCursor() {
    // Calculate smooth movement with easing
    innerX += (mouseX - innerX) * 0.2;
    innerY += (mouseY - innerY) * 0.2;
    
    outerX += (mouseX - outerX) * 0.1;
    outerY += (mouseY - outerY) * 0.1;
    
    // Apply positions
    cursorInner.style.transform = `translate(${innerX}px, ${innerY}px)`;
    cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
    
    // Continue animation loop
    requestAnimationFrame(animateCursor);
  }
  
  // Start animation
  animateCursor();
  
  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .cursor-hover');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOuter.classList.add('cursor-hover');
      cursorInner.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOuter.classList.remove('cursor-hover');
      cursorInner.classList.remove('cursor-hover');
    });
  });
});