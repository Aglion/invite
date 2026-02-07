// Check if returning from form submission
if (window.location.hash === '#success') {
    const form = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('successMessage');
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.classList.add('show');
    }
    // Scroll to success message
    setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// Form submission - let it submit naturally to FormSubmit
// Форма отправляется на https://formsubmit.co/vita_or@mail.ru

// Smooth scroll for anchor links (if any added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// Animate timeline items on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
});

// Parallax effect for hero section (отключен на мобильных для производительности)
let lastScrollTop = 0;
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const heroContent = document.querySelector('.hero-content');
            const scrollPercent = Math.min(scrollTop / window.innerHeight, 1);
            
            // Parallax effect
            requestAnimationFrame(() => {
                heroContent.style.transform = `translateY(${scrollTop * 0.5}px)`;
                heroContent.style.opacity = 1 - scrollPercent;
            });
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Add hover effect to form inputs
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Предотвращаем зум на iOS при фокусе на input
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.querySelectorAll('input, select, textarea').forEach(element => {
        const fontSize = window.getComputedStyle(element).fontSize;
        if (parseFloat(fontSize) < 16) {
            element.style.fontSize = '16px';
        }
    });
}

// Animate checkboxes and radio buttons
document.querySelectorAll('.checkbox-label, .radio-label').forEach(label => {
    label.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'labelClick 0.3s ease';
        }, 10);
    });
});

// Add floating particles effect (работает и на мобильных)
const isMobileDevice = window.innerWidth <= 768;

function createParticle() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
  
    const particle = document.createElement('div');
  
    const isHeart = Math.random() < 0.35; // 35% сердечки
    particle.className = `particle ${isHeart ? 'particle-heart' : 'particle-dot'}`;
  
    // общие параметры (на мобильных — меньше амплитуда и чуть прозрачнее)
    const dx = isMobileDevice ? Math.random() * 120 - 60 : Math.random() * 240 - 120;
    const dur = Math.random() * 10 + 10;
    const alpha = isMobileDevice ? Math.random() * 0.35 + 0.2 : Math.random() * 0.45 + 0.25;
  
    particle.style.setProperty('--x', `${Math.random() * 100}%`);
    particle.style.setProperty('--y', `${Math.random() * 100}%`);
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dur', `${dur}s`);
    particle.style.setProperty('--a', alpha);
  
    if (isHeart) {
      particle.style.background = 'transparent';
      particle.style.borderRadius = '0';
  
      const size = isMobileDevice ? Math.random() * 10 + 8 : Math.random() * 14 + 12;
      particle.style.setProperty('--s', `${size}px`);
  
      particle.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
        </svg>
      `;
    } else {
      const size = isMobileDevice ? Math.random() * 3 + 1.5 : Math.random() * 4 + 2;
      particle.style.setProperty('--s', `${size}px`);
    }
  
    hero.appendChild(particle);
    setTimeout(() => particle.remove(), (dur + 2) * 1000);
  }
  

// Create particles periodically (на мобильных — реже, чтобы не тормозило)
const particleInterval = isMobileDevice ? 800 : 500;
setInterval(createParticle, particleInterval);
