// ── LOGOS ──
const logos = {
    light: 'assets/logo-edp.png',
    dark:  'assets/edpblackk.png',
};

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hide");
    }, 500); 
});

function updateLogos(theme) {
    const src = theme === 'dark' ? logos.dark : logos.light;
    ['heroLogo','headerLogo','aboutLogo'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.src = src;
    });
}

function toggleTheme() {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    updateLogos(newTheme);
}

// ── MENÚ MÓVIL ──
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// ── SMOOTH SCROLL (solo anclas internas, excluye links externos) ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// ── INIT ──
window.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateLogos(currentTheme);
    initReveal();
});

// ── FAQ ──
function toggleFaq(btn) {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ── MODAL PORTAFOLIO ──
document.querySelectorAll('.portfolio-item[data-link]').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.getAttribute('data-title');
        const desc  = item.getAttribute('data-desc');
        const tech  = item.getAttribute('data-tech');
        const link  = item.getAttribute('data-link');
        const bgImg = item.style.backgroundImage;

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent  = desc;
        document.getElementById('modalTech').textContent  = tech;

        // Fix: asignar href directamente al elemento <a>
        const modalLink = document.getElementById('modalLink');
        modalLink.setAttribute('href', link);
        // Asegura que no interfiera el smooth scroll
        modalLink.onclick = (e) => {
            e.stopPropagation();
            window.open(link, '_blank', 'noopener,noreferrer');
        };

        document.getElementById('modalImage').style.backgroundImage = bgImg;
        document.getElementById('portfolioModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal(e) {
    if (e.target === document.getElementById('portfolioModal')) closeModalBtn();
}

function closeModalBtn() {
    document.getElementById('portfolioModal').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalBtn();
});

// ── GALERÍA SPA ──
const mainContent  = document.getElementById('mainContent');
const galleryView  = document.getElementById('galleryView');

function openGallery() {
    mainContent.style.display  = 'none';
    galleryView.style.display  = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('navLinks').classList.remove('active');
}

function closeGallery() {
    galleryView.style.display  = 'none';
    mainContent.style.display  = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lightbox dentro de la galería
document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const src   = thumb.getAttribute('data-src') || thumb.style.backgroundImage.replace(/url\(["']?|["']?\)/g, '');
        const title = thumb.getAttribute('data-title') || '';
        document.getElementById('lightboxImg').src             = src;
        document.getElementById('lightboxTitle').textContent   = title;
        document.getElementById('galleryLightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox(e) {
    const lb = document.getElementById('galleryLightbox');
    if (!e || e.target === lb) {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ── SCROLL REVEAL ──
let revealObserver;

function initReveal() {
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── MODAL REBRANDING ──
function openRebrandingModal() {
    document.getElementById('rebrandingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
 
function closeRebrandingModal(e) {
    if (e && e.target !== document.getElementById('rebrandingModal')) return;
    closeRebrandingModalBtn();
}
 
function closeRebrandingModalBtn() {
    document.getElementById('rebrandingModal').classList.remove('active');
    document.body.style.overflow = '';
}
 