// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add 'visible' class when the element is in the viewport
function handleScroll() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card) => {
        if (isInViewport(card)) {
            card.classList.add('visible');
        }
    });
}

// Debounce function to limit the rate at which handleScroll is called
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Listen for scroll events
window.addEventListener('scroll', debounce(handleScroll));

// Initial check on page load
window.onload = function () {
    handleScroll();
};
