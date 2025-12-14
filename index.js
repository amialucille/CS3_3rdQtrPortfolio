document.querySelectorAll('.portal').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.src = img.dataset.hover;
    });
    img.addEventListener('mouseleave', () => {
        img.src = img.dataset.original;
    });
});