// Configurações globais
const precosEspeciais = {
  44: 'R$ 45,00',
  60: 'R$ 90,00'
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  loadProducts();
  
  // Botão "Voltar ao topo"
  window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTopBtn');
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
});

// Funções compartilhadas
function showAlert(message) {
  alert(message);
}
