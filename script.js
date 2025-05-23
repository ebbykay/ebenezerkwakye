// ✅ Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// ✅ Typewriter Effect for Your Title
document.addEventListener('DOMContentLoaded', function () {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Investment Data Scientist", "Entrepreneur", "Tech Innovator"];
    let textArrayIndex = 0;
    let charIndex = 0;
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay);
        }
    }

    setTimeout(type, newTextDelay);
});

// ✅ Dark Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // Change icon
    if (document.body.classList.contains('dark')) {
        toggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// ✅ Maintain Dark Mode Preference on Reload
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        toggleBtn.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        toggleBtn.textContent = '🌙';
    }
});

// ✅ Form Submission Handling (Simple Contact Form)
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thanks for reaching out! I'll get back to you soon.");
        form.reset();
    });
}

// ✅ Smooth Scroll for Better User Experience
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
