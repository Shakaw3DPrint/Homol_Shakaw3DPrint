import { initCarousel } from './carousel.js';
import { setupModal } from './modal.js';
import { setupForm } from './form.js';

// Configurações globais
const precosEspeciais = {
  44: 'R$ 45,00',
  45: 'R$ 45,00',
  46: 'Por favor consultar com vendedor',
  47: 'Por favor consultar com vendedor',
  48: 'Por favor consultar com vendedor',
  60: 'R$ 90,00'
};

const descricoesEspeciais = {
  '01': 'Modelo + Esteira <br> Imagem Real <br> Escala 1/18. Tamanho entre 8cm e 11cm de altura. <br><strong>Observação:</strong> Os itens do cenário não acompanham o produto.',
  '02': 'Modelo + 01 Pneu Resina <br> Imagem Real <br> Escala 1/18. Tamanho entre 8cm e 11cm de altura. <br><strong>Observação:</strong> Os itens do cenário não acompanham o produto.',
  // ... (adicione todas as outras descrições especiais)
};

const observacaoPadrao = '<br><strong>Observação:</strong> Todos os produtos serão enviados em cores aleatórias disponíveis. Caso opte por alguma cor específica, informe no ato da solicitação.';

// Função para verificar se uma imagem existe
async function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Função para criar um produto
async function createProduct(i) {
  const index = i.toString().padStart(2, '0');
  const mainImageUrl = `assets/img/produtos/${index}.png`;
  
  // Verifica se a imagem principal existe
  const mainImageExists = await checkImageExists(mainImageUrl);
  if (!mainImageExists) return null;

  const product = document.createElement('div');
  product.className = 'product';

  // Coluna de imagens
  const imageColumn = document.createElement('div');
  imageColumn.className = 'image-column';

  // Imagem principal
  const mainImg = document.createElement('img');
  mainImg.src = mainImageUrl;
  mainImg.alt = `Produto ${i}`;
  mainImg.className = 'main-img';
  imageColumn.appendChild(mainImg);

  // Container de miniaturas
  const thumbnails = document.createElement('div');
  thumbnails.className = 'thumbnail-container';

  // Adiciona a miniatura principal
  const mainThumb = document.createElement('img');
  mainThumb.src = mainImageUrl;
  mainThumb.alt = `Miniatura ${i}`;
  thumbnails.appendChild(mainThumb);

  // Verifica e adiciona miniaturas adicionais (1-5)
  for (let j = 1; j <= 5; j++) {
    const thumbUrl = `assets/img/produtos/${index}_${j}.png`;
    if (await checkImageExists(thumbUrl)) {
      const thumb = document.createElement('img');
      thumb.src = thumbUrl;
      thumb.alt = `Miniatura ${i}-${j}`;
      thumbnails.appendChild(thumb);
    }
  }

  imageColumn.appendChild(thumbnails);
  product.appendChild(imageColumn);

  // Detalhes do produto
  const details = document.createElement('div');
  details.className = 'product-details';
  
  const descricao = descricoesEspeciais[index] || 
    'Modelo <br> Imagem Real <br> Escala 1/18. Tamanho entre 8cm e 11cm de altura. <br><strong>Observação:</strong> Os itens do cenário não acompanham o produto.' + 
    observacaoPadrao;
  
  const preco = precosEspeciais[i] || 'R$ 60,00';

  details.innerHTML = `
    <h2>Código ${i}</h2>
    <p><strong>Descrição:</strong> ${descricao}</p>
    <p class="price">${preco}</p>
    <button class="add-interest">Adicionar aos interesses</button>
  `;

  product.appendChild(details);
  return product;
}

// Carrega todos os produtos
async function loadProducts() {
  const catalog = document.getElementById('catalog');
  const loader = document.getElementById('loader');
  
  if (!catalog || !loader) return;
  
  loader.style.display = 'block';
  catalog.innerHTML = '';
  
  try {
    const maxProducts = 60; // Ajuste conforme necessário
    let loadedProducts = 0;
    
    for (let i = 1; i <= maxProducts; i++) {
      const product = await createProduct(i);
      if (product) {
        catalog.appendChild(product);
        loadedProducts++;
      }
      
      // Libera o event loop periodicamente
      if (i % 5 === 0) await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    if (loadedProducts === 0) {
      catalog.innerHTML = '<p style="text-align: center; color: white;">Nenhum produto encontrado.</p>';
    }
    
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    catalog.innerHTML = '<p style="text-align: center; color: white;">Erro ao carregar os produtos.</p>';
  } finally {
    loader.style.display = 'none';
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  setupModal();
  setupForm();
  loadProducts();
  
  // Botão voltar ao topo
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
  }
});
