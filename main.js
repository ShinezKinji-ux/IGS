/* ===== PARTICLE SYSTEM ===== */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;

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

                // Create transition overlay
                const overlay = document.createElement('div');
                overlay.className = 'page-transition';
                overlay.innerHTML = '<div class="transition-spinner"></div>';
                document.body.appendChild(overlay);

                // Fade out content
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.role-card, .rule-item, .competition-list li, .point-card, .class-badge, .link-card').forEach(el => {
        observer.observe(el);
    });
}

/* ===== MOUSE PARALLAX ===== */
function initMouseParallax() {
    const blobs = document.querySelectorAll('.bg-blob');
    if (!blobs.length) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 15;
            blob.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ===== TILT EFFECT ON CARDS ===== */
function initTiltEffect() {
    const cards = document.querySelectorAll('.nav-card, .role-card, .link-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ===== TEXT SCRAMBLE EFFECT ===== */
function initTextScramble() {
    const titleLines = document.querySelectorAll('.title-line');

    titleLines.forEach(line => {
        const originalText = line.getAttribute('data-text');
        if (!originalText) return;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iteration = 0;

        line.addEventListener('mouseenter', () => {
            const interval = setInterval(() => {
                line.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }

                iteration += 1/3;
            }, 30);

            setTimeout(() => {
                iteration = 0;
            }, 100);
        });
    });
}

/* ===== GLITCH EFFECT ON BADGE ===== */
function initGlitchEffect() {
    const badge = document.querySelector('.badge-text');
    if (!badge) return;

    setInterval(() => {
        badge.style.textShadow = `${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px ${Math.random() * 10}px var(--primary-glow)`;

        setTimeout(() => {
            badge.style.textShadow = '0 0 30px var(--primary-glow)';
        }, 100);
    }, 3000);
}

/* ===== RIPPLE EFFECT ===== */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.nav-card, .link-card, .back-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ===== RIPPLE KEYFRAME ===== */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ===== COUNTING ANIMATION ===== */
function initCountingAnimation() {
    const pointValues = document.querySelectorAll('.point-value');

    pointValues.forEach(el => {
        const target = parseInt(el.textContent);
        if (isNaN(target)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current);
                    }, 50);
                    observer.unobserve(el);
                }
            });
        });

        observer.observe(el);
    });
}

/* ===== FLOATING ELEMENTS ===== */
function initFloatingElements() {
    const elements = document.querySelectorAll('.role-icon, .card-icon, .link-icon-wrapper');

    elements.forEach((el, index) => {
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }
`;
document.head.appendChild(floatStyle);

/* ===== INITIALIZE ===== */
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initPageTransition();
    initScrollAnimations();
    initMouseParallax();
    initTiltEffect();
    initTextScramble();
    initGlitchEffect();
    initRippleEffect();
    initCountingAnimation();
    initFloatingElements();
});
