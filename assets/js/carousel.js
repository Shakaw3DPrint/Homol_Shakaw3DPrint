let currentSlide = 0;
let carouselItems = [];
let carouselInterval;

export function initCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('carousel-indicators'); // corrigido o id

    if (!carousel || !indicators) {
        console.error('Elementos do carrossel não encontrados');
        return;
    }

    carousel.innerHTML = '';
    indicators.innerHTML = '';

    const loadImage = (i) => {
        return new Promise((resolve) => {
            const imgUrl = `assets/img/carrossel/c_${i}.webp`;
            const img = new Image();

            img.onload = () => {
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = `Imagem ${i}`;
                imgElement.loading = 'lazy'; // Lazy-loading adicionado
                carousel.appendChild(imgElement);
                carouselItems.push(imgElement);

                const indicator = document.createElement('div');
                indicator.className = 'carousel-indicator';
                indicator.addEventListener('click', () => goToSlide(i - 1));
                indicators.appendChild(indicator);

                resolve(true);
            };

            img.onerror = () => {
                console.warn(`Imagem não encontrada: ${imgUrl}`);
                resolve(false);
            };

            img.src = imgUrl;
        });
    };

    const loadImages = async () => {
        let consecutiveFails = 0;

        for (let i = 1; i <= 50; i++) {
            const loaded = await loadImage(i);
            if (!loaded) {
                consecutiveFails++;
            } else {
                consecutiveFails = 0; // Resetar se encontrar imagem
            }

            if (consecutiveFails >= 5) break; // Parar após 5 imagens ausentes seguidas
        }

        if (carouselItems.length > 0) {
            updateCarousel();
            startCarousel();
            setupCarouselEvents();
        } else {
            console.warn('Nenhuma imagem do carrossel foi carregada');
            document.querySelector('.carousel-container').style.display = 'none';
        }
    };

    loadImages();
}

function setupCarouselEvents() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const container = document.querySelector('.carousel-container');

    if (prevBtn && nextBtn && container) {
        prevBtn.addEventListener('click', () => moveSlide(-1));
        nextBtn.addEventListener('click', () => moveSlide(1));
        container.addEventListener('mouseenter', pauseCarousel);
        container.addEventListener('mouseleave', startCarousel);
    }
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
    if (index >= 0 && index < carouselItems.length) {
        currentSlide = index;
        updateCarousel();
    }
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

        document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
}
