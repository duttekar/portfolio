// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
  
  // Scroll-to-Top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scrollTop';
  scrollTopBtn.textContent = '↑';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1e90ff;
    color: #fff;
    font-size: 1.5rem;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(30, 144, 255, 0.8);
    cursor: pointer;
    display: none;
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.backgroundColor = '#63c5da';
    scrollTopBtn.style.boxShadow = '0 0 20px rgba(99, 197, 218, 0.8)';
  });
  
  scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.backgroundColor = '#1e90ff';
    scrollTopBtn.style.boxShadow = '0 0 10px rgba(30, 144, 255, 0.8)';
  });
  
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add interactivity to skills section
  const skillsList = document.querySelectorAll('#skills li');
  skillsList.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
      skill.style.color = '#50fa7b'; // Highlight skill on hover
      skill.style.transform = 'scale(1.1)';
      skill.style.transition = 'transform 0.2s, color 0.2s';
      skill.style.cursor = 'pointer';
    });
    skill.addEventListener('mouseleave', () => {
      skill.style.color = '#f8f8f2'; // Reset color
      skill.style.transform = 'scale(1)';
    });
  });
  
  // Adding a subtle fade-in animation to sections when they come into view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Adding a loader for page load
  document.addEventListener('DOMContentLoaded', () => {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0e0e0e;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-size: 2rem;
      color: #63c5da;
      text-shadow: 0 0 10px #63c5da;
    `;
    loader.textContent = 'Loading...';
    document.body.appendChild(loader);
  
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 1500); // Simulates loading time
  });
  