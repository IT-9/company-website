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

        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfOhWlHN_5O17UtK0VXvLjOVjZV6EGlaPmGt-vtBgsxRXdtCg/formResponse';
        
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