/* ===== PARTICLE SYSTEM ===== */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 12) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';

        const colors = ['#e94560', '#0ea5e9', '#f59e0b', '#8b5cf6', '#06b6d4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

        container.appendChild(particle);
    }
}

/* ===== PAGE TRANSITION ===== */
function initPageTransition() {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();

                document.body.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                document.body.style.opacity = '0';
                document.body.style.transform = 'scale(0.98)';

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
}

/* ===== MOUSE PARALLAX ===== */
function initMouseParallax() {
    const blobs = document.querySelectorAll('.mesh-blob');
    if (!blobs.length) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.03;
        currentY += (mouseY - currentY) * 0.03;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 12;
            blob.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ===== 3D TILT EFFECT ===== */
function initTiltEffect() {
    const cards = document.querySelectorAll('.nav-card, .role-item, .social-card, .event-box, .rule-entry, .comp-item, .pt-card, .cls-badge');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ===== TEXT SCRAMBLE ===== */
function initTextScramble() {
    const words = document.querySelectorAll('.word[data-text]');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

    words.forEach(word => {
        const originalText = word.getAttribute('data-text');
        if (!originalText) return;

        word.addEventListener('mouseenter', () => {
            let iteration = 0;
            const interval = setInterval(() => {
                word.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }
                iteration += 0.5;
            }, 30);
        });
    });
}

/* ===== GLITCH LOGO ===== */
function initGlitchLogo() {
    const logo = document.querySelector('.logo-text');
    if (!logo) return;

    setInterval(() => {
        logo.style.textShadow = `
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0px rgba(233,69,96,0.5),
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0px rgba(14,165,233,0.5)
        `;

        setTimeout(() => {
            logo.style.textShadow = 'none';
        }, 100);
    }, 4000);
}

/* ===== RIPPLE EFFECT ===== */
function initRippleEffect() {
    const clickableElements = document.querySelectorAll('.nav-card, .social-card, .back-btn, .role-item, .rule-entry, .comp-item, .pt-card, .cls-badge');

    clickableElements.forEach(el => {
        el.addEventListener('click', function(e) {
            if (this.tagName === 'A' && this.getAttribute('href')?.startsWith('http')) return;

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleExpand 0.7s ease-out;
                pointer-events: none;
                z-index: 10;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 700);
        });
    });
}

/* Add ripple keyframe */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleExpand {
        to { transform: scale(2); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

/* ===== COUNTING ANIMATION ===== */
function initCountingAnimation() {
    const counters = document.querySelectorAll('.pt-value');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 25;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 40);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

/* ===== FLOATING ICONS ===== */
function initFloatingIcons() {
    const icons = document.querySelectorAll('.role-avatar, .card-icon-wrap, .social-icon, .comp-num');

    icons.forEach((icon, index) => {
        icon.style.animation = `gentleFloat ${3 + Math.random() * 2}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.15}s`;
    });
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes gentleFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
    }
`;
document.head.appendChild(floatStyle);

/* ===== MAGNETIC CURSOR EFFECT ===== */
function initMagneticCursor() {
    const magneticElements = document.querySelectorAll('.nav-card, .social-card');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.event-box, .rule-entry, .role-item, .comp-item, .pt-card, .cls-badge').forEach(el => {
        observer.observe(el);
    });
}

/* ===== CUSTOM CURSOR GLOW ===== */
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(233,69,96,0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    let glowX = 0, glowY = 0;
    let currentGlowX = 0, currentGlowY = 0;

    document.addEventListener('mousemove', (e) => {
        glowX = e.clientX;
        glowY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animateGlow() {
        currentGlowX += (glowX - currentGlowX) * 0.1;
        currentGlowY += (glowY - currentGlowY) * 0.1;
        glow.style.left = currentGlowX + 'px';
        glow.style.top = currentGlowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ===== INITIALIZE ALL ===== */
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initPageTransition();
    initMouseParallax();
    initTiltEffect();
    initTextScramble();
    initGlitchLogo();
    initRippleEffect();
    initCountingAnimation();
    initFloatingIcons();
    initMagneticCursor();
    initScrollReveal();
    initCursorGlow();
});
