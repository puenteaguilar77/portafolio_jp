// Datos de proyectos
const projects = {
    intelisis: {
        title: "Intelisis Web",
        description: "Desarrollo frontend completo para el sistema ERP Intelisis Web utilizando AngularJS 1.8.3. Implementé microservicios para funcionalidades escalables, integración de librerías como Chart.js para reportes, Calendar.io para gestión de agendas, Summer Note para editores de texto enriquecido y DevExpress para componentes empresariales avanzados. El proyecto incluye diseño responsivo optimizado para todos los dispositivos.",
        images: [
            "images/intelisis_1.png",
            "images/intelisis_2.png",
            "images/intelisis_3.png"
        ]
    },
    "pos-fashion": {
        title: "POS Fashion",
        description: "Módulo de punto de venta especializado para la industria de la moda desarrollado con SDK Intelisis. Implementé una interfaz optimizada para procesos de venta rápida, gestión de inventario en tiempo real y reportes de ventas con Chart.js. El sistema incluye funcionalidades específicas para moda como gestión de tallas, colores y temporadas.",
        images: [
            "images/pos_fashion_1.png",
            "images/pos_fashion_2.png",
            "images/pos_fashion_3.png"
        ]
    },
    alivean: {
        title: "Sistema Médico Alivean",
        description: "Aplicación web para consultas y cotizaciones médicas desarrollada con Node.js y MySQL. Implementé un sistema de microservicios para procesamiento de datos médicos, portal administrativo para gestión de catálogos y reportes, y APIs REST para integración con sistemas externos. La aplicación logró incrementar su efectividad del 50% al 97%.",
        images: [
            "images/medical_1.png",
            "images/medical_2.png",
            "images/medical_3.png"
        ]
    }
};

// Elementos DOM
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-links a');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const projectGallery = document.getElementById('projectGallery');
const projectDescription = document.getElementById('projectDescription');
const modalClose = document.querySelector('.modal-close');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
const mobileOverlay = document.querySelector('.mobile-overlay');
const skillBars = document.querySelectorAll('.skill-progress');
const navLinksItems = document.querySelectorAll('.nav-links a');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const body = document.body;

// Menú móvil
let scrollPosition = 0;
function toggleMobileMenu() {
    const isOpening = !navLinksContainer.classList.contains('active');
    
    if (isOpening) {
        scrollPosition = window.pageYOffset;
        navLinksContainer.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileMenu.classList.add('active');
        body.classList.add('menu-open');
        
        body.style.top = `-${scrollPosition}px`;
        body.style.position = 'fixed';
        body.style.width = '100%';
    } else {
        // Cerrar menú
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    navLinksContainer.classList.remove('active');
    mobileOverlay.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Restaurar scroll del body
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    window.scrollTo(0, scrollPosition);
}

// Event listeners para menú móvil
mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});
mobileOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMobileMenu();
});

// Cerrar menú al hacer clic en enlaces

navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
        
        setTimeout(() => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    });
});

// Cerrar menú al hacer clic en el botón de tema (si está en el menú móvil)
if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
    });
}

// Cerrar menú con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Cerrar menú al redimensionar (si se cambia a desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinksContainer.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Cerrar menú al hacer clic fuera del menú (en el documento)
document.addEventListener('click', (e) => {
    if (navLinksContainer.classList.contains('active') && 
        !navLinksContainer.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        closeMobileMenu();
    }
});

// Prevenir que los clics dentro del menú se propaguen al documento
navLinksContainer.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Scroll para cambiar navegación activa
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Header con efecto al hacer scroll
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 10);
});

// Abrir modal de proyectos
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevenir comportamiento por defecto si se hizo clic en el enlace
        if (e.target.classList.contains('project-link') || e.target.parentElement.classList.contains('project-link')) {
            e.preventDefault();
        }
        
        const projectId = card.getAttribute('data-project');
        const project = projects[projectId];
        
        if (project) {
            modalTitle.textContent = project.title;
            projectDescription.innerHTML = `<p>${project.description}</p>`;
            
            // Limpiar galería anterior
            projectGallery.innerHTML = '';
            
            // Agregar imágenes a la galería
            project.images.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `<img src="${image}" alt="${project.title}" class="gallery-img">`;
                projectGallery.appendChild(galleryItem);
            });
            
            // Mostrar modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Cerrar modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Animación de barras de habilidades
function animateSkills() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (isElementInViewport(bar)) {
            bar.style.width = width + '%';
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Formulario de contacto - Seguridad Pro
const contactForm = document.getElementById('contactForm');
const endpoint = atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi9td3Z5cHJ5ZA==');

function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Honeypot check
    const gotcha = contactForm.querySelector('input[name="_gotcha"]').value;
    if (gotcha) return;

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Feedback visual inmediato
    submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== '_gotcha') {
                data[key] = sanitizeInput(value);
            }
        });

        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            // Éxito
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success-alert';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito!';
            contactForm.appendChild(successMsg);
            contactForm.reset();
            
            setTimeout(() => successMsg.remove(), 5000);
        } else {
            throw new Error('Server responded with error');
        }
    } catch (error) {
        console.error('Error al enviar:', error);
        alert('Hubo un problema al enviar el formulario. Por favor, verifica tu conexión e intenta nuevamente.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

window.addEventListener('load', () => {
    document.body.style.opacity = 1;
    
    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.project-card, .experience-item, .tech-category, .edu-card, .section-title');
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        // Add staggered delay based on horizontal position or index
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(el);
    });
    
    // Asegurar que el body tenga el ancho correcto en móvil
    if (window.innerWidth <= 768) {
        document.body.style.width = '100%';
        document.body.style.overflowX = 'hidden';
    }
    
    initParticles();
});

// ==========================================
// 5. MANEJO DE DESCARGA DE CV
// ==========================================
// El botón de descarga ahora utiliza un atributo 'download' en HTML apuntando al archivo PDF estático.
// No se requiere lógica de JavaScript para interceptar el clic.

// ==========================================
// SISTEMA DE PARTÍCULAS (MOLÉCULAS)
// ==========================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Configuración
    const particleCount = Math.min(window.innerWidth / 15, 100); // Responsivo a pantalla
    const connectionDistance = 120;
    const colors = ['rgba(59, 130, 246, 0.5)', 'rgba(139, 92, 246, 0.5)']; // Zafiro y Púrpura
    
    // Mouse interaction
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            // Movimiento
            this.x += this.vx;
            this.y += this.vy;
            
            // Rebote en bordes
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
            
            // Interacción con mouse
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceDirectionX * force * 1.5;
                    this.y -= forceDirectionY * force * 1.5;
                }
            }
            
            this.draw();
        }
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            
            // Conexiones
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance/connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
    
    resize();
    createParticles();
    animate();
}




document.addEventListener('touchmove', function(e) {
    // Solo prevenir el comportamiento por defecto en elementos específicos
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
}, { passive: false });

// Manejar el evento de orientación change en móvil
window.addEventListener('orientationchange', function() {
    // Pequeño delay para que la orientación se estabilice
    setTimeout(() => {
        if (navLinksContainer.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 300);
});
