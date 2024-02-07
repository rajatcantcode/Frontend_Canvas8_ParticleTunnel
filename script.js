const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// resize
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 1000;//time to live
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl--;
  }
}

// Implementation
let particles;
function init() {
  particles = [];
}

let hue = 0;
let hueRadians = 0;
function generateRing() {
  //time for the new ring
  setTimeout(generateRing, 500);
  hue = Math.sin(hueRadians);

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    // full circle = pi * 2 radians dividing it with particle count to get a reference angle
    const radian = (Math.PI * 2) / particleCount;
    const x = mouse.x;
    const y = mouse.y;

    particles.push(
      new Particle(x, y, 2, `hsl(${Math.abs(hue * 720)}, 50%, 50%)`, {
        //particles are giong to form on mouse click
        //they are going to generated in all different direction in circle
        x: Math.cos(radian * i) * 3,
        y: Math.sin(radian * i) * 3,
      })
    );
  }

  hueRadians += 0.01;
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(1, 0, 0, 1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.ttl < 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });
}

init();
animate();
generateRing();

// resize
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
// Mobile functionality
canvas.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});
