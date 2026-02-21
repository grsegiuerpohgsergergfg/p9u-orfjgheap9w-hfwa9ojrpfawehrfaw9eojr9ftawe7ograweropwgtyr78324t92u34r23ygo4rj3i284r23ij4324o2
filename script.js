document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loader');
    const typingText = document.querySelector('.typing-text');
    const textToType = "REDEFINE THE SOUND. REDEFINE THE CULTURE.";
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                typeWriter();
            }, 500);
        }, 1500);
    });

    let i = 0;
    function typeWriter() {
        if (i < textToType.length) {
            typingText.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function renderCursor() {
            posX += (mouseX - posX) * 0.1;
            posY += (mouseY - posY) * 0.1;
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        const links = document.querySelectorAll('a, button, .play-btn, .cart-icon, .hamburger');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let scrollTotal = document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scroll = (scrollTotal / height) * 100;
        progressBar.style.width = scroll + "%";

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.children[0].style.transform = navLinks.classList.contains('nav-active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
        hamburger.children[1].style.opacity = navLinks.classList.contains('nav-active') ? '0' : '1';
        hamburger.children[2].style.transform = navLinks.classList.contains('nav-active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('about-text')) {
                    runCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    let countersRun = false;
    function runCounters() {
        if(countersRun) return;
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        countersRun = true;
    }

    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    const playBtn = document.getElementById('play-btn');
    const waveform = document.querySelector('.waveform');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if(isPlaying) {
            playBtn.classList.replace('fa-play', 'fa-pause');
            waveform.classList.add('playing');
        } else {
            playBtn.classList.replace('fa-pause', 'fa-play');
            waveform.classList.remove('playing');
        }
    });

    let cartCount = 0;
    const cartCountEl = document.getElementById('cart-count');
    const addBtns = document.querySelectorAll('.add-to-cart');
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cart-items');

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            cartCount++;
            cartCountEl.innerText = cartCount;
            const itemName = e.target.parentElement.querySelector('h3').innerText;
            
            const originalText = btn.innerText;
            btn.innerText = "ADDED TO VAULT";
            btn.style.background = "var(--red)";
            
            if(cartCount === 1) cartItems.innerHTML = '';
            cartItems.innerHTML += `<p style="margin: 10px 0; border-bottom: 1px solid #333; padding-bottom: 5px;">> ${itemName}</p>`;

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "transparent";
            }, 2000);
        });
    });

    cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
    closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
    cartModal.addEventListener('click', (e) => {
        if(e.target === cartModal) cartModal.classList.remove('active');
    });

    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        btn.innerText = "TRANSMITTING...";
        
        setTimeout(() => {
            btn.innerText = "SEND MESSAGE";
            formStatus.innerText = "SIGNAL RECEIVED. WE WILL REACH OUT.";
            formStatus.style.color = "var(--red)";
            formStatus.style.marginTop = "20px";
            formStatus.style.fontFamily = "var(--font-heading)";
            formStatus.style.letterSpacing = "2px";
            form.reset();
            
            setTimeout(() => { formStatus.innerText = ''; }, 5000);
        }, 1500);
    });

});