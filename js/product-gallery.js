// Plik: js/product-gallery.js

const mainImage = document.querySelector('.gallery-main-image');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
        
        const fullImageSrc = thumb.dataset.fullSrc;

        mainImage.src = fullImageSrc;

        mainImage.alt = thumb.alt;

        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});