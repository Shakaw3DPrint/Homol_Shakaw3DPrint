let currentSlide = 0;
let carouselItems = [];
let carouselInterval;

export function initCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('carouselIndicators');
    
    // Carrega imagens do carrossel
    for (let i = 1; i <= 50; i++) {
        const imgUrl = `assets/img/carrossel/c_${i}.jpg`;
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `Imagem ${i}`;
        carousel.appendChild(img);
        carouselItems.push(img);
        
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        indicator.onclick = () => goToSlide(i-1);
        indicators.appendChild(indicator);
    }
    
    if (carouselItems.length > 0) {
        updateCarousel();
        startCarousel();
        setupCarouselEvents();
    }
}

function setupCarouselEvents() {
    document.querySelector('.carousel-btn.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.carousel-btn.next').addEventListener('click', () => moveSlide(1));
    
    document.querySelector('.carousel-container').addEventListener('mouseenter', pauseCarousel);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startCarousel);
}

function startCarousel() {
    if (carouselItems.length <= 1) return;
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => moveSlide(1), 5000);
}

function pauseCarousel() {
    clearInterval(carouselInterval);
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlide);
    });
}