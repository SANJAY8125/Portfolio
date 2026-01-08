import './style.css'

// Time Update
function updateTime() {
  const timeEl = document.getElementById('time');
  if (timeEl) {
    const now = new Date();
    timeEl.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}

setInterval(updateTime, 1000);
updateTime();

console.log("Bento Grid Loaded");

// Particle Background Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

// Resize Canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log("Canvas Resized:", canvas.width, canvas.height); // DEBUG
  initParticles();
}
window.addEventListener('resize', resize);

// Mouse Interaction
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  // Update CSS variables for cards spotlight too
  document.body.style.setProperty('--mouse-x', `${e.x}px`);
  document.body.style.setProperty('--mouse-y', `${e.y}px`);
});

// Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 2; // HUGE DOTS FOR DEBUG
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 30) + 1;
    this.color = 'rgba(255, 255, 255, 0.1)'; // Subtle dark mode dots
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    // ... (keep logic) ...

    // Interaction Logic
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = 150;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < maxDistance) {
      this.x -= directionX * 2;
      this.y -= directionY * 2;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
    this.draw();
  }
}

function initParticles() {
  particles = [];
  const numberOfParticles = (canvas.width * canvas.height) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
  console.log("Particles Initialized. Count:", particles.length); // DEBUG
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

// Start
resize();
animate();

// Project Card Interaction
const vitalRouteCard = document.getElementById('vitalroute-card');
if (vitalRouteCard) {
  vitalRouteCard.addEventListener('click', (e) => {
    // Don't toggle if clicking the GitHub link directly
    if (e.target.closest('.project-github-link')) return;

    vitalRouteCard.classList.toggle('active');
  });
}
