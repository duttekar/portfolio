// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
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

// Adding a loader for page load with canvas animation
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
  `;

  const canvas = document.createElement('canvas');
  canvas.id = 'container';
  canvas.width = 200;
  canvas.height = 200;
  loader.appendChild(canvas);

  document.body.appendChild(loader);

  const points = [];
  const velocity2 = 5; // velocity squared
  const context = canvas.getContext('2d');
  const radius = 5;
  const boundaryX = 200;
  const boundaryY = 200;
  const numberOfPoints = 30;

  function init() {
    for (let i = 0; i < numberOfPoints; i++) {
      createPoint();
    }
    for (let i = 0, l = points.length; i < l; i++) {
      const point = points[i];
      if (i === 0) {
        points[i].buddy = points[points.length - 1];
      } else {
        points[i].buddy = points[i - 1];
      }
    }
    animate();
  }

  function createPoint() {
    const point = {};
    let vx2, vy2;
    point.x = Math.random() * boundaryX;
    point.y = Math.random() * boundaryY;
    point.vx = (Math.floor(Math.random()) * 2 - 1) * Math.random();
    vx2 = Math.pow(point.vx, 2);
    vy2 = velocity2 - vx2;
    point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
    points.push(point);
  }

  function resetVelocity(point, axis, dir) {
    if (axis === 'x') {
      point.vx = dir * Math.random();
      const vx2 = Math.pow(point.vx, 2);
      const vy2 = velocity2 - vx2;
      point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
    } else {
      point.vy = dir * Math.random();
      const vy2 = Math.pow(point.vy, 2);
      const vx2 = velocity2 - vy2;
      point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1);
    }
  }

  function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#97badc';
    context.fill();
  }

  function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = '#8ab2d8';
    context.stroke();
  }

  function draw() {
    for (let i = 0, l = points.length; i < l; i++) {
      const point = points[i];
      point.x += point.vx;
      point.y += point.vy;
      drawCircle(point.x, point.y);
      drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
      if (point.x < 0 + radius) {
        resetVelocity(point, 'x', 1);
      } else if (point.x > boundaryX - radius) {
        resetVelocity(point, 'x', -1);
      } else if (point.y < 0 + radius) {
        resetVelocity(point, 'y', 1);
      } else if (point.y > boundaryY - radius) {
        resetVelocity(point, 'y', -1);
      }
    }
  }

  function animate() {
    context.clearRect(0, 0, 200, 200);
    draw();
    requestAnimationFrame(animate);
  }

  init();

  // Remove loader after simulated delay
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }, 3000); // Simulated loading time
});
