// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), +delay);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Form
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
        const res = await fetch(e.target.action, {
            method: 'POST',
            body: new FormData(e.target),
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            btn.textContent = 'Message Sent!';
            btn.style.background = '#059669';
            e.target.reset();
        } else {
            btn.textContent = 'Something went wrong';
            btn.style.background = '#dc2626';
        }
    } catch {
        btn.textContent = 'Something went wrong';
        btn.style.background = '#dc2626';
    }
    btn.disabled = false;
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 3000);
});
