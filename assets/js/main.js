/**
 * Letoon Residence - Main JavaScript
 * Handles all interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================
    // Preloader
    // =============================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 500);
        });
    }

    // =============================
    // Navbar Scroll Effect
    // =============================
    const navbar = document.querySelector('.navbar');
    const logoWhite = document.querySelector('.logo-white');
    const logoDark = document.querySelector('.logo-dark');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            if (logoWhite && logoDark) {
                logoWhite.classList.add('d-none');
                logoDark.classList.remove('d-none');
            }
        } else {
            navbar.classList.remove('scrolled');
            if (logoWhite && logoDark) {
                logoWhite.classList.remove('d-none');
                logoDark.classList.add('d-none');
            }
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // =============================
    // Language Switcher
    // =============================
    const langBtns = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-tr], [data-en]');
    
    // Get saved language or default to Turkish
    let currentLang = localStorage.getItem('letoonLang') || 'tr';
    
    // Apply saved language on load
    setLanguage(currentLang);
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('letoonLang', lang);
        });
    });
    
    function setLanguage(lang) {
        currentLang = lang;
        
        // Update active button
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Translate elements with fade effect
        translatableElements.forEach(el => {
            const text = el.dataset[lang];
            if (text) {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = text;
                    el.style.opacity = '1';
                }, 150);
            }
            
            // Update href for links
            const href = el.dataset[`href${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
            if (href && el.tagName === 'A') {
                el.href = href;
            }
        });
    }

    // =============================
    // GLightbox Initialization
    // =============================
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            closeButton: true
        });
    }

    // =============================
    // Video Modal
    // =============================
    const playVideoBtn = document.getElementById('playVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const promoVideo = document.getElementById('promoVideo');
    
    if (playVideoBtn && videoModal) {
        playVideoBtn.addEventListener('click', function() {
            videoModal.classList.add('active');
            if (promoVideo) {
                promoVideo.play();
            }
        });
        
        closeVideoBtn.addEventListener('click', function() {
            videoModal.classList.remove('active');
            if (promoVideo) {
                promoVideo.pause();
                promoVideo.currentTime = 0;
            }
        });
        
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                if (promoVideo) {
                    promoVideo.pause();
                    promoVideo.currentTime = 0;
                }
            }
        });
    }

    // =============================
    // Back to Top Button
    // =============================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =============================
    // Scroll Animations (AOS-like)
    // =============================
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('load', checkAnimations);
    checkAnimations(); // Check on load

    // =============================
    // Gallery Filter (for gallery page)
    // =============================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // =============================
    // Form Validation (Contact Page)
    // =============================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !phone || !message) {
                alert(currentLang === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(currentLang === 'tr' ? 'Geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.');
                return;
            }
            
            // Success message (in real implementation, this would submit to a server)
            alert(currentLang === 'tr' ? 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' : 'Your message has been sent successfully! We will get back to you as soon as possible.');
            contactForm.reset();
        });
    }

    // =============================
    // Smooth Scroll for Anchor Links
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                    
                    // Smooth scroll to target
                    const offsetTop = target.offsetTop - 80; // Account for navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============================
    // Active Nav Link on Scroll
    // =============================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Check on load

    // =============================
    // Add transition to translatable elements
    // =============================
    translatableElements.forEach(el => {
        el.style.transition = 'opacity 0.15s ease';
    });

});

