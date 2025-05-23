// ✅ Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});

// ✅ Typewriter Effect
document.addEventListener('DOMContentLoaded', function () {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Investment Data Scientist", "Entrepreneur", "Tech Innovator"];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 150);
    }

    function erase() {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    }

    setTimeout(type, 2000);
});
