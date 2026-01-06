 const logos = {
            light: 'assets/edpp (1).png',  
            dark: 'assets/edpblackk.png',
        };

        function updateLogos(theme) {
            const heroLogo = document.getElementById('heroLogo');
            const headerLogo = document.getElementById('headerLogo');
            
            if (theme === 'dark') {
                heroLogo.src = logos.dark;
                headerLogo.src = logos.dark;
            } else {
                heroLogo.src = logos.light;
                headerLogo.src = logos.light;
            }
        }

        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            updateLogos(newTheme);
        }

        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }


        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    document.getElementById('navLinks').classList.remove('active');
                }
            });
        });

        window.addEventListener('DOMContentLoaded', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            updateLogos(currentTheme);
        });

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            status.style.display = 'block';
            status.style.color = 'green';
        } else {
            status.style.display = 'block';
            status.style.color = 'red';
            status.textContent = 'Ocurrió un error. Inténtalo de nuevo.';
        }
    } catch (error) {
        status.style.display = 'block';
        status.style.color = 'red';
        status.textContent = 'Error de conexión. Inténtalo más tarde.';
    }
});

