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
  // ... descrições especiais
};

const observacaoPadrao = '<br><strong>Observação:</strong> Todos os produtos...';

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