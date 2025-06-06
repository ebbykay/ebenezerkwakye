document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation with Enhanced Accessibility
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  if (navToggle && navMenu) {
    // Initialize ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'nav-menu');
    
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      // Add focus trap when menu is open
      if (!isExpanded) {
        navLinks[0].focus();
      }
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside or pressing Escape
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu();
        navToggle.focus();
      }
    });
  }

  // Smooth Scrolling with Offset for Fixed Header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        history.pushState(null, null, targetId);
      }
    });
  });

  // Typewriter Effect with Improved Timing
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
    let timeoutId;

    const type = () => {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        timeoutId = setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove('typing');
        timeoutId = setTimeout(erase, newTextDelay);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        timeoutId = setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.add('typing');
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        timeoutId = setTimeout(type, typingDelay + 500);
      }
    };

    // Start effect
    cursorSpan.classList.add('typing');
    timeoutId = setTimeout(type, 1000);
    
    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimeout(timeoutId);
      } else if (!typedTextSpan.textContent) {
        cursorSpan.classList.add('typing');
        timeoutId = setTimeout(type, 1000);
      }
    });
  }

  // Scroll Reveal Animation
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '30px',
      duration: 1000,
      delay: 200,
      reset: false,
      mobile: false // Disable on mobile for performance
    });
    
    sr.reveal('.hero-left', { delay: 300 });
    sr.reveal('.hero-right', { delay: 400, interval: 100 });
    sr.reveal('.btn', { delay: 500 });
  }

  // Intersection Observer for Scroll Animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  // Dynamic Copyright Year
  const copyrightYear = document.querySelector('.copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Form Submission Handling
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      
      if (!submitBtn) return;
      
      const originalText = submitBtn.textContent;
      let successMsg = form.querySelector('.form-success') || document.createElement('div');
      
      try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        successMsg.className = 'form-success';
        successMsg.textContent = 'Message sent successfully!';
        form.appendChild(successMsg);
        form.reset();
        
      } catch (error) {
        console.error('Error:', error);
        successMsg.className = 'form-error';
        successMsg.textContent = 'Error sending message. Please try again.';
        form.appendChild(successMsg);
        
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Remove message after delay
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      }
    });
  }
});
