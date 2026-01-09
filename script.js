window.addEventListener('load', () => {
    // 1. Obsługa Preloadera
    const loader = document.querySelector('.loader-wrapper');
    
    // Symulacja lekkiego opóźnienia dla efektu napięcia
    setTimeout(() => {
        loader.style.transform = 'translateY(-100%)';
    }, 1500);

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// 3. Opcjonalnie: Smooth Scroll dla linków
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});