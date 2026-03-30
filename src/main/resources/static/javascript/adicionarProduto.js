/**
 * CONTROLE DE MODAL E ADIÇÃO DE PRODUTOS
 * Responsável por:
 *   - Abrir/fechar o formulário modal de adicionar produtos
 *   - Salvar novos produtos no inventário (via dataManager)
 *   - Renderizar a tabela de produtos em produtos.html
 *   - Deletar produtos com confirmação
 * 
 * Integra-se com dataManager.js que centraliza os dados do inventário
 */

/**
 * FUNÇÃO: openModal()
 * Descrição: Abre o formulário modal de adição de produtos
 * 
 * Como funciona:
 *   Muda o estilo CSS display para 'block' (fica visível na tela)
 *   O modal estava oculto com display: 'none'
 * 
 * Usada em:
 *   onclick do botão "Adicionar Produto" em produtos.html
 * 
 * Efeito:
 *   Modal aparece na tela, bloqueando a interação com o fundo
 */
function openModal() { 
    document.getElementById('productModal').style.display = 'block'; 
}

/**
 * FUNÇÃO: closeModal()
 * Descrição: Fecha o formulário modal
 * 
 * Como funciona:
 *   Muda o estilo CSS display para 'none' (fica invisível)
 *   O modal desaparece da tela
 * 
 * Usada em:
 *   onclick do botão "Cancelar" no modal
 *   Fim da função saveProduct() após salvar com sucesso
 */
function closeModal() { 
    document.getElementById('productModal').style.display = 'none'; 
}

/**
 * FUNÇÃO: clearModalInputs()
 * Descrição: Limpa todos os campos de entrada do modal após salvar
 * 
 * Comportamento:
 *   Reseta para valores padrão:
 *   - Nome: vazio
 *   - Categoria: "Eletrônicos" (primeira opção)
 *   - Quantidade: 0
 *   - Preço: 0
 * 
 * Por que fazer isto?
 *   Para que quando o usuário abrir o modal novamente, veja campos vazios
 *   em vez de dados do produto anterior (melhor UX)
 * 
 * Usada em:
 *   Fim da função saveProduct() - logo depois de renderizar a tabela
 */
function clearModalInputs() {
    document.getElementById('pName').value = '';                   // Limpa nome (deja campo vazio)
    document.getElementById('pCategory').value = 'Eletrônicos';     // Reseta categoria para padrão
    document.getElementById('pStock').value = '0';                 // Reseta quantidade para 0
    document.getElementById('pPrice').value = '0';                 // Reseta preço para 0
}

/**
 * FUNÇÃO: saveProduct()
 * Descrição: Valida o formulário e adiciona o produto ao inventário
 * 
 * Fluxo de execução:
 *   1. Captura valores digitados nos inputs (nome, categoria, quantidade, preço)
 *   2. Valida se nome não está vazio
 *   3. Valida se preço é válido (maior que 0)
 *   4. Chama addProduct() do dataManager para cadastrar no inventário central
 *   5. Atualiza a tabela visível com renderTable()
 *   6. Limpa os campos do formulário com clearModalInputs()
 *   7. Fecha o modal com closeModal()
 * 
 * Validações:
 *   - Nome obrigatório (não pode estar vazio)
 *   - Preço obrigatório e deve ser maior que 0
 *   Se alguma validação falhar, mostra alert() e para a execução
 * 
 * Sincronização com homepage:
 *   Ao chamar addProduct(), os dados são salvos em inventory (dataManager.js)
 *   homepage.html usa getRecentProducts() que referencia o mesmo inventory
 *   → homepages.html recebe AUTOMATICAMENTE os novos produtos (sem F5)
 * 
 * Usada em:
 *   onclick do botão "Salvar no Estoque" no modal
 */
function saveProduct() {
    // PASSO 1: Captura todos os valores digitados nos campos do formulário
    const name = document.getElementById('pName').value;
    const category = document.getElementById('pCategory').value;
    const stock = document.getElementById('pStock').value;
    const price = document.getElementById('pPrice').value;

    // VALIDAÇÃO 1: Verifica se o nome foi preenchido
    // Se estiver vazio, mostra alerta e sai da função (return)
    if(!name) return alert("Digite o nome do produto!");
    
    // VALIDAÇÃO 2: Verifica se o preço foi preenchido e é positivo
    // Se estiver vazio OU for 0 ou negativo, mostra alerta e sai
    if(!price || price <= 0) return alert("Digite um preço válido!");

    // PASSO 2: Chama a função centralizada do dataManager para adicionar o produto
    // Isto adiciona ao array global 'inventory' que é compartilhado com homepage.html
    // O novo produto é criado com ID único, status calculado, etc.
    addProduct(name, category, stock, price);
    
    // PASSO 3: Redesenha a tabela de produtos em produtos.html
    // Com o novo produto incluído na visualização
    renderTable(inventory);
    
    // PASSO 4: Limpa todos os campos de input do modal para o próximo uso
    // Deixa o formulário pronto para adicionar um novo produto sem dados antigos
    clearModalInputs();
    
    // PASSO 5: Fecha o modal (ocultando o formulário novamente)
    closeModal();
}

/**
 * FUNÇÃO: renderTable(data)
 * Descrição: Desenha a tabela de produtos completa em produtos.html
 * 
 * Parâmetro:
 *   - data (array): Array de produtos a renderizar (geralmente: inventory)
 * 
 * Processo:
 *   1. Localiza o elemento <tbody> com id="productLog" na tabela
 *   2. Para cada produto no array, cria uma linha (<tr>) com suas informações
 *   3. Adiciona botão de delete (❌) para cada linha
 *   4. Coloca tudo junto como HTML na tabela (substitui conteúdo anterior)
 * 
 * Dados mostrados por produto:
 *   - ID (ex: #0, #1, #2)
 *   - Nome (em negrito)
 *   - Categoria (Eletrônicos, Alimentos, etc)
 *   - Quantidade + unidade "un"
 *   - Status (Disponível ou Estoque Baixo) com badge de cor
 *   - Botão ❌ para deletar
 * 
 * Atualização automática:
 *   Toda vez que saveProduct() ou deleteItem() é executado, renderTable()
 *   redesenha a tabela completa com dados ATUALIZADOS do inventory
 * 
 * Usada em:
 *   saveProduct() - para mostrar novo produto adicionado
 *   deleteItem() - para remover a linha deletada da tabela
 */
function renderTable(data) {
    // Pega o elemento <tbody> onde as linhas de produtos serão inseridas
    const log = document.getElementById('productLog');
    
    // Usa Array.map() para transformar cada produto em uma linha <tr> de HTML
    // Usa Template Literals (${}) para inserir dados dinâmicos
    log.innerHTML = data.map(p => `
        <tr>
            <td>#${p.id}</td>                                                    <!-- ID do produto (ex: #0, #1, #2) -->
            <td><strong>${p.name}</strong></td>                                 <!-- Nome do produto em negrito -->
            <td>${p.category}</td>                                              <!-- Categoria (Eletrônicos, Alimentos, Vestuário, etc) -->
            <td>${p.stock} un</td>                                              <!-- Quantidade em estoque + unidade "un" -->
            <td><span class="badge ${p.stock > 10 ? 'ok' : 'low'}">${p.status}</span></td>  <!-- Status com classe CSS (ok=verde, low=vermelho) -->
            <td><button onclick="deleteItem(${p.id})" id="delete">❌</button></td>  <!-- Botão de deletar com ID do produto -->
        </tr>
    `).join('');  // .join('') converte o array de strings em uma string única (HTML completo)
}

/**
 * FUNÇÃO: deleteItem(id)
 * Descrição: Deleta um produto do inventário com confirmação do usuário
 * 
 * Fluxo de execução:
 *   1. Localiza o modal de confirmação e seus botões
 *   2. Abre o modal com mensagem "Tem certeza que deseja remover este produto?"
 *   3. Aguarda o usuário clicar em "Cancelar" ou "Sim, Excluir"
 *   4. Se "Cancelar": apenas fecha o modal (nada é deletado)
 *   5. Se "Sim, Excluir": 
 *      a. Chama deleteProduct() do dataManager para remover do inventory
 *      b. Atualiza a tabela com renderTable() (sem o produto deletado)
 *      c. Log no console para debug
 *      d. Fecha o modal
 * 
 * Validação:
 *   O modal de confirmação evita deletar por engano
 *   Usuário precisa clicar duas vezes para confirmar a exclusão
 * 
 * Sincronização:
 *   Quando deleteProduct() é chamado, remove do inventory (dataManager)
 *   homepage.html usa getRecentProducts() que referencia inventory
 *   → Se o produto deletado estava nos 10 recentes, é removido automaticamente
 * 
 * Parâmetro:
 *   - id (number): ID do produto a deletar
 * 
 * Usada em:
 *   onclick do botão ❌ em cada linha da tabela de produtos
 */
function deleteItem(id) {
    // PASSO 1: Pega referências aos elementos do modal de confirmação
    // Modal é <div id="customModal"> com botões #btnConfirm e #btnCancel
    const modal = document.getElementById('customModal');
    const btnConfirm = document.getElementById('btnConfirm');
    const btnCancel = document.getElementById('btnCancel');

    // PASSO 2: Mostra o modal na tela
    // Muda display de 'none' para 'flex' (torna visível)
    // O modal fica bloqueando o fundo (overlay) para forçar decisão do usuário
    modal.style.display = 'flex';

    // EVENT LISTENER: Quando usuário clica no botão "Cancelar"
    // Apenas fecha o modal sem fazer nada mais
    btnCancel.onclick = () => {
        modal.style.display = 'none';  // Ocultando modal
    };

    // EVENT LISTENER: Quando usuário clica no botão "Sim, Excluir"
    // Executa a lógica de deleção
    btnConfirm.onclick = () => {
        // PASSO 3: Chama a função centralizada do dataManager para remover o produto
        // Isto remove do array global 'inventory'
        deleteProduct(id);
        
        // PASSO 4: Redesenha a tabela de produtos SEM o produto deletado
        // A tabela agora mostra um item a menos
        renderTable(inventory);
        
        // PASSO 5: Mensagem no console para debug/auditoria
        // Mostra que a ação foi completada com sucesso
        console.log(`Produto #${id} removido com sucesso.`);
        
        // PASSO 6: Fecha o modal de confirmação
        // Ocultando a mensagem "Tem certeza?" da tela
        modal.style.display = 'none';
    };
}
