// Page 1 - Shooting Stars Animation
const canvas = document.getElementById('shootingStarsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shootingStars = [];

function createShootingStar() {
    const star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        size: 2 + Math.random() * 3,
        speed: 2 + Math.random() * 4,
        angle: Math.random() * Math.PI,
        length: 50 + Math.random() * 150,
        alpha: 1
    };
    shootingStars.push(star);
}

function drawShootingStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.lineWidth = star.size;
        ctx.lineCap = 'round';
        ctx.stroke();
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.01;

        if (star.alpha <= 0 || star.x > canvas.width || star.y > canvas.height) {
            shootingStars.splice(index, 1);
        }
    });
}

function animate() {
    if (Math.random() < 0.02) {
        createShootingStar();
    }
    drawShootingStars();
    requestAnimationFrame(animate);
}

animate();

// Page 5 - Fireworks Animation
const fireworksCanvas = document.getElementById('fireworksCanvas');
const fcctx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

let fireworks = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2 + Math.random() * 3;
        this.speed = 1 + Math.random() * 2;
        this.angle = Math.random() * Math.PI * 2;
        this.alpha = 1;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < 100; i++) {
            let particle = {
                x: this.x,
                y: this.y,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 3 + 1,
                angle: Math.random() * Math.PI * 2,
                alpha: 1
            };
            this.particles.push(particle);
        }
    }

    draw() {
        this.particles.forEach((particle, index) => {
            fcctx.beginPath();
            fcctx.moveTo(particle.x, particle.y);
            const endX = particle.x + Math.cos(particle.angle) * particle.speed;
            const endY = particle.y + Math.sin(particle.angle) * particle.speed;
            fcctx.lineTo(endX, endY);
            fcctx.strokeStyle = `rgba(255, 255, 255, ${particle.alpha})`;
            fcctx.lineWidth = particle.size;
            fcctx.lineCap = 'round';
            fcctx.stroke();
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.alpha -= 0.01;

            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }
}

function createFirework() {
    let x = Math.random() * fireworksCanvas.width;
    let y = Math.random() * fireworksCanvas.height / 2 + fireworksCanvas.height / 2;
    fireworks.push(new Firework(x, y));
}

function drawFireworks() {
    fcctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworks.forEach(firework => {
        firework.draw();
    });
}

function animateFireworks() {
    if (Math.random() < 0.05) {
        createFirework();
    }
    drawFireworks();
    requestAnimationFrame(animateFireworks);
}

animateFireworks();

// Page Navigation Functions
function goToNextPage() {
    const name = document.getElementById('nameInput').value.trim();
    if (name.length >= 2) {
        localStorage.setItem('userName', name);
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'flex';
        document.getElementById('user-name').textContent = name;
    } else {
        alert('Please enter a valid name (at least 2 characters).');
    }
}

function goToNextPage2() {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'flex';
}

function goToNextPage3() {
    document.getElementById('page3').style.display = 'none';
    document.getElementById('page4').style.display = 'flex';
}

function goToNextPage4() {
    document.getElementById('page4').style.display = 'none';
    document.getElementById('page5').style.display = 'flex';
}

function resetExperience() {
    document.getElementById('page5').style.display = 'none';
    document.getElementById('page1').style.display = 'flex';
}

// Show the first page initially
document.getElementById('page1').style.display = 'flex';