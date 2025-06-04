// Replace your existing mobile nav JS with this:
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      // Toggle aria-expanded for accessibility
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle classes
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      // Animate hamburger icon
      this.classList.toggle('active');
    });
  }
});

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Scroll reveal animation
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '20px',
            duration: 1000,
            delay: 200,
            reset: false
        });

        sr.reveal('.hero-left', { delay: 300 });
        sr.reveal('.hero-right', { delay: 400 });
        sr.reveal('.btn', { delay: 500, interval: 100 });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add current year to footer
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Enhanced Typewriter Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    if (typedTextSpan && cursorSpan) {
        const textArray = [
            "data-driven solutions",
            "scalable systems",
            "machine learning models",
            "innovative web apps",
            "educational content"
        ];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 1500;
        let textArrayIndex = 0;
        let charIndex = 0;
        let isTyping = false;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                isTyping = true;
                if(!cursorSpan.classList.contains("typing")) {
                    cursorSpan.classList.add("typing");
                }
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } 
            else {
                isTyping = false;
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                isTyping = true;
                if(!cursorSpan.classList.contains("typing")) {
                    cursorSpan.classList.add("typing");
                }
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } 
            else {
                isTyping = false;
                cursorSpan.classList.remove("typing");
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingDelay + 500);
            }
        }

        // Start after a brief delay
        setTimeout(() => {
            if (textArray.length) type();
        }, 1000);
    }

    // Intersection Observer for scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Dark Mode Toggle
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Check for saved theme preference or use system preference
        const currentTheme = localStorage.getItem('theme') || 
                            (prefersDarkScheme.matches ? 'dark' : 'light');
        document.body.classList.toggle('dark', currentTheme === 'dark');

        toggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Change icon
            toggleBtn.innerHTML = isDark ? 
                '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/></svg>' : 
                '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
        });
    }

    // Form submission handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
                
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Message sent successfully!';
                form.appendChild(successMsg);
                
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                // Optionally show error message
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    const msg = form.querySelector('.form-success');
                    if (msg) msg.remove();
                }, 3000);
            }
        });
    }
});
