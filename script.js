/* ============================================
   Bremer House - JavaScript
   Animations, Scroll Effects, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    });
    // Fallback
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // --- Navbar Scroll ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Navbar background
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 30);
    }

    // --- Collection Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const collectionItems = document.querySelectorAll('.collection-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            collectionItems.forEach((item, i) => {
                const category = item.getAttribute('data-category');
                const show = filter === 'all' || category === filter;

                item.style.transition = 'all 0.4s ease';
                if (show) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, i * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => { item.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;

            const waMessage = `Hello Bremer House! I'm ${name}.${interest ? ` I'm interested in ${interest}.` : ''}${message ? ` ${message}` : ''}${phone ? ` My phone: ${phone}` : ''}`;
            const waURL = `https://wa.me/254742135327?text=${encodeURIComponent(waMessage)}`;
            window.open(waURL, '_blank');
            contactForm.reset();
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Parallax on hero ---
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-content');
        if (hero && window.scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
            hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.8;
        }
    });

    // --- Image placeholder hover tilt effect ---
    document.querySelectorAll('.collection-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            item.style.transform = `translateY(-8px) perspective(600px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) perspective(600px) rotateX(0) rotateY(0)';
        });
    });

    // --- Typing effect on hero subtitle ---
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 12);
            }
        }
        setTimeout(typeWriter, 1500);
    }
});
