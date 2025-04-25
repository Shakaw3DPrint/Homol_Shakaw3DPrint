const interests = [];

export function setupForm() {
    try {
        // Botão de interesse
        document.querySelectorAll('.interest-btn').forEach(btn => {
            btn.addEventListener('click', toggleInterestPanel);
        });
        
        // Botão enviar interesses
        const sendInterestsBtn = document.querySelector('.send-interests');
        if (sendInterestsBtn) {
            sendInterestsBtn.addEventListener('click', showContactModal);
        }
        
        // Formulário de contato
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Máscara WhatsApp
        const whatsappInput = document.getElementById('whatsapp');
        if (whatsappInput) {
            whatsappInput.addEventListener('input', formatWhatsApp);
        }

        // Adiciona a função global removeInterest
        window.removeInterest = removeInterest;
        
    } catch (error) {
        console.error('Erro ao configurar o formulário:', error);
    }
}

function toggleInterestPanel() {
    const panel = document.getElementById('interestPanel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

function showContactModal() {
    if (interests.length === 0) {
        alert('Adicione itens de interesse antes de enviar.');
        return;
    }
    updateContactMessage();
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function formatWhatsApp(e) {
    try {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            if (value.length > 10) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
        }
        
        e.target.value = value;
    } catch (error) {
        console.error('Erro ao formatar WhatsApp:', error);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    try {
        const whatsapp = document.getElementById('whatsapp')?.value.replace(/\D/g, '') || '';
        if (whatsapp.length < 11) {
            alert('Por favor, insira um número de WhatsApp válido com DDD.');
            return;
        }
        
        // Se tudo estiver ok, envia o formulário
        e.target.submit();
        interests.length = 0;
        updateInterestList();
        
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    }
}

function removeInterest(index) {
    if (index >= 0 && index < interests.length) {
        interests.splice(index, 1);
        updateInterestList();
    }
}

function updateInterestList() {
    const list = document.getElementById('interestList');
    if (!list) return;

    list.innerHTML = interests.length === 0 
        ? '<li style="color: gray;">Nenhum item adicionado.</li>'
        : interests.map((item, index) => `
            <li>
                <div style="margin-bottom: 10px;">
                    <strong>Código ${item.codigo}</strong><br>
                    <small>${item.descricao}</small><br>
                    <strong>${item.preco}</strong><br>
                    <img src="${item.imagem}" style="width: 50px;"><br>
                    <button onclick="removeInterest(${index})">Remover</button>
                </div>
            </li>
        `).join('');
    
    updateContactMessage();
}

function updateContactMessage() {
    const summary = document.getElementById('selectedItemsSummary');
    const itemsData = document.getElementById('itemsData');
    
    if (!summary || !itemsData) return;
    
    if (interests.length === 0) {
        summary.innerHTML = '<div>Nenhum item selecionado</div>';
        itemsData.value = '';
        return;
    }
    
    const grouped = interests.reduce((acc, item) => {
        acc[item.codigo] = acc[item.codigo] || {...item, quantity: 0};
        acc[item.codigo].quantity++;
        return acc;
    }, {});
    
    summary.innerHTML = Object.values(grouped).map(item => `
        <div>
            <strong>Código ${item.codigo}:</strong> 
            ${item.quantity}x - ${item.preco}
        </div>
    `).join('');
    
    itemsData.value = JSON.stringify(Object.values(grouped));
}
