document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // CTA button smooth scroll to gallery
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        const gallerySection = document.querySelector('#gallery');
        const offsetTop = gallerySection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.paint-stroke');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe gallery cards
    const galleryCards = document.querySelectorAll('.artwork-card');
    galleryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe about section
    const aboutText = document.querySelector('.about-text');
    const aboutVisual = document.querySelector('.about-visual');
    
    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateX(-50px)';
        aboutText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(aboutText);
    }
    
    if (aboutVisual) {
        aboutVisual.style.opacity = '0';
        aboutVisual.style.transform = 'translateX(50px)';
        aboutVisual.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        observer.observe(aboutVisual);
    }

    // Add animate class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .artwork-card.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .about-text.animate {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        
        .about-visual.animate {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Gallery card hover effects
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });

    // Add paint drip effect on scroll
    let paintDrips = [];
    
    function createPaintDrip() {
        const drip = document.createElement('div');
        drip.className = 'paint-drip';
        drip.style.position = 'fixed';
        drip.style.width = '3px';
        drip.style.height = '20px';
        drip.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        drip.style.borderRadius = '50%';
        drip.style.left = Math.random() * window.innerWidth + 'px';
        drip.style.top = '-20px';
        drip.style.pointerEvents = 'none';
        drip.style.zIndex = '999';
        drip.style.opacity = '0.7';
        
        document.body.appendChild(drip);
        paintDrips.push(drip);
        
        // Animate the drip
        let position = -20;
        const speed = 2 + Math.random() * 3;
        
        function animateDrip() {
            position += speed;
            drip.style.top = position + 'px';
            
            if (position > window.innerHeight) {
                document.body.removeChild(drip);
                paintDrips = paintDrips.filter(d => d !== drip);
                return;
            }
            
            requestAnimationFrame(animateDrip);
        }
        
        animateDrip();
    }
    
    // Create paint drips occasionally while scrolling
    let lastScrollTime = 0;
    window.addEventListener('scroll', function() {
        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 500 && Math.random() < 0.3) {
            createPaintDrip();
            lastScrollTime = currentTime;
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });

    // Add active link styles
    const activeLinkStyle = document.createElement('style');
    activeLinkStyle.textContent = `
        .nav-links a.active {
            color: #4ecdc4;
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeLinkStyle);

    // Color blob animation enhancement
    const colorBlobs = document.querySelectorAll('.color-blob');
    colorBlobs.forEach((blob, index) => {
        blob.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        blob.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Dynamic background color change on scroll
    let currentColorIndex = 0;
    const backgroundColors = [
        'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        'linear-gradient(135deg, #f6f9fc 0%, #e9f1f7 100%)',
        'linear-gradient(135deg, #fff8f0 0%, #f0e6d2 100%)',
        'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)'
    ];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const newColorIndex = Math.floor(scrollPercent * backgroundColors.length);
        
        if (newColorIndex !== currentColorIndex && newColorIndex < backgroundColors.length) {
            currentColorIndex = newColorIndex;
            document.body.style.background = backgroundColors[currentColorIndex];
            document.body.style.transition = 'background 0.5s ease';
        }
    });

    // Artwork card click handler for modal-like effect
    galleryCards.forEach(card => {
        card.addEventListener('click', function() {
            const artwork = this.querySelector('.artwork-info h3').textContent;
            const medium = this.querySelector('.artwork-info p').textContent;
            
            // Create a simple modal effect
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                margin: 0 20px;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;
            
            modalContent.innerHTML = `
                <h3 style="margin-bottom: 1rem; color: #2c3e50;">${artwork}</h3>
                <p style="margin-bottom: 1.5rem; color: #666; font-style: italic;">${medium}</p>
                <p style="margin-bottom: 1.5rem; color: #666;">This artwork represents the beauty of painterly expression, capturing light and emotion through masterful brushwork.</p>
                <button style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer;">Close</button>
            `;
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Animate modal in
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10);
            
            // Close modal functionality
            const closeButton = modalContent.querySelector('button');
            const closeModal = () => {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            };
            
            closeButton.addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        });
    });

    // Add subtle animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(title);
    });

    // Enhanced paint stroke animation
    const paintStrokes = document.querySelectorAll('.paint-stroke');
    paintStrokes.forEach((stroke, index) => {
        stroke.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.opacity = '0.6';
            this.style.transition = 'all 0.3s ease';
        });
        
        stroke.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.3';
        });
    });

    // Cleanup function for paint drips
    setInterval(() => {
        if (paintDrips.length > 10) {
            const oldestDrip = paintDrips.shift();
            if (oldestDrip && oldestDrip.parentNode) {
                oldestDrip.parentNode.removeChild(oldestDrip);
            }
        }
    }, 5000);
});