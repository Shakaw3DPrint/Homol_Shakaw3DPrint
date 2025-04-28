let currentSlide = 0;
let carouselInterval;

export function initCarousel() {
  const carousel = document.getElementById('carousel');
  
  // Adiciona imagens dinamicamente
  for (let i = 1; i <= 10; i++) {
    const img = document.createElement('img');
    img.src = `uploads/carrossel/c_${i}.webp`;
    carousel.appendChild(img);
  }
  
  startCarousel();
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    moveSlide(1);
  }, 5000);
}
