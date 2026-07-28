/* ==========================================================================
   IGS — INDONESIAN GAKURAN SCHOOL
   Script utama, dipakai bersama oleh semua halaman.
   Navbar & footer di-generate dari sini supaya semua halaman HTML
   benar-benar terhubung lewat satu sumber yang sama.
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var NAV_ITEMS = [
    { href: 'index.html', label: 'Beranda', key: 'home' },
    { href: 'role.html', label: 'Role', key: 'role' },
    { href: 'rules.html', label: 'Rules', key: 'rules' },
    { href: 'event.html', label: 'Event', key: 'event' },
    { href: 'link.html', label: 'Link', key: 'link' }
  ];

  var DISCORD_URL = 'https://discord.gg/D3g3sGzHh';
  var TIKTOK_URL = 'https://www.tiktok.com/@shinezkhazari?_r=1&amp;_t=ZS-98N7mIoZmjP';

  /* ---------- NAVBAR ---------- */
  function initNavbar() {
    var placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;
    placeholder.classList.add('navbar');

    var currentPage = document.body.getAttribute('data-page') || 'home';
    var linksHTML = NAV_ITEMS.map(function (item) {
      var active = item.key === currentPage ? ' active' : '';
      return '<a href="' + item.href + '" class="nav-link' + active + '">' + item.label + '</a>';
    }).join('');

    placeholder.innerHTML =
      '<div class="nav-container">' +
        '<a href="index.html" class="nav-logo">' +
          '<span class="crest-mini">IGS</span>' +
          '<span class="nav-wordmark">Indonesian Gakuran School</span>' +
        '</a>' +
        '<nav class="nav-links" id="navLinks">' + linksHTML + '</nav>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Buka menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>';

    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });

    window.addEventListener('scroll', function () {
      placeholder.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---------- FOOTER ---------- */
  function initFooter() {
    var placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;
    placeholder.classList.add('site-footer');

    placeholder.innerHTML =
      '<div class="footer-content">' +
        '<div class="footer-brand">' +
          '<span class="crest-mini">IGS</span>' +
          '<div class="footer-brand-text">' +
            '<span class="footer-logo">IGS</span>' +
            '<p>Indonesian Gakuran School</p>' +
          '</div>' +
        '</div>' +
        '<nav class="footer-links">' +
          NAV_ITEMS.map(function (item) { return '<a href="' + item.href + '">' + item.label + '</a>'; }).join('') +
        '</nav>' +
        '<div class="footer-social">' +
          '<a href="' + DISCORD_URL + '" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>' +
          '<a href="' + TIKTOK_URL + '" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>' +
        '</div>' +
      '</div>' +
      '<p class="footer-bottom">&copy; 2026 Indonesian Gakuran School. Dibuat dengan &#127800; untuk seluruh warga IGS.</p>';
  }

  /* ---------- SAKURA PETAL CANVAS ---------- */
  function initSakuraCanvas() {
    if (prefersReducedMotion) return;
    var canvas = document.getElementById('sakuraCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w, h, petals = [];
    var COUNT = window.innerWidth < 768 ? 16 : 30;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function Petal() { this.reset(true); }
    Petal.prototype.reset = function (initial) {
      this.x = Math.random() * w;
      this.y = initial ? Math.random() * h : -20;
      this.size = 5 + Math.random() * 7;
      this.speedY = .35 + Math.random() * 1;
      this.speedX = Math.random() * .5 - .25;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - .5) * .02;
      this.swaySeed = Math.random() * 1000;
      this.opacity = .25 + Math.random() * .4;
    };
    Petal.prototype.update = function (time) {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin((time + this.swaySeed) * .001) * .5;
      this.rotation += this.rotationSpeed;
      if (this.y > h + 20 || this.x < -20 || this.x > w + 20) this.reset(false);
    };
    Petal.prototype.draw = function (ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      var grad = ctx.createLinearGradient(-this.size, 0, this.size, 0);
      grad.addColorStop(0, '#f0aec2');
      grad.addColorStop(1, '#c9a355');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * .55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    for (var i = 0; i < COUNT; i++) petals.push(new Petal());

    function animate(time) {
      ctx.clearRect(0, 0, w, h);
      petals.forEach(function (p) { p.update(time); p.draw(ctx); });
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  /* ---------- SCROLL PROGRESS ---------- */
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initScrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- COUNTERS (Round Point di halaman event) ---------- */
  function animateCounter(el, target, duration) {
    duration = duration || 900;
    var startTime = null;
    function tick(now) {
      if (startTime === null) startTime = now;
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var items = document.querySelectorAll('[data-count-target]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.textContent = el.getAttribute('data-count-target'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          animateCounter(el, parseInt(el.getAttribute('data-count-target'), 10));
          observer.unobserve(el);
        }
      });
    }, { threshold: .6 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- RIPPLE (tombol utama) ---------- */
  function initRipple() {
    document.querySelectorAll('.ripple').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var rect = this.getBoundingClientRect();
        var span = document.createElement('span');
        var size = Math.max(rect.width, rect.height);
        span.className = 'ripple-effect';
        span.style.width = span.style.height = size + 'px';
        span.style.left = (e.clientX - rect.left - size / 2) + 'px';
        span.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(span);
        span.addEventListener('animationend', function () { span.remove(); });
      });
    });
  }

  /* ---------- SCROLL TO TOP ---------- */
  function initScrollTop() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- TRANSISI HALUS ANTAR HALAMAN ---------- */
  function initPageTransitions() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.indexOf('http') === 0 ||
          href.indexOf('mailto:') === 0 || link.target === '_blank') return;
      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        if (prefersReducedMotion) { window.location.href = href; return; }
        document.body.classList.add('page-exit');
        setTimeout(function () { window.location.href = href; }, 360);
      });
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initFooter();
    initSakuraCanvas();
    initScrollProgress();
    initScrollReveal();
    initCounters();
    initRipple();
    initScrollTop();
    initPageTransitions();
  });

  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) setTimeout(function () { preloader.classList.add('hidden'); }, prefersReducedMotion ? 0 : 380);
  });
})();
