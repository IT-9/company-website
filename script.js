// Smooth scrolling for navigation links
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

// Logo click functionality
const logo = document.querySelector('.logo');
if (logo) {
    // Function to handle logo activation
    function handleLogoActivation() {
        // Check if we're on the main page or privacy page
        if (window.location.pathname.includes('privacy.html')) {
            // On privacy page, go back to main page
            window.location.href = 'index.html';
        } else {
            // On main page, scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Mouse click handler
    logo.addEventListener('click', handleLogoActivation);
    
    // Keyboard handler (for accessibility)
    logo.addEventListener('keydown', function(e) {
        // Activate on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault(); // Prevent page scroll on space
            handleLogoActivation();
        }
    });
    
    // Add cursor pointer to indicate it's clickable
    logo.style.cursor = 'pointer';
}

// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    navLinks.classList.toggle('active');
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle between menu and close icon
    const menuIcon = mobileMenuButton.querySelector('i');
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isNavActive = navLinks.classList.contains('active');
    if (isNavActive && !e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        
        // Reset to menu icon
        const menuIcon = mobileMenuButton.querySelector('i');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        
        // Reset to menu icon
        const menuIcon = mobileMenuButton.querySelector('i');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Function to scroll to contact section
function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Client-side validation
        const nameValue = contactForm.name.value.trim();
        const companyValue = contactForm.company.value.trim();
        const emailValue = contactForm.email.value.trim();
        const phoneValue = contactForm.phone.value.trim();
        const messageValue = contactForm.message.value.trim();

        if (!nameValue) {
            alert('Please enter your name.');
            contactForm.name.focus();
            return;
        }
        if (!companyValue) {
            alert('Please enter your company name.');
            contactForm.company.focus();
            return;
        }
        if (!emailValue) {
            alert('Please enter your email address.');
            contactForm.email.focus();
            return;
        }
        if (!emailValue.includes('@')) {
            alert('Please enter a valid email address.');
            contactForm.email.focus();
            return;
        }
        if (!phoneValue) {
            alert('Please enter your phone number.');
            contactForm.phone.focus();
            return;
        }
        // Basic phone number format check (allows digits, spaces, +, -)
        if (!/^[\d\s\+\-()]*$/.test(phoneValue)) {
             alert('Please enter a valid phone number.');
             contactForm.phone.focus();
             return;
        }
        if (!messageValue) {
            alert('Please enter your message.');
            contactForm.message.focus();
            return;
        }
        if (messageValue.length < 10) {
            alert('Your message must be at least 10 characters long.');
            contactForm.message.focus();
            return;
        }

        const googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfOhWlHN_5O17UtK0VXvLjOVjZV6EGlaPmGt-vtBgsxRXdtCg/formResponse'
        
        const formData = new FormData();
        formData.append('entry.1237418632', contactForm.name.value); 
        formData.append('entry.1625315750', contactForm.company.value); 
        formData.append('entry.1725678623', contactForm.email.value); 
        formData.append('entry.164281757', contactForm.phone.value); 
        formData.append('entry.1939337864', contactForm.message.value);

        fetch(googleFormUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Important to avoid CORS errors, but you won't get a response back
        })
        .then(() => {
            alert('Thank you for your interest! We will contact you soon.');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('Sorry, there was an error submitting your form. Please try again later.');
        });
    });
}

// Add scroll-based header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--white)';
        header.style.boxShadow = 'none';
    }
});

// Track viewport size to adjust UI for mobile/desktop
function checkViewportSize() {
    if (window.innerWidth > 768) {
        // If we're on desktop and the menu was closed, ensure it's visible
        navLinks.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        
        // Reset to menu icon
        const menuIcon = mobileMenuButton.querySelector('i');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Run on resize
window.addEventListener('resize', checkViewportSize);

// Run once on page load
checkViewportSize();

// Reusable Slider Factory
function createSlider(containerSelector, options) {
    var opts = options || {};
    var container = document.querySelector(containerSelector);
    if (!container) return null;

    var slider = {
        container: container,
        currentSlide: 0,
        slides: container.querySelectorAll('.slide'),
        dots: container.querySelectorAll('.slider-dot'),
        prevBtn: container.querySelector('.slider-btn-prev'),
        nextBtn: container.querySelector('.slider-btn-next'),
        autoPlayInterval: null,
        autoPlayDelay: opts.autoPlayDelay || 5000,

        init: function() {
            if (!this.slides.length) return;
            var self = this;
            this.prevBtn?.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); self.prevSlide(); });
            this.nextBtn?.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); self.nextSlide(); });
            this.dots.forEach(function(dot, index) { dot.addEventListener('click', function(e) { e.preventDefault(); self.goToSlide(index); }); });
            this.startAutoPlay();
            this.container.addEventListener('mouseenter', function() { self.stopAutoPlay(); });
            this.container.addEventListener('mouseleave', function() { self.startAutoPlay(); });
        },

        goToSlide: function(index) {
            if (typeof gtag === 'function' && this.slideStartTime) {
                var duration = Math.round((Date.now() - this.slideStartTime) / 1000);
                if (duration >= 1) {
                    var img = this.slides[this.currentSlide]?.querySelector('img');
                    gtag('event', 'slide_engagement', { slider_name: containerSelector, slide_index: this.currentSlide, slide_image: img?.src?.split('/').pop() || 'unknown', view_time_sec: duration });
                }
            }
            this.slides[this.currentSlide]?.classList.remove('active');
            this.dots[this.currentSlide]?.classList.remove('active');
            this.currentSlide = (index + this.slides.length) % this.slides.length;
            this.slides[this.currentSlide]?.classList.add('active');
            this.dots[this.currentSlide]?.classList.add('active');
            this.slideStartTime = Date.now();
        },

        nextSlide: function() { this.goToSlide(this.currentSlide + 1); },
        prevSlide: function() { this.goToSlide(this.currentSlide - 1); },
        startAutoPlay: function() { this.stopAutoPlay(); this.autoPlayInterval = setInterval(function() { slider.nextSlide(); }, this.autoPlayDelay); },
        stopAutoPlay: function() { if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; } }
    };

    slider.init();
    slider.slideStartTime = Date.now();
    return slider;
}

// Initialize sliders
var heroSlider = createSlider('.hero-slider');
var aboutSlider = createSlider('.about-slider');

// Initialize GLightbox for hero gallery
if (typeof GLightbox !== 'undefined') {
    const heroLightbox = GLightbox({ selector: '.glightbox', openEffect: 'zoom', closeEffect: 'fade', loop: true, touchNavigation: true, keyboardNavigation: true, closeOnOutsideClick: true });
}

// GA4 enhanced tracking
(function() {
    if (typeof gtag !== 'function') return;

    // -- Section engagement tracking --
    var sections = document.querySelectorAll('section[id]');
    var sectionTimers = {};
    var sectionViewed = {};
    var sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var id = entry.target.id;
            if (entry.isIntersecting) {
                sectionTimers[id] = Date.now();
                if (!sectionViewed[id]) {
                    sectionViewed[id] = true;
                    gtag('event', 'section_view', { section_name: id, section_title: entry.target.querySelector('h2')?.textContent?.trim() || id });
                }
            } else if (sectionTimers[id]) {
                var duration = Math.round((Date.now() - sectionTimers[id]) / 1000);
                if (duration >= 2) {
                    gtag('event', 'section_engagement', { section_name: id, engagement_time_sec: duration });
                }
                delete sectionTimers[id];
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(function(section) { sectionObserver.observe(section); });

    // -- CTA button clicks --
    document.querySelectorAll('.cta-button, .hero-cta').forEach(function(btn) {
        btn.addEventListener('click', function() {
            gtag('event', 'cta_click', { button_text: this.textContent.trim(), button_location: this.closest('section')?.id || 'unknown' });
        });
    });

    // -- Contact form submission --
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function() {
            gtag('event', 'form_submit', { form_name: 'contact' });
        });
    }

    // -- 1. Scroll depth tracking (25/50/75/100%) --
    var scrollMilestones = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (docHeight <= 0) return;
        var percent = Math.round((scrollTop / docHeight) * 100);
        [25, 50, 75, 100].forEach(function(milestone) {
            if (percent >= milestone && !scrollMilestones[milestone]) {
                scrollMilestones[milestone] = true;
                gtag('event', 'scroll_depth', { depth_percentage: milestone, depth_pixels: Math.round(scrollTop) });
            }
        });
    });

    // -- 2. Contact form field drop-off tracking --
    if (form) {
        var fieldInteraction = {};
        var formFields = form.querySelectorAll('input, textarea');
        formFields.forEach(function(field) {
            field.addEventListener('focus', function() {
                if (!fieldInteraction[this.name]) {
                    fieldInteraction[this.name] = { started: Date.now(), completed: false };
                    gtag('event', 'form_field_focus', { form_name: 'contact', field_name: this.name });
                }
            });
            field.addEventListener('blur', function() {
                if (fieldInteraction[this.name] && this.value.trim().length > 0) {
                    fieldInteraction[this.name].completed = true;
                    gtag('event', 'form_field_complete', { form_name: 'contact', field_name: this.name });
                }
            });
        });
        // Track form abandonment on page leave
        window.addEventListener('beforeunload', function() {
            var started = Object.keys(fieldInteraction);
            if (started.length > 0 && !form.dataset.submitted) {
                var completed = started.filter(function(k) { return fieldInteraction[k].completed; });
                gtag('event', 'form_abandonment', { form_name: 'contact', fields_started: started.length, fields_completed: completed.length, last_field: started[started.length - 1] });
            }
        });
        form.addEventListener('submit', function() { form.dataset.submitted = 'true'; });
    }

    // -- 3. Outbound link click tracking --
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (href && href.startsWith('http') && !href.includes('it9.uk')) {
            gtag('event', 'outbound_click', { link_url: href, link_text: link.textContent.trim().substring(0, 100), link_location: link.closest('section')?.id || 'footer' });
        }
    });

    // -- 4. Phone/email link click tracking --
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            var isTel = this.href.startsWith('tel:');
            gtag('event', isTel ? 'phone_click' : 'email_click', { contact_method: isTel ? 'phone' : 'email', link_text: this.textContent.trim(), link_location: this.closest('section')?.id || this.closest('footer') ? 'footer' : 'unknown' });
        });
    });

    // -- 5. Lightbox gallery engagement tracking --
    if (typeof GLightbox !== 'undefined') {
        var lightboxOpen = null;
        var lightboxSlideStart = null;
        document.addEventListener('glightbox-open', function() {
            lightboxOpen = Date.now();
            lightboxSlideStart = Date.now();
            gtag('event', 'lightbox_open', { trigger_section: document.activeElement?.closest('section')?.id || 'unknown' });
        });
        document.addEventListener('glightbox-slide-changed', function(e) {
            if (lightboxSlideStart) {
                var dur = Math.round((Date.now() - lightboxSlideStart) / 1000);
                if (dur >= 1) {
                    gtag('event', 'lightbox_slide_view', { view_time_sec: dur });
                }
            }
            lightboxSlideStart = Date.now();
        });
        document.addEventListener('glightbox-close', function() {
            if (lightboxOpen) {
                var totalDur = Math.round((Date.now() - lightboxOpen) / 1000);
                gtag('event', 'lightbox_close', { total_view_time_sec: totalDur });
                lightboxOpen = null;
                lightboxSlideStart = null;
            }
        });
        // Fallback: observe lightbox DOM for open/close since GLightbox may not fire custom events
        var lbObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                m.addedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('glightbox-container')) {
                        lightboxOpen = Date.now();
                        lightboxSlideStart = Date.now();
                        gtag('event', 'lightbox_open', { method: 'dom_observer' });
                    }
                });
                m.removedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('glightbox-container') && lightboxOpen) {
                        var totalDur = Math.round((Date.now() - lightboxOpen) / 1000);
                        gtag('event', 'lightbox_close', { total_view_time_sec: totalDur, method: 'dom_observer' });
                        lightboxOpen = null;
                    }
                });
            });
        });
        lbObserver.observe(document.body, { childList: true });
    }

    // -- Send remaining section engagement on page leave --
    window.addEventListener('beforeunload', function() {
        Object.keys(sectionTimers).forEach(function(id) {
            var duration = Math.round((Date.now() - sectionTimers[id]) / 1000);
            if (duration >= 2) {
                gtag('event', 'section_engagement', { section_name: id, engagement_time_sec: duration });
            }
        });
    });
})();