import { initCarousel } from './carousel.js';
import { setupModal } from './modal.js';
import { setupForm } from './form.js';

// Configurações globais
const precosEspeciais = {
  44: 'R$ 45,00',
  45: 'R$ 45,00',
  // ... outros preços
};

const descricoesEspeciais = {
  // ... suas descrições especiais
};

const observacaoPadrao = '<br><strong>Observação:</strong> Todos os produtos...';

async function createProduct(i) {
  const index = i.toString().padStart(2, '0');
  const mainImageUrl = `assets/img/produtos/${index}.png`;
  
  // Restante da função createProduct...
  // Todas as referências a imagens devem usar o novo caminho:
  // Exemplo para thumbnails:
  const thumbUrl = `assets/img/produtos/${index}_${j}.png`;
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  setupModal();
  setupForm();
  
  // Configura botão de voltar ao topo
  const backToTopBtn = document.getElementById('backToTopBtn');
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.onscroll = () => {
    backToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
  };
});
