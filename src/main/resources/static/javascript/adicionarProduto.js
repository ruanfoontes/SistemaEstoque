let inventory = [];
let nextId = 0;

function openModal() { document.getElementById('productModal').style.display = 'block'; }
function closeModal() { document.getElementById('productModal').style.display = 'none'; }

function saveProduct() {
    const name = document.getElementById('pName').value;
    const category = document.getElementById('pCategory').value;
    const stock = document.getElementById('pStock').value;

    if(!name) return alert("Digite o nome!");

    const newProduct = {
        id: nextId++,
        name: name,
        category: category,
        stock: parseInt(stock),
        status: stock > 10 ? 'Disponível' : 'Estoque Baixo'
    };

    inventory.push(newProduct);
    renderTable(inventory);
    closeModal();
    
}

function renderTable(data) {
    const log = document.getElementById('productLog');
    log.innerHTML = data.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>${p.stock} un</td>
            <td><span class="badge ${p.stock > 10 ? 'ok' : 'low'}">${p.status}</span></td>
            <td><button onclick="deleteItem(${p.id})" id= "delete">❌</button></td>
        </tr>
    `).join('');
}


function deleteItem(id) {
    const modal = document.getElementById('customModal');
    const btnConfirm = document.getElementById('btnConfirm');
    const btnCancel = document.getElementById('btnCancel');

    // 1. Mostra o Modal
    modal.style.display = 'flex';

    // 2. Se clicar em Cancelar, apenas fecha
    btnCancel.onclick = () => {
        modal.style.display = 'none';
    };

    // 3. Se clicar em Confirmar, executa a lógica
    btnConfirm.onclick = () => {
        // Lógica de exclusão que você já tinha
        inventory = inventory.filter(produto => produto.id !== id);
        
        renderTable(inventory);
        console.log(`Produto #${id} removido com sucesso.`);
        
        // Fecha o modal
        modal.style.display = 'none';
        
        // Dica: Se estiver usando MySQL, aqui você chamaria a rota do backend!
    };
}