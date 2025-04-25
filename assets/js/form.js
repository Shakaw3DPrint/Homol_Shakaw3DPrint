const interests = [];

export function setupForm() {
    // Botão de interesse
    document.querySelectorAll('.interest-btn').forEach(btn => {
        btn.addEventListener('click', toggleInterestPanel);
    });
    
    // Botão enviar interesses
    document.querySelector('.send-interests').addEventListener('click', showContactModal);
    
    // Formulário de contato
    document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
    
    // Máscara WhatsApp
    document.getElementById('whatsapp').addEventListener('input', formatWhatsApp);
}

function toggleInterestPanel() {
    const panel = document.getElementById('interestPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function showContactModal() {
    if (interests.length === 0) {
        alert('Adicione itens de interesse antes de enviar.');
        return;
    }
    updateContactMessage();
    document.getElementById('contactModal').style.display = 'block';
}

function formatWhatsApp(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    if (value.length > 0) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        if (value.length > 10) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
    }
    
    e.target.value = value;
}

function handleFormSubmit(e) {
    const whatsapp = document.getElementById('whatsapp').value.replace(/\D/g, '');
    if (whatsapp.length < 11) {
        alert('WhatsApp inválido!');
        e.preventDefault();
        return;
    }
    
    interests.length = 0;
    updateInterestList();
}

function updateInterestList() {
    const list = document.getElementById('interestList');
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