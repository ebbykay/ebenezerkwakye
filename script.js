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

    setTimeout(type, 2000);
});
