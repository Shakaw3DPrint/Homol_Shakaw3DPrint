let currentModalImageIndex = 0;
let modalImages = [];
let currentZoom = 1;

export function setupModal() {
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    
    // Event listeners
    document.querySelectorAll('.main-img').forEach(img => {
        img.addEventListener('click', function() {
            openModal(this);
        });
    });
    
    document.querySelector('.modal-prev').addEventListener('click', () => navigateModal(-1));
    document.querySelector('.modal-next').addEventListener('click', () => navigateModal(1));
    document.querySelector('.close').addEventListener('click', closeModal);
    document.querySelector('.zoom-in').addEventListener('click', () => zoomImage(0.2));
    document.querySelector('.zoom-out').addEventListener('click', () => zoomImage(-0.2));
    document.querySelector('.zoom-reset').addEventListener('click', resetZoom);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function openModal(imgElement) {
    const productContainer = imgElement.closest('.product');
    modalImages = Array.from(productContainer.querySelectorAll('.main-img, .thumbnail-container img'));
    
    currentModalImageIndex = modalImages.findIndex(img => img.src === imgElement.src);
    document.getElementById('modalImg').src = imgElement.src;
    document.getElementById('imgModal').style.display = 'block';
    resetZoom();
}

function navigateModal(direction) {
    currentModalImageIndex = (currentModalImageIndex + direction + modalImages.length) % modalImages.length;
    document.getElementById('modalImg').src = modalImages[currentModalImageIndex].src;
    resetZoom();
}

function zoomImage(zoomFactor) {
    currentZoom = Math.min(Math.max(currentZoom + zoomFactor, 0.5), 3);
    document.getElementById('modalImg').style.transform = `scale(${currentZoom})`;
}

function resetZoom() {
    currentZoom = 1;
    document.getElementById('modalImg').style.transform = 'scale(1)';
}

function closeModal() {
    document.getElementById('imgModal').style.display = 'none';
}