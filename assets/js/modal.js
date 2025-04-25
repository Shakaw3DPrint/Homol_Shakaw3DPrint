let currentModalImageIndex = 0;
let modalImages = [];
let currentZoom = 1;
let touchStartX = 0;
let touchEndX = 0;

export function setupModal() {
    try {
        const modal = document.getElementById('imgModal');
        const modalImg = document.getElementById('modalImg');
        
        if (!modal || !modalImg) {
            console.error('Elementos do modal não encontrados');
            return;
        }

        // Event listeners para imagens principais
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-img')) {
                openModal(e.target);
            }
        });

        // Navegação
        const prevBtn = document.querySelector('.modal-prev');
        const nextBtn = document.querySelector('.modal-next');
        const closeBtn = document.querySelector('.close');
        
        if (prevBtn) prevBtn.addEventListener('click', () => navigateModal(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => navigateModal(1));
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        // Controles de zoom
        const zoomInBtn = document.querySelector('.zoom-in');
        const zoomOutBtn = document.querySelector('.zoom-out');
        const zoomResetBtn = document.querySelector('.zoom-reset');
        
        if (zoomInBtn) zoomInBtn.addEventListener('click', () => zoomImage(0.2));
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => zoomImage(-0.2));
        if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

        // Fechar ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Suporte a touch (swipe)
        modalImg.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modalImg.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        // Teclado
        document.addEventListener('keydown', handleKeyDown);

    } catch (error) {
        console.error('Erro ao configurar o modal:', error);
    }
}

function openModal(imgElement) {
    try {
        const productContainer = imgElement.closest('.product');
        if (!productContainer) return;

        const modal = document.getElementById('imgModal');
        const modalImg = document.getElementById('modalImg');
        if (!modal || !modalImg) return;

        modalImages = Array.from(productContainer.querySelectorAll('.main-img, .thumbnail-container img'));
        currentModalImageIndex = modalImages.findIndex(img => img.src === imgElement.src);
        
        if (currentModalImageIndex === -1) return;

        modalImg.src = imgElement.src;
        modalImg.alt = imgElement.alt || 'Imagem ampliada';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impede scroll da página
        resetZoom();

    } catch (error) {
        console.error('Erro ao abrir modal:', error);
    }
}

function navigateModal(direction) {
    if (modalImages.length === 0) return;
    
    currentModalImageIndex = (currentModalImageIndex + direction + modalImages.length) % modalImages.length;
    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
        modalImg.src = modalImages[currentModalImageIndex].src;
        resetZoom();
    }
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        navigateModal(1); // Swipe para esquerda
    } else if (touchEndX - touchStartX > swipeThreshold) {
        navigateModal(-1); // Swipe para direita
    }
}

function handleKeyDown(e) {
    const modal = document.getElementById('imgModal');
    if (!modal || modal.style.display !== 'block') return;

    switch(e.key) {
        case 'ArrowLeft':
            navigateModal(-1);
            break;
        case 'ArrowRight':
            navigateModal(1);
            break;
        case 'Escape':
            closeModal();
            break;
        case '+':
            zoomImage(0.2);
            break;
        case '-':
            zoomImage(-0.2);
            break;
        case '0':
            resetZoom();
            break;
    }
}

function zoomImage(zoomFactor) {
    const modalImg = document.getElementById('modalImg');
    if (!modalImg) return;

    currentZoom = Math.min(Math.max(currentZoom + zoomFactor, 0.5), 3);
    modalImg.style.transform = `scale(${currentZoom})`;
    modalImg.style.cursor = currentZoom > 1 ? 'move' : 'default';
}

function resetZoom() {
    currentZoom = 1;
    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
        modalImg.style.transform = 'scale(1)';
        modalImg.style.cursor = 'default';
    }
}

function closeModal() {
    const modal = document.getElementById('imgModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restaura scroll da página
    }
}
